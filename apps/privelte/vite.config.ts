import { sveltekit } from '@sveltejs/kit/vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { defineConfig } from 'vitest/config'
import type { PluginOption } from 'vite'

import { sentrySvelteKit } from '@sentry/sveltekit'

export default defineConfig(({ mode }) => ({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'aurelienrichard',
				project: 'javascript-sveltekit',
				authToken: process.env.SENTRY_AUTH_TOKEN,
				cleanArtifacts: true
			}
		}),
		sveltekit(),
		purgeCss()
	] as PluginOption[],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		include: ['src/**/*.test.ts'],
		environmentMatchGlobs: [['**/[A-Z]*.test.ts', 'happy-dom']],
		setupFiles: ['./vitest-setup.ts']
	}
}))
