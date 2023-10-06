import Image from 'next/image'

import { LoginButton } from '@/components/AuthButtons'
import spotifyLogo from '@/public/spotify-logo.svg'

const Login = () => {
  return (
    <main className='main flex flex-col items-center justify-center space-y-12'>
      <div className='flex flex-col items-center gap-4 font-branding md:flex-row md:gap-8'>
        <h2 className='text-4xl md:text-5xl'>Heardupe</h2>
        <span className='text-2xl md:text-3xl'>x</span>
        <Image src={spotifyLogo} alt='Spotify Logo'></Image>
      </div>
      <LoginButton />
    </main>
  )
}

export default Login
