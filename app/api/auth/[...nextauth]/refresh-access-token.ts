import { JWT } from 'next-auth/jwt'

const refreshAccessToken = async (token: JWT) => {
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', token.refresh_token as string)
    // params.append('client_id', process.env.SPOTIFY_CLIENT_ID || '')

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

    console.log({ response })

    const refreshedToken = await response.json()
    console.log({ refreshedToken })

    if (!response.ok) {
      throw refreshedToken
    }

    console.log('token refreshed')

    return {
      ...token,
      access_token: refreshedToken.access_token,
      token_type: refreshedToken.token_type,
      expires_at: refreshedToken.expires_in * 1000 + Date.now(),
      refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
      scope: refreshedToken.scope,
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export { refreshAccessToken }
