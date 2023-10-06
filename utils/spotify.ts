import SpotifyWebApi from 'spotify-web-api-node'
// https://github.com/thelinmichael/spotify-web-api-node

// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-read',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-read-private',
  'user-library-read',
].join(',')

const params = new URLSearchParams({ scope: scopes })
const loginUrl = `https://accounts.spotify.com/authorize?${params.toString()}`

const spotifyClient = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export { spotifyClient, loginUrl }
