import Link from 'next/link'

import { useGame } from '@/hooks/useGame'
import Button, { buttonVariants } from '@/components/Button'

type GameButtonsProps = {
  skip: () => void
}

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

const NextLevel = () => {
  const { isLevelOver, levelOver, next } = useGame()

  return (
    <Button
      variant='outline'
      onClick={() => (isLevelOver ? next('level') : levelOver())}
    >
      {isLevelOver ? 'Next song' : 'Reveal answer'}
    </Button>
  )
}

const FinalScore = () => {
  return <Button variant='outline'>Final score</Button>
}

const PlayAgain = () => {
  return <Button variant='outline'>Play again</Button>
}

const GameButtons = () => {
  const { level, isLevelOver, isGameOver } = useGame(state => ({
    level: state.level,
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
      {isGameOver ? (
        <PlayAgain />
      ) : level === 9 && isLevelOver ? (
        <FinalScore />
      ) : (
        <NextLevel />
      )}
    </div>
  )
}

export default GameButtons
