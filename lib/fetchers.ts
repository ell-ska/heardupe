import type { Market } from '@spotify/web-api-ts-sdk'

import type { gameData } from '@/types'
import sdk from '@/lib/spotify-client'

const getGameData = async (type: string, id: string): Promise<gameData> => {
  const shuffle = (tracks: any[]) => {
    return tracks.sort(() => 0.5 - Math.random())
  }

  if (type === 'artist') {
    const user = await sdk.currentUser.profile()
    const playlist = await sdk.artists.get(id)
    const tracks = shuffle(
      (await sdk.artists.topTracks(id, user.country as Market)).tracks,
    )

    return { playlist, tracks }
  } else if (type === 'playlist') {
    const playlist = await sdk.playlists.getPlaylist(id)
    const tracks = shuffle((await sdk.playlists.getPlaylistItems(id)).items)

    return { playlist, tracks }
  } else {
    throw 'That type is not avaliable'
  }
}

export { getGameData }
