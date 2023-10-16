'use client'

import { Command } from 'cmdk'

import { useSearch } from '@/hooks/useSearch'
import SearchItem from './SearchItem'

const Search = () => {
  const { search, setSearch, searchResults } = useSearch(['track'], 5)

  return (
    <div className='relative'>
      <Command shouldFilter={false}>
        <Command.Input
          value={search || ''}
          onValueChange={setSearch}
          className='w-full rounded-full px-8 py-4 text-neutral-900 outline-none'
          placeholder='Guess the song title'
        />
        {searchResults && (
          <Command.List className='absolute top-full mt-4 flex w-full flex-col rounded-2xl bg-neutral-800 py-4'>
            {searchResults?.tracks?.items.map(result => (
              <SearchItem
                key={result.id}
                {...result}
                resetSearch={() => setSearch(null)}
              />
            ))}
            {searchResults?.tracks?.items.length === 0 && (
              <Command.Empty className='text-center'>
                No songs found with that name
              </Command.Empty>
            )}
          </Command.List>
        )}
      </Command>
    </div>
  )
}

export default Search
