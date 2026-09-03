import { getCiudadImage } from '@/lib/gestoria-images'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type ContratosInmobiliariosCiudadSlug =
  | 'madrid'
  | 'barcelona'
  | 'valencia'
  | 'sevilla'
  | 'malaga'
  | 'bilbao'
  | 'zaragoza'
  | 'alicante'
  | 'palma'
  | 'murcia'
  | 'coruna'
  | 'pamplona'

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

const SEVILLA: ContratosInmobiliariosCiudadConfig = {
  slug: 'sevilla',
  nombre: 'Sevilla',
  region: 'Andalucía',
  metaTitle: 'Contratos inmobiliarios Sevilla | Arras, LAU y gestoría',
  metaDescription:
    'Contratos inmobiliarios en Sevilla y Andalucía: arras, alquiler LAU y venta entre particulares. Triana, Nervión, Los Remedios. Fianza AVRA. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Sevilla, contrato arras Sevilla, contrato alquiler Sevilla, gestoría inmobiliaria Sevilla particulares, LAU Andalucía',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Sevilla',
  heroLead:
    'Redacción de arras, alquiler LAU y packs documentales para compradores y vendedores en Sevilla capital, Aljarafe y provincia. Conocemos el mercado andaluz, la fianza AVRA y la operativa entre particulares sin comisión de agencia.',
  heroTags: ['Andalucía', 'AVRA', 'Particulares', 'Triana · Nervión'],
  heroImage: getCiudadImage('sevilla'),
  mercadoTitulo: 'Sevilla: compraventa activa y alquiler estable',
  mercadoIntro:
    'Sevilla mueve un volumen alto de operaciones entre particulares con precios más accesibles que Madrid o Barcelona, pero el riesgo jurídico es el mismo: arras sin condición de hipoteca, alquileres que confunden temporada con LAU en el casco histórico, o documentación de comunidad incompleta antes de ir al notario de Nervión o Triana.',
  mercadoCards: [
    {
      titulo: 'Arras como ritual andaluz',
      desc: 'En Sevilla las arras penitenciales son el paso previo habitual a la escritura. Redactamos cláusulas de desistimiento, plazo a notaría y revisión de nota simple del Registro de la Propiedad de Sevilla.',
    },
    {
      titulo: 'Alquiler LAU con fianza AVRA',
      desc: 'La fianza legal se ingresa ante el organismo autonómico andaluz (AVRA). El contrato detalla importe, plazo de depósito y devolución — evitando retenciones indebidas al final del arrendamiento.',
    },
    {
      titulo: 'Particulares en Aljarafe y provincia',
      desc: 'Dos Hermanas, Alcalá de Guadaira y Mairena del Aljarafe concentran compradores primerizos. Mismo servicio online con adaptación al municipio del inmueble.',
    },
  ],
  normativaTitulo: 'Normativa en Sevilla y Andalucía',
  normativaIntro:
    'Los contratos entre particulares en Sevilla combinan derecho estatal (LAU, Código Civil) con obligaciones autonómicas andaluzas:',
  normativaPuntos: [
    'Depósito de fianza legal ante AVRA (Agencia de Vivienda y Rehabilitación de Andalucía)',
    'Distinción entre vivienda habitual LAU y alquiler turístico en Santa Cruz o el Arenal — régimen distinto',
    'Cláusulas de arras con doble penitencial y condición suspensiva de financiación bancaria',
    'Revisión de cédula de habitabilidad y licencias en edificios protegidos del casco antiguo',
  ],
  barriosTitulo: 'Barrios y zonas de Sevilla donde adaptamos cada contrato',
  barriosIntro:
    'Un piso en Triana no se formaliza igual que un adosado en Vallecas del Rosario. Contextualizamos según zona:',
  barrios: [
    {
      nombre: 'Triana y Los Remedios',
      contexto: 'Alta demanda de alquiler residencial',
      operativa:
        'LAU con duración mínima, actualización IPC y fianza AVRA. Arras en compraventa con plazos cortos entre particulares.',
    },
    {
      nombre: 'Nervión y Sevilla Este',
      contexto: 'Perfil profesional y familiar',
      operativa:
        'Contratos de larga duración, inventario en amueblados y pack vendedor para quien vende sin agencia en zona consolidada.',
    },
    {
      nombre: 'Santa Cruz y Casco Antiguo',
      contexto: 'Edificios históricos y turismo residencial',
      operativa:
        'Verificación de habitabilidad, régimen de obras en comunidad y distinción estricta habitual vs temporada.',
    },
    {
      nombre: 'Macarena y San Jerónimo',
      contexto: 'Regeneración urbana y estudiantes',
      operativa:
        'Alquiler LAU o habitación según caso. Arras en rehabilitaciones recientes con revisión registral.',
    },
    {
      nombre: 'Heliópolis y Bellavista',
      contexto: 'Barrios familiares del sur',
      operativa:
        'Compraventa entre particulares con arras penitenciales y acompañamiento de compra por tarifa fija.',
    },
    {
      nombre: 'Alcalá de Guadaira y Dos Hermanas',
      contexto: 'Área metropolitana — primer vivienda',
      operativa:
        'Operaciones ágiles con compradores jóvenes. Due diligence documental en packs arras plus.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Sevilla',
  serviciosIntro:
    'Desde arras en un piso de Nervión hasta alquiler LAU en Los Remedios: gestor asignado, panel online y entrega en 48 horas.',
  faq: [
    {
      q: '¿Los contratos son válidos en toda Andalucía?',
      a: 'Sí. Redactamos para Sevilla capital y cualquier municipio andaluz. El Código Civil y la LAU son estatales; adaptamos cláusulas a la normativa autonómica de fianzas.',
    },
    {
      q: '¿Qué es AVRA y por qué importa en mi contrato de alquiler?',
      a: 'AVRA es el organismo donde se deposita la fianza legal en Andalucía. El contrato debe indicar importe, plazo y responsable del ingreso para evitar problemas en la devolución.',
    },
    {
      q: '¿Puedo vender mi piso en Triana sin agencia con vuestro pack vendedor?',
      a: 'Sí. El Pack Arras Plus Vendedor (450 €) incluye arras redactadas a tu favor y ayuda para recabar documentación de comunidad, ITE y nota simple antes de escriturar.',
    },
  ],
  enlaceGestoria: '/gestoria/sevilla',
  enlaceArras: '/sevilla/contrato-arras',
  enlaceAlquiler: '/sevilla/contrato-alquiler',
}

const MALAGA: ContratosInmobiliariosCiudadConfig = {
  slug: 'malaga',
  nombre: 'Málaga',
  region: 'Andalucía · Costa del Sol',
  metaTitle: 'Contratos inmobiliarios Málaga | Arras, LAU y Costa del Sol',
  metaDescription:
    'Contratos inmobiliarios en Málaga y Costa del Sol: arras, alquiler LAU, venta entre particulares. Teatinos, Soho, Marbella. Gestoría online desde 61€.',
  keywords:
    'contratos inmobiliarios Málaga, contrato arras Málaga, contrato alquiler Costa del Sol, gestoría inmobiliaria Málaga particulares',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Málaga',
  heroLead:
    'Gestoría especializada en Málaga capital, Costa del Sol y provincia: arras, alquiler LAU y documentación para compradores nacionales e internacionales que operan sin agencia inmobiliaria.',
  heroTags: ['Costa del Sol', 'Andalucía', 'Particulares', 'Teatinos · Soho'],
  heroImage: getCiudadImage('malaga'),
  mercadoTitulo: 'Málaga: crecimiento, sol y operaciones a doble velocidad',
  mercadoIntro:
    'Málaga combina mercado local de familias y estudiantes con demanda internacional en la Costa del Sol. El error más caro aquí es mezclar alquiler turístico con LAU habitual, o firmar arras en Marbella o Málaga centro con plazos imposibles de cumplir si la hipoteca tarda.',
  mercadoCards: [
    {
      titulo: 'Costa del Sol e inversores',
      desc: 'Operaciones en Marbella, Estepona o Fuengirola suelen ir con ticket alto y compradores extranjeros. Revisamos NIE, nota simple y cláusulas de arras con condiciones suspensivas claras.',
    },
    {
      titulo: 'Distinción LAU vs temporada',
      desc: 'En Soho, La Malagueta o Torremolinos es crítico no confundir arrendamiento turístico con vivienda habitual. Redactamos el régimen jurídico correcto según el uso real del inmueble.',
    },
    {
      titulo: 'Mercado universitario Teatinos',
      desc: 'Pisos compartidos y alquileres de habitación requieren contratos específicos. Inventario detallado y normas de convivencia para evitar conflictos al final del curso.',
    },
  ],
  normativaTitulo: 'Qué debe cubrir tu contrato en Málaga',
  normativaIntro:
    'En Málaga y provincia aplican LAU, Ley de Vivienda 2026 y normativa andaluza de fianzas, más matices propios del mercado costero:',
  normativaPuntos: [
    'Depósito de fianza ante AVRA en alquileres LAU de vivienda habitual',
    'Cláusulas de arras adaptadas a compradores con financiación en trámite o venta cruzada de otra vivienda',
    'Revisión de licencia turística vs contrato LAU — especialmente en primera línea de playa',
    'Inventario profesional en pisos amueblados de expatriados y nómadas digitales',
  ],
  barriosTitulo: 'Zonas de Málaga y Costa del Sol',
  barriosIntro:
    'Cada zona de Málaga tiene un perfil de operación distinto. No usamos el mismo texto para El Palo que para el centro Soho:',
  barrios: [
    {
      nombre: 'Centro histórico y Soho',
      contexto: 'Regeneración urbana y alquiler joven',
      operativa:
        'LAU con cláusulas de mascotas y subarriendo. Arras en compraventa de pisos rehabilitados con revisión de licencias.',
    },
    {
      nombre: 'Teatinos y El Palo',
      contexto: 'Universidad y perfil estudiante',
      operativa:
        'Contratos de habitación o LAU según convivencia. Fianza AVRA y devolución documentada.',
    },
    {
      nombre: 'La Malagueta y Ciudad Jardín',
      contexto: 'Residencial consolidado',
      operativa:
        'Alquiler familiar de larga duración. Pack vendedor para propietarios que enajenan sin agencia.',
    },
    {
      nombre: 'Torremolinos y Benalmádena',
      contexto: 'Costa — habitual vs vacacional',
      operativa:
        'Análisis del uso real del inmueble antes de redactar. Arras en segundas residencias con due diligence.',
    },
    {
      nombre: 'Marbella y Estepona',
      contexto: 'Ticket alto e inversión internacional',
      operativa:
        'Pack Arras Plus Comprador con revisión documental integral. Cláusulas en operaciones con compradores no residentes.',
    },
    {
      nombre: 'Ronda y Antequera (interior)',
      contexto: 'Compraventa rural y pueblo',
      operativa:
        'Arras en fincas y viviendas unifamiliares. Verificación registral y cargas antes de señal.',
    },
  ],
  serviciosTitulo: 'Contratos inmobiliarios en Málaga y alrededores',
  serviciosIntro:
    'Operaciones en Málaga capital, Costa del Sol o interior de provincia: un gestor conoce tu expediente de principio a fin.',
  faq: [
    {
      q: '¿Atendéis operaciones en Marbella o Fuengirola?',
      a: 'Sí. El servicio es 100% online en toda la provincia de Málaga y Costa del Sol. Adaptamos referencias registrales al municipio del inmueble.',
    },
    {
      q: '¿Cómo evitáis confundir alquiler turístico con LAU?',
      a: 'Analizamos el uso previsto del inmueble y redactamos el contrato bajo el régimen jurídico correcto. Un LAU mal aplicado a uso turístico puede anular cláusulas enteras.',
    },
    {
      q: '¿Puedo contratar si el comprador es extranjero sin NIE definitivo?',
      a: 'Sí. Incluimos condiciones suspensivas y plazos realistas en las arras mientras se regulariza la documentación del comprador.',
    },
  ],
  enlaceGestoria: '/gestoria/malaga',
  enlaceArras: '/malaga/contrato-arras',
  enlaceAlquiler: '/malaga/contrato-alquiler',
}

const BILBAO: ContratosInmobiliariosCiudadConfig = {
  slug: 'bilbao',
  nombre: 'Bilbao',
  region: 'País Vasco · Bizkaia',
  metaTitle: 'Contratos inmobiliarios Bilbao | LAU, arras y País Vasco',
  metaDescription:
    'Contratos inmobiliarios en Bilbao y Bizkaia: LAU, fianza vasca, arras y venta entre particulares. Abando, Deusto, Getxo. Gestoría desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Bilbao, contrato alquiler Bilbao, contrato arras Bizkaia, gestoría inmobiliaria País Vasco, LAU País Vasco',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Bilbao',
  heroLead:
    'Redacción profesional de arras y alquiler LAU en Bilbao, Getxo, Barakaldo y Bizkaia. Incorporamos fianza autonómica vasca, límites de actualización IPC y particularidades del mercado foral.',
  heroTags: ['País Vasco', 'Bizkaia', 'Fianza vasca', 'Particulares'],
  heroImage: getCiudadImage('bilbao'),
  mercadoTitulo: 'Bilbao: mercado sólido con normativa foral propia',
  mercadoIntro:
    'Bizkaia tiene un mercado de alquiler estable y compraventa entre particulares activa en Abando, Deusto y el Gran Bilbao. Aquí la fianza se deposita ante el organismo autonómico vasco, la actualización de renta tiene reglas específicas según gran tenedor, y un contrato estatal genérico no refleja estos matices.',
  mercadoCards: [
    {
      titulo: 'Fianza y garantías en Euskadi',
      desc: 'Una mensualidad de fianza legal con depósito en el organismo autonómico correspondiente. Hasta dos mensualidades adicionales si la ley lo permite — todo detallado en el contrato.',
    },
    {
      titulo: 'Actualización IPC en Bizkaia',
      desc: 'Pequeños propietarios: IPC + 2 % en muchos supuestos. Grandes tenedores: límites más estrictos. Redactamos la fórmula correcta según tu situación.',
    },
    {
      titulo: 'Gran Bilbao y área metropolitana',
      desc: 'Getxo, Barakaldo, Portugalete y Santurtzi comparten marco legal vasco con matices urbanísticos propios. Misma gestoría online con adaptación municipal.',
    },
  ],
  normativaTitulo: 'Particularidades en Bilbao y el País Vasco',
  normativaIntro:
    'Los contratos inmobiliarios en Bizkaia deben reflejar derecho estatal y normativa autonómica vasca:',
  normativaPuntos: [
    'Depósito de fianza legal ante organismo autonómico del País Vasco',
    'Cláusulas de actualización de renta conformes a gran tenedor o pequeño propietario',
    'Arras penitenciales válidas en todo el territorio foral con revisión de nota simple registral',
    'Contrato disponible en castellano o euskera según preferencia de las partes',
  ],
  barriosTitulo: 'Barrios de Bilbao y área metropolitana',
  barriosIntro:
    'Desde Indautxu hasta Getxo, cada zona tiene dinámica de alquiler y compraventa distinta:',
  barrios: [
    {
      nombre: 'Abando e Indautxu',
      contexto: 'Núcleo financiero — rentas altas',
      operativa:
        'LAU con garantías acotadas al límite legal. Arras en compraventa de pisos señoriales con revisión de comunidad.',
    },
    {
      nombre: 'Deusto y Uribarri',
      contexto: 'Universidad y familias',
      operativa:
        'Alquiler LAU de larga duración, inventario en amueblados para estudiantes de Deusto. Arras en operaciones rápidas.',
    },
    {
      nombre: 'Casco Viejo y San Francisco',
      contexto: 'Edificios históricos y alta rotación',
      operativa:
        'Revisión de obras en fachada, régimen de comunidad y distinción de uso habitual en pisos urbanos.',
    },
    {
      nombre: 'Basurto y Rekalde',
      contexto: 'Regeneración y demanda accesible',
      operativa:
        'Compraventa entre particulares con arras penitenciales. Acompañamiento de compra por tarifa fija 687 €.',
    },
    {
      nombre: 'Getxo y Portugalete',
      contexto: 'Área metropolitana costera',
      operativa:
        'Alquiler familiar estable. Pack vendedor para propietarios que venden sin agencia en municipios del Gran Bilbao.',
    },
    {
      nombre: 'Barakaldo y Santurtzi',
      contexto: 'Cinturón industrial reconvertido',
      operativa:
        'Operaciones con ticket medio. Due diligence documental en packs arras plus para compradores exigentes.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Bilbao',
  serviciosIntro:
    'Arras en Indautxu, alquiler LAU en Deusto o venta sin agencia en Getxo: precio cerrado, panel de seguimiento y gestor asignado.',
  faq: [
    {
      q: '¿El contrato de alquiler es válido en todo el País Vasco?',
      a: 'Sí. Redactamos para Bilbao, Getxo, Barakaldo, San Sebastián, Vitoria y resto del territorio. Adaptamos cláusulas a la normativa autonómica vasca de fianzas.',
    },
    {
      q: '¿Puedo redactar el contrato en euskera?',
      a: 'Sí, si ambas partes lo prefieren. Por defecto entregamos en castellano; indícanos tu preferencia al contratar.',
    },
    {
      q: '¿Cuánto puede subir el alquiler cada año en Bilbao?',
      a: 'Depende de si eres gran tenedor o pequeño propietario. Incorporamos la fórmula legal correcta (IPC, IPC + 2 % o límites de gran tenedor) según tu caso concreto.',
    },
  ],
  enlaceGestoria: '/gestoria/bilbao',
  enlaceArras: '/bilbao/contrato-arras',
  enlaceAlquiler: '/bilbao/contrato-alquiler',
}

const ZARAGOZA: ContratosInmobiliariosCiudadConfig = {
  slug: 'zaragoza',
  nombre: 'Zaragoza',
  region: 'Aragón',
  metaTitle: 'Contratos inmobiliarios Zaragoza | Arras, LAU y gestoría Aragón',
  metaDescription:
    'Contratos inmobiliarios en Zaragoza y Aragón: arras, alquiler LAU y venta entre particulares. Delicias, Actur, Universidad. Fianza INAGA. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Zaragoza, contrato arras Zaragoza, contrato alquiler Zaragoza, gestoría inmobiliaria Aragón particulares, LAU Zaragoza',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Zaragoza',
  heroLead:
    'Redacción de arras, alquiler LAU y packs documentales para compradores y vendedores en Zaragoza capital, cinturón metropolitano y provincia. Mercado accesible, normativa aragonesa de fianzas y operativa entre particulares sin comisión de agencia.',
  heroTags: ['Aragón', 'INAGA', 'Particulares', 'Delicias · Actur'],
  heroImage: getCiudadImage('zaragoza'),
  mercadoTitulo: 'Zaragoza: mercado en crecimiento y operaciones ágiles',
  mercadoIntro:
    'Zaragoza combina precios por m² más accesibles que Madrid o Barcelona con un volumen creciente de compraventa entre particulares. El riesgo no es menor: arras sin condición de hipoteca, alquileres sin depósito en INAGA o IEE caducada en edificios del casco histórico pueden bloquear la operación en el último momento.',
  mercadoCards: [
    {
      titulo: 'Primera vivienda con ticket moderado',
      desc: 'En Delicias, Actur o Romareda muchos compradores son primerizos. Redactamos arras con plazos realistas para financiación bancaria y revisión de nota simple del Registro de Zaragoza.',
    },
    {
      titulo: 'Fianza ante INAGA',
      desc: 'En Aragón la fianza legal se deposita ante el organismo autonómico (INAGA / SUELO ARAGÓN). El contrato detalla importe, plazo de ingreso y devolución al finalizar el arrendamiento.',
    },
    {
      titulo: 'Perfil universitario y familiar',
      desc: 'Romareda y Universidad concentran alquileres de habitación y LAU de larga duración. Inventario detallado y cláusulas de convivencia para evitar conflictos al cambio de curso.',
    },
  ],
  normativaTitulo: 'Normativa en Zaragoza y Aragón',
  normativaIntro:
    'Los contratos entre particulares en Zaragoza combinan derecho estatal (LAU, Código Civil) con obligaciones autonómicas aragonesas:',
  normativaPuntos: [
    'Depósito de fianza legal ante INAGA (Instituto Aragonés de Gestión Ambiental) en plazo de 30 días',
    'IEE obligatorio en edificios de más de 50 años — habitual en el casco histórico y el Paseo Independencia',
    'Cláusulas de arras con doble penitencial y condición suspensiva de financiación',
    'Certificado energético vigente antes de compraventa o alquiler de larga duración',
  ],
  barriosTitulo: 'Barrios y zonas de Zaragoza donde adaptamos cada contrato',
  barriosIntro:
    'Un piso en el Casco no se formaliza igual que un adosado en Utebo. Contextualizamos según zona:',
  barrios: [
    {
      nombre: 'Centro y Casco Histórico',
      contexto: 'Rotación urbana y edificios antiguos',
      operativa:
        'LAU con inventario en amueblados. Arras en compraventa con revisión de IEE y certificado energético.',
    },
    {
      nombre: 'Delicias y Actur',
      contexto: 'Demanda familiar de larga duración',
      operativa:
        'Contratos LAU con actualización IPC, fianza INAGA y pack vendedor para quien vende sin agencia.',
    },
    {
      nombre: 'Universidad y Romareda',
      contexto: 'Perfil estudiante y joven profesional',
      operativa:
        'Alquiler LAU o habitación según convivencia. Arras en operaciones rápidas entre particulares.',
    },
    {
      nombre: 'Las Fuentes y Torrero',
      contexto: 'Barrios residenciales consolidados',
      operativa:
        'Compraventa familiar con arras penitenciales. Acompañamiento de compra por tarifa fija 687 €.',
    },
    {
      nombre: 'Utebo y Cuarte de Huerva',
      contexto: 'Cinturón metropolitano — primer vivienda',
      operativa:
        'Operaciones ágiles con compradores jóvenes. Due diligence documental en packs arras plus.',
    },
    {
      nombre: 'La Almozara y Valdespartera',
      contexto: 'Expansión urbana reciente',
      operativa:
        'Alquiler LAU en promociones nuevas. Arras con verificación de licencia de primera ocupación.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Zaragoza',
  serviciosIntro:
    'Desde arras en Delicias hasta alquiler LAU en Actur: gestor asignado, panel online y entrega en 48 horas.',
  faq: [
    {
      q: '¿Los contratos son válidos en toda Aragón?',
      a: 'Sí. Redactamos para Zaragoza capital y cualquier municipio aragonés. El Código Civil y la LAU son estatales; adaptamos cláusulas a la normativa autonómica de fianzas.',
    },
    {
      q: '¿Qué es INAGA y por qué importa en mi contrato de alquiler?',
      a: 'INAGA es el organismo donde se deposita la fianza legal en Aragón. El contrato debe indicar importe, plazo y responsable del ingreso para evitar problemas en la devolución.',
    },
    {
      q: '¿Necesito IEE para vender un piso en el centro de Zaragoza?',
      a: 'Sí, si el edificio tiene más de 50 años. Sin IEE vigente la operación puede bloquearse en notaría. Lo verificamos en packs vendedor y compra.',
    },
  ],
  enlaceGestoria: '/gestoria/zaragoza',
  enlaceArras: '/zaragoza/contrato-arras',
  enlaceAlquiler: '/zaragoza/contrato-alquiler',
}

const ALICANTE: ContratosInmobiliariosCiudadConfig = {
  slug: 'alicante',
  nombre: 'Alicante',
  region: 'Comunitat Valenciana · Costa Blanca',
  metaTitle: 'Contratos inmobiliarios Alicante | Arras, LAU y Costa Blanca',
  metaDescription:
    'Contratos inmobiliarios en Alicante y Costa Blanca: arras, alquiler LAU, venta entre particulares. Playa San Juan, Elche, Benidorm. Fianza AVANT. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Alicante, contrato arras Alicante, contrato alquiler Costa Blanca, gestoría inmobiliaria Alicante particulares, LAU Comunitat Valenciana',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Alicante',
  heroLead:
    'Gestoría especializada en Alicante capital, Costa Blanca y provincia: arras, alquiler LAU y documentación para compradores nacionales e internacionales que operan sin agencia inmobiliaria.',
  heroTags: ['Costa Blanca', 'AVANT', 'Particulares', 'San Juan · Elche'],
  heroImage: getCiudadImage('alicante'),
  mercadoTitulo: 'Alicante: residencial, turismo y compradores internacionales',
  mercadoIntro:
    'Alicante concentra alquiler estable en Carolinas y Benalúa, demanda internacional en Playa de San Juan y operaciones rápidas en Benidorm o Torrevieja. El error más frecuente es confundir alquiler turístico con LAU habitual, o firmar arras con un comprador extranjero sin plazos para NIE e hipoteca.',
  mercadoCards: [
    {
      titulo: 'LAU vs uso turístico en la costa',
      desc: 'En Explanada, San Juan o Campello conviven pisos residenciales y alquiler turístico. Redactamos el régimen jurídico correcto según el uso real del inmueble — no mezclamos Registro de Turisme con LAU.',
    },
    {
      titulo: 'Fianza AVANT y cédula de habitabilidad',
      desc: 'La fianza legal se ingresa ante la Generalitat Valenciana (AVANT). La cédula de habitabilidad es obligatoria para alquilar y vender con garantías en la Comunitat.',
    },
    {
      titulo: 'Compradores extranjeros en la Costa Blanca',
      desc: 'Operaciones con compradores nórdicos, británicos o alemanes requieren arras con condiciones suspensivas claras para NIE, hipoteca y verificación documental antes de notaría.',
    },
  ],
  normativaTitulo: 'Qué debe cubrir tu contrato en Alicante',
  normativaIntro:
    'En Alicante y provincia aplican LAU, Ley de Vivienda 2026 y normativa valenciana de fianzas, más matices propios del mercado costero:',
  normativaPuntos: [
    'Depósito de fianza ante AVANT (Generalitat Valenciana) en alquileres LAU de vivienda habitual',
    'Cédula de habitabilidad vigente — requisito para compraventa y alquiler en la Comunitat',
    'Distinción estricta entre arrendamiento LAU y alquiler turístico con Registro de Turisme',
    'Cláusulas de arras con plazos para NIE e hipoteca en operaciones con compradores no residentes',
  ],
  barriosTitulo: 'Zonas de Alicante y Costa Blanca',
  barriosIntro:
    'Cada zona de Alicante tiene un perfil de operación distinto. No usamos el mismo texto para el centro que para Playa de San Juan:',
  barrios: [
    {
      nombre: 'Centro y Explanada',
      contexto: 'Alquiler urbano y rotación alta',
      operativa:
        'LAU con cláusulas de mascotas y subarriendo. Arras en compraventa de pisos del casco con revisión de cédula.',
    },
    {
      nombre: 'Playa de San Juan y Campello',
      contexto: 'Costa — habitual vs turístico',
      operativa:
        'Análisis del uso real del inmueble antes de redactar. Arras en segundas residencias con due diligence.',
    },
    {
      nombre: 'Carolinas y Benalúa',
      contexto: 'Alquiler residencial estable',
      operativa:
        'LAU de larga duración con fianza AVANT. Pack vendedor para propietarios que enajenan sin agencia.',
    },
    {
      nombre: 'Elche y San Vicente',
      contexto: 'Área metropolitana — demanda familiar',
      operativa:
        'Compraventa entre particulares con arras penitenciales. Verificación registral y cargas antes de señal.',
    },
    {
      nombre: 'Benidorm y Torrevieja',
      contexto: 'Ticket medio e inversión costera',
      operativa:
        'Pack Arras Plus Comprador con revisión documental. Cláusulas en operaciones con compradores internacionales.',
    },
    {
      nombre: 'Mutxamel y San Juan de Alicante',
      contexto: 'Periferia residencial accesible',
      operativa:
        'Alquiler LAU familiar. Arras en promociones recientes con licencia de primera ocupación.',
    },
  ],
  serviciosTitulo: 'Contratos inmobiliarios en Alicante y alrededores',
  serviciosIntro:
    'Operaciones en Alicante capital, Costa Blanca o interior de provincia: un gestor conoce tu expediente de principio a fin.',
  faq: [
    {
      q: '¿Atendéis operaciones en Benidorm, Elche o Torrevieja?',
      a: 'Sí. El servicio es 100% online en toda la provincia de Alicante y Costa Blanca. Adaptamos referencias registrales al municipio del inmueble.',
    },
    {
      q: '¿Cómo evitáis confundir alquiler turístico con LAU?',
      a: 'Analizamos el uso previsto del inmueble y redactamos el contrato bajo el régimen jurídico correcto. Un LAU mal aplicado a uso turístico puede anular cláusulas enteras y acarrear sanciones.',
    },
    {
      q: '¿Puedo firmar arras si el comprador es extranjero sin NIE definitivo?',
      a: 'Sí. Incluimos condiciones suspensivas y plazos realistas en las arras mientras se regulariza la documentación del comprador.',
    },
  ],
  enlaceGestoria: '/gestoria/alicante',
  enlaceArras: '/alicante/contrato-arras',
  enlaceAlquiler: '/alicante/contrato-alquiler',
}

const PALMA: ContratosInmobiliariosCiudadConfig = {
  slug: 'palma',
  nombre: 'Palma',
  region: 'Illes Balears · Mallorca',
  metaTitle: 'Contratos inmobiliarios Palma | LAU, arras y Baleares',
  metaDescription:
    'Contratos inmobiliarios en Palma e Illes Balears: LAU, fianza IBAVI, arras y venta entre particulares. Santa Catalina, Calvià, zona tensionada. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Palma, contrato alquiler Mallorca, contrato arras Baleares, gestoría inmobiliaria Palma particulares, LAU Illes Balears',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Palma',
  heroLead:
    'Redacción profesional de arras y alquiler LAU en Palma, Calvià, Manacor y resto de Baleares. Incorporamos fianza IBAVI, índice de referencia en zona tensionada y particularidades del mercado insular más regulado de España.',
  heroTags: ['Illes Balears', 'IBAVI', 'Zona tensionada', 'Particulares'],
  heroImage: getCiudadImage('palma'),
  mercadoTitulo: 'Palma: uno de los mercados más caros y regulados',
  mercadoIntro:
    'Palma supera los 4.000 €/m² en zonas como Santa Catalina o el Born, con normativa balear específica: zona tensionada con índice de referencia obligatorio, moratoria de licencias turísticas (ETV) y depósito de fianza ante IBAVI. Un contrato genérico no refleja estos matices.',
  mercadoCards: [
    {
      titulo: 'Zona tensionada e índice de referencia',
      desc: 'Palma está declarada zona tensionada. Los contratos LAU deben respetar el índice del Govern Balear. Grandes tenedores tienen limitaciones adicionales de precio que incorporamos según tu situación.',
    },
    {
      titulo: 'LAU habitual vs alquiler turístico (ETV)',
      desc: 'Baleares tiene la regulación turística más restrictiva de España. Un contrato LAU no sirve para alquilar a turistas en Airbnb — son documentos y regímenes completamente distintos.',
    },
    {
      titulo: 'Fianza IBAVI y cédula d\'habitabilitat',
      desc: 'La fianza legal se deposita ante el Institut Balear de l\'Habitatge en 30 días. La cédula de habitabilidad es obligatoria para vender y alquilar en las islas.',
    },
  ],
  normativaTitulo: 'Particularidades en Palma y las Illes Balears',
  normativaIntro:
    'Los contratos inmobiliarios en Palma deben reflejar derecho estatal y normativa autonómica balear:',
  normativaPuntos: [
    'Depósito de fianza legal ante IBAVI en plazo de 30 días desde la firma',
    'Índice de referencia de precios del Govern Balear en zona tensionada de Palma',
    'Distinción estricta entre arrendamiento LAU y alquiler turístico con licencia ETV',
    'Cédula d\'habitabilitat vigente antes de compraventa o alquiler de larga duración',
  ],
  barriosTitulo: 'Barrios de Palma y área metropolitana',
  barriosIntro:
    'Desde Santa Catalina hasta Calvià, cada zona tiene dinámica de alquiler y compraventa distinta:',
  barrios: [
    {
      nombre: 'Santa Catalina y el Born',
      contexto: 'Alta demanda y rentas elevadas',
      operativa:
        'LAU con índice de referencia en zona tensionada. Arras en compraventa con ticket alto y revisión documental integral.',
    },
    {
      nombre: 'Eixample y Son Espanyolet',
      contexto: 'Residencial consolidado',
      operativa:
        'Alquiler LAU de larga duración, inventario en amueblados. Fianza IBAVI y devolución documentada.',
    },
    {
      nombre: 'Portixol y El Terreno',
      contexto: 'Costa urbana y segunda residencia',
      operativa:
        'Distinción habitual vs temporada. Arras en operaciones con compradores internacionales.',
    },
    {
      nombre: 'Son Cladera y Pere Garau',
      contexto: 'Demanda accesible y familiar',
      operativa:
        'Compraventa entre particulares con arras penitenciales. Acompañamiento de compra por tarifa fija 687 €.',
    },
    {
      nombre: 'Calvià y Marratxí',
      contexto: 'Área metropolitana de lujo',
      operativa:
        'Operaciones de alto valor con due diligence documental. Pack vendedor para enajenación sin agencia.',
    },
    {
      nombre: 'Manacor e Inca (interior)',
      contexto: 'Mercado insular fuera de Palma',
      operativa:
        'Arras en fincas y viviendas unifamiliares. Mismo marco legal balear con adaptación municipal.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Palma',
  serviciosIntro:
    'Arras en Santa Catalina, alquiler LAU en Son Espanyolet o venta sin agencia en Calvià: precio cerrado, panel de seguimiento y gestor asignado.',
  faq: [
    {
      q: '¿El contrato es válido en Menorca, Ibiza y Formentera?',
      a: 'Sí. Redactamos para Palma y cualquier municipio de las Illes Balears. Adaptamos cláusulas a la normativa autonómica balear de fianzas e IBAVI.',
    },
    {
      q: '¿Qué es IBAVI y cuándo debo depositar la fianza?',
      a: 'IBAVI es el organismo donde se deposita la fianza legal en Baleares. El propietario tiene 30 días desde la firma del contrato. El incumplimiento puede acarrear sanciones.',
    },
    {
      q: '¿Puedo usar un contrato LAU para alquilar en Airbnb?',
      a: 'No. El alquiler turístico requiere licencia ETV y régimen distinto al LAU. Mezclar ambos puede anular cláusulas y acarrear sanciones en una de las comunidades más reguladas de España.',
    },
  ],
  enlaceGestoria: '/gestoria/palma',
  enlaceArras: '/palma/contrato-arras',
  enlaceAlquiler: '/palma/contrato-alquiler',
}

const MURCIA: ContratosInmobiliariosCiudadConfig = {
  slug: 'murcia',
  nombre: 'Murcia',
  region: 'Región de Murcia',
  metaTitle: 'Contratos inmobiliarios Murcia | Arras, LAU y gestoría',
  metaDescription:
    'Contratos inmobiliarios en Murcia y Región de Murcia: arras, alquiler LAU y venta entre particulares. Centro, Espinardo, Cartagena. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Murcia, contrato arras Murcia, contrato alquiler Murcia, gestoría inmobiliaria Murcia particulares, LAU Región de Murcia',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Murcia',
  heroLead:
    'Redacción de arras, alquiler LAU y packs documentales para compradores y vendedores en Murcia capital, huerta y litoral. Mercado accesible, perfil universitario en Espinardo y operativa entre particulares sin comisión de agencia.',
  heroTags: ['Región de Murcia', 'Particulares', 'Huerta · Costa', 'Entrega 48h'],
  heroImage: getCiudadImage('murcia'),
  mercadoTitulo: 'Murcia: mercado accesible con demanda estable',
  mercadoIntro:
    'Murcia concentra compraventa familiar con precios por m² moderados frente a Madrid o Barcelona, pero el riesgo jurídico es idéntico: arras sin condición de hipoteca, alquileres sin fianza depositada correctamente o documentación de comunidad incompleta antes de ir al notario en el centro o en Cartagena.',
  mercadoCards: [
    {
      titulo: 'Primera vivienda en la huerta',
      desc: 'Molina de Segura, Alcantarilla o Las Torres mueven compradores primerizos. Redactamos arras con plazos realistas para financiación y revisión de nota simple registral.',
    },
    {
      titulo: 'Perfil universitario en Espinardo',
      desc: 'La zona del campus concentra alquileres de habitación y LAU de larga duración. Inventario detallado y cláusulas de convivencia para evitar conflictos al final del curso.',
    },
    {
      titulo: 'Cartagena y litoral',
      desc: 'Operaciones en el litoral murciano con ticket medio. Due diligence documental en packs arras plus para compradores que reservan piso de particular.',
    },
  ],
  normativaTitulo: 'Normativa en Murcia y la Región',
  normativaIntro:
    'Los contratos entre particulares en Murcia se rigen por el Código Civil, la LAU y la Ley de Vivienda 2026, con obligaciones autonómicas de fianza:',
  normativaPuntos: [
    'Depósito de fianza legal ante el organismo autonómico de la Región de Murcia',
    'Cláusulas de arras con condición suspensiva de hipoteca — habitual en operaciones con financiación bancaria',
    'Distinción entre vivienda habitual LAU y alquiler temporal en zonas costeras',
    'Certificado energético vigente y revisión de deudas de comunidad antes de escritura',
  ],
  barriosTitulo: 'Barrios y zonas de Murcia donde adaptamos cada contrato',
  barriosIntro:
    'Un piso en Vistabella no se formaliza igual que un adosado en La Alberca. Contextualizamos según zona:',
  barrios: [
    {
      nombre: 'Centro y Vistabella',
      contexto: 'Alquiler urbano de rotación media',
      operativa:
        'LAU con duración mínima, actualización IPC y fianza autonómica. Arras en compraventa con plazos cortos entre particulares.',
    },
    {
      nombre: 'Espinardo y Guadalupe',
      contexto: 'Zona universitaria',
      operativa:
        'Alquiler LAU o habitación según convivencia. Inventario en amueblados para estudiantes de la UM.',
    },
    {
      nombre: 'Infante y Santiago el Mayor',
      contexto: 'Residencial familiar',
      operativa:
        'Contratos de larga duración. Pack vendedor para quien vende sin agencia en zona consolidada.',
    },
    {
      nombre: 'El Carmen y San Andrés',
      contexto: 'Barrios históricos del casco',
      operativa:
        'Revisión de obras en comunidad y certificado energético. Arras con verificación registral.',
    },
    {
      nombre: 'Cartagena y La Manga',
      contexto: 'Litoral — habitual vs temporada',
      operativa:
        'Análisis del uso real del inmueble antes de redactar. Arras en segundas residencias con due diligence.',
    },
    {
      nombre: 'Molina de Segura y Alcantarilla',
      contexto: 'Área metropolitana — primer vivienda',
      operativa:
        'Operaciones ágiles con compradores jóvenes. Acompañamiento de compra por tarifa fija 687 €.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Murcia',
  serviciosIntro:
    'Desde arras en el centro hasta alquiler LAU en Espinardo: gestor asignado, panel online y entrega en 48 horas.',
  faq: [
    {
      q: '¿Los contratos son válidos en toda la Región de Murcia?',
      a: 'Sí. Redactamos para Murcia capital, Cartagena, Lorca y cualquier municipio de la región. El Código Civil y la LAU son estatales; adaptamos cláusulas a la normativa autonómica de fianzas.',
    },
    {
      q: '¿Puedo vender mi piso en Murcia sin agencia con vuestro pack vendedor?',
      a: 'Sí. El Pack Arras Plus Vendedor (450 €) incluye arras redactadas a tu favor y ayuda para recabar documentación de comunidad, ITE y nota simple antes de escriturar.',
    },
    {
      q: '¿Atendéis operaciones en Cartagena o Molina de Segura?',
      a: 'Sí. El servicio es 100% online en toda la Región de Murcia. Adaptamos referencias registrales al municipio del inmueble.',
    },
  ],
  enlaceGestoria: '/gestoria/asesoria-compra-piso/murcia',
  enlaceArras: '/murcia/contrato-arras',
  enlaceAlquiler: '/murcia/contrato-alquiler',
}

const CORUNA: ContratosInmobiliariosCiudadConfig = {
  slug: 'coruna',
  nombre: 'A Coruña',
  region: 'Galicia',
  metaTitle: 'Contratos inmobiliarios A Coruña | Arras, LAU y Galicia',
  metaDescription:
    'Contratos inmobiliarios en A Coruña y Galicia: arras, alquiler LAU y venta entre particulares. Ciudad Vieja, Orzán, Oleiros. Gestoría desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios A Coruña, contrato arras Coruña, contrato alquiler Coruña, gestoría inmobiliaria Galicia particulares, LAU A Coruña',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'A Coruña',
  heroLead:
    'Redacción profesional de arras y alquiler LAU en A Coruña, Oleiros, Arteixo y área metropolitana. Mercado gallego con LAU estatal, operativa entre particulares y adaptación a la dinámica del litoral atlántico.',
  heroTags: ['Galicia', 'Particulares', 'Orzán · Mariña', 'Entrega 48h'],
  heroImage: getCiudadImage('coruna'),
  mercadoTitulo: 'A Coruña: mercado atlántico con operativa directa',
  mercadoIntro:
    'A Coruña mueve compraventa entre particulares activa en Ciudad Vieja, Orzán y barrios residenciales, con alquiler estable en la zona universitaria y el área metropolitana. Firmar arras o un alquiler con plantilla genérica en un mercado con edificios del siglo XIX multiplica el riesgo de litigio por obras en fachada o cargas ocultas.',
  mercadoCards: [
    {
      titulo: 'Edificios históricos en el casco',
      desc: 'Ciudad Vieja y Puertochico concentran pisos con obras en comunidad pendientes. Revisamos documentación de fachada, ITE y certificado energético antes de arras o alquiler LAU.',
    },
    {
      titulo: 'Área metropolitana Oleiros-Arteixo',
      desc: 'Familias que compran en periferia con la misma urgencia que en el centro. Contratos válidos en toda la provincia de A Coruña con adaptación documental local.',
    },
    {
      titulo: 'Alquiler LAU sin complicaciones forales',
      desc: 'Galicia aplica LAU estatal sin particularidades forales como País Vasco o Navarra. Aun así, fianza, actualización de renta y garantías deben estar redactadas con precisión.',
    },
  ],
  normativaTitulo: 'Normativa aplicable en A Coruña',
  normativaIntro:
    'Los contratos entre particulares en A Coruña se rigen por el Código Civil, la LAU y la Ley de Vivienda 2026:',
  normativaPuntos: [
    'Depósito de fianza legal ante el organismo autonómico de Galicia',
    'Cláusulas de arras con condición suspensiva de hipoteca en operaciones con financiación bancaria',
    'Revisión de nota simple del Registro de la Propiedad de A Coruña cuando hay cargas o usufructo',
    'Certificado energético vigente — obligatorio en compraventa y alquiler de larga duración',
  ],
  barriosTitulo: 'Barrios de A Coruña y área metropolitana',
  barriosIntro:
    'Desde Ciudad Vieja hasta Ferrol, cada zona tiene dinámica de alquiler y compraventa distinta:',
  barrios: [
    {
      nombre: 'Ciudad Vieja y Puertochico',
      contexto: 'Alquiler urbano de alta rotación',
      operativa:
        'LAU con inventario en amueblados. Arras en compraventa de pisos señoriales con revisión de comunidad.',
    },
    {
      nombre: 'Orzán y Riazor',
      contexto: 'Demanda joven y perfiles temporales',
      operativa:
        'Distinción habitual vs temporada. Alquiler LAU de larga duración con fianza y devolución documentada.',
    },
    {
      nombre: 'Os Mallos y Agra del Orzán',
      contexto: 'Residencial accesible',
      operativa:
        'Compraventa entre particulares con arras penitenciales. Pack vendedor para enajenación sin agencia.',
    },
    {
      nombre: 'Oleiros y Arteixo',
      contexto: 'Área metropolitana familiar',
      operativa:
        'Alquiler LAU estable. Acompañamiento de compra por tarifa fija 687 € en operaciones de periferia.',
    },
    {
      nombre: 'Elviña y Zapateira',
      contexto: 'Zona universitaria',
      operativa:
        'Alquiler LAU o habitación según convivencia. Inventario detallado para pisos compartidos.',
    },
    {
      nombre: 'Santiago y Ferrol',
      contexto: 'Provincia de A Coruña',
      operativa:
        'Mismo marco legal galiciano. Arras con verificación registral y due diligence en packs arras plus.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en A Coruña',
  serviciosIntro:
    'Arras en Ciudad Vieja, alquiler LAU en Oleiros o venta sin agencia en Arteixo: precio cerrado, panel de seguimiento y gestor asignado.',
  faq: [
    {
      q: '¿El contrato es válido en Santiago de Compostela o Ferrol?',
      a: 'Sí. Redactamos para A Coruña capital y cualquier municipio de Galicia. Adaptamos referencias registrales al municipio del inmueble.',
    },
    {
      q: '¿Galicia tiene normativa foral como el País Vasco?',
      a: 'No. Galicia aplica LAU estatal y Código Civil común. La fianza se deposita ante el organismo autonómico gallego según la normativa vigente.',
    },
    {
      q: '¿Puedo comprar un piso de particular en A Coruña con acompañamiento completo?',
      a: 'Sí. El servicio de compra completa (687 €) incluye revisión documental, arras y acompañamiento hasta escritura — sin comisión de agencia.',
    },
  ],
  enlaceGestoria: '/gestoria/asesoria-compra-piso/coruna',
  enlaceArras: '/coruna/contrato-arras',
  enlaceAlquiler: '/coruna/contrato-alquiler',
}

const PAMPLONA: ContratosInmobiliariosCiudadConfig = {
  slug: 'pamplona',
  nombre: 'Pamplona',
  region: 'Navarra',
  metaTitle: 'Contratos inmobiliarios Pamplona | Arras, LAU y Navarra',
  metaDescription:
    'Contratos inmobiliarios en Pamplona y Navarra: arras, alquiler LAU y venta entre particulares. Casco Antiguo, Iturrama, Rochapea. Desde 61€ en 48h.',
  keywords:
    'contratos inmobiliarios Pamplona, contrato arras Pamplona, contrato alquiler Navarra, gestoría inmobiliaria Pamplona particulares, LAU Navarra',
  heroH1: 'Contratos inmobiliarios en',
  heroHighlight: 'Pamplona',
  heroLead:
    'Redacción de arras, alquiler LAU y packs documentales para compradores y vendedores en Pamplona, Comarca de Pamplona y Navarra. Mercado estable, perfil universitario y operativa entre particulares sin comisión de agencia.',
  heroTags: ['Navarra', 'Particulares', 'Iturrama · Ensanche', 'Entrega 48h'],
  heroImage: getCiudadImage('pamplona'),
  mercadoTitulo: 'Pamplona: mercado sólido con demanda universitaria',
  mercadoIntro:
    'Pamplona combina compraventa familiar en Iturrama y San Juan con alquiler estable en el Ensanche y alta rotación en el Casco Antiguo. Las arras penitenciales son el paso previo habitual a la escritura, pero una cláusula mal redactada sobre hipoteca o plazo a notaría puede costar la señal entera.',
  mercadoCards: [
    {
      titulo: 'Sanfermines y rotación en el casco',
      desc: 'El Casco Antiguo concentra pisos con régimen de obras en comunidad y alta rotación de inquilinos. Revisamos habitabilidad, fianza y distinción habitual vs temporal.',
    },
    {
      titulo: 'Familias en Iturrama y Rochapea',
      desc: 'Barrios residenciales con alquiler LAU de larga duración. Contratos con actualización IPC, garantías acotadas y pack vendedor para quien enajena sin agencia.',
    },
    {
      titulo: 'Comarca de Pamplona',
      desc: 'Burlada, Barañáin y Zizur Mayor comparten marco legal navarro con matices urbanísticos propios. Misma gestoría online con adaptación municipal.',
    },
  ],
  normativaTitulo: 'Normativa en Pamplona y Navarra',
  normativaIntro:
    'Los contratos entre particulares en Pamplona combinan derecho estatal (LAU, Código Civil) con competencias autonómicas navarras en vivienda:',
  normativaPuntos: [
    'Depósito de fianza legal ante el organismo autonómico de Navarra',
    'Cláusulas de arras penitenciales válidas en todo el territorio foral con revisión registral',
    'Actualización de renta conforme a Ley de Vivienda 2026 y situación de gran tenedor',
    'Certificado energético vigente antes de compraventa o alquiler de larga duración',
  ],
  barriosTitulo: 'Barrios de Pamplona y Comarca',
  barriosIntro:
    'Desde el Ensanche hasta Barañáin, cada zona tiene dinámica de operación distinta:',
  barrios: [
    {
      nombre: 'Casco Antiguo y Ensanche',
      contexto: 'Núcleo urbano — alta rotación',
      operativa:
        'LAU con inventario en amueblados. Arras en compraventa con revisión de obras en fachada y comunidad.',
    },
    {
      nombre: 'Iturrama y San Juan',
      contexto: 'Residencial y familiar',
      operativa:
        'Alquiler LAU de larga duración. Pack vendedor para propietarios que venden sin agencia.',
    },
    {
      nombre: 'Mendillorri y Rochapea',
      contexto: 'Barrios de expansión',
      operativa:
        'Compraventa entre particulares con arras penitenciales. Acompañamiento de compra por tarifa fija 687 €.',
    },
    {
      nombre: 'Buztintxuri y Ermitagaña',
      contexto: 'Perfil mixto urbano',
      operativa:
        'Alquiler LAU con fianza autonómica. Arras en operaciones rápidas entre particulares.',
    },
    {
      nombre: 'Burlada y Barañáin',
      contexto: 'Comarca de Pamplona',
      operativa:
        'Operaciones familiares con ticket medio. Due diligence documental en packs arras plus.',
    },
    {
      nombre: 'Tudela y resto de Navarra',
      contexto: 'Provincia navarra',
      operativa:
        'Mismo marco legal. Arras con verificación registral adaptada al municipio del inmueble.',
    },
  ],
  serviciosTitulo: 'Gestoría de contratos inmobiliarios en Pamplona',
  serviciosIntro:
    'Arras en el Ensanche, alquiler LAU en Iturrama o venta sin agencia en Rochapea: precio cerrado, panel de seguimiento y gestor asignado.',
  faq: [
    {
      q: '¿Los contratos son válidos en toda Navarra?',
      a: 'Sí. Redactamos para Pamplona, Tudela y cualquier municipio navarro. Adaptamos cláusulas a la normativa autonómica de fianzas y vivienda.',
    },
    {
      q: '¿Navarra tiene normativa foral distinta en alquiler?',
      a: 'Navarra tiene competencias propias en vivienda dentro del marco estatal. La LAU aplica, pero el depósito de fianza y algunas obligaciones siguen normativa autonómica navarra.',
    },
    {
      q: '¿Puedo alquilar un piso en el Casco Antiguo con contrato LAU?',
      a: 'Sí, si el uso es vivienda habitual del inquilino. Redactamos el contrato con cláusulas de duración, fianza y actualización de renta conformes a la normativa vigente.',
    },
  ],
  enlaceGestoria: '/gestoria/asesoria-compra-piso/pamplona',
  enlaceArras: '/pamplona/contrato-arras',
  enlaceAlquiler: '/pamplona/contrato-alquiler',
}

export const CONTRATOS_INMOBILIARIOS_CIUDADES: Record<
  ContratosInmobiliariosCiudadSlug,
  ContratosInmobiliariosCiudadConfig
> = {
  madrid: MADRID,
  barcelona: BARCELONA,
  valencia: VALENCIA,
  sevilla: SEVILLA,
  malaga: MALAGA,
  bilbao: BILBAO,
  zaragoza: ZARAGOZA,
  alicante: ALICANTE,
  palma: PALMA,
  murcia: MURCIA,
  coruna: CORUNA,
  pamplona: PAMPLONA,
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
