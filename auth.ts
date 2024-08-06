import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { db } from '@/lib/db'
import { authURL } from '@/lib/auth/configs'

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
      if (!user.email) throw Error('Email is missing in user')

      const betaUserRequest = await db.betaUserRequest.findUnique({
        where: { email: user.email },
      })
      if (!betaUserRequest) {
        throw Error('No beta user request')
      }
      if (betaUserRequest && !betaUserRequest.inDashboard) {
        throw Error('Beta user request has not been approved yet')
      }

      const existingProfile = await db.profile.findUnique({
        where: {
          email: user.email,
        },
      })
      if (!existingProfile) {
        await db.profile.create({
          data: {
            email: user.email,
          },
        })
      }

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

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
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
