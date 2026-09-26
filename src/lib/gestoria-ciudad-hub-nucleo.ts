import type { CiudadHubConfig } from './gestoria-ciudad-hub-data'
import { GESTORIA_HUB_FAQ_COMUN } from './gestoria-hub-faq-comun'
import { GESTORIA_MALAGA_FAQ } from './gestoria-malaga-faq'
import { GESTORIA_PALMA_FAQ } from './gestoria-palma-faq'

/** Hubs gestoría para ciudades núcleo sin página custom (Madrid/Barcelona/Valencia/Sevilla aparte) */
export const CIUDAD_HUBS_NUCLEO: Record<string, CiudadHubConfig> = {
  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    region: 'Principado de Asturias',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Asturias. Oviedo, Gijón y Avilés. Contratos desde 145€, pack arras 450€, due diligence 350€. Sin comisiones de agencia.',
    keywords:
      'gestoría inmobiliaria asturias, contrato arras oviedo, contrato alquiler gijon, comprar piso asturias sin agencia',
    heroBadge: 'Gestoría 100% Online | Asturias',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Oviedo, Gijón y Avilés. Contratos desde 145€. Trámite online con gestor asignado.',
    ogImage: '/gestoria6.jpg',
    twitterDescription: 'Contratos, arras y due diligence en Asturias desde 145€. Panel online y gestor asignado.',
    razones: [
      {
        titulo: 'Compraventa entre particulares habitual',
        descripcion:
          'En Oviedo y Gijón muchas operaciones van sin agencia. Sin revisión documental heredas derramas, ITE pendiente o arras redactadas solo por el vendedor.',
      },
      {
        titulo: 'Mercado universitario y de habitaciones',
        descripcion:
          'Alquiler de habitaciones y pisos compartidos requiere contratos claros (Código Civil o LAU según el caso).',
      },
      {
        titulo: 'Honorarios fijos vs comisión 3-5%',
        descripcion:
          'En un piso de 185.000€ la agencia cobra miles de euros. Inmonest: arras 145€, due diligence 350€, venta completa 687€.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Oviedo Centro', rango: '550-750€/mes', perfil: 'profesionales y universidad' },
      { nombre: 'Gijón Centro', rango: '500-700€/mes', perfil: 'familias' },
      { nombre: 'Avilés', rango: '450-650€/mes', perfil: 'industrial y residencial' },
      { nombre: 'Langreo', rango: '400-550€/mes', perfil: 'área metropolitana' },
    ],
    mercadoCompraventa: [
      'En **Oviedo y Gijón** el precio medio ronda **1.600-2.400€/m²** en centro.',
      'Comisión agencia 3-5% vs **687€** servicio Inmonest hasta escritura.',
    ],
    mercadoParticularidades: [
      'ITE en edificios de más de 50 años',
      'Depósito fianza LAU autonómico',
      'Certificado energético obligatorio en compraventa',
      'Trámite online con gestor hasta notaría asturiana',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Asturias para particulares.',
    serviciosSubtitulo:
      'Arras, alquiler LAU, pack vendedor, due diligence y venta completa en Oviedo, Gijón y Avilés.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Asturias?',
    ctaFinalTexto: 'Opera con gestor asignado y precio cerrado hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/asturias/contrato-arras', label: 'Ver contrato arras Asturias →' },
      { slug: 'contrato-alquiler', href: '/asturias/contrato-alquiler', label: 'Ver contrato alquiler Asturias →' },
    ],
  },

  granada: {
    slug: 'granada',
    nombre: 'Granada',
    region: 'Andalucía',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Granada. Contratos desde 145€, pack arras 450€, due diligence 350€. Trámite 100% online sin comisiones de agencia.',
    keywords:
      'gestoría inmobiliaria granada, gestoría particulares granada, contrato arras granada, comprar piso granada sin agencia',
    heroBadge: 'Gestoría 100% Online | Granada',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Granada. Compraventas directas en centro, Realejo y Zaidín. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria5.jpg',
    twitterDescription: 'Contratos, arras y due diligence en Granada desde 145€. Gestor asignado online.',
    razones: [
      {
        titulo: 'Muchas operaciones entre particulares',
        descripcion:
          'En Granada es habitual comprar sin agencia. Sin revisión documental, heredas derramas, ITE pendiente en casco o arras redactadas solo por el vendedor.',
      },
      {
        titulo: 'Casco histórico y normativa andaluza',
        descripcion:
          'Albaicín y centro exigen cédula, ITE y licencias coherentes. Un gestor evita bloqueos en notaría por documentación incompleta.',
      },
      {
        titulo: 'Honorarios fijos vs comisión 3-5%',
        descripcion:
          'En un piso de 195.000€ la agencia cobra miles de euros. Inmonest trabaja con precios cerrados: pack arras 450€, due diligence 350€.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro / Realejo', rango: '650-950€/mes', perfil: 'residentes y universidad' },
      { nombre: 'Zaidín', rango: '550-750€/mes', perfil: 'familias' },
      { nombre: 'Albaicín', rango: '700-1.000€/mes', perfil: 'turismo regulado' },
      { nombre: 'Armilla', rango: '450-650€/mes', perfil: 'área metropolitana' },
    ],
    mercadoCompraventa: [
      'En **Granada capital** el precio medio ronda **2.000-2.900€/m²** en centro y Realejo; en **Zaidín o Armilla**, **1.500-2.200€/m²**.',
      'Comisión de agencia 3-5%: en 195.000€ son **5.850-9.750€**. Servicio completo Inmonest: **687€** fijos hasta escritura.',
    ],
    mercadoParticularidades: [
      'ITE en edificios de más de 50 años (Andalucía)',
      'Protección urbanística en Albaicín y casco',
      'ITP autonómico andaluz con bonificaciones según caso',
      'Trámite online con gestor hasta notaría granadina',
    ],
    faq: GESTORIA_MALAGA_FAQ,
    faqSubtitulo: 'Gestoría inmobiliaria en Granada: arras, due diligence y compraventa entre particulares.',
    serviciosSubtitulo: 'Servicios activos en Granada según inventario: pack arras, due diligence, venta completa y más.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Granada?',
    ctaFinalTexto: 'Opera con gestor asignado y precio fijo. Sin desplazamientos hasta la firma en notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/granada/contrato-arras', label: 'Ver contrato arras Granada →' },
      { slug: 'contrato-alquiler', href: '/granada/contrato-alquiler', label: 'Ver contrato alquiler Granada →' },
    ],
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Islas Baleares',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Mallorca. Palma, Calvià e isla. Contratos desde 145€, pack arras 450€. 100% online.',
    keywords:
      'gestoría inmobiliaria mallorca, gestoría palma particulares, contrato arras mallorca, comprar piso mallorca sin agencia',
    heroBadge: 'Gestoría 100% Online | Baleares',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Mallorca. Compraventas directas en Palma y costa. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria7.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Mallorca desde 145€. Trámite online hasta notaría balear.',
    razones: [
      {
        titulo: 'Compradores no residentes',
        descripcion:
          'Muchas operaciones desde península o extranjero. Necesitas plazos realistas en arras, due diligence remota y gestor que coordine con notaría balear.',
      },
      {
        titulo: 'Normativa balear específica',
        descripcion:
          'Cédula d\'habitabilitat, ITP 8% y uso turístico mal encuadrado son fuentes habituales de conflictos en compras directas.',
      },
      {
        titulo: 'Mercado premium, errores caros',
        descripcion:
          'En Palma un error documental puede costar decenas de miles. Due diligence 350€ y pack arras 450€ son alternativa a comisiones del 3-5%.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Palma centro', rango: '900-1.400€/mes', perfil: 'residentes' },
      { nombre: 'Pere Garau', rango: '750-1.050€/mes', perfil: 'familias locales' },
      { nombre: 'Calvià / costa', rango: '1.100-1.800€/mes', perfil: 'segunda residencia' },
      { nombre: 'Inca / interior', rango: '500-700€/mes', perfil: 'ticket accesible' },
    ],
    mercadoCompraventa: [
      '**Palma** suele moverse en **3.200-4.200€/m²** en centro; **Calvià** y costa, **3.000-4.500€/m²**.',
      'En 285.000€ la agencia cobra **8.550-14.250€**. Inmonest: **687€** servicio completo o **450€** pack arras con revisión documental.',
    ],
    mercadoParticularidades: [
      'Cédula d\'habitabilitat obligatoria',
      'Depósito fianza LAU en IBAVI',
      'Verificar ETV / uso turístico en la compra',
      'Gestión 100% online hasta firma en notaría',
    ],
    faq: GESTORIA_PALMA_FAQ,
    faqSubtitulo: 'Gestoría en Mallorca: Palma, Calvià y municipios de la isla.',
    serviciosSubtitulo: 'Pack arras, due diligence, venta completa y préstamo entre particulares en Mallorca.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Mallorca?',
    ctaFinalTexto: 'Gestor asignado y trámite online. Solo viajas a la isla para escriturar.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/mallorca/contrato-arras', label: 'Ver contrato arras Mallorca →' },
      { slug: 'contrato-alquiler', href: '/mallorca/contrato-alquiler', label: 'Ver contrato alquiler Mallorca →' },
    ],
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Murcia. Contratos LAU y arras desde 145€, pack arras 450€, due diligence 350€. Sin comisiones.',
    keywords: 'gestoría inmobiliaria murcia, contrato arras murcia, comprar piso murcia particular',
    heroBadge: 'Gestoría 100% Online | Murcia',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Murcia capital y área metropolitana. Mercado accesible y muchas ventas directas. Desde 145€.',
    ogImage: '/gestoria3.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Murcia desde 145€. Online hasta notaría.',
    razones: [
      {
        titulo: 'Operaciones rápidas sin revisión',
        descripcion: 'En Murcia es habitual firmar arras en días. El pack arras incluye auditoría documental antes de la señal.',
      },
      {
        titulo: 'Precios accesibles, comisiones proporcionales',
        descripcion: 'Aun con tickets moderados, el 3-5% de agencia duele. Honorarios fijos desde 145€.',
      },
      {
        titulo: 'Documentación regional',
        descripcion: 'Cédula de habitabilidad, ITE y deudas de comunidad revisadas por gestor asignado.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro', rango: '450-650€/mes', perfil: 'residentes' },
      { nombre: 'Vista Alegre', rango: '500-700€/mes', perfil: 'familias' },
      { nombre: 'El Palmar', rango: '400-550€/mes', perfil: 'expansión sur' },
      { nombre: 'Cartagena', rango: '450-650€/mes', perfil: 'costa mediterránea' },
    ],
    mercadoCompraventa: [
      'Murcia capital: **1.300-2.000€/m²** en barrios residenciales.',
      'Agencia 3-5% vs **687€** venta completa Inmonest en operaciones entre particulares.',
    ],
    mercadoParticularidades: [
      'Cédula de habitabilidad regional',
      'ITE en edificios antiguos',
      'Plusvalía municipal (IIVTNU)',
      'Trámite online con panel y gestor',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Preguntas frecuentes sobre gestoría inmobiliaria en Murcia.',
    serviciosSubtitulo: 'Servicios de gestoría activos en Murcia según tu necesidad.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Murcia?',
    ctaFinalTexto: 'Contrata gestoría con precio cerrado y evita sorpresas en notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/murcia/contrato-arras', label: 'Ver contrato arras Murcia →' },
      { slug: 'contrato-alquiler', href: '/murcia/contrato-alquiler', label: 'Ver contrato alquiler Murcia →' },
    ],
  },

  castellon: {
    slug: 'castellon',
    nombre: 'Castellón',
    region: 'Comunitat Valenciana',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Castellón. Contratos LAU y arras desde 145€, due diligence 350€, pack arras 450€. Grao, litoral y provincia. 100% online.',
    keywords:
      'gestoría inmobiliaria castellon, contrato arras castellon, contrato alquiler castellon, comprar piso castellon particular',
    heroBadge: 'Gestoría 100% Online | Castellón',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Castelló de la Plana, Grao y litoral castellonense. Cerámica, universidad Jaume I y compraventa rápida entre particulares.',
    ogImage: '/gestoria4.jpg',
    twitterDescription: 'Contratos, arras y due diligence en Castellón desde 145€. Gestor asignado online.',
    razones: [
      {
        titulo: 'Arras con plazos muy cortos',
        descripcion:
          'En Castellón es habitual firmar señal en pocos días. Revisión de arras y due diligence evita sorpresas en comunidad o cargas.',
      },
      {
        titulo: 'Alquiler universitario y habitaciones',
        descripcion:
          'Demanda de habitaciones y pisos compartidos cerca de la UJI. Contratos Código Civil o LAU según el caso.',
      },
      {
        titulo: 'Honorarios fijos vs comisión 3-5%',
        descripcion:
          'En operaciones entre particulares, Inmonest cobra desde 145€ por contrato y 687€ venta completa hasta escritura.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro Castelló', rango: '550-750€/mes', perfil: 'residentes y profesionales' },
      { nombre: 'Grao', rango: '500-700€/mes', perfil: 'litoral y familias' },
      { nombre: 'Benicàssim', rango: '600-900€/mes', perfil: 'segunda residencia y temporada' },
      { nombre: 'Vila-real', rango: '450-650€/mes', perfil: 'área metropolitana' },
    ],
    mercadoCompraventa: [
      'Castelló capital: **1.400-2.200€/m²** según barrio y proximidad al mar.',
      'Comisión agencia 3-5% vs **687€** servicio Inmonest hasta escritura en compraventa directa.',
    ],
    mercadoParticularidades: [
      'Cédula de habitabilidad valenciana',
      'Depósito fianza LAU ante Generalitat (AVANT)',
      'Distinción alquiler habitual vs temporada en litoral',
      'Trámite online con panel y gestor hasta notaría castellonense',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Castellón para particulares.',
    serviciosSubtitulo: 'Arras, LAU, habitación, local comercial, préstamos entre particulares y due diligence en Castellón.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Castellón?',
    ctaFinalTexto: 'Opera con gestor asignado y precio cerrado hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/castellon/contrato-arras', label: 'Ver contrato arras Castellón →' },
      { slug: 'contrato-alquiler', href: '/castellon/contrato-alquiler', label: 'Ver contrato alquiler Castellón →' },
    ],
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Salamanca. Contratos desde 145€, venta completa 687€, pack arras 450€. Sin comisiones.',
    keywords: 'gestoría inmobiliaria salamanca, contrato arras salamanca, comprar piso salamanca',
    heroBadge: 'Gestoría 100% Online | Castilla y León',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Salamanca. Casco histórico y mercado universitario. Contratos desde 145€.',
    ogImage: '/gestoria2.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Salamanca desde 145€.',
    razones: [
      {
        titulo: 'Mercado universitario y casco histórico',
        descripcion: 'Licencias, ITE y arras desequilibradas son frecuentes en compras entre particulares.',
      },
      {
        titulo: 'Venta sin agencia',
        descripcion: 'Muchos propietarios publican en portales. Un gestor revisa documentación antes de la señal.',
      },
      {
        titulo: 'Precio fijo',
        descripcion: 'Sin comisión sobre el precio del piso. Pack arras 450€, due diligence 350€.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Casco histórico', rango: '550-800€/mes', perfil: 'universitario' },
      { nombre: 'Garrido', rango: '450-650€/mes', perfil: 'familias' },
      { nombre: 'San Bernardo', rango: '500-700€/mes', perfil: 'residentes' },
    ],
    mercadoCompraventa: [
      'Precio medio **1.800-2.400€/m²** en zonas céntricas.',
      'Comisión agencia vs **687€** servicio Inmonest hasta escritura.',
    ],
    mercadoParticularidades: [
      'Protección del casco histórico',
      'Certificado energético obligatorio',
      'Depósito fianza LAU autonómico',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria online en Salamanca.',
    serviciosSubtitulo: 'Venta completa, pack arras y due diligence en Salamanca.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Salamanca?',
    ctaFinalTexto: 'Gestor asignado y trámite online hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/salamanca/contrato-arras', label: 'Ver contrato arras Salamanca →' },
      { slug: 'contrato-alquiler', href: '/salamanca/contrato-alquiler', label: 'Ver contrato alquiler Salamanca →' },
    ],
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Valladolid. Contratos desde 145€, pack arras y due diligence. Sin comisiones de agencia.',
    keywords: 'gestoría inmobiliaria valladolid, contrato arras valladolid, comprar piso valladolid',
    heroBadge: 'Gestoría 100% Online | Valladolid',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Valladolid. Compradores desde Madrid y operaciones directas. Desde 145€.',
    ogImage: '/gestoria4.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Valladolid desde 145€.',
    razones: [
      {
        titulo: 'Demanda desde Madrid',
        descripcion: 'Compradores externos necesitan gestoría remota y plazos realistas en arras.',
      },
      {
        titulo: 'Compraventa entre particulares',
        descripcion: 'Due diligence 350€ antes de señal evita deudas de comunidad ocultas.',
      },
      {
        titulo: 'Honorarios transparentes',
        descripcion: 'Precios cerrados frente a comisiones del 3-5%.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro', rango: '550-800€/mes', perfil: 'profesionales' },
      { nombre: 'Parquesol', rango: '600-850€/mes', perfil: 'familias' },
      { nombre: 'Delicias', rango: '450-650€/mes', perfil: 'mixto' },
    ],
    mercadoCompraventa: [
      'Centro y Parquesol: **1.600-2.200€/m²** aproximadamente.',
      'Inmonest **687€** venta completa vs miles en comisión de agencia.',
    ],
    mercadoParticularidades: [
      'ITE en centro histórico',
      'ITP castellanoleonés',
      'Gestión documental online',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Valladolid para particulares.',
    serviciosSubtitulo: 'Servicios activos en Valladolid: pack arras, due diligence, venta completa.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Valladolid?',
    ctaFinalTexto: 'Opera con seguridad jurídica y gestor asignado.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/valladolid/contrato-arras', label: 'Ver contrato arras Valladolid →' },
      { slug: 'contrato-alquiler', href: '/valladolid/contrato-alquiler', label: 'Ver contrato alquiler Valladolid →' },
    ],
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    metaDescription:
      'Gestoría inmobiliaria para particulares en A Coruña. Contratos desde 145€, due diligence 350€, pack arras 450€. 100% online.',
    keywords: 'gestoría inmobiliaria coruña, gestoría a coruña particulares, contrato arras coruña',
    heroBadge: 'Gestoría 100% Online | Galicia',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en A Coruña y área metropolitana. Normativa gallega. Contratos desde 145€.',
    ogImage: '/gestoria6.jpg',
    twitterDescription: 'Gestoría inmobiliaria en A Coruña desde 145€.',
    razones: [
      {
        titulo: 'Normativa gallega',
        descripcion: 'Cédula, ITE y documentación Xunta revisada antes de escritura.',
      },
      {
        titulo: 'Compras sin agencia',
        descripcion: 'Pack arras con informe documental por 450€ IVA incluido.',
      },
      {
        titulo: 'Trámite remoto',
        descripcion: 'Panel online y gestor hasta notaría coruñesa.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Ensanche', rango: '550-800€/mes', perfil: 'familias' },
      { nombre: 'Ciudad Vieja', rango: '600-900€/mes', perfil: 'centro' },
      { nombre: 'Mesoiro', rango: '450-650€/mes', perfil: 'expansión' },
    ],
    mercadoCompraventa: [
      'A Coruña: **1.800-2.600€/m²** en zonas demandadas.',
      'Evita comisiones 3-5% con honorarios fijos Inmonest.',
    ],
    mercadoParticularidades: [
      'Documentación Xunta de Galicia',
      'ITE en edificios antiguos del ensanche',
      'Plusvalía municipal',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en A Coruña.',
    serviciosSubtitulo: 'Due diligence, pack arras y venta completa en A Coruña.',
    ctaFinalTitulo: '¿Vas a comprar o vender en A Coruña?',
    ctaFinalTexto: 'Gestoría online con precio cerrado.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/coruna/contrato-arras', label: 'Ver contrato arras A Coruña →' },
      { slug: 'contrato-alquiler', href: '/coruna/contrato-alquiler', label: 'Ver contrato alquiler A Coruña →' },
    ],
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Pamplona. Contratos desde 145€, pack arras 450€, due diligence 350€. Normativa foral.',
    keywords: 'gestoría inmobiliaria pamplona, contrato arras pamplona, comprar piso navarra',
    heroBadge: 'Gestoría 100% Online | Navarra',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Pamplona. Derecho foral y mercado dinámico. Contratos desde 145€.',
    ogImage: '/gestoria18.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Pamplona desde 145€.',
    razones: [
      {
        titulo: 'Particularidades forales',
        descripcion: 'Navarra exige revisar documentación con criterio local antes de arras.',
      },
      {
        titulo: 'Mercado en alza',
        descripcion: 'Plazos cortos y arras del vendedor: conviene equilibrio jurídico profesional.',
      },
      {
        titulo: 'Sin comisión sobre el piso',
        descripcion: 'Pack arras 450€ y due diligence 350€ con gestor asignado.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Iturrama', rango: '650-900€/mes', perfil: 'familias' },
      { nombre: 'Casco Antiguo', rango: '700-1.000€/mes', perfil: 'centro' },
      { nombre: 'Rochapea', rango: '500-700€/mes', perfil: 'mixto' },
    ],
    mercadoCompraventa: [
      'Pamplona: **2.400-3.400€/m²** en zonas residenciales demandadas.',
      'Servicio completo Inmonest **687€** frente a comisiones de agencia.',
    ],
    mercadoParticularidades: [
      'Normativa urbanística navarra',
      'ITE en casco antiguo',
      'Depósito fianza LAU',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Pamplona y Navarra.',
    serviciosSubtitulo: 'Pack arras, due diligence y venta completa en Pamplona.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Pamplona?',
    ctaFinalTexto: 'Trámite online con gestor hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/pamplona/contrato-arras', label: 'Ver contrato arras Pamplona →' },
      { slug: 'contrato-alquiler', href: '/pamplona/contrato-alquiler', label: 'Ver contrato alquiler Pamplona →' },
    ],
  },

  santander: {
    slug: 'santander',
    nombre: 'Santander',
    region: 'Cantabria',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Santander. Contratos LAU y arras desde 145€, pack arras 450€, venta completa 687€. Sin comisiones de agencia.',
    keywords:
      'gestoría inmobiliaria santander, contrato arras santander, contrato alquiler cantabria, comprar piso santander sin agencia',
    heroBadge: 'Gestoría 100% Online | Cantabria',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Santander y Cantabria. El Sardinero, centro y Camargo. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria6.jpg',
    twitterDescription: 'Contratos, arras y due diligence en Santander desde 145€. Panel online y gestor asignado.',
    razones: [
      {
        titulo: 'Mercado costero con segunda residencia',
        descripcion:
          'Operaciones en El Sardinero o Somo mezclan uso habitual y temporal. Un contrato mal redactado puede anular cláusulas o bloquear la fianza autonómica.',
      },
      {
        titulo: 'Compraventa entre particulares frecuente',
        descripcion:
          'Sin revisión documental heredas derramas, ITE pendiente o arras redactadas solo por el vendedor en un mercado con plazos cortos en verano.',
      },
      {
        titulo: 'Honorarios fijos vs comisión 3-5%',
        descripcion:
          'En un piso de 220.000€ la agencia cobra miles de euros. Inmonest: arras 145€, pack vendedor 450€, venta completa 687€.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro / Cuatro Caminos', rango: '650-950€/mes', perfil: 'profesionales' },
      { nombre: 'El Sardinero', rango: '800-1.200€/mes', perfil: 'costa y turismo' },
      { nombre: 'Cueto y Monte', rango: '550-750€/mes', perfil: 'familias' },
      { nombre: 'Camargo / Astillero', rango: '450-650€/mes', perfil: 'área metropolitana' },
    ],
    mercadoCompraventa: [
      'En **Santander capital** el precio medio ronda **2.400-3.200€/m²** en centro; en **Camargo**, **1.800-2.400€/m²**.',
      'Comisión agencia 3-5% vs **687€** servicio Inmonest hasta escritura.',
    ],
    mercadoParticularidades: [
      'ITE en edificios de más de 50 años',
      'Distinción LAU vs alquiler temporal en zona costera',
      'Depósito fianza conforme a normativa autonómica',
      'Certificado energético obligatorio en compraventa',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Santander y Cantabria para particulares.',
    serviciosSubtitulo:
      'Arras, alquiler LAU, pack vendedor y venta completa en Santander: precio cerrado, panel online y gestor asignado.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Santander?',
    ctaFinalTexto: 'Opera con gestor asignado y trámite 100% online hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/santander/contrato-arras', label: 'Ver contrato arras Santander →' },
      { slug: 'contrato-alquiler', href: '/santander/contrato-alquiler', label: 'Ver contrato alquiler Santander →' },
    ],
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    region: 'País Vasco',
    metaDescription:
      'Gestoría inmobiliaria para particulares en Vitoria-Gasteiz. Contratos desde 145€, pack arras 450€, due diligence 350€. Normativa foral vasca.',
    keywords:
      'gestoría inmobiliaria vitoria, contrato arras vitoria gasteiz, contrato alquiler álava, comprar piso vitoria sin agencia',
    heroBadge: 'Gestoría 100% Online | Álava',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en Vitoria-Gasteiz. Ensanche, Lakua y Zabalgana. Contratos desde 145€. Sin comisiones.',
    ogImage: '/gestoria9.jpg',
    twitterDescription: 'Gestoría inmobiliaria en Vitoria desde 145€. Panel online y gestor asignado.',
    razones: [
      {
        titulo: 'Capital de Álava con mercado estable',
        descripcion:
          'Compraventa familiar con ticket medio alto. Las arras sin condición de hipoteca o sin revisión registral pueden costar la señal entera.',
      },
      {
        titulo: 'Normativa foral y urbanística local',
        descripcion:
          'Vitoria exige coherencia documental antes de notaría. Un gestor evita bloqueos por ITE, cargas o cláusulas desequilibradas.',
      },
      {
        titulo: 'Precio fijo sin comisión sobre el piso',
        descripcion: 'Pack arras 450€, due diligence 350€ y venta completa 687€ con gestor asignado por WhatsApp.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Ensanche', rango: '700-950€/mes', perfil: 'profesionales' },
      { nombre: 'Lakua', rango: '650-850€/mes', perfil: 'familias' },
      { nombre: 'Zabalgana', rango: '550-750€/mes', perfil: 'expansión urbana' },
      { nombre: 'Casco Medieval', rango: '600-800€/mes', perfil: 'centro histórico' },
    ],
    mercadoCompraventa: [
      'Vitoria-Gasteiz: **2.200-3.000€/m²** en Ensanche y Lakua.',
      'Inmonest **687€** venta completa vs miles en comisión de agencia.',
    ],
    mercadoParticularidades: [
      'Normativa foral vasca en transmisión',
      'ITE en edificios antiguos del casco',
      'Depósito fianza LAU autonómico',
      'Certificado energético vigente',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en Vitoria-Gasteiz y Álava.',
    serviciosSubtitulo:
      'Servicios activos en Vitoria: arras, alquiler LAU, pack vendedor y due diligence con panel de seguimiento.',
    ctaFinalTitulo: '¿Vas a comprar o vender en Vitoria?',
    ctaFinalTexto: 'Gestor asignado y precio cerrado hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/vitoria/contrato-arras', label: 'Ver contrato arras Vitoria →' },
      { slug: 'contrato-alquiler', href: '/vitoria/contrato-alquiler', label: 'Ver contrato alquiler Vitoria →' },
    ],
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebastián',
    region: 'País Vasco',
    metaDescription:
      'Gestoría inmobiliaria para particulares en San Sebastián. Contratos desde 145€, pack arras 450€, venta completa 687€. Donostia, Gros y Área metropolitana.',
    keywords:
      'gestoría inmobiliaria san sebastián, contrato arras donostia, contrato alquiler gipuzkoa, comprar piso san sebastián sin agencia',
    heroBadge: 'Gestoría 100% Online | Gipuzkoa',
    heroSubtitulo:
      'Gestoría inmobiliaria para particulares en San Sebastián (Donostia). Mercado tensionado, alta demanda y operativa entre particulares. Desde 145€.',
    ogImage: '/gestoria10.jpg',
    twitterDescription: 'Gestoría inmobiliaria en San Sebastián desde 145€. Panel online y gestor asignado.',
    razones: [
      {
        titulo: 'Mercado de alta demanda y precios elevados',
        descripcion:
          'En Gros o Centro un error en arras o alquiler LAU puede suponer miles de euros. Revisamos cláusulas con rigor de mercado premium.',
      },
      {
        titulo: 'Normativa foral y vivienda tensionada',
        descripcion:
          'Gipuzkoa tiene particularidades en fianzas y vivienda. Adaptamos contratos a la normativa autonómica vasca aplicable.',
      },
      {
        titulo: 'Venta sin agencia con documentación exigente',
        descripcion:
          'Pack vendedor 450€: arras a tu favor y recopilación de documentación de comunidad, ITE y certificado energético.',
      },
    ],
    mercadoZonas: [
      { nombre: 'Centro / Parte Vieja', rango: '900-1.400€/mes', perfil: 'turismo y residentes' },
      { nombre: 'Gros', rango: '850-1.200€/mes', perfil: 'jóvenes profesionales' },
      { nombre: 'Amara', rango: '700-950€/mes', perfil: 'familias' },
      { nombre: 'Irun / Errenteria', rango: '550-750€/mes', perfil: 'área metropolitana' },
    ],
    mercadoCompraventa: [
      'Donostia: **4.500-6.500€/m²** en zonas céntricas; en **Amara**, **3.500-4.800€/m²**.',
      'Comisión agencia vs **687€** servicio Inmonest hasta escritura.',
    ],
    mercadoParticularidades: [
      'Mercado tensionado — plazos cortos en operaciones deseadas',
      'Normativa foral vasca en transmisión',
      'ITE y protección patrimonial en casco histórico',
      'Depósito fianza LAU autonómico',
    ],
    faq: GESTORIA_HUB_FAQ_COMUN,
    faqSubtitulo: 'Gestoría inmobiliaria en San Sebastián y Gipuzkoa.',
    serviciosSubtitulo:
      'Arras, alquiler LAU y venta completa en Donostia: precio cerrado, panel online y gestor asignado en 48 h.',
    ctaFinalTitulo: '¿Vas a comprar o vender en San Sebastián?',
    ctaFinalTexto: 'Opera con seguridad jurídica y gestor asignado hasta notaría.',
    enlacesContrato: [
      { slug: 'arras-penitenciales', href: '/san-sebastian/contrato-arras', label: 'Ver contrato arras San Sebastián →' },
      { slug: 'contrato-alquiler', href: '/san-sebastian/contrato-alquiler', label: 'Ver contrato alquiler San Sebastián →' },
    ],
  },
}
