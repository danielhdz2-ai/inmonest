import type { PackArrasDocumentalCiudadConfig } from '@/lib/pack-arras-documental-ciudad-data'
import { PACK_ARRAS_DOCUMENTAL_CIUDADES } from '@/lib/pack-arras-documental-ciudad-data'
import type { BarcelonaPackArrasDocumentalBarrioConfig } from '@/lib/barcelona-pack-arras-documental-barrios-types'
import {
  BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS_LOTE1,
  BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIOS_LOTE1,
} from '@/lib/barcelona-pack-arras-documental-barrios-lote1'

export type { BarcelonaPackArrasDocumentalBarrioConfig } from '@/lib/barcelona-pack-arras-documental-barrios-types'

export const BARCELONA_PACK_ARRAS_COMPRADOR_BASE = '/barcelona/pack-arras-comprador'

export const BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS = [
  ...BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS_LOTE1,
] as const

export type BarcelonaPackArrasDocumentalBarrioSlug =
  (typeof BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS)[number]

const BARRIOS: Record<string, BarcelonaPackArrasDocumentalBarrioConfig> = {
  ...BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIOS_LOTE1,
}

export function getBarcelonaPackArrasDocumentalBarrio(
  slug: string,
): BarcelonaPackArrasDocumentalBarrioConfig | undefined {
  return BARRIOS[slug as BarcelonaPackArrasDocumentalBarrioSlug]
}

export function listBarcelonaPackArrasDocumentalBarrios(): BarcelonaPackArrasDocumentalBarrioConfig[] {
  return BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS.map((s) => BARRIOS[s])
}

export function getBarcelonaPackArrasDocumentalBarrioPaths(): string[] {
  return BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS.map(
    (s) => `${BARCELONA_PACK_ARRAS_COMPRADOR_BASE}/${s}`,
  )
}

/** Vista ciudad Pack Arras Plus con overrides del barrio (módulos Inmonest compartidos). */
export function buildPackArrasDocumentalBarrioViewConfig(
  barrio: BarcelonaPackArrasDocumentalBarrioConfig,
): PackArrasDocumentalCiudadConfig {
  const city = PACK_ARRAS_DOCUMENTAL_CIUDADES.barcelona
  return {
    ...city,
    slug: 'barcelona',
    nombre: `${barrio.nombre}, Barcelona`,
    testimoniosLanding: barrio.testimoniosLanding,
    precioEjemploPiso: barrio.precioEjemploPiso,
    meta: barrio.meta,
    hero: barrio.hero,
    mercadoLocal: {
      titulo: barrio.mercado.titulo,
      parrafos: [
        barrio.mercado.intro,
        `Precio orientativo en la zona: ${barrio.mercado.precioOrientativo}. ${barrio.mercado.perfilComprador}`,
        barrio.mercado.riesgoDocumental,
      ],
      datos: [
        { label: 'Distrito', valor: barrio.distrito },
        { label: 'Precio €/m² (orientativo)', valor: barrio.mercado.precioOrientativo },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
        { label: 'Operación ejemplo', valor: `${barrio.precioEjemploPiso.toLocaleString('es-ES')} €` },
      ],
    },
    guiaComprador: barrio.guiaBarrio,
    riesgosLocales: barrio.riesgosBarrio,
    casosReales: barrio.casosBarrio,
    barriosPrecio: barrio.barriosPrecio,
    faqPrioritarias: barrio.faqs,
  }
}
