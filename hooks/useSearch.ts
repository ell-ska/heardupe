import { useState } from 'react'
import useSWR from 'swr'
import type { ItemTypes } from '@spotify/web-api-ts-sdk'

import sdk from '@/lib/spotify-client'
import useDebounce from '@/hooks/useDebounce'

const useSearch = (type: ItemTypes[]) => {
  const [search, setSearch] = useState<string | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const { data, error, isLoading } = useSWR(
    `api/search/${debouncedSearch}`,
    () => {
      if (!debouncedSearch) return null
      return sdk.search(debouncedSearch, type)
    },
  )

  return { search, setSearch, searchResults: data, error, isLoading }
}

export { useSearch }
