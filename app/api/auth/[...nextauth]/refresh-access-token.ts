import { JWT } from 'next-auth/jwt'
import { authURL } from './spotify-profile'

const refreshAccessToken = async (token: JWT) => {
  try {
    const response = await fetch(authURL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    console.log('token refreshed')

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
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
