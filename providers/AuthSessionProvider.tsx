'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type AuthSessionProviderProps = {
  session: Session | null | undefined
  children: React.ReactNode
}

const AuthSessionProvider = ({
  session,
  children,
}: AuthSessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider
