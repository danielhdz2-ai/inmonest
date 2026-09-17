import fs from 'fs'
import path from 'path'

const dataPath = 'src/lib/pack-arras-documental-ciudad-data.ts'
let data = fs.readFileSync(dataPath, 'utf8')

const idx = data.indexOf('\n  pamplona: {')
if (idx === -1) throw new Error('pamplona block not found')
const murStart = data.indexOf('  murcia: {')
const murBlock = data.slice(murStart, idx)

function cloneMurcia(slug, name, region, precio) {
  return murBlock
    .replaceAll('murcia', slug)
    .replaceAll('Murcia', name)
    .replaceAll('Región de Murcia', region)
    .replaceAll('pack-arras-documental-murcia', `pack-arras-documental-${slug}`)
    .replaceAll('175_000', String(precio))
    .replaceAll('175.000', precio.toLocaleString('es-ES'))
}

const inserts = [
  cloneMurcia('granada', 'Granada', 'Andalucía', 195_000),
  cloneMurcia('mallorca', 'Mallorca', 'Islas Baleares', 285_000),
]

if (!data.includes('  granada: {')) {
  data = `${data.slice(0, idx)},\n\n${inserts.join('\n\n')}\n\n${data.slice(idx)}`
}

if (!data.includes("{ slug: 'granada', nombre: 'Granada' }")) {
  data = data.replace(
    "{ slug: 'salamanca', nombre: 'Salamanca' },",
    `{ slug: 'salamanca', nombre: 'Salamanca' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'mallorca', nombre: 'Mallorca' },`,
  )
}

fs.writeFileSync(dataPath, data)

for (const slug of ['granada', 'mallorca']) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  const dir = path.join('src/app/gestoria/pack-arras-revision-documental', slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'page.tsx'),
    `import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import { PACK_ARRAS_DOCUMENTAL_CIUDADES, buildPackArrasDocumentalMetadata as buildMetadata } from '@/lib/pack-arras-documental-ciudad-data'

const config = PACK_ARRAS_DOCUMENTAL_CIUDADES.${slug}

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function PackArrasDocumental${name}Page() {
  return <PackArrasDocumentalCiudadLanding config={config} />
}
`,
  )
}

console.log('granada + mallorca pack doc added')
