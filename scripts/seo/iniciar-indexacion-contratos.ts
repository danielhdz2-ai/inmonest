/**
 * Verifica URLs del cluster contratos-inmobiliarios en producción,
 * intenta Google Indexing API (service account) o IndexNow, y genera lista GSC.
 *
 * Uso:
 *   npx tsx scripts/seo/iniciar-indexacion-contratos.ts
 *   npx tsx scripts/seo/iniciar-indexacion-contratos.ts -- --limit 20
 *
 * Variables opcionales (.env.local):
 *   GOOGLE_APPLICATION_CREDENTIALS — JSON service account con Indexing API
 *   INDEXNOW_KEY — clave IndexNow (archivo en https://inmonest.com/{key}.txt)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config as loadDotenv } from 'dotenv'
import { google } from 'googleapis'
import {
  getGestoriaPrioridadAltaCompletas,
  SITE_URL,
} from '../../src/lib/gestoria-indexar-urls'

const dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(dir, '../..')
loadDotenv({ path: path.join(root, '.env.local') })

const OUT_DIR = path.join(dir, 'output')
const BATCH_LIMIT = (() => {
  const i = process.argv.indexOf('--limit')
  if (i >= 0 && process.argv[i + 1]) return Math.max(1, parseInt(process.argv[i + 1], 10))
  return 30
})()

const CONTRATOS_FILTER = /\/contratos-inmobiliarios/

async function checkLive(url: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Inmonest-Indexacion/1.0' },
      signal: AbortSignal.timeout(20_000),
    })
    return { ok: res.ok, status: res.status }
  } catch {
    return { ok: false, status: 0 }
  }
}

async function submitIndexingApi(urls: string[]): Promise<number> {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()
  if (!credPath || !fs.existsSync(credPath)) {
    console.log('ℹ️  Sin GOOGLE_APPLICATION_CREDENTIALS — omitiendo Indexing API')
    return 0
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: credPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  })
  const indexing = google.indexing({ version: 'v3', auth })
  let ok = 0

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      })
      ok++
      console.log(`   ✅ Indexing API: ${url}`)
      await new Promise((r) => setTimeout(r, 500))
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`   ⚠️  Indexing API falló (${url}): ${msg.slice(0, 120)}`)
    }
  }
  return ok
}

async function submitIndexNow(urls: string[]): Promise<boolean> {
  const key = process.env.INDEXNOW_KEY?.trim()
  if (!key) {
    console.log('ℹ️  Sin INDEXNOW_KEY — omitiendo IndexNow')
    return false
  }

  const body = {
    host: 'inmonest.com',
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls,
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  if (res.ok || res.status === 202) {
    console.log(`✅ IndexNow: ${urls.length} URLs enviadas (${res.status})`)
    return true
  }
  console.log(`⚠️  IndexNow respondió ${res.status}`)
  return false
}

async function main() {
  const allPrioridad = getGestoriaPrioridadAltaCompletas()
  const contratosUrls = allPrioridad.filter((u) => CONTRATOS_FILTER.test(u))

  console.log('\n🔍 Indexación cluster contratos-inmobiliarios')
  console.log(`   URLs en prioridad alta: ${contratosUrls.length}`)
  console.log(`   Lote máximo: ${BATCH_LIMIT}\n`)

  const live: string[] = []
  const broken: Array<{ url: string; status: number }> = []

  for (const url of contratosUrls) {
    const { ok, status } = await checkLive(url)
    if (ok) {
      live.push(url)
      console.log(`   ✓ ${status} ${url}`)
    } else {
      broken.push({ url, status })
      console.log(`   ✗ ${status || 'ERR'} ${url}`)
    }
  }

  const batch = live.slice(0, BATCH_LIMIT)

  console.log(`\n📡 Enviando ${batch.length} URLs a motores de búsqueda…`)
  const indexedApi = await submitIndexingApi(batch)
  await submitIndexNow(batch)

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
  const stamp = new Date().toISOString().slice(0, 10)
  const outTxt = path.join(OUT_DIR, `contratos-indexacion-${stamp}.txt`)
  const outGsc = path.join(OUT_DIR, `contratos-gsc-manual-${stamp}.txt`)

  const report = [
    `# Contratos inmobiliarios — indexación ${new Date().toISOString()}`,
    `# Live: ${live.length} · Rotas: ${broken.length} · Indexing API OK: ${indexedApi}`,
    '',
    '## SOLICITAR EN GSC (Inspección de URL → Solicitar indexación)',
    '## Límite ~10-20/día si no hay Indexing API',
    '',
    ...batch,
    '',
    '## TODAS LIVE',
    ...live,
    '',
  ]

  if (broken.length) {
    report.push('## NO DISPONIBLES (revisar deploy)', ...broken.map((b) => `# ${b.status} ${b.url}`), '')
  }

  fs.writeFileSync(outTxt, report.join('\n'), 'utf8')
  fs.writeFileSync(outGsc, batch.join('\n'), 'utf8')

  console.log(`\n📄 Informe: ${path.relative(root, outTxt)}`)
  console.log(`📄 Lote GSC manual: ${path.relative(root, outGsc)}`)
  console.log(`\n✅ ${live.length} URLs live · ${broken.length} pendientes de deploy`)
  if (indexedApi === 0 && !process.env.INDEXNOW_KEY) {
    console.log('\n💡 Para indexación automática:')
    console.log('   • GOOGLE_APPLICATION_CREDENTIALS (service account en GSC)')
    console.log('   • o INDEXNOW_KEY + archivo público en la raíz del dominio')
    console.log('   • o pega el lote GSC en Search Console → Inspección de URLs')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
