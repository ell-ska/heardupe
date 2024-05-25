'use client'

import Image from 'next/image'

import { useGame } from '@/hooks/useGame'
import { seconds } from '@/components/Game/MusicPlayer'
import type { gamePlaylist } from '@/types'

export const LevelFinished = () => {
  const { currentTrack, isLevelWon, stage } = useGame(state => ({
    currentTrack: state.currentTrack,
    isLevelWon: state.isLevelWon,
    stage: state.stage,
  }))

  const exclamation = isLevelWon ? 'Amazing!' : 'You lost!'
  const message = isLevelWon
    ? `You got the song from ${seconds[stage - 1]} seconds`
    : "You can't know them all..."
  const levelImage = currentTrack?.album.images[0]

  return (
    <div className='flex grow flex-col items-center text-center'>
      <h3 className='mb-2 text-2xl font-bold'>{exclamation}</h3>
      <span>{message}</span>
      {levelImage ? (
        <Image
          className='my-6 max-w-[18rem]'
          src={levelImage.url}
          width={levelImage.width || 288}
          height={levelImage.height || 288}
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

export const GameFinished = ({ playlist }: { playlist: gamePlaylist }) => {
  const { totalScore } = useGame(state => ({
    totalScore: state.totalScore,
  }))

  const playlistImage = playlist.images[0]

  return (
    <div className='-mt-8 flex grow flex-col justify-center gap-6 self-center md:flex-row md:items-center md:gap-8'>
      <Image
        className='aspect-square max-w-xs object-cover md:max-w-sm'
        src={playlistImage.url}
        width={playlistImage.width || 288}
        height={playlistImage.height || 288}
        alt={`cover for ${playlist.name}`}
      />
      <div>
        <h3 className='mb-3 text-2xl text-neutral-400'>Good job!</h3>
        <h2 className='mb-6 text-4xl font-bold'>{playlist.name}</h2>
        <div className='flex gap-6'>
          <p>
            Score: <b>{totalScore.toLocaleString()}</b>
          </p>
          <span>|</span>
          <p>
            High score: <b>5 000</b>
          </p>
        </div>
      </div>
    </div>
  )
}
