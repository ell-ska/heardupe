'use client'

import { getSession, signIn } from 'next-auth/react'
import {
  AccessToken,
  IAuthStrategy,
  SdkConfiguration,
  SpotifyApi,
} from '@spotify/web-api-ts-sdk'

class Strategy implements IAuthStrategy {
  public getOrCreateAccessToken = (): Promise<AccessToken> => {
    return this.getAccessToken()
  }

  public getAccessToken = async (): Promise<AccessToken> => {
    const session: any = await getSession()

    if (!session) {
      return {} as AccessToken
    }

    if (session.error === 'RefreshAccessTokenError') {
      await signIn()
      return this.getAccessToken()
    }

    const { user } = session

    if (!user) {
      await signIn()
      return this.getAccessToken()
    }

    return {
      access_token: user.access_token,
      token_type: 'Bearer',
      expires_in: user.expires_in,
      expires: user.expires_at,
      refresh_token: user.refresh_token,
    }
  }

  public removeAccessToken = (): void => {
    console.warn('[SPOTIFY-SDK]\nremoveAccessToken not implemented yet')
  }

  public setConfiguration = (configuration: SdkConfiguration): void => {
    console.warn('[SPOTIFY-SDK]\nsetConfiguration not implemented yet')
  }
}

const sdk = () => {
  const strategy = new Strategy()
  return new SpotifyApi(strategy)
}

export default sdk()
