'use client'

import type { gamePlaylist, gameTracks } from '@/types'
import Search from '@/components/Game/Search'
import Guesses from '@/components/Game/Guesses'

type GameProps = {
  playlist: gamePlaylist
  tracks: gameTracks
  type: string
}

const Game = ({ playlist, tracks, type }: GameProps) => {
  return (
    <div>
      <Search />
      <Guesses />
    </div>
  )
}

export default Game
