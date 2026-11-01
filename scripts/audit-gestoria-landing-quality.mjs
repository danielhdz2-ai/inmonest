#!/usr/bin/env node
/**
 * Calidad SEO landings gestoría: duplicados obvios, enlaces legacy, sitemap.
 * Uso: node scripts/audit-gestoria-landing-quality.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, 'src')

function walk(dir, acc = [], ext = /\.tsx?$/) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc, ext)
    else if (ext.test(name)) acc.push(p)
  }
  return acc
}

const files = walk(SRC)
const legacyLinks = []
const asesoriaLandings = []
const duplicateTitles = new Map()

const titleRe = /title:\s*['`]([^'`]+)['`]/g
const metaFiles = [
  'lib/barcelona-contrato-alquiler-barrios.ts',
  'lib/barcelona-contrato-arras-barrios.ts',
  'lib/compra-completa-ciudad-data.ts',
  'lib/venta-completa-ciudad-data.ts',
  'lib/due-diligence-ciudad-data.ts',
]

for (const rel of metaFiles) {
  const text = readFileSync(join(SRC, rel), 'utf8')
  for (const m of text.matchAll(titleRe)) {
    const t = m[1].trim()
    const list = duplicateTitles.get(t) ?? []
    list.push(rel)
    duplicateTitles.set(t, list)
  }
}

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const src = readFileSync(file, 'utf8')
  if (src.includes('/gestoria/asesoria-compra-piso')) {
    const isLegacyRedirect =
      rel.includes('asesoria-compra-piso/page.tsx') ||
      rel.includes('asesoria-compra-piso/[ciudad]/page.tsx') ||
      rel.includes('seo-redirects.ts') ||
      rel.includes('asesoria-compra-ciudad-data.ts') ||
      rel.includes('gestoria-indexacion-tier.ts')
    if (!isLegacyRedirect) legacyLinks.push(rel)
  }
  if (src.includes('AsesoriaCompraCiudadLanding') && rel.includes('app/gestoria/asesoria-compra-piso')) {
    asesoriaLandings.push(rel)
  }
}

const tier = readFileSync(join(SRC, 'lib/gestoria-indexacion-tier.ts'), 'utf8')
const inventario = readFileSync(join(SRC, 'lib/gestoria-ciudades-inventario.ts'), 'utf8')
const sitemapDupAsesoria = inventario.includes("href: (c) => `/gestoria/asesoria-compra-piso/${c}`")

const dupMeta = [...duplicateTitles.entries()].filter(([, paths]) => paths.length > 1)

let failed = false
if (legacyLinks.length) {
  failed = true
  console.error('❌ Enlaces internos a /gestoria/asesoria-compra-piso (usar compra-completa):')
  legacyLinks.forEach((p) => console.error('  -', p))
}
if (asesoriaLandings.length) {
  failed = true
  console.error('❌ Páginas asesoria que siguen renderizando landing (duplicado compra):')
  asesoriaLandings.forEach((p) => console.error('  -', p))
}
if (sitemapDupAsesoria) {
  failed = true
  console.error('❌ LANDINGS_POR_CIUDAD aún incluye href asesoria-compra-piso')
}
if (!tier.includes('isAsesoriaCompraLegacyPath')) {
  failed = true
  console.error('❌ Falta isAsesoriaCompraLegacyPath en gestoria-indexacion-tier.ts')
}
if (dupMeta.length) {
  console.warn('⚠️  Titles meta repetidos (revisar diferenciación SERP):')
  dupMeta.slice(0, 15).forEach(([title, paths]) => {
    console.warn(`  "${title.slice(0, 70)}…" → ${paths.join(', ')}`)
  })
}

if (!failed) {
  console.log('✅ audit-gestoria-landing-quality: OK')
  if (dupMeta.length) process.exit(0)
  process.exit(0)
}
process.exit(1)
