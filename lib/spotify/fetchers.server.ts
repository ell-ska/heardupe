import { redirect } from 'next/navigation'

import { getServerSdk } from './spotify-server'
import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { getMostFrequent } from '@/utils/getMostFrequent'
import type { Statistic } from '@/types'

export const getUserStatistics = async () => {
  try {
    const profile = await currentProfile()
    if (!profile) return redirect('/')

    const sdk = await getServerSdk()

    const games = await db.game.findMany({
      where: {
        profileId: profile.id,
      },
    })

    const topArtistId = getMostFrequent(
      games.filter(game => game.type === 'artist').map(game => game.gameId),
    )
    const topArtist = topArtistId && (await sdk.artists.get(topArtistId)).name

    const topPlaylistId = getMostFrequent(
      games.filter(game => game.type === 'playlist').map(game => game.gameId),
    )
    const topPlaylist =
      topPlaylistId && (await sdk.playlists.getPlaylist(topPlaylistId)).name

    const statistics: Statistic[] = [
      {
        metric: 'Games played',
        value: games.length,
      },
      {
        metric: 'Total score',
        value: profile.totalScore,
      },
      {
        metric: 'Top artist',
        value: topArtist || 'Play more!',
      },
      {
        metric: 'Top playlist',
        value: topPlaylist || 'Play more!',
      },
    ]

    return statistics
  } catch (error) {
    console.log('[GET_USER_STATISTICS]', error)
    // TODO: add some sort of error handling?
    return undefined
  }
}
