import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'
import { Session, User } from 'next-auth'

export type ExtendedUser = User & {
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
}

export type ExtendedSession = Session & { error: string | undefined }

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
