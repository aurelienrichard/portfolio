import { sveltekit } from '@sveltejs/kit/vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { defineConfig } from 'vitest/config'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'happy-dom',
		setupFiles: ['./tests/setup.ts']
	}
})
