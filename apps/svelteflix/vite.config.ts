import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type PluginOption } from 'vite'

export default defineConfig({
	plugins: [sveltekit() as PluginOption],
	test: {
		include: ['src/**/*.test.ts'],
		environmentMatchGlobs: [['**/[A-Z]*.test.ts', 'happy-dom']],
		setupFiles: ['./vitest-setup.ts']
	}
})
