#!/usr/bin/env node
/**
 * Comprueba regresiones SEO habituales: footer duplicado, checkout indexable en sitemap.
 * Uso: node scripts/audit-seo-regression.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const APP = join(ROOT, 'src', 'app')

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc)
    else if (/page\.tsx$/.test(name)) acc.push(p)
  }
  return acc
}

const pages = walk(APP)
const footerDupes = []
const solicitarIndex = []

for (const file of pages) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const src = readFileSync(file, 'utf8')
  const footerImports =
    (src.match(/from ['"]@\/components\/Footer['"]/g) || []).length +
    (src.match(/from ['"]@\/components\/SellosConfianza['"]/g) || []).length
  if (footerImports > 0) footerDupes.push(rel)

  if (rel.includes('gestoria/solicitar') && /index:\s*true/.test(src)) {
    solicitarIndex.push(rel)
  }
}

const sitemap = readFileSync(join(APP, 'sitemap.ts'), 'utf8')
const sitemapSolicitar = /gestoria\/solicitar/.test(sitemap)

let failed = false
if (footerDupes.length) {
  failed = true
  console.error('❌ Páginas con Footer/Sellos locales (riesgo doble pie):')
  footerDupes.forEach((p) => console.error('  -', p))
}
if (sitemapSolicitar) {
  failed = true
  console.error('❌ sitemap.ts aún referencia /gestoria/solicitar')
}
if (solicitarIndex.length) {
  failed = true
  console.error('❌ Checkout con index:true en metadata:')
  solicitarIndex.forEach((p) => console.error('  -', p))
}

if (!failed) {
  console.log('✅ audit-seo-regression: OK')
  process.exit(0)
}
process.exit(1)
