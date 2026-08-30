import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')

const cat = fs.readFileSync(path.join(root, 'src/lib/gestoria-catalogo.ts'), 'utf8')
const checkout = fs.readFileSync(path.join(root, 'src/app/api/gestoria/checkout/route.ts'), 'utf8')
const servicioPage = fs.readFileSync(path.join(root, 'src/app/gestoria/[servicio]/page.tsx'), 'utf8')
const adic = fs.readFileSync(path.join(root, 'src/lib/gestoria-servicios-adicionales.ts'), 'utf8')
const landings = fs.readFileSync(path.join(root, 'src/lib/gestoria-servicios-landings.ts'), 'utf8')

const catalogSlugs = [...cat.matchAll(/^  '([^']+)': \{/gm)].map((m) => m[1])
const publicCatalog = catalogSlugs.filter((s) => {
  const i = cat.indexOf(`'${s}':`)
  return !cat.slice(i, i + 500).includes('interno: true')
})

const stripeSlugs = [...checkout.matchAll(/  '([^']+)':\s*\{/g)].map((m) => m[1])
const servicioKeys = [
  ...servicioPage.matchAll(/^  '([^']+)': \{/gm),
  ...adic.matchAll(/^  '([^']+)': \{/gm),
].map((m) => m[1])
const allServicio = new Set(servicioKeys)

const landingHrefs = [...landings.matchAll(/landingHref: '([^']+)'/g)].map((m) => m[1])

console.log('=== ALINEACIÓN SLUGS GESTORÍA ===\n')
console.log('Catálogo público:', publicCatalog.length)
console.log('Stripe checkout:', stripeSlugs.length)
console.log('Landings [servicio]:', allServicio.size)

const missingLanding = publicCatalog.filter(
  (s) => !allServicio.has(s) && s !== 'contrato-alquiler-barcelona',
)
const missingStripe = publicCatalog.filter(
  (s) => !stripeSlugs.includes(s) && s !== 'contrato-alquiler-barcelona',
)

console.log('\n❌ En catálogo SIN landing [servicio]:', missingLanding.length ? missingLanding : 'ninguno')
console.log('❌ En catálogo SIN Stripe:', missingStripe.length ? missingStripe : 'ninguno')

const aliasRedirects = [
  '/gestoria/asesoria-compra-piso',
  '/gestoria/due-diligence-precompra',
  '/gestoria/contrato-alquiler-habitacion',
  '/gestoria/compra-parking-trastero',
  '/gestoria/revision-contrato-alquiler',
  '/gestoria/revision-contrato-arras',
]

console.log('\n=== landingHref en cards /servicios ===')
for (const href of [...new Set(landingHrefs)]) {
  const slug = href.replace('/gestoria/', '')
  const hasDynamic = allServicio.has(slug)
  const hasStatic = fs.existsSync(path.join(root, `src/app/gestoria/${slug}/page.tsx`))
  const isAlias = aliasRedirects.includes(href)
  const ok = hasDynamic || hasStatic || isAlias
  if (!ok) console.log('  ⚠️', href, '— sin página ni redirect conocido')
}

console.log('\n=== Alias con redirect (OK si no están en sitemap) ===')
aliasRedirects.forEach((u) => console.log(' ', u))
