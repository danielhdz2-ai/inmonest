import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import {
  publicApiLimit,
  authedApiLimit,
  authLimit,
  publishLimit,
  contactLimit,
  scraperLimit,
  getIP,
  applyRateLimit,
} from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. RATE LIMITING (primero para evitar spam) ───────────────────────────

  const ip = getIP(request)
  const authHeader = request.headers.get('authorization')
  const identifier = authHeader ? `user:${authHeader.split(' ')[1]?.slice(0, 10)}` : `ip:${ip}`

  // Auth endpoints (login, registro, magic link)
  if (pathname.startsWith('/api/auth') || pathname.match(/\/(login|registro)/)) {
    const rateLimitResponse = await applyRateLimit(authLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // Publicar anuncios
  if (pathname === '/api/publicar') {
    const rateLimitResponse = await applyRateLimit(publishLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // Formularios de contacto
  if (
    pathname.includes('/contact') ||
    pathname.includes('/contacto') ||
    pathname.match(/\/api\/listings\/[^/]+\/contact/)
  ) {
    const rateLimitResponse = await applyRateLimit(contactLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // Scraper endpoints (admin only)
  if (pathname === '/api/scraper' || pathname.startsWith('/api/cron/')) {
    const rateLimitResponse = await applyRateLimit(scraperLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // APIs autenticadas (mensajes, favoritos, alertas, perfil)
  if (
    pathname.startsWith('/api/mensajes') ||
    pathname.startsWith('/api/favoritos') ||
    pathname.startsWith('/api/alertas') ||
    pathname.startsWith('/api/perfil')
  ) {
    const rateLimitResponse = await applyRateLimit(authedApiLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // APIs públicas (búsqueda, detalle, sitemap)
  if (
    pathname.startsWith('/api/listings') ||
    pathname.startsWith('/api/pisos') ||
    pathname === '/api/sitemap'
  ) {
    const rateLimitResponse = await applyRateLimit(publicApiLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // ── 2. SUPABASE AUTH + PROTECCIÓN DE RUTAS ────────────────────────────────

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresca la sesión sin bloquear rutas públicas
  const { data: { user } } = await supabase.auth.getUser()

  // Proteger /mi-cuenta y /publicar — redirigir a login si no autenticado
  const protectedPaths = ['/mi-cuenta', '/publicar']
  const publicPaths = ['/publicar-anuncio']
  const isProtected =
    protectedPaths.some((p) => pathname.startsWith(p)) &&
    !publicPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// ── CONFIGURACIÓN ──────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
