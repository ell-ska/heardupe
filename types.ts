import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'

export type GamePlaylist = Artist | Playlist
export type GameTracks = (Track | PlaylistedTrack)[]

export type GameData = {
  playlist: GamePlaylist
  tracks: GameTracks
}

export type Statistic = {
  metric: string
  value: string | number
}
