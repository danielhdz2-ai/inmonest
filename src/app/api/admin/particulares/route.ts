import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/admin/particulares
 * Retorna base de datos completa de usuarios particulares que publicaron pisos
 * Incluye sus anuncios y mensajes de contacto recibidos
 */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Solo admins autorizados
  const adminEmails = [
    process.env.CONTACT_NOTIFY_EMAIL,
    'daniel.hdz.trader@gmail.com',
  ].filter(Boolean)
  
  if (!user || !adminEmails.includes(user.email || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const adminSb = createAdminClient()

  // Obtener todos los usuarios que publicaron al menos un piso
  const { data: listingsData } = await adminSb
    .from('listings')
    .select(`
      id,
      title,
      price_eur,
      operation,
      city,
      district,
      bedrooms,
      area_m2,
      status,
      published_at,
      created_at,
      owner_user_id,
      is_particular
    `)
    .eq('origin', 'direct')
    .order('created_at', { ascending: false })

  if (!listingsData) {
    return NextResponse.json({ particulares: [] })
  }

  // Agrupar por owner_user_id
  const userMap = new Map<string, {
    userId: string
    email: string
    name: string
    phone: string | null
    metadata: Record<string, any>
    totalListings: number
    activeListings: number
    listings: typeof listingsData
    contacts: Array<{
      id: string
      listingId: string
      listingTitle: string
      fromName: string
      fromEmail: string
      fromPhone: string | null
      message: string
      createdAt: string
    }>
    firstListing: string
    lastListing: string
  }>()

  // Obtener datos de usuario para cada owner
  for (const listing of listingsData) {
    if (!listing.owner_user_id) continue

    if (!userMap.has(listing.owner_user_id)) {
      // Obtener datos del usuario de auth.users
      const { data: { user: userData } } = await adminSb.auth.admin.getUserById(listing.owner_user_id)
      
      if (userData) {
        userMap.set(listing.owner_user_id, {
          userId: listing.owner_user_id,
          email: userData.email || 'Sin email',
          name: (userData.user_metadata?.full_name as string) || userData.email?.split('@')[0] || 'Anónimo',
          phone: (userData.user_metadata?.phone as string | null) || null,
          metadata: userData.user_metadata || {},
          totalListings: 0,
          activeListings: 0,
          listings: [],
          contacts: [],
          firstListing: listing.created_at,
          lastListing: listing.created_at,
        })
      }
    }

    const userData = userMap.get(listing.owner_user_id)
    if (userData) {
      userData.totalListings++
      if (listing.status === 'published') userData.activeListings++
      userData.listings.push(listing)
      
      // Actualizar fechas
      if (new Date(listing.created_at) < new Date(userData.firstListing)) {
        userData.firstListing = listing.created_at
      }
      if (new Date(listing.created_at) > new Date(userData.lastListing)) {
        userData.lastListing = listing.created_at
      }
    }
  }

  // Obtener contactos para cada usuario
  for (const [userId, userData] of userMap.entries()) {
    const { data: contacts } = await adminSb
      .from('listing_contacts')
      .select(`
        id,
        listing_id,
        from_name,
        from_email,
        from_phone,
        message,
        created_at
      `)
      .eq('owner_user_id', userId)
      .order('created_at', { ascending: false })

    if (contacts) {
      userData.contacts = contacts.map(c => {
        const listing = userData.listings.find(l => l.id === c.listing_id)
        return {
          id: c.id,
          listingId: c.listing_id,
          listingTitle: listing?.title || 'Anuncio eliminado',
          fromName: c.from_name,
          fromEmail: c.from_email,
          fromPhone: c.from_phone,
          message: c.message,
          createdAt: c.created_at,
        }
      })
    }
  }

  const particulares = Array.from(userMap.values())
    .sort((a, b) => b.totalListings - a.totalListings) // Ordenar por más activos

  return NextResponse.json({ particulares })
}
