'use client'

import useSwr from 'swr'
import sdk from '@/lib/spotify/spotify-client'

import PlaylistSection from '@/components/Playlist/PlaylistSection'

const Playlists = () => {
  const playlistsToShow = 12

  const { data: topArtists } = useSwr('/api/artists/top', () =>
    sdk.currentUser.topItems('artists', undefined, playlistsToShow),
  )

  const { data: userPlaylists } = useSwr('/api/playlists/user', () =>
    sdk.currentUser.playlists.playlists(playlistsToShow),
  )

  return (
    <main className='main mb-16 mt-8 grow'>
      {topArtists && (
        <PlaylistSection
          title='Top Artists'
          playlists={topArtists.items}
          className='mt-0'
        />
      )}
      {userPlaylists && (
        <PlaylistSection title='My Playlists' playlists={userPlaylists.items} />
      )}
    </main>
  )
}

export default Playlists
