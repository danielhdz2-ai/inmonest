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
    meta: {
      title: 'Arras penitenciales Castellón — Grao y Plana desde 145€',
      description:
        'Contrato de arras en Castelló de la Plana y provincia. Benicàssim, Vila-real, señal, hipoteca y nota simple. 145€ IVA incl., entrega 48h. Sin plantilla genérica.',
      keywords: [
        'contrato arras Castellón',
        'arras penitenciales Castelló de la Plana',
        'señal compra piso Castellón',
        'arras compraventa Grao Benicàssim',
        'redactar arras Castellón particular',
        'gestoría arras Comunitat Valenciana',
      ],
      ogTitle: 'Contrato arras Castellón — 145€ con gestor',
      ogDescription: 'Arras en capital, Grao y costa castellonense. Plazo a notaría y cláusula de hipoteca.',
      ogImageAlt: 'Contrato de arras Castellón — Plana y litoral',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Castellón',
      serviceDescription:
        'Arras penitenciales para compraventa en Castelló de la Plana, Benicàssim, Vila-real y provincia. Revisión registral incluida.',
      areaType: 'City',
      areaName: 'Castellón de la Plana',
    },
    heroImageAlt: 'Contrato de arras en Castellón',
    breadcrumbFinal: 'Contrato de Arras Castellón',
    badgeLine: 'Compraventa · Castellón',
    ctaStickyLabel: 'Arras · Castellón',
    introLargo:
      'En Castelló de la Plana y la Plana muchas reservas van de particular a particular: centro, Grao o Benicàssim, a menudo con comprador que viene de Valencia o Barcelona. Las arras penitenciales fijan precio y calendario hasta notaría, pero un Word genérico suele fallar en la señal, la condición de hipoteca y la cédula de habitabilidad que luego exige la Comunitat. Redactamos el contrato con nota simple revisada, plazos realistas y entrega en 48 h por 145€ IVA incluido.',
    alertaTitulo: '¿Vas a entregar señal en Castellón sin cláusula suspensiva de hipoteca?',
    paraQuienTitulo: '¿Para quién es este contrato en Castellón?',
    paraQuien: [
      'Compradores que reservan en capital, Grao o Benicàssim mientras tramitan financiación',
      'Vendedores en Vila-real o litoral que venden sin agencia',
      'Operaciones con comprador de otra provincia que necesita plazo claro a escritura',
      'Reserva seria con doble penitencial y revisión de cargas registrales',
    ],
    faqs: [
      {
        q: '¿Las arras son válidas en toda la provincia de Castellón?',
        a: 'Sí. En Castelló de la Plana, Benicàssim, Vila-real y cualquier municipio castellonense rige el Código Civil. Lo crítico es redactar bien penitencial, importe de señal y plazo a notaría.',
      },
      {
        q: '¿Debo revisar la cédula de habitabilidad antes de las arras?',
        a: 'Es muy recomendable en la Comunitat Valenciana. Podemos orientarte a incluir condición suspensiva sobre documentación exigida para la escritura.',
      },
      hipotecaFaq,
      señalFaq('Castellón'),
      tiposFaq,
      notarioFaq,
    ],
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

  granada: {
    slug: 'granada',
    nombre: 'Granada',
    meta: {
      title: 'Arras penitenciales Granada — Albaicín y Realejo desde 145€',
      description:
        'Contrato de arras en Granada para compraventa entre particulares. Casco histórico, ITE, nota simple y cláusula de hipoteca. 145€, entrega 48h. Sin PDF genérico.',
      keywords: [
        'contrato arras Granada',
        'arras penitenciales Granada',
        'señal compra piso Granada particular',
        'arras Albaicín Realejo',
        'redactar arras Granada nota simple',
        'comprar piso Granada sin agencia arras',
      ],
      ogTitle: 'Arras penitenciales Granada — 145€ con gestor',
      ogDescription: 'Reserva la compraventa en Granada con arras redactadas a medida. ITE y documentación andaluza revisada.',
      ogImageAlt: 'Contrato de arras en Granada — casco y provincia',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Granada',
      serviceDescription:
        'Redacción de arras penitenciales para compraventa en Granada capital, Realejo, Zaidín y área metropolitana. Revisión registral incluida.',
      areaType: 'City',
      areaName: 'Granada',
    },
    heroImageAlt: 'Contrato de arras en Granada',
    breadcrumbFinal: 'Contrato de Arras Granada',
    badgeLine: 'Compraventa · Granada',
    ctaStickyLabel: 'Arras · Granada',
    introLargo:
      'En Granada muchas compraventas van de particular a particular en el Realejo, el Albaicín o Zaidín, con edificios que exigen ITE y licencias coherentes antes de notaría. Firmar arras con un modelo genérico es arriesgado: la señal queda amarrada pero las cláusulas de hipoteca, plazo de escritura o penalización pueden quedar ambiguas. Redactamos arras penitenciales con tus datos reales, revisión de nota simple y condiciones suspensivas cuando dependes del banco. 145€ IVA incluido, PDF en 48h.',
    alertaTitulo: 'Vas a entregar señal en Granada: ¿el contrato protege la ITE y la hipoteca?',
    paraQuienTitulo: '¿Para quién es este contrato en Granada?',
    paraQuien: [
      'Compradores que reservan piso en casco histórico o Zaidín mientras tramitan hipoteca',
      'Vendedores particulares que quieren doble penitencial clara y plazo a notaría',
      'Operaciones en Armilla, Churriana o municipios del área metropolitana',
      'Quien compra sin agencia y necesita arras equilibradas antes del notario granadino',
    ],
    faqs: [
      {
        q: '¿Las arras son válidas en Granada y provincia?',
        a: 'Sí. En Granada capital y provincia rige el Código Civil. Lo determinante es que el contrato recoja tipo de arras, importe, plazo y consecuencias del desistimiento.',
      },
      {
        q: '¿Debo revisar ITE o licencias antes de las arras en el Albaicín?',
        a: 'Es muy recomendable. En edificios antiguos o protegidos conviene incluir condición suspensiva sobre documentación técnica. Podemos orientarte al redactar el contrato.',
      },
      hipotecaFaq,
      señalFaq('Granada'),
      tiposFaq,
      notarioFaq,
    ],
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    meta: {
      title: 'Arras compraventa Salamanca — universidad y casco desde 145€',
      description:
        'Contrato de arras penitenciales en Salamanca para pisos de particulares. Mercado universitario, casco UNESCO, cláusula hipoteca. 145€, 48h.',
      keywords: [
        'contrato arras Salamanca',
        'arras penitenciales Salamanca',
        'señal compra piso Salamanca',
        'arras compraventa casco Salamanca',
        'comprar piso particular Salamanca arras',
        'gestoría arras Castilla y León',
      ],
      ogTitle: 'Arras penitenciales Salamanca — 145€',
      ogDescription: 'Arras para compraventa en Salamanca: Plaza Mayor, Gran Vía y barrios universitarios. Redacción profesional.',
      ogImageAlt: 'Contrato de arras Salamanca',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Salamanca',
      serviceDescription: 'Arras penitenciales para compraventa en Salamanca y provincia. Particulares y mercado universitario.',
      areaType: 'City',
      areaName: 'Salamanca',
    },
    heroImageAlt: 'Contrato de arras en Salamanca',
    breadcrumbFinal: 'Contrato de Arras Salamanca',
    badgeLine: 'Compraventa · Salamanca',
    ctaStickyLabel: 'Arras · Salamanca',
    introLargo:
      'Salamanca mezcla compradores locales, familias castellanas y operaciones ligadas al campus (San Bernardo, El Rollo, Garrido). Las arras penitenciales son el paso habitual antes de escritura, pero un Word descargado no suele regular bien la señal cuando el comprador viene de Madrid, la hipoteca tarda o el piso está en edificio histórico del casco. Preparamos el contrato con plazos realistas, penalizaciones pactadas y revisión de nota simple. Precio cerrado 145€.',
    alertaTitulo: '¿Vas a dejar señal en Salamanca con un contrato copiado de internet?',
    paraQuienTitulo: '¿Para quién es este contrato en Salamanca?',
    paraQuien: [
      'Compradores que reservan piso cerca de la USAL o en centro histórico',
      'Vendedores que venden sin inmobiliaria y quieren compromiso firme del comprador',
      'Operaciones entre particulares en Villamayor, Carbajosa o área metropolitana',
      'Quien necesita cláusula suspensiva de financiación antes de ir al notario',
    ],
    faqs: [
      {
        q: '¿Cuánto suele ser la señal de arras en Salamanca?',
        a: 'Habitualmente entre el 5 % y el 10 % del precio. En operaciones universitarias o de segunda residencia conviene dejarlo escrito con claridad para evitar disputas.',
      },
      {
        q: '¿El contrato vale en toda la provincia de Salamanca?',
        a: 'Sí, en capital y provincia. Se aplica el Código Civil y lo pactado entre comprador y vendedor.',
      },
      hipotecaFaq,
      tiposFaq,
      notarioFaq,
    ],
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    meta: {
      title: 'Arras penitenciales Valladolid — Delicias y centro desde 145€',
      description:
        'Contrato de arras en Valladolid para compraventa entre particulares. Parquesol, Delicias, hipoteca y nota simple. 145€ IVA incl., 48h.',
      keywords: [
        'contrato arras Valladolid',
        'arras penitenciales Valladolid',
        'señal compra vivienda Valladolid',
        'arras compraventa Parquesol',
        'comprar piso Valladolid particular',
        'gestoría arras Castilla y León Valladolid',
      ],
      ogTitle: 'Contrato arras Valladolid — 145€ con revisión registral',
      ogDescription: 'Arras penitenciales en Valladolid: plazo a escritura, doble penitencial y condición de hipoteca.',
      ogImageAlt: 'Contrato de arras Valladolid',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Valladolid',
      serviceDescription: 'Arras para compraventa en Valladolid y provincia. Mercado accesible y compradores desde Madrid.',
      areaType: 'City',
      areaName: 'Valladolid',
    },
    heroImageAlt: 'Contrato de arras en Valladolid',
    breadcrumbFinal: 'Contrato de Arras Valladolid',
    badgeLine: 'Compraventa · Valladolid',
    ctaStickyLabel: 'Arras · Valladolid',
    introLargo:
      'Valladolid atrae compradores desde Madrid y operaciones familiares en Delicias, Parquesol, La Victoria o Rondilla. Las arras penitenciales fijan precio y calendario hasta notaría, pero solo protegen si el texto refleja lo acordado: importe de la señal, plazo, cargas registrales y qué pasa si el banco dice no. Redactamos el contrato con gestor inmobiliario, nota simple revisada y entrega en 48 horas.',
    alertaTitulo: 'Señal en Valladolid: ¿tu contrato de arras tiene cláusula de hipoteca?',
    paraQuienTitulo: '¿Para quién es este contrato en Valladolid?',
    paraQuien: [
      'Compradores que reservan piso mientras esperan aprobación hipotecaria',
      'Vendedores particulares en capital o Laguna de Duero',
      'Operaciones con comprador que viene de otra provincia',
      'Reserva seria con penalizaciones claras para ambas partes',
    ],
    faqs: [
      {
        q: '¿Las arras penitenciales son válidas en Valladolid y provincia?',
        a: 'Sí, en toda la provincia de Valladolid. El régimen es el del Código Civil; lo crítico es redactar bien penitencial vs confirmatoria y plazos.',
      },
      {
        q: '¿Puedo firmar arras en Valladolid si compro desde Madrid?',
        a: 'Sí. El contrato privado es válido con firma de las partes. Podemos redactarlo 100 % online y orientarte sobre la escritura en notaría vallisoletana.',
      },
      hipotecaFaq,
      señalFaq('Valladolid'),
      tiposFaq,
      notarioFaq,
    ],
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    meta: {
      title: 'Arras compraventa Mallorca — Palma e isla desde 145€',
      description:
        'Contrato de arras penitenciales en Mallorca para particulares. Palma, Calvià, compradores no residentes, hipoteca y plazos baleares. 145€, 48h.',
      keywords: [
        'contrato arras Mallorca',
        'arras penitenciales Palma',
        'señal compra piso Baleares',
        'arras compraventa Mallorca particular',
        'redactar arras Calvià Palma',
        'comprar piso Mallorca arras',
      ],
      ogTitle: 'Arras penitenciales Mallorca — 145€',
      ogDescription: 'Arras en Mallorca con plazo a escritura notarial balear y revisión registral. Ideal compradores peninsulares.',
      ogImageAlt: 'Contrato de arras Mallorca',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Mallorca',
      serviceDescription: 'Arras para compraventa en Mallorca, Palma y municipios de la isla. Compradores residentes y no residentes.',
      areaType: 'State',
      areaName: 'Mallorca',
    },
    heroImageAlt: 'Contrato de arras en Mallorca',
    breadcrumbFinal: 'Contrato de Arras Mallorca',
    badgeLine: 'Compraventa · Mallorca',
    ctaStickyLabel: 'Arras · Mallorca',
    introLargo:
      'En Mallorca las operaciones suelen mezclar plazos cortos, compradores no residentes y documentación balear (cédula d’habitabilitat, cargas, comunidad). Las arras penitenciales amarran la señal hasta la escritura en notaría, pero un modelo peninsular genérico no siempre refleja plazos realistas ni condiciones si la hipoteca se tramita fuera de la isla. Redactamos arras con datos reales, revisión de nota simple y cláusulas suspensivas. 145€, entrega en 48h.',
    alertaTitulo: '¿Firmas arras en Mallorca sin revisar cargas y plazos notariales?',
    paraQuienTitulo: '¿Para quién es este contrato en Mallorca?',
    paraQuien: [
      'Compradores peninsulares que reservan piso en Palma o Calvià',
      'Vendedores particulares en la isla que quieren señal con doble penitencial clara',
      'Operaciones con hipoteca en trámite o NIE en curso',
      'Reserva hasta escritura en notaría balear con condiciones escritas',
    ],
    faqs: [
      {
        q: '¿Las arras son válidas en Mallorca y resto de Baleares?',
        a: 'Sí. Rigen el Código Civil y lo pactado. La escritura definitiva se firma ante notario; las arras son el compromiso previo con penalización económica si alguien se echa atrás.',
      },
      {
        q: '¿Puedo hacer el trámite desde la península?',
        a: 'Sí. Recopilamos datos online, redactamos el PDF firmable y te orientamos sobre documentación habitual en compraventa balear.',
      },
      hipotecaFaq,
      señalFaq('Mallorca'),
      tiposFaq,
      notarioFaq,
    ],
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    meta: {
      title: 'Arras compraventa Asturias — Oviedo y Gijón desde 145€',
      description:
        'Contrato de arras penitenciales en Asturias. Oviedo, Gijón, Avilés, humedades en casco, hipoteca y nota simple. 145€, PDF en 48h.',
      keywords: [
        'contrato arras Asturias',
        'arras penitenciales Gijón',
        'señal compra piso Oviedo',
        'arras Cimadevilla Avilés',
        'comprar piso Asturias particular arras',
        'redactar arras Principado Asturias',
      ],
      ogTitle: 'Arras penitenciales Asturias — 145€',
      ogDescription: 'Reserva compraventa en Oviedo, Gijón o litoral con cláusulas equilibradas y revisión registral.',
      ogImageAlt: 'Contrato de arras en Asturias',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Asturias',
      serviceDescription:
        'Arras para compraventa en Oviedo, Gijón, Avilés y municipios del Principado. Edificios de piedra e ITE.',
      areaType: 'State',
      areaName: 'Asturias',
    },
    heroImageAlt: 'Contrato de arras en Asturias',
    breadcrumbFinal: 'Contrato de Arras Asturias',
    badgeLine: 'Compraventa · Asturias',
    ctaStickyLabel: 'Arras · Asturias',
    introLargo:
      'En Gijón (Cimadevilla, La Calzada), Oviedo o Avilés muchas compraventas son entre particulares en bloques con humedades, obras en fachada o comunidad pendiente. Las arras penitenciales amarran precio y plazo hasta notaría, pero solo protegen si el texto refleja la señal, la hipoteca y qué pasa si la documentación técnica no cuadra. Redactamos contrato a medida con gestor inmobiliario y nota simple revisada: 145€ IVA incluido, entrega en 48 h.',
    alertaTitulo: 'Señal en Asturias: ¿tu arras contempla obras en comunidad o ITE?',
    paraQuienTitulo: '¿Para quién es este contrato en Asturias?',
    paraQuien: [
      'Compradores que reservan en casco histórico o marítimo mientras piden hipoteca',
      'Vendedores en Oviedo, Gijón o Langreo que venden sin inmobiliaria',
      'Operaciones con segunda residencia en litoral (Llanes, Ribadesella)',
      'Quien necesita condición suspensiva por estado del inmueble o cargas registrales',
    ],
    faqs: [
      {
        q: '¿El contrato de arras vale en todo el Principado?',
        a: 'Sí, en Oviedo, Gijón, Avilés, Mieres, Siero y cualquier municipio asturiano. Rige el Código Civil y lo pactado entre las partes.',
      },
      {
        q: '¿Conviene revisar humedades o ITE antes de firmar arras en el casco?',
        a: 'Sí, especialmente en edificios antiguos. Podemos incluir condición suspensiva sobre informe técnico o deudas de comunidad.',
      },
      hipotecaFaq,
      señalFaq('Asturias'),
      tiposFaq,
      notarioFaq,
    ],
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
    meta: {
      title: 'Arras penitenciales Santander — Sardinero y UC desde 145€',
      description:
        'Contrato de arras en Santander y Cantabria. El Sardinero, Pereda, señal 5-10%, hipoteca y plazo a notaría. 145€ IVA incl., 48h.',
      keywords: [
        'contrato arras Santander',
        'arras penitenciales Cantabria',
        'señal compra piso El Sardinero',
        'arras compraventa Santander particular',
        'contrato arras Cueto Camargo',
        'gestoría arras Cantabria',
      ],
      ogTitle: 'Contrato arras Santander — 145€',
      ogDescription: 'Arras en bahía, centro o área metropolitana cántabra. Revisión registral y cláusula de financiación.',
      ogImageAlt: 'Contrato de arras Santander — bahía y centro',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Santander',
      serviceDescription:
        'Arras penitenciales en Santander, El Sardinero, Camargo y Cantabria. Compradores desde Madrid o País Vasco.',
      areaType: 'City',
      areaName: 'Santander',
    },
    heroImageAlt: 'Contrato de arras en Santander',
    breadcrumbFinal: 'Contrato de Arras Santander',
    badgeLine: 'Compraventa · Santander',
    ctaStickyLabel: 'Arras · Santander',
    introLargo:
      'Santander mezcla compraventa familiar en Cuatro Caminos, segunda residencia en El Sardinero y operaciones con comprador que llega desde fuera de Cantabria. Las arras penitenciales son el paso habitual antes del notario: señal del 5–10 %, doble penitencial y plazo a escritura. Un modelo descargado no suele regular bien la hipoteca ni el calendario cuando el banco tarda. Preparamos el contrato con gestor, nota simple y entrega en 48 h por 145€.',
    alertaTitulo: '¿Reservas en la bahía con arras sin plazo claro a notaría cántabra?',
    paraQuienTitulo: '¿Para quién es este contrato en Santander?',
    paraQuien: [
      'Compradores en Centro, Sardinero o Cueto que esperan aprobación hipotecaria',
      'Vendedores en Cantabria que quieren compromiso firme sin comisión de agencia',
      'Operaciones en Camargo, Torrelavega o Castro Urdiales entre particulares',
      'Reserva con penalizaciones equilibradas para comprador y vendedor',
    ],
    faqs: [
      {
        q: '¿El contrato de arras es válido en toda Cantabria?',
        a: 'Sí, en Santander capital y cualquier municipio cántabro. Se aplica el Código Civil y lo pactado sobre penitencial, señal y plazos.',
      },
      {
        q: '¿Puedo firmar arras en Santander si compro desde otra comunidad?',
        a: 'Sí. Redactamos 100 % online; el contrato privado es válido con firma de las partes hasta la escritura en notaría.',
      },
      hipotecaFaq,
      señalFaq('Santander'),
      tiposFaq,
      notarioFaq,
    ],
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria',
    meta: {
      title: 'Arras compraventa Vitoria — Ensanche y Lakua desde 145€',
      description:
        'Contrato de arras penitenciales en Vitoria-Gasteiz y Álava. Salburua, Zabalgana, señal, hipoteca suspensiva. 145€, entrega 48h.',
      keywords: [
        'contrato arras Vitoria-Gasteiz',
        'arras penitenciales Álava',
        'señal compra piso Vitoria',
        'arras Ensanche Lakua',
        'comprar piso Vitoria particular arras',
        'arras País Vasco Álava',
      ],
      ogTitle: 'Arras penitenciales Vitoria — 145€',
      ogDescription: 'Reserva compraventa en capital alavesa con doble penitencial y revisión de nota simple.',
      ogImageAlt: 'Contrato de arras Vitoria-Gasteiz',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en Vitoria-Gasteiz',
      serviceDescription:
        'Arras para compraventa en Vitoria-Gasteiz, Lakua, Salburua y provincia de Álava.',
      areaType: 'City',
      areaName: 'Vitoria-Gasteiz',
    },
    heroImageAlt: 'Contrato de arras en Vitoria',
    breadcrumbFinal: 'Contrato de Arras Vitoria',
    badgeLine: 'Compraventa · Vitoria',
    ctaStickyLabel: 'Arras · Vitoria',
    introLargo:
      'Vitoria-Gasteiz es un mercado residencial estable: Ensanche, Lakua, Salburua y Zabalgana mueven compraventa entre particulares con plazos razonables pero exigentes en documentación. Las arras penitenciales fijan la señal y el camino a notaría; si faltan hipoteca suspensiva, plazo o doble penalización, el conflicto llega cuando ya hay dinero en juego. Redactamos contrato alineado con el estándar que usamos en Bilbao y Donostia: 145€, PDF en 48 h, nota simple revisada.',
    alertaTitulo: '¿Firmas arras en Álava sin la misma rigurosidad que en Bizkaia?',
    paraQuienTitulo: '¿Para quién es este contrato en Vitoria?',
    paraQuien: [
      'Compradores en Ensanche o Lakua que reservan mientras el banco estudia la operación',
      'Vendedores en Álava que enajenan sin agencia con señal clara',
      'Operaciones en Llodio o Rioja Alavesa entre familias',
      'Quien quiere semanas pactadas hasta escritura en notaría vitoriana',
    ],
    faqs: [
      {
        q: '¿El contrato vale en todo el País Vasco?',
        a: 'Sí. Válido en Vitoria-Gasteiz, Álava, Bizkaia y Gipuzkoa. Rige el Código Civil y los pactos sobre penitencial y plazos.',
      },
      {
        q: '¿Puedo redactar el contrato en euskera?',
        a: 'Sí, si ambas partes lo prefieren. Por defecto entregamos en castellano; indícalo al contratar.',
      },
      hipotecaFaq,
      señalFaq('Vitoria-Gasteiz'),
      tiposFaq,
      notarioFaq,
    ],
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebastián',
    meta: {
      title: 'Arras penitenciales Donostia — Gros y Parte Vieja desde 145€',
      description:
        'Contrato de arras en San Sebastián (Donostia) y Gipuzkoa. Gros, señal en mercado premium, hipoteca y plazo a notaría. 145€, 48h.',
      keywords: [
        'contrato arras San Sebastián',
        'arras penitenciales Donostia',
        'señal compra piso Gros',
        'arras compraventa Gipuzkoa',
        'contrato arras Parte Vieja',
        'gestoría arras País Vasco Donostia',
      ],
      ogTitle: 'Contrato arras Donostia — 145€',
      ogDescription: 'Arras en mercado de ticket alto: cláusulas equilibradas y revisión registral.',
      ogImageAlt: 'Contrato de arras San Sebastián — Gros y centro',
    },
    schema: {
      serviceName: 'Contrato de Arras Penitenciales en San Sebastián',
      serviceDescription:
        'Arras penitenciales en Donostia-San Sebastián, Gros, Antiguo e Irun. Mercado de precios elevados.',
      areaType: 'City',
      areaName: 'San Sebastián',
    },
    heroImageAlt: 'Contrato de arras en San Sebastián',
    breadcrumbFinal: 'Contrato de Arras San Sebastián',
    badgeLine: 'Compraventa · Donostia',
    ctaStickyLabel: 'Arras · Donostia',
    introLargo:
      'En Donostia un piso en Gros o el Centro puede mover señales de varios miles de euros: las arras penitenciales no son un trámite menor. Hace falta porcentaje de señal claro, doble penitencial, condición suspensiva de hipoteca y plazo realista hasta notaría guipuzcoana. Un PDF genérico deja ambiguo quién pierde qué si el banco dice no o si el vendedor recibe otra oferta. Redactamos contrato a medida con revisión de nota simple: 145€ IVA incluido, entrega en 48 h.',
    alertaTitulo: '¿Entregas señal en Gros con un contrato copiado de Bizkaia sin adaptar plazos?',
    paraQuienTitulo: '¿Para quién es este contrato en San Sebastián?',
    paraQuien: [
      'Compradores en Gros, Amara o Antiguo que compiten en un mercado tensionado',
      'Vendedores en Gipuzkoa (Irun, Hondarribia) que venden sin agencia',
      'Operaciones con financiación pendiente y ticket elevado',
      'Reserva con due diligence registral antes de entregar la señal',
    ],
    faqs: [
      {
        q: '¿El contrato sirve en toda Gipuzkoa y el País Vasco?',
        a: 'Sí. Válido en Donostia, Irun, Eibar, Bilbao y Vitoria. Se aplica el Código Civil y lo pactado en el documento.',
      },
      {
        q: '¿La señal suele ser mayor en San Sebastián que en otras ciudades?',
        a: 'El porcentaje legal no cambia (habitual 5–10 %), pero el importe en euros es mayor por el precio del m². Conviene dejarlo escrito con precisión.',
      },
      hipotecaFaq,
      señalFaq('San Sebastián'),
      tiposFaq,
      notarioFaq,
    ],
  },
}

export function getContratoArrasPremiumConfig(slug: string): ContratoArrasPremiumConfig | undefined {
  return CONTRATO_ARRAS_PREMIUM[slug]
}

