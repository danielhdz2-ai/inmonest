'use client'

/**
 * useListingCount
 * Cuenta los anuncios que coinciden con los filtros actuales de la URL,
 * opcionalmente sobreescritos por `overrides` (estado local pendiente).
 * Debouncea los cambios 350 ms para no saturar Supabase.
 *
 * USO:
 *   const { count, loading } = useListingCount()                   // sólo URL
 *   const { count, loading } = useListingCount({ caract: 'ascensor,piscina' }) // local state
 */

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { applyProFilters, parseProParams } from '@/lib/search-filters'

const DEBOUNCE_MS = 350

export function useListingCount(overrides?: Record<string, string>) {
  const sp = useSearchParams()
  const [count, setCount]     = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Serialise overrides so the effect dep is stable when values don't change
  const overridesKey = overrides ? JSON.stringify(overrides) : ''

  useEffect(() => {
    // Helper: prefer override value, otherwise fall back to URL param
    const get = (key: string) => overrides?.[key] ?? sp.get(key)

    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const supabase = createClient()

        let q = supabase
          .from('listings')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('has_images', true)

        // ── Filtros base (mismos que searchListings en lib/listings.ts) ──
        const operacion = get('operacion')
        const ciudad    = get('ciudad')
        const hab       = get('hab')
        const banos     = get('banos')
        const precioMin = get('precio_min')
        const precioMax = get('precio_max')
        const areaMin   = get('area_min')
        const areaMax   = get('area_max')

        if (operacion) q = q.eq('operation', operacion)
        if (ciudad)    q = q.ilike('city', `%${ciudad}%`)

        if (get('solo_particulares') === 'true') q = q.eq('is_particular', true)
        if (get('solo_bancarias')    === 'true') q = q.eq('is_bank', true)
        if (get('solo_agencias')     === 'true') {
          q = q.eq('is_particular', false).eq('is_bank', false)
        }

        if (hab)       q = q.eq('bedrooms', parseInt(hab, 10))
        if (banos)     q = q.gte('bathrooms', parseInt(banos, 10))
        if (precioMin) q = q.gte('price_eur', parseInt(precioMin, 10))
        if (precioMax) q = q.lte('price_eur', parseInt(precioMax, 10))
        if (areaMin)   q = q.gte('area_m2', parseInt(areaMin, 10))
        if (areaMax)   q = q.lte('area_m2', parseInt(areaMax, 10))

        // ── Filtros pro (features JSONB + fecha) ─────────────────────────
        q = applyProFilters(q, parseProParams({
          estado:     get('estado')     ?? undefined,
          caract:     get('caract')     ?? undefined,
          planta:     get('planta')     ?? undefined,
          energia:    get('energia')    ?? undefined,
          multimedia: get('multimedia') ?? undefined,
          fecha_pub:  get('fecha_pub')  ?? undefined,
        }))

        const { count: n } = await q
        setCount(n ?? 0)
      } catch {
        setCount(null)
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, overridesKey])

  return { count, loading }
}
