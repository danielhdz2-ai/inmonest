import type { Metadata } from 'next'
import { GESTORIA_ALICANTE_FAQ } from './gestoria-alicante-faq'
import { GESTORIA_BILBAO_FAQ } from './gestoria-bilbao-faq'
import { GESTORIA_MALAGA_FAQ } from './gestoria-malaga-faq'
import { GESTORIA_PALMA_FAQ } from './gestoria-palma-faq'
import { GESTORIA_ZARAGOZA_FAQ } from './gestoria-zaragoza-faq'

const BASE_URL = 'https://inmonest.com'

export type CiudadHubRazon = {
  titulo: string
  descripcion: string
}

export type CiudadHubConfig = {
  slug: string
  nombre: string
  region?: string
  metaDescription: string
  keywords: string
  heroBadge: string
  heroSubtitulo: string
  ogImage: string
  twitterDescription: string
  razones: CiudadHubRazon[]
  mercadoZonas: { nombre: string; rango: string; perfil: string }[]
  mercadoCompraventa: string[]
  mercadoParticularidades: string[]
  faq: readonly { q: string; a: string }[]
  faqSubtitulo: string
  serviciosSubtitulo: string
  ctaFinalTitulo: string
  ctaFinalTexto: string
  enlacesContrato: { slug: string; href: string; label: string }[]
}

export const CIUDAD_HUBS: Record<string, CiudadHubConfig> = {
  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Málaga. Contratos LAU desde 145€, arras 145€, servicio completo 687€. Sin comisiones. Abogados especializados en normativa andaluza.',
    keywords:
      'gestoría inmobiliaria málaga, gestoría particulares málaga, contrato arras málaga, contrato alquiler málaga, comprar piso málaga sin agencia',
    heroBadge: 'Gestoría 100% Online | Especialistas en Andalucía',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Málaga. Mercado en máximos históricos, alta demanda extranjera y normativa VFT de la Junta. Contratos desde 145€. Sin comisiones de agencia.',
    ogImage: '/gestoria5.jpg',
    twitterDescription:
      'Contratos de alquiler, arras y compraventa en Málaga desde 145€. Sin comisiones de agencia. Normativa andaluza.',
    razones: [
      {
        titulo: 'Mercado en máximos históricos',
        descripcion:
          'Málaga tiene el mayor crecimiento de precio inmobiliario de España. Precio medio 3.000-3.500€/m² en el centro, hasta 4.500€/m² en El Limonar o La Malagueta. Las agencias presionan para cerrar rápido.',
      },
      {
        titulo: 'Alta demanda extranjera',
        descripcion:
          'Compradores británicos, alemanes y nórdicos sin conocimiento de la normativa española. Contratos con cláusulas en español que no entienden y hipotecas en condiciones desfavorables.',
      },
      {
        titulo: 'Regulación turística de la Junta',
        descripcion:
          'Málaga tiene normativa específica de la Junta de Andalucía para viviendas con fines turísticos (VFT). Es distinta a la LAU estándar y exige documentos diferentes.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro histórico', rango: '900-1.400€/mes', perfil: 'turismo y residentes' },
      { nombre: 'Soho', rango: '800-1.100€/mes', perfil: 'jóvenes profesionales' },
      { nombre: 'El Palo-Pedregalejo', rango: '700-1.000€/mes', perfil: 'familias' },
      { nombre: 'Teatinos', rango: '600-850€/mes', perfil: 'universitario' },
    ],
    mercadoCompraventa: [
      'El precio medio en el centro de Málaga ronda los **3.000-3.500€/m²**. En la Costa del Sol (Marbella, Estepona) el rango habitual es de **3.500-6.000€/m²**.',
      'Con una comisión de agencia del 3-5%, en un piso de 300.000€ hablamos de **9.000-15.000€** solo por intermediar. Inmonest cobra honorarios fijos desde **145€**.',
    ],
    mercadoParticularidades: [
      'VFT (Vivienda con Fines Turísticos): registro obligatorio ante la Junta de Andalucía',
      'IEE: obligatorio en edificios de más de 50 años para vender en Andalucía',
      'Plusvalía municipal (IIVTNU): liquidar en 30 días hábiles tras la venta',
      'Certificado energético: obligatorio; sanciones hasta 6.000€',
    ],
    faq: GESTORIA_MALAGA_FAQ,
    faqSubtitulo: 'Respuestas específicas para el mercado malagueño: plusvalía, VFT y compraventa entre particulares.',
    serviciosSubtitulo:
      'Redactados por abogados colegiados con experiencia en el mercado inmobiliario malagueño. Precios iguales que en nuestra gestoría online.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Málaga?',
    ctaFinalTexto:
      'En un mercado en máximos históricos, un error puede costarte miles de euros. Contrata asesoramiento especializado y opera con total seguridad jurídica.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/malaga/contrato-arras', label: 'Ver contrato arras Málaga →' },
      { slug: 'contrato-alquiler', href: '/malaga/contrato-alquiler', label: 'Ver contrato alquiler Málaga →' },
    ],
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Bilbao. Contratos LAU desde 145€, arras 145€, servicio completo 687€. Sin comisiones. Conocimiento del derecho foral vasco.',
    keywords:
      'gestoría inmobiliaria bilbao, gestoría particulares bilbao, contrato arras bilbao, contrato alquiler bilbao, comprar piso bilbao',
    heroBadge: 'Gestoría 100% Online | Bizkaia',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Bilbao. Derecho foral vasco, mercado estable con precios elevados y operaciones rápidas. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria7.jpg',
    twitterDescription:
      'Contratos de alquiler, arras y compraventa en Bilbao desde 145€. Sin comisiones. Normativa foral vasca.',
    razones: [
      {
        titulo: 'Derecho foral vasco',
        descripcion:
          'El País Vasco tiene su propio ordenamiento fiscal y civil. La plusvalía municipal (IIVTNU) tiene regulación específica de las Juntas Generales de Bizkaia, diferente al régimen común.',
      },
      {
        titulo: 'Mercado caro y estable',
        descripcion:
          'Bilbao tiene precios de 2.800-3.500€/m², con zonas como Indautxu o Abando superando los 4.000€/m². Los errores en contratos tienen consecuencias económicas elevadas.',
      },
      {
        titulo: 'Arras en operaciones rápidas',
        descripcion:
          'El mercado bilbaíno es competitivo: hay presión para firmar arras rápido. Sin revisión profesional, es fácil firmar condiciones desfavorables.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Indautxu', rango: '900-1.300€/mes', perfil: 'ejecutivos' },
      { nombre: 'Abando', rango: '850-1.200€/mes', perfil: 'familias' },
      { nombre: 'Deusto', rango: '650-900€/mes', perfil: 'universitario' },
      { nombre: 'Rekalde', rango: '550-750€/mes', perfil: 'familias trabajadoras' },
    ],
    mercadoCompraventa: [
      'El precio medio en Bilbao ronda los **2.800-3.500€/m²**. En Indautxu-Abando el rango habitual es de **3.500-4.500€/m²**; en periferia, **2.000-2.800€/m²**.',
      'Con una comisión de agencia del 3-5%, en un piso de 280.000€ son **8.400-14.000€**. Inmonest cobra **687€** fijos por acompañamiento completo hasta escritura.',
    ],
    mercadoParticularidades: [
      'Plusvalía foral: regulada por Juntas Generales de Bizkaia, no solo normativa estatal',
      'Competencias vascas en vivienda: obligaciones adicionales en determinados contratos',
      'Mercado competitivo: revisión urgente de arras antes de firmar bajo presión',
      'Certificado energético: obligatorio para vender o alquilar',
    ],
    faq: GESTORIA_BILBAO_FAQ,
    faqSubtitulo: 'Respuestas específicas para el mercado bilbaíno: plusvalía foral y compraventa entre particulares.',
    serviciosSubtitulo:
      'Redactados por abogados colegiados con experiencia en el mercado inmobiliario de Bizkaia.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Bilbao?',
    ctaFinalTexto:
      'En un mercado con precios elevados, un contrato mal redactado puede costarte miles de euros. Opera con asesoramiento jurídico especializado.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/bilbao/contrato-arras', label: 'Ver contrato arras Bilbao →' },
      { slug: 'contrato-alquiler', href: '/bilbao/contrato-alquiler', label: 'Ver contrato alquiler Bilbao →' },
    ],
  },

  palma: {
    slug: 'palma',
    nombre: 'Palma',
    region: 'Illes Balears',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Palma e Illes Balears. Contratos LAU desde 145€, arras 145€, servicio completo 687€. Sin comisiones. Normativa balear.',
    keywords:
      'gestoría inmobiliaria palma, gestoría mallorca, contrato arras palma, contrato alquiler palma, comprar piso baleares',
    heroBadge: 'Gestoría 100% Online | Illes Balears',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Palma. Precios entre los más altos de España, regulación balear específica y alta demanda extranjera. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria2.jpg',
    twitterDescription:
      'Contratos de alquiler, arras y compraventa en Palma desde 145€. Normativa balear. Sin comisiones.',
    razones: [
      {
        titulo: 'Precio/m² entre los más altos de España',
        descripcion:
          'Palma supera los 4.000-5.000€/m² en zonas como Santa Catalina, el Eixample o el Casco Antiguo. Un error en la compra puede suponer decenas de miles de euros.',
      },
      {
        titulo: 'Regulación de Baleares',
        descripcion:
          'Zonas tensionadas en Palma, moratoria de licencias turísticas (ETV), cédula de habitabilidad obligatoria y normativa del Govern Balear con especificidades que no todos conocen.',
      },
      {
        titulo: 'Alta demanda extranjera',
        descripcion:
          'Compradores alemanes, británicos y escandinavos que necesitan asesoramiento en español para entender los contratos y el proceso notarial.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Santa Catalina', rango: '1.100-1.600€/mes', perfil: 'jóvenes profesionales' },
      { nombre: 'Eixample', rango: '1.000-1.400€/mes', perfil: 'familias' },
      { nombre: 'Son Espanyolet', rango: '900-1.200€/mes', perfil: 'residentes' },
      { nombre: 'Son Cladera', rango: '600-800€/mes', perfil: 'perfil mixto' },
    ],
    mercadoCompraventa: [
      'El precio medio en Palma ronda los **4.000-5.000€/m²** en zonas céntricas. Casco Antiguo y Santa Catalina suelen superar **4.500-6.000€/m²**; en periferia, **2.500-3.500€/m²**.',
      'El ahorro frente a una agencia (3-5%) en un piso de 400.000€ es de **12.000-20.000€**. Inmonest cobra **687€** fijos por servicio completo hasta escritura.',
    ],
    mercadoParticularidades: [
      'Zona tensionada en Palma: índice de referencia del Govern Balear obligatorio',
      'Moratoria ETV desde 2017: nuevas licencias turísticas muy limitadas en Mallorca',
      'Cédula d\'habitabilitat: obligatoria para vender y alquilar',
      'Depósito de fianza en IBAVI en 30 días desde la firma',
    ],
    faq: GESTORIA_PALMA_FAQ,
    faqSubtitulo: 'Respuestas específicas para Palma y Baleares: cédula, IBAVI y alquiler turístico.',
    serviciosSubtitulo:
      'Redactados por abogados colegiados con experiencia en el mercado inmobiliario balear.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Palma?',
    ctaFinalTexto:
      'En uno de los mercados más caros de España, un error jurídico puede costarte decenas de miles de euros. Opera con total seguridad.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/palma/contrato-arras', label: 'Ver contrato arras Palma →' },
      { slug: 'contrato-alquiler', href: '/palma/contrato-alquiler', label: 'Ver contrato alquiler Palma →' },
    ],
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Zaragoza. Contratos LAU desde 145€, arras 145€, servicio completo 687€. Sin comisiones. Normativa aragonesa.',
    keywords:
      'gestoría inmobiliaria zaragoza, gestoría particulares zaragoza, contrato arras zaragoza, contrato alquiler zaragoza',
    heroBadge: 'Gestoría 100% Online | Aragón',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Zaragoza. Mercado en crecimiento, normativa aragonesa y poca competencia en gestoría online. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria3.jpg',
    twitterDescription:
      'Contratos de alquiler, arras y compraventa en Zaragoza desde 145€. Sin comisiones de agencia.',
    razones: [
      {
        titulo: 'Mercado en crecimiento sostenido',
        descripcion:
          'Zaragoza tiene el precio/m² más accesible entre las grandes ciudades (1.500-2.200€/m²) pero crece consistentemente. Buena ciudad para inversión y operaciones entre particulares.',
      },
      {
        titulo: 'Normativa aragonesa',
        descripcion:
          'Aragón tiene competencias en vivienda con particularidades en el depósito de fianzas (INAGA) y algunos aspectos de los contratos de arrendamiento.',
      },
      {
        titulo: 'Poca competencia en gestoría online',
        descripcion:
          'A diferencia de Madrid o Barcelona, hay pocos actores digitales de gestoría en Zaragoza. Ventana de oportunidad para particulares que buscan precio fijo y asesoramiento real.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro-Casco Histórico', rango: '700-1.000€/mes', perfil: 'jóvenes y familias' },
      { nombre: 'Delicias', rango: '500-700€/mes', perfil: 'perfil mixto' },
      { nombre: 'Universidad', rango: '550-750€/mes', perfil: 'estudiantes' },
      { nombre: 'Actur', rango: '600-800€/mes', perfil: 'familias' },
    ],
    mercadoCompraventa: [
      'El precio medio en Zaragoza ronda los **1.800-2.500€/m²** en el centro. En periferia el rango habitual es de **1.200-1.600€/m²**.',
      'Las agencias cobran entre el 3% y el 5%. En un piso de 180.000€ son **5.400-9.000€**. Inmonest cobra **687€** fijos por acompañamiento completo.',
    ],
    mercadoParticularidades: [
      'Depósito de fianza en INAGA / SUELO ARAGÓN en 30 días',
      'IEE obligatorio en edificios de más de 50 años',
      'Mercado accesible: ideal para primera compra con asesoramiento profesional',
      'Certificado energético obligatorio',
    ],
    faq: GESTORIA_ZARAGOZA_FAQ,
    faqSubtitulo: 'Respuestas específicas para Zaragoza: fianza INAGA y compraventa entre particulares.',
    serviciosSubtitulo:
      'Redactados por abogados colegiados con experiencia en el mercado inmobiliario aragonés.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Zaragoza?',
    ctaFinalTexto:
      'Aprovecha un mercado en crecimiento con asesoramiento jurídico fijo, sin comisiones abusivas de agencia.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/zaragoza/contrato-arras', label: 'Ver contrato arras Zaragoza →' },
      { slug: 'contrato-alquiler', href: '/zaragoza/contrato-alquiler', label: 'Ver contrato alquiler Zaragoza →' },
    ],
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    region: 'Comunitat Valenciana',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Alicante. Contratos LAU desde 145€, arras 145€, servicio completo 687€. Sin comisiones. Alta demanda extranjera y normativa valenciana.',
    keywords:
      'gestoría inmobiliaria alicante, gestoría particulares alicante, contrato arras alicante, contrato alquiler alicante',
    heroBadge: 'Gestoría 100% Online | Costa Blanca',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Alicante. Alta demanda extranjera, mercado turístico y cédula de habitabilidad obligatoria. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria4.jpg',
    twitterDescription:
      'Contratos de alquiler, arras y compraventa en Alicante desde 145€. Sin comisiones. Normativa valenciana.',
    razones: [
      {
        titulo: 'Alta demanda extranjera',
        descripcion:
          'Alicante es la ciudad con mayor porcentaje de compradores extranjeros de España. Necesitan NIE, cuenta bancaria española y contratos que entiendan en un proceso notarial en español.',
      },
      {
        titulo: 'Mercado turístico regulado',
        descripcion:
          'La Comunitat Valenciana tiene regulación propia de viviendas turísticas. La diferencia entre un contrato LAU y uno de temporada es crítica en una ciudad con tanta demanda vacacional.',
      },
      {
        titulo: 'Cédula de habitabilidad obligatoria',
        descripcion:
          'Como en toda la Comunitat Valenciana, la cédula es obligatoria para vender y alquilar. Muchos compradores extranjeros desconocen este requisito hasta llegar a notaría.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro', rango: '700-1.000€/mes', perfil: 'residentes' },
      { nombre: 'Playa de San Juan', rango: '800-1.200€/mes', perfil: 'turismo y familias' },
      { nombre: 'Carolinas', rango: '500-700€/mes', perfil: 'perfil mixto' },
      { nombre: 'Benalúa', rango: '550-750€/mes', perfil: 'familias' },
    ],
    mercadoCompraventa: [
      'El precio medio en Alicante ronda los **2.000-3.500€/m²** en centro y costa. En periferia el rango habitual es de **1.200-1.800€/m²**.',
      'Las agencias cobran entre el 3% y el 5%. Inmonest cobra **687€** fijos por acompañamiento completo frente a **6.000-15.000€** de comisión.',
    ],
    mercadoParticularidades: [
      'Cédula de habitabilidad: obligatoria en Comunitat Valenciana',
      'Registro de Turisme: necesario para alquiler turístico (no es LAU)',
      'Compradores extranjeros: NIE y documentación bancaria para hipoteca',
      'Zonas de alta densidad turística con restricciones crecientes',
    ],
    faq: GESTORIA_ALICANTE_FAQ,
    faqSubtitulo: 'Respuestas específicas para Alicante: cédula, turismo y compradores extranjeros.',
    serviciosSubtitulo:
      'Redactados por abogados colegiados con experiencia en el mercado alicantino y costa blanca.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Alicante?',
    ctaFinalTexto:
      'Con tanta demanda extranjera y normativa valenciana específica, un asesor jurídico evita bloqueos en notaría y pérdidas económicas.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/alicante/contrato-arras', label: 'Ver contrato arras Alicante →' },
      { slug: 'contrato-alquiler', href: '/alicante/contrato-alquiler', label: 'Ver contrato alquiler Alicante →' },
    ],
  },
}

export function buildCiudadHubMetadata(config: CiudadHubConfig): Metadata {
  const title = `Gestoría Inmobiliaria ${config.nombre} para Particulares | Contratos desde 145€`
  return {
    title,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: { canonical: `${BASE_URL}/gestoria/${config.slug}` },
    openGraph: {
      title: `Gestoría inmobiliaria ${config.nombre}`,
      description: config.metaDescription,
      url: `${BASE_URL}/gestoria/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.ogImage}`,
          width: 1200,
          height: 630,
          alt: `Gestoría inmobiliaria en ${config.nombre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gestoría inmobiliaria ${config.nombre}`,
      description: config.twitterDescription,
    },
  }
}
