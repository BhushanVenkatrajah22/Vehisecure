/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B0F19',
                card: '#111827',
                cardBorder: '#1F2937',
                primary: '#4F46E5', // Indigo 600
                primaryHover: '#4338CA', // Indigo 700
                accent: '#10B981', // Emerald 500
                textMain: '#F9FAFB',
                textMuted: '#9CA3AF'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
