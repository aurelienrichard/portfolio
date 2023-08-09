module.exports = {
	env: {
		node: true,
		browser: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
		// extraFileExtensions: ['.svelte']
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'turbo',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['node_modules', '*.cjs'],
	rules: {}
}
