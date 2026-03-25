import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// SECURITY NOTE: Middleware uses user_metadata.role for initial routing only.
// This is client-modifiable via Supabase, but ALL server components and API routes
// verify the role from the Prisma database (dbUser.role), which is authoritative.
// Middleware role checks are a UX convenience (fast redirects), not a security boundary.
// The actual security enforcement happens in each page/route's server-side auth check.
const ROLE_ROUTES: Record<string, string> = {
  recruit: '/recruit',
  coach_admin: '/admin',
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Skip auth if Supabase is not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Refresh the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public routes that don't need auth even under /recruit or /admin
  const isPublic =
    pathname.startsWith('/jersey/') ||
    pathname.startsWith('/schools/')

  // Protected routes — redirect unauthenticated users to login
  const isProtected =
    !isPublic &&
    (pathname.startsWith('/recruit') ||
    pathname.startsWith('/admin'))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Role-based route protection
  if (isProtected && user) {
    const role = user.user_metadata?.role ?? 'recruit'
    const correctRoute = ROLE_ROUTES[role] ?? '/recruit'

    const mismatch =
      (pathname.startsWith('/admin') && role !== 'coach_admin') ||
      (pathname.startsWith('/recruit') && role !== 'recruit')

    if (mismatch) {
      const url = request.nextUrl.clone()
      url.pathname = correctRoute
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from auth pages to their role dashboard
  const isAuthPage = pathname === '/login' || pathname === '/register'
  if (isAuthPage && user) {
    const role = user.user_metadata?.role ?? 'recruit'
    const url = request.nextUrl.clone()
    url.pathname = ROLE_ROUTES[role] ?? '/recruit'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
