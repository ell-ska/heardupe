'use client'

import useSWR from 'swr'

import { getGameData } from '@/lib/spotify/fetchers'
import { Game } from '@/components/Game/Game'

type GamePageProps = {
  params: {
    type: string
    id: string
  }
}

export default function GamePage({ params: { type, id } }: GamePageProps) {
  const { data, error } = useSWR(`api/${type}/${id}`, () =>
    getGameData(type, id),
  )

  if (!data && error) {
    return console.log({ error })
  }

  return (
    <main className='relative flex w-full grow flex-col'>
      {data?.playlist && data?.tracks && (
        <Game
          playlist={data?.playlist}
          tracks={data?.tracks}
          type={type}
          id={id}
        />
      )}
    </main>
  )
}
