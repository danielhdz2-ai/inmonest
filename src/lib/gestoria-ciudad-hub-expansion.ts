import type { CiudadHubConfig } from '@/lib/gestoria-ciudad-hub-data'
import { GESTORIA_HUB_FAQ_COMUN } from '@/lib/gestoria-hub-faq-comun'
import {
  GESTORIA_CIUDADES_EXPANSION_NOMBRES,
  GESTORIA_CIUDADES_EXPANSION_SLUGS,
} from '@/lib/gestoria-ciudades-expansion'

type HubSeed = {
  slug: (typeof GESTORIA_CIUDADES_EXPANSION_SLUGS)[number]
  region: string
  metaDescription: string
  keywords: string
  heroBadge: string
  heroSubtitulo: string
  ogImage: string
  razones: CiudadHubConfig['razones']
  mercadoZonas: CiudadHubConfig['mercadoZonas']
  mercadoCompraventa: string[]
  mercadoParticularidades: string[]
  faqSubtitulo: string
  serviciosSubtitulo: string
  ctaFinalTitulo: string
  ctaFinalTexto: string
}

function buildHub(seed: HubSeed): CiudadHubConfig {
  const nombre = GESTORIA_CIUDADES_EXPANSION_NOMBRES[seed.slug]
  return {
    slug: seed.slug,
    nombre,
    region: seed.region,
    metaDescription: seed.metaDescription,
    keywords: seed.keywords,
    heroBadge: seed.heroBadge,
    heroSubtitulo: seed.heroSubtitulo,
    ogImage: seed.ogImage,
    twitterDescription: seed.metaDescription.slice(0, 200),
    razones: seed.razones,
    mercadoZonas: seed.mercadoZonas,
    mercadoCompraventa: seed.mercadoCompraventa,
    mercadoParticularidades: seed.mercadoParticularidades,
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: seed.faqSubtitulo,
    serviciosSubtitulo: seed.serviciosSubtitulo,
    ctaFinalTitulo: seed.ctaFinalTitulo,
    ctaFinalTexto: seed.ctaFinalTexto,
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/gestoria/arras-penitenciales', label: `Contratar arras online →` },
      { slug: 'contrato-alquiler', href: '/gestoria/contrato-alquiler', label: `Contrato alquiler LAU online →` },
    ],
  }
}

const SEEDS: HubSeed[] = [
  {
    slug: 'vigo',
    region: 'Galicia',
    metaDescription:
      'Gestoría inmobiliaria online para particulares en Vigo. Due diligence 350€, arras 145€, revisión documental. Sin comisión sobre el piso. Panel y gestor asignado.',
    keywords: 'gestoría inmobiliaria vigo, due diligence vigo, contrato arras vigo online, comprar piso vigo sin agencia',
    heroBadge: 'Gestoría 100 % Online | Vigo y Ría de Vigo',
    heroSubtitulo:
      'Contrata gestoría inmobiliaria desde Vigo o desde cualquier punto de España: due diligence, arras y contratos LAU con precio cerrado y trámite online.',
    ogImage: '/vigo.jpg',
    razones: [
      {
        titulo: 'Compraventa sin agencia en la Ría',
        descripcion:
          'En Vigo muchas operaciones son entre particulares con plazos cortos. Sin revisión documental heredas derramas o cargas que no aparecen en el anuncio.',
      },
      {
        titulo: 'Mercado portuario y universitario',
        descripcion:
          'Pisos para familias, estudiantes y teletrabajo. Contratos LAU y habitación requieren redacción correcta, no plantillas genéricas.',
      },
      {
        titulo: 'Honorarios fijos vs comisión 3-5 %',
        descripcion:
          'En un piso de 195.000 € la agencia puede cobrar 6.000-10.000 €. Due diligence Inmonest: 350 €; arras: 145 €.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Casco / Príncipe', rango: '1.400-2.100€/m²', perfil: 'centro histórico' },
      { nombre: 'Coia / Teis', rango: '1.200-1.800€/m²', perfil: 'familias' },
      { nombre: 'Bouzas / Samil', rango: '1.500-2.200€/m²', perfil: 'litoral' },
    ],
    mercadoCompraventa: [
      'Precio medio en **Vigo capital** suele estar entre **1.300-2.000€/m²** según barrio.',
      'Comisión agencia 3-5 % vs **350 €** due diligence y **145 €** arras con gestor online.',
    ],
    mercadoParticularidades: ['ITE en edificios antiguos del Ensanche', 'Depósito fianza LAU autonómico gallego'],
    faqSubtitulo: 'Gestoría para compradores y vendedores particulares en Vigo.',
    serviciosSubtitulo: 'Due diligence local con contenido diferenciado para el mercado de la Ría.',
    ctaFinalTitulo: '¿Compras o vendes en Vigo sin agencia?',
    ctaFinalTexto: 'Contrata online: gestor asignado, panel de expediente e informe antes de la señal.',
  },
  {
    slug: 'cordoba',
    region: 'Andalucía',
    metaDescription:
      'Gestoría inmobiliaria online en Córdoba. Due diligence casco UNESCO, arras y contratos desde 145€. Sin comisiones. Trámite online toda España.',
    keywords: 'gestoría inmobiliaria cordoba, due diligence cordoba, arras cordoba online',
    heroBadge: 'Gestoría Online | Córdoba y Área Metropolitana',
    heroSubtitulo:
      'Gestoría para particulares en Córdoba: revisión documental en patrimonio UNESCO y barrios modernos. Contratación online con gestor real.',
    ogImage: '/gestoria5.jpg',
    razones: [
      {
        titulo: 'Patrimonio y restricciones urbanísticas',
        descripcion: 'En el casco histórico las licencias y obras no declaradas pueden bloquear la venta o generar sanciones.',
      },
      {
        titulo: 'Operaciones rápidas entre particulares',
        descripcion: 'Precios más accesibles que Madrid atraen compradores de otras provincias que cierran arras en días.',
      },
      {
        titulo: 'Due diligence antes de señal elevada',
        descripcion: '350 € por informe completo frente a miles en comisión de agencia.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro / Judería', rango: '1.200-1.900€/m²', perfil: 'patrimonio' },
      { nombre: 'Levante', rango: '1.000-1.500€/m²', perfil: 'residencial' },
    ],
    mercadoCompraventa: ['**Córdoba capital** ronda **1.100-1.700€/m²** en media.', 'Inmonest: precios cerrados, sin % sobre venta.'],
    mercadoParticularidades: ['Cédula de habitabilidad andaluza', 'ITE en edificios antiguos'],
    faqSubtitulo: 'Gestoría inmobiliaria en Córdoba capital.',
    serviciosSubtitulo: 'Contenido local para compradores entre particulares en Córdoba.',
    ctaFinalTitulo: '¿Vas a firmar arras en Córdoba?',
    ctaFinalTexto: 'Revisa documentación y contrato con gestor online antes de pagar señal.',
  },
  {
    slug: 'las-palmas',
    region: 'Canarias',
    metaDescription:
      'Gestoría inmobiliaria online Las Palmas de Gran Canaria. Due diligence 350€, arras 145€. Compra entre particulares desde península o islas.',
    keywords: 'gestoría inmobiliaria las palmas, due diligence gran canaria, comprar piso canarias online',
    heroBadge: 'Gestoría 100 % Online | Gran Canaria',
    heroSubtitulo:
      'Operaciones a distancia en Canarias: panel, gestor asignado y due diligence sin desplazarte a una oficina en Las Palmas.',
    ogImage: '/gestoria14.jpg',
    razones: [
      { titulo: 'Compras interinsulares y desde península', descripcion: 'Subes documentos al panel; el gestor audita antes de transferir señal.' },
      { titulo: 'Mercado residencial y turístico', descripcion: 'Conviven vivienda habitual y uso vacacional; la documentación debe ser coherente.' },
      { titulo: 'Tarifa plana', descripcion: '350 € due diligence vs comisión de agencia sobre precio de venta.' },
    ],
    mercadoZonas: [
      { nombre: 'Vegueta / Triana', rango: '1.500-2.400€/m²', perfil: 'capital' },
      { nombre: 'Sur / Maspalomas', rango: '1.800-3.000€/m²', perfil: 'costa' },
    ],
    mercadoCompraventa: ['Las Palmas capital **1.400-2.200€/m²** según zona.', 'Gestoría online válida en todo el territorio nacional.'],
    mercadoParticularidades: ['Normativa autonómica canaria', 'Certificado energético obligatorio'],
    faqSubtitulo: 'Gestoría para compradores en Gran Canaria.',
    serviciosSubtitulo: 'Due diligence e informe ejecutivo con foco en Gran Canaria.',
    ctaFinalTitulo: '¿Compras piso en Las Palmas?',
    ctaFinalTexto: 'Due diligence online con gestor asignado antes de escriturar.',
  },
  {
    slug: 'santa-cruz',
    region: 'Canarias · Tenerife',
    metaDescription:
      'Gestoría inmobiliaria Santa Cruz de Tenerife. Due diligence 350€, contratos online. Compra entre particulares con gestor asignado.',
    keywords: 'gestoría inmobiliaria santa cruz tenerife, due diligence tenerife',
    heroBadge: 'Gestoría Online | Tenerife',
    heroSubtitulo: 'Gestoría inmobiliaria para Santa Cruz, La Laguna y costa sur: trámite online y precio cerrado.',
    ogImage: '/gestoria16.jpg',
    razones: [
      { titulo: 'Capital insular con mucho particular', descripcion: 'Revisión de comunidad y registro imprescindible antes de arras.' },
      { titulo: 'Operaciones a distancia', descripcion: 'Videollamada, WhatsApp y panel de expediente.' },
      { titulo: 'Sin comisión sobre el piso', descripcion: 'Honorarios fijos publicados en web.' },
    ],
    mercadoZonas: [
      { nombre: 'Centro SC', rango: '1.400-2.100€/m²', perfil: 'capital' },
      { nombre: 'La Laguna', rango: '1.200-1.800€/m²', perfil: 'universidad' },
    ],
    mercadoCompraventa: ['Tenerife capital y área metropolitana con demanda estable.', '350 € due diligence frente a miles en comisión.'],
    mercadoParticularidades: ['ITE en edificios antiguos', 'Concordancia catastro-registro'],
    faqSubtitulo: 'Gestoría en Santa Cruz de Tenerife.',
    serviciosSubtitulo: 'Servicios online con contenido local para Tenerife.',
    ctaFinalTitulo: '¿Compras en Tenerife sin agencia?',
    ctaFinalTexto: 'Contrata due diligence y revisión de arras online.',
  },
  {
    slug: 'cadiz',
    region: 'Andalucía',
    metaDescription:
      'Gestoría inmobiliaria Cádiz y bahía. Due diligence 350€, arras online. Compraventa entre particulares sin comisión de agencia.',
    keywords: 'gestoría inmobiliaria cadiz, due diligence cadiz, comprar piso cadiz particular',
    heroBadge: 'Gestoría Online | Bahía de Cádiz',
    heroSubtitulo: 'Gestoría para Cádiz, San Fernando y costa: due diligence, arras y LAU con gestor asignado.',
    ogImage: '/gestoria6.jpg',
    razones: [
      { titulo: 'Segunda residencia y compradores externos', descripcion: 'Muchas operaciones sin agencia; el vendedor no siempre aporta documentación completa.' },
      { titulo: 'Edificios costeros e humedades', descripcion: 'Las actas de comunidad revelan derramas por fachada e impermeabilización.' },
      { titulo: 'Precio cerrado', descripcion: '145 € arras · 350 € due diligence · trámite online.' },
    ],
    mercadoZonas: [
      { nombre: 'Cádiz casco', rango: '1.600-2.500€/m²', perfil: 'histórico' },
      { nombre: 'Chiclana / Costa', rango: '1.400-2.200€/m²', perfil: 'costa' },
    ],
    mercadoCompraventa: ['Bahía de Cádiz con mezcla de residentes y segunda residencia.', 'Revisión documental antes de señal evita sorpresas en notaría.'],
    mercadoParticularidades: ['ITE en bloques marítimos', 'Plusvalía municipal según ayuntamiento'],
    faqSubtitulo: 'Gestoría inmobiliaria en la provincia de Cádiz.',
    serviciosSubtitulo: 'Due diligence con enfoque en bahía y litoral.',
    ctaFinalTitulo: '¿Firmas arras en Cádiz o la bahía?',
    ctaFinalTexto: 'Gestor online revisa contrato y documentación del inmueble.',
  },
  {
    slug: 'badajoz',
    region: 'Extremadura',
    metaDescription:
      'Gestoría inmobiliaria Badajoz online. Due diligence 350€, contratos arras y LAU. Compra entre particulares en Extremadura.',
    keywords: 'gestoría inmobiliaria badajoz, due diligence badajoz, comprar piso extremadura',
    heroBadge: 'Gestoría 100 % Online | Extremadura',
    heroSubtitulo: 'Gestoría para Badajoz capital y área metropolitana: honorarios fijos, panel online, gestor asignado.',
    ogImage: '/gestoria4.jpg',
    razones: [
      { titulo: 'Mercado accesible, mucho particular', descripcion: 'A bajo precio m² el riesgo es documentación incompleta, no solo el importe de la señal.' },
      { titulo: 'Primera vivienda', descripcion: 'Compradores jóvenes sin agencia necesitan due diligence y arras bien redactadas.' },
      { titulo: 'Online desde cualquier sitio', descripcion: 'Válido si vives en Badajoz o compras desde Madrid.' },
    ],
    mercadoZonas: [{ nombre: 'Centro / San Roque', rango: '900-1.300€/m²', perfil: 'capital' }],
    mercadoCompraventa: ['Badajoz **900-1.200€/m²** aprox. en media.', '350 € informe documental vs comisión de agencia.'],
    mercadoParticularidades: ['Cédula de habitabilidad', 'Depósito fianza LAU'],
    faqSubtitulo: 'Gestoría en Badajoz y Extremadura.',
    serviciosSubtitulo: 'Contenido local para compradores particulares.',
    ctaFinalTitulo: '¿Compras piso en Badajoz?',
    ctaFinalTexto: 'Due diligence online antes de entregar señal.',
  },
  {
    slug: 'toledo',
    region: 'Castilla-La Mancha',
    metaDescription:
      'Gestoría inmobiliaria Toledo online. Due diligence 350€, arras 145€. Compradores Madrid-Toledo con gestor asignado.',
    keywords: 'gestoría inmobiliaria toledo, due diligence toledo, comprar piso toledo particular',
    heroBadge: 'Gestoría Online | Toledo y corredor sur Madrid',
    heroSubtitulo: 'Gestoría para Toledo capital y corredor sur de Madrid: contratos y due diligence sin comisión de agencia.',
    ogImage: '/gestoria9.jpg',
    razones: [
      { titulo: 'Corredor Madrid-Toledo', descripcion: 'Compradores que cierran rápido desde Madrid; conviene revisar antes de desplazarse a notaría.' },
      { titulo: 'Casco histórico', descripcion: 'Restricciones urbanísticas y obras sin licencia.' },
      { titulo: 'Gestoría a precio fijo', descripcion: '145 € arras · 350 € due diligence.' },
    ],
    mercadoZonas: [
      { nombre: 'Casco', rango: '1.200-1.800€/m²', perfil: 'patrimonio' },
      { nombre: 'Polígono / extrarradio', rango: '900-1.300€/m²', perfil: 'familias' },
    ],
    mercadoCompraventa: ['Toledo **1.000-1.600€/m²** según zona.', 'Operaciones frecuentes entre particulares sin agencia.'],
    mercadoParticularidades: ['ITE en casco', 'Cédula castellanomanchega'],
    faqSubtitulo: 'Gestoría inmobiliaria en Toledo.',
    serviciosSubtitulo: 'Due diligence diferenciada para Toledo y corredor sur.',
    ctaFinalTitulo: '¿Compras en Toledo sin agencia?',
    ctaFinalTexto: 'Informe documental online con gestor asignado.',
  },
  {
    slug: 'tarragona',
    region: 'Cataluña',
    metaDescription:
      'Gestoría inmobiliaria Tarragona y Costa Daurada online. Due diligence 350€, contratos LAU y arras. Sin comisiones.',
    keywords: 'gestoría inmobiliaria tarragona, due diligence tarragona, contrato arras tarragona',
    heroBadge: 'Gestoría Online | Camp de Tarragona',
    heroSubtitulo: 'Gestoría para Tarragona, Reus y costa: normativa catalana, cédula y contratos con precio cerrado.',
    ogImage: '/barcelona1.jpg',
    razones: [
      { titulo: 'Normativa Generalitat', descripcion: 'Cédula de habitabilidad y requisitos catalanes distintos de otras CCAA.' },
      { titulo: 'Costa Daurada', descripcion: 'Mezcla de residencial y segunda residencia; documentación debe cuadrar.' },
      { titulo: 'Trámite online', descripcion: 'Panel, gestor y due diligence sin ir a despacho.' },
    ],
    mercadoZonas: [
      { nombre: 'Part Alta', rango: '1.400-2.000€/m²', perfil: 'capital' },
      { nombre: 'Salou / Cambrils', rango: '1.600-2.500€/m²', perfil: 'costa' },
    ],
    mercadoCompraventa: ['Tarragona capital **1.300-1.900€/m²**.', '350 € due diligence vs comisión 3-5 %.'],
    mercadoParticularidades: ['Cédula Generalitat', 'Certificado de deudas comunidad'],
    faqSubtitulo: 'Gestoría en Tarragona y Costa Daurada.',
    serviciosSubtitulo: 'Servicios online con contenido local catalán.',
    ctaFinalTitulo: '¿Operas en Tarragona entre particulares?',
    ctaFinalTexto: 'Due diligence y arras online con gestor asignado.',
  },
  {
    slug: 'almeria',
    region: 'Andalucía',
    metaDescription:
      'Gestoría inmobiliaria Almería online. Due diligence 350€, arras y LAU. Compra entre particulares en capital y costa.',
    keywords: 'gestoría inmobiliaria almeria, due diligence almeria, comprar piso almeria sin agencia',
    heroBadge: 'Gestoría Online | Almería y costa',
    heroSubtitulo: 'Gestoría para Almería, Roquetas y Poniente: due diligence, arras y contratos con gestor real online.',
    ogImage: '/malaga1.jpg',
    razones: [
      { titulo: 'Costa e inversión', descripcion: 'Chalets y pisos con ampliaciones que deben constar en registro y licencias.' },
      { titulo: 'Compradores de otras CCAA', descripcion: 'Operaciones a distancia con plazos cortos en temporada alta.' },
      { titulo: 'Honorarios fijos', descripcion: 'Sin comisión sobre el precio del inmueble.' },
    ],
    mercadoZonas: [
      { nombre: 'Almería capital', rango: '1.000-1.500€/m²', perfil: 'ciudad' },
      { nombre: 'Roquetas / Aguadulce', rango: '1.200-1.800€/m²', perfil: 'costa' },
    ],
    mercadoCompraventa: ['Almería **1.000-1.400€/m²** en media en capital.', 'Due diligence 350 € antes de señal elevada.'],
    mercadoParticularidades: ['Licencias en ampliaciones', 'ITE según antigüedad'],
    faqSubtitulo: 'Gestoría inmobiliaria en Almería.',
    serviciosSubtitulo: 'Due diligence con foco en capital y Poniente Almeriense.',
    ctaFinalTitulo: '¿Compras en Almería o la costa?',
    ctaFinalTexto: 'Revisión documental online con informe ejecutivo.',
  },
  {
    slug: 'gijon',
    region: 'Asturias',
    metaDescription:
      'Gestoría inmobiliaria Gijón online. Due diligence 350€, arras 145€. Compraventa entre particulares en el litoral central asturiano.',
    keywords: 'gestoría inmobiliaria gijon, due diligence gijon, comprar piso gijon sin agencia',
    heroBadge: 'Gestoría Online | Gijón',
    heroSubtitulo: 'Gestoría para Gijón, Cimadevilla y playas: due diligence y contratos con trámite 100 % online.',
    ogImage: '/gijon.jpg',
    razones: [
      { titulo: 'Mercado gijonés específico', descripcion: 'Industria, universidad y turismo de proximidad; muchas operaciones sin agencia.' },
      { titulo: 'Complemento al hub Asturias', descripcion: 'Landing local con barrios y riesgos del litoral central.' },
      { titulo: 'Precio cerrado', descripcion: '350 € due diligence · gestor hasta escritura.' },
    ],
    mercadoZonas: [
      { nombre: 'Cimadevilla / Centro', rango: '1.200-1.800€/m²', perfil: 'casco' },
      { nombre: 'La Calzada / Somió', rango: '1.400-2.000€/m²', perfil: 'residencial' },
    ],
    mercadoCompraventa: ['Gijón **1.200-1.700€/m²** según zona.', 'Comisión agencia vs tarifa plana Inmonest.'],
    mercadoParticularidades: ['ITE en bloques de los 60-70', 'Depósito fianza LAU'],
    faqSubtitulo: 'Gestoría en Gijón y litoral central.',
    serviciosSubtitulo: 'Due diligence local diferenciada de Oviedo/Asturias genérico.',
    ctaFinalTitulo: '¿Compras piso en Gijón?',
    ctaFinalTexto: 'Due diligence online con gestor asignado.',
  },
]

export const CIUDAD_HUBS_EXPANSION: Record<string, CiudadHubConfig> = Object.fromEntries(
  SEEDS.map((s) => [s.slug, buildHub(s)]),
)
