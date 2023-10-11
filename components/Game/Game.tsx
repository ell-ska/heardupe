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
  const { level, isLevelOver, isGameOver, setCurrentTrack, setAmountOfLevels } =
    useGame(state => ({
      level: state.level,
      isLevelOver: state.isLevelOver,
      isGameOver: state.isGameOver,
      setCurrentTrack: state.setCurrentTrack,
      setAmountOfLevels: state.setAmountOfLevels,
    }))

  useEffect(() => {
    console.log('useeffect running')
    setCurrentTrack(
      (type === 'playlist'
        ? tracks[level - 1].track
        : tracks[level - 1]) as Track,
    )
    setAmountOfLevels(tracks.length)
  }, [level, tracks, setCurrentTrack, type, setAmountOfLevels])

  return (
    <>
      <div className='main mt-8 grid min-h-[calc(100svh-7.5rem)] grow grid-rows-[min-content,1fr,min-content] self-center lg:min-h-0'>
        {isGameOver || isLevelOver ? (
          <EndScreen />
        ) : (
          <>
            <Search />
            <Guesses />
          </>
        )}
        <MusicPlayer />
      </div>
      <GameButtons />
    </>
  )
}

export default Game
