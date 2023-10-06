import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

export const buttonVariants = cva(
  'font-regular rounded-full transition hover:scale-105',
  {
    variants: {
      variant: {
        default: 'bg-white text-neutral-900',
        outline: 'bg-none text-white shadow-[inset_0_0_0_2px_#fff]',
      },
      size: {
        default: 'px-8 py-4',
        sm: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
