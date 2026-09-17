import fs from 'fs'
import path from 'path'

const root = path.join(import.meta.dirname, '..')

function writePage(subdir, slug, name, imports, configAccess, component, fnName) {
  const dir = path.join(root, 'src/app/gestoria', subdir, slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'page.tsx'),
    `${imports}

const config = ${configAccess}.${slug}

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function ${fnName}() {
  return <${component} config={config} />
}
`,
    'utf8',
  )
}

for (const slug of ['alicante', 'salamanca']) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'pack-arras-revision-documental',
    slug,
    name,
    `import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import { PACK_ARRAS_DOCUMENTAL_CIUDADES, buildPackArrasDocumentalMetadata as buildMetadata } from '@/lib/pack-arras-documental-ciudad-data'`,
    'PACK_ARRAS_DOCUMENTAL_CIUDADES',
    'PackArrasDocumentalCiudadLanding',
    `PackArrasDocumental${name}Page`,
  )
}

for (const slug of ['alicante', 'murcia', 'granada', 'coruna', 'pamplona', 'salamanca']) {
  const name = slug === 'coruna' ? 'Coruna' : slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'prestamo-particulares',
    slug,
    name,
    `import PrestamoParticularesCiudadLanding from '@/components/PrestamoParticularesCiudadLanding'
import { PRESTAMO_PARTICULARES_CIUDADES, buildPrestamoParticularesMetadata as buildMetadata } from '@/lib/prestamo-particulares-ciudad-data'`,
    'PRESTAMO_PARTICULARES_CIUDADES',
    'PrestamoParticularesCiudadLanding',
    `PrestamoParticulares${name}Page`,
  )
}

for (const slug of ['murcia', 'granada', 'coruna', 'pamplona', 'mallorca', 'salamanca']) {
  const name = slug === 'coruna' ? 'Coruna' : slug.charAt(0).toUpperCase() + slug.slice(1)
  writePage(
    'alquiler-local-comercial',
    slug,
    name,
    `import AlquilerLocalComercialCiudadLanding from '@/components/AlquilerLocalComercialCiudadLanding'
import { ALQUILER_LOCAL_COMERCIAL_CIUDADES, buildAlquilerLocalComercialMetadata as buildMetadata } from '@/lib/alquiler-local-comercial-ciudad-data'`,
    'ALQUILER_LOCAL_COMERCIAL_CIUDADES',
    'AlquilerLocalComercialCiudadLanding',
    `AlquilerLocalComercial${name}Page`,
  )
}

console.log('pages ok')
