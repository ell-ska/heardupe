'use client'

import type { statistic } from '@/types'

type StatisticCardProps = statistic

export const StatisticCard = ({ metric, value }: StatisticCardProps) => {
  return (
    <div className='flex flex-col justify-between gap-20 overflow-hidden rounded-lg bg-neutral-800 p-4'>
      <h3 className='text-2xl font-bold uppercase leading-none lg:text-3xl'>
        {metric}
      </h3>
      <p className='overflow-hidden text-ellipsis text-3xl leading-none text-primary lg:text-4xl'>
        {value}
      </p>
    </div>
  )
}
