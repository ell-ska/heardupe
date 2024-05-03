import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'

export type gamePlaylist = Artist | Playlist
export type gameTracks = (Track | PlaylistedTrack)[]

export type gameData = {
  playlist: gamePlaylist
  tracks: gameTracks
}

export type statistic = {
  metric: string
  value: string | number
}
