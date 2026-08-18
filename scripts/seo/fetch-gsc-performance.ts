/**
 * Descarga rendimiento de Search Console (clics, impresiones, CTR, posición).
 *
 * Uso:
 *   npm run gsc:auth          # solo la primera vez
 *   npm run gsc:fetch
 *   npm run gsc:fetch -- --days 28
 *   npm run gsc:fetch -- --dimension query
 *
 * Salida: scripts/seo/output/gsc-performance.json
 *         scripts/seo/output/gsc-performance.csv
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  DEFAULT_GSC_SITE,
  getAuthenticatedClient,
  getSearchConsole,
  resolveSiteUrl,
  siteFromEnv,
} from './gsc-client'

const dir = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(dir, 'output')

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

type GscRow = {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

function toCsv(rows: GscRow[], dimension: string): string {
  const header = [dimension, 'clicks', 'impressions', 'ctr', 'position'].join(',')
  const lines = rows.map((r) => {
    const key = r.keys[0]?.includes(',') ? `"${r.keys[0].replace(/"/g, '""')}"` : r.keys[0]
    return [key, r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(2)].join(',')
  })
  return [header, ...lines].join('\n')
}

async function main() {
  const days = Math.max(1, parseInt(argValue('--days') ?? '28', 10))
  const dimension = (argValue('--dimension') ?? 'page') as 'page' | 'query' | 'date' | 'country' | 'device'

  const end = new Date()
  end.setDate(end.getDate() - 2) // GSC suele ir 2 días retrasada
  const start = new Date(end)
  start.setDate(start.getDate() - (days - 1))

  const auth = await getAuthenticatedClient()
  const siteUrl = await resolveSiteUrl(auth, siteFromEnv() ?? DEFAULT_GSC_SITE)
  const sc = getSearchConsole(auth)

  console.log(`📊 Search Console — ${siteUrl}`)
  console.log(`   Periodo: ${formatDate(start)} → ${formatDate(end)} (${days} días)`)
  console.log(`   Dimensión: ${dimension}`)

  const { data } = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: formatDate(start),
      endDate: formatDate(end),
      dimensions: [dimension],
      rowLimit: 25000,
      dataState: 'final',
    },
  })

  const rows: GscRow[] = (data.rows ?? []).map((r) => ({
    keys: r.keys ?? [],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }))

  const totals = rows.reduce(
    (acc, r) => ({
      clicks: acc.clicks + r.clicks,
      impressions: acc.impressions + r.impressions,
    }),
    { clicks: 0, impressions: 0 },
  )

  const payload = {
    generadoEn: new Date().toISOString(),
    siteUrl,
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimension,
    totals: {
      ...totals,
      ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    },
    rowCount: rows.length,
    rows,
  }

  fs.mkdirSync(outDir, { recursive: true })
  const jsonPath = path.join(outDir, `gsc-performance-${dimension}.json`)
  const csvPath = path.join(outDir, `gsc-performance-${dimension}.csv`)

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8')
  fs.writeFileSync(csvPath, toCsv(rows, dimension), 'utf8')

  console.log(`\n✅ ${rows.length} filas`)
  console.log(`   Clics: ${totals.clicks.toLocaleString('es-ES')} · Impresiones: ${totals.impressions.toLocaleString('es-ES')}`)
  console.log(`   JSON: ${jsonPath}`)
  console.log(`   CSV:  ${csvPath}`)

  if (dimension === 'page' && rows.length) {
    console.log('\n   Top 10 páginas (clics):')
    rows.slice(0, 10).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.clicks} clics — ${r.keys[0]}`)
    })
  }
  if (dimension === 'query' && rows.length) {
    console.log('\n   Top 10 queries (clics):')
    rows.slice(0, 10).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.clicks} clics — "${r.keys[0]}"`)
    })
  }
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err)
  process.exit(1)
})
