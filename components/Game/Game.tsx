'use client'

import { useEffect } from 'react'
import type { Track } from '@spotify/web-api-ts-sdk'

import { useGame } from '@/hooks/useGame'
import Search from '@/components/Game/Search'
import Guesses from '@/components/Game/Guesses'
import MusicPlayer from '@/components/Game/MusicPlayer'
import GameButtons from '@/components/Game/GameButtons'
import EndScreen from '@/components/Game/EndScreen'
import Stats from '@/components/Game/Stats'
import type { gamePlaylist, gameTracks } from '@/types'

type GameProps = {
  playlist: gamePlaylist
  tracks: gameTracks
  type: string
  id: string
}

const Game = ({ playlist, tracks, type, id }: GameProps) => {
  const {
    level,
    isLevelOver,
    isGameOver,
    setCurrentTrack,
    setInitialInfo,
    reset,
  } = useGame(state => ({
    level: state.level,
    isLevelOver: state.isLevelOver,
    isGameOver: state.isGameOver,
    setCurrentTrack: state.setCurrentTrack,
    setInitialInfo: state.setInitialInfo,
    reset: state.reset,
  }))

  useEffect(() => {
    reset()
    setInitialInfo({ amountOfLevels: tracks.length, id, type })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCurrentTrack(
      (type === 'playlist'
        ? tracks[level - 1].track
        : tracks[level - 1]) as Track,
    )
    // eslint-disable-next-line
  }, [level])

  return (
    <>
      <div className='main mt-4 flex min-h-[calc(100svh-7.5rem)] grow flex-col self-center lg:min-h-0'>
        {isGameOver || isLevelOver ? (
          <EndScreen playlist={playlist} />
        ) : (
          <>
            <Stats />
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
