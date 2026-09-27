import type { DueDiligenceCiudadConfig } from '@/lib/due-diligence-ciudad-data'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  GESTORIA_CIUDADES_EXPANSION_NOMBRES,
  GESTORIA_CIUDADES_EXPANSION_SLUGS,
} from '@/lib/gestoria-ciudades-expansion'

const gestor = {
  nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
  foto: GESTOR_DANIEL_HERNANDEZ.foto,
}

export const DUE_DILIGENCE_CIUDAD_EXPANSION: Record<string, DueDiligenceCiudadConfig> = {
  vigo: {
    slug: 'vigo',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.vigo,
    region: 'Galicia · Pontevedra',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('vigo').src,
    precioEjemploPiso: 195_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Vigo',
      bio: 'Compraventas entre particulares en Vigo, Bouzas y área metropolitana. Revisión de cargas, comunidad portuaria y coherencia registral antes de la señal.',
      especialidades: ['Compras sin agencia', 'Nota simple', 'Derramas en bloques altos'],
    },
    docTecnicaTitulo: 'Documentación técnica · Vigo y Ría',
    docTecnicaItems: [
      'Cédula de habitabilidad galicia',
      'Certificado energético obligatorio',
      'ITE en edificios del Ensanche y Casco Vello',
      'Licencias de obras en reformas de loft',
    ],
    zonasIntro: 'Vigo capital, Bouzas, Teis, Coia y Nigrán.',
    zonas: ['Casco Vello', 'Príncipe', 'Coia', 'Teis', 'Bouzas', 'Samil', 'Nigrán'],
    meta: {
      title: 'Due diligence Vigo — Beiramar y Ensanche antes de la señal (350€)',
      description:
        '¿Compras piso de particular en Vigo? Gestor revisa nota simple, comunidad y cargas en la Ría. 350€ IVA incl. Trámite 100 % online en toda España.',
      keywords:
        'due diligence vigo, comprar piso particular vigo, revisar documentacion compra vigo, gestor compra vivienda galicia',
      ogTitle: 'Due Diligence Vigo — Compra segura en la Ría (350€)',
      ogDescription: 'Revisión documental para compradores entre particulares en Vigo y área metropolitana.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Vigo',
      lead:
        'En Vigo muchas operaciones van sin agencia y con plazos cortos. Tu gestor audita arras, registro y comunidad antes de entregar señal. 350€ fijos, online.',
    },
  },

  cordoba: {
    slug: 'cordoba',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.cordoba,
    region: 'Andalucía · Córdoba',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('cordoba').src,
    precioEjemploPiso: 175_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Córdoba',
      bio: 'Especialista en compras entre particulares en casco histórico y expansión moderna. Patrimonio UNESCO implica restricciones urbanísticas que conviene verificar en documentación.',
      especialidades: ['Casco histórico', 'Comunidad y derramas', 'Cargas registrales'],
    },
    docTecnicaTitulo: 'Patrimonio, ITE y licencias en Córdoba',
    docTecnicaItems: [
      'Cédula de habitabilidad andaluza',
      'Certificado energético',
      'ITE en edificios del centro histórico',
      'Licencias de obras en patios y reformas integrales',
    ],
    zonasIntro: 'Centro UNESCO, Levante, Poniente Sur y pueblos del Área Metropolitana.',
    zonas: ['Judería', 'Levante', 'Poniente Sur', 'Mirflores', 'Sector Sur', 'El Brillante'],
    meta: {
      title: 'Due diligence Córdoba — Casco UNESCO y arras sin sorpresas (350€)',
      description:
        'Compra de particular en Córdoba: revisión registral, comunidad, ITE y urbanismo. Informe en 3–5 días. 350€ IVA incl. Gestoría online.',
      keywords:
        'due diligence cordoba, comprar piso particular cordoba, revision documentacion compra cordoba',
      ogTitle: 'Due Diligence Córdoba — 350€ · Gestor asignado',
      ogDescription: 'Auditoría documental antes de escriturar en Córdoba capital y área metropolitana.',
    },
    hero: {
      h1: 'Due diligence pre-compra en Córdoba entre particulares',
      lead:
        '¿Firmas arras en el casco o en Levante? Revisamos nota simple, actas de comunidad y coherencia urbanística antes de comprometer la señal.',
    },
  },

  'las-palmas': {
    slug: 'las-palmas',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES['las-palmas'],
    region: 'Canarias · Gran Canaria',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('las-palmas').src,
    precioEjemploPiso: 210_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Gran Canaria',
      bio: 'Compradores peninsulares y residentes en Las Palmas: revisión de titularidad, cargas, comunidad y normativa turística cuando aplica al inmueble.',
      especialidades: ['Compradores peninsulares', 'Registro y nota simple', 'Comunidad de propietarios'],
    },
    docTecnicaTitulo: 'Documentación en Gran Canaria',
    docTecnicaItems: [
      'Cédula de habitabilidad canaria',
      'Certificado energético',
      'ITE según antigüedad del edificio',
      'Situación registral y tributación canaria (IGIC en operaciones comerciales)',
    ],
    zonasIntro: 'Las Palmas capital, Vegueta, Triana, Alisios y sur de la isla.',
    zonas: ['Vegueta', 'Triana', 'Alcaravaneras', 'Ciudad Jardín', 'Telde', 'Maspalomas'],
    meta: {
      title: 'Due diligence Las Palmas — Gran Canaria antes de escriturar (350€)',
      description:
        'Compra vivienda de particular en Las Palmas: gestor revisa registro, comunidad e informes técnicos. 350€ IVA incl. Online desde península o islas.',
      keywords:
        'due diligence las palmas, comprar piso particular gran canaria, revision compra vivienda canarias',
      ogTitle: 'Due Diligence Las Palmas de Gran Canaria — 350€',
      ogDescription: 'Informe documental para compradores entre particulares en Gran Canaria.',
    },
    hero: {
      h1: 'Revisión documental al comprar piso en Las Palmas',
      lead:
        'Operaciones a distancia son habituales en Canarias. Subes documentación al panel; tu gestor audita todo antes de la señal. 350€ tarifa plana.',
    },
  },

  'santa-cruz': {
    slug: 'santa-cruz',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES['santa-cruz'],
    region: 'Canarias · Tenerife',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('santa-cruz').src,
    precioEjemploPiso: 205_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Tenerife',
      bio: 'Due diligence para compradores en Santa Cruz, La Laguna y costa sur. Detectamos cargas, deudas de comunidad y gaps documentales antes de notaría.',
      especialidades: ['Tenerife capital', 'Compras a distancia', 'Informe ejecutivo PDF'],
    },
    docTecnicaTitulo: 'Certificados y registro en Tenerife',
    docTecnicaItems: [
      'Cédula de habitabilidad',
      'Certificado energético',
      'ITE en edificios antiguos del centro',
      'Nota simple y concordancia con catastro',
    ],
    zonasIntro: 'Santa Cruz, Anaga, Ofra y área metropolitana con La Laguna.',
    zonas: ['Centro', 'Nordeste', 'Ofra', 'La Laguna', 'Adeje', 'Arona'],
    meta: {
      title: 'Due diligence Santa Cruz de Tenerife — Compra particular (350€)',
      description:
        '¿Compras piso en Tenerife de particular a particular? Revisión documental completa con gestor online. 350€ IVA incl. Informe en 3–5 días.',
      keywords:
        'due diligence santa cruz tenerife, comprar piso particular tenerife, gestor compra vivienda canarias',
      ogTitle: 'Due Diligence Santa Cruz de Tenerife — 350€',
      ogDescription: 'Auditoría pre-compra online para el mercado tenerifeño.',
    },
    hero: {
      h1: 'Due diligence pre-compra en Santa Cruz de Tenerife',
      lead:
        'Antes de transferir señal desde península o isla, verificamos arras, registro, comunidad y certificados obligatorios con el mismo gestor de principio a fin.',
    },
  },

  cadiz: {
    slug: 'cadiz',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.cadiz,
    region: 'Andalucía · Bahía de Cádiz',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('cadiz').src,
    precioEjemploPiso: 185_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Cádiz',
      bio: 'Mercado con segunda residencia y compradores de otras provincias. Revisión rigurosa de comunidad, humedades declaradas en actas e ITE en edificios costeros.',
      especialidades: ['Bahía de Cádiz', 'Segunda residencia', 'Arras entre particulares'],
    },
    docTecnicaTitulo: 'ITE y comunidad en la costa gaditana',
    docTecnicaItems: [
      'Cédula de habitabilidad',
      'Certificado energético',
      'ITE en bloques de los 70-80',
      'Actas de comunidad y derramas por fachada',
    ],
    zonasIntro: 'Cádiz capital, San Fernando, El Puerto y Chiclana.',
    zonas: ['La Viña', 'Centro Histórico', 'Playa Victoria', 'San Fernando', 'El Puerto', 'Chiclana'],
    meta: {
      title: 'Due diligence Cádiz — Bahía y costa antes de firmar arras (350€)',
      description:
        'Compra entre particulares en Cádiz y bahía: gestor revisa documentación registral y comunidad. 350€ IVA incl. Trámite online.',
      keywords:
        'due diligence cadiz, comprar piso particular cadiz, revision documentacion compra bahia cadiz',
      ogTitle: 'Due Diligence Cádiz — 350€ · Sin comisión de agencia',
      ogDescription: 'Informe documental para compradores particulares en la provincia de Cádiz.',
    },
    hero: {
      h1: 'Revisión documental al comprar piso en Cádiz',
      lead:
        '¿Compras en el casco isleño o en la bahía? Tu gestor analiza cargas, derramas e informes técnicos antes de que entregues señal elevada.',
    },
  },

  badajoz: {
    slug: 'badajoz',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.badajoz,
    region: 'Extremadura',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('badajoz').src,
    precioEjemploPiso: 125_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Extremadura',
      bio: 'Compraventa entre particulares en Badajoz y frontera con Portugal. Precios accesibles pero riesgo de cargas ocultas o documentación incompleta del vendedor.',
      especialidades: ['Extremadura', 'Compradores primera vivienda', 'Nota simple'],
    },
    docTecnicaTitulo: 'Documentación técnica en Badajoz',
    docTecnicaItems: [
      'Cédula de habitabilidad',
      'Certificado energético',
      'ITE si el edificio supera antigüedad legal',
      'IBI y deudas de comunidad',
    ],
    zonasIntro: 'Badajoz capital, Nuevo Berrocal y área metropolitana.',
    zonas: ['Centro', 'San Roque', 'Nuevo Berrocal', 'Valdebótoa', 'Montijo'],
    meta: {
      title: 'Due diligence Badajoz — Compra particular en Extremadura (350€)',
      description:
        'Revisión documental antes de comprar piso en Badajoz: registro, comunidad, IBI. 350€ IVA incl. Gestoría inmobiliaria 100 % online.',
      keywords:
        'due diligence badajoz, comprar piso particular badajoz, gestor compra vivienda extremadura',
      ogTitle: 'Due Diligence Badajoz — 350€',
      ogDescription: 'Compra segura entre particulares en Badajoz con informe ejecutivo.',
    },
    hero: {
      h1: 'Due diligence pre-compra en Badajoz',
      lead:
        'En un mercado con mucho particular a particular, un informe de 350€ evita heredar deudas de comunidad o cargas no declaradas en arras.',
    },
  },

  toledo: {
    slug: 'toledo',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.toledo,
    region: 'Castilla-La Mancha',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('toledo').src,
    precioEjemploPiso: 165_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Toledo',
      bio: 'Compradores que trabajan en Madrid y compran en Toledo: revisión de arras, registro y restricciones en casco histórico antes de desplazarse a notaría.',
      especialidades: ['Toledo capital', 'Pendiente Madrid-Toledo', 'Casco histórico'],
    },
    docTecnicaTitulo: 'Patrimonio y licencias en Toledo',
    docTecnicaItems: [
      'Cédula de habitabilidad castellanomanchega',
      'Certificado energético',
      'ITE en edificios antiguos',
      'Licencias en viviendas del casco',
    ],
    zonasIntro: 'Toledo ciudad, Polígono y municipios del corredor con Madrid.',
    zonas: ['Casco', 'Antequeruela', 'Santa Bárbara', 'Palomarejos', 'Yuncos', 'Illescas'],
    meta: {
      title: 'Due diligence Toledo — Casco y corredor sur Madrid (350€)',
      description:
        '¿Compras piso de particular en Toledo? Gestor online revisa documentación completa. 350€ IVA incl. Informe antes de escritura.',
      keywords:
        'due diligence toledo, comprar piso particular toledo, revision arras toledo',
      ogTitle: 'Due Diligence Toledo — 350€ · Online',
      ogDescription: 'Auditoría documental para compradores entre particulares en Toledo.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar en Toledo',
      lead:
        'Muchas operaciones son compradores de Madrid que cierran rápido. Verificamos registro, comunidad y urbanismo antes de la señal.',
    },
  },

  tarragona: {
    slug: 'tarragona',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.tarragona,
    region: 'Cataluña · Camp de Tarragona',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('tarragona').src,
    precioEjemploPiso: 195_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Tarragona',
      bio: 'Due diligence en Part Alta, Eixample y costa tarraconense. Cédula catalana, comunidad y coherencia de arras con nota simple.',
      especialidades: ['Costa Daurada', 'Compras sin agencia', 'Generalitat'],
    },
    docTecnicaTitulo: 'Cédula y certificados en Tarragona',
    docTecnicaItems: [
      'Cédula de habitabilidad Generalitat',
      'Certificado energético',
      'ITE según año de construcción',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Tarragona capital, Reus, Salou y Cambrils.',
    zonas: ['Part Alta', 'Eixample', 'Serrallo', 'Reus', 'Salou', 'Cambrils'],
    meta: {
      title: 'Due diligence Tarragona — Part Alta y Costa Daurada (350€)',
      description:
        'Compra entre particulares en Tarragona: revisión registral, LAU si alquilas después, comunidad e ITE. 350€ IVA incl. Gestor online.',
      keywords:
        'due diligence tarragona, comprar piso particular tarragona, revision documentacion costa daurada',
      ogTitle: 'Due Diligence Tarragona — 350€',
      ogDescription: 'Informe documental para compradores particulares en el Camp de Tarragona.',
    },
    hero: {
      h1: 'Due diligence pre-compra en Tarragona',
      lead:
        '¿Compras en Part Alta o en la costa? Tu gestor audita arras y documentación con criterio de normativa catalana. Trámite 100 % online.',
    },
  },

  almeria: {
    slug: 'almeria',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.almeria,
    region: 'Andalucía · Almería',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('almeria').src,
    precioEjemploPiso: 155_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Almería',
      bio: 'Mercado con inversión costera y compradores nacionales. Revisión de cargas, suministros, comunidad y legalidad de ampliaciones en chalets y pisos.',
      especialidades: ['Almería capital', 'Roquetas y costa', 'Compras sin agencia'],
    },
    docTecnicaTitulo: 'Documentación técnica en Almería',
    docTecnicaItems: [
      'Cédula de habitabilidad andaluza',
      'Certificado energético',
      'ITE en edificios con más de 50 años',
      'Licencias en ampliaciones y piscinas',
    ],
    zonasIntro: 'Almería ciudad, Roquetas de Mar, El Ejido y Cabo de Gata.',
    zonas: ['Centro', 'La Chanca', 'Roquetas', 'El Ejido', 'Aguadulce', 'San José'],
    meta: {
      title: 'Due diligence Almería — Costa y capital antes de arras (350€)',
      description:
        'Revisión documental compra vivienda en Almería y costa. Gestor asignado online. 350€ IVA incl. Informe en 3–5 días laborables.',
      keywords:
        'due diligence almeria, comprar piso particular almeria, revision compra vivienda roquetas',
      ogTitle: 'Due Diligence Almería — 350€',
      ogDescription: 'Auditoría pre-compra para particulares en Almería y provincia.',
    },
    hero: {
      h1: 'Revisión documental al comprar piso en Almería',
      lead:
        'En operaciones costeras el vendedor a veces omite derramas o licencias. Revisamos todo antes de que transfieras la señal.',
    },
  },

  gijon: {
    slug: 'gijon',
    nombre: GESTORIA_CIUDADES_EXPANSION_NOMBRES.gijon,
    region: 'Principado de Asturias',
    testimoniosLanding: 'due-diligence',
    heroImage: getCiudadImage('gijon').src,
    precioEjemploPiso: 175_000,
    gestor: {
      ...gestor,
      rol: 'Gestor inmobiliario · Compras en Gijón',
      bio: 'Due diligence en Cimadevilla, La Calzada y playas. Complementa el hub Asturias con foco en el mercado gijonés: industria, universidad y segunda residencia.',
      especialidades: ['Gijón', 'Compras entre particulares', 'Informe PDF'],
    },
    docTecnicaTitulo: 'ITE y comunidad en Gijón',
    docTecnicaItems: [
      'Cédula de habitabilidad asturiana',
      'Certificado energético',
      'ITE en bloques de los 60-70',
      'Actas de comunidad y derramas de fachada',
    ],
    zonasIntro: 'Gijón, Cimadevilla, El Llano, La Calzada y Villaviciosa.',
    zonas: ['Cimadevilla', 'Centro', 'La Calzada', 'El Llano', 'Somió', 'Villaviciosa'],
    meta: {
      title: 'Due diligence Gijón — Cimadevilla y playas sin sorpresas (350€)',
      description:
        '¿Compras piso de particular en Gijón? Revisión registral, comunidad e ITE. 350€ IVA incl. Gestoría online con panel y WhatsApp.',
      keywords:
        'due diligence gijon, comprar piso particular gijon, revision documentacion compra asturias',
      ogTitle: 'Due Diligence Gijón — 350€',
      ogDescription: 'Informe documental para compradores particulares en Gijón.',
    },
    hero: {
      h1: 'Due diligence pre-compra en Gijón',
      lead:
        'Operaciones sin agencia son habituales en el litoral asturiano. Tu gestor revisa arras y documentación antes de ir a notaría en Oviedo o Gijón.',
    },
  },
}

export const DUE_DILIGENCE_EXPANSION_SLUGS = [...GESTORIA_CIUDADES_EXPANSION_SLUGS]
