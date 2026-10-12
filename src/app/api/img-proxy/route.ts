import { NextRequest, NextResponse } from 'next/server'

/** Portal cerrado: el proxy de fotos de portales agotaba Fast Origin Transfer en Vercel. */
export async function GET(_request: NextRequest) {
  return new NextResponse('Portal de anuncios desactivado', {
    status: 410,
    headers: { 'Cache-Control': 'public, max-age=86400' },
  })
}
