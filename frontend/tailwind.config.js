/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bgStart: '#0f0c29',
                bgMid: '#302b63',
                bgEnd: '#24243e',
                neonPink: '#FF007F',
                neonYellow: '#FBFF00',
                neonCyan: '#00F3FF',
                neonPurple: '#B026FF',
                glassBg: 'rgba(255, 255, 255, 0.05)',
                glassBorder: 'rgba(255, 255, 255, 0.15)',
                glassHighlight: 'rgba(255, 255, 255, 0.25)',
            },
            fontFamily: {
                sans: ['"Outfit"', 'system-ui', 'sans-serif'], // A more modern, rounded geometric font if available, fallback to sans
                display: ['"Space Grotesk"', 'sans-serif'],
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-fast': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                }
            },
            backgroundImage: {
                'cosmic-gradient': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
                'mesh-pattern': `radial-gradient(at 40% 20%, hsla(280,100%,74%,1) 0px, transparent 50%),
                         radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                         radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
                         radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                         radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                         radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                         radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
            }
        },
    },
    plugins: [],
}
