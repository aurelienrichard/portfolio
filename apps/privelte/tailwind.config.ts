import { join } from 'path'
// 1. Import the Skeleton plugin
import tailwindConfig from 'tailwind-config'
import { skeleton } from '@skeletonlabs/tw-plugin'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'

const config = {
	presets: [tailwindConfig],
	// 2. Opt for dark mode to be handled via the class method
	theme: {
		extend: {
			colors: {
				'gradient-1': {
					light: colors.indigo[600],
					dark: '#e15c77'
				},
				'gradient-2': {
					light: colors.pink[600],
					dark: '#d4163c'
				}
			},
			backgroundImage: {
				'radial-gradient': 'radial-gradient(circle at top, var(--tw-gradient-stops))'
			}
		}
	},
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	plugins: [
		forms,
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({ themes: { preset: ['crimson'] } })
	]
} satisfies Config

// eslint-disable-next-line import/no-default-export
export default config
