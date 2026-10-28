export type NormativaBannerSlide = {
  id: string
  badge: string
  title: string
  lines: string[]
  href: string
  linkLabel: string
}

/** Carrusel informativo (estilo aviso legal / actualidad vivienda 2026) */
export const INMONEST_NORMATIVA_BANNER_SLIDES: NormativaBannerSlide[] = [
  {
    id: 'normativa-general',
    badge: 'Normativa 2026',
    title: 'Contratos al día con la Ley de Vivienda',
    lines: [
      'En Inmonest redactamos y revisamos LAU, arras y compraventa conforme a la normativa estatal y autonómica vigente.',
      'Incluidos los decretos de vivienda y alquiler publicados en 2026.',
    ],
    href: '/blog/contrato-alquiler-vivienda-guia',
    linkLabel: 'Guía contrato alquiler 2026',
  },
  {
    id: 'decretos-sep-2026',
    badge: 'Actualidad · Sep 2026',
    title: 'Decretos de vivienda: prórrogas LAU y contratos',
    lines: [
      'Consejo de Ministros (29 sep 2026): medidas sobre prórroga, desahucios, temporada y habitaciones.',
      'Antes de firmar un anexo, contrasta el texto con tu gestor.',
    ],
    href: '/blog/decretos-vivienda-alquiler-septiembre-2026',
    linkLabel: 'Resumen decretos 2026',
  },
  {
    id: 'compraventa-barcelona',
    badge: 'Barcelona · 687 €',
    title: 'Compra y venta completa hasta escritura',
    lines: [
      'Pack reserva → arras → notaría con gestor asignado. Despacho en Les Corts (Mejía Lequerica 44).',
      'Landings por barrios: Eixample, Gràcia, Sants, Poblenou, Sarrià…',
    ],
    href: '/gestoria/barcelona',
    linkLabel: 'Gestoría Barcelona',
  },
]
