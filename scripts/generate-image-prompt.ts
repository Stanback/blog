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

// Use Gemini text model to refine meta-prompt into a direct image prompt
async function refinePromptWithGemini(metaPrompt: string, apiKey: string): Promise<string> {
	console.log('Refining prompt with Gemini...');

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: `${metaPrompt}

IMPORTANT: Output ONLY the image generation prompt. No explanations, no markdown formatting, no code blocks. Just the direct prompt text that can be sent to an image model like Imagen or DALL-E. Keep it under 500 words. Be specific and visual.`,
							},
						],
					},
				],
				generationConfig: {
					temperature: 0.7,
					maxOutputTokens: 1024,
				},
			}),
		},
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Gemini API error: ${error}`);
	}

	const data = await response.json();
	const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

	if (!text) {
		throw new Error('No text in Gemini response');
	}

	return text.trim();
}

// Call Gemini Imagen API to generate image
async function generateImageWithGemini(
	metaPrompt: string,
	outputPath: string,
	apiKey: string,
): Promise<void> {
	// Step 1: Refine meta-prompt into direct image prompt
	const imagePrompt = await refinePromptWithGemini(metaPrompt, apiKey);
	console.log('\n--- Refined Image Prompt ---');
	console.log(imagePrompt);
	console.log('----------------------------\n');

	// Step 2: Generate image with Gemini 2.0 Flash (image generation mode)
	console.log('Generating image with Gemini 2.0 Flash...');

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [
					{
						parts: [{ text: `Generate an image: ${imagePrompt}` }],
					},
				],
				generationConfig: {
					responseModalities: ['image', 'text'],
					responseMimeType: 'text/plain',
				},
			}),
		},
	);

	if (!response.ok) {
		const error = await response.text();
		console.error('Gemini image generation error:', error);
		process.exit(1);
	}

	const data = await response.json();

	// Find the inline_data part with the image
	const parts = data.candidates?.[0]?.content?.parts || [];
	const imagePart = parts.find((p: { inlineData?: { mimeType: string } }) =>
		p.inlineData?.mimeType?.startsWith('image/'),
	);
	const imageData = imagePart?.inlineData?.data;

	if (!imageData) {
		console.error('No image data in response');
		console.error(JSON.stringify(data, null, 2));
		process.exit(1);
	}

	// Write image
	const buffer = Buffer.from(imageData, 'base64');
	await Bun.write(outputPath, buffer);
	console.log(`✓ Image saved to: ${outputPath}`);
}

// Just refine the prompt (without generating image)
async function refineOnly(metaPrompt: string, apiKey: string): Promise<string> {
	return refinePromptWithGemini(metaPrompt, apiKey);
}

// Main
async function main() {
	const { values, positionals } = parseArgs({
		args: Bun.argv.slice(2),
		options: {
			generate: { type: 'boolean', default: false },
			refine: { type: 'boolean', default: false },
			output: { type: 'string', default: 'static/images/posts' },
			save: { type: 'boolean', default: false },
		},
		allowPositionals: true,
	});

	const articlePath = positionals[0];
	if (!articlePath) {
		console.error(`Usage: bun scripts/generate-image-prompt.ts <article.md> [options]

Options:
  --refine    Use Gemini to convert meta-prompt to direct image prompt
  --generate  Generate image via Imagen API (includes --refine)
  --output    Output directory for images (default: static/images/posts)
  --save      Save refined prompt to prompts/posts/

Examples:
  bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md
  bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md --refine
  bun scripts/generate-image-prompt.ts content/posts/2026-02-04-proof-not-truth.md --generate
`);
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

	// Generate meta-prompt
	const metaPrompt = generatePrompt(title, description, tension, themes, tone, body);
	const slug = basename(articlePath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');

	// Check for API key if needed
	const apiKey = process.env.GEMINI_API_KEY;
	const needsApi = values.generate || values.refine;

	if (needsApi && !apiKey) {
		console.error('Error: GEMINI_API_KEY environment variable not set');
		console.error('Run with: GEMINI_API_KEY=xxx bun scripts/generate-image-prompt.ts ...');
		console.error('Or: source ~/.config/shell/secrets.zsh && bun scripts/...');
		process.exit(1);
	}

	if (values.generate) {
		// Full pipeline: refine + generate image
		const outputPath = join(values.output, `${slug}-hero.png`);
		await generateImageWithGemini(metaPrompt, outputPath, apiKey!);
	} else if (values.refine) {
		// Just refine the prompt
		const imagePrompt = await refineOnly(metaPrompt, apiKey!);
		console.log(`\n${'='.repeat(80)}`);
		console.log('REFINED IMAGE PROMPT (ready for Imagen/DALL-E)');
		console.log('='.repeat(80));
		console.log(imagePrompt);
		console.log('='.repeat(80));

		if (values.save) {
			const promptPath = join('prompts', 'posts', `${slug}-refined.md`);
			await Bun.write(promptPath, `# Image Prompt: ${title}\n\n${imagePrompt}`);
			console.log(`\n✓ Saved to ${promptPath}`);
		}
	} else {
		// Just output the meta-prompt
		console.log('='.repeat(80));
		console.log('META-PROMPT (for Claude/GPT to refine, or paste into Gemini directly)');
		console.log('='.repeat(80));
		console.log(metaPrompt);
		console.log('='.repeat(80));
		console.log('\nOptions:');
		console.log('  --refine    → Use Gemini to create direct image prompt');
		console.log('  --generate  → Generate image with Imagen API');
		console.log('  --save      → Save refined prompt to file');
	}
}

main().catch(console.error);
