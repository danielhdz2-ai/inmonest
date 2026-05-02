/**
 * /api/cron/generate-descriptions
 *
 * Genera descripciones para listings publicados que aún no la tengan.
 * Estrategia:
 *   - Por defecto: plantillas dinámicas (gratis, sin tokens, sin API externa)
 *   - Si OPENROUTER_API_KEY está disponible: usa IA (OpenRouter)
 *
 * Seguridad: solo acepta llamadas desde el propio Vercel cron
 * (header Authorization: Bearer CRON_SECRET) o sin header en local.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateTemplateDescription } from '@/lib/template-description'
import { generateAiDescription } from '@/lib/ai-description'

const BATCH_SIZE = 30
const DELAY_MS   = 100

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const openrouterKey = process.env.OPENROUTER_API_KEY

  const useAi = Boolean(openrouterKey)
  const mode = useAi ? 'ai' : 'template'

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
  }

  const sb = createClient(supabaseUrl, supabaseKey)

  const { data: listings, error } = await sb
    .from('listings')
    .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
    .eq('status', 'published')
    .or('ai_description.is.null,ai_description.eq.')
    .order('created_at', { ascending: false })
    .limit(BATCH_SIZE)

  if (error) {
    console.error('[cron/generate-descriptions] Error leyendo listings:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!listings || listings.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, mode, message: 'Todos los listings tienen descripción' })
  }

  let ok = 0
  let fail = 0

  for (const listing of listings) {
    let desc: string | null = null

    if (useAi) {
      desc = await generateAiDescription(listing, openrouterKey!)
    }

    if (!desc) {
      desc = generateTemplateDescription(listing)
    }

    const { error: updateErr } = await sb
      .from('listings')
      .update({ ai_description: desc })
      .eq('id', listing.id)

    if (updateErr) {
      console.error(`[cron/generate-descriptions] No se pudo guardar ${listing.id}:`, updateErr.message)
      fail++
    } else {
      ok++
    }

    await sleep(DELAY_MS)
  }

  console.log(`[cron/generate-descriptions] ✅ ${ok} guardados (modo: ${mode}), ❌ ${fail} errores`)
  return NextResponse.json({ ok: true, processed: ok, errors: fail, total: listings.length, mode })
}
