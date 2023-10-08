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
      // minHeight: {
      //   // it works, it's just new
      //   // @ts-ignore: string[] not assignable to string
      //   screen: ['100vh', '100svh'],
      // },
      screens: {
        xs: '480px',
        'touch-device': { raw: '(pointer: coarse) and (hover: none)' },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

export default config
