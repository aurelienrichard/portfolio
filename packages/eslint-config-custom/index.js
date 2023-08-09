module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'turbo',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		extraFileExtensions: ['.svelte']
	},
	plugins: ['@typescript-eslint'],
	env: {
		node: true,
		browser: true
	},
	ignorePatterns: ['node_modules', '*.cjs'],
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
	}
}
