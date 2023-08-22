module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:svelte/recommended',
		'turbo',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		extraFileExtensions: ['.svelte']
	},
	plugins: ['@typescript-eslint'],
	env: {
		es2020: true,
		node: true,
		browser: true
	},
	ignorePatterns: ['node_modules', 'build', '*.cjs', 'svelte.config.js'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
		]
	}
}
