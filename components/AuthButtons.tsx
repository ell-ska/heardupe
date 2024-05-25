'use client'

import { signIn, signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'

export const LoginButton = () => {
  const callbackUrl = useSearchParams().get('callbackUrl') || undefined

  return (
    <Button onClick={() => signIn('spotify', { callbackUrl })}>
      Login with Spotify
    </Button>
  )
}

export const LogoutButton = () => {
  return (
    <Button size='sm' onClick={() => signOut()}>
      Log out
    </Button>
  )
}
