/**
 * Compara el export GSC (scripts/gsc-coverage-urls.csv) con el estado HTTP actual.
 *
 * Uso:
 *   npm run gsc:audit
 *   npm run gsc:audit -- --limit 50
 *   npm run gsc:audit -- --issue "404"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseGscCoverageCsv } from '../../src/lib/gestoria-indexacion-gsc'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')
const defaultCsv = path.join(root, 'scripts/gsc-coverage-urls.csv')
const outDir = path.join(root, 'scripts/seo/output')

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}

type LiveResult = {
  url: string
  issue: string
  category: string
  status: number
  finalUrl: string
  stillBroken: boolean
}

async function checkUrl(url: string): Promise<{ status: number; finalUrl: string }> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Inmonest-GSC-Audit/1.0' },
      signal: AbortSignal.timeout(15_000),
    })
    return { status: res.status, finalUrl: res.url }
  } catch {
    return { status: 0, finalUrl: url }
  }
}

function isStillBroken(issue: string, status: number): boolean {
  if (status === 0) return true
  if (issue.includes('404') || issue.includes('No se ha encontrado')) return status === 404
  if (issue.includes('redirección') || issue.includes('redirect')) {
    return status >= 400
  }
  if (issue.includes('sin indexar')) return status >= 400
  return status >= 400
}

async function main() {
  const csvPath = argValue('--csv') ?? defaultCsv
  const limit = Number(argValue('--limit') ?? '0') || Infinity
  const issueFilter = argValue('--issue')?.toLowerCase()

  if (!fs.existsSync(csvPath)) {
    console.error(`No se encuentra ${csvPath}`)
    process.exit(1)
  }

  let rows = parseGscCoverageCsv(fs.readFileSync(csvPath, 'utf8'))
  if (issueFilter) {
    rows = rows.filter((r) => r.issue.toLowerCase().includes(issueFilter))
  }

  const unique = new Map<string, (typeof rows)[0]>()
  for (const row of rows) unique.set(row.url, row)
  const toCheck = [...unique.values()].slice(0, limit)

  console.log(`🔍 Auditando ${toCheck.length} URLs (${path.relative(root, csvPath)})…\n`)

  const results: LiveResult[] = []
  const batchSize = 8

  for (let i = 0; i < toCheck.length; i += batchSize) {
    const batch = toCheck.slice(i, i + batchSize)
    const checked = await Promise.all(
      batch.map(async (row) => {
        const { status, finalUrl } = await checkUrl(row.url)
        const stillBroken = isStillBroken(row.issue, status)
        return {
          url: row.url,
          issue: row.issue,
          category: row.category,
          status,
          finalUrl,
          stillBroken,
        }
      }),
    )
    results.push(...checked)
    process.stdout.write(`   ${Math.min(i + batchSize, toCheck.length)}/${toCheck.length}\r`)
  }

  const broken = results.filter((r) => r.stillBroken)
  const fixed = results.filter((r) => !r.stillBroken)

  fs.mkdirSync(outDir, { recursive: true })
  const jsonPath = path.join(outDir, 'gsc-coverage-live-audit.json')
  const csvOut = path.join(outDir, 'gsc-coverage-still-broken.csv')

  const report = {
    generadoEn: new Date().toISOString(),
    fuente: path.relative(root, csvPath),
    total: results.length,
    aunRotas: broken.length,
    corregidas: fixed.length,
    rotas: broken,
    corregidasLista: fixed.slice(0, 50),
  }

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8')

  const csvLines = [
    'status,issue,url,final_url,category',
    ...broken.map((r) => `${r.status},"${r.issue.replace(/"/g, '""')}",${r.url},${r.finalUrl},${r.category}`),
  ]
  fs.writeFileSync(csvOut, csvLines.join('\n'), 'utf8')

  console.log('\n📊 AUDITORÍA GSC vs PRODUCCIÓN')
  console.log('================================')
  console.log(`Total comprobadas:  ${results.length}`)
  console.log(`✅ Corregidas:       ${fixed.length}`)
  console.log(`❌ Aún rotas:        ${broken.length}`)
  console.log(`\nJSON: ${jsonPath}`)
  console.log(`CSV rotas: ${csvOut}`)

  if (broken.length) {
    console.log('\n❌ Top URLs aún con problema:')
    broken.slice(0, 20).forEach((r) => {
      console.log(`   ${r.status} — ${r.url}`)
      if (r.finalUrl !== r.url) console.log(`        → ${r.finalUrl}`)
    })
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
