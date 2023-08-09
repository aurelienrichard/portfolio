module.exports = {
	root: true,
	extends: ['custom'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: '.svelte-kit/tsconfig.json'
	}
}
