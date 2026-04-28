#!/usr/bin/env node
/**
 * execute-reset.mts
 * 
 * Ejecuta el reset total de calidad: elimina listings sin AI
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Cargar .env.local
config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function executeReset() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🚨 RESET TOTAL DE CALIDAD')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // PASO 1: Estadísticas PRE
  console.log('📊 ESTADO ACTUAL (PRE-RESET):')
  const { count: totalPre } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })

  const { count: withAIPre } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .not('ai_description', 'is', null)

  const withoutAIPre = (totalPre || 0) - (withAIPre || 0)

  console.log(`   Total: ${totalPre}`)
  console.log(`   Con AI: ${withAIPre}`)
  console.log(`   Sin AI: ${withoutAIPre}\n`)

  // PASO 2: Obtener IDs para backup
  console.log('💾 Creando backup de seguridad...')
  const { data: listingsToDelete, error: fetchError } = await supabase
    .from('listings')
    .select('*')
    .is('ai_description', null)

  if (fetchError) {
    console.error('❌ Error obteniendo listings:', fetchError)
    process.exit(1)
  }

  // Guardar backup en archivo JSON
  const backupPath = path.join(process.cwd(), 'logs', 'backup-reset-quality-20260427.json')
  fs.mkdirSync(path.dirname(backupPath), { recursive: true })
  fs.writeFileSync(backupPath, JSON.stringify(listingsToDelete, null, 2))
  console.log(`✅ Backup guardado: ${backupPath} (${listingsToDelete?.length || 0} registros)\n`)

  // PASO 3: Eliminar listings sin AI
  console.log('🗑️  Eliminando listings sin AI description...')
  const { error: deleteError, count: deletedCount } = await supabase
    .from('listings')
    .delete({ count: 'exact' })
    .is('ai_description', null)

  if (deleteError) {
    console.error('❌ Error eliminando listings:', deleteError)
    process.exit(1)
  }

  console.log(`✅ Eliminados: ${deletedCount} listings\n`)

  // PASO 4: Verificación POST
  console.log('📊 ESTADO FINAL (POST-RESET):')
  const { count: totalPost } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })

  const { count: withAIPost } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .not('ai_description', 'is', null)

  const withoutAIPost = (totalPost || 0) - (withAIPost || 0)
  const percentage = totalPost ? Math.round(((withAIPost || 0) / totalPost) * 100) : 0

  console.log(`   Total: ${totalPost}`)
  console.log(`   Con AI: ${withAIPost}`)
  console.log(`   Sin AI: ${withoutAIPost}`)
  console.log(`   Cobertura: ${percentage}%\n`)

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ RESET COMPLETADO')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`🎯 Plataforma 100% premium: ${totalPost} listings con AI v2.0`)
  console.log(`📁 Backup disponible: ${backupPath}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

executeReset()
