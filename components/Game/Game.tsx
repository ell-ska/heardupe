'use client'

import { gamePlaylist, gameTracks } from '@/types'
import Search from '@/components/Game/Search'

type GameProps = {
  playlist: gamePlaylist
  tracks: gameTracks
  type: string
}

const Game = ({ playlist, tracks, type }: GameProps) => {
  return (
    <div>
      <Search />
    </div>
  )
}

export default Game
