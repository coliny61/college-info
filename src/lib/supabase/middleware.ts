import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ROLE_ROUTES: Record<string, string> = {
  recruit: '/recruit',
  parent: '/parent',
  coach_admin: '/admin',
  super_admin: '/super-admin',
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

  // Protected routes — redirect unauthenticated users to login
  const isProtected =
    pathname.startsWith('/recruit') ||
    pathname.startsWith('/parent') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/super-admin')

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
      (pathname.startsWith('/admin') && role !== 'coach_admin' && role !== 'super_admin') ||
      (pathname.startsWith('/super-admin') && role !== 'super_admin') ||
      (pathname.startsWith('/parent') && role !== 'parent') ||
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
