import { cn } from '@/utils/classnames'

export const Skeleton = ({ classname }: { classname?: string }) => {
  return (
    <div
      className={cn('animate-pulse select-none bg-neutral-800', classname)}
    />
  )
}
