import type { Metadata } from 'next'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { withGestoriaIndexRobots } from './gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'
export const PRESTAMO_PARTICULARES_PRECIO = 130

export type PrestamoParticularesGestor = {
  nombre: string
  rol: string
  foto: string
  bio: string
  especialidades: string[]
}

export type PrestamoParticularesCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  gestor: PrestamoParticularesGestor
  mercadoIntro: string
  fiscalIntro: string
  situacionesIntro: string
  situaciones: string[]
  zonasIntro: string
  zonas: string[]
  paraQuienExtra: string[]
  faqExtra: { q: string; a: string }[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const PRESTAMO_PARTICULARES_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'mallorca', nombre: 'Mallorca' },
  { slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'alicante', nombre: 'Alicante' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'pamplona', nombre: 'Pamplona' },
  { slug: 'salamanca', nombre: 'Salamanca' },
  { slug: 'asturias', nombre: 'Asturias' },
  { slug: 'santander', nombre: 'Santander' },
  { slug: 'vitoria', nombre: 'Vitoria-Gasteiz' },
  { slug: 'san-sebastian', nombre: 'San Sebastián' },
] as const

export const PRESTAMO_PARTICULARES_CIUDADES: Record<string, PrestamoParticularesCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'prestamo-particulares-madrid',
    heroImage: getCiudadImage('madrid').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Madrid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios que formalizan préstamos privados en Madrid y Comunidad de Madrid. Especialista en contratos entre familiares para entrada de vivienda, préstamos sin interés, Modelo 600 y protección ante reclamaciones de Hacienda.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Comunidad de Madrid', 'Contratos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Madrid es muy habitual que padres presten a hijos la entrada de un piso, que socios financien un negocio o que amigos se presten dinero para una reforma. Sin contrato escrito, Hacienda puede interpretar la transferencia como donación encubierta y liquidar el Impuesto de Donaciones. Un préstamo mal documentado también dificulta reclamar judicialmente si el prestatario deja de devolver el capital.',
    fiscalIntro:
      'En la Comunidad de Madrid el préstamo entre particulares debe declararse mediante el Modelo 600 (ITP). Si el préstamo es sin intereses, la cuota suele ser cero, pero la declaración es obligatoria para acreditar que no es una donación. Tu asesor te orienta sobre plazos, documentación y obligaciones de IRPF si devenga intereses.',
    situacionesIntro: 'Casos frecuentes de préstamos entre particulares que formalizamos en Madrid y área metropolitana:',
    situaciones: [
      'Préstamo de padres a hijos para entrada de piso',
      'Préstamo entre socios para abrir negocio',
      'Préstamo familiar para reforma de vivienda',
      'Préstamo entre amigos con devolución a plazos',
      'Préstamo sin interés (tipo 0 %) entre familiares',
      'Préstamo con aval personal de un tercero',
    ],
    zonasIntro: 'Servicio en Madrid capital, área metropolitana y municipios de la Comunidad de Madrid con cobertura online.',
    zonas: [
      'Centro', 'Salamanca', 'Chamberí', 'Retiro', 'Moncloa',
      'Chamartín', 'Las Rozas', 'Pozuelo de Alarcón', 'Getafe',
      'Móstoles', 'Alcobendas', 'San Sebastián de los Reyes',
    ],
    paraQuienExtra: [
      'Familiares en Madrid que prestan dinero para la compra de vivienda sin pasar por banco',
      'Particulares que recibieron una transferencia y quieren evitar una inspección de Hacienda',
      'Prestamistas que necesitan título ejecutivo para reclamar impago judicialmente',
    ],
    faqExtra: [
      {
        q: '¿Dónde se presenta el Modelo 600 en Madrid?',
        a: 'En la Comunidad de Madrid, el Modelo 600 de transmisiones patrimoniales onerosas se presenta ante la administración tributaria autonómica. Tu asesor te indica plazos y documentación necesaria junto con el contrato.',
      },
      {
        q: '¿Un préstamo entre padres e hijos en Madrid tributa como donación?',
        a: 'No, si existe contrato escrito y declaración correcta. Sin documentación, Hacienda puede presumir donación encubierta. Nuestro contrato de 130€ IVA incluido deja constancia del préstamo y la obligación de devolución.',
      },
      {
        q: '¿Puedo reclamar judicialmente en Madrid si no me devuelven el préstamo?',
        a: 'Sí. Con contrato firmado puedes iniciar un procedimiento monitorio ante los juzgados de Madrid. Es mucho más ágil que intentar probar un préstamo verbal solo con extractos bancarios.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Madrid desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Madrid? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares madrid, prestamo entre familiares madrid, prestamo privado madrid hacienda, modelo 600 prestamo madrid, prestamo padres hijos entrada piso madrid, prestamo sin intereses madrid, contrato prestamo privado madrid, formalizar prestamo familiar madrid, prestamo entre amigos madrid contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Madrid — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Madrid con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña',
    testimoniosLanding: 'prestamo-particulares-barcelona',
    heroImage: getCiudadImage('barcelona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Barcelona',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Barcelona y área metropolitana. Especialista en contratos de préstamo privado, préstamos familiares para compra de vivienda, declaración ante la Generalitat y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Cataluña', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Barcelona y el área metropolitana es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En Cataluña el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Barcelona y Cataluña:',
    situaciones: [
      'Préstamo familiar para comprar piso en Barcelona',
      'Préstamo entre socios de startup o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Barcelona capital, área metropolitana y principales municipios de Cataluña. Servicio 100 % online.',
    zonas: [
      'Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Les Corts', 'Sants',
      "L'Hospitalet", 'Badalona', 'Sant Cugat del Vallès', 'Terrassa',
      'Sabadell', 'Castelldefels', 'Sitges',
    ],
    paraQuienExtra: [
      'Familias en Barcelona que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Barcelona y Cataluña?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Barcelona, Badalona, Sant Cugat y resto de Cataluña. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Barcelona?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Barcelona?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Barcelona con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Barcelona desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Barcelona? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares barcelona, prestamo entre familiares barcelona, prestamo privado barcelona hacienda, modelo 600 prestamo catalunya, prestamo padres hijos entrada piso barcelona, prestamo sin intereses barcelona, contrato prestamo privado barcelona, formalizar prestamo familiar barcelona, prestamo entre amigos barcelona contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Barcelona — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Barcelona con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'prestamo-particulares-valencia',
    heroImage: getCiudadImage('valencia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Valencia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Valencia y l\'Horta. Especialista en contratos de préstamo privado, financiación familiar para entrada de vivienda, declaración ante la Generalitat Valenciana y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Comunitat Valenciana', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Valencia y el área metropolitana es habitual que familiares presten capital para la entrada de un piso, que autónomos reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En la Comunitat Valenciana el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Valencia y la Comunitat Valenciana:',
    situaciones: [
      'Préstamo familiar para comprar piso en Valencia',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Valencia capital, l\'Horta y principales municipios de la Comunitat Valenciana. Servicio 100 % online.',
    zonas: [
      'Ruzafa', 'Campanar', 'Benimaclet', 'El Carmen', 'Eixample',
      'Patraix', 'Mislata', 'Paterna', 'Torrent', 'Sagunto',
      'Ciutat Vella', 'Quatre Carreres', 'Algirós',
    ],
    paraQuienExtra: [
      'Familias en Valencia que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Valencia y la Comunitat Valenciana?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Valencia, Mislata, Torrent y resto del territorio valenciano. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Valencia?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Valencia?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Valencia con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Valencia desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Valencia? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares valencia, prestamo entre familiares valencia, prestamo privado valencia hacienda, modelo 600 prestamo comunitat valenciana, prestamo padres hijos entrada piso valencia, prestamo sin intereses valencia, contrato prestamo privado valencia, formalizar prestamo familiar valencia, prestamo entre amigos valencia contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Valencia — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Valencia con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'prestamo-particulares-sevilla',
    heroImage: getCiudadImage('sevilla').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Préstamos entre particulares en Sevilla',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a prestamistas y prestatarios en Sevilla y área metropolitana. Domina la redacción de contratos de préstamo privado, préstamos familiares para compra de vivienda, declaración ante la Junta de Andalucía y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Andalucía', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Sevilla y el área metropolitana es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En Andalucía el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Sevilla y Andalucía:',
    situaciones: [
      'Préstamo familiar para comprar piso en Sevilla',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Sevilla capital, área metropolitana y principales municipios de Andalucía. Servicio 100 % online.',
    zonas: [
      'Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Centro',
      'Santa Cruz', 'Este-Alcosa', 'Cerro-Amate', 'Bellavista',
      'Dos Hermanas', 'Alcalá de Guadaíra', 'Camas',
    ],
    paraQuienExtra: [
      'Familias en Sevilla que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Sevilla y Andalucía?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Sevilla, Dos Hermanas, Alcalá de Guadaíra y resto de Andalucía. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Sevilla?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Sevilla?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Sevilla con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Sevilla desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Sevilla? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares sevilla, prestamo entre familiares sevilla, prestamo privado sevilla hacienda, modelo 600 prestamo andalucia, prestamo padres hijos entrada piso sevilla, prestamo sin intereses sevilla, contrato prestamo privado sevilla, formalizar prestamo familiar sevilla, prestamo entre amigos sevilla contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Sevilla — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Sevilla con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía · Costa del Sol',
    testimoniosLanding: 'prestamo-particulares-malaga',
    heroImage: getCiudadImage('malaga').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Préstamos entre particulares en Málaga',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a prestamistas y prestatarios en Málaga capital y Costa del Sol. Especialista en contratos de préstamo privado, financiación familiar para entrada de vivienda, declaración ante la Junta de Andalucía y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Andalucía', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Málaga y la Costa del Sol es habitual que familiares presten capital para la entrada de un piso, que autónomos reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En Andalucía el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Málaga y la Costa del Sol:',
    situaciones: [
      'Préstamo familiar para comprar piso en Málaga',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Málaga capital, Costa del Sol y área metropolitana. Servicio 100 % online.',
    zonas: [
      'Centro Histórico', 'Soho', 'Teatinos', 'El Palo-Pedregalejo', 'La Malagueta',
      'El Limonar', 'Huelin', 'Carretera de Cádiz', 'Benalmádena', 'Torremolinos',
      'Rincón de la Victoria', 'Mijas',
    ],
    paraQuienExtra: [
      'Familias en Málaga que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Málaga y la Costa del Sol?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Málaga, Torremolinos, Benalmádena y resto de Andalucía. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Málaga?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Málaga?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Málaga con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Málaga desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Málaga? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares malaga, prestamo entre familiares malaga, prestamo privado malaga hacienda, modelo 600 prestamo andalucia, prestamo padres hijos entrada piso malaga, prestamo sin intereses malaga, contrato prestamo privado malaga, formalizar prestamo familiar malaga, prestamo entre amigos malaga contrato, prestamo privado costa del sol',
      ogTitle: 'Contrato Préstamo entre Particulares Málaga — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Málaga con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    testimoniosLanding: 'prestamo-particulares-bilbao',
    heroImage: getCiudadImage('bilbao').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Bilbao',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Bilbao y Gran Bilbao. Especialista en contratos de préstamo privado, financiación familiar para entrada de vivienda, declaración ante la Hacienda Foral de Bizkaia y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Bizkaia', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Bilbao y el área metropolitana es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En Bizkaia el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Bilbao y Bizkaia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Bilbao',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Bilbao, Gran Bilbao y municipios de Bizkaia. Servicio 100 % online.',
    zonas: [
      'Indautxu', 'Abando', 'Deusto', 'Rekalde', 'Bilbao La Vieja',
      'Santutxu', 'Basurto', 'Zorrotza', 'Getxo', 'Barakaldo',
      'Portugalete', 'Leioa',
    ],
    paraQuienExtra: [
      'Familias en Bilbao que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Bilbao y Bizkaia?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Bilbao, Getxo, Barakaldo y resto de Bizkaia. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Bilbao?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Bilbao?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Bilbao con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Bilbao y Bizkaia 130€',
      description:
        'Contrato de préstamo entre particulares en Bilbao y Bizkaia desde 130€. Modelo 600, nota fiscal y entrega 48h. Evita donación encubierta ante Hacienda.',
      keywords:
        'prestamo entre particulares bizkaia, contrato prestamo entre particulares bilbao, prestamo entre familiares bilbao, prestamo privado bilbao hacienda, modelo 600 prestamo bizkaia, prestamo padres hijos entrada piso bilbao, prestamo sin intereses bilbao, contrato prestamo privado bilbao, formalizar prestamo familiar bilbao',
      ogTitle: 'Préstamo particulares Bilbao y Bizkaia desde 130€',
      ogDescription:
        'Formaliza préstamos privados en Bilbao y Bizkaia con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    testimoniosLanding: 'prestamo-particulares-zaragoza',
    heroImage: getCiudadImage('zaragoza').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Zaragoza',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Zaragoza y Aragón. Especialista en préstamos familiares para entrada de vivienda, financiación entre socios, Modelo 600 ante la Diputación General de Aragón y protección ante reclamaciones de Hacienda.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Aragón', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Zaragoza es muy habitual que familiares presten la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato escrito, Hacienda puede interpretar la transferencia como donación encubierta. Un préstamo mal documentado también dificulta reclamar judicialmente si el prestatario deja de devolver el capital.',
    fiscalIntro:
      'En Aragón el préstamo entre particulares debe declararse mediante el Modelo 600 (ITP). Si el préstamo es sin intereses, la cuota suele ser cero, pero la declaración es obligatoria para acreditar que no es una donación. Tu asesor te orienta sobre plazos, documentación y obligaciones de IRPF si devenga intereses.',
    situacionesIntro: 'Casos frecuentes de préstamos entre particulares que formalizamos en Zaragoza y área metropolitana:',
    situaciones: [
      'Préstamo de padres a hijos para entrada de piso en Zaragoza',
      'Préstamo entre socios para abrir negocio',
      'Préstamo familiar para reforma de vivienda',
      'Préstamo entre amigos con devolución a plazos',
      'Préstamo sin interés (tipo 0 %) entre familiares',
      'Préstamo con aval personal de un tercero',
    ],
    zonasIntro: 'Servicio en Zaragoza capital, área metropolitana y principales municipios de Aragón. Cobertura 100 % online.',
    zonas: [
      'Centro', 'Delicias', 'Actur', 'Las Fuentes', 'San José',
      'Valdespartera', 'Utebo', 'Cuarte de Huerva', 'La Almozara', 'Montecanal',
    ],
    paraQuienExtra: [
      'Familias en Zaragoza que prestan dinero para la compra de vivienda sin pasar por banco',
      'Particulares que recibieron una transferencia y quieren evitar una inspección de Hacienda',
      'Prestamistas que necesitan título ejecutivo para reclamar impago judicialmente',
    ],
    faqExtra: [
      {
        q: '¿Dónde se presenta el Modelo 600 en Zaragoza?',
        a: 'En Aragón, el Modelo 600 de transmisiones patrimoniales onerosas se presenta ante la administración tributaria autonómica. Tu asesor te indica plazos y documentación necesaria junto con el contrato.',
      },
      {
        q: '¿Un préstamo entre padres e hijos en Zaragoza tributa como donación?',
        a: 'No, si existe contrato escrito y declaración correcta. Sin documentación, Hacienda puede presumir donación encubierta. Nuestro contrato de 130€ IVA incluido deja constancia del préstamo y la obligación de devolución.',
      },
      {
        q: '¿Puedo reclamar judicialmente en Zaragoza si no me devuelven el préstamo?',
        a: 'Sí. Con contrato firmado puedes iniciar un procedimiento monitorio ante los juzgados de Zaragoza. Es mucho más ágil que intentar probar un préstamo verbal solo con extractos bancarios.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Zaragoza desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Zaragoza? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares zaragoza, prestamo entre familiares zaragoza, prestamo privado zaragoza hacienda, modelo 600 prestamo aragon, prestamo padres hijos entrada piso zaragoza, prestamo sin intereses zaragoza, contrato prestamo privado zaragoza, formalizar prestamo familiar zaragoza',
      ogTitle: 'Contrato Préstamo entre Particulares Zaragoza — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Zaragoza con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Illes Balears',
    testimoniosLanding: 'prestamo-particulares-mallorca',
    heroImage: getCiudadImage('mallorca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Mallorca',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Mallorca y Baleares. Especialista en préstamos familiares para compra de vivienda, financiación entre particulares con compradores nacionales e internacionales, Modelo 600 ante la Agencia Tributaria de Baleares y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Baleares', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Mallorca es habitual que familiares presten capital para la entrada de un piso, que autónomos reciban financiación privada o que residentes y no residentes se presten dinero para reformas o negocios. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En las Illes Balears el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Mallorca y Baleares:',
    situaciones: [
      'Préstamo familiar para comprar piso en Palma o Mallorca',
      'Préstamo entre socios de negocio turístico o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Palma, calas y municipios de Mallorca. Servicio 100 % online.',
    zonas: [
      'Palma', 'Calvià', 'Inca', 'Manacor', 'Llucmajor',
      'Pollença', 'Sóller', 'Alcúdia', 'Andratx', 'Marratxí',
    ],
    paraQuienExtra: [
      'Familias en Mallorca que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores peninsulares o internacionales que reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Mallorca y Baleares?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Palma, Calvià, Manacor y resto de Baleares. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Mallorca?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Mallorca?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Palma con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Mallorca desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Mallorca? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares mallorca, prestamo entre familiares palma, prestamo privado mallorca hacienda, modelo 600 prestamo baleares, prestamo padres hijos entrada piso mallorca, prestamo sin intereses mallorca, contrato prestamo privado palma, formalizar prestamo familiar baleares',
      ogTitle: 'Contrato Préstamo entre Particulares Mallorca — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Mallorca con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'prestamo-particulares-valladolid',
    heroImage: getCiudadImage('valladolid').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Valladolid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Valladolid y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde Madrid u otras provincias, Modelo 600 ante la Junta de Castilla y León y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Castilla y León', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Valladolid es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Castilla y León el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Valladolid y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Valladolid',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Valladolid capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Valladolid que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Valladolid y Castilla y León?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Valladolid, Laguna de Duero y resto de la provincia. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Valladolid?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Valladolid?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Valladolid desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Valladolid? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares valladolid, prestamo entre familiares valladolid, prestamo privado valladolid hacienda, modelo 600 prestamo castilla y leon, prestamo padres hijos entrada piso valladolid, prestamo sin intereses valladolid, contrato prestamo privado valladolid, formalizar prestamo familiar valladolid',
      ogTitle: 'Contrato Préstamo entre Particulares Valladolid — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Valladolid con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'prestamo-particulares-alicante',
    heroImage: getCiudadImage('alicante').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Alicante',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Alicante y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la Junta de Comunitat Valenciana y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Comunitat Valenciana', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Alicante es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Comunitat Valenciana el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Alicante y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Alicante',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Alicante capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Alicante que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Alicante y Comunitat Valenciana?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en San Juan, Elche y resto de la provincia. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Alicante?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Alicante?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Alicante desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Alicante? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares alicante, prestamo entre familiares alicante, prestamo privado alicante hacienda, modelo 600 prestamo comunitat valenciana, prestamo padres hijos entrada piso alicante, prestamo sin intereses alicante, contrato prestamo privado alicante, formalizar prestamo familiar alicante',
      ogTitle: 'Contrato Préstamo entre Particulares Alicante — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Alicante con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'prestamo-particulares-murcia',
    heroImage: getCiudadImage('murcia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Murcia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Murcia y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde Madrid u otras provincias, Modelo 600 ante la Junta de Comunitat Valenciana y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Región de Murcia', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Murcia es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Región de Murcia el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Murcia y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Murcia',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Murcia capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Murcia que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Murcia y Región de Murcia?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Cartagena, Lorca y resto de la Región de Murcia. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Murcia?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Murcia?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Murcia desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Murcia? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares murcia, prestamo entre familiares murcia, prestamo privado murcia hacienda, modelo 600 prestamo region de murcia, prestamo padres hijos entrada piso murcia, prestamo sin intereses murcia, contrato prestamo privado murcia, formalizar prestamo familiar murcia',
      ogTitle: 'Contrato Préstamo entre Particulares Murcia — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Murcia con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  granada: {
    slug: 'granada',
    nombre: 'Granada',
    region: 'Andalucía',
    testimoniosLanding: 'prestamo-particulares-granada',
    heroImage: getCiudadImage('granada').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Granada',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Granada y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la Junta de Andalucía y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Andalucía', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Granada es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Andalucía el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Granada y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Granada',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Granada capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Granada que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Granada y Andalucía?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Armilla, Motril y provincia de Granada. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Granada?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Granada?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Granada desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Granada? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares granada, prestamo entre familiares granada, prestamo privado granada hacienda, modelo 600 prestamo andalucia, prestamo padres hijos entrada piso granada, prestamo sin intereses granada, contrato prestamo privado granada, formalizar prestamo familiar granada',
      ogTitle: 'Contrato Préstamo entre Particulares Granada — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Granada con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    testimoniosLanding: 'prestamo-particulares-coruna',
    heroImage: getCiudadImage('coruna').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en A Coruña',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en A Coruña y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la Xunta de Galicia y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Galicia', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En A Coruña es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Galicia el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en A Coruña y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en A Coruña',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en A Coruña capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en A Coruña que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en A Coruña y Galicia?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Ferrol, Oleiros y resto de la provincia. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en A Coruña?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en A Coruña?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares A Coruña desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en A Coruña? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares coruna, prestamo entre familiares coruna, prestamo privado coruna hacienda, modelo 600 prestamo galicia, prestamo padres hijos entrada piso coruna, prestamo sin intereses coruna, contrato prestamo privado coruna, formalizar prestamo familiar coruna',
      ogTitle: 'Contrato Préstamo entre Particulares A Coruña — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en A Coruña con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    testimoniosLanding: 'prestamo-particulares-pamplona',
    heroImage: getCiudadImage('pamplona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Pamplona',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Pamplona y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la Hacienda Foral de Navarra y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Navarra', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Pamplona es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Navarra el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Pamplona y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Pamplona',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Pamplona capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Pamplona que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Pamplona y Navarra?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Burlada, Tudela y Comunidad Foral de Navarra. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Pamplona?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Pamplona?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Pamplona desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Pamplona? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares pamplona, prestamo entre familiares pamplona, prestamo privado pamplona hacienda, modelo 600 prestamo navarra, prestamo padres hijos entrada piso pamplona, prestamo sin intereses pamplona, contrato prestamo privado pamplona, formalizar prestamo familiar pamplona',
      ogTitle: 'Contrato Préstamo entre Particulares Pamplona — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Pamplona con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    testimoniosLanding: 'prestamo-particulares-salamanca',
    heroImage: getCiudadImage('salamanca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Salamanca',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios en Salamanca y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la Junta de Castilla y León y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Castilla y León', 'Préstamos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Salamanca es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Muchos compradores llegan desde Madrid u otras ciudades. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta.',
    fiscalIntro:
      'En Castilla y León el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Salamanca y provincia:',
    situaciones: [
      'Préstamo familiar para comprar piso en Salamanca',
      'Préstamo entre socios de negocio o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Salamanca capital, área metropolitana y provincia. Servicio 100 % online.',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'Laguna de Duero', 'Medina del Campo', 'Tudela de Duero', 'Arroyo de la Encomienda',
    ],
    paraQuienExtra: [
      'Familias en Salamanca que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Compradores que se mudan desde Madrid y reciben financiación familiar',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Salamanca y Castilla y León?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Laguna de Duero, Béjar y provincia de Salamanca. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Salamanca?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Puedo formalizar el préstamo si vivo en Madrid y el prestatario está en Salamanca?',
        a: 'Sí. Trabajamos 100 % online: recopilamos datos por videollamada, redactamos el contrato y te orientamos sobre la declaración fiscal en la comunidad autónoma correspondiente.',
      },
    ],
    meta: {
      title: 'Préstamo particulares Salamanca desde 130€',
      description:
        '¿Prestas o recibes dinero entre particulares en Salamanca? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares salamanca, prestamo entre familiares salamanca, prestamo privado salamanca hacienda, modelo 600 prestamo castilla y leon, prestamo padres hijos entrada piso salamanca, prestamo sin intereses salamanca, contrato prestamo privado salamanca, formalizar prestamo familiar salamanca',
      ogTitle: 'Contrato Préstamo entre Particulares Salamanca — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Salamanca con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },
asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    region: 'Principado de Asturias',
    testimoniosLanding: 'prestamo-particulares-asturias',
    heroImage: getCiudadImage('asturias').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario ┬À Pr├®stamos entre particulares en Asturias',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora pr├®stamos privados en Oviedo, Gij├│n y Avil├®s. Entrada de vivienda entre familiares, Modelo 600 ante Junta del Principado de Asturias y contratos ejecutables sin donaci├│n encubierta.',
      especialidades: ['Pr├®stamos familiares vivienda', 'Modelo 600', 'Pr├®stamos sin inter├®s (0 %)'],
    },
    mercadoIntro:
      'En Asturias es habitual que familiares presten capital para la entrada de un piso o reforma. Sin contrato escrito, Hacienda puede reclasificar transferencias como donaci├│n.',
    fiscalIntro:
      'El pr├®stamo entre particulares debe formalizarse y declararse (Modelo 600, ITP). Tu gestor explica el tratamiento fiscal en Principado de Asturias.',
    situacionesIntro: 'Pr├®stamos privados que formalizamos en Oviedo, Gij├│n y Avil├®s:',
    situaciones: [
      'Pr├®stamo familiar para comprar piso',
      'Pr├®stamo entre socios o aut├│nomos',
      'Pr├®stamo para reforma del inmueble',
      'Pr├®stamo sin intereses entre familiares',
    ],
    zonasIntro: 'Cobertura en Oviedo, Gij├│n y Avil├®s. Servicio 100 % online.',
    zonas: ['Centro', 'Ensanche', 'Zona residencial', '├ürea metropolitana'],
    paraQuienExtra: [
      'Familias que prestan dinero para entrada sin hipoteca bancaria',
      'Prestamistas que necesitan cl├íusulas de impago claras',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato de pr├®stamo es v├ílido en Asturias?',
        a: 'S├¡. El contrato privado entre particulares es v├ílido en Principado de Asturias y debe complementarse con la declaraci├│n fiscal correspondiente.',
      },
      {
        q: '┬┐Hace falta notario?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garant├¡a. El contrato privado firmado es ejecutable judicialmente.',
      },
    ],
    meta: {
      title: 'Pr├®stamo particulares Asturias desde 130Ôé¼',
      description:
        '┬┐Prestas o recibes dinero entre particulares en Asturias? Contrato profesional, nota fiscal y Modelo 600. 130Ôé¼ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares asturias, prestamo entre familiares asturias, prestamo privado asturias hacienda, modelo 600 prestamo',
      ogTitle: 'Contrato Pr├®stamo entre Particulares Asturias ÔÇö 130Ôé¼',
      ogDescription: 'Formaliza pr├®stamos privados en Asturias con gestor asignado. 130Ôé¼ IVA incluido.',
    },
  },

  santander: {
    slug: 'santander',
    nombre: 'Santander',
    region: 'Cantabria',
    testimoniosLanding: 'prestamo-particulares-santander',
    heroImage: getCiudadImage('santander').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario ┬À Pr├®stamos entre particulares en Santander',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora pr├®stamos privados en Santander y Cantabria. Entrada de vivienda entre familiares, Modelo 600 ante Hacienda de Cantabria y contratos ejecutables sin donaci├│n encubierta.',
      especialidades: ['Pr├®stamos familiares vivienda', 'Modelo 600', 'Pr├®stamos sin inter├®s (0 %)'],
    },
    mercadoIntro:
      'En Santander es habitual que familiares presten capital para la entrada de un piso o reforma. Sin contrato escrito, Hacienda puede reclasificar transferencias como donaci├│n.',
    fiscalIntro:
      'El pr├®stamo entre particulares debe formalizarse y declararse (Modelo 600, ITP). Tu gestor explica el tratamiento fiscal en Cantabria.',
    situacionesIntro: 'Pr├®stamos privados que formalizamos en Santander y Cantabria:',
    situaciones: [
      'Pr├®stamo familiar para comprar piso',
      'Pr├®stamo entre socios o aut├│nomos',
      'Pr├®stamo para reforma del inmueble',
      'Pr├®stamo sin intereses entre familiares',
    ],
    zonasIntro: 'Cobertura en Santander y Cantabria. Servicio 100 % online.',
    zonas: ['Centro', 'Ensanche', 'Zona residencial', '├ürea metropolitana'],
    paraQuienExtra: [
      'Familias que prestan dinero para entrada sin hipoteca bancaria',
      'Prestamistas que necesitan cl├íusulas de impago claras',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato de pr├®stamo es v├ílido en Santander?',
        a: 'S├¡. El contrato privado entre particulares es v├ílido en Cantabria y debe complementarse con la declaraci├│n fiscal correspondiente.',
      },
      {
        q: '┬┐Hace falta notario?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garant├¡a. El contrato privado firmado es ejecutable judicialmente.',
      },
    ],
    meta: {
      title: 'Pr├®stamo particulares Santander desde 130Ôé¼',
      description:
        '┬┐Prestas o recibes dinero entre particulares en Santander? Contrato profesional, nota fiscal y Modelo 600. 130Ôé¼ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares santander, prestamo entre familiares santander, prestamo privado santander hacienda, modelo 600 prestamo',
      ogTitle: 'Contrato Pr├®stamo entre Particulares Santander ÔÇö 130Ôé¼',
      ogDescription: 'Formaliza pr├®stamos privados en Santander con gestor asignado. 130Ôé¼ IVA incluido.',
    },
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    region: 'Pa├¡s Vasco',
    testimoniosLanding: 'prestamo-particulares-vitoria',
    heroImage: getCiudadImage('vitoria').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario ┬À Pr├®stamos entre particulares en Vitoria-Gasteiz',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora pr├®stamos privados en Vitoria-Gasteiz y ├ülava. Entrada de vivienda entre familiares, Modelo 600 ante Hacienda Foral de ├ülava y contratos ejecutables sin donaci├│n encubierta.',
      especialidades: ['Pr├®stamos familiares vivienda', 'Modelo 600', 'Pr├®stamos sin inter├®s (0 %)'],
    },
    mercadoIntro:
      'En Vitoria-Gasteiz es habitual que familiares presten capital para la entrada de un piso o reforma. Sin contrato escrito, Hacienda puede reclasificar transferencias como donaci├│n.',
    fiscalIntro:
      'El pr├®stamo entre particulares debe formalizarse y declararse (Modelo 600, ITP). Tu gestor explica el tratamiento fiscal en Pa├¡s Vasco.',
    situacionesIntro: 'Pr├®stamos privados que formalizamos en Vitoria-Gasteiz y ├ülava:',
    situaciones: [
      'Pr├®stamo familiar para comprar piso',
      'Pr├®stamo entre socios o aut├│nomos',
      'Pr├®stamo para reforma del inmueble',
      'Pr├®stamo sin intereses entre familiares',
    ],
    zonasIntro: 'Cobertura en Vitoria-Gasteiz y ├ülava. Servicio 100 % online.',
    zonas: ['Centro', 'Ensanche', 'Zona residencial', '├ürea metropolitana'],
    paraQuienExtra: [
      'Familias que prestan dinero para entrada sin hipoteca bancaria',
      'Prestamistas que necesitan cl├íusulas de impago claras',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato de pr├®stamo es v├ílido en Vitoria-Gasteiz?',
        a: 'S├¡. El contrato privado entre particulares es v├ílido en Pa├¡s Vasco y debe complementarse con la declaraci├│n fiscal correspondiente.',
      },
      {
        q: '┬┐Hace falta notario?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garant├¡a. El contrato privado firmado es ejecutable judicialmente.',
      },
    ],
    meta: {
      title: 'Pr├®stamo particulares Vitoria-Gasteiz desde 130Ôé¼',
      description:
        '┬┐Prestas o recibes dinero entre particulares en Vitoria-Gasteiz? Contrato profesional, nota fiscal y Modelo 600. 130Ôé¼ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares vitoria, prestamo entre familiares vitoria, prestamo privado vitoria hacienda, modelo 600 prestamo',
      ogTitle: 'Contrato Pr├®stamo entre Particulares Vitoria-Gasteiz ÔÇö 130Ôé¼',
      ogDescription: 'Formaliza pr├®stamos privados en Vitoria-Gasteiz con gestor asignado. 130Ôé¼ IVA incluido.',
    },
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebasti├ín',
    region: 'Pa├¡s Vasco',
    testimoniosLanding: 'prestamo-particulares-san-sebastian',
    heroImage: getCiudadImage('san-sebastian').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario ┬À Pr├®stamos entre particulares en San Sebasti├ín',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora pr├®stamos privados en San Sebasti├ín y Gipuzkoa. Entrada de vivienda entre familiares, Modelo 600 ante Hacienda Foral de Gipuzkoa y contratos ejecutables sin donaci├│n encubierta.',
      especialidades: ['Pr├®stamos familiares vivienda', 'Modelo 600', 'Pr├®stamos sin inter├®s (0 %)'],
    },
    mercadoIntro:
      'En San Sebasti├ín es habitual que familiares presten capital para la entrada de un piso o reforma. Sin contrato escrito, Hacienda puede reclasificar transferencias como donaci├│n.',
    fiscalIntro:
      'El pr├®stamo entre particulares debe formalizarse y declararse (Modelo 600, ITP). Tu gestor explica el tratamiento fiscal en Pa├¡s Vasco.',
    situacionesIntro: 'Pr├®stamos privados que formalizamos en San Sebasti├ín y Gipuzkoa:',
    situaciones: [
      'Pr├®stamo familiar para comprar piso',
      'Pr├®stamo entre socios o aut├│nomos',
      'Pr├®stamo para reforma del inmueble',
      'Pr├®stamo sin intereses entre familiares',
    ],
    zonasIntro: 'Cobertura en San Sebasti├ín y Gipuzkoa. Servicio 100 % online.',
    zonas: ['Centro', 'Ensanche', 'Zona residencial', '├ürea metropolitana'],
    paraQuienExtra: [
      'Familias que prestan dinero para entrada sin hipoteca bancaria',
      'Prestamistas que necesitan cl├íusulas de impago claras',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato de pr├®stamo es v├ílido en San Sebasti├ín?',
        a: 'S├¡. El contrato privado entre particulares es v├ílido en Pa├¡s Vasco y debe complementarse con la declaraci├│n fiscal correspondiente.',
      },
      {
        q: '┬┐Hace falta notario?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garant├¡a. El contrato privado firmado es ejecutable judicialmente.',
      },
    ],
    meta: {
      title: 'Pr├®stamo particulares San Sebasti├ín desde 130Ôé¼',
      description:
        '┬┐Prestas o recibes dinero entre particulares en San Sebasti├ín? Contrato profesional, nota fiscal y Modelo 600. 130Ôé¼ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares san-sebastian, prestamo entre familiares san-sebastian, prestamo privado san-sebastian hacienda, modelo 600 prestamo',
      ogTitle: 'Contrato Pr├®stamo entre Particulares San Sebasti├ín ÔÇö 130Ôé¼',
      ogDescription: 'Formaliza pr├®stamos privados en San Sebasti├ín con gestor asignado. 130Ôé¼ IVA incluido.',
    },
  },
}

export function buildPrestamoParticularesMetadata(config: PrestamoParticularesCiudadConfig): Metadata {
  const path = `/gestoria/prestamo-particulares/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/prestamo-particulares/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/prestamo-particulares/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Contrato préstamo entre particulares ${config.nombre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      images: [`${BASE_URL}${config.heroImage}`],
    },
  })
}
