import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk'

import { auth, signIn } from '@/auth'

const clientID = process.env.SPOTIFY_CLIENT_ID || ''

const getServerSdk = async (): Promise<SpotifyApi> => {
  const session = await auth()
  const user = session?.user

  if (!user) await signIn('spotify')

  const accessToken = {
    access_token: user?.access_token,
    token_type: user?.token_type,
    expires_in: user?.expires_in,
    refresh_token: user?.refresh_token,
  } as AccessToken

  return SpotifyApi.withAccessToken(clientID, accessToken)
}

export { getServerSdk }
