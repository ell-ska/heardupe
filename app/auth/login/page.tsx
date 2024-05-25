import { HeardupeXSpotify } from '@/components/HeardupeXSpotify'
import { LoginButton } from '@/components/AuthButtons'

export default function AuthLoginPage() {
  return (
    <main className='main flex grow flex-col items-center justify-center space-y-12'>
      <HeardupeXSpotify />
      <LoginButton />
    </main>
  )
}
