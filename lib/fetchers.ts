import type { Market, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'

import sdk from '@/lib/spotify-client'
import type { gameData, gameTracks } from '@/types'

const getGameData = async (type: string, id: string): Promise<gameData> => {
  const shuffle = <T>(array: T[]): T[] => {
    return array.sort(() => 0.5 - Math.random())
  }

  const removeTracksWithoutPreviewUrl = (tracks: gameTracks) => {
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

export { getGameData }
