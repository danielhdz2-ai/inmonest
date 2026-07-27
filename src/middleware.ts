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
  gestoriaLimit,
  ownerLeadsLimit,
  getIP,
  applyRateLimit,
} from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 0. BLOQUEO DE BOTS AGRESIVOS (protección CPU) ─────────────────────────
  
  const userAgent = request.headers.get('user-agent') || ''
  const blockedBots = [
    'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web',
    'cohere-ai', 'Omgilibot', 'Omgili', 'FacebookBot', 'Bytespider',
    'PetalBot', 'SemrushBot', 'AhrefsBot', 'DotBot', 'MJ12bot',
    'BLEXBot', 'DataForSeoBot'
  ]
  
  if (blockedBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Bot not allowed', { status: 403 })
  }

  // ── 0.5 NORMALIZACIÓN DE URLs Y CANÓNICAS ALTERNATIVAS ────────────────────
  
  // Eliminar trailing slash (excepto para root /)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 308) // Permanent redirect
  }

  // URLs con parámetros duplicados → Redirigir a canónica sin parámetros
  // Esto soluciona el problema de Google indexando URLs con ?ciudad=, ?tipo=, etc.
  const searchParams = request.nextUrl.searchParams
  const problematicParams = ['ciudad', 'tipo', 'page', 'sort', 'utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid']
  
  // Si la URL tiene parámetros problemáticos Y no es una búsqueda activa (/pisos con filtros legítimos)
  const hasProblematicParams = problematicParams.some(param => searchParams.has(param))
  const isSearchPage = pathname === '/pisos' || pathname.startsWith('/pisos/')
  const isApiRoute = pathname.startsWith('/api/')
  
  if (hasProblematicParams && !isSearchPage && !isApiRoute) {
    const url = request.nextUrl.clone()
    // Limpiar todos los parámetros problemáticos
    problematicParams.forEach(param => url.searchParams.delete(param))
    
    // Solo redirigir si efectivamente eliminamos parámetros
    if (url.search !== request.nextUrl.search) {
      return NextResponse.redirect(url, 301) // Permanent redirect
    }
  }

  // Normalizar URLs duplicadas comunes
  const urlNormalizations: Record<string, string> = {
    '/pisos/alquiler': '/pisos?operacion=rent',
    '/pisos/venta': '/pisos?operacion=sale',
    '/pisos/compra': '/pisos?operacion=sale',
  }
  
  if (pathname in urlNormalizations) {
    const url = request.nextUrl.clone()
    url.pathname = urlNormalizations[pathname].split('?')[0]
    const params = urlNormalizations[pathname].split('?')[1]
    if (params) {
      params.split('&').forEach(param => {
        const [key, value] = param.split('=')
        url.searchParams.set(key, value)
      })
    }
    return NextResponse.redirect(url, 308)
  }

  // Parámetros legacy en búsqueda de pisos → nombres canónicos españoles
  if (pathname === '/pisos') {
    const url = request.nextUrl.clone()
    let changed = false

    if (searchParams.has('city') && !searchParams.has('ciudad')) {
      url.searchParams.set('ciudad', searchParams.get('city')!.toLowerCase())
      url.searchParams.delete('city')
      changed = true
    }

    if (searchParams.has('operation') && !searchParams.has('operacion')) {
      const op = searchParams.get('operation')
      if (op === 'rent' || op === 'sale') {
        url.searchParams.delete('operation')
        url.searchParams.set('operacion', op)
        changed = true
      }
    }

    if (changed) {
      return NextResponse.redirect(url, 301)
    }
  }

  // URLs basura rastreadas por bots (GSC: /$, /&)
  if (pathname === '/$' || pathname === '/&') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  // ── 1. RATE LIMITING (primero para evitar spam) ───────────────────────────

  const ip = getIP(request)
  const authHeader = request.headers.get('authorization')
  const identifier = authHeader ? `user:${authHeader.split(' ')[1]?.slice(0, 10)}` : `ip:${ip}`

  // Auth endpoints (login, registro, magic link)
  // Solo aplica rate limit a POST/PUT — las visitas de página (GET) no cuentan
  if (
    (pathname.startsWith('/api/auth') || pathname.match(/\/(login|registro)/)) &&
    request.method !== 'GET'
  ) {
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
    pathname.match(/\/api\/listings\/[^/]+\/contact/) ||
    pathname === '/api/lead-magnet/calculadora'
  ) {
    const rateLimitResponse = await applyRateLimit(contactLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // Formularios de gestoría (solicitudes y checkout)
  if (
    pathname === '/api/gestoria/solicitar' ||
    pathname === '/api/gestoria/checkout'
  ) {
    const rateLimitResponse = await applyRateLimit(gestoriaLimit, identifier, request)
    if (rateLimitResponse) return rateLimitResponse
  }

  // Leads de propietarios
  if (pathname === '/api/owner-leads') {
    const rateLimitResponse = await applyRateLimit(ownerLeadsLimit, identifier, request)
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
