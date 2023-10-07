// https://github.com/spotify/spotify-web-api-ts-sdk/tree/main/example_next/src/app/api/auth/%5B...nextauth%5D
import NextAuth from 'next-auth/next'

import { authOptions } from './auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
