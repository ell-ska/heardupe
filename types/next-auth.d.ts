import type { Session, User } from 'next-auth'

declare module 'next-auth' {
  interface Session extends Session {
    error: string | undefined
  }
  interface User extends User {
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
  }
}
