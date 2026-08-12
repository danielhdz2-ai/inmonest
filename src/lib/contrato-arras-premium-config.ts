import type { ContratoAlquilerPremiumAreaType } from '@/lib/contrato-alquiler-premium-config'

/** Misma forma que alquiler premium para reutilizar patrones de metadata/schema. */
export type ContratoArrasPremiumConfig = {
  slug: string
  nombre: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    ogImageAlt: string
  }
  schema: {
    serviceName: string
    serviceDescription: string
    areaType: ContratoAlquilerPremiumAreaType
    areaName: string
  }
  heroImageAlt: string
  breadcrumbFinal: string
  badgeLine: string
  ctaStickyLabel: string
  introLargo: string
  alertaTitulo: string
  paraQuienTitulo: string
  paraQuien: [string, string, string, string]
  faqs: { q: string; a: string }[]
}

export const CONTRATO_ARRAS_PREMIUM_INCLUDES = [
  'Redacción personalizada con datos reales de las partes',
  'Revisión de nota simple registral del inmueble',
  'Cláusulas de desistimiento y penalización estándar',
  'Condiciones suspensivas (hipoteca, licencias, etc.)',
  'Plazo de firma de escritura pública incluido',
  'Entrega en PDF firmable digitalmente en 48h',
] as const

export const CONTRATO_ARRAS_PREMIUM_PASOS = [
  { num: '01', titulo: 'Solicita el contrato', desc: 'Rellena el formulario con los datos básicos de comprador, vendedor e inmueble. Solo tarda 3 minutos.' },
  { num: '02', titulo: 'Revisión profesional', desc: 'Nuestro equipo de gestoría revisa la nota simple, confirma los datos y redacta el contrato personalizado.' },
  { num: '03', titulo: 'Recibe el documento', desc: 'En menos de 48h tienes el PDF listo para firmar digitalmente. Incluimos guía de firma para ambas partes.' },
] as const

export const CONTRATO_ARRAS_PREMIUM_PRECIO = '145'

const hipotecaFaq = {
  q: '¿Qué pasa si el banco no aprueba la hipoteca?',
  a: 'Nuestro contrato incluye cláusula suspensiva por financiación. Si el banco deniega la hipoteca, el comprador recupera la señal sin penalización cuando así se pacte.',
}

const señalFaq = (nombre: string) => ({
  q: `¿Cuánto suele ser la señal de arras en ${nombre}?`,
  a: 'Habitualmente entre el 5 % y el 10 % del precio de venta. No hay cantidad mínima legal; por debajo del 5 % suele perder fuerza disuasoria.',
})

const tiposFaq = {
  q: '¿Las arras penitenciales son lo mismo que las confirmatorias?',
  a: 'No. Las penitenciales permiten desistir con penalización económica. Las confirmatorias obligan al cumplimiento y abren la puerta a exigir el cumplimiento forzoso.',
}

const notarioFaq = {
  q: '¿Necesito notario para las arras?',
  a: 'No. El contrato de arras es válido con firma privada entre las partes. Solo la escritura de compraventa definitiva requiere notario.',
}

function faqRegion(nombre: string, cobQ: string, cobA: string) {
  return [
    { q: cobQ, a: cobA },
    hipotecaFaq,
    señalFaq(nombre),
    tiposFaq,
    notarioFaq,
  ]
}

function baseMeta(
  nombre: string,
  _slug: string,
  extraDesc: string,
  keywords: string[],
): ContratoArrasPremiumConfig['meta'] {
  return {
    // Sin "| Inmonest": layout.tsx aplica template "%s | Inmonest"
    title: `Contrato de arras ${nombre} desde 145€`,
    description: `Contrato de arras penitenciales en ${nombre} desde 145€, entrega en 48h. ${extraDesc} Redacción profesional, sin plantillas genéricas.`,
    keywords,
    ogTitle: `Contrato de arras ${nombre} desde 145€`,
    ogDescription: `Arras en ${nombre} desde 145€. Entrega en 48h, PDF firmable. Sin plantillas genéricas.`,
    ogImageAlt: `Contrato de arras en ${nombre}`,
  }
}

export const CONTRATO_ARRAS_PREMIUM: Record<string, ContratoArrasPremiumConfig> = {
  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    meta: baseMeta('Bilbao', 'bilbao', 'Bilbao, Getxo, Barakaldo.', [
      'contratar contrato arras Bilbao',
      'comprar contrato arras Bilbao',
      'arras penitenciales País Vasco',
      'precio contrato arras Bizkaia',
    ]),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Bilbao',
      serviceDescription: 'Redacción de contrato de arras para compraventa de inmuebles en Bilbao y País Vasco.',
      areaType: 'City',
      areaName: 'Bilbao',
    },
    heroImageAlt: 'Contrato de arras en Bilbao',
    breadcrumbFinal: 'Contrato de Arras Bilbao',
    badgeLine: 'Compraventa · Bilbao',
    ctaStickyLabel: 'Compraventa · Bilbao',
    introLargo:
      'El contrato de arras penitenciales es el documento precontractual más utilizado en Bilbao y el País Vasco para formalizar la intención de compraventa de un inmueble. Permite a cualquiera de las dos partes desistir del acuerdo: el comprador pierde la señal entregada, y el vendedor debe devolver el doble si es él quien se echa atrás. Esta doble penalización lo convierte en la herramienta de seguridad jurídica más equilibrada del mercado inmobiliario vasco.',
    alertaTitulo: 'Vas a dejar una señal en Bilbao: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Bilbao?',
    paraQuien: [
      'Compradores en Bilbao, Getxo, Barakaldo que quieren reservar un inmueble con garantías',
      'Vendedores en Bizkaia que desean asegurar la operación sin cerrarla definitivamente',
      'Operaciones donde aún quede financiación hipotecaria pendiente de aprobar',
      'Situaciones donde se necesiten semanas para preparar la escritura notarial',
    ],
    faqs: [
      {
        q: '¿El contrato de arras es válido en todo el País Vasco?',
        a: 'Sí, el contrato de arras penitenciales es válido en todo el País Vasco (Bilbao, Vitoria-Gasteiz, Donostia-San Sebastián). Se rige por el Código Civil español.',
      },
      hipotecaFaq,
      señalFaq('Bilbao'),
      tiposFaq,
      notarioFaq,
    ],
  },

  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    meta: baseMeta('Madrid', 'madrid', 'Madrid y Comunidad de Madrid.', ['contrato arras Madrid', 'arras penitenciales Madrid', 'redactar arras Madrid', 'gestoría arras Madrid']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Madrid',
      serviceDescription: 'Redacción de contrato de arras para compraventa en Madrid y Comunidad de Madrid.',
      areaType: 'City',
      areaName: 'Madrid',
    },
    heroImageAlt: 'Contrato de arras en Madrid',
    breadcrumbFinal: 'Contrato de Arras Madrid',
    badgeLine: 'Compraventa · Madrid',
    ctaStickyLabel: 'Compraventa · Madrid',
    introLargo:
      'El contrato de arras penitenciales es el estándar para reservar una compraventa en Madrid y la Comunidad de Madrid. Sin una redacción clara (plazo a escritura, condición de hipoteca, penalización por desistimiento), la señal o el piso pueden quedar en disputa. Te lo preparamos con nota simple revisada y cláusulas a prueba de litigios innecesarios.',
    alertaTitulo: 'Vas a dejar una señal en Madrid: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Madrid?',
    paraQuien: [
      'Compradores en Madrid que necesitan tiempo para la hipoteca o la documentación',
      'Vendedores que quieren garantía real sin cerrar aún la escritura',
      'Operaciones entre particulares o con agencia, con señal acordada',
      'Quien necesita condiciones suspensivas (financiación, datos registrales, etc.)',
    ],
    faqs: faqRegion(
      'Madrid',
      '¿El contrato de arras penitenciales es válido en la Comunidad de Madrid?',
      'Sí. El contrato se rige por el Código Civil y es plenamente válido en Madrid capital y municipios de la región.',
    ),
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    meta: baseMeta('Barcelona', 'barcelona', 'Barcelona y área metropolitana.', ['contrato arras Barcelona', 'arras penitenciales Cataluña', 'redactar arras Barcelona']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Barcelona',
      serviceDescription: 'Contrato de arras para compraventa en Barcelona y Cataluña.',
      areaType: 'City',
      areaName: 'Barcelona',
    },
    heroImageAlt: 'Contrato de arras en Barcelona',
    breadcrumbFinal: 'Contrato de Arras Barcelona',
    badgeLine: 'Compraventa · Barcelona',
    ctaStickyLabel: 'Compraventa · Barcelona',
    introLargo:
      'En Barcelona y el área metropolitana las compraventas suelen ir muy rápido: una señal mal documentada puede costarte la operación o la arras. El contrato de arras penitenciales fija plazo, penalizaciones y, si hace falta, condiciones suspensivas (por ejemplo financiación). Redactamos el tuyo con el mismo rigor que aplicas al precio del piso.',
    alertaTitulo: 'Vas a dejar una señal en Barcelona: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Barcelona?',
    paraQuien: [
      'Compradores que compiten por piso y necesitan reserva seria',
      'Vendedores que no quieren meses de incertidumbre',
      'Operaciones con hipoteca en tramitación',
      'Compraventas de vivienda habitual o segunda residencia en Cataluña',
    ],
    faqs: faqRegion(
      'Barcelona',
      '¿El contrato de arras penitenciales es válido en Cataluña?',
      'Sí, en Barcelona y el resto de Cataluña, según el Código Civil y los pactos reflejados en el contrato.',
    ),
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    meta: baseMeta('Valencia', 'valencia', 'Valencia y Comunitat Valenciana.', ['contrato arras Valencia', 'arras penitenciales Valencia']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Valencia',
      serviceDescription: 'Contrato de arras para compraventa en Valencia y Comunitat Valenciana.',
      areaType: 'City',
      areaName: 'Valencia',
    },
    heroImageAlt: 'Contrato de arras en Valencia',
    breadcrumbFinal: 'Contrato de Arras Valencia',
    badgeLine: 'Compraventa · Valencia',
    ctaStickyLabel: 'Compraventa · Valencia',
    introLargo:
      'En Valencia y la Comunitat Valenciana, las arras penitenciales permiten cuadrar comprador y vendedor con un marco claro: qué pasa si alguien se echa atrás, qué pasa si el banco no entra, y cuándo hay que ir a notario. Evita el "papel del portal" y firma un documento que aguante negociación y tiempo.',
    alertaTitulo: 'Vas a dejar una señal en Valencia: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Valencia?',
    paraQuien: [
      'Compradores que reservan mientras firman hipoteca o venden su vivienda',
      'Vendedores que quieren compromiso real sin escritura inmediata',
      'Operaciones con asesoramiento puntual y precio cerrado',
      'Compraventa de piso en Valencia ciudad o provincia',
    ],
    faqs: faqRegion(
      'Valencia',
      '¿El contrato de arras penitenciales es válido en la Comunitat Valenciana?',
      'Sí. Es válido en Valencia y el resto del territorio valenciano con arreglo al Código Civil.',
    ),
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    meta: baseMeta('Sevilla', 'sevilla', 'Sevilla y Andalucía.', ['contrato arras Sevilla', 'arras penitenciales Andalucía', 'redactar contrato arras Sevilla']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Sevilla',
      serviceDescription: 'Contrato de arras para compraventa en Sevilla y Andalucía.',
      areaType: 'City',
      areaName: 'Sevilla',
    },
    heroImageAlt: 'Contrato de arras en Sevilla',
    breadcrumbFinal: 'Contrato de Arras Sevilla',
    badgeLine: 'Compraventa · Sevilla',
    ctaStickyLabel: 'Compraventa · Sevilla',
    introLargo:
      'En Sevilla y Andalucía el mercado mueve mucha compraventa residencial: las arras penitenciales son la forma habitual de fijar precio y plazo hasta escritura. Nuestro equipo redacta el contrato con cláusulas de desistimiento, doble penitencial donde corresponda y condición de hipoteca para que no te quedes a medias si el banco dice no.',
    alertaTitulo: 'Vas a dejar una señal en Sevilla: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Sevilla?',
    paraQuien: [
      'Compradores que optimizan plazos antes del notario',
      'Vendedores que quieren blindaje frente a compradores poco serios',
      'Operaciones con señal acordada y revisión registral',
      'Compraventa en Sevilla capital o provincia',
    ],
    faqs: faqRegion(
      'Sevilla',
      '¿El contrato de arras penitenciales es válido en Andalucía?',
      'Sí, en Sevilla y el resto de Andalucía. Se aplica el régimen de arras del Código Civil según lo pactado.',
    ),
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    meta: baseMeta('Málaga', 'malaga', 'Málaga y Costa del Sol.', ['contrato arras Málaga', 'arras penitenciales Málaga']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Málaga',
      serviceDescription: 'Contrato de arras para compraventa en Málaga.',
      areaType: 'City',
      areaName: 'Málaga',
    },
    heroImageAlt: 'Contrato de arras en Málaga',
    breadcrumbFinal: 'Contrato de Arras Málaga',
    badgeLine: 'Compraventa · Málaga',
    ctaStickyLabel: 'Compraventa · Málaga',
    introLargo:
      'En Málaga y la Costa del Sol las operaciones suelen ir con prisa pero con riesgo: arras mal redactadas o sin condición de hipoteca pueden dejarte sin margen. El contrato de arras penitenciales que preparamos incluye revisión de nota simple, plazos y penalizaciones claras para comprador y vendedor.',
    alertaTitulo: 'Vas a dejar una señal en Málaga: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Málaga?',
    paraQuien: [
      'Compradores que reservan piso mientras cierran financiación',
      'Vendedores que exigen compromiso serio',
      'Inversores o segundas residencias con operación ágil',
      'Operaciones en Málaga y alrededores',
    ],
    faqs: faqRegion(
      'Málaga',
      '¿El contrato de arras penitenciales es válido en Andalucía?',
      'Sí, en Málaga y el resto de Andalucía, con los pactos reflejados correctamente en el contrato.',
    ),
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    meta: baseMeta('Zaragoza', 'zaragoza', 'Zaragoza y Aragón.', ['contrato arras Zaragoza', 'arras penitenciales Aragón']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Zaragoza',
      serviceDescription: 'Contrato de arras para compraventa en Zaragoza y Aragón.',
      areaType: 'City',
      areaName: 'Zaragoza',
    },
    heroImageAlt: 'Contrato de arras en Zaragoza',
    breadcrumbFinal: 'Contrato de Arras Zaragoza',
    badgeLine: 'Compraventa · Zaragoza',
    ctaStickyLabel: 'Compraventa · Zaragoza',
    introLargo:
      'En Zaragoza y Aragón, las arras penitenciales son el paso previo natural a la escritura: fijan precio, plazo y consecuencias si alguien rompe el acuerdo. Si vas a entregar o cobrar una señal, hazlo con un contrato que deje constancia inequívoca.',
    alertaTitulo: 'Vas a dejar una señal en Zaragoza: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Zaragoza?',
    paraQuien: [
      'Compradores y vendedores en capital o provincia',
      'Quien necesita plazo para hipoteca o documentación',
      'Operaciones entre particulares con transparencia',
      'Reserva de vivienda hasta firma notarial',
    ],
    faqs: faqRegion(
      'Zaragoza',
      '¿El contrato de arras penitenciales es válido en Aragón?',
      'Sí, en Zaragoza y el resto de Aragón. El régimen jurídico es el del Código Civil español.',
    ),
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    meta: baseMeta(
      'Alicante',
      'alicante',
      'Alicante, Elche y Costa Blanca. Compradores internacionales y normativa valenciana.',
      [
        'contrato arras Alicante',
        'arras penitenciales Alicante',
        'redactar arras Elche San Juan',
        'comprar piso particular Alicante arras',
        'señal compra vivienda Costa Blanca',
      ],
    ),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Alicante',
      serviceDescription:
        'Contrato de arras para compraventa en Alicante, Elche y Comunitat Valenciana. Compradores nacionales e internacionales.',
      areaType: 'City',
      areaName: 'Alicante',
    },
    heroImageAlt: 'Contrato de arras en Alicante — Costa Blanca',
    breadcrumbFinal: 'Contrato de Arras Alicante',
    badgeLine: 'Compraventa · Alicante',
    ctaStickyLabel: 'Compraventa · Alicante',
    introLargo:
      'En Alicante y la Costa Blanca las compraventas entre particulares van a menudo con plazos ajustados, compradores extranjeros con NIE en trámite y verificación de cédula de habitabilidad antes de notaría. Las arras penitenciales fijan precio, plazo hasta escritura y consecuencias si alguien rompe el acuerdo — pero solo protegen si están bien redactadas: condición suspensiva de hipoteca, revisión registral y coherencia con la documentación valenciana. No firmes una señal con un PDF genérico descargado de internet.',
    alertaTitulo: 'Vas a dejar una señal en Alicante: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Alicante?',
    paraQuien: [
      'Compradores en Alicante, Elche o San Juan que reservan piso de particular',
      'Vendedores con comprador extranjero que necesita plazos para NIE e hipoteca',
      'Operaciones en Playa de San Juan o centro con cédula de habitabilidad pendiente de verificar',
      'Compraventa en Benidorm, Torrevieja o municipios de la provincia de Alicante',
    ],
    faqs: [
      {
        q: '¿El contrato de arras penitenciales es válido en Alicante y la Comunitat Valenciana?',
        a: 'Sí. Es válido en Alicante, Elche y resto del territorio valenciano según el Código Civil. Lo importante es que las cláusulas reflejen lo pactado: penitencial, plazos, condición de financiación y saneamiento.',
      },
      {
        q: '¿Puedo firmar arras en Alicante si el comprador es extranjero?',
        a: 'Sí, pero conviene incluir plazos para obtener NIE y condición suspensiva de hipoteca si aplica. Muchas operaciones en la Costa Blanca tienen compradores nórdicos o británicos residentes. Tu gestor adapta el contrato.',
      },
      {
        q: '¿Debo verificar la cédula de habitabilidad antes de las arras?',
        a: 'Es muy recomendable. En la Comunitat Valenciana la cédula es obligatoria para la compraventa. Sin ella, la operación puede bloquearse en notaría. Incluimos revisión documental cuando contratas el servicio completo.',
      },
      {
        q: '¿Cuánto cuesta el contrato de arras en Alicante?',
        a: '145€ IVA incluido por contrato de arras penitenciales redactado por gestor inmobiliario experto. Entrega en 48 horas laborables.',
      },
      {
        q: '¿Qué ocurre si el banco deniega la hipoteca después de firmar arras?',
        a: 'Sin cláusula suspensiva de financiación puedes perder la señal. El contrato debe regular qué pasa si la hipoteca no se concede en plazo: devolución íntegra o penalización parcial según lo pactado.',
      },
    ],
  },

  castellon: {
    slug: 'castellon',
    nombre: 'Castellón',
    meta: baseMeta('Castellón', 'castellon', 'Castelló de la Plana y provincia.', ['contrato arras Castellón', 'arras penitenciales Castellón', 'redactar arras Castelló']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Castellón',
      serviceDescription: 'Contrato de arras para compraventa en Castellón y Comunitat Valenciana.',
      areaType: 'City',
      areaName: 'Castellón de la Plana',
    },
    heroImageAlt: 'Contrato de arras en Castellón',
    breadcrumbFinal: 'Contrato de Arras Castellón',
    badgeLine: 'Compraventa · Castellón',
    ctaStickyLabel: 'Compraventa · Castellón',
    introLargo:
      'En Castellón y la provincia, las arras penitenciales son el instrumento habitual para cerrar el compromiso entre comprador y vendedor hasta la escritura. Evita modelos genéricos: aquí importan el plazo, la consignación, la doble penitencial y la condición de hipoteca. Redactamos el contrato con revisión de datos registrales y entrega en 48 h.',
    alertaTitulo: 'Vas a dejar una señal en Castellón: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Castellón?',
    paraQuien: [
      'Compradores en Castelló de la Plana, Benicàssim, Vila-real u otras localidades',
      'Vendedores que quieren asegurar la operación con señal y plazos claros',
      'Operaciones con financiación pendiente de aprobación',
      'Compraventa de vivienda en la provincia de Castellón',
    ],
    faqs: faqRegion(
      'Castellón',
      '¿El contrato de arras penitenciales es válido en Castellón y la Comunitat Valenciana?',
      'Sí. Es aplicable en Castellón y el resto de la Comunitat Valenciana con arreglo al Código Civil y a lo pactado por las partes.',
    ),
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    meta: baseMeta('Murcia', 'murcia', 'Murcia capital y Región de Murcia.', ['contrato arras Murcia', 'arras penitenciales Cartagena', 'redactar arras Región Murcia']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Murcia',
      serviceDescription: 'Contrato de arras para compraventa en Murcia y Región de Murcia.',
      areaType: 'City',
      areaName: 'Murcia',
    },
    heroImageAlt: 'Contrato de arras en Murcia',
    breadcrumbFinal: 'Contrato de Arras Murcia',
    badgeLine: 'Compraventa · Murcia',
    ctaStickyLabel: 'Compraventa · Murcia',
    introLargo:
      'En Murcia y la región, las arras penitenciales ordenan la compraventa cuando aún falta hipoteca o cita notarial. Fijamos plazos, penalizaciones y condiciones suspensivas para que la señal no quede en el aire.',
    alertaTitulo: 'Vas a dejar una señal en Murcia: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Murcia?',
    paraQuien: [
      'Compradores y vendedores en Murcia capital y municipios',
      'Operaciones con señal mientras se tramita financiación',
      'Quien necesita revisión de nota simple y cláusulas claras',
      'Reserva hasta escritura en la Región de Murcia',
    ],
    faqs: faqRegion(
      'Murcia',
      '¿El contrato de arras penitenciales es válido en la Región de Murcia?',
      'Sí, en Murcia y el resto de la región. Se aplica el Código Civil y los pactos del contrato.',
    ),
  },

  palma: {
    slug: 'palma',
    nombre: 'Palma',
    meta: baseMeta('Palma', 'palma', 'Palma e Illes Balears.', ['contrato arras Palma', 'arras penitenciales Mallorca', 'redactar arras Baleares']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Palma',
      serviceDescription: 'Contrato de arras para compraventa en Palma e Illes Balears.',
      areaType: 'City',
      areaName: 'Palma',
    },
    heroImageAlt: 'Contrato de arras en Palma',
    breadcrumbFinal: 'Contrato de Arras Palma',
    badgeLine: 'Compraventa · Palma',
    ctaStickyLabel: 'Compraventa · Palma',
    introLargo:
      'En Palma y las Baleares las compraventas suelen ir rápido; las arras penitenciales permiten amarrar la operación con doble penitencial y plazo a escritura. Lo redactamos con datos reales y revisión registral, listo en 48 h.',
    alertaTitulo: 'Vas a dejar una señal en Palma: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Palma?',
    paraQuien: [
      'Compradores y vendedores en Palma y Mallorca',
      'Operaciones en otras islas con el mismo régimen civil',
      'Quien condiciona la compra a hipoteca o trámites',
      'Reserva seria hasta firma ante notario',
    ],
    faqs: faqRegion(
      'Palma',
      '¿El contrato de arras penitenciales es válido en las Illes Balears?',
      'Sí, en Palma y el resto del archipiélago. Se rige por el Código Civil y lo acordado entre las partes.',
    ),
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    meta: baseMeta('Pamplona', 'pamplona', 'Pamplona y Navarra.', ['contrato arras Pamplona', 'arras penitenciales Navarra']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Pamplona',
      serviceDescription: 'Contrato de arras para compraventa en Pamplona y Navarra.',
      areaType: 'City',
      areaName: 'Pamplona',
    },
    heroImageAlt: 'Contrato de arras en Pamplona',
    breadcrumbFinal: 'Contrato de Arras Pamplona',
    badgeLine: 'Compraventa · Pamplona',
    ctaStickyLabel: 'Compraventa · Pamplona',
    introLargo:
      'En Pamplona y Navarra las arras penitenciales funcionan como en el resto del Estado: compromiso previo con penalizaciones pactadas. Redactamos el tuyo con rigor, plazo a notario y cláusulas que reduzcan interpretaciones dudosas.',
    alertaTitulo: 'Vas a dejar una señal en Pamplona: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Pamplona?',
    paraQuien: [
      'Compradores y vendedores en Iruña-Pamplona',
      'Operaciones en Tudela y resto de Navarra',
      'Hipoteca o trámites pendientes antes de escritura',
      'Compraventa de vivienda con precio cerrado en contrato',
    ],
    faqs: faqRegion(
      'Pamplona',
      '¿El contrato de arras penitenciales es válido en Navarra?',
      'Sí, en Pamplona y el resto de la Comunidad Foral, conforme al Código Civil salvo pactos especiales que deban reflejarse.',
    ),
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    meta: baseMeta('Asturias', 'asturias', 'Oviedo, Gijón, Avilés.', ['contrato arras Asturias', 'arras penitenciales Gijón', 'redactar arras Oviedo']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Asturias',
      serviceDescription: 'Contrato de arras para compraventa en Asturias.',
      areaType: 'State',
      areaName: 'Asturias',
    },
    heroImageAlt: 'Contrato de arras en Asturias',
    breadcrumbFinal: 'Contrato de Arras Asturias',
    badgeLine: 'Compraventa · Asturias',
    ctaStickyLabel: 'Compraventa · Asturias',
    introLargo:
      'En Asturias las compraventas de vivienda siguen el mismo esquema que en el resto de España: arras penitenciales para cuadrar intereses hasta notario. Si vas a firmar, hazlo con plazo de escritura, penalizaciones claras y cláusula de hipoteca si dependes del banco.',
    alertaTitulo: 'Vas a dejar una señal en Asturias: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Asturias?',
    paraQuien: [
      'Compradores y vendedores en Oviedo, Gijón, Avilés y resto del Principado',
      'Operaciones con señal acordada y revisión de nota simple',
      'Quien necesita condiciones suspensivas',
      'Reserva de vivienda hasta escritura pública',
    ],
    faqs: faqRegion(
      'Asturias',
      '¿El contrato de arras penitenciales es válido en todo el Principado de Asturias?',
      'Sí, en toda Asturias. Se aplica el Código Civil español y los pactos recogidos en el contrato.',
    ),
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    meta: baseMeta('A Coruña', 'coruna', 'Coruña, Santiago, Ferrol.', ['contrato arras A Coruña', 'arras penitenciales Galicia']),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en A Coruña',
      serviceDescription: 'Contrato de arras para compraventa en A Coruña y Galicia.',
      areaType: 'City',
      areaName: 'A Coruña',
    },
    heroImageAlt: 'Contrato de arras en A Coruña',
    breadcrumbFinal: 'Contrato de Arras A Coruña',
    badgeLine: 'Compraventa · A Coruña',
    ctaStickyLabel: 'Compraventa · A Coruña',
    introLargo:
      'En A Coruña y Galicia, las arras penitenciales permiten formalizar el compromiso de compraventa antes del notario. Un contrato bien redactado reduce riesgos de interpretación y protege tanto la señal como la continuidad de la operación.',
    alertaTitulo: 'Vas a dejar una señal en A Coruña: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en A Coruña?',
    paraQuien: [
      'Compradores y vendedores en A Coruña y área metropolitana',
      'Operaciones hacia Santiago, Ferrol o otras zonas de Galicia',
      'Quien necesita plazo e hipoteca condicionada',
      'Reserva de inmueble con marco jurídico claro',
    ],
    faqs: faqRegion(
      'A Coruña',
      '¿El contrato de arras penitenciales es válido en Galicia?',
      'Sí, en A Coruña y el resto de Galicia, con sujeción al Código Civil y a lo pactado.',
    ),
  },

  santander: {
    slug: 'santander',
    nombre: 'Santander',
    meta: baseMeta('Santander', 'santander', 'Santander, El Sardinero, Camargo y Cantabria.', [
      'contrato arras Santander',
      'arras penitenciales Cantabria',
      'contrato arras El Sardinero',
      'precio contrato arras Santander',
      'gestoría arras Santander',
    ]),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Santander',
      serviceDescription:
        'Redacción de contrato de arras para compraventa de inmuebles en Santander y Cantabria. Cláusulas de desistimiento, hipoteca y plazo de escritura.',
      areaType: 'City',
      areaName: 'Santander',
    },
    heroImageAlt: 'Contrato de arras en Santander',
    breadcrumbFinal: 'Contrato de Arras Santander',
    badgeLine: 'Compraventa · Santander',
    ctaStickyLabel: 'Compraventa · Santander',
    introLargo:
      'El contrato de arras penitenciales es el documento que más se usa en Santander y Cantabria para reservar una compraventa antes del notario. Da igual si el piso está en el Centro, El Sardinero, Puertochico, Cueto o en Camargo/Torrelavega: la señal (habitualmente 5–10 %) y las cláusulas de desistimiento deben quedar claras. Si el comprador se echa atrás pierde la señal; si lo hace el vendedor, devuelve el doble. Redacción profesional desde 145€, entrega en 48h.',
    alertaTitulo: 'Vas a dejar una señal en Santander: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Santander?',
    paraQuien: [
      'Compradores en Santander (Centro, Sardinero, Cueto) que reservan con garantías',
      'Vendedores en Cantabria que quieren asegurar la operación sin ir aún al notario',
      'Operaciones con hipoteca pendiente de aprobación bancaria',
      'Compraventa en Camargo, Torrelavega, Castro Urdiales o costa cántabra',
    ],
    faqs: faqRegion(
      'Santander',
      '¿El contrato de arras es válido en toda Cantabria?',
      'Sí. Es válido en Santander capital y en el resto de Cantabria. Se rige por el Código Civil español y por lo pactado en el documento (penitenciales, confirmatorias, condiciones suspensivas).',
    ),
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria',
    meta: baseMeta('Vitoria', 'vitoria', 'Vitoria-Gasteiz, Ensanche, Lakua, Zabalgana y Álava.', [
      'contrato arras Vitoria',
      'contrato arras Vitoria-Gasteiz',
      'arras penitenciales Álava',
      'arras País Vasco',
      'precio contrato arras Vitoria',
    ]),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Vitoria-Gasteiz',
      serviceDescription:
        'Contrato de arras para compraventa en Vitoria-Gasteiz y Álava. Señal, desistimiento e hipoteca condicionada.',
      areaType: 'City',
      areaName: 'Vitoria-Gasteiz',
    },
    heroImageAlt: 'Contrato de arras en Vitoria',
    breadcrumbFinal: 'Contrato de Arras Vitoria',
    badgeLine: 'Compraventa · Vitoria',
    ctaStickyLabel: 'Compraventa · Vitoria',
    introLargo:
      'En Vitoria-Gasteiz y Álava las arras penitenciales formalizan la intención de compraventa antes de la escritura. Tanto en el Ensanche como en Lakua, Zabalgana, Salburua o San Martín, un modelo genérico suele olvidar la cláusula de hipoteca, el plazo de notario o la doble penalización. Nosotros lo redactamos a medida desde 145€, en menos de 48h, con el mismo estándar jurídico que en Bilbao y Donostia.',
    alertaTitulo: 'Vas a dejar una señal en Vitoria: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Vitoria?',
    paraQuien: [
      'Compradores en Vitoria-Gasteiz que quieren reservar con seguridad jurídica',
      'Vendedores en Álava (Ensanche, Lakua, Zabalgana, Salburua)',
      'Operaciones con financiación hipotecaria aún pendiente',
      'Quien necesita semanas para preparar la escritura notarial',
    ],
    faqs: faqRegion(
      'Vitoria',
      '¿El contrato de arras es válido en todo el País Vasco?',
      'Sí. Válido en Vitoria-Gasteiz, resto de Álava y en todo el País Vasco (Bilbao, Donostia-San Sebastián). Se aplica el Código Civil y lo pactado en el contrato.',
    ),
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebastián',
    meta: baseMeta('San Sebastián', 'san-sebastian', 'Donostia, Gros, Amara, Antiguo, Irun y Gipuzkoa.', [
      'contrato arras San Sebastián',
      'contrato arras Donostia',
      'arras penitenciales Gipuzkoa',
      'arras País Vasco',
      'precio contrato arras Donostia',
    ]),
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en San Sebastián',
      serviceDescription:
        'Contrato de arras para compraventa en Donostia-San Sebastián y Gipuzkoa. Señal, desistimiento y condiciones de hipoteca.',
      areaType: 'City',
      areaName: 'San Sebastián',
    },
    heroImageAlt: 'Contrato de arras en San Sebastián',
    breadcrumbFinal: 'Contrato de Arras San Sebastián',
    badgeLine: 'Compraventa · San Sebastián',
    ctaStickyLabel: 'Compraventa · Donostia',
    introLargo:
      'En Donostia-San Sebastián y Gipuzkoa las arras penitenciales protegen la señal de compraventa antes del notario. Da igual si el inmueble está en Gros, Amara, Antiguo, Centro o en Irun/Hondarribia: hace falta un contrato claro (porcentaje de señal, desistimiento, hipoteca suspensiva y plazo de escritura). Redacción profesional desde 145€, entrega en 48h — el mismo patrón que ya posiciona en Bilbao.',
    alertaTitulo: 'Vas a dejar una señal en San Sebastián: ¿vas a firmarlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en San Sebastián?',
    paraQuien: [
      'Compradores en Donostia (Gros, Amara, Antiguo, Centro) que reservan con garantías',
      'Vendedores en Gipuzkoa (Irun, Errenteria, Hondarribia) que quieren asegurar la operación',
      'Operaciones con hipoteca pendiente de aprobación',
      'Compraventa en el País Vasco con plazo hasta escritura pública',
    ],
    faqs: faqRegion(
      'San Sebastián',
      '¿El contrato de arras sirve en toda Gipuzkoa y el País Vasco?',
      'Sí. Válido en Donostia-San Sebastián, Irun, Hondarribia, Errenteria y resto de Gipuzkoa, así como en Bilbao y Vitoria. Se rige por el Código Civil español.',
    ),
  },
}

export function getContratoArrasPremiumConfig(slug: string): ContratoArrasPremiumConfig | undefined {
  return CONTRATO_ARRAS_PREMIUM[slug]
}

