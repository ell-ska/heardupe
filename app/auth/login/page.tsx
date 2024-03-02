import HeardupeXSpotify from '@/components/HeardupeXSpotify'
import { LoginButton } from '@/components/AuthButtons'

const Login = () => {
  return (
    <main className='main flex grow flex-col items-center justify-center space-y-12'>
      <HeardupeXSpotify />
      <LoginButton />
    </main>
  )
}

export default Login
