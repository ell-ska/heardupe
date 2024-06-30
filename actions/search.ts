'use server'

import type { ItemTypes } from '@spotify/web-api-ts-sdk'

import { getServerSdk } from '@/lib/spotify/spotify-server'

export const search = async ({
  query,
  types,
  limit,
}: {
  query: string
  types: ItemTypes[]
  limit: number | undefined
}) => {
  const sdk = await getServerSdk()

  return await sdk.search(
    query,
    types,
    undefined,
    // @ts-ignore, asks for limit to be of type 0 | 1 | 2 etc.
    limit || undefined,
  )
}
