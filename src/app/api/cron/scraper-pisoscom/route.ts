import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/** Desactivado: catálogo público solo fondos bancarios (sin pisos.com). */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: 'Scraper pisos.com desactivado' },
    { status: 410 },
  )
}
