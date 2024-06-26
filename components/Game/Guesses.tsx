import { useGame } from '@/hooks/useGame'
import { cn } from '@/utils/classnames'

export const Guesses = () => {
  const guesses = useGame(state => state.guesses)

  return (
    <ul className='mx-8 mt-8 flex grow flex-col gap-8'>
      {Array.from({ length: 6 }, (_, i) => i + 1).map(number => (
        <li key={number}>
          <span>{number}. </span>
          <span
            className={cn(guesses[number - 1]?.skipped && 'text-neutral-400')}
          >
            {guesses[number - 1]?.value}
          </span>
        </li>
      ))}
    </ul>
  )
}
