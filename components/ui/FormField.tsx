import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/utils/classnames'
import Input, { InputProps } from './Input'

type FormFieldProps = Omit<InputProps, 'id' | 'htmlFor'> & {
  labelText: string
  error?: FieldError
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ labelText, error, name, placeholder, ...props }, ref) => {
    return (
      <div className='group relative'>
        <Input
          ref={ref}
          name={name}
          id={name}
          isError={!!error}
          placeholder={placeholder || labelText}
          {...props}
        />
        <label
          htmlFor={name}
          className={cn(
            'absolute -top-2 left-2 cursor-text text-xs text-white transition-all',
            ' peer-focus-visible:-top-2 peer-focus-visible:left-2 peer-focus-visible:text-xs',
            'peer-placeholder-shown:left-4 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base',
            error && '-top-4 peer-focus-visible:-top-4',
          )}
        >
          {labelText}
        </label>
        {error && <span className='text-error text-sm'>{error.message}</span>}
      </div>
    )
  },
)
FormField.displayName = 'FormField'

export default FormField
