import { getCiudadImage } from '@/lib/gestoria-images'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type ContratosInmobiliariosCiudadSlug = 'madrid' | 'barcelona' | 'valencia'

export type ContratosCiudadBarrio = {
  nombre: string
  contexto: string
  operativa: string
}

export type ContratosCiudadMercadoCard = {
  titulo: string
  desc: string
}

export type ContratosInmobiliariosCiudadConfig = {
  slug: ContratosInmobiliariosCiudadSlug
  nombre: string
  region: string
  metaTitle: string
  metaDescription: string
  keywords: string
  heroH1: string
  heroHighlight: string
  heroLead: string
  heroTags: string[]
  heroImage: { src: string; alt: string }
  mercadoTitulo: string
  mercadoIntro: string
  mercadoCards: ContratosCiudadMercadoCard[]
  normativaTitulo: string
  normativaIntro: string
  normativaPuntos: string[]
  barriosTitulo: string
  barriosIntro: string
  barrios: ContratosCiudadBarrio[]
  serviciosTitulo: string
  serviciosIntro: string
  faq: { q: string; a: string }[]
  enlaceGestoria: string
  enlaceArras?: string
  enlaceAlquiler?: string
}

const MADRID: ContratosInmobiliariosCiudadConfig = {
  slug: 'madrid',
  nombre: 'Madrid',
  region: 'Comunidad de Madrid',
  metaTitle: 'Contratos inmobiliarios Madrid | Arras, alquiler LAU y gestoría',
  metaDescription:
    'Contratos inmobiliarios en Madrid para particulares: arras, alquiler LAU y acompañamiento de compra. Gestores expertos en Chamberí, Salamanca, Malasaña y área metropolitana. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Madrid, contrato arras Madrid, contrato alquiler Madrid, gestoría inmobiliaria Madrid particulares, redactar arras Madrid',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Madrid',
  heroLead:
    'Redactamos arras, alquiler LAU y packs documentales para compradores y vendedores que operan en Madrid capital y área metropolitana sin agencia. Conocemos IEE, ITE y la operativa rápida del mercado madrileño.',
  heroTags: ['Comunidad de Madrid', 'Particulares', 'Entrega 48h', 'Panel online'],
  heroImage: getCiudadImage('madrid'),
  mercadoTitulo: 'El mercado inmobiliario madrileño exige contratos a la altura',
  mercadoIntro:
    'Madrid concentra el mayor volumen de compraventa entre particulares de España y los plazos son agresivos: un piso deseado puede tener reserva en 48 horas. Firmar arras o un alquiler con una plantilla genérica en un mercado de rentas altas multiplica el riesgo de litigio, señal perdida o cláusula nula.',
  mercadoCards: [
    {
      titulo: 'Precios de referencia más altos',
      desc: 'En barrios como Salamanca, Chamberí o Retiro, una cláusula mal redactada sobre actualización de renta o garantías puede suponer miles de euros en disputa. Revisamos cada punto con rigor de mercado premium.',
    },
    {
      titulo: 'IEE e ITE en edificios antiguos',
      desc: 'Muchos pisos del centro y del Ensanche requieren Inspección Técnica de Edificios o certificado energético vigente. En packs vendedor y compra verificamos que la documentación no bloquee la escritura ante notaría.',
    },
    {
      titulo: 'Operaciones en cinturón sur y norte',
      desc: 'Getafe, Alcorcón, Móstoles, Alcobendas o Las Rozas mueven compraventa familiar con la misma urgencia que el centro. Nuestros contratos son válidos en toda la Comunidad de Madrid con adaptación documental local.',
    },
  ],
  normativaTitulo: 'Normativa aplicable en Madrid',
  normativaIntro:
    'Los contratos entre particulares en Madrid se rigen por el Código Civil, la LAU y la Ley de Vivienda 2026. Además, hay obligaciones autonómicas que una plantilla de internet no cubre:',
  normativaPuntos: [
    'Depósito de fianza legal (una mensualidad) ante el organismo autonómico de la Comunidad de Madrid',
    'Distinción clara entre vivienda habitual, habitación y alquiler temporal — especialmente en Malasaña, Lavapiés o Universidad',
    'Cláusulas de arras con condición suspensiva de hipoteca, habitual en operaciones con financiación bancaria madrileña',
    'Revisión de nota simple del Registro de la Propiedad de Madrid cuando el inmueble tiene cargas o usufructo',
  ],
  barriosTitulo: 'Barrios y zonas donde más intervenimos en Madrid',
  barriosIntro:
    'Cada barrio madrileño tiene un perfil de operación distinto. Adaptamos cláusulas de arras y alquiler al contexto real del inmueble, no solo al Código Postal:',
  barrios: [
    {
      nombre: 'Salamanca y Chamberí',
      contexto: 'Rentas elevadas y compradores exigentes',
      operativa:
        'Contratos de alquiler con garantías adicionales acotadas al límite legal, actualización IPC clara e inventario detallado en pisos amueblados de gama alta.',
    },
    {
      nombre: 'Malasaña, Chueca y Centro',
      contexto: 'Alta rotación y mezcla habitual/temporal',
      operativa:
        'Revisamos que el contrato refleje uso como vivienda habitual LAU y no confunda régimen turístico. Arras con plazos cortos hasta escritura.',
    },
    {
      nombre: 'Usera, Carabanchel y Vallecas',
      contexto: 'Demanda familiar estable',
      operativa:
        'Arras penitenciales en compraventa entre particulares y alquiler LAU con fianza y devolución explícitas. Pack vendedor para preparar documentación de comunidad.',
    },
    {
      nombre: 'Chamartín y Tetuán',
      contexto: 'Oficinas convertidas y vivienda unifamiliar',
      operativa:
        'Verificación de licencias, estado registral y compatibilidad urbanística antes de redactar arras o reserva de compra.',
    },
    {
      nombre: 'Las Rozas, Pozuelo y Majadahonda',
      contexto: 'Área metropolitana oeste — chalets y adosados',
      operativa:
        'Arras con mención de elementos comunes, garaje y trastero. Due diligence documental en operaciones de mayor ticket.',
    },
    {
      nombre: 'Getafe, Alcorcón y Móstoles',
      contexto: 'Cinturón sur — primer vivienda y inversión',
      operativa:
        'Contratos ágiles para operaciones rápidas con compradores jóvenes. Acompañamiento de compra desde reserva hasta escritura por tarifa fija.',
    },
  ],
  serviciosTitulo: 'Servicios de contratos inmobiliarios en Madrid',
  serviciosIntro:
    'Desde arras en un piso de Guindalera hasta alquiler LAU en Hortaleza: mismo equipo de gestoría, panel de seguimiento y precio cerrado sin comisión sobre el inmueble.',
  faq: [
    {
      q: '¿Los contratos de Inmonest son válidos en toda la Comunidad de Madrid?',
      a: 'Sí. Redactamos para Madrid capital y cualquier municipio de la región. El Código Civil y la LAU son estatales; adaptamos cláusulas a la normativa autonómica de fianzas y documentación exigible.',
    },
    {
      q: '¿Puedo contratar si compro en Getafe pero vivo en otro sitio?',
      a: 'Sí. El servicio es 100% online: subes documentación al panel, tu gestor revisa la nota simple del Registro correspondiente y te entrega el PDF firmable en 48 h.',
    },
    {
      q: '¿Qué diferencia hay entre arras sueltas y el Pack Arras Plus en Madrid?',
      a: 'Las arras (145 €) redactan el contrato de señal. El Pack Plus Comprador (450 €) añade auditoría documental del inmueble; el Pack Vendedor (450 €) prepara la documentación para escriturar sin bloqueos en notaría.',
    },
  ],
  enlaceGestoria: '/gestoria/madrid',
  enlaceArras: '/madrid/contrato-arras',
  enlaceAlquiler: '/madrid/contrato-alquiler',
}

const BARCELONA: ContratosInmobiliariosCiudadConfig = {
  slug: 'barcelona',
  nombre: 'Barcelona',
  region: 'Cataluña',
  metaTitle: 'Contratos inmobiliarios Barcelona | LAU, arras y gestoría',
  metaDescription:
    'Contratos inmobiliarios en Barcelona y área metropolitana: LAU, zonas tensionadas, arras y pack vendedor. Eixample, Gràcia, Sants. Gestoría online desde 61€.',
  keywords:
    'contratos inmobiliarios Barcelona, contrato arras Barcelona, contrato alquiler Barcelona, LAU Cataluña, gestoría inmobiliaria Barcelona particulares',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Barcelona',
  heroLead:
    'Gestoría especializada en compraventa y alquiler en Barcelona ciudad, área metropolitana y Cataluña. Incorporamos matices de zonas tensionadas, fianza INCASÒL e índice de referencia cuando la operación lo exige.',
  heroTags: ['Cataluña', 'Zonas tensionadas', 'INCASÒL', 'Particulares'],
  heroImage: getCiudadImage('barcelona'),
  mercadoTitulo: 'Barcelona: normativa catalana + mercado de alta presión',
  mercadoIntro:
    'En Barcelona las operaciones entre particulares compiten con demanda internacional, pisos turísticos mal clasificados y un marco legal catalán que va más allá de la LAU estatal. Un PDF genérico no distingue vivienda habitual de uso temporal ni refleja límites de actualización de renta en zona tensionada.',
  mercadoCards: [
    {
      titulo: 'Índice de referencia y gran tenedor',
      desc: 'En Eixample, Gràcia o Sant Martí puede aplicarse el marco de mercado tensionado. Redactamos cláusulas conformes a la Ley de Vivienda 2026 y a la normativa catalana vigente.',
    },
    {
      titulo: 'Fianza y depósitos (INCASÒL)',
      desc: 'La fianza legal de una mensualidad tiene reglas propias en Cataluña. El contrato debe indicar plazos, importes y garantías adicionales sin superar topes legales.',
    },
    {
      titulo: 'Compraventa exprés en cinturón',
      desc: 'L’Hospitalet, Badalona, Cornellà o Sant Cugat mueven arras con plazos de 15-30 días. Preparamos contratos en catalán o castellano según preferencia de las partes.',
    },
  ],
  normativaTitulo: 'Particularidades en Cataluña y Barcelona',
  normativaIntro:
    'Más allá del Código Civil estatal, en Barcelona conviene que tu contrato refleje la realidad catalana:',
  normativaPuntos: [
    'Depósito de fianza según normativa catalana (INCASÒL en supuestos aplicables)',
    'Mención de zona de mercado tensionado e índice de referencia de precios cuando proceda',
    'Distinción estricta entre arrendamiento de vivienda habitual y alquiler de temporada — crítico en Born, Barceloneta o Poblenou',
    'Arras penitenciales con cláusulas de desistimiento adaptadas a compraventas con hipoteca en entidades catalanas',
  ],
  barriosTitulo: 'Operativa por barrios en Barcelona y área metropolitana',
  barriosIntro:
    'No redactamos el mismo contrato para un piso de Sarrià que para un local convertido en Sants. Contextualizamos según barrio:',
  barrios: [
    {
      nombre: 'Eixample y Gràcia',
      contexto: 'Zonas de alta demanda y posible mercado tensionado',
      operativa:
        'Alquiler LAU con cláusulas de actualización conformes. Arras en compraventa con plazos cortos y revisión de comunidad de propietarios.',
    },
    {
      nombre: 'Sants, Les Corts y Pedralbes',
      contexto: 'Familias de larga duración y pisos señoriales',
      operativa:
        'Contratos de 5-7 años con prórroga LAU, inventario exhaustivo y fianza correctamente depositada.',
    },
    {
      nombre: 'Poblenou y Sant Martí',
      contexto: 'Renovación urbana y perfiles jóvenes',
      operativa:
        'Revisión de obras en comunidad, licencias de primera ocupación y cláusulas sobre subarriendo o roommates.',
    },
    {
      nombre: 'Gótico, Raval y Born',
      contexto: 'Edificios histórics — habitabilidad y obras',
      operativa:
        'Verificación de cédula de habitabilidad y régimen de protección antes de alquiler o compraventa entre particulares.',
    },
    {
      nombre: 'L’Hospitalet y Badalona',
      contexto: 'Área metropolitana — primer vivienda',
      operativa:
        'Arras accesibles y acompañamiento de compra con tarifa fija. Misma validez jurídica que operaciones en Barcelona capital.',
    },
    {
      nombre: 'Sarrià, Sant Gervasi y Tibidabo',
      contexto: 'Operaciones de ticket alto',
      operativa:
        'Pack Arras Plus Comprador con due diligence: comunidad, derramas, ITE y coherencia registral en fincas señoriales.',
    },
  ],
  serviciosTitulo: 'Contratos inmobiliarios para particulares en Barcelona',
  serviciosIntro:
    'Arras en una finca del Eixample, alquiler en Gràcia o venta sin agencia en Badalona: un gestor conoce tu barrio y tu expediente, no un chatbot de plantillas.',
  faq: [
    {
      q: '¿El contrato puede redactarse en catalán?',
      a: 'Sí, si ambas partes lo prefieren. Por defecto entregamos en castellano; indícanos tu preferencia al contratar y adaptamos el documento.',
    },
    {
      q: '¿Cómo tratáis las zonas tensionadas en Barcelona?',
      a: 'Analizamos si el inmueble está en ámbito de mercado tensionado e incorporamos las menciones legales sobre actualización de renta e índice de referencia cuando la normativa lo exige.',
    },
    {
      q: '¿Sirve para alquilar en L’Hospitalet o Badalona?',
      a: 'Sí. El contrato LAU es válido en todo el área metropolitana y Cataluña. Adaptamos referencias administrativas según municipio.',
    },
  ],
  enlaceGestoria: '/gestoria/barcelona',
  enlaceArras: '/barcelona/contrato-arras',
  enlaceAlquiler: '/barcelona/contrato-alquiler',
}

const VALENCIA: ContratosInmobiliariosCiudadConfig = {
  slug: 'valencia',
  nombre: 'Valencia',
  region: 'Comunitat Valenciana',
  metaTitle: 'Contratos inmobiliarios Valencia | Arras, LAU y gestoría',
  metaDescription:
    'Contratos inmobiliarios en Valencia: arras, alquiler LAU, fianza Generalitat y pack vendedor. Ruzafa, Benimaclet, Ciutat Vella. Desde 61€ para particulares.',
  keywords:
    'contratos inmobiliarios Valencia, contrato arras Valencia, contrato alquiler Valencia, fianza Generalitat, gestoría inmobiliaria Valencia',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Valencia',
  heroLead:
    'Redacción profesional de arras, alquiler LAU y documentación para compradores y vendedores en Valencia ciudad, Horta Nord, Camp de Turia y provincia. Fianza autonómica, cédula de habitabilidad e inventario incluido.',
  heroTags: ['Comunitat Valenciana', 'Fianza Generalitat', 'Particulares', '48h'],
  heroImage: getCiudadImage('valencia'),
  mercadoTitulo: 'Valencia: crecimiento, particulares y normativa valenciana',
  mercadoIntro:
    'Valencia combina uno de los mercados de alquiler más dinámicos de España con compraventa activa entre particulares en Ruzafa, Benimaclet o la Malvarrosa. Aquí la fianza se deposita ante la Generalitat, la cédula de habitabilidad es requisito habitual y muchos compradores llegan de fuera de la Comunitat — el contrato debe ser claro y completo.',
  mercadoCards: [
    {
      titulo: 'Fianza ante la Generalitat Valenciana',
      desc: 'Una mensualidad de fianza mal regulada en el contrato impide recuperar el piso con garantías. Detallamos importe, plazo de ingreso y devolución conforme a la normativa autonómica.',
    },
    {
      titulo: 'Cédula de habitabilidad y registros',
      desc: 'En Ciutat Vella, El Carmen o edificios rehabilitados verificamos coherencia entre estado del inmueble, certificados y lo que se firma en arras o alquiler.',
    },
    {
      titulo: 'Perfil internacional y estudiantes',
      desc: 'Benimaclet, Algirós y la zona universitaria mueven alquileres compartidos. Distinguimos LAU habitual de contratos atípicos y redactamos inventario profesional.',
    },
  ],
  normativaTitulo: 'Qué debe reflejar tu contrato en Valencia',
  normativaIntro:
    'En la Comunitat Valenciana, además de LAU y Ley de Vivienda 2026, prestamos atención a:',
  normativaPuntos: [
    'Depósito de fianza legal ante el organismo autonómico valenciano (Generalitat / AVANT según procedimiento)',
    'Cédula de habitabilidad vigente en arrendamientos de vivienda',
    'Cláusulas de arras con condición de financiación — habitual en compradores que venden en otra CCAA',
    'Inventario de mobiliario como anexo en pisos amueblados de Ruzafa, Cabanyal o Patraix',
  ],
  barriosTitulo: 'Barrios de Valencia donde adaptamos cada contrato',
  barriosIntro:
    'Valencia no es un mercado uniforme: el contrato de un piso en Canovas no es el de un ático en Malvarrosa. Trabajamos con contexto local real:',
  barrios: [
    {
      nombre: 'Ruzafa y Eixample valenciano',
      contexto: 'Alquiler trendy y compraventa entre particulares',
      operativa:
        'LAU con inventario detallado, cláusulas de mascotas y actualización de renta. Arras con plazos ajustados en operaciones competitivas.',
    },
    {
      nombre: 'Benimaclet y Algirós',
      contexto: 'Estudiantes y pisos compartidos',
      operativa:
        'Contratos de habitación o LAU según caso. Normas de convivencia y fianza bien documentada para evitar conflictos al final del curso.',
    },
    {
      nombre: 'Ciutat Vella y El Carmen',
      contexto: 'Edificios históricos y turismo residencial',
      operativa:
        'Revisión de habitabilidad, obras en fachada y distinción clara de uso habitual frente a alquiler temporal no LAU.',
    },
    {
      nombre: 'Patraix y Quatre Carreres',
      contexto: 'Familias y alquiler estable',
      operativa:
        'Contratos de larga duración, devolución de fianza explícita y pack vendedor para quien vende piso heredado sin agencia.',
    },
    {
      nombre: 'Malvarrosa y Cabanyal',
      contexto: 'Rehabilitación costera — plusvalía y licencias',
      operativa:
        'Arras con verificación urbanística. Due diligence en compradores que apuestan por la zona marítima.',
    },
    {
      nombre: 'Mislata, Paterna y Torrent',
      contexto: 'Área metropolitana — primer vivienda',
      operativa:
        'Acompañamiento de compra 687 € fijos desde reserva hasta escritura. Misma validez en provincia de Valencia.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Valencia',
  serviciosIntro:
    'Desde un alquiler en Ruzafa hasta arras en un chalet de Godella: gestor asignado, panel online y entrega en 48 horas laborables.',
  faq: [
    {
      q: '¿Dónde se deposita la fianza en Valencia?',
      a: 'La fianza legal de una mensualidad debe ingresarse ante el organismo autonómico correspondiente en la Comunitat Valenciana. El contrato indica importe, plazo y responsable del depósito.',
    },
    {
      q: '¿Incluís inventario en el contrato de alquiler?',
      a: 'Sí. En alquiler LAU incluimos anexo de inventario y estado del inmueble adaptado a tu piso — especialmente recomendable en amueblados de Ruzafa o Benimaclet.',
    },
    {
      q: '¿Atendéis operaciones en Gandía, Sagunto o la provincia?',
      a: 'Sí. El servicio es online para toda la Comunitat Valenciana. Adaptamos referencias registrales y administrativas al municipio del inmueble.',
    },
  ],
  enlaceGestoria: '/gestoria/valencia',
  enlaceArras: '/valencia/contrato-arras',
  enlaceAlquiler: '/valencia/contrato-alquiler',
}

export const CONTRATOS_INMOBILIARIOS_CIUDADES: Record<
  ContratosInmobiliariosCiudadSlug,
  ContratosInmobiliariosCiudadConfig
> = {
  madrid: MADRID,
  barcelona: BARCELONA,
  valencia: VALENCIA,
}

export const CONTRATOS_INMOBILIARIOS_CIUDAD_SLUGS = Object.keys(
  CONTRATOS_INMOBILIARIOS_CIUDADES,
) as ContratosInmobiliariosCiudadSlug[]

export function getContratosInmobiliariosCiudad(
  slug: string,
): ContratosInmobiliariosCiudadConfig | undefined {
  return CONTRATOS_INMOBILIARIOS_CIUDADES[slug as ContratosInmobiliariosCiudadSlug]
}

export function isContratosInmobiliariosCiudad(slug: string): slug is ContratosInmobiliariosCiudadSlug {
  return slug in CONTRATOS_INMOBILIARIOS_CIUDADES
}

/** Precios referencia para CTAs en landings ciudad */
export const CONTRATOS_CIUDAD_PRECIOS = {
  arras: getPrecioServicio('arras-penitenciales') ?? 145,
  alquiler: getPrecioServicio('contrato-alquiler') ?? 145,
  packVendedor: getPrecioServicio('pack-arras-plus-vendedor') ?? 450,
  compraCompleta: getPrecioServicio('compra-completa-reserva-escritura') ?? 687,
} as const
