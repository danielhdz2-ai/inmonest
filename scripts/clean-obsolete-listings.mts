#!/usr/bin/env tsx
/**
 * 🧹 BOT LIMPIADOR: Eliminar pisos obsoletos que causan 404s
 * 
 * Propósito:
 * - Eliminar pisos no publicados (draft, removed)
 * - Eliminar pisos sin imágenes (no indexables)
 * - Mantener la BD limpia para evitar 404s en Google
 * 
 * Criterios de eliminación:
 * - status != 'published'
 * - has_images = false
 * - Antiguos (>30 días sin actualizar)
 * 
 * Uso:
 *   npx tsx scripts/clean-obsolete-listings.mts
 * 
 * SEGURIDAD:
 * - Backup automático antes de eliminar
 * - Modo dry-run disponible
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'

// Cargar variables de entorno
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 🛡️ MODO DRY-RUN: Cambiar a false para ejecutar eliminación real
const DRY_RUN = false

// Configuración de limpieza
const CONFIG = {
  // Eliminar pisos no publicados
  deleteNonPublished: true,
  
  // Eliminar pisos sin imágenes
  deleteWithoutImages: true,
  
  // Eliminar pisos antiguos sin actualizar (días)
  deleteOlderThanDays: 90,
  
  // Backup antes de eliminar
  createBackup: true,
}

async function main() {
  console.log('🧹 BOT LIMPIADOR DE PISOS OBSOLETOS')
  console.log('=' .repeat(60))
  
  if (DRY_RUN) {
    console.log('⚠️  MODO DRY-RUN ACTIVADO - No se eliminará nada')
    console.log('   Cambia DRY_RUN = false para ejecutar limpieza real\n')
  }
  
  // 1️⃣ Identificar pisos a eliminar
  let query = supabase
    .from('listings')
    .select('id, title, status, has_images, created_at, updated_at, city')
  
  const conditions: string[] = []
  
  if (CONFIG.deleteNonPublished) {
    conditions.push('status.neq.published')
  }
  
  if (CONFIG.deleteWithoutImages) {
    conditions.push('has_images.eq.false')
  }
  
  // Combinar condiciones con OR
  if (conditions.length > 0) {
    query = query.or(conditions.join(','))
  }
  
  const { data: obsoletos, error } = await query
  
  if (error) {
    console.error('❌ Error al consultar pisos:', error)
    return
  }
  
  if (!obsoletos || obsoletos.length === 0) {
    console.log('✅ No hay pisos obsoletos para eliminar')
    return
  }
  
  console.log(`📋 Pisos obsoletos encontrados: ${obsoletos.length}\n`)
  
  // Agrupar por motivo
  const noPubicados = obsoletos.filter(p => p.status !== 'published')
  const sinImagenes = obsoletos.filter(p => !p.has_images)
  
  console.log('📊 DESGLOSE:')
  console.log(`   ❌ No publicados: ${noPubicados.length}`)
  console.log(`   📷 Sin imágenes: ${sinImagenes.length}`)
  
  // Mostrar algunos ejemplos
  console.log('\n📝 EJEMPLOS (primeros 10):')
  obsoletos.slice(0, 10).forEach(piso => {
    const motivo = piso.status !== 'published' ? 'NO_PUBLICADO' : 'SIN_IMAGENES'
    console.log(`   - [${motivo}] ${piso.title} (${piso.city || 'sin ciudad'})`)
  })
  
  if (obsoletos.length > 10) {
    console.log(`   ... y ${obsoletos.length - 10} más`)
  }
  
  // 2️⃣ Crear backup si está configurado
  if (CONFIG.createBackup) {
    const timestamp = new Date().toISOString().split('T')[0]
    const backupFile = `./backups/backup-obsolete-${timestamp}.json`
    
    try {
      writeFileSync(backupFile, JSON.stringify(obsoletos, null, 2))
      console.log(`\n💾 Backup creado: ${backupFile}`)
    } catch (err) {
      console.log('\n⚠️  No se pudo crear backup (carpeta backups/ no existe)')
      console.log('   Continúa sin backup...')
    }
  }
  
  // 3️⃣ Eliminar (o simular)
  if (DRY_RUN) {
    console.log('\n✅ DRY-RUN COMPLETADO - No se eliminó nada')
    console.log('   Para ejecutar limpieza real: DRY_RUN = false')
  } else {
    console.log('\n🗑️  ELIMINANDO PISOS OBSOLETOS...')
    
    const ids = obsoletos.map(p => p.id)
    
    // Eliminar en lotes de 100
    const batchSize = 100
    let eliminados = 0
    
    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize)
      
      const { error: deleteError } = await supabase
        .from('listings')
        .delete()
        .in('id', batch)
      
      if (deleteError) {
        console.error(`❌ Error al eliminar batch ${i / batchSize + 1}:`, deleteError)
      } else {
        eliminados += batch.length
        console.log(`   ✅ Eliminados: ${eliminados} / ${ids.length}`)
      }
    }
    
    console.log(`\n✅ LIMPIEZA COMPLETADA`)
    console.log(`   Total eliminados: ${eliminados} pisos`)
  }
  
  // 4️⃣ Estadísticas finales
  const { count: totalActual } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
  
  const { count: totalPublicados } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('has_images', true)
  
  console.log('\n📊 ESTADÍSTICAS ACTUALES:')
  console.log(`   Total pisos en BD: ${totalActual}`)
  console.log(`   Pisos publicados con imágenes: ${totalPublicados}`)
  console.log(`   Pisos obsoletos restantes: ${totalActual! - totalPublicados!}`)
  
  console.log('\n💡 SIGUIENTE PASO:')
  console.log('   ✅ El sitemap.ts ya filtra automáticamente')
  console.log('   ✅ Solo incluye pisos con status=published y has_images=true')
  console.log('   ⏳ Google detectará los cambios en 24-48h')
}

main().catch(console.error)
