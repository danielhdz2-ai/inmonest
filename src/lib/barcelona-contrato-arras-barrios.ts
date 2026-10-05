/**
 * Landings SEO: contrato de arras penitenciales por barrio en Barcelona.
 * Contenido único por zona (mercado compraventa, fiscalidad catalana, perfiles comprador/vendedor).
 */

export type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios-types'
import type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios-types'

const NORMA_ARRAS_CATALUNA: BarcelonaArrasBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Arras penitenciales (Código Civil)',
    contenido:
      'Las arras penitenciales permiten desistir con penalización económica: si el comprador se echa atrás pierde la señal; si el vendedor incumple, devuelve el doble. En Barcelona conviene fijar importe, plazo hasta escritura, identificación del inmueble (referencia catastral) y consecuencias claras — no basta con un WhatsApp o un PDF de internet.',
    bullets: [
      'Importe de señal y forma de pago trazable',
      'Plazo para firma de escritura pública',
      'Penalizaciones simétricas y límites legales',
    ],
  },
  {
    titulo: 'ITP en Cataluña y gastos de compraventa',
    contenido:
      'La compraventa de vivienda en Cataluña tributa por Impuesto de Transmisiones Patrimoniales (ITP) en operaciones entre particulares. El contrato de arras debe ser coherente con el precio final, quién asume honorarios y cómo se documenta la entrega a notaría. Errores habituales: señal sin mencionar condición suspensiva de hipoteca o sin reservar plazo para revisar cargas.',
    bullets: [
      'Coherencia precio arras / precio total',
      'Condición suspensiva de financiación cuando aplica',
      'Reparto orientativo de gastos (notaría, registro, gestoría)',
    ],
  },
  {
    titulo: 'Cédula, ITE y cargas en edificios barceloneses',
    contenido:
      'En muchos edificios del Eixample o del Ensanche la compraventa exige cédula de habitabilidad, certificado energético o ITE según antigüedad y estado. Las arras deben permitir revisar nota simple, estatutos de comunidad y derramas antes de que la señal quede “ciega”. En Cataluña también conviene aclarar idioma del contrato y validez de cláusulas en castellano o catalán.',
    bullets: [
      'Plazo para aportar documentación urbanística',
      'Mención de cargas, hipotecas y usufructos',
      'Cláusulas de resolución si falla la documentación',
    ],
  },
]

import {
  BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA,
  BARCELONA_ARRAS_BARRIOS_EXTRA,
} from '@/lib/barcelona-contrato-arras-barrios-ampliacion'

export const BARCELONA_ARRAS_BARRIO_SLUGS = [
  'eixample',
  'gracia',
  'sants',
  'poblenou',
  'les-corts',
  ...BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA,
] as const

export type BarcelonaArrasBarrioSlug = (typeof BARCELONA_ARRAS_BARRIO_SLUGS)[number]

const BARCELONA_ARRAS_BARRIOS_BASE: Record<
  'eixample' | 'gracia' | 'sants' | 'poblenou' | 'les-corts',
  BarcelonaArrasBarrioConfig
> = {
  eixample: {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    meta: {
      title: 'Señal en finca del Eixample: arras cuando compites con tres compradores',
      description:
        'Arras penitenciales en el Eixample (Dreta, Esquerra, Sant Antoni): derramas en fincas regias, ITE y condición de hipoteca. Redacción propia, 48 h, 145 € IVA incl.',
      keywords: [
        'contrato arras eixample',
        'arras penitenciales eixample barcelona',
        'señal compraventa eixample',
        'contrato arras barcelona eixample',
        'comprar piso eixample arras',
      ],
      ogTitle: 'Eixample: arras penitenciales sin cláusula genérica de “Barcelona”',
      ogDescription:
        'Compraventa en cuadrícula modernista: señal trazable, plazo a notaría y revisión de cargas antes de transferir.',
    },
    hero: {
      badge: 'Cuadrícula modernista · Señal',
      h1: 'Eixample: convierte la prisa de la visita en un contrato de arras que aguanta notaría',
      subtitulo:
        'En el Eixample las operaciones van rápido y compites con más compradores. Unas arras bien redactadas fijan plazo, penalizaciones y condiciones suspensivas antes de entregar miles de euros de señal.',
      anguloComprador:
        'Si reservas un piso en Dreta, Esquerra o Sant Antoni, necesitas cláusula de hipoteca, revisión de cargas en el edificio modernista y plazo realista hasta notaría.',
      anguloVendedor:
        'Si vendes en el Eixample, las arras deben disuadir desistimientos y permitir retener la señal si el comprador no cierra financiación o documentación en plazo.',
    },
    mercado: {
      titulo: 'Mercado de compraventa en el Eixample',
      intro:
        'El Eixample concentra gran parte del stock de vivienda de segunda mano en Barcelona capital: fincas regias, pisos reformados y operaciones con compradores nacionales e internacionales.',
      precioOrientativo:
        'Precios muy heterogéneos (desde ~4.500 €/m² en zonas consolidadas hasta más en fincas premium). La señal suele moverse entre el 5 % y el 10 % del precio pactado.',
      perfilComprador:
        'Familias, teletrabajadores y compradores con hipoteca en tramitación que compiten en visitas con mucha demanda.',
      particularidad:
        'Edificios con protección patrimonial, obras de comunidad costosas e ITE en fincas antiguas: conviene suspender o condicionar arras hasta revisar actas y certificados.',
    },
    normativa: {
      titulo: 'Arras en fincas del Ensanche: lo que suele fallar en Cataluña',
      intro:
        'En el Eixample no basta copiar un modelo estatal: hay que cruzar Código Civil, ITP autonómico y documentación de edificios con protección y obras de fachada.',
      bloques: [
        {
          titulo: 'Derramas y actas antes de la señal',
          contenido:
            'En comunidades con ascensor nuevo o rehabilitación de patrimonio, el comprador descubre deudas aprobadas después de pagar la señal. Las arras deben reservar días hábiles para certificado de deudas y lectura de actas recientes.',
          bullets: ['Plazo para certificado de la comunidad', 'Resolución si la derrama supera un umbral pactado'],
        },
        ...NORMA_ARRAS_CATALUNA.slice(0, 2),
      ],
    },
    contenidoUnico: {
      tituloSeccion: 'Escenario real en Dreta o Esquerra: la señal en caliente',
      lead:
        'Es habitual cerrar visita un sábado y querer “bloquear” el piso el lunes con una transferencia. Sin contrato, el vendedor puede aceptar otra oferta y el comprador solo tiene un justificante bancario difícil de reclamar.',
      escenarioLocal:
        'En operaciones de finca regia, el vendedor exige 30.000 € de señal mientras el comprador aún no tiene tasación. Un contrato bien calendado permite señal parcial inicial y arras penitenciales completas tras aprobación hipotecaria, sin dejar el piso en el aire.',
      erroresEvitados: [
        {
          titulo: 'Señal sin referencia catastral',
          detalle: 'Evitamos descripciones genéricas (“piso en calle X”) que no coinciden con registro y catastro.',
        },
        {
          titulo: 'Plazo imposible de escritura',
          detalle: 'Calendario de 15 días cuando el banco pide 45: fuente de litigio que anticipamos en cláusulas.',
        },
        {
          titulo: 'Mobiliario “de regalo” verbal',
          detalle: 'Anexo de inventario vinculado al contrato de arras para que no desaparezcan electrodomésticos acordados.',
        },
      ],
    },
    blindaje: {
      titulo: 'Qué blindamos en tu contrato (Eixample)',
      intro: 'Redacción personalizada, no plantilla:',
      puntos: [
        {
          titulo: 'Nota simple y cargas',
          texto: 'Revisión registral orientativa antes de cerrar el texto definitivo de arras.',
        },
        {
          titulo: 'Hipoteca y plazos',
          texto: 'Condición suspensiva de financiación con fechas concretas y consecuencias si el banco deniega.',
        },
        {
          titulo: 'Comunidad y derramas',
          texto: 'Cláusulas para conocer deudas de comunidad y obras aprobadas antes de la señal definitiva.',
        },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en el Eixample',
      intro: 'Tu contrato debe cubrir:',
      bullets: [
        'Recuperación de señal si falla hipoteca (cuando se pacte)',
        'Plazo para comprobar cédula, ITE o certificado energético',
        'Identificación exacta del inmueble y anejos (trastero, parking)',
        'Penalización del vendedor si retira el piso del mercado',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en el Eixample',
      intro: 'Protege tu operación con:',
      bullets: [
        'Señal proporcional al precio y calendario hasta escritura',
        'Retención de señal ante desistimiento del comprador',
        'Obligaciones de aportar documentación urbanística en plazo',
        'Cláusulas claras sobre mobiliario y estado del piso',
      ],
    },
    faqs: [
      {
        q: '¿Cuánto suele ser la señal en el Eixample?',
        a: 'Habitualmente entre el 5 % y el 10 % del precio. En pisos muy demandados a veces se pacta señal alta; el contrato debe cuantificarla sin ambigüedad.',
      },
      {
        q: '¿Precio del contrato de arras en el Eixample?',
        a: '145 € IVA incluido en Inmonest, mismo precio en todos los barrios de Barcelona: redacción personalizada y entrega en 48 h.',
      },
    ],
  },

  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    meta: {
      title: 'Gràcia: arras cuando la terraza no está en el registro',
      description:
        'Compraventa en Vila de Gràcia y Camp d’En Grassot: licencias de ampliación, terrazas y señal penitencial con hipoteca. Contrato propio en 48 h (145 €).',
      keywords: [
        'contrato arras gracia barcelona',
        'arras penitenciales gracia',
        'señal compraventa gracia',
        'comprar piso gracia arras',
      ],
      ogTitle: 'Plaza del Sol y alrededores: señal de compravenda con cláusulas de terraza',
      ogDescription: 'Arras en fincas bajas y áticos de Gràcia: urbanismo, ITP y calendario bancario realista.',
    },
    hero: {
      badge: 'Plazas y fincas bajas · Arras',
      h1: 'Gràcia: las arras deben hablar de terrazas, licencias y comunidades pequeñas',
      subtitulo:
        'Gràcia mezcla fincas señoriales, pisos de planta baja y áticos con terraza. Las arras deben reflejar el inmueble real (licencias, terrazas, comunidades pequeñas) y no un modelo genérico de “Barcelona”.',
      anguloComprador:
        'Comprar en Vila de Gràcia o Camp d’En Grassot implica revisar terrazas no declaradas, obras de comunidad en edificios bajos y plazos de hipoteca realistas.',
      anguloVendedor:
        'Vender en Gràcia con arras penitenciales evita que el comprador bloquee el piso meses sin garantía económica clara.',
    },
    mercado: {
      titulo: 'Compraventa en Gràcia',
      intro:
        'Mercado muy residencial, con fuerte demanda local y compradores que buscan barrio de vida, no solo inversión.',
      precioOrientativo:
        'Suelen situarse por encima de la media de Barcelona en zonas céntricas del distrito; la señal depende del precio cerrado en visita.',
      perfilComprador:
        'Parejas jóvenes, familias que ya viven en el barrio y compradores que venden en otra zona para entrar en Gràcia.',
      particularidad:
        'Terrazas, reformas integrales y licencias de obra: las arras conviene condicionarlas a comprobar legalidad de ampliaciones.',
    },
    normativa: {
      titulo: 'Gràcia: urbanismo y arras (más allá del ITP)',
      intro:
        'Aquí los conflictos no vienen solo del banco: vienen de metros cuadrados construidos sin licencia o terrazas ocupadas sin reflejo registral.',
      bloques: [
        {
          titulo: 'Licencias y superficie construida',
          contenido:
            'Antes de entregar señal alta conviene cruzar catastro, registro y certificado urbanístico cuando exista duda sobre ampliaciones en planta baja o ático.',
          bullets: ['Plazo para aportar certificado urbanístico', 'Resolución si la superficie útil no coincide con lo vendido'],
        },
        NORMA_ARRAS_CATALUNA[0],
        NORMA_ARRAS_CATALUNA[1],
      ],
    },
    contenidoUnico: {
      tituloSeccion: 'Por qué en Gràcia la “foto bonita” no basta para firmar arras',
      lead:
        'Muchos pisos se venden por la vida de calle, pero el contrato debe describir metros, terraza y estado registral — no solo la sensación del barrio.',
      escenarioLocal:
        'Comprador enamorado de un ático en Camp d’En Grassot: el vendedor promete terraza comunitaria “de hecho”. Sin cláusula, la señal queda amarrada a un piso distinto del que imaginaba.',
      erroresEvitados: [
        { titulo: 'Terraza verbal', detalle: 'Inventario y descripción registral/catastral alineados.' },
        { titulo: 'Reforma sin licencia', detalle: 'Plazo para que el vendedor aporte licencia o se ajuste precio.' },
        { titulo: 'Comunidad minúscula', detalle: 'Certificado de deudas aunque sean pocos vecinos — obras caras proporcionalmente.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje del contrato en Gràcia',
      intro: 'Incluimos en la redacción:',
      puntos: [
        { titulo: 'Terrazas y anejos', texto: 'Descripción del inmueble acorde a catastro y registro.' },
        { titulo: 'Financiación', texto: 'Calendario bancario creíble para operaciones con hipoteca.' },
        { titulo: 'Resolución', texto: 'Causas de resolución si aparecen cargas ocultas o incumplimiento documental.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Gràcia',
      intro: 'Evita sorpresas después de la señal:',
      bullets: [
        'Condición suspensiva de hipoteca bien calendada',
        'Plazo para revisar comunidad y obras',
        'Cláusulas sobre estado y equipamiento',
        'Penalización clara si el vendedor vende a tercero',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Gràcia',
      intro: 'Arras que te protegen:',
      bullets: [
        'Importe de señal y calendario de escritura',
        'Retención si el comprador desiste sin causa',
        'Obligación de exclusividad durante el plazo pactado',
        'Entrega de docs urbanísticas en fechas concretas',
      ],
    },
    faqs: [
      {
        q: '¿Las arras en Gràcia requieren notario?',
        a: 'No para las arras: valen con firma privada. La escritura definitiva sí es ante notario.',
      },
      {
        q: '¿Mismo precio Inmonest en Gràcia?',
        a: 'Sí, 145 € IVA incluido, redacción personalizada y entrega en 48 h.',
      },
    ],
  },

  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Sants Estació: arras con calendario bancario de verdad',
      description:
        'Señal penitencial en Sants y Hostafrancs: fincas 60-80, ascensor, hipoteca y plazo hasta escritura sin promesas imposibles. 145 €, 48 h.',
      keywords: ['contrato arras sants', 'arras sants barcelona', 'señal compraventa sants'],
      ogTitle: 'Hostafrancs y Sants: convierte la oferta en arras sin pelear con el banco',
      ogDescription: 'Compraventa familiar junto a la estación: suspensiva hipotecaria y señal trazable.',
    },
    hero: {
      badge: 'Sants-Montjuïc · Familias',
      h1: 'Sants: arras pensadas para quien compra con hipoteca y no puede prometer escritura en 20 días',
      subtitulo:
        'Sants combina vivienda de barrio, pisos para familias y operaciones con compradores que priorizan comunicaciones. Las arras deben cuadrar calendario de hipoteca y entrega de llaves con la realidad del trámite bancario.',
      anguloComprador:
        'Si compras cerca de Sants Estació o Hostafrancs, revisa cargas, ascensor y estado de fincas de los años 60-80 antes de entregar señal alta.',
      anguloVendedor:
        'Si vendes en Sants, fija señal y plazos que disuadan al comprador de “congelar” el piso sin compromiso económico.',
    },
    mercado: {
      titulo: 'Mercado en Sants',
      intro: 'Demanda estable de vivienda habitual, con mezcla de reformas y pisos para entrar a vivir.',
      precioOrientativo: 'Precios por m² generalmente por debajo del Eixample; señal habitual 5-10 %.',
      perfilComprador: 'Familias, compradores primera vivienda con hipoteca y traslados laborales.',
      particularidad: 'Fincas con comunidades activas en obras de eficiencia; conviene condicionar arras a ITE o certificados.',
    },
    normativa: {
      titulo: 'Sants: arras e ITE en fincas de los años 70',
      intro: 'En bloques de mediana antigüedad la compraventa choca con ITE pendiente o ascensor en obras — debe quedar en el calendario contractual.',
      bloques: [
        {
          titulo: 'ITE y conservación del edificio',
          contenido:
            'Si la comunidad está tramitando inspección técnica, el comprador puede heredar cuotas elevadas. Reservamos plazo para acta de ITE y reparto de costes ya aprobados.',
          bullets: ['Entrega de último informe disponible', 'Cláusula de ajuste si se aprueba derrama posterior'],
        },
        NORMA_ARRAS_CATALUNA[0],
        NORMA_ARRAS_CATALUNA[1],
      ],
    },
    contenidoUnico: {
      tituloSeccion: 'Operación típica junto a Sants Estació',
      lead:
        'Pareja que vende en Cornellà y compra en Hostafrancs: necesitan alinear venta, hipoteca compra y señal sin quedarse sin piso ni sin depósito.',
      escenarioLocal:
        'El banco pide 40 días desde arras; el vendedor presiona por 25. El contrato fija 45 con preaviso y penalización proporcional, no una guerra de WhatsApps.',
      erroresEvitados: [
        { titulo: 'Fecha de escritura irreal', detalle: 'Calendario negociado con margen para tasación y aprobación.' },
        { titulo: 'Ascensor en obras', detalle: 'Descuento o retención en fianza si el servicio esencial está interrumpido.' },
        { titulo: 'Señal en efectivo', detalle: 'Instrucciones de pago trazables (transferencia, concepto, beneficiario).' },
      ],
    },
    blindaje: {
      titulo: 'Qué incluye la redacción',
      intro: 'Contrato a medida para Sants:',
      puntos: [
        { titulo: 'Hipoteca', texto: 'Suspensiva con fechas y prueba de denegación bancaria.' },
        { titulo: 'Registro', texto: 'Coherencia con nota simple del inmueble.' },
        { titulo: 'Plazos', texto: 'Fecha límite de escritura y efectos del retraso.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Sants',
      intro: 'Protege tu señal:',
      bullets: ['Condición de financiación', 'Revisión de cargas', 'Descripción exacta del piso', 'Penalización por incumplimiento del vendedor'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Sants',
      intro: 'Arras que cierran la operación:',
      bullets: ['Señal penitencial clara', 'Calendario hasta notaría', 'Exclusividad temporal', 'Documentación en plazo'],
    },
    faqs: [
      { q: '¿Puedo firmar arras el mismo día de la visita en Sants?', a: 'Es habitual, pero conviene redactar antes de transferir la señal; nosotros entregamos en 48 h tras recibir datos.' },
      { q: '¿ITP en Sants?', a: 'Tributa como compraventa en Cataluña (ITP); el precio en arras debe coincidir con el de escritura salvo pactos válidos.' },
    ],
  },

  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    meta: {
      title: 'Poblenou / 22@: arras distintas si compras loft o obra nueva',
      description:
        'Señal penitencial entre Diagonal Mar y la Vila Olímpica: IVA vs ITP, licencia de primera ocupación, compradores internacionales. 145 €, 48 h.',
      keywords: ['contrato arras poblenou', 'arras poblenou barcelona', 'comprar piso poblenou arras'],
      ogTitle: 'Loft en 22@: no uses el mismo contrato de arras que una finca del Eixample',
      ogDescription: 'Compraventa en Poblenou con fiscalidad y plazos acordes al tipo de inmueble.',
    },
    hero: {
      badge: '22@ · Lofts y promociones',
      h1: 'Poblenou: el contrato de arras cambia si firmas por un piso usado o por obra entregada por promotor',
      subtitulo:
        'Poblenou concentra lofts, pisos reformados y promociones recientes. Las arras deben distinguir obra nueva (IVA vs ITP), licencias de primera ocupación y arras en operaciones rápidas.',
      anguloComprador:
        'Comprar cerca del 22@ o la Vila Olímpica exige revisar titularidad, cargas y si la operación es obra nueva o segunda mano antes de la señal.',
      anguloVendedor:
        'Vender en Poblenou con demanda internacional: arras en castellano o catalán, plazos y señal que eviten compradores que desisten sin coste.',
    },
    mercado: {
      titulo: 'Compraventa en Poblenou',
      intro: 'Zona en transformación con mix de stock antiguo reconvertido y vivienda nueva.',
      precioOrientativo: 'Rango amplio según calidad de reforma y proximidad al mar; señal negociada caso a caso.',
      perfilComprador: 'Perfiles tech, familias y compradores que buscan vida junto al mar con buena conexión.',
      particularidad: 'Operaciones con inversores y compradores extranjeros: claridad en idioma, plazos y medios de pago de la señal.',
    },
    normativa: {
      titulo: 'Poblenou: IVA, ITP y arras en la misma calle',
      intro: 'En un mismo eje pueden convivir transmisión sujeta a IVA (promotor) y compraventa usada — el contrato debe nombrar el régimen fiscal previsto.',
      bloques: [
        {
          titulo: 'Obra nueva y arras con promotor',
          contenido:
            'Si interviene promotor o vivienda nunca transmitida, el marco no es el de un PDF de “segunda mano”. Ajustamos precio, entregas a cuenta y referencias de licencia.',
          bullets: ['Identificación de sujeto pasivo cuando aplique', 'Plazo para cédula / libro edificio'],
        },
        NORMA_ARRAS_CATALUNA[1],
        NORMA_ARRAS_CATALUNA[2],
      ],
    },
    contenidoUnico: {
      tituloSeccion: 'Tech buyer en Diagonal Mar: señal en euros, contrato en dos idiomas',
      lead:
        'Compradores internacionales suelen pedir arras rápidas en castellano mientras el vendedor prefiere catalán — ambos válidos si el texto es claro y simétrico.',
      escenarioLocal:
        'Loft reconvertido en calle Pere IV: el vendedor declara industrial antigua sin certificar cambio de uso. Las arras suspenden la señal hasta certificado urbanístico favorable.',
      erroresEvitados: [
        { titulo: 'Confundir promoción con reventa', detalle: 'Régimen fiscal y pagos a cuenta descritos sin ambigüedad.' },
        { titulo: 'Señal desde el extranjero', detalle: 'Datos SWIFT, plazos de valor y prueba de transferencia.' },
        { titulo: 'Mobiliario loft', detalle: 'Anexo de instalaciones (cocina americana, climatización) vinculado a arras.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje en Poblenou',
      intro: 'Adaptamos el contrato a:',
      puntos: [
        { titulo: 'Obra nueva vs usada', texto: 'Coherencia fiscal y documental según tipo de operación.' },
        { titulo: 'Hipoteca', texto: 'Plazos realistas para aprobación bancaria.' },
        { titulo: 'Pagos', texto: 'Trazabilidad de la señal (transferencia, plazos).' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Poblenou',
      intro: 'Checklist contractual:',
      bullets: ['Suspensiva hipoteca', 'Revisión registral', 'Plazo documentación urbanística', 'Penalizaciones simétricas'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Poblenou',
      intro: 'Tu operación amarrada:',
      bullets: ['Señal penitencial', 'Fecha escritura', 'Exclusividad', 'Entrega de certificados'],
    },
    faqs: [
      { q: '¿Arras en promoción nueva en Poblenou?', a: 'Sí, pero el marco fiscal y documental cambia; el contrato debe reflejar si es transmisión sujeta a IVA o compraventa usada.' },
      { q: '¿Entrega en 48 h?', a: 'Sí, tras recibir datos de partes e inmueble; precio 145 € IVA incluido.' },
    ],
  },

  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    meta: {
      title: 'Les Corts y Pedralbes: arras con plaza de garaje en el contrato',
      description:
        'Señal penitencial en Les Corts: familias, Zona Universitaria, anejos registrales e hipoteca pausada. Redacción 48 h, 145 € IVA incl.',
      keywords: ['contrato arras les corts', 'arras les corts barcelona', 'señal compraventa les corts'],
      ogTitle: 'Garaje y trastero en Les Corts: que no se pierdan entre arras y escritura',
      ogDescription: 'Compraventa residencial estable: descripción registral completa y plazos bancarios conservadores.',
    },
    hero: {
      badge: 'Pedralbes · Residencial',
      h1: 'Les Corts: arras para operaciones familiares donde el parking vale tanto como una habitación',
      subtitulo:
        'Les Corts es un distrito residencial con fincas amplias y demanda familiar. Las arras deben contemplar plazos de hipoteca conservadores y revisión de comunidades con pocos vecinos pero obras costosas.',
      anguloComprador:
        'Comprar cerca de Pedralbes o la Zona Universitaria implica verificar cargas, parking y estado de fincas de los 70-90.',
      anguloVendedor:
        'Vender en Les Corts: arras que retengan señal si el comprador no cierra financiación en el plazo pactado.',
    },
    mercado: {
      titulo: 'Mercado en Les Corts',
      intro: 'Perfil mayoritariamente de vivienda habitual y familias, con menos rotación especulativa que el centro.',
      precioOrientativo: 'Precios sólidos en zonas como Pedralbes; señal típica 5-10 % del precio.',
      perfilComprador: 'Familias consolidadas, profesionales y compradores que buscan estabilidad barrial.',
      particularidad: 'Viviendas con trastero y plaza de garaje: describir anejos en arras y escritura futura.',
    },
    normativa: {
      titulo: 'Les Corts: anejos registrales y arras',
      intro: 'En operaciones de cierto importe, el garaje tiene vida registral propia — debe aparecer en arras y coherencia con nota simple.',
      bloques: [
        {
          titulo: 'Plaza de parking y trastero',
          contenido:
            'Si el precio global incluye anejos, identificamos fincas registrales vinculadas o transmitidas aparte, evitando sorpresas en notaría.',
          bullets: ['Referencia registral de cada anejo', 'Precio desglosado o global justificado'],
        },
        NORMA_ARRAS_CATALUNA[0],
        NORMA_ARRAS_CATALUNA[1],
      ],
    },
    contenidoUnico: {
      tituloSeccion: 'Familia que baja de Pedralbes interior a Les Corts: una sola señal, dos urgencias',
      lead:
        'Venden y compran en el mismo trimestre: las arras de compra no pueden ignorar que aún no han cobrado la venta anterior.',
      escenarioLocal:
        'Condicionamos la señal de compra a la escritura de venta del piso actual o a hipoteca puente documentada, en lugar de un plazo imposible impuesto por el vendedor.',
      erroresEvitados: [
        { titulo: 'Garaje no incluido en arras', detalle: 'Anejos descritos con registro o descuento explícito.' },
        { titulo: 'Cadena de compraventa', detalle: 'Plazos encadenados con resolución si falla la venta previa.' },
        { titulo: 'Comunidad “tranquila”', detalle: 'Aun con pocos vecinos, certificado de deudas obligatorio.' },
      ],
    },
    blindaje: {
      titulo: 'Contrato blindado Les Corts',
      intro: 'Incluye:',
      puntos: [
        { titulo: 'Anejos', texto: 'Parking y trastero identificados en el contrato.' },
        { titulo: 'Hipoteca', texto: 'Suspensiva y prueba de gestión bancaria.' },
        { titulo: 'Comunidad', texto: 'Plazo para certificado de deudas y obras.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Les Corts',
      intro: 'Tu señal protegida si:',
      bullets: ['Fallo bancario documentado', 'Cargas ocultas aparecen en plazo', 'El vendedor incumple exclusividad', 'La documentación urbanística no cuadra'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Les Corts',
      intro: 'Arras serias para compradores solventes:',
      bullets: ['Señal proporcional', 'Plazo escritura', 'Penalización comprador', 'Entrega docs registrales'],
    },
    faqs: [
      { q: '¿Les Corts es distinto fiscalmente del resto de Barcelona?', a: 'No: misma autoliquidación ITP en Cataluña; cambia el inmueble, no el barrio.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido en todos los barrios, entrega en 48 h.' },
    ],
  },
}

export const BARCELONA_ARRAS_BARRIOS = {
  ...BARCELONA_ARRAS_BARRIOS_BASE,
  ...BARCELONA_ARRAS_BARRIOS_EXTRA,
} as Record<BarcelonaArrasBarrioSlug, BarcelonaArrasBarrioConfig>

export function getBarcelonaArrasBarrio(slug: string): BarcelonaArrasBarrioConfig | undefined {
  if (!(BARCELONA_ARRAS_BARRIO_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARCELONA_ARRAS_BARRIOS[slug as BarcelonaArrasBarrioSlug]
}

export function getBarcelonaArrasBarrioPaths(): string[] {
  return BARCELONA_ARRAS_BARRIO_SLUGS.map((b) => `/barcelona/contrato-arras/${b}`)
}

export function listBarcelonaArrasBarrios(): BarcelonaArrasBarrioConfig[] {
  return BARCELONA_ARRAS_BARRIO_SLUGS.map((s) => BARCELONA_ARRAS_BARRIOS[s])
}
