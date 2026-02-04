/**
 * Convert OG SVG to PNG
 * Run: bun scripts/convert-og.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svgPath = 'static/images/og-default.svg';
const pngPath = 'static/images/og-default.png';

const svg = readFileSync(svgPath, 'utf-8');

const resvg = new Resvg(svg, {
	fitTo: {
		mode: 'width',
		value: 1200,
	},
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

writeFileSync(pngPath, pngBuffer);

console.log(`✓ Converted ${svgPath} → ${pngPath}`);
console.log(`  Dimensions: ${pngData.width}x${pngData.height}`);
