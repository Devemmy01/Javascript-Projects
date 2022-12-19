module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,html,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};