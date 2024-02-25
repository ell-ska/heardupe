import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { AuthUser } from '@/types'
import { db } from '@/lib/db'
import { authURL } from '@/lib/auth/configs'
import { refreshAccessToken } from '@/lib/auth/refresh-access-token'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: authURL.toString(),
    }),
  ],
  session: {
    maxAge: 60 * 60, // 1hr
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      const existingProfile = await db.profile.findUnique({
        where: {
          email: user.email as string,
        },
      })

      if (!existingProfile) {
        try {
          if (!user.id) throw Error('no user id')
          if (!user.email) throw Error('no user email')

          await db.profile.create({
            data: {
              email: user.email,
            },
          })
          console.log('new profile created')
        } catch (error) {
          console.error('[SIGN_IN_NEW_USER_ERROR]', error)
        }
      }

      console.log('sign in complete')
      return true
    },
    async jwt({ token, account }) {
      if (account) {
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
})
