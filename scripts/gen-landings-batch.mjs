import fs from 'fs'
import path from 'path'

const root = path.join(import.meta.dirname, '..')

function writePage(subdir, slug, name, importLine, configAccess, component, fnName) {
  const dir = path.join(root, 'src/app/gestoria', subdir, slug)
  fs.mkdirSync(dir, { recursive: true })
  const content = `${importLine}

const config = ${configAccess}.${slug}

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function ${fnName}() {
  return <${component} config={config} />
}
`
  fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf8')
}

const packSlugs = [
  'madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'salamanca', 'valladolid',
  'alicante', 'bilbao', 'zaragoza', 'coruna', 'pamplona', 'murcia', 'granada', 'mallorca',
]

for (const slug of packSlugs) {
  const name = slug === 'coruna' ? 'Coruna' : slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'pack-arras-plus-vendedor',
    slug,
    name,
    `import PackArrasVendedorCiudadLanding from '@/components/PackArrasVendedorCiudadLanding'
import { PACK_ARRAS_VENDEDOR_CIUDADES, buildPackArrasVendedorMetadata as buildMetadata } from '@/lib/pack-arras-vendedor-ciudad-data'`,
    'PACK_ARRAS_VENDEDOR_CIUDADES',
    'PackArrasVendedorCiudadLanding',
    `PackArrasVendedor${name}Page`,
  )
}

for (const slug of ['murcia', 'granada', 'mallorca']) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'venta-completa-reserva-escritura',
    slug,
    name,
    `import VentaCompletaCiudadLanding from '@/components/VentaCompletaCiudadLanding'
import { VENTA_COMPLETA_CIUDADES, buildVentaCompletaMetadata as buildMetadata } from '@/lib/venta-completa-ciudad-data'`,
    'VENTA_COMPLETA_CIUDADES',
    'VentaCompletaCiudadLanding',
    `VentaCompleta${name}Page`,
  )
}

for (const slug of ['alicante', 'murcia', 'pamplona', 'salamanca', 'valladolid']) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'due-diligence-precompra',
    slug,
    name,
    `import DueDiligenceCiudadLanding from '@/components/DueDiligenceCiudadLanding'
import { DUE_DILIGENCE_CIUDADES, buildDueDiligenceMetadata as buildMetadata } from '@/lib/due-diligence-ciudad-data'`,
    'DUE_DILIGENCE_CIUDADES',
    'DueDiligenceCiudadLanding',
    `DueDiligence${name}Page`,
  )
}

for (const slug of ['salamanca', 'granada']) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'asesoria-compra-piso',
    slug,
    name,
    `import AsesoriaCompraCiudadLanding from '@/components/AsesoriaCompraCiudadLanding'
import { ASESORIA_COMPRA_CIUDADES, buildAsesoriaCompraMetadata as buildMetadata } from '@/lib/asesoria-compra-ciudad-data'`,
    'ASESORIA_COMPRA_CIUDADES',
    'AsesoriaCompraCiudadLanding',
    `AsesoriaCompra${name}Page`,
  )
}

console.log('Done')
