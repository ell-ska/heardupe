import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

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
      if (!user.email) {
        console.error('missing email, aborting sign in')
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
      console.log('access token:', token.access_token)
      console.log('refresh token:', token.refresh_token)
      console.log(
        'session expires at:',
        new Date(token.expires_at).getHours(),
        ':',
        new Date(token.expires_at).getMinutes(),
      )
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
    async session({ session, token }) {
      const user = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
      }

      session.user = user
      session.error = token.error
      return session
    },
  },
})

declare module '@auth/core/types' {
  interface Session {
    error?: 'RefreshAccessTokenError'
  }
  interface User {
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
    error?: 'RefreshAccessTokenError'
  }
}
