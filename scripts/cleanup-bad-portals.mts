/**
 * Limpieza de portales de baja calidad
 * - Eliminar todos los pisos de Properstar
 * - Eliminar pisos de agencia de Wallapop (debe ser solo particulares)
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

async function cleanup() {
  console.log('🧹 Limpiando portales de baja calidad...\n')

  const headers = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
  }

  // 1. Eliminar TODOS los pisos de Properstar
  console.log('❌ Eliminando pisos de Properstar...')
  const deleteProperstar = await fetch(`${SUPABASE_URL}/rest/v1/listings?source_portal=eq.properstar`, {
    method: 'DELETE',
    headers,
  })

  if (deleteProperstar.ok) {
    console.log('✅ Pisos de Properstar eliminados')
  } else {
    console.error('❌ Error eliminando Properstar:', await deleteProperstar.text())
  }

  // 2. Eliminar pisos de AGENCIA de Wallapop (debe ser solo particulares)
  console.log('\n❌ Eliminando pisos de agencia de Wallapop...')
  const deleteWallapopAgencies = await fetch(`${SUPABASE_URL}/rest/v1/listings?source_portal=eq.wallapop&is_particular=eq.false`, {
    method: 'DELETE',
    headers,
  })

  if (deleteWallapopAgencies.ok) {
    console.log('✅ Pisos de agencia de Wallapop eliminados')
  } else {
    console.error('❌ Error eliminando agencias Wallapop:', await deleteWallapopAgencies.text())
  }

  // 3. Mostrar estadísticas finales
  console.log('\n📊 Estadísticas finales:')
  
  const statsRes = await fetch(`${SUPABASE_URL}/rest/v1/listings?select=source_portal,is_particular`, {
    headers,
  })

  if (statsRes.ok) {
    const listings = await statsRes.json()
    const stats = listings.reduce((acc: any, l: any) => {
      const key = l.source_portal
      if (!acc[key]) acc[key] = { total: 0, particulares: 0, agencias: 0 }
      acc[key].total++
      if (l.is_particular) acc[key].particulares++
      else acc[key].agencias++
      return acc
    }, {})

    console.log('\nPor portal:')
    Object.entries(stats).forEach(([portal, data]: [string, any]) => {
      console.log(`  ${portal}: ${data.total} pisos (${data.particulares} particulares, ${data.agencias} agencias)`)
    })
  }

  console.log('\n✨ Limpieza completada')
}

cleanup().catch(console.error)
