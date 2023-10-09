import type { JWT } from 'next-auth/jwt'
import type { Account, AuthOptions } from 'next-auth'

import { spotifyProfile } from './spotify-profile'
import { refreshAccessToken } from './refresh-access-token'

type AuthUser = {
  name: string
  email: string
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60, // 1hr
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        console.log('sign in complete')
        return {
          ...token,
          access_token: account.access_token,
          token_type: account.token_type,
          expires_at: account.expires_at
            ? account.expires_at * 1000
            : Date.now(),
          refresh_token: account.refresh_token,
          scope: account.scope,
          id: account.providerAccountId,
        }
      }

      if (Date.now() < (token.expires_at as number)) {
        console.log('token is valid')
        return token
      }

      console.log('token is expired')
      return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      }

      session.user = user
      session.error = token.error

      return session
    },
  },
}

export { authOptions, type AuthUser }
