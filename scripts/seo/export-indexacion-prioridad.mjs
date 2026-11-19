/**
 * Cruza sitemap actual + GSC (impresiones 90d) y genera listas para indexación manual.
 *
 * Uso:
 *   npm run gsc:export-prioridad
 *   npm run gsc:export-prioridad -- --drilldown "C:\...\Coverage-Drilldown-....xlsx"
 *
 * Requiere antes: npm run gsc:gestoria:refresh  (o al menos gsc-performance-page.json)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../..')
const SITE = 'https://inmonest.com'

const { collectIndexableMarketingPaths } = await import('../../src/lib/sitemap-inventario.ts')
const {
  GESTORIA_INDEXAR_PRIORIDAD_ALTA,
} = await import('../../src/lib/gestoria-indexar-urls.ts')

function pathKey(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, '') || '/'
  } catch {
    return String(url).replace(SITE, '').replace(/\/$/, '') || '/'
  }
}

function scorePath(p) {
  if (p === '/') return 0
  if (p === '/gestoria') return 1
  if (GESTORIA_INDEXAR_PRIORIDAD_ALTA.includes(p)) return 2
  if (p.endsWith('/contrato-alquiler') || p === '/gestoria/contrato-alquiler') return 3
  if (p.endsWith('/contrato-arras')) return 4
  if (p.includes('compra-completa') || p.includes('venta-completa')) return 5
  if (p.startsWith('/contratos-inmobiliarios')) return 6
  if (p.startsWith('/gestoria/') && p.split('/').length === 3) return 7
  if (p.includes('/barcelona/')) return 8
  return 9
}

function loadGscPerf() {
  const file = path.join(root, 'scripts/seo/output/gsc-performance-page.json')
  if (!fs.existsSync(file)) {
    console.warn('⚠ Sin', file, '— ejecuta: npm run gsc:gestoria:refresh')
    return new Map()
  }
  const perf = JSON.parse(fs.readFileSync(file, 'utf8'))
  const byPath = new Map()
  for (const r of perf.rows ?? []) {
    const p = pathKey(r.keys[0])
    const prev = byPath.get(p)
    if (!prev || r.impressions > prev.imp) {
      byPath.set(p, { clicks: r.clicks ?? 0, imp: r.impressions ?? 0, pos: r.position ?? 0 })
    }
  }
  return byPath
}

const drillArg = process.argv.find((a) => a.startsWith('--drilldown='))?.split('=').slice(1).join('=')
  ?? (process.argv.includes('--drilldown') ? process.argv[process.argv.indexOf('--drilldown') + 1] : null)

let drilldownSinIndexar = []
if (drillArg && fs.existsSync(drillArg)) {
  const { execSync } = await import('child_process')
  const tmpPy = path.join(root, 'scripts/seo/.tmp-read-drilldown.py')
  fs.writeFileSync(
    tmpPy,
    `import pandas as pd, json
df = pd.read_excel(${JSON.stringify(drillArg)}, sheet_name='Tabla')
urls = df['URL'].astype(str).tolist() if 'URL' in df.columns else []
print(json.dumps(urls))
`,
    'utf8',
  )
  const out = execSync(`python "${tmpPy}"`, { encoding: 'utf8' })
  fs.unlinkSync(tmpPy)
  drilldownSinIndexar = JSON.parse(out).map(pathKey)
}

const sitemapPaths = collectIndexableMarketingPaths().sort()
const sitemapSet = new Set(sitemapPaths)
const perfByPath = loadGscPerf()

const sinImp = []
const conImp = []
const bajoImp = []

for (const p of sitemapPaths) {
  const m = perfByPath.get(p)
  if (!m || m.imp === 0) sinImp.push(p)
  else if (m.imp < 10) bajoImp.push({ p, ...m })
  else conImp.push({ p, ...m })
}

sinImp.sort((a, b) => scorePath(a) - scorePath(b) || a.localeCompare(b))
bajoImp.sort((a, b) => b.imp - a.imp || scorePath(a.p) - scorePath(b.p))
conImp.sort((a, b) => b.clicks - a.clicks)

const drillMatch = drilldownSinIndexar
  .filter((p) => sitemapSet.has(p) && !p.startsWith('/pisos'))
  .sort((a, b) => scorePath(a) - scorePath(b))

const outMain = path.join(root, 'scripts/gestoria-urls-para-indexar.txt')
const outSin = path.join(root, 'scripts/seo/output/urls-prioridad-sin-impressions.txt')
const outSitemap = path.join(root, 'scripts/seo/output/urls-sitemap-canonical.txt')

fs.mkdirSync(path.dirname(outSin), { recursive: true })

const today = new Date().toISOString().slice(0, 10)
const body = [
  '# Inmonest — Indexación GSC (generado automático)',
  `# Fecha: ${today}`,
  `# URLs en sitemap marketing: ${sitemapPaths.length}`,
  `# Sin impresiones (90d): ${sinImp.length} ← usar cuota aquí`,
  `# Con impresiones: ${conImp.length} ← no pedir reindexar salvo cambio grande`,
  drillMatch.length ? `# Coinciden drilldown GSC + sitemap: ${drillMatch.length}` : '# Drilldown: npm run gsc:export-prioridad -- --drilldown <xlsx>',
  '',
  '## 1. PRIORIDAD — Sin impresiones en sitemap (10/día en GSC)',
  ...sinImp.map((p) => `${SITE}${p}`),
  '',
  '## 2. Reforzar — Pocas impresiones (<10 en 90d)',
  ...bajoImp.map(({ p, imp, clicks }) => `${SITE}${p}  # ${imp} imp, ${clicks} clics`),
  '',
  '## 3. Ya con tráfico (no gastar cuota)',
  ...conImp.slice(0, 80).map(({ p, imp, clicks }) => `${SITE}${p}  # ${imp} imp, ${clicks} clics`),
  conImp.length > 80 ? `... y ${conImp.length - 80} más con impresiones` : '',
  '',
  drillMatch.length
    ? ['## 4. Drilldown GSC ∩ sitemap (rastreada/descubierta sin indexar)', ...drillMatch.map((p) => `${SITE}${p}`)].join(
        '\n',
      )
  + '\n'
    : '',
  '## Referencia — Sitemap completo',
  ...sitemapPaths.map((p) => `${SITE}${p}`),
  '',
].join('\n')

fs.writeFileSync(outMain, body, 'utf8')
fs.writeFileSync(outSin, sinImp.map((p) => `${SITE}${p}`).join('\n') + '\n', 'utf8')
fs.writeFileSync(outSitemap, sitemapPaths.map((p) => `${SITE}${p}`).join('\n') + '\n', 'utf8')

console.log('Escrito:', outMain)
console.log('Escrito:', outSin, `(${sinImp.length} URLs)`)
console.log('Escrito:', outSitemap)
if (drillMatch.length) console.log('Drilldown ∩ sitemap:', drillMatch.length)
console.log('Resumen: sitemap', sitemapPaths.length, '| sin imp', sinImp.length, '| con imp', conImp.length)