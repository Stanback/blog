#!/usr/bin/env bun
/**
 * Generate image prompts from blog posts
 *
 * Usage:
 *   bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md
 *   bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md --generate
 *
 * Options:
 *   --generate    Actually generate the image via Gemini API
 *   --output DIR  Output directory for generated images (default: static/images/posts)
 */

import { existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { parseArgs } from 'node:util';

// Parse frontmatter from markdown
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: {}, body: content };

	const [, fmRaw, body] = match;
	const frontmatter: Record<string, unknown> = {};

	for (const line of fmRaw.split('\n')) {
		const colonIdx = line.indexOf(':');
		if (colonIdx > 0) {
			const key = line.slice(0, colonIdx).trim();
			let value: unknown = line.slice(colonIdx + 1).trim();

			// Handle arrays
			if (value === '') continue;
			if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
				value = value
					.slice(1, -1)
					.split(',')
					.map((s) => s.trim());
			}
			// Handle booleans
			if (value === 'true') value = true;
			if (value === 'false') value = false;

			frontmatter[key] = value;
		}
	}

	return { frontmatter, body };
}

// Extract key themes from article body
function extractThemes(body: string, tags: string[]): string[] {
	const themes = [...tags];

	// Look for H2 headings as additional themes
	const h2s = body.match(/^## (.+)$/gm);
	if (h2s) {
		for (const h2 of h2s.slice(0, 3)) {
			const heading = h2.replace('## ', '').toLowerCase();
			if (!themes.includes(heading)) {
				themes.push(heading);
			}
		}
	}

	return themes.slice(0, 5);
}

// Infer tone from content
function inferTone(body: string, frontmatter: Record<string, unknown>): string {
	const lower = body.toLowerCase();

	if (frontmatter.tension) return 'contemplative, questioning';
	if (lower.includes('urgent') || lower.includes('critical')) return 'urgent, direct';
	if (lower.includes('playful') || lower.includes('fun')) return 'playful, light';
	if (lower.includes('personal') || lower.includes('reflection')) return 'reflective, intimate';

	return 'observational, thoughtful';
}

// Generate the image prompt
function generatePrompt(
	title: string,
	description: string,
	tension: string | undefined,
	themes: string[],
	tone: string,
	excerpt: string,
): string {
	const templatePath = join(dirname(import.meta.path), '..', 'prompts', 'image-generation.md');

	// Read template synchronously
	const templateContent = require('node:fs').readFileSync(templatePath, 'utf-8');

	const prompt = `
# Image Generation Request

## Article Context
**Title**: ${title}
**Description**: ${description}
**Core Tension**: ${tension || 'Not specified — infer from content'}
**Key Themes**: ${themes.join(', ')}
**Tone**: ${tone}

## Article Excerpt (for context)
${excerpt.slice(0, 2000)}${excerpt.length > 2000 ? '\n\n[...truncated]' : ''}

---

${templateContent}

---

Now generate a detailed, specific image prompt for this article. The prompt should:
1. Capture the essence of "${title}" visually
2. Work as a hero image (1200x630)
3. Follow the brand aesthetic guidelines above
4. Be specific enough for an image model to execute

Output the image generation prompt only, ready to paste into an image model.
`;

	return prompt;
}

// Call Gemini API to generate image (optional)
async function generateImageWithGemini(prompt: string, outputPath: string): Promise<void> {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error('Error: GEMINI_API_KEY environment variable not set');
		console.error('Set it with: export GEMINI_API_KEY=your-key');
		process.exit(1);
	}

	console.log('Generating image with Gemini...');

	// Use Imagen 3 via Gemini API
	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				instances: [{ prompt }],
				parameters: {
					sampleCount: 1,
					aspectRatio: '16:9',
					safetyFilterLevel: 'block_few',
				},
			}),
		},
	);

	if (!response.ok) {
		const error = await response.text();
		console.error('Gemini API error:', error);
		process.exit(1);
	}

	const data = await response.json();
	const imageData = data.predictions?.[0]?.bytesBase64Encoded;

	if (!imageData) {
		console.error('No image data in response');
		console.error(JSON.stringify(data, null, 2));
		process.exit(1);
	}

	// Write image
	const buffer = Buffer.from(imageData, 'base64');
	await Bun.write(outputPath, buffer);
	console.log(`Image saved to: ${outputPath}`);
}

// Main
async function main() {
	const { values, positionals } = parseArgs({
		args: Bun.argv.slice(2),
		options: {
			generate: { type: 'boolean', default: false },
			output: { type: 'string', default: 'static/images/posts' },
		},
		allowPositionals: true,
	});

	const articlePath = positionals[0];
	if (!articlePath) {
		console.error('Usage: bun scripts/generate-image-prompt.ts <article.md> [--generate]');
		process.exit(1);
	}

	if (!existsSync(articlePath)) {
		console.error(`File not found: ${articlePath}`);
		process.exit(1);
	}

	// Read article
	const content = await Bun.file(articlePath).text();
	const { frontmatter, body } = parseFrontmatter(content);

	const title = frontmatter.title as string;
	const description = (frontmatter.description as string) || '';
	const tension = frontmatter.tension as string | undefined;
	const tags = (frontmatter.tags as string[]) || [];
	const themes = extractThemes(body, tags);
	const tone = inferTone(body, frontmatter);

	// Generate prompt
	const prompt = generatePrompt(title, description, tension, themes, tone, body);

	if (values.generate) {
		// Generate image
		const slug = basename(articlePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
		const outputPath = join(values.output, `${slug}-hero.png`);
		await generateImageWithGemini(prompt, outputPath);
	} else {
		// Just output the prompt
		console.log('='.repeat(80));
		console.log('IMAGE GENERATION PROMPT');
		console.log('='.repeat(80));
		console.log(prompt);
		console.log('='.repeat(80));
		console.log('\nTo generate image, run with --generate flag');
		console.log('Or copy the prompt above into Gemini/DALL-E/Midjourney');
	}
}

main().catch(console.error);
