import { useState } from 'react'
import useSWR from 'swr'
import type { ItemTypes } from '@spotify/web-api-ts-sdk'

import { search } from '@/actions/search'
import { useDebounce } from '@/hooks/useDebounce'

export const useSearch = (types: ItemTypes[], limit?: number) => {
  const [query, setQuery] = useState('')
  const debouncedSearch = useDebounce(query, 300)

  const { data, error, isLoading } = useSWR(
    `api/search/${debouncedSearch}`,
    async () => {
      if (!debouncedSearch || debouncedSearch.length < 1) return null
      return await search({ query: debouncedSearch, types, limit })
    },
  )

  return { query, search: setQuery, searchResults: data, error, isLoading }
}
