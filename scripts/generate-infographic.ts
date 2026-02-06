#!/usr/bin/env bun
/**
 * Generate AI-rendered infographics in blog style
 *
 * Usage:
 *   bun scripts/generate-infographic.ts --type 2x2 --output static/images/posts/my-infographic.png
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const BLOG_STYLE = `
Style: Vintage editorial illustration on warm cream paper. Hand-drawn aesthetic with subtle imperfections.
Color palette: Warm paper tones (#f5f3ef background), deep ink black (#1a1a1a) for primary elements, 
dusty rose (#b8968a) for accents, muted sepia undertones.
Typography feel: Hand-lettered or vintage typewriter, slightly irregular but legible.
Texture: Subtle paper grain, soft shadows, aged quality like a page from a 1960s design manual.
Mood: Thoughtful, precise, quietly confident. Not slick or corporate.
`.trim();

interface QuadrantItem {
	name: string;
	quadrant: 1 | 2 | 3 | 4; // 1=TL, 2=TR, 3=BL, 4=BR
}

interface InfographicConfig {
	type: '2x2';
	title?: string;
	xAxis: { left: string; right: string };
	yAxis: { top: string; bottom: string };
	items: QuadrantItem[];
}

function build2x2Prompt(config: InfographicConfig): string {
	const itemDescriptions = config.items
		.map((item) => {
			const positions = {
				1: 'top-left quadrant',
				2: 'top-right quadrant',
				3: 'bottom-left quadrant',
				4: 'bottom-right quadrant',
			};
			return `"${item.name}" in the ${positions[item.quadrant]}`;
		})
		.join(', ');

	return `
Create a hand-drawn 2×2 quadrant diagram in vintage editorial illustration style.

${BLOG_STYLE}

The diagram:
- Four quadrants divided by hand-drawn intersecting lines (not perfectly straight, slightly organic)
- X-axis label on left: "${config.xAxis.left}" | X-axis label on right: "${config.xAxis.right}"
- Y-axis label on top: "${config.yAxis.top}" | Y-axis label on bottom: "${config.yAxis.bottom}"
- Items positioned: ${itemDescriptions}
- Each item name written in hand-lettered style within its quadrant
- Small decorative elements: maybe tiny dots, subtle flourishes, or gear motifs
${config.title ? `- Title at top: "${config.title}" in elegant hand-lettering` : ''}

The overall feel should be like a diagram sketched in a designer's notebook - thoughtful, precise but human, 
warm paper tones with ink drawings. NOT a corporate PowerPoint slide. Think vintage technical illustration 
meets editorial design.

Landscape orientation, clean composition with breathing room.
`.trim();
}

// Imagen 4 models
const IMAGEN_MODELS = {
	standard: 'imagen-4.0-generate-001',
	ultra: 'imagen-4.0-ultra-generate-001',
	fast: 'imagen-4.0-fast-generate-001',
} as const;

async function generateInfographic(
	prompt: string,
	outputPath: string,
	apiKey: string,
	model: keyof typeof IMAGEN_MODELS = 'standard',
): Promise<void> {
	const modelId = IMAGEN_MODELS[model];
	console.log(`Generating infographic with Imagen 4 (${modelId})...`);
	console.log('\n--- Prompt ---');
	console.log(prompt);
	console.log('--------------\n');

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:predict`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-goog-api-key': apiKey,
			},
			body: JSON.stringify({
				instances: [{ prompt }],
				parameters: {
					sampleCount: 1,
					aspectRatio: '1:1', // Square for infographics
					outputOptions: {
						mimeType: 'image/png',
					},
				},
			}),
		},
	);

	if (!response.ok) {
		const error = await response.text();
		console.error('Imagen 4 error:', error);
		process.exit(1);
	}

	const data = await response.json();
	const imageData = data.predictions?.[0]?.bytesBase64Encoded;

	if (!imageData) {
		console.error('No image in response');
		console.error(JSON.stringify(data, null, 2));
		process.exit(1);
	}

	const buf = Buffer.from(imageData, 'base64');
	writeFileSync(outputPath, buf);
	console.log(`✓ Saved: ${outputPath}`);
}

// CLI
const { values } = parseArgs({
	args: Bun.argv.slice(2),
	options: {
		type: { type: 'string', default: '2x2' },
		config: { type: 'string', short: 'c' },
		output: { type: 'string', short: 'o', default: 'infographic.png' },
		preset: { type: 'string', short: 'p' },
		model: { type: 'string', short: 'm', default: 'standard' }, // standard, ultra, fast
	},
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
	console.error('GEMINI_API_KEY not set');
	console.error('Run: source ~/.config/shell/secrets.zsh');
	process.exit(1);
}

// Presets for quick generation
const PRESETS: Record<string, InfographicConfig> = {
	'multi-agent': {
		type: '2x2',
		title: 'The Multi-Agent Landscape',
		xAxis: { left: 'External', right: 'Native' },
		yAxis: { top: 'Transparent', bottom: 'Opaque' },
		items: [
			{ name: 'Gas Town', quadrant: 1 },
			{ name: 'Beads', quadrant: 1 },
			{ name: 'claude-flow', quadrant: 1 },
			{ name: 'Agent Teams', quadrant: 4 },
			{ name: 'Agents SDK', quadrant: 3 },
		],
	},
};

let config: InfographicConfig;

if (values.preset) {
	config = PRESETS[values.preset];
	if (!config) {
		console.error(`Unknown preset: ${values.preset}`);
		console.error(`Available: ${Object.keys(PRESETS).join(', ')}`);
		process.exit(1);
	}
} else if (values.config) {
	config = JSON.parse(readFileSync(values.config, 'utf-8'));
} else {
	// Default to multi-agent preset for testing
	config = PRESETS['multi-agent'];
}

const prompt = build2x2Prompt(config);
const model = (values.model as keyof typeof IMAGEN_MODELS) || 'standard';
await generateInfographic(prompt, values.output, apiKey, model);
