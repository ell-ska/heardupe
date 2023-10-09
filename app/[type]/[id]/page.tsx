'use client'

import useSWR from 'swr'

import { getGameData } from '@/lib/fetchers'
import Game from '@/components/Game/Game'

type PageProps = {
  params: {
    type: string
    id: string
  }
}

const Page = ({ params: { type, id } }: PageProps) => {
  const { data, error } = useSWR(`api/${type}/${id}`, () =>
    getGameData(type, id),
  )

  if (!data && error) {
    return console.log({ error })
  }

  return (
    <main className='relative flex w-full grow flex-col'>
      {data?.playlist && data?.tracks && (
        <Game playlist={data?.playlist} tracks={data?.tracks} type={type} />
      )}
    </main>
  )
}

export default Page
