import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'

export type AuthUser = {
  name: string
  email: string
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

type gamePlaylist = Artist | Playlist
type gameTracks = (Track | PlaylistedTrack)[]

type gameData = {
  playlist: gamePlaylist
  tracks: gameTracks
}

type statistic = {
  metric: string
  value: string | number
}

export type { gamePlaylist, gameTracks, gameData, statistic }
