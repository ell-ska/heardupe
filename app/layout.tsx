import type { Metadata } from 'next'
import { Lexend, Climate_Crisis } from 'next/font/google'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import { cn } from '@/utils/classnames'
import AuthSessionProvider from '@/providers/AuthSessionProvider'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body
        className={cn(
          lexend.variable,
          climatCrisis.variable,
          'flex min-h-screen flex-col items-center bg-neutral-900 font-primary text-white',
        )}
      >
        <AuthSessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
