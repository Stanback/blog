import type { SiteConfig } from './types.js';

export const config: SiteConfig = {
	// Identity
	title: 'Bri Stanback',
	description:
		'A digital atelier at the intersection of technology, design, and the human experience of building.',
	url: 'https://bristanback.com',
	language: 'en',

	// Author
	author: {
		name: 'Bri Stanback',
		url: 'https://bristanback.com/about/',
		sameAs: [
			'https://twitter.com/Stanback',
			'https://linkedin.com/in/bstanback',
			'https://github.com/Stanback',
		],
	},

	// Build paths
	contentDir: 'content',
	outputDir: 'dist',
	staticDir: 'static',
	stylesDir: 'styles',
};
