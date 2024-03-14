import { sveltekit } from '@sveltejs/kit/vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), purgeCss()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		include: ['src/**/*.test.ts'],
		environmentMatchGlobs: [['**/[A-Z]*.test.ts', 'happy-dom']],
		setupFiles: ['./vitest-setup.ts']
	}
}))
