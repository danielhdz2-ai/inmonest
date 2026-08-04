#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'src')

const IMAGE_REPLACEMENTS = [
  ["'/imagencabezera.jpg'", "'/promo.png'"],
  ['"/imagencabezera.jpg"', '"/promo.png"'],
  ["'/sofainmonest.png'", "'/promo1.png'"],
  ['"/sofainmonest.png"', '"/promo1.png"'],
  ["'/publicar-hero.jpg'", "'/promo.png'"],
  ['"/publicar-hero.jpg"', '"/promo.png"'],
  ["'/familia1.jpg'", "'/promo3.png'"],
  ['"/familia1.jpg"', '"/promo3.png"'],
  ["'/familia3.jpg'", "'/promo3.png'"],
  ['"/familia3.jpg"', '"/promo3.png"'],
  ["'/familia20.jpg'", "'/promo3.png'"],
  ['"/familia20.jpg"', '"/promo3.png"'],
  ["'/familia2.jpg'", "'/promo1.png'"],
  ['"/familia2.jpg"', '"/promo1.png"'],
  ["'/familia10.jpg'", "'/promo3.png'"],
  ['"/familia10.jpg"', '"/promo3.png"'],
  ["'/keys.jpg'", "'/promo1.png'"],
  ['"/keys.jpg"', '"/promo1.png"'],
  ["url('/gestoria1.jpg')", "url('/promo1.png')"],
  ['url("/gestoria1.jpg")', 'url("/promo1.png")'],
  ["`${BASE_URL}/familia1.jpg`", "`${BASE_URL}/promo3.png`"],
  ["`${BASE_URL}/familia10.jpg`", "`${BASE_URL}/promo3.png`"],
  ["`${BASE_URL}/sofainmonest.png`", "`${BASE_URL}/promo1.png`"],
]

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, files)
    else if (/\.(tsx|ts)$/.test(ent.name)) files.push(p)
  }
  return files
}

let changed = 0
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, 'utf8')
  const orig = content
  for (const [from, to] of IMAGE_REPLACEMENTS) content = content.split(from).join(to)
  if (content !== orig) {
    fs.writeFileSync(file, content)
    changed++
  }
}
console.log(`Updated ${changed} files with brand images`)
