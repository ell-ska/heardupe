'use client'

import { useEffect } from 'react'
import type { Track } from '@spotify/web-api-ts-sdk'

import { useStatus } from '@/hooks/useGame'
import Search from '@/components/Game/Search'
import Guesses from '@/components/Game/Guesses'
import MusicPlayer from '@/components/Game/MusicPlayer'
import type { gamePlaylist, gameTracks } from '@/types'

type GameProps = {
  playlist: gamePlaylist
  tracks: gameTracks
  type: string
}

const Game = ({ playlist, tracks, type }: GameProps) => {
  const { level, setCurrentTrack } = useStatus()

  useEffect(() => {
    setCurrentTrack(
      (type === 'playlist'
        ? tracks[level - 1].track
        : tracks[level - 1]) as Track,
    )
  }, [level, tracks, setCurrentTrack, type])

  return (
    <div>
      <Search />
      <Guesses />
      <MusicPlayer />
    </div>
  )
}

export default Game
