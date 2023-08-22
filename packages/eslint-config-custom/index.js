module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:svelte/recommended',
		'turbo',
		'prettier'
	],
	plugins: ['@typescript-eslint', 'import-no-duplicates-prefix-resolved-path'],
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
				'import/no-mutable-exports': 'off',
				'import/named': 'off',
				'import/namespace': 'off',
				'import/default': 'off',
				'import/no-named-as-default-member': 'off'
			}
		}
	],
	env: {
		es2020: true,
		node: true,
		browser: true
	},
	settings: {
		'import/parsers': {
			'svelte-eslint-parser': ['.svelte'],
			'@typescript-eslint/parser': ['ts'],
			espree: ['js']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			},
			node: true,
			'eslint-import-resolver-custom-alias': {
				alias: {
					$lib: 'src/lib',
					$app: 'node_modules/@sveltejs/kit/src/runtime/app',
					'@sveltejs/kit': 'node_modules/@sveltejs/kit/src/exports/index.js'
				}
			}
		}
	},
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
		],
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'import/no-extraneous-dependencies': 'off',
		'import/no-duplicates': 'off',
		'import-no-duplicates-prefix-resolved-path/no-duplicates': [
			'error',
			{
				prefixResolvedPathWithImportName: true
			}
		],
		'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
		'no-param-reassign': ['error', { props: false }],
		eqeqeq: ['error', 'smart']
	}
}
