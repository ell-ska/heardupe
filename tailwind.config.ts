import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      primary: 'var(--font-lexend)',
      branding: 'var(--font-climate-crisis)',
    },
    extend: {
      colors: {
        primary: '#1ED760',
      },
    },
  },
  plugins: [],
}

export default config
