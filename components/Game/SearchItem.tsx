import { useGame } from '@/hooks/useGame'
import { Track } from '@spotify/web-api-ts-sdk'

type SearchItemProps = Track & {
  resetSearch: () => void
}

const SearchItem = ({ id, name, artists, resetSearch }: SearchItemProps) => {
  const submitGuess = useGame(state => state.submitGuess)

  const stringifiedArtists = artists.map(artist => artist.name).join(', ')

  return (
    <button
      onClick={() => {
        submitGuess({ value: `${name} - ${stringifiedArtists}`, id })
        resetSearch()
      }}
      className='px-8 py-3 text-left text-neutral-400 outline-none hover:bg-neutral-500 hover:text-white focus-visible:bg-neutral-500 focus-visible:text-white'
    >
      {`${name} - ${stringifiedArtists}`}
    </button>
  )
}

export default SearchItem
