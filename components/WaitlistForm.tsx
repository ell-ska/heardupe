'use client'

import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { becomeBetaUser } from '@/actions/become-beta-user'
import { becomeBetaUserSchema as schema } from '@/actions/utils/schemas'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

const WaitlistForm = () => {
  const {
    execute,
    status,
    result: { serverError },
  } = useAction(becomeBetaUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })

  return (
    <form
      className='flex w-full max-w-sm flex-col gap-6'
      onSubmit={handleSubmit(execute)}
    >
      <FormField
        {...register('name')}
        error={errors.name}
        type='text'
        labelText='Name'
      />
      <FormField
        {...register('email')}
        error={errors.email}
        type='email'
        labelText='Email'
      />
      <Button>Add me to the waitlist</Button>
      {/* TODO 74: remove this and handle in the button */}
      {status === 'executing' && (
        <span className='text-center text-sm text-neutral-300'>
          submitting...
        </span>
      )}
      {/* TODO 54: toast error */}
      {serverError && (
        <span className='text-error text-center text-sm'>{serverError}</span>
      )}
    </form>
  )
}

export default WaitlistForm
