import { useState } from 'react'
import useSWR from 'swr'
import { ItemTypes } from '@spotify/web-api-ts-sdk'

import sdk from '@/lib/spotify-client'
import useDebounce from '@/hooks/useDebounce'

const useSearch = (type: ItemTypes[]) => {
  const [search, setSearch] = useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const { data: searchResults } = useSWR(
    `api/search/${debouncedSearch}`,
    () => {
      if (!search) return null
      return sdk.search(debouncedSearch, type)
    },
  )

  return { search, setSearch, searchResults }
}

export { useSearch }
