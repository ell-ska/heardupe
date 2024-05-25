'use client'

import { Command } from 'cmdk'
import type { Track } from '@spotify/web-api-ts-sdk'

import { useSearch } from '@/hooks/useSearch'
import { useGame } from '@/hooks/useGame'
import { cn } from '@/utils/classnames'

export const Search = () => {
  const { search, setSearch, searchResults } = useSearch(['track'], 5)
  const searchItems = searchResults?.tracks?.items

  return (
    <div className='relative'>
      <Command shouldFilter={false}>
        <Command.Input
          value={search || ''}
          onValueChange={setSearch}
          className='w-full rounded-full px-8 py-4 text-neutral-900 outline-none'
          placeholder='Guess the song title'
        />
        <Command.List
          className={cn(
            'absolute top-full mt-4 flex w-full flex-col rounded-2xl bg-neutral-800 py-4',
            !searchItems && 'hidden',
          )}
          aria-hidden={!searchItems}
        >
          {searchItems && searchItems.length > 0 ? (
            searchItems.map(item => (
              <SearchItem
                key={item.id}
                {...item}
                resetSearch={() => setSearch(null)}
              />
            ))
          ) : (
            <Command.Empty className='text-center'>
              No songs found with that name
            </Command.Empty>
          )}
        </Command.List>
      </Command>
    </div>
  )
}

type SearchItemProps = Track & {
  resetSearch: () => void
}

const SearchItem = ({ id, name, artists, resetSearch }: SearchItemProps) => {
  const submitGuess = useGame(state => state.submitGuess)

  const stringifiedArtists = artists.map(artist => artist.name).join(', ')

  return (
    <Command.Item
      value={id}
      onSelect={() => {
        submitGuess({ value: `${name} - ${stringifiedArtists}`, id })
        resetSearch()
      }}
      className='px-8 py-3 text-left text-neutral-400 outline-none data-[selected=true]:bg-neutral-500 data-[selected=true]:text-white'
    >
      {`${name} - ${stringifiedArtists}`}
    </Command.Item>
  )
}
