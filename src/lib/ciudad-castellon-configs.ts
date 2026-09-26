import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { getCiudadImage } from '@/lib/gestoria-images'
import type { DueDiligenceCiudadConfig } from '@/lib/due-diligence-ciudad-data'
import type { AlquilerHabitacionCiudadConfig } from '@/lib/alquiler-habitacion-ciudad-data'
import type { AlquilerLocalComercialCiudadConfig } from '@/lib/alquiler-local-comercial-ciudad-data'
import type { PrestamoParticularesCiudadConfig } from '@/lib/prestamo-particulares-ciudad-data'

const gestorBase = {
  nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
  foto: GESTOR_DANIEL_HERNANDEZ.foto,
}

export const CASTELLON_DUE_DILIGENCE: DueDiligenceCiudadConfig = {
  slug: 'castellon',
  nombre: 'Castellón',
  region: 'Comunitat Valenciana',
  testimoniosLanding: 'due-diligence-castellon',
  heroImage: getCiudadImage('castellon').src,
  precioEjemploPiso: 165_000,
  gestor: {
    ...gestorBase,
    rol: 'Gestor inmobiliario · Compras en Castellón',
    bio: 'Acompaña compradores de particular en Castelló de la Plana, Grao y litoral. Revisión documental antes de firmar arras en un mercado con mucha presión de plazos.',
    especialidades: ['Compras sin agencia', 'Nota simple', 'Comunidad y cargas'],
  },
  docTecnicaTitulo: 'Documentación técnica · Castellón',
  docTecnicaItems: [
    'Cédula de habitabilidad valenciana',
    'Certificado energético',
    'ITE en edificios antiguos del centro',
    'Certificado de deudas de comunidad',
  ],
  zonasIntro: 'Castelló de la Plana, Grao, Benicàssim y comarca.',
  zonas: ['Centro', 'Grao', 'Fadrell', 'Benicàssim', 'Vila-real', 'Burriana'],
  meta: {
    title: 'Due diligence Castellón — Grao y Plana antes de la señal (350€)',
    description:
      'Revisión documental antes de comprar en Castellón. Nota simple, cargas, IBI y comunidad. 350€. Compra entre particulares.',
    keywords:
      'due diligence castellon, revisar documentacion compra castellon, comprar piso particular castellon',
    ogTitle: 'Due Diligence Castellón — Gestor 350€',
    ogDescription: 'Compra segura de particular a particular en Castellón y litoral.',
  },
  hero: {
    h1: 'Revisión documental antes de comprar piso en Castellón',
    lead:
      'En Castellón es frecuente firmar arras en pocos días. Tu gestor revisa la documentación antes de entregar señal. 350€ IVA incluido.',
  },
}

export const CASTELLON_HABITACION: AlquilerHabitacionCiudadConfig = {
  slug: 'castellon',
  nombre: 'Castellón',
  region: 'Comunitat Valenciana',
  testimoniosLanding: 'alquiler-habitacion-castellon',
  heroImage: getCiudadImage('castellon').src,
  gestor: {
    ...gestorBase,
    rol: 'Gestor inmobiliario · Alquiler de habitación en Castellón',
    bio: 'Asesora propietarios que alquilan habitaciones en Castelló de la Plana y entorno universitario. Contrato conforme al Código Civil y normas de convivencia válidas.',
    especialidades: ['Pisos compartidos', 'Estudiantes Jaume I', 'Convivencia'],
  },
  mercadoIntro:
    'Castellón concentra demanda de habitaciones por universidad, industria ceramicista y jóvenes profesionales. Sin contrato escrito, impagos y conflictos de convivencia son difíciles de probar.',
  zonasIntro: 'Castelló capital, Grao y municipios cercanos con oferta de habitación.',
  zonas: ['Centro', 'Grao', 'Fadrell', 'Benicàssim', 'Vila-real'],
  paraQuienExtra: [
    'Propietarios que alquilan habitación en piso compartido',
    'Estudiantes de la Universitat Jaume I',
    'Inquilinos que quieren reglas claras de convivencia',
  ],
  faqExtra: [
    {
      q: '¿Aplica la LAU al alquiler de habitación en Castellón?',
      a: 'No como vivienda íntegra. Se rige por el Código Civil; un contrato profesional fija renta, fianza y normas de convivencia.',
    },
  ],
  enlaceContratoLau: '/castellon/contrato-alquiler',
  meta: {
    title: 'Contrato habitación Castellón — UJI y piso compartido (120€)',
    description:
      'Contrato de alquiler de habitación en Castellón desde 120€. Código Civil, convivencia y fianza. Entrega 48h, gestor online.',
    keywords: 'contrato alquiler habitacion castellon, alquiler habitacion castellon',
    ogTitle: 'Contrato habitación Castellón — 120€',
    ogDescription: 'Alquiler de habitación en Castellón con gestoría Inmonest.',
  },
}

export const CASTELLON_LOCAL_COMERCIAL: AlquilerLocalComercialCiudadConfig = {
  slug: 'castellon',
  nombre: 'Castellón',
  region: 'Comunitat Valenciana',
  testimoniosLanding: 'alquiler-local-comercial-castellon',
  heroImage: getCiudadImage('castellon').src,
  gestor: {
    ...gestorBase,
    rol: 'Gestor inmobiliario · Locales comerciales en Castellón',
    bio: 'Redacta arrendamientos de local y nave en Castelló, Grao y polígonos. Licencias de actividad, IAE y cláusulas de renta y obras.',
  },
  mercadoIntro:
    'Castellón mueve locales en centro comercial urbano, Grao marítimo y polígonos industriales. Muchos arrendamientos se cierran sin contrato LAU de local adaptado.',
  zonasIntro: 'Castelló de la Plana, Grao, polígonos y municipios de la comarca.',
  zonas: ['Centro', 'Grao', 'Fadrell', 'Sanz de Borriana', 'Vila-real'],
  rentaEjemploMensual: 750,
  localesGestionados: 8,
  paraQuienExtra: [
    'Propietarios de bajo comercial en Castelló',
    'Autónomos que arriendan nave o local',
    'Inversores con locales en litoral y Grao',
  ],
  faqExtra: [
    {
      q: '¿El contrato de local en Castellón es igual que el LAU de vivienda?',
      a: 'No. El local comercial tiene régimen distinto; el contrato debe regular renta, obras, traspaso y duración con claridad.',
    },
  ],
  regulacionLocal: [
    'Licencia de actividad municipal',
    'IAE y alta en Hacienda',
    'Cláusulas de obras y amortización',
    'Traspaso de negocio regulado',
  ],
  meta: {
    title: 'Alquiler local comercial Castellón — Grao y polígonos (145€)',
    description:
      'Contrato de alquiler de local comercial en Castellón desde 145€. LAU empresarial, licencias y cláusulas a medida. 48h online.',
    keywords: 'contrato alquiler local castellon, arrendamiento local comercial castellon',
    ogTitle: 'Alquiler local comercial Castellón — 145€',
    ogDescription: 'Contrato de local en Castellón con gestoría Inmonest.',
  },
}

export const CASTELLON_PRESTAMO: PrestamoParticularesCiudadConfig = {
  slug: 'castellon',
  nombre: 'Castellón',
  region: 'Comunitat Valenciana',
  testimoniosLanding: 'prestamo-particulares-castellon',
  heroImage: getCiudadImage('castellon').src,
  gestor: {
    ...gestorBase,
    rol: 'Gestor inmobiliario · Préstamos entre particulares en Castellón',
    bio: 'Formaliza préstamos entre familiares o particulares con contrato claro, interés declarable y garantías. Evita problemas con Hacienda y reclamaciones futuras.',
    especialidades: ['Préstamos familiares', 'Modelo 600 Comunitat Valenciana', 'Préstamos sin interés'],
  },
  mercadoIntro:
    'En Castellón es habitual el préstamo entre particulares para entrada de vivienda o negocio. Sin contrato escrito, el conflicto y la fiscalidad se complican.',
  fiscalIntro:
    'En la Comunitat Valenciana el préstamo entre particulares debe formalizarse y tributar correctamente (ITP / Modelo 600 cuando aplique). Tu gestor te orienta sobre intereses y documentación.',
  situacionesIntro: 'Situaciones habituales en Castellón y provincia:',
  situaciones: [
    'Préstamo familiar para entrada de vivienda',
    'Préstamo entre socios o autónomos',
    'Préstamo para reforma del inmueble',
    'Préstamo con cuotas mensuales entre particulares',
  ],
  zonasIntro: 'Válido en Castelló de la Plana y toda la provincia.',
  zonas: ['Castelló capital', 'Grao', 'Vila-real', 'Benicàssim'],
  paraQuienExtra: [
    'Familiares que prestan dinero para comprar vivienda',
    'Particulares con préstamo privado sin documento',
    'Quien necesita formalizar intereses y plazos',
  ],
  faqExtra: [
    {
      q: '¿Hacienda exige contrato de préstamo entre particulares?',
      a: 'Sí, conviene declarar intereses y dejar constancia del préstamo. Redactamos contrato conforme a la normativa fiscal aplicable.',
    },
  ],
  meta: {
    title: 'Préstamo entre particulares Castellón — Modelo 600 y familia (130€)',
    description:
      'Contrato de préstamo entre particulares en Castellón. Interés, plazos y garantías. Gestoría online Inmonest.',
    keywords: 'prestamo entre particulares castellon, contrato prestamo privado castellon',
    ogTitle: 'Préstamo entre particulares Castellón',
    ogDescription: 'Formaliza tu préstamo privado en Castellón con contrato profesional.',
  },
}
