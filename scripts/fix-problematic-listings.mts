#!/usr/bin/env tsx
/**
 * Fix problematic listings - Detecta y corrige pisos con precios incorrectos y sin imágenes
 * Mayo 28, 2026
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Cargar variables de entorno
config({ path: '.env.local' })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PROBLEMATIC_IDS = [
  '47326927-14a8-4c73-920e-aa2880af1ace', // 820€ venta
  '2a242eb1-ece4-4d01-8e04-9801cf28076b', // 298€ venta
]

async function main() {
  console.log('🔍 Verificando pisos problemáticos...\n')

  // Primero buscar todos los pisos con precios sospechosamente bajos para venta
  const { data: suspiciousListings } = await supabase
    .from('listings')
    .select('id, title, price_eur, operation, images, has_images, owner_user_id, status, created_at')
    .eq('operation', 'sale')
    .lt('price_eur', 10000)
    .order('created_at', { ascending: false })
    .limit(10)

  if (suspiciousListings && suspiciousListings.length > 0) {
    console.log(`⚠️  Encontrados ${suspiciousListings.length} pisos con precio < 10.000€ para VENTA:\n`)
    
    for (const listing of suspiciousListings) {
      console.log(`📋 Piso: ${listing.title}`)
      console.log(`   ID: ${listing.id}`)
      console.log(`   Precio: ${listing.price_eur}€`)
      console.log(`   Status: ${listing.status}`)
      console.log(`   Imágenes: ${listing.images?.length ?? 0}`)
      console.log(`   has_images: ${listing.has_images}`)
      console.log(`   Usuario: ${listing.owner_user_id}`)
      console.log(`   Creado: ${new Date(listing.created_at).toLocaleString('es-ES')}`)
      
      // Verificar imágenes en listing_images
      const { data: imgRecords } = await supabase
        .from('listing_images')
        .select('*')
        .eq('listing_id', listing.id)
        .order('position')

      console.log(`   Registros en listing_images: ${imgRecords?.length ?? 0}`)

      // Si no hay imágenes, verificar Storage
      if (!imgRecords || imgRecords.length === 0) {
        const { data: files } = await supabase.storage
          .from('listings')
          .list(`${listing.owner_user_id}/${listing.id}`)

        console.log(`   Archivos en storage: ${files?.length ?? 0}`)

        if (files && files.length > 0) {
          console.log(`   💡 Reconstruyendo registros de imágenes...`)
          
          const uploadedUrls: string[] = []
          for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const path = `${listing.owner_user_id}/${listing.id}/${file.name}`
            const { data: urlData } = supabase.storage.from('listings').getPublicUrl(path)
            
            await supabase.from('listing_images').insert({
              listing_id:   listing.id,
              storage_path: path,
              external_url: urlData.publicUrl,
              position:     i,
            })
            
            uploadedUrls.push(urlData.publicUrl)
          }
          
          // Actualizar listing con URLs y has_images
          await supabase
            .from('listings')
            .update({ images: uploadedUrls, has_images: true })
            .eq('id', listing.id)
          
          console.log(`   ✅ ${files.length} imágenes reconstruidas`)
        }
      }

      // Marcar como draft si el precio es absurdo
      if (listing.status === 'published') {
        console.log(`   ⚠️  Marcando como borrador (precio sospechoso)`)
        await supabase
          .from('listings')
          .update({ status: 'draft' })
          .eq('id', listing.id)
        console.log(`   ✅ Ahora no es visible públicamente`)
      }
      
      console.log()
    }
  } else {
    console.log('✅ No se encontraron pisos con precios sospechosos')
  }

  // Ahora verificar los IDs específicos
  for (const id of PROBLEMATIC_IDS) {
    const { data: listing, error } = await supabase
      .from('listings')
      .select('id, title, price_eur, operation, images, has_images, owner_user_id, status')
      .eq('id', id)
      .single()

    if (error || !listing) {
      console.log(`❌ Piso ${id} no encontrado en DB`)
      continue
    }

    console.log(`\n📋 Verificación específica: ${listing.title}`)
    console.log(`   Status: ${listing.status}`)
  }

  console.log('\n✅ Verificación completa')
  console.log('\n📧 PRÓXIMOS PASOS:')
  console.log('   1. Contactar a los usuarios para corregir precios')
  console.log('   2. Revisar configuración del bucket "listings" en Supabase Storage')
  console.log('   3. Los pisos marcados como "draft" no son visibles hasta que se corrijan')
}

main().catch(console.error)
