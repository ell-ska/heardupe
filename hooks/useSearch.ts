import { useState } from 'react'
import useSWR from 'swr'
import type { ItemTypes } from '@spotify/web-api-ts-sdk'

import sdk from '@/lib/spotify/spotify-client'
import useDebounce from '@/hooks/useDebounce'

const useSearch = (type: ItemTypes[], limit?: number) => {
  const [search, setSearch] = useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const { data, error, isLoading } = useSWR(
    `api/search/${debouncedSearch}`,
    () => {
      if (!debouncedSearch) return null
      // @ts-ignore, asks for limit to be of type 0 | 1 | 2 etc.
      return sdk.search(debouncedSearch, type, undefined, limit || undefined)
    },
  )

  return { search, setSearch, searchResults: data, error, isLoading }
}

export { useSearch }
