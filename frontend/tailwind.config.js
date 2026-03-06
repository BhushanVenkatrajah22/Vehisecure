/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBg: '#050B14',
                deepBlue: '#0A192F',
                electricBlue: '#0052FF',
                neonCyan: '#00F0FF',
                glassBg: 'rgba(10, 25, 47, 0.6)',
                glassBorder: 'rgba(0, 240, 255, 0.2)'
            },
            backgroundImage: {
                'dark-gradient': 'linear-gradient(135deg, #02050A 0%, #0A192F 100%)',
            },
            boxShadow: {
                'neon': '0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 82, 255, 0.2)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
