import { useGame } from '@/hooks/useGame'
import { cn } from '@/utils/classnames'
import { Skeleton } from '../ui/Skeleton'

const sharedClassnames = 'mb-4 flex justify-between px-8'

export const Stats = () => {
  const { level, amountOfLevels, levelScore, totalScore } = useGame(state => ({
    level: state.level,
    amountOfLevels: state.amountOfLevels,
    levelScore: state.levelScore,
    totalScore: state.totalScore,
  }))

  return (
    <div className={cn(sharedClassnames, 'text-neutral-400')}>
      <span>{`Song: ${level}/${amountOfLevels}`}</span>
      <span>Score: {totalScore + levelScore}</span>
    </div>
  )
}

export const StatsSkeleton = () => {
  return (
    <div className={sharedClassnames}>
      {Array.from({ length: 2 }, (_, i) => i).map(index => (
        <Skeleton key={index} classname='h-6 w-20 rounded' />
      ))}
    </div>
  )
}
