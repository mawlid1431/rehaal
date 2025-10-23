import type { Config } from 'tailwindcss'

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './App.tsx',
        './components/**/*.{js,ts,jsx,tsx}',
        './lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config
