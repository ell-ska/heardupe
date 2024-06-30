'use client'

import { Loader } from '@/components/Icons'
import { PlaylistSection } from '@/components/Playlist/PlaylistSection'
import { useSearch } from '@/hooks/useSearch'

export default function SearchPage() {
  const { search, query, searchResults, isLoading } = useSearch([
    'artist',
    'playlist',
  ])

  return (
    <main className='main mb-16 grow'>
      <input
        type='text'
        value={query}
        onChange={e => search(e.target.value)}
        placeholder='search...'
        className='w-full rounded-full px-8 py-4 text-neutral-900 outline-none'
      />
      {isLoading && (
        <div className='mt-8 flex flex-col items-center gap-2'>
          <Loader className='animate-spin' />
        </div>
      )}
      {searchResults && (
        <div className='mt-10 space-y-12'>
          {searchResults.artists && (
            <PlaylistSection
              title='Artists'
              playlists={searchResults.artists.items}
            />
          )}
          {searchResults.playlists && (
            <PlaylistSection
              title='Playlists'
              playlists={searchResults.playlists.items}
            />
          )}
        </div>
      )}
    </main>
  )
}
