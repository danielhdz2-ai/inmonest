import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/admin/particulares
 * Retorna TODOS los usuarios registrados en la plataforma clasificados en 3 categorías:
 * 1. Clientes Gestoría - Contrataron servicios de gestoría
 * 2. Clientes Particulares - Se registraron para ver pisos (scrapers)
 * 3. Propietarios Particulares - Publicaron sus propios pisos
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

  // Obtener TODOS los usuarios registrados en la plataforma
  const { data: { users: allUsers }, error: usersError } = await adminSb.auth.admin.listUsers()

  if (usersError || !allUsers) {
    console.error('Error loading users:', usersError)
    return NextResponse.json({ 
      clientesGestoria: [],
      clientesParticulares: [],
      propietariosParticulares: []
    })
  }

  const clientesGestoria: Array<any> = []
  const clientesParticulares: Array<any> = []
  const propietariosParticulares: Array<any> = []

  // Para cada usuario, clasificarlo en la categoría correcta
  for (const user of allUsers) {
    // Datos base del usuario (TODA LA INFORMACIÓN DISPONIBLE)
    const userInfo = {
      userId: user.id,
      email: user.email || 'Sin email',
      name: (user.user_metadata?.full_name as string) || user.email?.split('@')[0] || 'Anónimo',
      phone: (user.user_metadata?.phone as string | null) || null,
      metadata: user.user_metadata || {},
      appMetadata: user.app_metadata || {},
      provider: user.app_metadata?.provider || 'email',
      emailConfirmed: user.email_confirmed_at ? true : false,
      emailConfirmedAt: user.email_confirmed_at || null,
      registeredAt: user.created_at,
      lastSignIn: user.last_sign_in_at || user.created_at,
      role: user.role || 'user',
      banned: user.banned_until ? true : false,
    }

    // Si no tiene teléfono en metadata, buscar en listing_contacts
    if (!userInfo.phone) {
      const { data: userContacts } = await adminSb
        .from('listing_contacts')
        .select('from_phone')
        .eq('from_email', user.email)
        .not('from_phone', 'is', null)
        .limit(1)
        .single()
      
      if (userContacts?.from_phone) {
        userInfo.phone = userContacts.from_phone
      }
    }

    // 1. Verificar si tiene pedidos de gestoría pagados
    const { data: gestoriaOrders } = await adminSb
      .from('gestoria_requests')
      .select('id, service_key, amount_eur, status, created_at, paid_at')
      .eq('client_email', user.email)
      .order('created_at', { ascending: false })

    const hasPaidGestoria = gestoriaOrders?.some(o => o.status === 'paid')

    // 2. Verificar si tiene listings como propietario
    const { data: userListings } = await adminSb
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
        created_at
      `)
      .eq('owner_user_id', user.id)
      .order('created_at', { ascending: false })

    const hasListings = userListings && userListings.length > 0

    // 3. Buscar contactos recibidos (solo si es propietario)
    let contacts: Array<any> = []
    if (hasListings) {
      const { data: userContacts } = await adminSb
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
        .eq('owner_user_id', user.id)
        .order('created_at', { ascending: false })

      if (userContacts) {
        contacts = userContacts.map(c => {
          const listing = userListings.find(l => l.id === c.listing_id)
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

    // CLASIFICACIÓN EN CATEGORÍAS (orden de prioridad)
    
    // 1. CLIENTES GESTORÍA (tienen pedidos pagados)
    if (hasPaidGestoria) {
      clientesGestoria.push({
        ...userInfo,
        totalOrders: gestoriaOrders?.length || 0,
        paidOrders: gestoriaOrders?.filter(o => o.status === 'paid').length || 0,
        totalRevenue: gestoriaOrders?.filter(o => o.status === 'paid').reduce((sum, o) => sum + (o.amount_eur || 0), 0) || 0,
        orders: gestoriaOrders || [],
        lastOrder: gestoriaOrders?.[0]?.created_at || null,
      })
    }
    // 2. PROPIETARIOS PARTICULARES (publicaron pisos)
    else if (hasListings) {
      propietariosParticulares.push({
        ...userInfo,
        totalListings: userListings.length,
        activeListings: userListings.filter(l => l.status === 'published').length,
        listings: userListings,
        contacts: contacts,
        firstListing: userListings[userListings.length - 1]?.created_at || null,
        lastListing: userListings[0]?.created_at || null,
      })
    }
    // 3. CLIENTES PARTICULARES (solo se registraron, sin gestoría ni pisos)
    else {
      clientesParticulares.push({
        ...userInfo,
        // Datos adicionales que podamos tener
        favoritos: 0, // TODO: contar favoritos si existe la tabla
        alertas: 0,   // TODO: contar alertas si existe la tabla
      })
    }
  }

  // Ordenar cada categoría
  clientesGestoria.sort((a, b) => b.totalRevenue - a.totalRevenue)
  propietariosParticulares.sort((a, b) => b.totalListings - a.totalListings)
  clientesParticulares.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())

  // ── 4. LEADS/CONTACTOS: Personas que dejaron su contacto (registradas o no) ──
  const { data: allContacts } = await adminSb
    .from('listing_contacts')
    .select(`
      id,
      listing_id,
      from_name,
      from_email,
      from_phone,
      message,
      created_at,
      listings:listing_id (
        title,
        city,
        price_eur,
        operation
      )
    `)
    .order('created_at', { ascending: false })

  const leadsMap = new Map<string, any>()
  
  allContacts?.forEach(contact => {
    const email = contact.from_email.toLowerCase()
    const listing = Array.isArray(contact.listings) ? contact.listings[0] : contact.listings
    
    if (!leadsMap.has(email)) {
      // Verificar si está registrado
      const isRegistered = allUsers.some(u => u.email?.toLowerCase() === email)
      
      leadsMap.set(email, {
        email: contact.from_email,
        name: contact.from_name,
        phone: contact.from_phone,
        isRegistered,
        firstContact: contact.created_at,
        lastContact: contact.created_at,
        totalMessages: 1,
        messages: [{
          id: contact.id,
          listingId: contact.listing_id,
          listingTitle: listing?.title || 'Anuncio eliminado',
          listingCity: listing?.city || '',
          listingPrice: listing?.price_eur || 0,
          listingOperation: listing?.operation || 'rent',
          message: contact.message,
          createdAt: contact.created_at,
        }]
      })
    } else {
      const existing = leadsMap.get(email)
      existing.totalMessages++
      existing.lastContact = contact.created_at
      if (contact.from_phone && !existing.phone) {
        existing.phone = contact.from_phone
      }
      existing.messages.push({
        id: contact.id,
        listingId: contact.listing_id,
        listingTitle: listing?.title || 'Anuncio eliminado',
        listingCity: listing?.city || '',
        listingPrice: listing?.price_eur || 0,
        listingOperation: listing?.operation || 'rent',
        message: contact.message,
        createdAt: contact.created_at,
      })
    }
  })

  const leadsContactos = Array.from(leadsMap.values())
    .sort((a, b) => new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime())

  return NextResponse.json({ 
    clientesGestoria,
    clientesParticulares,
    propietariosParticulares,
    leadsContactos,
    stats: {
      totalUsers: allUsers.length,
      totalGestoria: clientesGestoria.length,
      totalParticulares: clientesParticulares.length,
      totalPropietarios: propietariosParticulares.length,
      totalLeads: leadsContactos.length,
      totalLeadsNoRegistrados: leadsContactos.filter(l => !l.isRegistered).length,
    }
  })
}
