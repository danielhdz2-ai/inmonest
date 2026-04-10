import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id: listingId } = await params

  let body: { from_name?: string; from_email?: string; from_phone?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { from_name, from_email, from_phone, message } = body

  if (!from_name?.trim() || !from_email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 422 })
  }

  // Validación básica de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const supabase = await createClient()

  // Verificar que el anuncio existe y está publicado
  const { data: listing, error: listingErr } = await supabase
    .from('listings')
    .select('id, status')
    .eq('id', listingId)
    .eq('status', 'published')
    .single()

  if (listingErr || !listing) {
    return NextResponse.json({ error: 'Anuncio no encontrado' }, { status: 404 })
  }

  const { error } = await supabase.from('listing_contacts').insert({
    listing_id: listingId,
    from_name:  from_name.trim().slice(0, 100),
    from_email: from_email.trim().slice(0, 200),
    from_phone: from_phone?.trim().slice(0, 30) ?? null,
    message:    message.trim().slice(0, 2000),
  })

  if (error) {
    console.error('listing_contacts insert error:', error)
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
