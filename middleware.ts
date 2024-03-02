import { auth, signIn } from '@/auth'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from '@/lib/auth/routes'
import type { ExtendedSession } from '@/types'

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  if ((req.auth as ExtendedSession)?.error === 'RefreshAccessTokenError') {
    signIn('spotify')
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
