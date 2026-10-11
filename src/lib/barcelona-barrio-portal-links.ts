import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'

function normalizeBarrioLabel(label: string): string {
  return label
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Enlaza barrios mostrados en landings portal → LAU por barrio en Barcelona. */
export function getContratoAlquilerBarrioHref(ciudad: string, barrioDisplayName: string): string {
  if (ciudad !== 'barcelona') {
    return `/${ciudad}/contrato-alquiler`
  }
  const target = normalizeBarrioLabel(barrioDisplayName)
  const barrios = listBarcelonaAlquilerBarrios()
  const exact = barrios.find((b) => normalizeBarrioLabel(b.nombre) === target)
  if (exact) return `/barcelona/contrato-alquiler/${exact.slug}`
  const partial = barrios.find(
    (b) =>
      normalizeBarrioLabel(b.nombre).includes(target) ||
      target.includes(normalizeBarrioLabel(b.nombre)),
  )
  if (partial) return `/barcelona/contrato-alquiler/${partial.slug}`
  return '/barcelona/contrato-alquiler'
}
