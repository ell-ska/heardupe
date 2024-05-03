import { auth } from '@/auth'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from '@/lib/auth/routes'

export default auth(req => {
  const { nextUrl, auth } = req
  const isLoggedIn = Boolean(auth?.user && auth.user.expires_at > Date.now())

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
