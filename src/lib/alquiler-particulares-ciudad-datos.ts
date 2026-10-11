import { getPortalCiudadDatos } from '@/lib/portal-ciudad-generic'

export type AlquilerParticularesCiudadDatos = {
  precio_medio: string
  barrios: string[]
  descripcion_seo: string
  faq: Array<{ q: string; a: string }>
}

/** Datos SEO por ciudad (premium + genérico vía getPortalCiudadDatos). */
export const ALQUILER_PARTICULARES_CIUDAD_DATOS: Record<string, AlquilerParticularesCiudadDatos> = {
  madrid: {
    precio_medio: '1.300 – 1.800 €/mes',
    barrios: ['Lavapiés', 'Chamberí', 'Vallecas', 'Carabanchel', 'Tetuan', 'Ciudad Lineal'],
    descripcion_seo:
      'Si alquilas o alquilas en Madrid como particular, el contrato LAU es obligatorio para proteger fianza, duración y subidas de renta. Inmonest redacta tu arrendamiento adaptado a la Comunidad de Madrid y al mercado tensionado, sin portal de anuncios.',
    faq: [
      {
        q: '¿Cuánto cuesta un contrato LAU en Madrid?',
        a: '145 € IVA incluido en Inmonest, con entrega en 48 h y revisión por gestor. Incluye cláusulas de actualización conforme a Ley de Vivienda 2026.',
      },
      {
        q: '¿Es obligatorio contrato aunque sea entre particulares?',
        a: 'Sí. Sin LAU bien redactado, propietario e inquilino asumen riesgos en fianza, desahucio y subidas de renta.',
      },
    ],
  },
  barcelona: {
    precio_medio: '1.400 – 2.000 €/mes',
    barrios: ['Eixample', 'Gràcia', 'Sants', 'Horta', 'Nou Barris', 'Sant Andreu'],
    descripcion_seo:
      'Barcelona es zona de mercado tensionado: el LAU debe respetar referencia de renta cuando aplica. Inmonest prepara contratos para particulares en toda la ciudad, con guías por barrio.',
    faq: [
      {
        q: '¿IRAV en Barcelona para particulares?',
        a: 'En calles tensionadas la renta inicial debe ser coherente con el índice de referencia. Lo verificamos al redactar según la dirección.',
      },
      {
        q: '¿Depósito de fianza en Cataluña?',
        a: 'La fianza legal se deposita ante INCASÒL cuando corresponda; el contrato debe reflejar plazos e importes.',
      },
    ],
  },
  valencia: {
    precio_medio: '800 – 1.200 €/mes',
    barrios: ['Ruzafa', 'Benimaclet', 'Patraix', 'Quatre Carreres', 'Campanar', 'Orriols'],
    descripcion_seo:
      'Alquiler entre particulares en Valencia con contrato LAU adaptado a la Generalitat Valenciana. Gestoría online, sin buscador de pisos.',
    faq: [
      {
        q: '¿Qué documentos suelen pedir los propietarios en Valencia?',
        a: 'DNI/NIE, solvencia (nóminas o IRPF) y a veces aval. El contrato LAU fija condiciones por escrito.',
      },
    ],
  },
  sevilla: {
    precio_medio: '700 – 1.100 €/mes',
    barrios: ['Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Bellavista', 'San Pablo'],
    descripcion_seo:
      'Sevilla: particulares con buena relación calidad-precio. Formaliza el alquiler con LAU desde 145 € con Inmonest.',
    faq: [
      {
        q: '¿Cuánto cuesta el contrato en Sevilla?',
        a: '145 € IVA incluido, mismo precio en todas las ciudades.',
      },
    ],
  },
  malaga: {
    precio_medio: '1.000 – 1.600 €/mes',
    barrios: ['Centro Histórico', 'Teatinos', 'El Palo', 'Churriana', 'Pedregalejo', 'Cruz de Humilladero'],
    descripcion_seo:
      'Málaga con alta demanda de alquiler: un LAU claro evita conflictos en temporadas y subidas. Gestoría Inmonest 100 % online.',
    faq: [
      {
        q: '¿Alquiler temporada vs LAU en Málaga?',
        a: 'Vivienda habitual = LAU larga duración. Temporada es otro servicio con régimen distinto.',
      },
    ],
  },
  bilbao: {
    precio_medio: '900 – 1.400 €/mes',
    barrios: ['Abando', 'Deusto', 'Indautxu', 'Basurto', 'Rekalde', 'Santutxu'],
    descripcion_seo:
      'Alquiler entre particulares en Bilbao: contrato LAU con gestoría experta, entrega 48 h.',
    faq: [
      {
        q: '¿Contrato en euskera?',
        a: 'Redactamos en castellano, válido en todo el Estado; si necesitas bilingüe, indícalo al solicitar.',
      },
    ],
  },
  zaragoza: {
    precio_medio: '600 – 950 €/mes',
    barrios: ['Centro', 'Delicias', 'Las Fuentes', 'Actur', 'San José', 'La Almozara'],
    descripcion_seo:
      'Zaragoza: particulares y contratos LAU accesibles. Inmonest gestiona tu arrendamiento online.',
    faq: [
      {
        q: '¿Precio medio de alquiler en Zaragoza?',
        a: 'Orientativamente entre 600 € y 950 €/mes según barrio; el contrato LAU es independiente del importe de renta.',
      },
    ],
  },
  alicante: {
    precio_medio: '700 – 1.150 €/mes',
    barrios: ['Carolinas', 'Benalúa', 'San Blas', 'Playa de San Juan', 'Campello', 'Centro'],
    descripcion_seo:
      'Alicante y costa: alquiler entre particulares con LAU y depósito según normativa valenciana.',
    faq: [
      {
        q: '¿Necesito contrato LAU si alquilo de particular en Alicante?',
        a: 'Sí, para vivienda habitual. Protege fianza y duración mínima. Inmonest redacta desde 145 €.',
      },
    ],
  },
}

export function getAlquilerParticularesCiudadDatos(ciudad: string): AlquilerParticularesCiudadDatos {
  return ALQUILER_PARTICULARES_CIUDAD_DATOS[ciudad] ?? getPortalCiudadDatos(ciudad)
}
