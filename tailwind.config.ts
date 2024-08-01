import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'semi-dark': '#222b45',
				'semi-gray': '#8f9bb3',
				'semi-white': '#f7f9fc',
				// primary: {
				// 	100: '#FCCBE1',
				// 	200: '#FA98CD',
				// 	300: '#F264BD',
				// 	400: '#E53DB7',
				// 	500: '#D505AF',
				// 	600: '#B703A7',
				// 	700: '#980299',
				// 	800: '#6F017B',
				// 	900: '#520066',
				// },
				success: {
					100: '#F6FDCC',
					200: '#EAFB99',
					300: '#D8F566',
					400: '#C5EC3F',
					500: '#A9E006',
					600: '#8CC004',
					700: '#71A103',
					800: '#578101',
					900: '#456B01',
				},
				info: {
					100: '#CBFEF0',
					200: '#98FDEB',
					300: '#65F9EB',
					400: '#3EF4F1',
					500: '#02DDED',
					600: '#01ADCB',
					700: '#0182AA',
					800: '#005E89',
					900: '#004471',
				},
				warning: {
					100: '#FEEECE',
					200: '#FDD99E',
					300: '#FBBD6D',
					400: '#F8A148',
					500: '#F4760E',
					600: '#D1590A',
					700: '#AF4007',
					800: '#8D2C04',
					900: '#751D02',
				},
				danger: {
					100: '#FEDDD7',
					200: '#FEB3B0',
					300: '#FD8990',
					400: '#FB6B81',
					500: '#F93B6B',
					600: '#D62B66',
					700: '#B31D60',
					800: '#901256',
					900: '#770B50',
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						foreground: '#1a2138',
						background: '#fff',
						primary: {
							DEFAULT: '#D505AF',
							foreground: '#fff',
						},
					},
				},
				dark: {
					colors: {
						background: '#1a2138',
						foreground: '#fff',
						primary: {
							DEFAULT: '#D505AF',
							foreground: '#fff',
						},
					},
				},
			},
		}),
	],
}
export default config
