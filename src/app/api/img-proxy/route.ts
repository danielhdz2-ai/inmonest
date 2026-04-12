import { NextRequest, NextResponse } from 'next/server'

// Dominios permitidos para proxiar (solo portales inmobiliarios conocidos)
const ALLOWED_DOMAINS = [
  'pisos.com',
  'fotocasa.es',
  'idealista.com',
  'habitaclia.com',
  'mitula.es',
  'trovit.es',
  'kelify.com',
  'tucasa.com',
  'enalquiler.com',
  'solvia.es',
  'servihabitat.com',
  'aliseda.es',
  'gilmar.es',
  'tecnocasa.es',
  'monapart.com',
  'redpiso.com',
  'milanuncios.com',
  // CDNs comunes de portales
  'cdn1.infocasas.com',
  'img3.idealista.com',
  'img.fotocasa.es',
  'static.pisos.com',
  'cdn.mitula.net',
  'img.enalquiler.com',
  'images.habitaclia.com',
]

function isDomainAllowed(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return ALLOWED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`))
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  // Validar que es una URL permitida
  if (!isDomainAllowed(imageUrl)) {
    return new NextResponse('Domain not allowed', { status: 403 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        // Simulamos un navegador navegando directamente (sin Referer externo)
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        // Sin Referer para evitar bloqueos
      },
      // Timeout razonable
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      return new NextResponse('Image fetch failed', { status: 502 })
    }

    const contentType = response.headers.get('content-type') ?? 'image/jpeg'

    // Solo permitir tipos de imagen
    if (!contentType.startsWith('image/')) {
      return new NextResponse('Not an image', { status: 400 })
    }

    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new NextResponse('Failed to fetch image', { status: 502 })
  }
}
