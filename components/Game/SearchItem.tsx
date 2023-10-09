import { Track } from '@spotify/web-api-ts-sdk'

type SearchItemProps = Track & { clear: () => void }

const SearchItem = ({ name, artists, clear }: SearchItemProps) => {
  return (
    <button
      onClick={() => {
        clear()
      }}
      className='px-8 py-3 text-left text-neutral-400 outline-none hover:bg-neutral-500 hover:text-white focus-visible:bg-neutral-500 focus-visible:text-white'
    >
      {`${name} - ${artists.map(artist => artist.name).join(', ')}`}
    </button>
  )
}

export default SearchItem
