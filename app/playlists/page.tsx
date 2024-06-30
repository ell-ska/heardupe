import { getServerSdk } from '@/lib/spotify/spotify-server'
import { PlaylistSection } from '@/components/Playlist/PlaylistSection'

const playlistsToShow = 12

export default async function PlaylistsPage() {
  const sdk = await getServerSdk()

  const topArtists = await sdk.currentUser.topItems(
    'artists',
    undefined,
    playlistsToShow,
  )
  const userPlaylists =
    await sdk.currentUser.playlists.playlists(playlistsToShow)

  return (
    <main className='main mb-12 mt-8 grow space-y-16'>
      <PlaylistSection title='Top Artists' playlists={topArtists.items} />
      <PlaylistSection title='My Playlists' playlists={userPlaylists.items} />
    </main>
  )
}
