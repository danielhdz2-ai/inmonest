import { NextResponse } from 'next/server'

/** Portal cerrado — no disparar cron de alertas de pisos. */
export async function GET() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}

export async function POST() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}
