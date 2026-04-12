import { NextRequest, NextResponse } from 'next/server'

// Bloquear IPs privadas / locales para prevenir SSRF
const PRIVATE_IP_RE =
  /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|0\.0\.0\.0|::1|fc00:|fe80:)/i

function isSafeUrl(rawUrl: string): boolean {
  try {
    const { protocol, hostname } = new URL(rawUrl)
    // Solo HTTPS
    if (protocol !== 'https:') return false
    // Bloquear hostnames privados
    if (PRIVATE_IP_RE.test(hostname)) return false
    // Bloquear metadata cloud (AWS, GCP, Azure)
    if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal') return false
    return true
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

  if (!isSafeUrl(imageUrl)) {
    return new NextResponse('URL not allowed', { status: 403 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
      },
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
