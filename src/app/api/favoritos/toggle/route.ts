import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET: listar favoritos del usuario
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data, error } = await supabase
    .from('user_favorites')
    .select('listing_id')
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ favorites: (data ?? []).map(f => f.listing_id) })
}

// POST: toggle favorito (añadir o quitar)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { listing_id } = await req.json()
  if (!listing_id) return NextResponse.json({ error: 'listing_id requerido' }, { status: 400 })

  // Ver si existe
  const { data: existing } = await supabase
    .from('user_favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('listing_id', listing_id)
    .single()

  if (existing) {
    // Quitar
    await supabase.from('user_favorites').delete().eq('id', existing.id)
    return NextResponse.json({ action: 'removed' })
  } else {
    // Añadir
    await supabase.from('user_favorites').insert({ user_id: user.id, listing_id })
    return NextResponse.json({ action: 'added' })
  }
}
