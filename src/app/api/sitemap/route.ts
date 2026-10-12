import { NextResponse } from 'next/server'

/** Legacy: antes servía miles de /pisos/* — ahora redirige al sitemap de gestoría. */
export async function GET(request: Request) {
  const url = new URL('/sitemap.xml', request.url)
  return NextResponse.redirect(url, 308)
}

export const revalidate = 86400
