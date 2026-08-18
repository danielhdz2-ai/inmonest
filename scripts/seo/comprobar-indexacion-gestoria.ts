/**
 * Compara inventario gestoría vs export GSC y genera lista de URLs pendientes.
 *
 * Uso:
 *   npx tsx scripts/seo/comprobar-indexacion-gestoria.ts
 *   npx tsx scripts/seo/comprobar-indexacion-gestoria.ts --gsc ruta/al/export.csv
 *
 * Export GSC: Indexación → Páginas → (estado problemático) → Exportar
 * Guardar como scripts/gsc-coverage-urls.csv
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getGestoriaUrlsCompletasParaIndexar, getGestoriaUrlsParaIndexar } from '../../src/lib/gestoria-indexar-urls'
import {
  buildGestoriaIndexacionInforme,
  parseGscCoverageCsv,
  urlsParaSolicitarIndexacion,
} from '../../src/lib/gestoria-indexacion-gsc'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')
const defaultGsc = path.join(root, 'scripts/gsc-coverage-urls.csv')
const outJson = path.join(root, 'public/gestoria-indexacion-report.json')
const outTxt = path.join(root, 'scripts/gestoria-sin-indexar.txt')

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}

const gscPath = argValue('--gsc') ?? (fs.existsSync(defaultGsc) ? defaultGsc : null)

const inventario = getGestoriaUrlsParaIndexar()
let gscRows = null
let gscFile: string | null = null

if (gscPath && fs.existsSync(gscPath)) {
  gscRows = parseGscCoverageCsv(fs.readFileSync(gscPath, 'utf8'))
  gscFile = path.relative(root, gscPath)
  console.log(`📂 GSC: ${gscFile} (${gscRows.length} filas)`)
} else {
  console.log('⚠️  Sin export GSC — solo se marcarán landings nuevas como pendientes.')
  console.log('   Exporta desde Search Console y guárdalo en scripts/gsc-coverage-urls.csv')
}

const informe = buildGestoriaIndexacionInforme(inventario, gscRows, gscFile)
const pendientes = urlsParaSolicitarIndexacion(informe)

fs.mkdirSync(path.dirname(outJson), { recursive: true })
fs.writeFileSync(outJson, JSON.stringify(informe, null, 2), 'utf8')

const txt = [
  `# Gestoría sin indexar / pendientes — ${informe.generadoEn.slice(0, 10)}`,
  `# Inventario: ${informe.totalInventario} · Sin indexar GSC: ${informe.sinIndexar.length} · Pendientes verificar: ${informe.pendientesVerificar.length}`,
  `# Probablemente indexadas: ${informe.probablementeIndexadas}`,
  '',
  '## SOLICITAR INDEXACIÓN (GSC confirmado + landings nuevas)',
  ...pendientes,
  '',
  '## SOLO PROBLEMAS GSC (404, redirect…)',
  ...informe.problemasGsc.map((p) => `# ${p.estado}: ${p.issue}\n${p.url}`),
  '',
].join('\n')

fs.writeFileSync(outTxt, txt, 'utf8')

console.log('\n📊 INFORME GESTORÍA — INDEXACIÓN')
console.log('================================')
console.log(`Total inventario:        ${informe.totalInventario}`)
console.log(`Probablemente indexadas: ${informe.probablementeIndexadas}`)
console.log(`Sin indexar (GSC):       ${informe.sinIndexar.length}`)
console.log(`Pendientes verificar:    ${informe.pendientesVerificar.length}`)
console.log(`Otros problemas GSC:     ${informe.problemasGsc.length}`)

if (informe.sinIndexar.length) {
  console.log('\n❌ Sin indexar (GSC):')
  informe.sinIndexar.forEach((r) => console.log(`   ${r.url}`))
}

if (informe.pendientesVerificar.length) {
  console.log('\n🆕 Pendientes verificar:')
  informe.pendientesVerificar.forEach((r) => console.log(`   ${r.url}`))
}

console.log(`\n✅ ${path.relative(root, outJson)}`)
console.log(`✅ ${path.relative(root, outTxt)}`)
