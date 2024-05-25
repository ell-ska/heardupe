import { WaitlistForm } from '@/components/WaitlistForm'

export default function BecomeBetaUserPage() {
  return (
    <>
      <div className='max-w-sm space-y-3 text-center'>
        <h2 className='text-3xl font-bold md:text-4xl'>Welcome!</h2>
        <p className='text-sm text-neutral-300'>
          Heardupe is currently not open to the public. Wanna try it anyway?
          Join the waitlist and become a beta user!
        </p>
      </div>
      <WaitlistForm />
    </>
  )
}
