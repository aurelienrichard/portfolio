module.exports = {
	extends: ['@repo/eslint-config'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true
	},
	ignorePatterns: ['apps/**', 'packages/**'],
	rules: {
		'import/no-default-export': 'off'
	}
}
