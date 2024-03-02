import { forwardRef } from 'react'

import { cn } from '@/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'peer w-full rounded-lg border border-transparent bg-neutral-800 px-4 py-2 text-base text-white outline-none placeholder:text-transparent',
          isError && 'border-error',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input
