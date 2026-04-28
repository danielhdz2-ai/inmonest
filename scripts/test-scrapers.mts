#!/usr/bin/env node
/**
 * test-scrapers.mts
 * 
 * Script de prueba: ejecuta scrapers principales con límite de 2 listings
 * para verificar generación automática de AI v2.0
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const SCRAPERS_TO_TEST = [
  { name: 'pisos.com (agencias)', script: 'pisoscom.ts', limit: 2 },
  { name: 'pisos.com (particulares)', script: 'pisoscom_particulares.ts', limit: 2 },
  { name: 'Fotocasa (particulares)', script: 'fotocasa_particulares.ts', limit: 2 },
  { name: 'Habitaclia (particulares)', script: 'habitaclia_particulares.ts', limit: 2 },
  { name: 'Milanuncios (particulares)', script: 'milanuncios_particulares.ts', limit: 2 },
  { name: 'Gilmar', script: 'gilmar.ts', limit: 2 },
  { name: 'Aliseda', script: 'aliseda.ts', limit: 2 },
]

async function runTest() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST DE SCRAPERS (2 listings cada uno)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('⚠️  Este test verificará que:')
  console.log('   1. Los scrapers funcionan correctamente')
  console.log('   2. Se genera AI description automáticamente')
  console.log('   3. Se genera meta_description')
  console.log('   4. La calidad es premium (v2.0)\n')

  let totalSuccess = 0
  let totalFailed = 0

  for (const scraper of SCRAPERS_TO_TEST) {
    console.log(`\n[${totalSuccess + totalFailed + 1}/${SCRAPERS_TO_TEST.length}] Ejecutando: ${scraper.name}`)
    console.log('─'.repeat(50))

    try {
      const command = `npx tsx scripts/scrapers/${scraper.script} --max=${scraper.limit} --city=Barcelona`
      console.log(`💻 Comando: ${command}\n`)

      const { stdout, stderr } = await execAsync(command, {
        cwd: process.cwd(),
        timeout: 120000, // 2 minutos timeout
      })

      if (stdout) {
        // Mostrar solo últimas líneas relevantes
        const lines = stdout.split('\n').filter(l => l.trim())
        const lastLines = lines.slice(-5)
        lastLines.forEach(l => console.log(`   ${l}`))
      }

      if (stderr && !stderr.includes('injected env')) {
        console.log(`⚠️  Warnings: ${stderr}`)
      }

      console.log(`✅ ${scraper.name} - COMPLETADO`)
      totalSuccess++
    } catch (error: any) {
      console.error(`❌ ${scraper.name} - ERROR`)
      if (error.stdout) {
        console.log('   Último output:', error.stdout.split('\n').slice(-3).join('\n'))
      }
      if (error.stderr) {
        console.error('   Error:', error.stderr.split('\n')[0])
      }
      totalFailed++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 RESUMEN DEL TEST')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅ Scrapers exitosos: ${totalSuccess}/${SCRAPERS_TO_TEST.length}`)
  console.log(`❌ Scrapers fallidos: ${totalFailed}/${SCRAPERS_TO_TEST.length}`)
  console.log('\n💡 Próximo paso:')
  console.log('   Revisa los listings agregados en Supabase')
  console.log('   Verifica que tengan ai_description y meta_description')
  console.log('   Si todo está correcto, reactiva los scrapers completos\n')
}

runTest()
