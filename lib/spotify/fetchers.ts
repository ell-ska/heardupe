import type { Market, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'

import sdk from '@/lib/spotify/spotify-client'
import type { GameData, GameTracks } from '@/types'

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const getGameData = async (
  type: string,
  id: string,
): Promise<GameData> => {
  const shuffle = <T>(array: T[]): T[] => {
    return array.sort(() => 0.5 - Math.random())
  }

  const removeTracksWithoutPreviewUrl = (tracks: GameTracks) => {
    return tracks.filter(track => {
      if (type === 'artist') {
        return (track as Track).preview_url
      } else {
        const playlistTrack = (track as PlaylistedTrack).track
        return (playlistTrack as Track).preview_url
      }
    })
  }

  if (type === 'artist') {
    const user = await sdk.currentUser.profile()
    const playlist = await sdk.artists.get(id)
    const tracks = (await sdk.artists.topTracks(id, user.country as Market))
      .tracks
    const validTracks = removeTracksWithoutPreviewUrl(tracks)
    const shuffledTracks = shuffle(validTracks).slice(0, 10)

    return { playlist, tracks: shuffledTracks }
  } else if (type === 'playlist') {
    const playlist = await sdk.playlists.getPlaylist(id)
    const tracks = (await sdk.playlists.getPlaylistItems(id)).items
    const validTracks = removeTracksWithoutPreviewUrl(tracks)
    const shuffledTracks = shuffle(validTracks).slice(0, 10)

    return { playlist, tracks: shuffledTracks }
  } else {
    throw 'That type is not avaliable'
  }
}
