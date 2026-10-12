import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}

export async function POST() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}
