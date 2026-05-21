#!/usr/bin/env tsx
/**
 * 🔍 Script para verificar si los pisos con 404 en GSC existen en la BD
 * 
 * Propósito:
 * - Verificar las URLs reportadas como 404 en Google Search Console
 * - Identificar si son pisos eliminados o problemas de enrutamiento
 * - Generar reporte para limpieza
 * 
 * Uso:
 *   npx tsx scripts/check-404-pisos.mts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Cargar variables de entorno
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// URLs reportadas como 404 en Google Search Console (21 Mayo 2026)
const URLS_404 = [
  'https://inmonest.com/pisos/1dd9dfb1-472a-4a04-837a-c4a14e2ded43',
  'https://inmonest.com/pisos/23235ec5-70d6-427c-a816-071b11daedf5',
  'https://inmonest.com/pisos/03a151e1-f3b1-4a6a-a954-fd5bea44da54',
  'https://inmonest.com/pisos/109c5b07-03ba-4ebf-80c4-04429129f71f',
  'https://inmonest.com/pisos/3cb90b33-e4b0-416a-9e63-b3bd5b975d27',
  'https://inmonest.com/pisos/a3b4a53d-7c20-438a-ad4e-50452538b8a9',
  'https://inmonest.com/pisos/cf315fc6-20fd-4996-a061-8b57b63cc48e',
  'https://inmonest.com/pisos/532e61cf-6daf-4206-bdc5-1ef100fe1af9',
  'https://inmonest.com/pisos/8856558c-53f8-4efd-8916-4e463cab097c',
  'https://inmonest.com/pisos/5b0ebd9e-a597-41cf-9abb-88fbb19630d2',
]

async function main() {
  console.log('🔍 Verificando pisos con 404 en Google Search Console...\n')
  
  // Extraer UUIDs de las URLs
  const uuids = URLS_404.map(url => url.split('/pisos/')[1])
  
  console.log(`📋 Total URLs a verificar: ${uuids.length}\n`)
  
  let existentes = 0
  let noExistentes = 0
  let noPublicados = 0
  let sinImagenes = 0
  
  for (const uuid of uuids) {
    const { data, error } = await supabase
      .from('listings')
      .select('id, title, status, has_images, city')
      .eq('id', uuid)
      .single()
    
    if (error || !data) {
      console.log(`❌ NO EXISTE: ${uuid}`)
      noExistentes++
    } else {
      if (data.status !== 'published') {
        console.log(`⚠️  NO PUBLICADO: ${uuid} - ${data.title} (status: ${data.status})`)
        noPublicados++
      } else if (!data.has_images) {
        console.log(`📷 SIN IMÁGENES: ${uuid} - ${data.title}`)
        sinImagenes++
      } else {
        console.log(`✅ EXISTE Y PUBLICADO: ${uuid} - ${data.title} (${data.city})`)
        existentes++
      }
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN:')
  console.log('='.repeat(60))
  console.log(`✅ Pisos existentes y publicados: ${existentes}`)
  console.log(`⚠️  Pisos no publicados: ${noPublicados}`)
  console.log(`📷 Pisos sin imágenes: ${sinImagenes}`)
  console.log(`❌ Pisos eliminados de BD: ${noExistentes}`)
  console.log('='.repeat(60))
  
  // Verificar cuántos pisos obsoletos hay en total
  const { count: totalObsoletos } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .or('status.neq.published,has_images.eq.false')
  
  console.log(`\n⚠️  TOTAL PISOS OBSOLETOS EN BD: ${totalObsoletos}`)
  console.log('   (status != published OR has_images = false)')
  
  // Recomendación
  console.log('\n💡 RECOMENDACIÓN:')
  if (noExistentes > 0 || noPublicados > 0 || sinImagenes > 0) {
    console.log('   ❌ Hay pisos problemáticos que causan 404s')
    console.log('   ✅ Ejecutar: npx tsx scripts/clean-obsolete-listings.mts')
    console.log('   ✅ Esto eliminará pisos no publicados y sin imágenes')
  } else {
    console.log('   ✅ Todos los pisos están correctos')
    console.log('   ⚠️  Los 404s pueden ser caché de Google - se resolverán solos')
  }
}

main().catch(console.error)
