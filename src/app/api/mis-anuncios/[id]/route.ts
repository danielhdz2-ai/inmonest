import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ id: string }>
}

// PATCH /api/mis-anuncios/[id] — cambiar estado o actualizar campos
export async function PATCH(req: NextRequest, { params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  // Verificar que el anuncio pertenece al usuario
  const { data: listing } = await supabase
    .from('listings')
    .select('id, owner_user_id, status')
    .eq('id', id)
    .single()

  if (!listing) return NextResponse.json({ error: 'Anuncio no encontrado' }, { status: 404 })
  if (listing.owner_user_id !== user.id) return NextResponse.json({ error: 'Sin permiso' }, { status: 403 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const allowedFields: Record<string, unknown> = {}

  // Cambio de estado
  if (body.status !== undefined) {
    const allowed = ['published', 'paused', 'archived']
    if (!allowed.includes(body.status as string)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
    }
    allowedFields.status = body.status
    if (body.status === 'published' && listing.status !== 'published') {
      allowedFields.published_at = new Date().toISOString()
    }
  }

  // Campos editables
  if (body.price_eur !== undefined) {
    const n = Number(body.price_eur)
    if (isNaN(n) || n <= 0) return NextResponse.json({ error: 'Precio inválido' }, { status: 400 })
    allowedFields.price_eur = n
  }
  if (body.title !== undefined) {
    allowedFields.title = String(body.title).trim().slice(0, 200)
  }
  if (body.description !== undefined) {
    allowedFields.description = String(body.description).trim().slice(0, 3000)
  }

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: 'Sin campos para actualizar' }, { status: 400 })
  }

  const { error } = await supabase
    .from('listings')
    .update(allowedFields)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

// DELETE /api/mis-anuncios/[id] — archivar (no borrar datos)
export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: listing } = await supabase
    .from('listings')
    .select('id, owner_user_id')
    .eq('id', id)
    .single()

  if (!listing) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  if (listing.owner_user_id !== user.id) return NextResponse.json({ error: 'Sin permiso' }, { status: 403 })

  const { error } = await supabase
    .from('listings')
    .update({ status: 'archived' })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
