module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:svelte/recommended',
		'plugin:import/recommended',
		'turbo',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		extraFileExtensions: ['.svelte']
	},
	ignorePatterns: ['*.cjs', '*.config.js', '*.config.ts'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				'import/no-mutable-exports': 'off'
			}
		}
	],
	env: {
		es2020: true,
		node: true,
		browser: true
	},
	rules: {
		// https://github.com/iamturns/eslint-config-airbnb-typescript#why-is-importno-unresolved-disabled
		'import/no-unresolved': 'off',
		// unreliable for monorepos
		'import/no-extraneous-dependencies': 'off',
		// yells on import of env variables
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
		'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase']
			},
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: 'parameter',
				format: ['camelCase'],
				leadingUnderscore: 'allow'
			},
			{
				selector: 'typeLike',
				format: ['PascalCase']
			},
			{
				selector: 'objectLiteralProperty',
				format: null
			},
			{
				selector: 'typeProperty',
				format: null
			}
		],
		'@typescript-eslint/non-nullable-type-assertion-style': 'off',
		'no-restricted-imports': ['error', { paths: ['$env/static/private'] }],
		'no-param-reassign': ['error', { props: false }],
		eqeqeq: ['error', 'smart']
	}
}
