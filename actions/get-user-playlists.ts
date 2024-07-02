'use server'

import { getServerSdk } from '@/lib/spotify/spotify-server'

export const getUserPlaylists = async ({
  limit,
  offset,
}: {
  limit: number | undefined
  offset: number | undefined
}) => {
  const sdk = await getServerSdk()

  // @ts-ignore, asks for limit to be of type 0 | 1 | 2 etc.
  return await sdk.currentUser.playlists.playlists(limit, offset)
}
