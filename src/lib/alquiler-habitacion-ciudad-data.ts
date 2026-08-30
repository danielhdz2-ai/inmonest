import type { Metadata } from 'next'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { withGestoriaIndexRobots } from './gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'
export const ALQUILER_HABITACION_PRECIO = 145

export type AlquilerHabitacionGestor = {
  nombre: string
  rol: string
  foto: string
  bio: string
  especialidades: string[]
}

export type AlquilerHabitacionCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  gestor: AlquilerHabitacionGestor
  mercadoIntro: string
  zonasIntro: string
  zonas: string[]
  paraQuienExtra: string[]
  faqExtra: { q: string; a: string }[]
  enlaceContratoLau: string
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const ALQUILER_HABITACION_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'asturias', nombre: 'Asturias' },
] as const

export const ALQUILER_HABITACION_CIUDADES: Record<string, AlquilerHabitacionCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'alquiler-habitacion-madrid',
    heroImage: getCiudadImage('madrid').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Alquiler de habitaciones en Madrid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios particulares que alquilan habitaciones en Madrid capital y área metropolitana. Conoce el mercado de pisos compartidos, la redacción conforme al Código Civil y los conflictos habituales en coliving urbano.',
      especialidades: ['Pisos compartidos y coliving', 'Normas de convivencia válidas', 'Asesoramiento hasta la firma'],
    },
    mercadoIntro:
      'Madrid concentra una de las mayores demandas de habitaciones en piso compartido de España: estudiantes en Moncloa y Ciudad Universitaria, jóvenes profesionales en Chamberí o Malasaña y trabajadores temporales. Muchos propietarios alquilan habitaciones sin contrato escrito y asumen riesgos evitables.',
    zonasIntro: 'Servicio en Madrid capital y área metropolitana. Conocemos la dinámica del alquiler por habitaciones en los barrios con mayor demanda.',
    zonas: [
      'Chamberí', 'Malasaña', 'Moncloa', 'Argüelles', 'Ciudad Universitaria',
      'Lavapiés', 'Tetuán', 'Vallecas', 'Getafe', 'Móstoles', 'Alcalá de Henares',
    ],
    paraQuienExtra: [
      'Propietarios en Chamberí, Moncloa o barrios universitarios con alta rotación de inquilinos',
      'Quien alquila varias habitaciones en el mismo piso y necesita un contrato por inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación sirve en toda la Comunidad de Madrid?',
        a: 'Sí. Redactamos contratos válidos en Madrid capital y municipios del área metropolitana, adaptados al Código Civil y a la práctica habitual del mercado madrileño de pisos compartidos.',
      },
      {
        q: '¿Es lo mismo que un contrato LAU de vivienda completa?',
        a: 'No. El alquiler de habitación no queda amparado por la LAU como vivienda íntegra. Si alquilas el piso completo, necesitas un contrato LAU distinto. Nosotros también lo redactamos por 145€ (vivienda completa).',
      },
    ],
    enlaceContratoLau: '/madrid/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Madrid desde 145€',
      description:
        '¿Alquilas una habitación en Madrid? Contrato profesional para particulares con asesor experto. Código Civil, normas de convivencia y protección ante impagos. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion madrid, alquilar habitacion madrid, contrato habitacion piso compartido madrid, coliving madrid contrato, arrendamiento habitacion madrid, gestoria alquiler habitacion madrid, alquiler habitacion particular madrid, piso compartido madrid contrato, alquiler habitacion moncloa, alquiler habitacion chamberi',
      ogTitle: 'Contrato Alquiler Habitación Madrid — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Madrid. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña',
    testimoniosLanding: 'alquiler-habitacion-barcelona',
    heroImage: getCiudadImage('barcelona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Alquiler de habitaciones en Barcelona',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a propietarios que alquilan habitaciones en Barcelona y área metropolitana. Domina el régimen del Código Civil aplicable al alquiler por habitación, la convivencia en pisos compartidos y la normativa autonómica cuando afecta al inmueble.',
      especialidades: ['Coliving y pisos compartidos', 'Contratos por habitación', 'Asesoramiento pre y post firma'],
    },
    mercadoIntro:
      'Barcelona tiene una demanda muy alta de habitaciones en pisos compartidos: estudiantes en zona universitaria, profesionales en Eixample o Poblenou y perfiles internacionales. Sin contrato profesional, los conflictos por convivencia, fianza o impago se resuelven con mucha más dificultad.',
    zonasIntro: 'Cobertura en Barcelona capital, área metropolitana y conocimiento del mercado de alquiler por habitaciones en Cataluña.',
    zonas: [
      'Gràcia', 'Eixample', 'Poble Sec', 'Sants', 'Les Corts',
      'Sarrià-Sant Gervasi', 'Poblenou', 'El Raval', "L'Hospitalet", 'Badalona',
    ],
    paraQuienExtra: [
      'Propietarios en Gràcia, Eixample o Sants con pisos de 4-5 habitaciones para alquilar',
      'Inversores en coliving que necesitan un contrato independiente por cada inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato es válido en Barcelona y el área metropolitana?',
        a: 'Sí. El contrato de habitación se rige por el Código Civil y es válido en Barcelona, L\'Hospitalet, Badalona y resto de Cataluña. Tu asesor adapta las cláusulas a tu situación concreta.',
      },
      {
        q: '¿Aplica la normativa de zonas tensionadas al alquiler de habitación?',
        a: 'El alquiler de una habitación dentro de una vivienda no se equipara al arrendamiento LAU de vivienda completa, por lo que las reglas de zona tensionada no se aplican igual. Tu asesor te explica las diferencias antes de fijar la renta.',
      },
    ],
    enlaceContratoLau: '/barcelona/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Barcelona desde 145€',
      description:
        '¿Alquilas una habitación en Barcelona? Contrato profesional para particulares con asesor experto. Normas de convivencia, Código Civil y protección legal. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion barcelona, alquilar habitacion barcelona, contrato habitacion piso compartido barcelona, coliving barcelona contrato, arrendamiento habitacion barcelona, gestoria alquiler habitacion barcelona, alquiler habitacion gracia, alquiler habitacion eixample, piso compartido barcelona contrato',
      ogTitle: 'Contrato Alquiler Habitación Barcelona — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Barcelona. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'alquiler-habitacion-sevilla',
    heroImage: getCiudadImage('sevilla').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Alquiler de habitaciones en Sevilla',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios particulares que alquilan habitaciones en Sevilla capital y área metropolitana. Conoce el mercado de pisos compartidos en Triana, Nervión y zona universitaria, y redacta contratos conforme al Código Civil con normas de convivencia adaptadas al alquiler por habitación en Andalucía.',
      especialidades: ['Pisos compartidos en Sevilla', 'Contratos por habitación', 'Coliving y estudiantes'],
    },
    mercadoIntro:
      'Sevilla es una de las ciudades andaluzas con mayor demanda de habitaciones en piso compartido: estudiantes en Reina Mercedes y Viapol, jóvenes profesionales en Nervión y Los Remedios, y perfiles temporales vinculados a turismo y servicios. Muchos propietarios alquilan habitaciones entre particulares sin contrato escrito y asumen conflictos evitables sobre fianza, convivencia o impago.',
    zonasIntro:
      'Servicio en Sevilla capital, área metropolitana y barrios con alta demanda de alquiler por habitaciones entre particulares en Andalucía.',
    zonas: [
      'Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Centro',
      'Santa Cruz', 'Este-Alcosa', 'Cerro-Amate', 'Bellavista',
      'Viapol', 'Reina Mercedes', 'Dos Hermanas', 'Alcalá de Guadaíra',
    ],
    paraQuienExtra: [
      'Propietarios en Triana o Nervión con pisos de 3-4 habitaciones para alquilar a particulares',
      'Quien alquila habitaciones a estudiantes de la Universidad de Sevilla sin pasar por agencia',
      'Inversores en pisos compartidos cerca de Viapol, Macarena o Santa Justa',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación es válido en Sevilla y provincia?',
        a: 'Sí. El arrendamiento de habitación se rige por el Código Civil y es plenamente válido en Sevilla, Dos Hermanas, Alcalá de Guadaíra y resto de la provincia. Tu asesor adapta las cláusulas a tu piso concreto y al número de inquilinos.',
      },
      {
        q: '¿Puedo alquilar habitaciones en Sevilla sin contrato LAU de vivienda completa?',
        a: 'Correcto. Si alquilas habitaciones sueltas dentro de tu vivienda, no aplica el contrato LAU de piso íntegro. Necesitas un contrato de habitación por inquilino. Si alquilas el piso completo, sí necesitas contrato LAU (145€).',
      },
      {
        q: '¿Qué incluye el contrato para pisos compartidos en Sevilla?',
        a: 'Renta, fianza, normas de convivencia, uso de cocina y baño, preaviso de salida, causas de resolución por impago y procedimiento ante daños. Todo redactado por un gestor inmobiliario experto por 145€ IVA incluido.',
      },
    ],
    enlaceContratoLau: '/sevilla/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Sevilla desde 145€',
      description:
        '¿Alquilas una habitación en Sevilla? Contrato profesional para particulares con asesor experto. Código Civil, normas de convivencia, coliving y protección ante impagos. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion sevilla, alquilar habitacion sevilla, contrato habitacion piso compartido sevilla, coliving sevilla contrato, arrendamiento habitacion sevilla, gestoria alquiler habitacion sevilla, alquiler habitacion triana, alquiler habitacion nervion, piso compartido sevilla contrato, alquiler habitacion particular sevilla, alquiler habitacion estudiantes sevilla',
      ogTitle: 'Contrato Alquiler Habitación Sevilla — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Sevilla. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía · Costa del Sol',
    testimoniosLanding: 'alquiler-habitacion-malaga',
    heroImage: getCiudadImage('malaga').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Alquiler de habitaciones en Málaga',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a propietarios que alquilan habitaciones en Málaga capital, Teatinos y Costa del Sol. Especialista en contratos de habitación para estudiantes, profesionales y perfiles internacionales, con cláusulas de convivencia válidas conforme al Código Civil.',
      especialidades: ['Habitaciones en Teatinos-UMA', 'Coliving Costa del Sol', 'Contratos entre particulares'],
    },
    mercadoIntro:
      'Málaga concentra una demanda creciente de habitaciones en pisos compartidos: estudiantes en Teatinos y El Palo, nómadas digitales en Soho y Centro, y trabajadores temporales en la Costa del Sol. El alquiler de habitación entre particulares es habitual, pero sin contrato profesional los conflictos por fianza, convivencia o impago se alargan y encarecen.',
    zonasIntro:
      'Cobertura en Málaga capital, Teatinos, Costa del Sol y área metropolitana. Conocemos el mercado de alquiler por habitaciones entre particulares en la provincia.',
    zonas: [
      'Centro Histórico', 'Soho', 'Teatinos', 'El Palo-Pedregalejo', 'La Malagueta',
      'El Limonar', 'Huelin', 'Carretera de Cádiz', 'Ciudad Jardín',
      'Benalmádena', 'Torremolinos', 'Rincón de la Victoria',
    ],
    paraQuienExtra: [
      'Propietarios en Teatinos que alquilan habitaciones a estudiantes de la UMA',
      'Particulares con piso compartido en Centro o Soho para perfiles internacionales',
      'Quien alquila varias habitaciones en Málaga y necesita un contrato independiente por inquilino',
    ],
    faqExtra: [
      {
        q: '¿Cuánto cuesta el contrato de alquiler de habitación en Málaga?',
        a: '145€ IVA incluido. Tarifa plana por contrato personalizado, redacción jurídica y asesoramiento de un gestor inmobiliario experto. Entrega en 48 horas laborables en Málaga y provincia.',
      },
      {
        q: '¿Sirve para alquilar habitaciones a estudiantes en Teatinos?',
        a: 'Sí. Es uno de los casos más frecuentes en Málaga. El contrato regula renta, fianza, duración del curso académico o año, normas de convivencia y salida anticipada con validez jurídica.',
      },
      {
        q: '¿Es lo mismo que un contrato LAU para alquilar el piso entero?',
        a: 'No. El alquiler por habitación se rige por el Código Civil. Si alquilas la vivienda completa en Málaga, necesitas contrato LAU adaptado a la Ley de Vivienda 2026. También lo redactamos por 145€.',
      },
    ],
    enlaceContratoLau: '/malaga/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Málaga desde 145€',
      description:
        '¿Alquilas una habitación en Málaga? Contrato profesional para particulares con asesor experto. Teatinos, coliving, Código Civil y normas de convivencia. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion malaga, alquilar habitacion malaga, contrato habitacion piso compartido malaga, coliving malaga contrato, arrendamiento habitacion malaga, gestoria alquiler habitacion malaga, alquiler habitacion teatinos, alquiler habitacion centro malaga, piso compartido malaga contrato, alquiler habitacion particular malaga, alquiler habitacion estudiantes malaga',
      ogTitle: 'Contrato Alquiler Habitación Málaga — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Málaga. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    testimoniosLanding: 'alquiler-habitacion-bilbao',
    heroImage: getCiudadImage('bilbao').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Alquiler de habitaciones en Bilbao',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios particulares que alquilan habitaciones en Bilbao y Gran Bilbao. Domina el régimen del Código Civil aplicable al alquiler por habitación, la convivencia en pisos compartidos y las particularidades del mercado bilbaíno en barrios como Indautxu, Deusto y Abando.',
      especialidades: ['Pisos compartidos en Bilbao', 'Contratos por habitación', 'Asesoramiento pre y post firma'],
    },
    mercadoIntro:
      'Bilbao tiene una oferta limitada de vivienda y una demanda sostenida de habitaciones en piso compartido: estudiantes en Deusto y Leioa, jóvenes profesionales en Indautxu y Abando, y perfiles que buscan vivir en Gran Bilbao sin alquilar un piso entero. Sin contrato escrito, recuperar una habitación por impago o conflicto de convivencia puede ser lento y costoso.',
    zonasIntro:
      'Cobertura en Bilbao, Gran Bilbao y municipios del área metropolitana. Conocemos la dinámica del alquiler por habitaciones entre particulares en Bizkaia.',
    zonas: [
      'Indautxu', 'Abando', 'Deusto', 'Rekalde', 'Bilbao La Vieja',
      'Santutxu', 'Basurto', 'Zorrotza', 'Getxo', 'Barakaldo',
      'Portugalete', 'Leioa', 'Erandio',
    ],
    paraQuienExtra: [
      'Propietarios en Indautxu o Deusto con habitaciones sueltas para alquilar a particulares',
      'Quien comparte piso en Bilbao y quiere formalizar el alquiler de la tercera habitación',
      'Particulares que buscan inquilino sin agencia inmobiliaria en Gran Bilbao',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación es válido en Bilbao y Bizkaia?',
        a: 'Sí. El alquiler de habitación se rige por el Código Civil y es válido en Bilbao, Getxo, Barakaldo y resto de Bizkaia. Tu asesor adapta las cláusulas a tu situación concreta, número de inquilinos y normas de convivencia.',
      },
      {
        q: '¿Afecta el derecho foral vasco al contrato de habitación?',
        a: 'El arrendamiento de habitación dentro de una vivienda se rige principalmente por el Código Civil y los pactos entre las partes. Tu gestor te explica qué cláusulas conviene incluir y cómo protegerte ante impagos o daños en el piso compartido.',
      },
      {
        q: '¿Puedo alquilar varias habitaciones con contratos separados?',
        a: 'Sí, es lo recomendable. Cada inquilino debe tener su propio contrato de habitación para gestionar entradas, salidas, fianzas e impagos de forma independiente. Especialmente útil en pisos compartidos de Indautxu, Deusto o Abando.',
      },
    ],
    enlaceContratoLau: '/bilbao/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Bilbao desde 145€',
      description:
        '¿Alquilas una habitación en Bilbao? Contrato profesional para particulares con asesor experto. Código Civil, normas de convivencia y protección ante impagos en Gran Bilbao. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion bilbao, alquilar habitacion bilbao, contrato habitacion piso compartido bilbao, coliving bilbao contrato, arrendamiento habitacion bilbao, gestoria alquiler habitacion bilbao, alquiler habitacion indautxu, alquiler habitacion deusto, piso compartido bilbao contrato, alquiler habitacion particular bilbao, alquiler habitacion getxo',
      ogTitle: 'Contrato Alquiler Habitación Bilbao — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Bilbao. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'alquiler-habitacion-valencia',
    heroImage: getCiudadImage('valencia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Alquiler de habitaciones en Valencia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios que alquilan habitaciones en Valencia capital y l\'Horta. Conoce el mercado de pisos compartidos en Ruzafa, Benimaclet y zona universitaria, y redacta contratos conforme al Código Civil con normas de convivencia válidas para el alquiler por habitación.',
      especialidades: ['Pisos compartidos en Valencia', 'Coliving y estudiantes', 'Contratos entre particulares'],
    },
    mercadoIntro:
      'Valencia tiene una demanda muy alta de habitaciones en piso compartido: estudiantes en Benimaclet y Tarongers, jóvenes profesionales en Ruzafa o Ciutat Vella y perfiles internacionales en la ciudad de las Artes y las Ciencias. Muchos propietarios alquilan habitaciones entre particulares sin contrato escrito y asumen riesgos evitables sobre fianza, convivencia o impago.',
    zonasIntro:
      'Cobertura en Valencia capital, l\'Horta, área metropolitana y barrios con mayor demanda de alquiler por habitaciones entre particulares.',
    zonas: [
      'Ruzafa', 'Benimaclet', 'El Carmen', 'Campanar', 'Eixample',
      'Patraix', 'Quatre Carreres', 'Algirós', 'Ciutat Vella', 'Mislata',
      'Paterna', 'Torrent', 'Sagunto',
    ],
    paraQuienExtra: [
      'Propietarios en Ruzafa o Benimaclet con pisos de 3-4 habitaciones para alquilar a particulares',
      'Quien alquila habitaciones a estudiantes de la Universitat de València o la UPV',
      'Particulares con piso compartido cerca de Tarongers o Ciudad de las Artes',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación es válido en Valencia y la Comunitat Valenciana?',
        a: 'Sí. El arrendamiento de habitación se rige por el Código Civil y es válido en Valencia, Mislata, Paterna y resto de la Comunitat Valenciana. Tu asesor adapta las cláusulas a tu piso y al número de inquilinos.',
      },
      {
        q: '¿Aplica la normativa de zonas tensionadas al alquiler de habitación en Valencia?',
        a: 'El alquiler de una habitación dentro de una vivienda no se equipara al arrendamiento LAU de vivienda completa, por lo que las reglas de zona tensionada no se aplican igual. Tu asesor te explica las diferencias antes de fijar la renta.',
      },
      {
        q: '¿Necesito un contrato distinto por cada habitación en Valencia?',
        a: 'Sí, es lo recomendable. Si alquilas varias habitaciones a personas distintas en Ruzafa, Benimaclet u otro barrio, cada inquilino debe tener su propio contrato por 145€ IVA incluido.',
      },
    ],
    enlaceContratoLau: '/valencia/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Valencia desde 145€',
      description:
        '¿Alquilas una habitación en Valencia? Contrato profesional para particulares con asesor experto. Ruzafa, Benimaclet, Código Civil y normas de convivencia. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion valencia, alquilar habitacion valencia, contrato habitacion piso compartido valencia, coliving valencia contrato, arrendamiento habitacion valencia, gestoria alquiler habitacion valencia, alquiler habitacion ruzafa, alquiler habitacion benimaclet, piso compartido valencia contrato, alquiler habitacion particular valencia, alquiler habitacion estudiantes valencia',
      ogTitle: 'Contrato Alquiler Habitación Valencia — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Valencia. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    testimoniosLanding: 'alquiler-habitacion-zaragoza',
    heroImage: getCiudadImage('zaragoza').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Alquiler de habitaciones en Zaragoza',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios particulares que alquilan habitaciones en Zaragoza capital y provincia. Conoce el mercado de pisos compartidos cerca del campus universitario, Delicias y el centro, y redacta contratos conforme al Código Civil con normas de convivencia adaptadas al alquiler por habitación en Aragón.',
      especialidades: ['Pisos compartidos en Zaragoza', 'Contratos por habitación', 'Asesoramiento pre y post firma'],
    },
    mercadoIntro:
      'Zaragoza concentra una demanda estable de habitaciones en piso compartido: estudiantes en San Francisco y cerca de la Universidad de Zaragoza, jóvenes profesionales en el centro y trabajadores temporales vinculados a logística y servicios. Alquilar habitaciones entre particulares sin contrato escrito es habitual, pero genera conflictos evitables sobre fianza, convivencia o impago.',
    zonasIntro:
      'Servicio en Zaragoza capital, área metropolitana y barrios con alta demanda de alquiler por habitaciones entre particulares en Aragón.',
    zonas: [
      'Centro', 'Delicias', 'San Francisco', 'Actur', 'La Almozara',
      'Las Fuentes', 'Oliver-Valdefierro', 'Miralbueno', 'Torre Ramona',
      'Universidad', 'Valdespartera', 'Utebo',
    ],
    paraQuienExtra: [
      'Propietarios en Delicias o San Francisco con habitaciones para estudiantes universitarios',
      'Particulares con piso compartido en el centro de Zaragoza sin pasar por agencia',
      'Quien alquila varias habitaciones y necesita un contrato independiente por inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación es válido en Zaragoza y Aragón?',
        a: 'Sí. El alquiler de habitación se rige por el Código Civil y es válido en Zaragoza capital, Utebo, Cuarte de Huerva y resto de Aragón. Tu asesor adapta las cláusulas a tu situación concreta.',
      },
      {
        q: '¿Es lo mismo que un contrato LAU de vivienda completa en Zaragoza?',
        a: 'No. Si alquilas habitaciones sueltas dentro de tu vivienda, no aplica el contrato LAU de piso íntegro. Si alquilas el piso completo, necesitas contrato LAU (145€). Nosotros también lo redactamos.',
      },
      {
        q: '¿Puedo incluir normas de convivencia en el contrato de habitación?',
        a: 'Sí. Horarios, limpieza, visitas o uso de electrodomésticos pueden pactarse siempre que no sean abusivas. Tu gestor inmobiliario te ayuda a redactarlas con validez jurídica por 145€ IVA incluido.',
      },
    ],
    enlaceContratoLau: '/zaragoza/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Zaragoza desde 145€',
      description:
        '¿Alquilas una habitación en Zaragoza? Contrato profesional para particulares con asesor experto. Código Civil, normas de convivencia, coliving y protección ante impagos. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion zaragoza, alquilar habitacion zaragoza, contrato habitacion piso compartido zaragoza, coliving zaragoza contrato, arrendamiento habitacion zaragoza, gestoria alquiler habitacion zaragoza, alquiler habitacion delicias, alquiler habitacion san francisco, piso compartido zaragoza contrato, alquiler habitacion particular zaragoza, alquiler habitacion estudiantes zaragoza',
      ogTitle: 'Contrato Alquiler Habitación Zaragoza — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Zaragoza. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    region: 'Principado de Asturias',
    testimoniosLanding: 'alquiler-habitacion-asturias',
    heroImage: getCiudadImage('asturias').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Alquiler de habitaciones en Asturias',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a propietarios que alquilan habitaciones en Oviedo, Gijón, Avilés y resto del Principado. Especialista en contratos de habitación para estudiantes, profesionales y pisos compartidos, con cláusulas de convivencia válidas conforme al Código Civil.',
      especialidades: ['Habitaciones en Oviedo y Gijón', 'Pisos compartidos Asturias', 'Contratos entre particulares'],
    },
    mercadoIntro:
      'Asturias (Oviedo, Gijón, Avilés) tiene una demanda constante de habitaciones en piso compartido: estudiantes en el campus de El Milán y la Universidad de Oviedo, jóvenes profesionales en Gijón centro y trabajadores vinculados a la industria y servicios. El alquiler de habitación entre particulares es frecuente, pero sin contrato profesional los conflictos por fianza, convivencia o impago se alargan.',
    zonasIntro:
      'Cobertura en Oviedo, Gijón, Avilés, Langreo, Mieres y resto del Principado de Asturias. Conocemos el mercado de alquiler por habitaciones entre particulares.',
    zonas: [
      'Oviedo Centro', 'El Milán', 'La Ería', 'Teatinos-Oviedo', 'Gijón Centro',
      'Cimadevilla', 'La Calzada', 'Lavandera', 'Avilés', 'Langreo',
      'Mieres', 'Pumarín', 'Viesques',
    ],
    paraQuienExtra: [
      'Propietarios en Oviedo o Gijón que alquilan habitaciones en piso compartido a particulares',
      'Quien alquila habitaciones a estudiantes de la Universidad de Oviedo sin contrato escrito',
      'Particulares con varias habitaciones en el mismo piso que necesitan un contrato por inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación es válido en todo el Principado de Asturias?',
        a: 'Sí. El arrendamiento de habitación se rige por el Código Civil y es válido en Oviedo, Gijón, Avilés, Langreo, Mieres y resto de Asturias. Tu asesor adapta las cláusulas a tu piso concreto.',
      },
      {
        q: '¿Sirve para alquilar habitaciones a estudiantes en Oviedo o Gijón?',
        a: 'Sí. Es uno de los casos más habituales en Asturias. El contrato regula renta, fianza, duración del curso o año académico, normas de convivencia y salida anticipada con validez jurídica.',
      },
      {
        q: '¿Es lo mismo que un contrato LAU para alquilar el piso entero?',
        a: 'No. El alquiler por habitación se rige por el Código Civil. Si alquilas la vivienda completa en Asturias, necesitas contrato LAU adaptado a la Ley de Vivienda 2026 (145€). También lo redactamos.',
      },
    ],
    enlaceContratoLau: '/asturias/contrato-alquiler',
    meta: {
      title: 'Contrato alquiler habitación Asturias desde 145€',
      description:
        '¿Alquilas una habitación en Asturias? Contrato profesional para particulares en Oviedo, Gijón y Avilés. Código Civil, normas de convivencia y protección ante impagos. 145€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion asturias, alquilar habitacion oviedo, contrato habitacion gijon, alquiler habitacion piso compartido asturias, coliving oviedo contrato, arrendamiento habitacion gijon, gestoria alquiler habitacion asturias, alquiler habitacion aviles, piso compartido oviedo contrato, alquiler habitacion particular asturias, alquiler habitacion estudiantes oviedo',
      ogTitle: 'Contrato Alquiler Habitación Asturias — 145€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Oviedo, Gijón y Asturias. Contrato profesional, asesoramiento legal y entrega en 48h. 145€ IVA incluido.',
    },
  },
}

export function buildAlquilerHabitacionMetadata(config: AlquilerHabitacionCiudadConfig): Metadata {
  const path = `/gestoria/contrato-alquiler-habitacion/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Contrato alquiler habitación ${config.nombre}`,
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
