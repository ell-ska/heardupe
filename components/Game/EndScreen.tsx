'use client'

import Image from 'next/image'

import { useGame } from '@/hooks/useGame'
import { seconds } from '@/components/Game/MusicPlayer'
import type { gamePlaylist } from '@/types'

type EndScreenProps = {
  playlist: gamePlaylist
}

const EndScreen = ({ playlist }: EndScreenProps) => {
  const { currentTrack, isLevelWon, stage, isGameOver } = useGame(state => ({
    currentTrack: state.currentTrack,
    isLevelWon: state.isLevelWon,
    stage: state.stage,
    isGameOver: state.isGameOver,
  }))

  const exclamation = isLevelWon ? 'Amazing!' : 'You lost!'
  const message = isLevelWon
    ? `You got the song from ${seconds[stage - 1]} seconds`
    : "You can't know them all..."
  const levelImage = currentTrack?.album.images[0]

  const LevelEndedScreen = () => {
    return (
      <div className='flex grow flex-col items-center text-center'>
        <h3 className='mb-2 text-2xl font-bold'>{exclamation}</h3>
        <span>{message}</span>
        {levelImage ? (
          <Image
            className='my-6 max-w-[18rem]'
            src={levelImage.url}
            width={levelImage.width}
            height={levelImage.height}
            alt={`album cover for ${currentTrack.name}`}
          />
        ) : (
          <div className='my-6 aspect-square w-[18rem] bg-neutral-800' />
        )}
        <h4 className='mb-1 text-2xl font-bold'>{currentTrack?.name}</h4>
        <span className='level-ended__artist mb-1'>
          {currentTrack?.artists.map(artist => artist.name).join(', ')}
        </span>
        <span className='text-neutral-400'>
          {currentTrack?.album.release_date.slice(0, 4)}
        </span>
      </div>
    )
  }

  const playlistImage = playlist.images[0]

  const GameEndedScreen = () => {
    return (
      <div className='-mt-8 flex grow flex-col justify-center gap-6 md:flex-row md:items-center md:gap-8'>
        <Image
          className='aspect-square object-cover sm:max-w-[22rem]'
          src={playlistImage.url}
          width={playlistImage.width}
          height={playlistImage.height}
          alt={`cover for ${playlist.name}`}
        />
        <div>
          <h3 className='mb-3 text-2xl text-neutral-400'>Good job!</h3>
          <h2 className='text-4xl font-bold'>{playlist.name}</h2>
        </div>
      </div>
    )
  }

  return isGameOver ? <GameEndedScreen /> : <LevelEndedScreen />
}

export default EndScreen
