'use client'

import { useSearch } from '@/hooks/useSearch'

const Search = () => {
  const { search, setSearch, searchResults } = useSearch(['artist', 'playlist'])

  return (
    <main className='main flex-grow'>
      <div>
        <input
          type='text'
          value={search || ''}
          onChange={e => setSearch(e.target.value)}
          placeholder='search...'
          className='w-full rounded-full px-8 py-4 text-neutral-900 outline-none'
        />
      </div>
    </main>
  )
}

export default Search
