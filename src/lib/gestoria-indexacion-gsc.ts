/**
 * Parseo de exportaciones CSV de Google Search Console (Informe de páginas).
 * Formato esperado: issue,url,category,prefix  (scripts/gsc-coverage-urls.csv)
 */

import {
  CONTRATOS_INMOBILIARIOS_INDEXAR,
  SITE_URL,
} from './gestoria-indexar-urls'

export type GscIssueRow = {
  issue: string
  url: string
  category: string
  prefix: string
}

export type GscIndexEstado =
  | 'sin_indexar'
  | 'error_404'
  | 'redirect'
  | 'canonical'
  | 'otro_problema'

export type GscUrlEstado = {
  url: string
  path: string
  estado: GscIndexEstado
  issue: string
}

/** Problemas GSC que implican «solicitar indexación» */
const ISSUE_SIN_INDEXAR = /sin indexar|no indexada/i

export function parseGscCoverageCsv(csv: string): GscIssueRow[] {
  const lines = csv.trim().split(/\r?\n/)
  if (lines.length < 2) return []

  return lines.slice(1).flatMap((line) => {
    const comma = line.indexOf(',https://')
    if (comma === -1) return []
    const issue = line.slice(0, comma)
    const rest = line.slice(comma + 1)
    const parts = rest.split(',')
    const url = parts[0]
    const category = parts[1] ?? ''
    const prefix = parts.slice(2).join(',')
    if (!url.startsWith('https://')) return []
    return [{ issue, url, category, prefix }]
  })
}

export function classifyGscIssue(issue: string): GscIndexEstado {
  if (/404|no se ha encontrado/i.test(issue)) return 'error_404'
  if (/redirecci/i.test(issue)) return 'redirect'
  if (/canónica|canonical/i.test(issue)) return 'canonical'
  if (ISSUE_SIN_INDEXAR.test(issue)) return 'sin_indexar'
  return 'otro_problema'
}

export function pathFromUrl(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/$/, '') || '/'
  } catch {
    return url.replace(SITE_URL, '').replace(/\/$/, '') || '/'
  }
}

/** Mapa path → peor estado reportado en GSC */
export function buildGscEstadoMap(rows: GscIssueRow[]): Map<string, GscUrlEstado> {
  const map = new Map<string, GscUrlEstado>()
  const priority: Record<GscIndexEstado, number> = {
    sin_indexar: 4,
    error_404: 3,
    otro_problema: 2,
    redirect: 1,
    canonical: 0,
  }

  for (const row of rows) {
    if (!row.url.includes('/gestoria') && !row.url.includes('/contratos-inmobiliarios')) continue
    const path = pathFromUrl(row.url)
    const estado = classifyGscIssue(row.issue)
    const prev = map.get(path)
    if (!prev || priority[estado] > priority[prev.estado]) {
      map.set(path, { url: row.url, path, estado, issue: row.issue })
    }
  }
  return map
}

export type GestoriaIndexacionInforme = {
  generadoEn: string
  fuenteGsc: string | null
  totalInventario: number
  sinIndexar: Array<{ url: string; path: string; issue: string }>
  pendientesVerificar: Array<{ url: string; path: string; motivo: string }>
  problemasGsc: Array<{ url: string; path: string; estado: GscIndexEstado; issue: string }>
  probablementeIndexadas: number
}

/** Rutas nuevas que conviene revisar aunque no aparezcan en GSC antiguo */
const PRIORIDAD_SIN_DATOS = [
  ...CONTRATOS_INMOBILIARIOS_INDEXAR.filter((p) => p !== '/contratos-inmobiliarios'),
  '/gestoria/alquiler-local-comercial',
  '/gestoria/alquiler-local-comercial/madrid',
  '/gestoria/alquiler-local-comercial/barcelona',
  '/gestoria/alquiler-local-comercial/valencia',
  '/gestoria/alquiler-local-comercial/sevilla',
  '/gestoria/alquiler-local-comercial/malaga',
  '/gestoria/alquiler-local-comercial/bilbao',
  '/gestoria/alquiler-local-comercial/zaragoza',
  '/gestoria/alquiler-local-comercial/alicante',
]

export function buildGestoriaIndexacionInforme(
  inventarioPaths: string[],
  gscRows: GscIssueRow[] | null,
  gscFile: string | null
): GestoriaIndexacionInforme {
  const gscMap = gscRows ? buildGscEstadoMap(gscRows) : new Map()
  const sinIndexar: GestoriaIndexacionInforme['sinIndexar'] = []
  const pendientesVerificar: GestoriaIndexacionInforme['pendientesVerificar'] = []
  const problemasGsc: GestoriaIndexacionInforme['problemasGsc'] = []
  let probablementeIndexadas = 0

  for (const path of inventarioPaths) {
    const gsc = gscMap.get(path.replace(/\/$/, ''))
    const url = `${SITE_URL}${path}`

    if (!gsc) {
      if (PRIORIDAD_SIN_DATOS.includes(path as (typeof PRIORIDAD_SIN_DATOS)[number])) {
        pendientesVerificar.push({
          url,
          path,
          motivo: 'Landing nueva — no consta en el último export GSC',
        })
      } else {
        probablementeIndexadas++
      }
      continue
    }

    if (gsc.estado === 'sin_indexar') {
      sinIndexar.push({ url, path, issue: gsc.issue })
      continue
    }

    if (gsc.estado === 'canonical') {
      probablementeIndexadas++
      continue
    }

    problemasGsc.push({
      url,
      path,
      estado: gsc.estado,
      issue: gsc.issue,
    })
  }

  return {
    generadoEn: new Date().toISOString(),
    fuenteGsc: gscFile,
    totalInventario: inventarioPaths.length,
    sinIndexar,
    pendientesVerificar,
    problemasGsc,
    probablementeIndexadas,
  }
}

export function urlsParaSolicitarIndexacion(informe: GestoriaIndexacionInforme): string[] {
  return [...informe.sinIndexar, ...informe.pendientesVerificar].map((r) => r.url)
}
