'use client'

import Image from 'next/image'
import useSWR from 'swr'

import sdk from '@/lib/spotify/spotify-client'
import { fetcher } from '@/lib/spotify/fetchers'
import { LogoutButton } from '@/components/AuthButtons'
import Button from '@/components/Button'
import StatisticCard from '@/components/StatisticCard'
import type { statistic } from '@/types'

const Profile = () => {
  const { data: statistics }: { data: statistic[] | undefined } = useSWR(
    '/api/statistics',
    fetcher,
  )

  const { data: profile } = useSWR('/api/user', () => sdk.currentUser.profile())
  const profileImage = profile?.images[1]

  return (
    <main className='main mb-8 mt-8 grow md:mt-20'>
      <section className='flex flex-col justify-between gap-8 md:flex-row md:items-center'>
        <div className='flex items-center gap-6 md:gap-12'>
          <Image
            className='h-20 w-20 rounded-full object-cover md:h-28 md:w-28'
            src={profileImage?.url || '/profile-placeholder.jpg'}
            height={profileImage?.height || 112}
            width={profileImage?.width || 112}
            alt={`${profile?.display_name}'s profile picture`}
          />
          <h2 className='truncate text-2xl font-bold'>
            {profile?.display_name}
          </h2>
        </div>
        <div className='flex w-max flex-row-reverse gap-4 md:flex-row'>
          <Button variant='outline' size='sm'>
            Delete account
          </Button>
          <LogoutButton />
        </div>
      </section>
      {statistics && (
        <section className='mt-12 md:mt-16'>
          <h2 className='mb-6 text-2xl font-bold'>My statistics</h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8'>
            {statistics.map(stat => (
              <StatisticCard key={stat.metric} {...stat} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Profile
