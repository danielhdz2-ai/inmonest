import type { LandingsCiudadPremiumSlug } from '@/lib/landings-ciudad-premium'
import type { PortalCiudadDatos } from '@/lib/portal-ciudad-generic'

export type PortalCiudadEnriquecimiento = PortalCiudadDatos & {
  /** Título SEO `<title>` diferenciado para /{slug}/alquiler-particulares */
  metaTitle: string
  metaDescription?: string
}

/** Ciudades premium sin bloque DATOS estático en alquiler-particulares/page.tsx */
export const PORTAL_CIUDAD_ENRIQUECIMIENTO: Partial<
  Record<LandingsCiudadPremiumSlug, PortalCiudadEnriquecimiento>
> = {
  castellon: {
    metaTitle: 'Alquiler particulares Castellón — Grao y Plana sin comisión',
    metaDescription:
      'Pisos de alquiler de particulares en Castelló de la Plana, Grao y Benicàssim. Trato directo, sin agencia. Contrato LAU desde 145€.',
    precio_medio: '550 – 850 €/mes',
    barrios: ['Centro', 'Grao', 'Fadrell', 'Benicàssim', 'Vila-real', 'Burriana'],
    descripcion_seo:
      'Castellón mueve alquiler entre universidad Jaume I, industria ceramicista y litoral. Alquilar de particular en Grao o capital ahorra la comisión de agencia y permite negociar LAU con gestoría online Inmonest.',
    faq: [
      {
        q: '¿Cuánto cuesta alquilar de particular en Castellón?',
        a: 'En capital y Grao el alquiler habitual ronda 550–850 €/mes según barrio. Benicàssim y costa pueden subir en temporada alta.',
      },
      {
        q: '¿Necesito contrato LAU en Castellón?',
        a: 'Sí para vivienda habitual. Depósito ante Generalitat (AVANT). Redactamos LAU desde 145€ en 48 h.',
      },
      {
        q: '¿Alquiler temporada en Benicàssim?',
        a: 'Es distinto del LAU largo; tenemos contrato de temporada por ciudad.',
      },
    ],
  },
  murcia: {
    metaTitle: 'Alquiler particulares Murcia — capital y Cartagena sin comisión',
    precio_medio: '450 – 700 €/mes',
    barrios: ['Centro', 'Vista Alegre', 'El Palmar', 'Cartagena', 'Molí de la Vall'],
    descripcion_seo:
      'Murcia ofrece uno de los alquileres más accesibles del sureste. Particulares en capital y Cartagena evitan comisión de agencia con Inmonest y pueden formalizar LAU online.',
    faq: [
      {
        q: '¿Alquiler barato de particular en Murcia?',
        a: 'Zonas como El Palmar o pedanías suelen estar por debajo de 600 €/mes para pisos de 2 habitaciones.',
      },
      {
        q: '¿Contrato LAU en Murcia?',
        a: 'Obligatorio en vivienda habitual; gestoría desde 145€.',
      },
      {
        q: '¿Compro piso y alquilo después?',
        a: 'También redactamos arras y due diligence en Murcia.',
      },
    ],
  },
  granada: {
    metaTitle: 'Alquiler particulares Granada — Realejo y campus sin comisión',
    precio_medio: '550 – 900 €/mes',
    barrios: ['Realejo', 'Centro', 'Zaidín', 'PTS', 'Albaicín', 'Armilla'],
    descripcion_seo:
      'Granada mezcla demanda universitaria y turismo residencial. Alquiler de particulares en Realejo o Zaidín sin agencia ahorra una mensualidad; conviene LAU bien redactado en casco histórico.',
    faq: [
      {
        q: '¿Alquiler para estudiantes UGR?',
        a: 'Muchos particulares alquilan curso completo; también contrato habitación desde 120€.',
      },
      {
        q: '¿Albaicín y normativa?',
        a: 'Casco histórico tiene particularidades; LAU profesional evita conflictos con comunidad y uso.',
      },
      {
        q: '¿Sin comisión de agencia?',
        a: 'Inmonest conecta con particulares verificados; ahorras honorarios de intermediación.',
      },
    ],
  },
  mallorca: {
    metaTitle: 'Alquiler particulares Mallorca — Palma y Calvià sin comisión',
    precio_medio: '900 – 1.500 €/mes',
    barrios: ['Palma Centro', 'Calvià', 'Manacor', 'Inca', 'Portixol'],
    descripcion_seo:
      'Mallorca tiene rentas insulares elevadas. Alquilar de particular en Palma o Calvià sin agencia ahorra miles de euros; el LAU debe respetar IBAVI e índice de referencia en zona tensionada.',
    faq: [
      {
        q: '¿IBAVI y fianza en Mallorca?',
        a: 'En LAU de larga duración la fianza legal se deposita en IBAVI en 30 días.',
      },
      {
        q: '¿Alquiler turístico vs LAU?',
        a: 'Son regímenes distintos; no uses LAU para ETV turístico.',
      },
      {
        q: '¿Contrato arras si compro?',
        a: 'Sí, /mallorca/contrato-arras desde 145€.',
      },
    ],
  },
  pamplona: {
    metaTitle: 'Alquiler particulares Pamplona — UPNA y Ensanche sin comisión',
    precio_medio: '650 – 950 €/mes',
    barrios: ['Ensanche', 'Centro', 'Rochapea', 'Buztintxuri', 'San Juan'],
    descripcion_seo:
      'Pamplona combina mercado universitario y estable. Alquiler directo de propietario en Ensanche o cerca del campus evita comisión de agencia navarra.',
    faq: [
      {
        q: '¿Precio alquiler Pamplona particular?',
        a: 'Centro y Ensanche suelen 700–950 €/mes; periferia algo menor.',
      },
      {
        q: '¿LAU en Navarra?',
        a: 'Sí, marco estatal LAU; contrato desde 145€ online.',
      },
      {
        q: '¿San Fermín y contratos?',
        a: 'Estancia temporal usa contrato distinto; consulta alquiler temporada.',
      },
    ],
  },
  salamanca: {
    metaTitle: 'Alquiler particulares Salamanca — USAL y casco sin comisión',
    precio_medio: '450 – 700 €/mes',
    barrios: ['Casco histórico', 'San José', 'Garrido', 'Vista Hermosa', 'Tejares'],
    descripcion_seo:
      'Salamanca es mercado universitario por excelencia. Alquilar de particular en casco o San José ahorra comisión; cada curso conviene LAU o contrato temporada según duración.',
    faq: [
      {
        q: '¿Alquiler por curso académico?',
        a: 'Contrato temporada 9 meses; distinto de LAU largo.',
      },
      {
        q: '¿Erasmus y particulares?',
        a: 'Inmonest filtra anuncios de propietarios reales.',
      },
      {
        q: '¿Contrato habitación?',
        a: 'Desde 120€ en /gestoria/contrato-alquiler-habitacion/salamanca.',
      },
    ],
  },
  valladolid: {
    metaTitle: 'Alquiler particulares Valladolid — UVA y Delicias sin comisión',
    precio_medio: '450 – 650 €/mes',
    barrios: ['Delicias', 'Centro', 'Rondilla', 'Parquesol', 'La Victoria'],
    descripcion_seo:
      'Valladolid ofrece alquiler accesible en Castilla y León. Particulares en Delicias o centro permiten trato directo; LAU online protege fianza y duración.',
    faq: [
      {
        q: '¿Alquiler barato Valladolid?',
        a: 'Parquesol y periferia desde ~450 €/mes en particulares.',
      },
      {
        q: '¿Mudanza desde Madrid?',
        a: 'Muchos inquilinos llegan por UVA o hospital; contrato LAU recomendado.',
      },
      {
        q: '¿Sin agencia?',
        a: 'Ahorra una mensualidad de comisión con trato directo.',
      },
    ],
  },
  coruna: {
    metaTitle: 'Alquiler particulares A Coruña — Orzán y UDC sin comisión',
    precio_medio: '550 – 800 €/mes',
    barrios: ['Orzán', 'Ensanche', 'Elviña', 'Matogrande', 'Ferrol'],
    descripcion_seo:
      'A Coruña combina mercado portuario y universitario. Alquiler de particulares en Orzán o Ensanche sin comisión; LAU adaptado a normativa gallega.',
    faq: [
      {
        q: '¿Precio alquiler Coruña?',
        a: 'Orzán y centro 600–850 €/mes; Ferrol algo menor.',
      },
      {
        q: '¿Certificado energético?',
        a: 'Obligatorio; en compraventa también cuidamos documentación.',
      },
      {
        q: '¿LAU online?',
        a: 'Desde 145€ con gestor gallego online.',
      },
    ],
  },
  asturias: {
    metaTitle: 'Alquiler particulares Asturias — Oviedo, Gijón y Avilés sin comisión',
    precio_medio: '450 – 700 €/mes',
    barrios: ['Oviedo Centro', 'Gijón Centro', 'Avilés', 'Langreo', 'Pola de Siero'],
    descripcion_seo:
      'Asturias mantiene alquileres moderados en Oviedo, Gijón y Avilés. Particulares sin agencia y LAU con depósito autonómico; ideal para familias e industria.',
    faq: [
      {
        q: '¿Oviedo o Gijón más barato?',
        a: 'Similar; Avilés y Langreo suelen ser más económicos.',
      },
      {
        q: '¿ITE en edificios antiguos?',
        a: 'Relevante en compraventa; en alquiler LAU conviene estado claro.',
      },
      {
        q: '¿Contrato arras Asturias?',
        a: '145€ en /asturias/contrato-arras.',
      },
    ],
  },
  santander: {
    metaTitle: 'Alquiler particulares Santander — UC y Sardinero sin comisión',
    precio_medio: '650 – 950 €/mes',
    barrios: ['Centro', 'Sardinero', 'Cueto', 'Peñacastillo', 'El Alisal'],
    descripcion_seo:
      'Santander une universidad, banca y costa. Alquiler directo en Sardinero o centro evita comisión; mercado con estacionalidad pero base residencial estable.',
    faq: [
      {
        q: '¿Alquiler Sardinero particular?',
        a: 'Segundas residencias y familias; precios superiores a media ciudad.',
      },
      {
        q: '¿Estudiantes UC?',
        a: 'Demanda curso completo; LAU o temporada según meses.',
      },
      {
        q: '¿Gestoría Cantabria?',
        a: '100 % online con gestor asignado.',
      },
    ],
  },
  vitoria: {
    metaTitle: 'Alquiler particulares Vitoria — Ensanche y Lakua sin comisión',
    precio_medio: '650 – 900 €/mes',
    barrios: ['Ensanche', 'Lakua', 'Zaramaga', 'Judimendi', 'Arkaute'],
    descripcion_seo:
      'Vitoria-Gasteiz ofrece calidad de vida y mercado ordenado. Alquiler entre particulares en Ensanche o Lakua sin comisión de agencia; LAU con claridad foral.',
    faq: [
      {
        q: '¿Precio alquiler Vitoria?',
        a: 'Ensanche y Lakua 700–900 €/mes en pisos 2–3 dormitorios.',
      },
      {
        q: '¿Traslados desde Bilbao?',
        a: 'Frecuente; contrato LAU protege ambas partes.',
      },
      {
        q: '¿Arras si compro?',
        a: 'Revisión 120€ o redacción 145€ en Vitoria.',
      },
    ],
  },
  'san-sebastian': {
    metaTitle: 'Alquiler particulares San Sebastián — Gros sin comisión',
    metaDescription:
      'Pisos alquiler Donostia de particulares. Gros, Centro, rentas altas. Trato directo. LAU desde 145€.',
    precio_medio: '900 – 1.400 €/mes',
    barrios: ['Gros', 'Centro', 'Amara', 'Antiguo', 'Igueldo'],
    descripcion_seo:
      'San Sebastián tiene rentas entre las más altas del norte. Alquilar de particular en Gros o Centro ahorra comisión considerable; LAU debe ser impecable en mercado tensionado.',
    faq: [
      {
        q: '¿Por qué es caro alquilar en Donostia?',
        a: 'Escasez de oferta y demanda turística-residencial empujan precios.',
      },
      {
        q: '¿Fianza y LAU en Gipuzkoa?',
        a: 'Régimen LAU estatal con práctica foral en garantías; contrato profesional recomendado.',
      },
      {
        q: '¿Revisión arras al comprar?',
        a: '120€ en /gestoria/revision-correccion-arras/san-sebastian.',
      },
    ],
  },
}

export function getPortalCiudadEnriquecimiento(
  slug: string,
): PortalCiudadEnriquecimiento | undefined {
  return PORTAL_CIUDAD_ENRIQUECIMIENTO[slug as LandingsCiudadPremiumSlug]
}
