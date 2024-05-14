module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:svelte/recommended',
		'plugin:import/recommended',
		'plugin:tailwindcss/recommended',
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
		// default export is awful
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
		'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
		// getting data from 3rd party apis which naming conventions I don't control makes this rule insufferable
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false
			}
		],
		'no-param-reassign': ['error', { props: false }],
		eqeqeq: ['error', 'smart']
	}
}
