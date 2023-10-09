import type {
  Track,
  PlaylistedTrack,
  Playlist,
  Artist,
} from '@spotify/web-api-ts-sdk'

type gameData = {
  playlist: Artist | Playlist
  tracks: Track[] | PlaylistedTrack[]
}

export type { gameData }
