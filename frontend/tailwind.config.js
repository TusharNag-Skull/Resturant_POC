/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    light: '#F2D06B',
                    DEFAULT: '#D4AF37',
                    dark: '#A88A1A',
                },
                deep: {
                    black: '#050505',
                },
                surface: {
                    dark: '#0D0D0D',
                    elevated: '#141414',
                },
                border: {
                    subtle: 'rgba(212, 175, 55, 0.15)',
                    active: 'rgba(212, 175, 55, 0.6)',
                },
                text: {
                    primary: '#F5F0E8',
                    secondary: '#9A8C7A',
                    muted: '#4A4035',
                },
                success: '#2ECC71',
                cancel: '#3D3D3D',
                whatsapp: '#25D366',
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                subheading: ['Cormorant Garamond', 'serif'],
                body: ['Manrope', 'sans-serif'],
                accent: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(to bottom right, rgba(13, 13, 13, 0.8), rgba(13, 13, 13, 0.4))',
            },
        },
    },
    plugins: [],
}
