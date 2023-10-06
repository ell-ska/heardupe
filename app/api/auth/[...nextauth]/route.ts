import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { spotifyClient, loginUrl } from '@/utils/spotify'

const refreshAccessToken = async (token: any) => {
  try {
    spotifyClient.setRefreshToken(token.refreshToken || '')

    const { body: refreshedToken } = await spotifyClient.refreshAccessToken()
    console.log('token has been refreshed: ' + refreshedToken)

    spotifyClient.setAccessToken(refreshedToken.access_token)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: loginUrl,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // authenticate
    async jwt({ token, account }: { token: any; account: any }) {
      // on initial sign in
      if (account) {
        console.log('sign in complete')
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          // comes back: 3600 = 1 hour in seconds. * 1000 turns it into milliseconds
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      // if access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        console.log('token is valid')
        return token
      }

      // if access token is expired
      console.log('token is expired')
      return await refreshAccessToken(token)
    },
    // allow the client access to this data
    async session({ session, token }: { session: any; token: any }) {
      session.user.accessToken = token.accessToken
      session.user.username = token.sub

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
