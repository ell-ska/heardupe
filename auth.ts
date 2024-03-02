import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { db } from '@/lib/db'
import { authURL } from '@/lib/auth/configs'
import { refreshAccessToken } from '@/lib/auth/refresh-access-token'
import type { ExtendedUser } from '@/types'

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
          expires_at: account.expires_at
            ? account.expires_at * 1000
            : Date.now(),
          refresh_token: account.refresh_token,
        }
      }

      if (Date.now() < (token.expires_at as number)) {
        return token
      }

      console.log('token expired')
      return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: any }) {
      const user = {
        ...session.user,
        access_token: token.access_token,
        expires_at: token.expires_at,
        refresh_token: token.refresh_token,
      } satisfies ExtendedUser

      session.user = user
      session.error = token.error
      return session
    },
  },
})
