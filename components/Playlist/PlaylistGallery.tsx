'use client'

import { useState } from 'react'
import useSWR from 'swr'
import sdk from '@/lib/spotify/spotify-client'

import PlaylistCard from './PlaylistCard'
import Button from '../Button'

const largeCardIndexes = [6, 13, 24, 31, 42, 49]

const PlaylistGallery = () => {
  const [playlistsToShow, setPlaylistsToShow] = useState(13)
  const maxPlaylistsToShow = 49

  const { data } = useSWR('/api/playlists/user', () =>
    sdk.currentUser.playlists.playlists(maxPlaylistsToShow),
  )

  return (
    <div className='mb-8 flex flex-col items-center gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {data?.items.slice(0, playlistsToShow).map((playlist, index) => {
          const lg = largeCardIndexes.includes(index)
          return <PlaylistCard key={playlist.id} {...playlist} lg={lg} />
        })}
      </div>
      {data && playlistsToShow < maxPlaylistsToShow && (
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setPlaylistsToShow(prev =>
              prev < maxPlaylistsToShow - 4 ? prev + 9 : prev + 4,
            )
          }
        >
          Load more
        </Button>
      )}
    </div>
  )
}

export default PlaylistGallery
