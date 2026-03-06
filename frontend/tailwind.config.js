/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBase: '#020617', // Very dark slate
                panelBg: 'rgba(15, 23, 42, 0.4)', // Semi-transparent slate
                cyberBlue: '#00F0FF', // Neon Cyan
                deepPurple: '#6D28D9', // Accent purple
                neonGreen: '#059669', // Emerald
                alertRed: '#E11D48', // Rose
                borderGlow: 'rgba(0, 240, 255, 0.3)',
            },
            fontFamily: {
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
                mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
            },
            backgroundImage: {
                'grid-pattern': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%2300f0ff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            boxShadow: {
                'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(0, 240, 255, 0.1)',
                'glow-purple': '0 0 15px rgba(109, 40, 217, 0.5), inset 0 0 10px rgba(109, 40, 217, 0.1)',
                'card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            },
            animation: {
                'scanline': 'scanline 8s linear infinite',
                'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
                    '50%': { opacity: '1', filter: 'brightness(1.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
