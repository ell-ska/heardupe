import type { Metadata } from 'next'
import { Lexend, Climate_Crisis } from 'next/font/google'

import { cn } from '@/utils/classnames'
import NextAuthProvider from '@/providers/NextAuthProvider'
import './globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
})

const climatCrisis = Climate_Crisis({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-climate-crisis',
})

export const metadata: Metadata = {
  title: 'Heardupe',
  description: "A dupe of Spotify's music quiz Heardle",
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          lexend.variable,
          climatCrisis.variable,
          'flex flex-col items-center bg-neutral-900 font-primary text-white',
        )}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
