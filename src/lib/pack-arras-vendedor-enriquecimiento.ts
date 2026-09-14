import {
  getVentaCompletaEnriquecimiento,
  type VentaCompletaEnriquecimiento,
} from './venta-completa-ciudad-enriquecimiento'

/** Reutiliza bloques locales de venta completa con copy orientado al pack vendedor (450 €). */
export function getPackArrasVendedorEnriquecimiento(slug: string): VentaCompletaEnriquecimiento | undefined {
  const base = getVentaCompletaEnriquecimiento(slug)
  if (!base) return undefined

  return {
    ...base,
    gestoriaIntro: base.gestoriaIntro.replace(/687\s*€/g, '450 € en el Pack Arras Plus Vendedor').replace(
      /687 €/g,
      '450 €',
    ),
    pasos: base.pasos.map((p) => ({
      ...p,
      desc: p.desc.replace(/687\s*€/g, '450 €').replace(/687 €/g, '450 €'),
    })),
  }
}
