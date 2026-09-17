import fs from 'fs'

const prestamoPath = 'src/lib/prestamo-particulares-ciudad-data.ts'
let p = fs.readFileSync(prestamoPath, 'utf8')

const prestamoLocal = {
  alicante: {
    zonas: [
      'Centro / Santa Cruz', 'Mercado Central', 'Playa de San Juan', 'Carolinas Altas',
      'Benalúa', 'San Blas', 'San Vicente del Raspeig', 'Elche', 'Mutxamel', 'Campello',
    ],
    faqArea: 'San Juan, Elche y resto de la provincia',
    kwRegion: 'modelo 600 prestamo comunitat valenciana',
    bioJunta: 'Junta de Comunitat Valenciana',
  },
  murcia: {
    zonas: [
      'Centro / Catedral', 'La Fama', 'Vistabella', 'El Carmen', 'Santiago el Mayor',
      'Churra', 'Alcantarilla', 'Molina de Segura', 'Cartagena', 'Lorca',
    ],
    faqArea: 'Cartagena, Lorca y resto de la Región de Murcia',
    kwRegion: 'modelo 600 prestamo region de murcia',
    bioJunta: 'CARM (Región de Murcia)',
  },
  granada: {
    zonas: [
      'Centro / Albaicín', 'Realejo', 'Zaidín', 'Chana', 'Ronda',
      'Armilla', 'Maracena', 'Albolote', 'Motril', 'Baza',
    ],
    faqArea: 'Armilla, Motril y provincia de Granada',
    kwRegion: 'modelo 600 prestamo andalucia',
    bioJunta: 'Junta de Andalucía',
  },
  coruna: {
    zonas: [
      'Ciudad Vieja', 'Orzán / Riazor', 'Cuatro Caminos', 'Elviña', 'Matogrande',
      'Sada', 'Ferrol', 'Oleiros', 'Arteixo', 'Carballo',
    ],
    faqArea: 'Ferrol, Oleiros y resto de la provincia',
    kwRegion: 'modelo 600 prestamo galicia',
    bioJunta: 'Xunta de Galicia',
  },
  pamplona: {
    zonas: [
      'Casco Antiguo', 'Ensanche', 'Iturrama', 'San Juan', 'Rochapea',
      'Burlada', 'Tudela', 'Barañáin', 'Mutilva', 'Ansoáin',
    ],
    faqArea: 'Burlada, Tudela y Comunidad Foral de Navarra',
    kwRegion: 'modelo 600 prestamo navarra',
    bioJunta: 'Hacienda Foral de Navarra',
  },
  salamanca: {
    zonas: [
      'Centro histórico', 'San Bernardo', 'Garrido', 'Delicias', 'Pizarrales',
      'Vista Hermosa', 'Laguna de Duero', 'Peñaranda', 'Béjar', 'Ciudad Rodrigo',
    ],
    faqArea: 'Laguna de Duero, Béjar y provincia de Salamanca',
    kwRegion: 'modelo 600 prestamo castilla y leon',
    bioJunta: 'Junta de Castilla y León',
  },
}

for (const [slug, loc] of Object.entries(prestamoLocal)) {
  const zonasStr = loc.zonas.map((z) => `'${z}'`).join(', ')
  const reZonas = new RegExp(
    `(  ${slug}: \\{[\\s\\S]*?zonas: \\[)[\\s\\S]*?(\\],\\n    paraQuienExtra:)`,
  )
  p = p.replace(reZonas, `$1\n      ${zonasStr},\n    $2`)

  const cityLabel =
    slug === 'coruna' ? 'A Coruña' : slug.charAt(0).toUpperCase() + slug.slice(1)
  p = p.replace(
    `en ${cityLabel}, Laguna de Duero y resto de la provincia`,
    `en ${loc.faqArea}`,
  )
  p = p.replace(
    `modelo 600 prestamo castilla y leon, prestamo padres hijos entrada piso ${slug}`,
    `${loc.kwRegion}, prestamo padres hijos entrada piso ${slug}`,
  )
  p = p.replace(
    `Modelo 600 ante la Junta de Región de Murcia`,
    `Modelo 600 ante la ${loc.bioJunta}`,
  )
}

// fix murcia bio (only murcia had wrong junta name from replaceAll)
p = p.replace('Modelo 600 ante la CARM (Región de Murcia)', 'Modelo 600 ante la CARM (Región de Murcia)')
for (const slug of ['alicante', 'granada', 'coruna', 'pamplona', 'salamanca']) {
  const loc = prestamoLocal[slug]
  const name = slug === 'coruna' ? 'A Coruña' : slug.charAt(0).toUpperCase() + slug.slice(1)
  p = p.replace(
    new RegExp(`bio: 'Asesora a prestamistas y prestatarios en ${name} y provincia\\. Especialista[\\s\\S]*?Modelo 600 ante la Junta de [^']+'`),
    `bio: 'Asesora a prestamistas y prestatarios en ${name} y provincia. Especialista en préstamos familiares para entrada de vivienda, financiación entre particulares con compradores desde otras provincias, Modelo 600 ante la ${loc.bioJunta} y protección ante reclamaciones de la AEAT.'`,
  )
}

fs.writeFileSync(prestamoPath, p)

const alqPath = 'src/lib/alquiler-local-comercial-ciudad-data.ts'
let a = fs.readFileSync(alqPath, 'utf8')

function replaceCityBlock(slug, nextSlug, block) {
  const start = a.indexOf(`  ${slug}: {`)
  const end = nextSlug ? a.indexOf(`  ${nextSlug}: {`) : a.search(/\r?\n}\r?\n\r?\nexport function buildAlquilerLocalComercialMetadata/)
  if (start === -1 || end === -1) throw new Error(`block ${slug} not found`)
  a = a.slice(0, start) + block + a.slice(end)
}

const blocks = {
  murcia: `  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'alquiler-local-comercial-murcia',
    heroImage: getCiudadImage('murcia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Murcia',
      bio: 'Asesora alquileres de local en el centro murciano, Mercado de Verónicas, Gran Vía y polígonos de Churra y El Puntal. Conoce licencias del Ayuntamiento de Murcia, hostelería en Trapería y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Murcia combina comercio de barrio en Trapería y Platería con retail en Nueva Condomina y locales en pedanías. En Cartagena y Lorca hay bajos portuarios y hostelería turística. Muchos propietarios usan contratos de vivienda o PDF genéricos que no cubren tanteo, obras ni traspaso en el Título III LAU.',
    zonasIntro: 'Cobertura en Murcia capital, área metropolitana, Cartagena, Lorca y municipios de la Región.',
    zonas: [
      'Centro / Trapería', 'Gran Vía', 'Verónicas', 'La Fama', 'Vistabella',
      'Churra', 'El Puntal', 'Alcantarilla', 'Cartagena', 'Lorca',
    ],
    rentaEjemploMensual: 750,
    localesGestionados: 12,
    paraQuienExtra: [
      'Propietarios de bajos en el centro histórico o Gran Vía',
      'Autónomos que abren negocio en Murcia sin pagar comisión del 10% sobre renta anual',
      'Quien alquila local en polígono o nave ligera entre particulares',
    ],
    faqExtra: [
      {
        q: '¿Puedo alquilar un local en el centro con contrato de vivienda?',
        a: 'No. Los locales comerciales se rigen por el Título III LAU. Un contrato residencial no protege tanteo, obras ni traspaso. Tu gestor redacta el régimen empresarial adaptado a retail o hostelería murciana.',
      },
      {
        q: '¿El contrato es válido en Cartagena y Lorca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en Murcia capital y municipios de la Región, con adaptación a licencias locales y práctica del mercado.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Murcia',
      'Normativa urbanística y uso comercial',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Murcia desde 145€',
      description:
        '¿Alquilas o arriendas un local en Murcia? Contrato LAU empresarial para particulares. Centro, Gran Vía y área metropolitana. Gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial murcia, alquilar local murcia particular, arrendamiento local murcia, gestoria local comercial murcia, alquiler bajo comercial murcia centro',
      ogTitle: 'Alquiler Local Comercial Murcia — 145€ con gestor experto',
      ogDescription:
        'Locales comerciales en Murcia entre particulares. Tanteo, obras, traspaso y licencias. Sin comisión de agencia.',
    },
  },

`,
  granada: `  granada: {
    slug: 'granada',
    nombre: 'Granada',
    region: 'Andalucía',
    testimoniosLanding: 'alquiler-local-comercial-granada',
    heroImage: getCiudadImage('granada').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Granada',
      bio: 'Asesora alquileres de local en el centro granadino, Realejo, Zaidín y polígonos de Armilla. Conoce licencias del Ayuntamiento de Granada, hostelería en Plaza Nueva y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Granada mezcla turismo en Albaicín y hostelería en Reyes Católicos con comercio en Zaidín y Chana. En Motril y la costa hay locales estacionales. Propietarios particulares alquilan bajos sin contrato LAU empresarial y asumen riesgos en traspaso de bares y amortización de obras.',
    zonasIntro: 'Servicio en Granada capital, área metropolitana, Motril y municipios de la provincia.',
    zonas: [
      'Centro / Reyes Católicos', 'Realejo', 'Albaicín', 'Zaidín', 'Chana',
      'Armilla', 'Maracena', 'Albolote', 'Motril', 'Baza',
    ],
    rentaEjemploMensual: 820,
    localesGestionados: 10,
    paraQuienExtra: [
      'Propietarios de bajos en Plaza Nueva o Realejo con hostelería',
      'Autónomos granadinos que formalizan arrendamiento sin agencia',
      'Quien alquila local con actividad turística en el centro histórico',
    ],
    faqExtra: [
      {
        q: '¿Regula el traspaso de bares en el centro de Granada?',
        a: 'Sí. El traspaso es frecuente en hostelería granadina. El contrato puede limitar, condicionar o prohibir el traspaso y regular el derecho de tanteo del propietario.',
      },
      {
        q: '¿Atienden en Armilla, Motril y la provincia?',
        a: 'Sí. Redactamos contratos válidos en Granada capital y municipios de la provincia, adaptados al Título III LAU y licencias municipales.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Granada',
      'Terrazas y ocupación de vía pública en hostelería',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Granada desde 145€',
      description:
        'Alquiler de local comercial en Granada entre particulares. Centro, Realejo y Zaidín. Contrato LAU con gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial granada, alquilar local granada, arrendamiento local granada, gestoria local comercial granada, alquiler bajo comercial granada centro',
      ogTitle: 'Alquiler Local Comercial Granada — 145€',
      ogDescription: 'Locales comerciales en Granada entre particulares. Gestoría especializada sin comisión de agencia.',
    },
  },

`,
  coruna: `  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    testimoniosLanding: 'alquiler-local-comercial-coruna',
    heroImage: getCiudadImage('coruna').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en A Coruña',
      bio: 'Asesora alquileres de local en la Ciudad Vieja, Orzán, Cuatro Caminos y polígonos de Arteixo. Conoce licencias del Ayuntamiento de A Coruña, hostelería en Marina y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'A Coruña concentra comercio en la Ciudad Vieja y Gran Vía con hostelería en Orzán y Matogrande. En Ferrol y Oleiros hay bajos en edificios mixtos. Sin contrato LAU empresarial, el propietario asume riesgos en tanteo ante venta y obras del inquilino.',
    zonasIntro: 'Cobertura en A Coruña capital, Ferrol, Oleiros, Arteixo y área metropolitana.',
    zonas: [
      'Ciudad Vieja', 'Orzán / Riazor', 'Cuatro Caminos', 'Elviña', 'Matogrande',
      'Sada', 'Ferrol', 'Oleiros', 'Arteixo', 'Carballo',
    ],
    rentaEjemploMensual: 900,
    localesGestionados: 9,
    paraQuienExtra: [
      'Propietarios de bajos en Ciudad Vieja o Gran Vía',
      'Autónomos gallegos que arriendan local sin comisión inmobiliaria',
      'Quien alquila nave ligera en polígono de Arteixo entre particulares',
    ],
    faqExtra: [
      {
        q: '¿El contrato cubre locales en edificios mixtos vivienda-comercio?',
        a: 'Sí. En A Coruña es habitual el bajo comercial en edificio residencial. Adaptamos cláusulas de uso, licencia y comunidad de propietarios.',
      },
      {
        q: '¿Es válido en Ferrol y municipios de la comarca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en la provincia de A Coruña, con adaptación a licencias locales.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de A Coruña',
      'Normativa urbanística gallega y uso comercial',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial A Coruña desde 145€',
      description:
        'Contrato alquiler local comercial en A Coruña para particulares. Ciudad Vieja, Orzán y área metropolitana. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial coruna, alquilar local a coruña particular, arrendamiento local coruña, gestoria local comercial galicia',
      ogTitle: 'Alquiler Local Comercial A Coruña — 145€',
      ogDescription: 'Locales comerciales en A Coruña entre particulares. Contrato LAU con gestoría Inmonest.',
    },
  },

`,
  pamplona: `  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    testimoniosLanding: 'alquiler-local-comercial-pamplona',
    heroImage: getCiudadImage('pamplona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Pamplona',
      bio: 'Asesora alquileres de local en el Casco Antiguo, Ensanche y polígonos de Mutilva. Conoce licencias del Ayuntamiento de Pamplona, hostelería en Estafeta y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Pamplona combina retail en el Ensanche con hostelería en el Casco Antiguo y comercio en Rochapea. En Burlada y Ansoáin hay bajos en edificios recientes. Propietarios particulares necesitan contrato LAU empresarial para regular tanteo, obras y traspaso sin depender de plantillas de vivienda.',
    zonasIntro: 'Servicio en Pamplona, área metropolitana, Tudela y Comunidad Foral de Navarra.',
    zonas: [
      'Casco Antiguo', 'Ensanche', 'Iturrama', 'San Juan', 'Rochapea',
      'Burlada', 'Tudela', 'Barañáin', 'Mutilva', 'Ansoáin',
    ],
    rentaEjemploMensual: 950,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos en Ensanche o Casco Antiguo',
      'Autónomos navarros que formalizan arrendamiento sin agencia',
      'Quien alquila local con actividad hostelería en Estafeta o plaza',
    ],
    faqExtra: [
      {
        q: '¿El contrato regula terrazas en hostelería pamplonesa?',
        a: 'Sí. Podemos incluir quién tramita licencia municipal, tasas de vía pública y qué ocurre si se retira la autorización.',
      },
      {
        q: '¿Atienden en Tudela y municipios de Navarra?',
        a: 'Sí. Redactamos contratos válidos en Pamplona y resto de la Comunidad Foral, adaptados al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Pamplona',
      'Normativa foral y ordenanzas municipales',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Pamplona desde 145€',
      description:
        'Alquiler de local comercial en Pamplona entre particulares. Casco Antiguo, Ensanche y área metropolitana. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial pamplona, alquilar local pamplona, arrendamiento local navarra, gestoria local comercial pamplona',
      ogTitle: 'Alquiler Local Comercial Pamplona — 145€',
      ogDescription: 'Locales comerciales en Pamplona entre particulares. Gestoría Inmonest sin comisión de agencia.',
    },
  },

`,
  mallorca: `  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Islas Baleares',
    testimoniosLanding: 'alquiler-local-comercial-mallorca',
    heroImage: getCiudadImage('mallorca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Mallorca',
      bio: 'Asesora alquileres de local en Palma centro, Paseo Marítimo, polígonos de Son Castelló y municipios turísticos. Conoce licencias del Ajuntament de Palma, hostelería en Puerto y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Palma concentra retail en Jaime III y hostelería en La Lonja y Puerto. En Calvià, Manacor y Inca hay locales estacionales y traspasos frecuentes. Sin contrato LAU empresarial, propietarios e inquilinos asumen riesgos en temporada alta, obras y traspaso de negocio.',
    zonasIntro: 'Cobertura en Palma, Calvià, Manacor, Inca y municipios de Mallorca con actividad comercial.',
    zonas: [
      'Palma — Centro', 'La Lonja', 'Paseo Marítimo', 'Son Castelló', 'Pere Garau',
      'Calvià', 'Magaluf / Palmanova', 'Manacor', 'Inca', 'Pollença',
    ],
    rentaEjemploMensual: 1100,
    localesGestionados: 14,
    paraQuienExtra: [
      'Propietarios de locales en Palma o zona turística costera',
      'Autónomos baleares que arriendan sin comisión del 10% anual',
      'Quien alquila local con traspaso de hostelería en Puerto o Paseo Marítimo',
    ],
    faqExtra: [
      {
        q: '¿El contrato contempla estacionalidad turística?',
        a: 'Sí. Podemos adaptar cláusulas de renta, apertura y garantías cuando la actividad depende de temporada en zona costera.',
      },
      {
        q: '¿Es válido en Calvià, Manacor e Inca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en Mallorca, con adaptación a licencias del municipio correspondiente.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ajuntament de Palma / municipios',
      'Terrazas y ocupación de vía pública en hostelería',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Mallorca desde 145€',
      description:
        'Alquiler de local comercial en Mallorca entre particulares. Palma, Calvià y costa. Contrato LAU con gestor. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial mallorca, alquilar local palma particular, arrendamiento local baleares, gestoria local comercial palma',
      ogTitle: 'Alquiler Local Comercial Mallorca — 145€',
      ogDescription: 'Locales comerciales en Mallorca entre particulares. Tanteo, traspaso y licencias con Inmonest.',
    },
  },

`,
  salamanca: `  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    testimoniosLanding: 'alquiler-local-comercial-salamanca',
    heroImage: getCiudadImage('salamanca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Salamanca',
      bio: 'Asesora alquileres de local en el centro universitario, Gran Vía y polígonos de Villamayor. Conoce licencias del Ayuntamiento de Salamanca, hostelería en Plaza Mayor y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Salamanca vive del comercio en el centro histórico y hostelería en torno a la Plaza Mayor, con demanda universitaria en Calle Toro. En Villamayor y Carbajosa hay naves y bajos en polígonos. Propietarios particulares alquilan locales sin contrato LAU empresarial y asumen riesgos en tanteo y obras.',
    zonasIntro: 'Servicio en Salamanca capital, Villamayor, Laguna de Duero y municipios de la provincia.',
    zonas: [
      'Centro / Plaza Mayor', 'Gran Vía', 'San Bernardo', 'Garrido', 'Delicias',
      'Villamayor', 'Laguna de Duero', 'Carbajosa', 'Peñaranda', 'Béjar',
    ],
    rentaEjemploMensual: 700,
    localesGestionados: 7,
    paraQuienExtra: [
      'Propietarios de bajos en el centro histórico o Gran Vía',
      'Autónomos salmantinos que formalizan arrendamiento sin agencia',
      'Quien alquila local en polígono de Villamayor entre particulares',
    ],
    faqExtra: [
      {
        q: '¿El contrato sirve para locales en el centro patrimonial?',
        a: 'Sí. Adaptamos cláusulas de uso, licencia y posibles restricciones urbanísticas en edificios protegidos del casco histórico.',
      },
      {
        q: '¿Atienden en Villamayor y Laguna de Duero?',
        a: 'Sí. Redactamos contratos válidos en Salamanca capital y área metropolitana, conforme al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Salamanca',
      'Normativa urbanística en casco histórico',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Salamanca desde 145€',
      description:
        'Alquiler de local comercial en Salamanca entre particulares. Centro, Gran Vía y Villamayor. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial salamanca, alquilar local salamanca, arrendamiento local salamanca, gestoria local comercial castilla y leon',
      ogTitle: 'Alquiler Local Comercial Salamanca — 145€',
      ogDescription: 'Locales comerciales en Salamanca entre particulares. Gestoría Inmonest sin comisión de agencia.',
    },
  },

`,
}

const order = [
  ['murcia', 'granada'],
  ['granada', 'coruna'],
  ['coruna', 'pamplona'],
  ['pamplona', 'mallorca'],
  ['mallorca', 'salamanca'],
  ['salamanca', null],
]
for (const [slug, next] of order) {
  replaceCityBlock(slug, next, blocks[slug])
}

fs.writeFileSync(alqPath, a)
console.log('patched prestamo + alquiler local content')
