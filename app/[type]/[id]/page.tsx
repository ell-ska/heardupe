'use client'

import useSWR from 'swr'

import { getGameData } from '@/lib/fetchers'

type GameProps = {
  params: {
    type: string
    id: string
  }
}

const Game = ({ params: { type, id } }: GameProps) => {
  const { data, error } = useSWR(`api/${type}/${id}`, () =>
    getGameData(type, id),
  )

  if (!data && error) {
    return console.log({ error })
  }

  return (
    <main className='main flex-grow'>
      {type} {id}
    </main>
  )
}

export default Game
