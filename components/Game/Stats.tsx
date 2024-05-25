import { useGame } from '@/hooks/useGame'

export const Stats = () => {
  const { level, amountOfLevels, levelScore, totalScore } = useGame(state => ({
    level: state.level,
    amountOfLevels: state.amountOfLevels,
    levelScore: state.levelScore,
    totalScore: state.totalScore,
  }))

  return (
    <div className='mb-4 flex justify-between px-8 text-neutral-400'>
      <span>{`Song: ${level}/${amountOfLevels}`}</span>
      <span>Score: {totalScore + levelScore}</span>
    </div>
  )
}
