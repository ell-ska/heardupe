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

export const authURL = new URL('https://accounts.spotify.com/authorize')
authURL.searchParams.append('scope', scopes.join(' '))
