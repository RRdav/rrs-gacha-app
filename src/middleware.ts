import { type NextRequest } from 'next/server'
import { updateSession } from './app/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    // setup public paths that do not require authentication
    const publicPaths = ['/login', '/signup', '/']

    // if the request is for a public path, skip session update
    if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return
    }

    // for all other paths, update the session
    return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}