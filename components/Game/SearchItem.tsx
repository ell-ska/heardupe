import { Command } from 'cmdk'

import { useGame } from '@/hooks/useGame'
import { Track } from '@spotify/web-api-ts-sdk'

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
      className='px-8 py-3 text-left text-neutral-400 outline-none data-[selected]:bg-neutral-500 data-[selected]:text-white'
    >
      {`${name} - ${stringifiedArtists}`}
    </Command.Item>
  )
}

export default SearchItem
