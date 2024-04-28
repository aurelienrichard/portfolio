import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts'],
		environmentMatchGlobs: [['**/*.svelte.test.ts', 'happy-dom']],
		setupFiles: ['./src/vitest-setup.ts']
	}
})
