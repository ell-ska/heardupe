import { NextResponse, type NextRequest } from 'next/server'
import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/server/web/spec-extension/cookies'
import { getToken, encode } from 'next-auth/jwt'

import { auth } from '@/auth'
import { refreshAccessToken } from '@/lib/auth/refresh-access-token'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from '@/lib/auth/routes'

const sessionCookieName =
  process.env.NODE_ENV === 'development'
    ? 'authjs.session-token'
    : '__Secure-authjs.session-token'

export default auth(async request => {
  const { nextUrl, auth } = request
  const secret = process.env.NEXTAUTH_SECRET || ''

  const token = await getToken({
    req: request,
    secret,
    salt: sessionCookieName,
  })

  console.log('middleware token', {
    refresh: token?.refresh_token,
    access: token?.access_token,
  })

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return
  if (isAuthRoute) {
    if (auth?.user) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    } else {
      return
    }
  }

  if (!isPublicRoute) {
    if (!auth?.user) {
      return Response.redirect(new URL('/auth/login', nextUrl))
    }
    if (Date.now() < auth.user.expires_at) return

    console.log('token expired')

    const token = await getToken({
      req: request,
      secret,
      salt: sessionCookieName,
    })
    if (!token) return Response.redirect(new URL('/auth/login', nextUrl))

    const refreshedToken = await refreshAccessToken(token)
    const encodedToken = await encode({
      ...refreshedToken,
      secret,
      salt: sessionCookieName,
    })

    console.log({
      refreshedToken,
    })

    const response = NextResponse.next()
    response.cookies.set(sessionCookieName, encodedToken)
    applySetCookie(request, response)

    return response
  }
})

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 * https://github.com/vercel/next.js/issues/49442#issuecomment-1679807704
 */
const applySetCookie = (req: NextRequest, res: NextResponse) => {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers)
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers)
  const newReqCookies = new RequestCookies(newReqHeaders)
  setCookies.getAll().forEach(cookie => newReqCookies.set(cookie))
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value)
    }
  })
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
