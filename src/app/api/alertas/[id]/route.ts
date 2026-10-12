import { NextResponse } from 'next/server'

export async function PATCH() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Alertas de búsqueda desactivadas' }, { status: 410 })
}
