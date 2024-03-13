module.exports = {
	root: true,
	extends: ['@repo/eslint-config'],
	parserOptions: {
		project: true
	},
	rules: {
		'@typescript-eslint/no-unsafe-call': 'off'
	}
}
