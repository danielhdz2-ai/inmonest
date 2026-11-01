import { permanentRedirect } from 'next/navigation'
import { COMPRA_COMPLETA_CIUDADES } from '@/lib/compra-completa-ciudad-data'

/** Slugs históricos — solo redirección 301 lógica a compra completa (canonical). */
const LEGACY_CIUDAD_SLUGS = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'zaragoza',
  'valladolid',
  'mallorca',
  'bilbao',
  'coruna',
  'murcia',
  'pamplona',
  'alicante',
  'salamanca',
  'granada',
  'asturias',
  'santander',
  'vitoria',
  'san-sebastian',
] as const

export function generateStaticParams() {
  return LEGACY_CIUDAD_SLUGS.map((ciudad) => ({ ciudad }))
}

export default async function AsesoriaCompraCiudadLegacyRedirect({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  if (ciudad in COMPRA_COMPLETA_CIUDADES) {
    permanentRedirect(`/gestoria/compra-completa-reserva-escritura/${ciudad}`)
  }
  permanentRedirect('/gestoria/compra-completa-reserva-escritura')
}
