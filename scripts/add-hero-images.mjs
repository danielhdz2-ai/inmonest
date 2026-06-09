import fs from 'fs'
import path from 'path'

const images = ['/keys.jpg', '/gestoria1.jpg', '/familia10.jpg', '/inmonestexterior.png', '/interior3.jpg']
let imgIdx = 0
const nextImg = () => images[imgIdx++ % images.length]

const SKIP = new Set([
  'src/app/(auth)',
  'src/app/admin',
  'src/app/debug-session',
  'src/app/mi-cuenta',
  'src/app/mis-documentos',
  'src/app/turbo',
  'src/app/pisos',
  'src/app/gestoria/reserva-compra',
  'src/app/gestoria/gestoria',
  'src/app/gestoria/confirmacion',
  'src/app/gestoria/error',
  'src/app/gestoria/gracias',
  'src/app/gestoria/carga-documentos',
])

const targets = []

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if ([...SKIP].some((s) => p.replace(/\\/g, '/').startsWith(s))) continue
      walk(p)
    } else if (ent.name === 'page.tsx') {
      targets.push(p)
    }
  }
}

walk('src/app')

function heroSnippet(src, alt) {
  return `
        <PageHeroImage
          src="${src}"
          alt="${alt.replace(/"/g, "'")}"
          className="mb-10"
        />`
}

function insertAfterHero(content, snippet) {
  const patterns = [
    /(\{\/\* Hero[^*]*\*\/\}[\s\S]*?<\/section>)/,
    /(\{\/\* Hero Section[^*]*\*\/\}[\s\S]*?<\/section>)/,
    /(<section className="[^"]*bg-gradient[^"]*"[\s\S]*?<\/section>)/,
    /(<div className="bg-gradient-to-br[^"]*"[\s\S]*?<\/div>\s*\n\s*<\/div>)/,
    /(<\/header>)/,
    /(<main[^>]*>)/,
    /(<article[^>]*>)/,
  ]

  for (const re of patterns) {
    const m = content.match(re)
    if (m) {
      const idx = content.indexOf(m[0]) + m[0].length
      return content.slice(0, idx) + snippet + content.slice(idx)
    }
  }
  return null
}

let updated = 0
for (const file of targets) {
  let c = fs.readFileSync(file, 'utf8')
  if (c.includes('PageHeroImage')) continue
  if (c.includes('<Image')) continue
  if (c.includes('backgroundImage')) continue
  if (c.includes('ContratoArrasCiudadPremium') || c.includes('ContratoAlquilerCiudadPremium')) continue
  if (c.includes('AgenciasContent') || c.includes('GestoriaContent') || c.includes('AnalizadorClient')) continue

  const altMatch = c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  const alt = (
    altMatch
      ? altMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : path.basename(path.dirname(file))
  ).slice(0, 120)
  const src = nextImg()

  if (c.includes("import Navbar")) {
    c = c.replace(/(import Navbar[^\n]+\n)/, "$1import PageHeroImage from '@/components/PageHeroImage'\n")
  } else if (c.includes("import Link")) {
    c = c.replace(/(import Link[^\n]+\n)/, "$1import PageHeroImage from '@/components/PageHeroImage'\n")
  } else if (c.includes("import type { Metadata }")) {
    c = c.replace(/(import type \{ Metadata \}[^\n]+\n)/, "$1import PageHeroImage from '@/components/PageHeroImage'\n")
  } else {
    c = `import PageHeroImage from '@/components/PageHeroImage'\n` + c
  }

  const snippet = heroSnippet(src, alt)
  const next = insertAfterHero(c, snippet)
  if (!next) {
    console.log('SKIP (no anchor)', file)
    continue
  }

  fs.writeFileSync(file, next)
  updated++
  console.log('OK', file)
}

console.log('Updated', updated, 'files')
