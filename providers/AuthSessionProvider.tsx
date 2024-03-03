import { SessionProvider } from 'next-auth/react'

import { auth, signIn } from '@/auth'

type AuthSessionProviderProps = {
  children: React.ReactNode
}

const AuthSessionProvider = async ({ children }: AuthSessionProviderProps) => {
  const session = await auth()
  if (session?.error === 'RefreshAccessTokenError') signIn('spotify')

  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider
