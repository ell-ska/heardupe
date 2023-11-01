import { useGame } from '@/hooks/useGame'

const Stats = () => {
  const { level, amountOfLevels, levelScore, totalScore } = useGame(state => ({
    level: state.level,
    amountOfLevels: state.amountOfLevels,
    levelScore: state.levelScore,
    totalScore: state.totalScore,
  }))

  return (
    <div className='mb-4 flex px-8 text-neutral-400'>
      <span className='flex-1'>{`Song: ${level}/${amountOfLevels}`}</span>
      <span className='flex-1 text-right sm:text-center'>
        Score: {totalScore + levelScore}
      </span>
      <span className='hidden flex-1 text-right sm:block'>High score: -</span>
    </div>
  )
}

export default Stats
