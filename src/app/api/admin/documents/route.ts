import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const clientEmail = searchParams.get('email')

    let query = supabase
      .from('client_docs')
      .select(`
        *,
        gestoria_requests!inner(
          id,
          client_name,
          client_email,
          service_key,
          created_at
        )
      `)
      .order('uploaded_at', { ascending: false })

    if (clientEmail) {
      query = query.eq('gestoria_requests.client_email', clientEmail)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ documents: data || [] })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
