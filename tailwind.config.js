/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				warm: '#F9F7F5',
				'accent-green-light-brand': '#BFD962',
				'accent-green-light-bg': '#ECF2D5',
				'primary-dark': '#203136',
				'stroke-cards': '#F1F1F1'
			},
			textColor: {
				'accent-green-light-brand': '#BFD962',
				'primary-dark': '#203136',
				'stroke-dark': '#8A8987',
				'accent-dark-blue': '#425DB6',
				'stroke-medium': '#DDDAD0'
			},
			borderColor: {
				'stroke-cards': '#F1F1F1'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				inter: ['Inter', 'sans-serif']
			},
      screens: {
        'lg-screens': '1920px'
        // => @media (min-width: 1920px) { ... }
      }
		},
	},
	plugins: []
};
