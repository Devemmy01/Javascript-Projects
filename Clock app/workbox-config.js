module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,css,png,js,eot,svg,ttf,woff,woff2}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};