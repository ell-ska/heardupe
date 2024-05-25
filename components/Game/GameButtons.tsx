import Link from 'next/link'

import { useGame } from '@/hooks/useGame'
import { Button, buttonVariants } from '@/components/ui/Button'

const ListenOnSpotify = () => {
  const { currentTrack } = useGame()

  return (
    <Link
      href={currentTrack?.external_urls.spotify || ''}
      target='_blank'
      rel='noopener noreferrer'
      className={buttonVariants()}
    >
      Listen on spotify
    </Link>
  )
}

const Skip = () => {
  const { stage, skipGuess } = useGame(state => ({
    stage: state.stage,
    skipGuess: state.skipGuess,
  }))

  return (
    <Button onClick={skipGuess}>
      Skip {stage < 6 ? `(+${stage}s)` : null}
    </Button>
  )
}

const Home = () => {
  return (
    <Link href='/' className={buttonVariants()}>
      Home
    </Link>
  )
}

const Next = () => {
  const { level, isLevelOver, amountOfLevels, next } = useGame(state => ({
    level: state.level,
    isLevelOver: state.isLevelOver,
    amountOfLevels: state.amountOfLevels,
    next: state.next,
  }))

  const isLastLevel = level === amountOfLevels - 1

  const name =
    isLevelOver && isLastLevel
      ? 'Final score'
      : isLevelOver
        ? 'Next song'
        : 'Reveal answer'

  return (
    <Button
      variant='outline'
      onClick={() => next(isLevelOver ? 'level' : 'reveal-answer')}
    >
      {name}
    </Button>
  )
}

const PlayAgain = () => {
  const reset = useGame(state => state.reset)

  return (
    <Button variant='outline' onClick={reset}>
      Play again
    </Button>
  )
}

export const GameButtons = () => {
  const { isLevelOver, isGameOver } = useGame(state => ({
    isLevelOver: state.isLevelOver,
    isGameOver: state.isGameOver,
  }))

  return (
    <div className='mb-6 flex flex-col gap-4 px-6 lg:flex-row lg:justify-between'>
      {isLevelOver && !isGameOver ? (
        <ListenOnSpotify />
      ) : isGameOver ? (
        <Home />
      ) : (
        <Skip />
      )}
      {isGameOver ? <PlayAgain /> : <Next />}
    </div>
  )
}
