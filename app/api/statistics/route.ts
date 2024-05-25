import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getServerSdk } from '@/lib/spotify/spotify-server'
import { currentProfile } from '@/lib/current-profile'
import { getMostFrequent } from '@/utils/getMostFrequent'
import type { statistic } from '@/types'

export const GET = async () => {
  try {
    const profile = await currentProfile()
    const sdk = await getServerSdk()

    if (!profile) {
      new NextResponse('No profile', { status: 401 })
      return redirect('/')
    }

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

    const statistics: statistic[] = [
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

    return NextResponse.json(statistics)
  } catch (error) {
    console.log('[STATISTICS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
