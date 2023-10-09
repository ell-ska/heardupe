'use client'

import useSWR from 'swr'

import sdk from '@/lib/spotify-client'
import { LogoutButton } from '@/components/AuthButtons'
import Image from 'next/image'
import Button from '@/components/Button'

const Profile = () => {
  const { data } = useSWR('/api/user', () => sdk.currentUser.profile())
  const profileImage = data?.images[1]

  return (
    <main className='main mt-20 grow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-12'>
          {profileImage && (
            <Image
              className='h-28 w-28 rounded-full object-cover'
              src={profileImage.url}
              height={profileImage.height}
              width={profileImage.width}
              alt={`${data.display_name}'s profile picture`}
            />
          )}
          <h2 className='text-2xl font-bold'>{data?.display_name}</h2>
        </div>
        <div className='space-x-4'>
          <Button variant='outline' size='sm'>
            Delete account
          </Button>
          <LogoutButton />
        </div>
      </div>
    </main>
  )
}

export default Profile
