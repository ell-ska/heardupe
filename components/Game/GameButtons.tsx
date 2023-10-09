import Link from 'next/link'

import { useGuesses, useStatus } from '@/hooks/useGame'
import Button, { buttonVariants } from '@/components/Button'

const ListenOnSpotify = () => {
  const { currentTrack } = useStatus()

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
  const { stage } = useStatus()
  const { skipGuess } = useGuesses()

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
  const { levelOver } = useStatus()

  return (
    <Button variant='outline'>
      {levelOver ? 'Next song' : 'Reveal answer'}
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
  const { level, levelOver, gameOver } = useStatus()

  return (
    <div className='mb-6 flex flex-col gap-4 px-6 lg:flex-row lg:justify-between'>
      {levelOver && !gameOver ? (
        <ListenOnSpotify />
      ) : gameOver ? (
        <Home />
      ) : (
        <Skip />
      )}
      {gameOver ? (
        <PlayAgain />
      ) : level === 9 && levelOver ? (
        <FinalScore />
      ) : (
        <NextLevel />
      )}
    </div>
  )
}

export default GameButtons
