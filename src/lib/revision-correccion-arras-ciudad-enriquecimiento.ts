import type { LandingsCiudadPremiumSlug } from '@/lib/landings-ciudad-premium'

export type RevisionArrasCiudadEnriquecimiento = {
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: { h1: string; lead: string; badge?: string }
  mercadoIntro: string
  alerta: { titulo: string; texto: string }
  riesgosLocales: string[]
  faqs: { q: string; a: string }[]
  gestorBio?: string
}

export const REVISION_ARRAS_ENRIQUECIMIENTO: Record<
  LandingsCiudadPremiumSlug,
  RevisionArrasCiudadEnriquecimiento
> = {
  madrid: {
    meta: {
      title: 'Revisar contrato de arras en Madrid antes de la señal — 120€',
      description:
        'Revisión de arras penitenciales en Madrid: plazo a notaría, hipoteca, penalizaciones y nota simple. Borrador corregido. 120€ IVA incl. Compra entre particulares.',
      keywords:
        'revision contrato arras madrid, revisar arras madrid, corregir señal compra piso madrid',
      ogTitle: 'Revisión arras Madrid — antes de firmar',
      ogDescription: 'Evita cláusulas del vendedor o agencia en Madrid. Gestor online.',
    },
    hero: {
      badge: 'Comunidad de Madrid · plazos cortos',
      h1: 'Revisión de arras en Madrid: no firmes la señal sin leer la letra pequeña',
      lead:
        'En Madrid muchas arras se firman en 48–72 horas con borrador del vendedor o de la agencia del otro lado. Revisamos penitencial, importe de señal, condición suspensiva de hipoteca y plazo realista hasta notaría madrileña.',
    },
    mercadoIntro:
      'Capital con tickets altos y competencia entre compradores. Un error en arras (doble penitencial mal calculada, falta de condición de cargas o plazo imposible para hipoteca) cuesta miles antes de llegar al notario.',
    alerta: {
      titulo: 'Señal entregada sin condición de financiación',
      texto:
        'Si no hay cláusula suspensiva clara y el banco deniega la hipoteca, puedes perder la señal o enfrentarte a penalización desproporcionada. En Madrid lo vemos a diario en compras entre particulares.',
    },
    riesgosLocales: [
      'Arras redactadas solo por el vendedor con penalización a favor del comprador desequilibrada',
      'Plazo a escritura incompatible con tramitación hipotecaria en bancos saturados',
      'Referencia catastral o finca registral que no coincide con el anuncio',
      'Omisión de derrama o ITE pendiente en edificios del centro',
    ],
    faqs: [
      {
        q: '¿Revisáis arras hechas por otra inmobiliaria?',
        a: 'Sí. Analizamos el borrador que te envíen, sean particulares o agencia, y te devolvemos observaciones y corrección si contratas el servicio completo.',
      },
      {
        q: '¿Válido en Móstoles, Alcalá o Getafe?',
        a: 'Sí, operaciones en área metropolitana con mismo marco legal estatal.',
      },
      {
        q: '¿Cuánto tarda la revisión?',
        a: 'Habitualmente 48 h laborables desde que recibimos el documento.',
      },
    ],
  },

  barcelona: {
    meta: {
      title: 'Revisión arras Barcelona — cláusulas catalanas antes de la señal',
      description:
        'Revisión contrato arras en Barcelona y área metropolitana. ITP, plusvalía, idioma y condiciones. 120€. Gestor inmobiliario online.',
      keywords: 'revision arras barcelona, revisar contrato señal barcelona, arras penitenciales cataluna',
      ogTitle: 'Revisión arras Barcelona',
      ogDescription: 'Arras en Cataluña revisadas por gestor antes de firmar.',
    },
    hero: {
      badge: 'Cataluña · INCASÒL en LAU posterior',
      h1: 'Revisión de arras en Barcelona: compraventa catalana con cláusulas trampa',
      lead:
        'En Barcelona es frecuente recibir arras en castellano con referencias incorrectas a normativa catalana o cláusulas sobre estado del inmueble poco claras. Revisamos antes de entregar señal en Eixample, Sant Martí o área metropolitana.',
    },
    mercadoIntro:
      'Mercado tensionado, compradores internacionales y vendedores que presionan plazos. Las arras deben cuadrar con nota simple, cédula y expectativas de ITP autonómico.',
    alerta: {
      titulo: 'Arras sin mención de cargas o comunidad',
      texto:
        'En edificios con obras aprobadas en Barcelona, firmar arras sin revisar actas puede obligarte a comprar con derrama pendiente de miles de euros.',
    },
    riesgosLocales: [
      'Cláusulas sobre licencia de primera ocupación o ITE en edificios antiguos',
      'Plazo a escritura demasiado corto para due diligence',
      'Penitencial confirmatoria mal tipificada',
      'Textos bilingües con contradicciones',
    ],
    faqs: [
      {
        q: '¿Revisáis arras en Badalona o Sabadell?',
        a: 'Sí, compraventa en Cataluña con adaptación al inmueble.',
      },
      {
        q: '¿Podéis corregir el borrador?',
        a: 'Sí, el servicio incluye revisión y entrega de versión corregida lista para firmar.',
      },
      {
        q: '¿Necesito abogado aparte?',
        a: 'Somos gestoría inmobiliaria especializada en contratos de compraventa entre particulares; para casos muy litigiosos te indicamos cuándo escalar.',
      },
    ],
  },

  valencia: {
    meta: {
      title: 'Revisión arras Valencia — señal en Comunitat Valenciana 120€',
      description:
        'Revisar contrato de arras en Valencia, Ruzafa o litoral. Cédula, AVANT y plazo a notaría. Corrección incluida. Online.',
      keywords: 'revision arras valencia, revisar señal compra valencia, arras penitenciales valencia',
      ogTitle: 'Revisión arras Valencia',
      ogDescription: 'No firmes arras en la Comunitat sin revisión.',
    },
    hero: {
      badge: 'AVANT · cédula habitabilidad',
      h1: 'Revisión de arras en Valencia: señal con plazo a notaría valenciana',
      lead:
        'En Valencia muchas reservas van de particular a particular en pocos días. Revisamos arras penitenciales, condición de hipoteca y coherencia con documentación exigida en notaría valenciana (cédula, energético, comunidad).',
    },
    mercadoIntro:
      'Crecimiento de precios y compradores de Madrid u otras CCAA. Las arras genéricas suelen olvidar condiciones sobre registro turístico o estado de la vivienda en zona costera.',
    alerta: {
      titulo: 'Arras sin condición sobre cédula de habitabilidad',
      texto:
        'Comprar en Valencia sin cédula vigente puede bloquear escritura. Conviene condición suspensiva en arras o due diligence previa.',
    },
    riesgosLocales: [
      'Confusión entre vivienda habitual y uso turístico en arras de playa',
      'Señal desproporcionada respecto al precio',
      'Plazo incompatible con aprobación hipotecaria',
      'Datos registrales erróneos en finca costera',
    ],
    faqs: [
      {
        q: '¿Revisáis en Gandía o Castellón?',
        a: 'Sí, Comunitat Valenciana; también tenemos landings específicas por ciudad.',
      },
      {
        q: '¿Pack con due diligence?',
        a: 'Puedes combinar revisión arras con pack due diligence 350€ si aún no has firmado.',
      },
      {
        q: '¿120€ incluye corrección?',
        a: 'Sí, revisión y contrato corregido según servicio contratado.',
      },
    ],
  },

  sevilla: {
    meta: {
      title: 'Revisión arras Sevilla — revisar señal antes de Triana o Nervión',
      description:
        'Revisión contrato arras en Sevilla. Andalucía, plazo a notaría, hipoteca. 120€ IVA incl. Compra directa entre particulares.',
      keywords: 'revision arras sevilla, revisar contrato arras sevilla',
      ogTitle: 'Revisión arras Sevilla',
      ogDescription: 'Arras andaluzas revisadas online.',
    },
    hero: {
      badge: 'Andalucía · AVRA en LAU',
      h1: 'Revisión de arras en Sevilla: compraventa rápida sin cláusulas abusivas',
      lead:
        'Sevilla mantiene operaciones ágiles y precios moderados, pero las arras copiadas de internet fallan en penitencial, hipoteca y referencia al inmueble en casco o Nervión.',
    },
    mercadoIntro:
      'Muchas compraventas sin agencia. El ahorro en comisión no debe convertirse en pérdida de señal por un borrador mal redactado.',
    alerta: {
      titulo: 'Modelo Word de arras sin nota simple',
      texto: 'Firmar sin contrastar titular registral y cargas es el error más frecuente en Sevilla entre particulares.',
    },
    riesgosLocales: [
      'ITE en edificios históricos del centro',
      'Plusvalía municipal mal reflejada en calendario',
      'Arras confirmatorias cuando conviene penitenciales',
      'Falta de datos del vendedor para ITP',
    ],
    faqs: [
      {
        q: '¿Operaciones en Dos Hermanas?',
        a: 'Sí, provincia de Sevilla.',
      },
      {
        q: '¿Redactáis arras nuevas si no hay borrador?',
        a: 'Sí, desde 145€ arras penitenciales; revisión es para borrador existente.',
      },
      {
        q: '¿Plazo revisión?',
        a: '48 h laborables habitual.',
      },
    ],
  },

  malaga: {
    meta: {
      title: 'Revisión arras Málaga — señal Costa del Sol y capital 120€',
      description:
        'Revisar arras en Málaga, Marbella o capital. Compradores extranjeros, hipoteca, plazos. Gestor andaluz online.',
      keywords: 'revision arras malaga, revisar señal compra malaga, arras costa del sol',
      ogTitle: 'Revisión arras Málaga',
      ogDescription: 'Arras en mercado en máximos — revisión obligatoria.',
    },
    hero: {
      badge: 'Costa del Sol · compradores EU',
      h1: 'Revisión de arras en Málaga: señal en mercado caliente y normativa VFT',
      lead:
        'Málaga concentra compradores internacionales y plazos agresivos. Revisamos arras antes de transferir señal: penitencial, hipoteca, cargas y que no mezclen vivienda turística con compraventa habitual.',
    },
    mercadoIntro:
      'Tickets altos en coastal y presión para cerrar. Un error en arras aquí duele más que la comisión de agencia que te ahorras.',
    alerta: {
      titulo: 'Arras en inglés sin traducción clara de penitencial',
      texto: 'Compradores extranjeros firman sin entender doble señal o penalizaciones. Revisamos y aclaramos cláusulas críticas.',
    },
    riesgosLocales: [
      'Vivienda con historial turístico no declarado',
      'Plazos irreales por competencia entre compradores',
      'Referencia a junta andaluza mal redactada',
      'Señal en cuenta sin identificar concepto jurídico',
    ],
    faqs: [
      {
        q: '¿Marbella y Estepona?',
        a: 'Sí, provincia de Málaga.',
      },
      {
        q: '¿Due diligence recomendada?',
        a: 'Muy recomendable en Málaga por precio y cargas ocultas; pack 350€.',
      },
      {
        q: '¿Corrección incluida?',
        a: 'Sí en servicio revisión + corrección 120€.',
      },
    ],
  },

  bilbao: {
    meta: {
      title: 'Revisión arras Bilbao — señal en Bizkaia antes de notaría',
      description:
        'Revisión contrato arras Bilbao y área. Régimen foral, hipoteca, plazo escritura. 120€ online.',
      keywords: 'revision arras bilbao, revisar arras bizkaia',
      ogTitle: 'Revisión arras Bilbao',
      ogDescription: 'Arras revisadas en mercado estable de Bizkaia.',
    },
    hero: {
      badge: 'Bizkaia · operaciones sobrias',
      h1: 'Revisión de arras en Bilbao: compraventa foral con plazos realistas',
      lead:
        'En Bilbao las operaciones suelen ser serias pero el borrador de arras puede venir desequilibrado. Revisamos penitencial, condición de financiación y coherencia registral en Abando, Indautxu o Getxo.',
    },
    mercadoIntro:
      'Menos frenesí que en costa, pero tickets relevantes y edificios con ITE pendiente en ensanche.',
    alerta: {
      titulo: 'Penalización desproporcionada al comprador',
      texto: 'Cláusulas que solo penalizan al comprador por hipoteca denegada son frecuentes en borradores copiados.',
    },
    riesgosLocales: [
      'Nota simple desactualizada',
      'Plazo corto en mercado con tasaciones lentas',
      'Arras sin identificar si penitenciales o confirmatorias',
      'Obras de comunidad no reflejadas',
    ],
    faqs: [
      {
        q: '¿Donostia es distinta?',
        a: 'Mismo marco; tenemos landing específica San Sebastián.',
      },
      {
        q: '¿Online?',
        a: '100 % online con gestor asignado.',
      },
      {
        q: '¿Y si ya firmé?',
        a: 'Podemos revisar posición y orientar; mejor antes de transferir señal.',
      },
    ],
  },

  zaragoza: {
    meta: {
      title: 'Revisión arras Zaragoza — revisar señal en Aragón 120€',
      description:
        'Revisión arras penitenciales Zaragoza. Compra entre particulares, hipoteca, plazo notaría. Corrección 48h.',
      keywords: 'revision arras zaragoza, revisar contrato arras zaragoza',
      ogTitle: 'Revisión arras Zaragoza',
      ogDescription: 'Arras en capital aragonesa revisadas.',
    },
    hero: {
      badge: 'Aragón · tickets accesibles',
      h1: 'Revisión de arras en Zaragoza: señal en mercado ágil entre particulares',
      lead:
        'Zaragoza mueve muchas compraventas directas con arras en pocos días. Revisamos importe de señal, plazo a escritura y condición suspensiva de hipoteca antes de que transfieras.',
    },
    mercadoIntro:
      'Precios accesibles no implican bajo riesgo: una señal mal perdida duele igual.',
    alerta: {
      titulo: 'Arras sin plazo claro a notaría',
      texto: 'Sin fecha tope, el vendedor puede presionar o el comprador quedar indefinido legalmente.',
    },
    riesgosLocales: [
      'Borradores genéricos de internet',
      'Finca registral errónea en ACTUR',
      'Falta condición sobre cargas',
      'Señal en metálico sin recibo claro',
    ],
    faqs: [
      {
        q: '¿Huesca o Teruel?',
        a: 'Operaciones en Aragón; foco Zaragoza capital y área.',
      },
      {
        q: '¿Redactáis arras nuevas?',
        a: 'Sí, 145€ arras penitenciales desde cero.',
      },
      {
        q: '¿Precio revisión?',
        a: '120€ IVA incluido revisión + corrección.',
      },
    ],
  },

  alicante: {
    meta: {
      title: 'Revisión arras Alicante — señal Costa Blanca 120€',
      description:
        'Revisar arras en Alicante, San Juan o Elche. Compradores extranjeros, hipoteca, cédula. Gestor online.',
      keywords: 'revision arras alicante, revisar señal alicante',
      ogTitle: 'Revisión arras Alicante',
      ogDescription: 'Arras en Costa Blanca revisadas.',
    },
    hero: {
      badge: 'Costa Blanca · extranjeros',
      h1: 'Revisión de arras en Alicante: señal con comprador internacional o local',
      lead:
        'Alicante concentra operaciones con compradores fuera de la provincia. Revisamos arras penitenciales, plazo a notaría alicantina y condiciones sobre cédula y comunidad en Playa de San Juan o centro.',
    },
    mercadoIntro:
      'Alta rotación y segundas residencias. Arras mal redactadas en costa suelen omitir uso turístico previo o derramas.',
    alerta: {
      titulo: 'Arras sin revisar registro turístico',
      texto: 'Comprar vivienda con historial de uso vacacional sin reflejarlo puede generar conflictos posteriores.',
    },
    riesgosLocales: [
      'Cédula de habitabilidad no mencionada',
      'Plazo corto en temporada alta de compras',
      'Señal desproporcionada',
      'Titular registral distinto del vendedor en sala',
    ],
    faqs: [
      {
        q: '¿Torrevieja?',
        a: 'Sí, provincia de Alicante.',
      },
      {
        q: '¿Pack arras + documental?',
        a: 'Consulta pack arras plus comprador en gestoría.',
      },
      {
        q: '¿48h?',
        a: 'Sí, habitual online.',
      },
    ],
  },

  castellon: {
    meta: {
      title: 'Revisión arras Castellón — señal Grao y Plana 120€',
      description:
        'Revisar contrato arras Castelló de la Plana, Benicàssim o Vila-real. Plazo notaría, hipoteca, AVANT. 120€ online.',
      keywords: 'revision arras castellon, revisar señal castellon, arras castello plataforma',
      ogTitle: 'Revisión arras Castellón',
      ogDescription: 'Arras castellonenses revisadas antes de firmar.',
    },
    hero: {
      badge: 'Plana · Grao · cerámica',
      h1: 'Revisión de arras en Castellón: señal en mercado de plazos cortos',
      lead:
        'En Castellón es habitual firmar arras en días con comprador que viene de Valencia o Barcelona. Revisamos penitencial, condición de hipoteca y coherencia con nota simple antes de entregar señal en Grao o capital.',
    },
    mercadoIntro:
      'Compraventa rápida entre particulares en litoral y industria ceramicista. Los Word genéricos fallan en plazo a notaría castellonense.',
    alerta: {
      titulo: 'Arras sin condición sobre financiación',
      texto: 'En operaciones con entrada + hipoteca, la condición suspensiva mal redactada es el principal motivo de conflicto.',
    },
    riesgosLocales: [
      'Referencia incorrecta al Registro de Castellón',
      'Señal sin identificar penitencial',
      'Omisión de cargas en pisos de Grao',
      'Plazo incompatible con tasación bancaria',
    ],
    faqs: [
      {
        q: '¿Benicàssim y Vila-real?',
        a: 'Sí, toda la provincia.',
      },
      {
        q: '¿Redactáis arras en Castellón?',
        a: 'Sí, /castellon/contrato-arras desde 145€.',
      },
      {
        q: '¿Due diligence?',
        a: '350€ recomendable si no revisaste documentación aún.',
      },
    ],
    gestorBio:
      'En Castellón reviso arras con foco en plazos cortos típicos de la Plana: hipoteca, penitencial y datos registrales del Grao y litoral.',
  },

  murcia: {
    meta: {
      title: 'Revisión arras Murcia — revisar señal Región de Murcia',
      description:
        'Revisión arras Murcia capital y Cartagena. 120€. Plazo escritura, hipoteca, cargas. Online.',
      keywords: 'revision arras murcia, revisar señal murcia',
      ogTitle: 'Revisión arras Murcia',
      ogDescription: 'Arras murcianas revisadas.',
    },
    hero: {
      badge: 'Murcia · Cartagena',
      h1: 'Revisión de arras en Murcia: señal en mercado accesible y rápido',
      lead:
        'Murcia mueve operaciones directas con arras en pocos días. Revisamos borrador antes de transferir: penitencial, plazo a notaría y condición de hipoteca.',
    },
    mercadoIntro:
      'Tickets moderados pero errores de arras igual de costosos en conflictos entre particulares.',
    alerta: {
      titulo: 'Copiar arras de otra operación',
      texto: 'Cada inmueble tiene cargas distintas; reutilizar modelo sin adaptar es riesgo alto.',
    },
    riesgosLocales: [
      'Nota simple omitida',
      'Plazo vago',
      'Penalizaciones desequilibradas',
      'Datos vendedor incompletos para ITP',
    ],
    faqs: [
      {
        q: '¿Lorca?',
        a: 'Sí, Región de Murcia.',
      },
      {
        q: '¿Corrección?',
        a: 'Incluida en servicio 120€.',
      },
      {
        q: '¿Online?',
        a: 'Sí.',
      },
    ],
  },

  palma: {
    meta: {
      title: 'Revisión arras Palma — señal Baleares e IBAVI 120€',
      description:
        'Revisar arras Palma de Mallorca. Normativa balear, compradores internacionales, plazo notaría. 120€.',
      keywords: 'revision arras palma, revisar señal palma mallorca',
      ogTitle: 'Revisión arras Palma',
      ogDescription: 'Arras en Illes Balears revisadas.',
    },
    hero: {
      badge: 'IBAVI · zona tensionada',
      h1: 'Revisión de arras en Palma: señal en mercado insular regulado',
      lead:
        'Palma combina tickets altos y normativa balear específica. Revisamos arras penitenciales, plazo a notaría y cláusulas sobre estado del inmueble antes de la señal en Santa Catalina o Ensanche.',
    },
    mercadoIntro:
      'Compradores nacionales e internacionales. Arras en castellano o inglés requieren revisión de penitencial y condiciones.',
    alerta: {
      titulo: 'Arras sin mencionar licencia turística previa',
      texto: 'En Baleares el uso ETV previo del inmueble puede afectar a la operación; debe quedar claro en documentación.',
    },
    riesgosLocales: [
      'Plazo corto vs hipoteca en banco insular',
      'Cédula d’habitabilitat no condicionada',
      'Penitencial mal calculada en euros',
      'Confusión titular registral en herencias',
    ],
    faqs: [
      {
        q: '¿Menorca e Ibiza?',
        a: 'Sí, Illes Balears.',
      },
      {
        q: '¿Contratos bilingües?',
        a: 'Revisamos versiones en varios idiomas.',
      },
      {
        q: '¿Arras nuevas?',
        a: 'Desde 145€ redacción en /palma/contrato-arras.',
      },
    ],
  },

  mallorca: {
    meta: {
      title: 'Revisión arras Mallorca — señal isla antes de notaría 120€',
      description:
        'Revisión contrato arras Mallorca (Palma, Calvià, Manacor). 120€. Hipoteca, penitencial, cargas.',
      keywords: 'revision arras mallorca, revisar señal mallorca',
      ogTitle: 'Revisión arras Mallorca',
      ogDescription: 'Arras en la isla revisadas online.',
    },
    hero: {
      badge: 'Calvià · Manacor · fincas',
      h1: 'Revisión de arras en Mallorca: compraventa insular con plazos reales',
      lead:
        'En Mallorca las operaciones entre particulares incluyen fincas y pisos con compradores de fuera. Revisamos arras antes de señal: penitencial, hipoteca, cargas y calendario hasta notaría balear.',
    },
    mercadoIntro:
      'Escasez de stock y precios elevados aumentan la presión para firmar arras sin leer.',
    alerta: {
      titulo: 'Señal alta sin due diligence',
      texto: 'En tickets altos, combinar revisión arras con due diligence 350€ es la combinación más segura.',
    },
    riesgosLocales: [
      'Herencias con varios titulares',
      'Obras ilegales no reflejadas',
      'Arras confirmatorias mal elegidas',
      'Plazo imposible por tasación',
    ],
    faqs: [
      {
        q: '¿Mismo servicio que Palma?',
        a: 'Sí, marco balear; landing /mallorca/contrato-arras.',
      },
      {
        q: '¿Extranjeros?',
        a: 'Revisamos cláusulas frecuentes en compradores EU/UK.',
      },
      {
        q: '¿48h?',
        a: 'Sí.',
      },
    ],
  },

  pamplona: {
    meta: {
      title: 'Revisión arras Pamplona — señal Navarra 120€',
      description:
        'Revisar arras Pamplona y Navarra. Foral, hipoteca, plazo. 120€ online.',
      keywords: 'revision arras pamplona, revisar señal navarra',
      ogTitle: 'Revisión arras Pamplona',
      ogDescription: 'Arras navarras revisadas.',
    },
    hero: {
      badge: 'Navarra · foral',
      h1: 'Revisión de arras en Pamplona: señal en capital navarra',
      lead:
        'Pamplona mueve compraventas directas con arras estándar desequilibradas. Revisamos penitencial, financiación y plazo a notaría pamplonesa.',
    },
    mercadoIntro:
      'Mercado estable; el riesgo está en borradores genéricos, no en volatilidad de precio.',
    alerta: {
      titulo: 'Arras sin identificar comprador y vendedor con NIF correcto',
      texto: 'Errores de identificación retrasan ITP y escritura.',
    },
    riesgosLocales: [
      'Plazo vago',
      'Penalización solo al comprador',
      'Nota simple antigua',
      'Falta condición cargas',
    ],
    faqs: [
      {
        q: '¿Estella?',
        a: 'Sí, Navarra.',
      },
      {
        q: '¿Corrección?',
        a: 'Incluida.',
      },
      {
        q: '¿Online?',
        a: '100 %.',
      },
    ],
  },

  granada: {
    meta: {
      title: 'Revisión arras Granada — señal Albaicín y PTS 120€',
      description:
        'Revisión arras Granada capital y provincia. Universidad, turismo residencial. 120€.',
      keywords: 'revision arras granada, revisar señal granada',
      ogTitle: 'Revisión arras Granada',
      ogDescription: 'Arras granadinas revisadas.',
    },
    hero: {
      badge: 'Albaicín · UGR · PTS',
      h1: 'Revisión de arras en Granada: señal en casco histórico y periferia',
      lead:
        'Granada mezcla compradores locales y de otras provincias. Revisamos arras penitenciales, hipoteca y cargas en edificios antiguos del centro o PTS.',
    },
    mercadoIntro:
      'Muchas operaciones entre particulares en mercado universitario y turístico residencial.',
    alerta: {
      titulo: 'Arras en pisos del Albaicín sin ITE',
      texto: 'Edificios antiguos pueden tener requerimientos técnicos; conviene condición o due diligence.',
    },
    riesgosLocales: [
      'Protección patrimonial mal reflejada',
      'Plazo corto',
      'Señal en efectivo sin trazabilidad',
      'Penitencial mal tipificada',
    ],
    faqs: [
      {
        q: '¿Motril?',
        a: 'Sí, provincia.',
      },
      {
        q: '¿Arras nuevas?',
        a: '/granada/contrato-arras 145€.',
      },
      {
        q: '¿48h revisión?',
        a: 'Sí.',
      },
    ],
  },

  salamanca: {
    meta: {
      title: 'Revisión arras Salamanca — señal casco y universidad 120€',
      description:
        'Revisar arras Salamanca. Compra entre particulares, hipoteca. 120€ online.',
      keywords: 'revision arras salamanca, revisar señal salamanca',
      ogTitle: 'Revisión arras Salamanca',
      ogDescription: 'Arras salmantinas revisadas.',
    },
    hero: {
      badge: 'USAL · Castilla y León',
      h1: 'Revisión de arras en Salamanca: señal en mercado universitario',
      lead:
        'Salamanca mueve compraventas de pisos para inversión o residencia con arras rápidas. Revisamos borrador antes de señal en casco o San José.',
    },
    mercadoIntro:
      'Operaciones entre familias y particulares; borradores copiados son frecuentes.',
    alerta: {
      titulo: 'Arras sin plazo tras arras penitenciales',
      texto: 'Sin fecha tope a escritura, el comprador queda expuesto a incertidumbre.',
    },
    riesgosLocales: [
      'Casco histórico: cargas y protección',
      'Hipoteca lenta en bancos pequeños',
      'Datos registrales',
      'Penalizaciones',
    ],
    faqs: [
      {
        q: '¿Valladolid cercana?',
        a: 'Landings separadas; mismo equipo.',
      },
      {
        q: '¿Due diligence?',
        a: '350€ recomendable en casco.',
      },
      {
        q: '¿120€?',
        a: 'Revisión + corrección IVA incl.',
      },
    ],
  },

  valladolid: {
    meta: {
      title: 'Revisión arras Valladolid — señal Delicias y Rondilla 120€',
      description:
        'Revisión arras Valladolid. 120€. Hipoteca, plazo notaría, cargas.',
      keywords: 'revision arras valladolid, revisar señal valladolid',
      ogTitle: 'Revisión arras Valladolid',
      ogDescription: 'Arras revisadas en Valladolid.',
    },
    hero: {
      badge: 'UVA · Castilla y León',
      h1: 'Revisión de arras en Valladolid: señal en mercado castellano directo',
      lead:
        'Valladolid concentra compraventas entre particulares con arras en días. Revisamos penitencial, condición de hipoteca y plazo a notaría.',
    },
    mercadoIntro:
      'Precios accesibles y traslados desde Madrid; igual necesitas revisión profesional.',
    alerta: {
      titulo: 'Arras del banco del vendedor',
      texto: 'A veces el borrador favorece solo al vendedor; equilibramos cláusulas críticas.',
    },
    riesgosLocales: [
      'Plazo imposible',
      'Nota simple',
      'Señal desproporcionada',
      'Falta condición financiación',
    ],
    faqs: [
      {
        q: '¿Medina?',
        a: 'Sí, provincia.',
      },
      {
        q: '¿Arras nuevas?',
        a: '145€ redacción.',
      },
      {
        q: '¿Online?',
        a: 'Sí.',
      },
    ],
  },

  coruna: {
    meta: {
      title: 'Revisión arras A Coruña — señal Orzán y puerto 120€',
      description:
        'Revisar arras A Coruña y Galicia. 120€. Plazo, hipoteca, cargas marítimas.',
      keywords: 'revision arras coruna, revisar señal a coruna',
      ogTitle: 'Revisión arras A Coruña',
      ogDescription: 'Arras coruñesas revisadas.',
    },
    hero: {
      badge: 'Galicia · UDC',
      h1: 'Revisión de arras en A Coruña: señal en ciudad portuaria',
      lead:
        'A Coruña mueve operaciones directas con arras estándar. Revisamos penitencial, hipoteca y coherencia registral en Orzán, Ensanche o Ferrol.',
    },
    mercadoIntro:
      'Mercado atlántico con operaciones familiares y entre particulares.',
    alerta: {
      titulo: 'Arras sin revisar comunidad en edificios altos',
      texto: 'Derramas pendientes son frecuentes en ensanche coruñés.',
    },
    riesgosLocales: [
      'ITE gallega',
      'Plazo tasación',
      'Penitencial',
      'Titular registral',
    ],
    faqs: [
      {
        q: '¿Santiago?',
        a: 'Operaciones gallegas; foco Coruña.',
      },
      {
        q: '¿Corrección?',
        a: 'Incluida.',
      },
      {
        q: '¿48h?',
        a: 'Sí.',
      },
    ],
  },

  asturias: {
    meta: {
      title: 'Revisión arras Asturias — señal Oviedo, Gijón o Avilés 120€',
      description:
        'Revisión arras Asturias. 120€. Compra particular, hipoteca, ITE.',
      keywords: 'revision arras oviedo, revisar arras gijon asturias',
      ogTitle: 'Revisión arras Asturias',
      ogDescription: 'Arras en Principado revisadas.',
    },
    hero: {
      badge: 'Oviedo · Gijón · Avilés',
      h1: 'Revisión de arras en Asturias: señal en mercado moderado pero exigente',
      lead:
        'Asturias mueve compraventas entre particulares en Oviedo, Gijón y Avilés. Revisamos arras penitenciales, plazo a notaría y condición de hipoteca antes de transferir señal.',
    },
    mercadoIntro:
      'Edificios con ITE pendiente y herencias frecuentes; las arras genéricas no cubren estos matices.',
    alerta: {
      titulo: 'Arras sin condición sobre ITE',
      texto: 'En edificios >50 años la ITE puede ser requisito para comprador con hipoteca.',
    },
    riesgosLocales: [
      'Herencias múltiples titulares',
      'Plazo corto',
      'Cargas mineras/industriales en zona rural',
      'Penalizaciones',
    ],
    faqs: [
      {
        q: '¿Langreo?',
        a: 'Sí, Asturias.',
      },
      {
        q: '¿Due diligence?',
        a: '350€ pack recomendable.',
      },
      {
        q: '¿Online?',
        a: 'Sí.',
      },
    ],
  },

  santander: {
    meta: {
      title: 'Revisión arras Santander — señal UC y Sardinero 120€',
      description:
        'Revisar arras Santander y Cantabria. 120€ online.',
      keywords: 'revision arras santander, revisar señal santander',
      ogTitle: 'Revisión arras Santander',
      ogDescription: 'Arras cántabras revisadas.',
    },
    hero: {
      badge: 'Cantabria · bahía',
      h1: 'Revisión de arras en Santander: señal en mercado costero',
      lead:
        'Santander combina operaciones residenciales y segunda vivienda. Revisamos arras penitenciales, hipoteca y plazo a notaría cántabra.',
    },
    mercadoIntro:
      'Mercado con estacionalidad; arras rápidas en verano requieren doble atención.',
    alerta: {
      titulo: 'Arras en pisos Sardinero sin revisar estado',
      texto: 'Segundas residencias pueden tener cargas o limitaciones de comunidad.',
    },
    riesgosLocales: [
      'Plazo vacacional vs real',
      'Nota simple',
      'Señal alta',
      'Financiación',
    ],
    faqs: [
      {
        q: '¿Torrelavega?',
        a: 'Sí, Cantabria.',
      },
      {
        q: '¿Corrección?',
        a: 'Incluida.',
      },
      {
        q: '¿Arras nuevas?',
        a: '145€ redacción.',
      },
    ],
  },

  vitoria: {
    meta: {
      title: 'Revisión arras Vitoria — señal Álava 120€',
      description:
        'Revisión arras Vitoria-Gasteiz. Foral, hipoteca. 120€.',
      keywords: 'revision arras vitoria, revisar señal vitoria gasteiz',
      ogTitle: 'Revisión arras Vitoria',
      ogDescription: 'Arras en Álava revisadas.',
    },
    hero: {
      badge: 'Álava · foral',
      h1: 'Revisión de arras en Vitoria-Gasteiz: señal con plazo a notaría vasca',
      lead:
        'Vitoria mueve operaciones ordenadas pero con borradores de arras desequilibrados. Revisamos penitencial, financiación y datos registrales en Ensanche o Lakua.',
    },
    mercadoIntro:
      'Calidad de vida atrae compradores de otras CCAA; revisión antes de señal evita conflictos.',
    alerta: {
      titulo: 'Penalización desigual',
      texto: 'Cláusulas que solo castigan al comprador son habituales en modelos copiados.',
    },
    riesgosLocales: [
      'Plazo tasación',
      'Nota simple',
      'Condición hipoteca',
      'Identificación partes',
    ],
    faqs: [
      {
        q: '¿Llodio?',
        a: 'Sí, Álava.',
      },
      {
        q: '¿Online?',
        a: '100 %.',
      },
      {
        q: '¿48h?',
        a: 'Sí.',
      },
    ],
  },

  'san-sebastian': {
    meta: {
      title: 'Revisión arras San Sebastián — señal Gros y Donostia 120€',
      description:
        'Revisar arras San Sebastián / Donostia. Rentas altas, hipoteca, plazo. 120€.',
      keywords: 'revision arras san sebastian, revisar señal donostia',
      ogTitle: 'Revisión arras Donostia',
      ogDescription: 'Arras en Gipuzkoa revisadas.',
    },
    hero: {
      badge: 'Gros · Parte Vieja · rentas altas',
      h1: 'Revisión de arras en San Sebastián: señal en mercado de tickets elevados',
      lead:
        'Donostia tiene rentas y precios de compra altos; perder señal por arras mal redactadas duele más. Revisamos penitencial, condición de hipoteca y plazo a notaría gipuzkoana antes de firmar.',
    },
    mercadoIntro:
      'Competencia entre compradores y plazos agresivos; revisión profesional es barata comparada con el riesgo.',
    alerta: {
      titulo: 'Señal elevada sin due diligence',
      texto: 'En tickets altos, combina revisión arras con auditoría documental previa.',
    },
    riesgosLocales: [
      'Plazo imposible en mercado tensionado',
      'Penitencial mal calculada en €',
      'Arras en euskera/castellano contradictorias',
      'Comunidad en edificios señoriales',
    ],
    faqs: [
      {
        q: '¿Irún?',
        a: 'Sí, área.',
      },
      {
        q: '¿Due diligence?',
        a: '350€ muy recomendable en Donostia.',
      },
      {
        q: '¿Corrección arras?',
        a: 'Incluida 120€.',
      },
    ],
  },
}
