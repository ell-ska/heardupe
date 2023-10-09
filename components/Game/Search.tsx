'use client'

import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { useSearch } from '@/hooks/useSearch'
import SearchItem from './SearchItem'

const Search = () => {
  const container = document.getElementById('container')

  const { search, setSearch, searchResults } = useSearch(['track'])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(searchResults ? true : false)
  }, [searchResults])

  return (
    <div className='relative' id='container'>
      <input
        type='text'
        value={search || ''}
        onChange={e => setSearch(e.target.value)}
        placeholder='Guess the song title'
        className='w-full rounded-full px-8 py-4 text-neutral-900 outline-none'
      />
      <Dialog.Root modal={false} open={open} onOpenChange={setOpen}>
        <Dialog.Portal container={container}>
          <Dialog.Content className='absolute top-full w-full outline-none'>
            <div className='mt-4 flex flex-col rounded-2xl bg-neutral-800 py-4'>
              {searchResults?.tracks?.items
                .slice(0, 5)
                .map(result => (
                  <SearchItem
                    key={result.id}
                    {...result}
                    clear={() => setSearch(null)}
                  />
                ))}
              {searchResults?.tracks?.items.length === 0 && (
                <div className='text-center'>No songs found with that name</div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Search
