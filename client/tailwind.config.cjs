/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',],
	theme: {
		extend: {
			keyframes: {
				'lds-ellipsis1': {
					'0%': { transform: 'scale(0)' },
					'100%': { transform: 'scale(1)' }
				},
				'lds-ellipsis3': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(0)' }
				},
				'lds-ellipsis2': {
					'0%': { transform: 'translate(0, 0)' },
					'100%': { transform: 'scale(24px, 0)' }
				},
			}
		},
		fontFamily: {
			'body': ['Sofia Sans','Source Code Pro'],
			'display': ['Exo 2'],
			'sans': ['Sree Krushnadevaraya']
		}
	},
	plugins: [],
}
