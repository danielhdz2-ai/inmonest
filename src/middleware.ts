import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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

  // ── Identificador único (IP o user_id si está autenticado) ────────────────
  const ip = getIP(request)
  const authHeader = request.headers.get('authorization')
  const identifier = authHeader ? `user:${authHeader.split(' ')[1]?.slice(0, 10)}` : `ip:${ip}`

  // ── APLICAR RATE LIMITS SEGÚN RUTA ────────────────────────────────────────

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

  return NextResponse.next()
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
