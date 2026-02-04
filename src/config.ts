import type { SiteConfig } from './types.js';

export const config: SiteConfig = {
	// Identity
	title: 'bristanback.com',
	description:
		'A digital atelier at the intersection of technology, design, and the human experience of building.',
	url: 'https://bristanback.com',
	language: 'en',

	// Author
	author: {
		name: 'Bri Stanback',
		url: 'https://bristanback.com/about/',
	},

	// Build paths
	contentDir: 'content',
	outputDir: 'dist',
	staticDir: 'static',
	stylesDir: 'styles',
};
