import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk'

import { auth } from '@/auth'
import { AuthUser } from '@/types'

const clientID = process.env.SPOTIFY_CLIENT_ID || ''

const getServerSdk = async () => {
  const session = await auth()
  const user = session?.user as AuthUser

  const accessToken: AccessToken = {
    access_token: user?.access_token,
    token_type: user?.token_type,
    expires_in: user?.expires_in,
    refresh_token: user?.refresh_token,
  }

  return SpotifyApi.withAccessToken(clientID, accessToken)
}

export { getServerSdk }
