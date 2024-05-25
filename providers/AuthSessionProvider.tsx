import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'

type AuthSessionProviderProps = {
  children: React.ReactNode
}

export const AuthSessionProvider = async ({
  children,
}: AuthSessionProviderProps) => {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
