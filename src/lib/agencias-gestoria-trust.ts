/** Agencias partner y casos de éxito B2B — landing gestoría */

export type AgenciaConfianLogo = {
  id: string
  nombre: string
  subtitulo?: string
  logo?: string
  logoAlt?: string
  /** Si no hay imagen, se muestra texto estilizado */
  textLogo?: string
  textClass?: string
}

export const AGENCIAS_CONFIAN: AgenciaConfianLogo[] = [
  {
    id: 'nueva-habitat',
    nombre: 'Nueva Habitat',
    textLogo: 'NUEVA HABITAT',
    textClass: 'font-serif tracking-wide',
  },
  {
    id: 'infopisos',
    nombre: 'infoPISOS',
    textLogo: 'infoPISOS',
    textClass: 'font-bold tracking-tight',
  },
  {
    id: 'tecnocasa',
    nombre: 'Tecnocasa Las Rozas',
    subtitulo: 'Franchising Network',
    logo: '/agencias-confian/tecnocasa.png',
    logoAlt: 'Tecnocasa Las Rozas',
  },
  {
    id: 'inmosants',
    nombre: 'Inmo Sants',
    logo: '/agencias-confian/inmosants.png',
    logoAlt: 'Inmo Sants Barcelona',
  },
  {
    id: 'interhouse',
    nombre: 'Interhouse BCN',
    subtitulo: 'Serveis immobiliaris',
    logo: '/agencias-confian/interhouse.png',
    logoAlt: 'Interhouse BCN',
  },
  {
    id: 'fincas-jardin',
    nombre: 'Fincas Jardín',
    subtitulo: 'Assessors immobiliaris',
    logo: '/agencias-confian/fincas-jardin.png',
    logoAlt: 'Fincas Jardín',
  },
]

export type AgenciaCasoExito = {
  id: string
  agencia: string
  ciudad: string
  tipo: 'API' | 'Autónomo' | 'Agencia' | 'Franquicia'
  volumen: string
  pack?: string
  cifra: string
  cifraLabel: string
  quote: string
  persona: string
  rol: string
}

export const AGENCIAS_CASOS_EXITO: AgenciaCasoExito[] = [
  {
    id: 'tecnocasa-rozas',
    agencia: 'Tecnocasa Las Rozas',
    ciudad: 'Madrid',
    tipo: 'Franquicia',
    volumen: '8–12 contratos/mes',
    pack: 'Pack Agencia Plus',
    cifra: '18 h',
    cifraLabel: 'ahorradas al mes en redacción',
    quote:
      'Antes derivábamos a un despacho externo y tardábamos días. Ahora el contrato de arras o alquiler sale en la misma tarde con FirmaCert incluida.',
    persona: 'Responsable de operaciones',
    rol: 'Oficina Las Rozas',
  },
  {
    id: 'inmosants',
    agencia: 'Inmo Sants',
    ciudad: 'Barcelona',
    tipo: 'Agencia',
    volumen: '4–6 contratos/mes',
    pack: 'Pack Agencia',
    cifra: '110 €',
    cifraLabel: 'por contrato vs 145 € retail',
    quote:
      'El panel nos permite subir la documentación del piso y del inquilino en un solo sitio. El gestor conoce nuestra operativa en Sants y Eixample.',
    persona: 'Director comercial',
    rol: 'Inmobiliaria de barrio',
  },
  {
    id: 'interhouse',
    agencia: 'Interhouse BCN',
    ciudad: 'Barcelona',
    tipo: 'API',
    volumen: 'Contratos sueltos + pack',
    cifra: '4–5 h',
    cifraLabel: 'de entrega media B2B',
    quote:
      'Como API necesitamos contratos LAU impecables y rápidos. Probamos con contratos sueltos y al ver el volumen activamos el pack anual.',
    persona: 'Agente de la Propiedad Inmobiliaria',
    rol: 'Serveis immobiliaris',
  },
  {
    id: 'fincas-jardin',
    agencia: 'Fincas Jardín',
    ciudad: 'Catalunya',
    tipo: 'Agencia',
    volumen: '3–5 alquileres/mes',
    pack: 'Pack Agente',
    cifra: '35 €',
    cifraLabel: 'de ahorro por contrato vs particular',
    quote:
      'Para un autónomo con pocas operaciones al mes, el pack de 12 contratos encaja perfecto. Sin compromiso de volumen mínimo mensual.',
    persona: 'Assessor immobiliari',
    rol: 'Gestión de alquileres',
  },
]

export const AGENCIAS_AUDIENCIAS = [
  {
    id: 'api',
    titulo: 'APIs y agentes colegiados',
    desc: 'Contratos LAU, arras y compraventa con validez legal, FirmaCert eIDAS y entrega en 4–5 h. Sin plantillas genéricas.',
    icon: '🏛️',
  },
  {
    id: 'autonomo',
    titulo: 'Autónomos inmobiliarios',
    desc: 'Sin pack anual obligatorio: contrato suelto a 110 € o pack Agente (12/año). Ideal si haces 1–2 operaciones al mes.',
    icon: '👤',
  },
  {
    id: 'empresa',
    titulo: 'Agencias y franquicias',
    desc: 'Packs de 36–60 contratos, usuarios múltiples, cola prioritaria y gestor de cuenta. Tecnocasa, Inmo Sants y más ya operan con nosotros.',
    icon: '🏢',
  },
]
