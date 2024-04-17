import { sveltekit } from '@sveltejs/kit/vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { defineConfig, type PluginOption } from 'vite'

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit() as PluginOption, purgeCss()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		include: ['src/**/*.test.ts'],
		environmentMatchGlobs: [['**/[A-Z]*.test.ts', 'happy-dom']],
		setupFiles: ['./vitest-setup.ts']
	}
}))
