import spotifyProvider from 'next-auth/providers/spotify'

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error('Missing SPOTIFY_CLIENT_ID')
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET')
}

const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-read',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-read-private',
  'user-library-read',
]

const authURL = new URL('https://accounts.spotify.com/authorize')
authURL.searchParams.append('scope', scopes.join(' '))

const spotifyProfile = spotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authorization: authURL.toString(),
})

export { spotifyProfile, authURL }
