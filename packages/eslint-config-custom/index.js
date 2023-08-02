module.exports = {
	env: {
		node: true,
		browser: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'turbo',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'error',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'lines-between-class-members': 'off',
		'@typescript-eslint/lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true }
		],
		'@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
		'no-param-reassign': ['error', { props: false }],
		eqeqeq: ['error', 'smart']
	}
}
