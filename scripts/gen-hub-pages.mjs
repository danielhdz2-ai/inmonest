import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const ciudades = ['granada', 'mallorca', 'murcia', 'salamanca', 'valladolid', 'coruna', 'pamplona']

const template = (slug, exportName) => `import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS.${slug}

export const metadata = buildCiudadHubMetadata(config)

export default function ${exportName}() {
  return <CiudadHubLandingPage config={config} />
}
`

const names = {
  granada: 'GestoriaGranadaPage',
  mallorca: 'GestoriaMallorcaPage',
  murcia: 'GestoriaMurciaPage',
  salamanca: 'GestoriaSalamancaPage',
  valladolid: 'GestoriaValladolidPage',
  coruna: 'GestoriaCorunaPage',
  pamplona: 'GestoriaPamplonaPage',
}

for (const slug of ciudades) {
  const dir = path.join(root, 'src', 'app', 'gestoria', slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'page.tsx'), template(slug, names[slug]))
  console.log('wrote', slug)
}
