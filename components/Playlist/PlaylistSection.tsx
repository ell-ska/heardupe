import type { Artist, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'

import { cn } from '@/utils/classnames'
import { PlaylistCard } from './PlaylistCard'

type PlaylistSectionProps = {
  title: string
  playlists: Omit<SimplifiedPlaylist, 'tracks'>[] | Artist[]
  className?: string
}

export const PlaylistSection = ({
  title,
  playlists,
  className,
}: PlaylistSectionProps) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <div className='grid snap-x snap-mandatory auto-cols-[12rem] grid-flow-col gap-4 overflow-x-scroll pb-4 md:gap-8'>
        {playlists.map(playlist => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>
    </div>
  )
}
