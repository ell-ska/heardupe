import { JWT } from 'next-auth/jwt'

const refreshAccessToken = async (token: JWT) => {
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', token.refresh_token as string)

    const response = await fetch('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      body: params,
      method: 'POST',
    })

    const refreshedToken = await response.json()

    if (!response.ok) {
      throw refreshedToken
    }

    console.log('token refreshed')

    return {
      ...token,
      access_token: refreshedToken.access_token,
      expires_at: refreshedToken.expires_in * 1000 + Date.now(),
      refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
    }
  } catch (error) {
    console.error('[AUTH_REFRESH_ACCESS_TOKEN_ERROR]', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export { refreshAccessToken }
