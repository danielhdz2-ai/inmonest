import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key }, { status: 500 })
  }

  try {
    const db = createClient(url, key)
    const { data, error, count } = await db
      .from('listings')
      .select('id, status, operation, source_portal', { count: 'exact' })
      .limit(5)

    return NextResponse.json({
      ok: !error,
      total: count,
      error: error?.message ?? null,
      sample: data?.slice(0, 3) ?? [],
      env: { url: url.slice(0, 30), keyOk: key.length > 50 },
    })
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
