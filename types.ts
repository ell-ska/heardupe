import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'

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
