/**
 * Rate Limiting con Upstash Redis
 * Protege contra spam, scrapers y ataques DDoS
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Configuración de Redis - Soporta Upstash directo o Vercel KV Integration
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const redis = redisUrl && redisToken
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null

// ── LÍMITES CONFIGURABLES ──────────────────────────────────────────────────

/**
 * API pública (búsqueda, detalle) - Más permisivo
 * 100 requests por 1 minuto
 */
export const publicApiLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'ratelimit:public',
    })
  : null

/**
 * API autenticada (mensajes, favoritos, alertas)
 * 30 requests por 1 minuto
 */
export const authedApiLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 m'),
      analytics: true,
      prefix: 'ratelimit:authed',
    })
  : null

/**
 * Login/Registro - Solo se aplica a POST (intentos reales de auth)
 * 20 intentos por 15 minutos por IP
 */
export const authLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '15 m'),
      analytics: true,
      prefix: 'ratelimit:auth',
    })
  : null

/**
 * Publicar anuncios - Restrictivo
 * 3 anuncios por 1 hora
 */
export const publishLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
      prefix: 'ratelimit:publish',
    })
  : null

/**
 * Contact forms - Moderado
 * 10 contactos por 1 hora
 */
export const contactLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null

/**
 * Scraper endpoints - Muy restrictivo
 * 1 request por 5 minutos (solo admin)
 */
export const scraperLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1, '5 m'),
      analytics: true,
      prefix: 'ratelimit:scraper',
    })
  : null

// ── HELPERS ────────────────────────────────────────────────────────────────

/**
 * Extrae IP del request (soporta proxies)
 */
export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'anonymous'
}

/**
 * Aplica rate limit y retorna respuesta 429 si excede
 */
export async function applyRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
  request: Request
): Promise<Response | null> {
  // Si no hay Redis configurado (desarrollo), permitir todo
  if (!limiter) {
    return null
  }

  const { success, limit, reset, remaining } = await limiter.limit(identifier)

  // Headers informativos
  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(reset).toISOString(),
  }

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Has excedido el límite de peticiones. Inténtalo de nuevo más tarde.',
        retryAfter: retryAfter,
        limit: limit,
        reset: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
        },
      }
    )
  }

  return null // null = permitir continuar
}

/**
 * Chequea rate limit sin bloquear (para mostrar avisos)
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ remaining: number; limit: number; reset: Date } | null> {
  if (!limiter) return null

  const { limit, remaining, reset } = await limiter.limit(identifier)
  
  return {
    remaining,
    limit,
    reset: new Date(reset),
  }
}
