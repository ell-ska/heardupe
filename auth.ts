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
      if (!user.email) {
        console.error('AUTH_SIGN_IN_EMAIL_MISSING_ERROR')
        return false
      }

      const isBetaUser = await db.betaUserRequest.findUnique({
        where: { email: user.email, inDashboard: true },
      })
      if (!isBetaUser) {
        console.log('not beta user, aborting sign in')
        return false
      }

      const existingProfile = await db.profile.findUnique({
        where: {
          email: user.email,
        },
      })
      if (!existingProfile) {
        try {
          await db.profile.create({
            data: {
              email: user.email,
            },
          })
          console.log('new profile created')
        } catch (error) {
          console.error('[AUTH_SIGN_IN_NEW_USER_ERROR]', error)
          return false
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
          expires_in: account.expires_in,
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
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
      } satisfies ExtendedUser

      session.user = user
      session.error = token.error
      return session
    },
  },
})
