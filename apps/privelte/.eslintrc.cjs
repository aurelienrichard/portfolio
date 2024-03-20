module.exports = {
	root: true,
	extends: ['@repo/eslint-config'],
	parserOptions: {
		project: true
	},
	rules: {
		'no-console': ['warn', { allow: ['error'] }]
	}
}
