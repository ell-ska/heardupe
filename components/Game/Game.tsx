'use client'

import { useEffect } from 'react'
import type { Track } from '@spotify/web-api-ts-sdk'

import { useGame } from '@/hooks/useGame'
import Search from '@/components/Game/Search'
import Guesses from '@/components/Game/Guesses'
import MusicPlayer from '@/components/Game/MusicPlayer'
import GameButtons from '@/components/Game/GameButtons'
import EndScreen from '@/components/Game/EndScreen'
import type { gamePlaylist, gameTracks } from '@/types'

type GameProps = {
  playlist: gamePlaylist
  tracks: gameTracks
  type: string
}

const Game = ({ playlist, tracks, type }: GameProps) => {
  const {
    level,
    isLevelOver,
    isGameOver,
    setCurrentTrack,
    setAmountOfLevels,
    reset,
  } = useGame(state => ({
    level: state.level,
    isLevelOver: state.isLevelOver,
    isGameOver: state.isGameOver,
    setCurrentTrack: state.setCurrentTrack,
    setAmountOfLevels: state.setAmountOfLevels,
    reset: state.reset,
  }))

  useEffect(() => {
    reset()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCurrentTrack(
      (type === 'playlist'
        ? tracks[level - 1].track
        : tracks[level - 1]) as Track,
    )
    setAmountOfLevels(tracks.length)
    // eslint-disable-next-line
  }, [level])

  return (
    <>
      <div className='main mt-8 flex min-h-[calc(100svh-7.5rem)] grow flex-col self-center lg:min-h-0'>
        {isGameOver || isLevelOver ? (
          <EndScreen playlist={playlist} />
        ) : (
          <>
            <Search />
            <Guesses />
          </>
        )}
        {!isGameOver && <MusicPlayer />}
      </div>
      <GameButtons />
    </>
  )
}

export default Game
