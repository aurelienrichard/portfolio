module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:svelte/recommended',
		'turbo',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		extraFileExtensions: ['.svelte']
	},
	ignorePatterns: ['node_modules', 'build', '*.cjs', 'svelte.config.js', 'vite.config.ts'],
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
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
		],
		'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
		'no-param-reassign': ['error', { props: false }],
		eqeqeq: ['error', 'smart']
	}
}
