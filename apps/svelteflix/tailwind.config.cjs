const tailwindConfig = require('tailwind-config')

module.exports = {
	presets: [tailwindConfig],
	theme: {
		extend: {
			colors: {
				'bg-gradient-1': 'hsl(0, 0%, 8%)',
				'bg-gradient-2': 'hsl(0, 0%, 2%)',
				primary: '#ccc',
				accent: 'hsl(1, 59%, 50%)'
			},
			backgroundImage: {
				'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))'
			},
			keyframes: {
				'scrolling-lg': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(-100%)' }
				},
				'scrolling-sm': {
					'0%': { transform: 'translateY(85%)' },
					'100%': { transform: 'translateY(-100%)' }
				},
				scrolling: {
					'0%': { transform: 'translateY(70%)' },
					'100%': { transform: 'translateY(-100%)' }
				}
			}
		}
	}
}
