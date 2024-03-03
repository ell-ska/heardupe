import { Command } from 'cmdk'
import type { Track } from '@spotify/web-api-ts-sdk'

import { useGame } from '@/hooks/useGame'

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
        submitGuess(`${name} - ${stringifiedArtists}`)
        resetSearch()
      }}
      className='px-8 py-3 text-left text-neutral-400 outline-none data-[selected]:bg-neutral-500 data-[selected]:text-white'
    >
      {`${name} - ${stringifiedArtists}`}
    </Command.Item>
  )
}

export default SearchItem
