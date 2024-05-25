import Image from 'next/image'
import Link from 'next/link'
import type { Artist, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'

import { cn } from '@/utils/classnames'
import { PlayBg } from '@/components/Icons'

type StaticPlaylist = {
  id: string
  type: string
  description: string
  name: string
  images: {
    height: number
    width: number
    url: string
  }[]
}

type PlaylistCardProps = (
  | Omit<SimplifiedPlaylist, 'tracks'>
  | Artist
  | StaticPlaylist
) & {
  description?: string
  lg?: boolean
  featured?: boolean
  className?: string
}

export const PlaylistCard = ({
  id,
  type,
  description,
  name,
  images,
  lg,
  featured,
  className,
}: PlaylistCardProps) => {
  return (
    <div
      className={cn(
        'group min-w-0 snap-start rounded-lg bg-neutral-800 p-4 transition hover:bg-neutral-700',
        (lg || featured) && 'col-span-2 row-span-2 p-6',
        className,
      )}
    >
      <div className={cn('relative mb-4', (lg || featured) && 'mb-8')}>
        {images[0] ? (
          <Image
            src={images[0]?.url}
            alt={name}
            width={images[0]?.width || 640}
            height={images[0]?.height || 640}
            className='aspect-square rounded object-cover'
          />
        ) : (
          <div className='aspect-square w-full rounded bg-neutral-700' />
        )}
        <Link
          href={`/${type}/${id}`}
          className='absolute bottom-2 right-2 translate-y-4 opacity-0 drop-shadow-md transition group-hover:translate-y-0 group-hover:opacity-100 touch-device:translate-y-0 touch-device:opacity-100'
        >
          <PlayBg className='transition hover:scale-110' />
        </Link>
      </div>
      {featured && (
        <span className='mb-[2px] text-xl text-neutral-400'>Featured</span>
      )}
      <h3
        className={cn(
          'overflow-x-hidden text-ellipsis whitespace-nowrap',
          (lg || featured) && 'text-2xl font-bold',
        )}
      >
        {name}
      </h3>
      {description && (
        <p
          className={cn(
            'mt-2 overflow-x-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-400',
            (lg || featured) && 'mt-2 text-base',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
