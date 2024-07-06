import { notFound } from 'next/navigation'
import type { Market, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'

import { Game } from '@/components/Game/Game'
import { getServerSdk } from '@/lib/spotify/spotify-server'
import { shuffle } from '@/utils/shuffle'
import type { GameData, GameTracks } from '@/types'

type GamePageProps = {
  params: {
    type: string
    id: string
  }
}

export default async function GamePage({
  params: { type, id },
}: GamePageProps) {
  if (type !== 'artist' && type !== 'playlist') return notFound()
  const gameData = await getGameData({ type, id })

  return (
    <main className='relative flex w-full grow flex-col'>
      <Game
        playlist={gameData.playlist}
        tracks={gameData.tracks}
        type={type}
        id={id}
      />
    </main>
  )
}

const getGameData = async ({
  type,
  id,
}: {
  type: 'artist' | 'playlist'
  id: string
}): Promise<GameData> => {
  const sdk = await getServerSdk()

  if (type === 'artist') {
    const playlist = await sdk.artists.get(id)

    const user = await sdk.currentUser.profile()
    const tracks = (await sdk.artists.topTracks(id, user.country as Market))
      .tracks
    const shuffledTracks = shuffle(tracks).slice(0, 10)
    const validTracks = removeTracksWithoutPreviewUrl({
      type,
      tracks: shuffledTracks,
    })

    return { playlist, tracks: validTracks }
  }

  const playlist = await sdk.playlists.getPlaylist(id)

  const tracks = (await sdk.playlists.getPlaylistItems(id)).items
  const shuffledTracks = shuffle(tracks).slice(0, 10)
  const validTracks = removeTracksWithoutPreviewUrl({
    type,
    tracks: shuffledTracks,
  })

  return { playlist, tracks: validTracks }
}

const removeTracksWithoutPreviewUrl = ({
  type,
  tracks,
}: {
  type: 'artist' | 'playlist'
  tracks: GameTracks
}) => {
  return tracks.filter(track => {
    switch (type) {
      case 'artist':
        return (track as Track).preview_url
      case 'playlist':
        const playlistTrack = (track as PlaylistedTrack).track
        return (playlistTrack as Track).preview_url
    }
  })
}
