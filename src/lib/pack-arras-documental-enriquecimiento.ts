/**
 * Contenido SEO local exclusivo por ciudad — evita duplicate content entre landings Pack Arras Plus.
 * Cada bloque menciona barrios, precios €/m², impuestos autonómicos y referencias institucionales reales.
 */

type Enriquecimiento = {
  barriosPrecio: Array<{ barrio: string; precioM2: string; perfil: string }>
  fiscalidadLocal: { itp: string; plusvalia: string; notas: string[] }
  guiaComprador: { titulo: string; parrafos: string[] }
  pasosLocales: Array<{ titulo: string; desc: string }>
  checklistPreArras: string[]
}

export const PACK_ARRAS_DOCUMENTAL_ENRIQUECIMIENTO: Record<string, Enriquecimiento> = {
  madrid: {
    barriosPrecio: [
      { barrio: 'Salamanca', precioM2: '5.200 – 6.100 €/m²', perfil: 'Edificios señoriales, ITE frecuente y derramas millonarias en comunidades grandes' },
      { barrio: 'Chamberí', precioM2: '4.700 – 5.400 €/m²', perfil: 'Alto volumen de particulares; arras redactadas por el vendedor sin cláusula hipotecaria' },
      { barrio: 'Retiro', precioM2: '4.500 – 5.200 €/m²', perfil: 'Operaciones rápidas; riesgo de discrepancias catastro-registro en reformas integrales' },
      { barrio: 'Tetuán', precioM2: '3.400 – 3.900 €/m²', perfil: 'Mercado dinámico entre particulares; edificios de los 60–70 con ITE pendiente' },
      { barrio: 'Vallecas', precioM2: '2.200 – 2.700 €/m²', perfil: 'Precio accesible; presión del vendedor para firmar arras en 48–72 h' },
      { barrio: 'Móstoles', precioM2: '2.000 – 2.500 €/m²', perfil: 'Área metropolitana; operaciones sin revisión de actas de comunidad' },
    ],
    fiscalidadLocal: {
      itp: '6 % en vivienda habitual (Comunidad de Madrid)',
      plusvalia: 'IIVTNU municipal — calculada por el Ayuntamiento de Madrid según coeficientes oficiales',
      notas: [
        'Madrid aplica bonificación del 4 % ITP si cumples requisitos de vivienda habitual y edad',
        'En operaciones entre particulares el vendedor debe aportar certificado de deudas de la comunidad',
        'El IBI debe estar al corriente; verificamos recibos y situación con el Ayuntamiento',
      ],
    },
    guiaComprador: {
      titulo: 'Guía para comprar de particular en Madrid sin agencia',
      parrafos: [
        'Madrid concentra el mayor volumen de operaciones directas entre comprador y vendedor de España. En distritos como Chamberí o Tetuán es habitual encontrar anuncios de propietario en Idealista o Fotocasa, pero el vendedor rara vez entrega documentación completa antes de la señal. El Pack Arras Plus cubre ese vacío: redactamos arras con cláusulas válidas en la Comunidad de Madrid y auditamos ITE, actas de comunidad y nota simple del Registro de la Propiedad de Madrid.',
        'Si compras en zona tensionada según la Ley de Vivienda estatal, conviene verificar que el inmueble no tenga limitaciones de alquiler que afecten a tu operación. En edificios del Ensanche madrileño (Salamanca, Chamberí) las derramas de rehabilitación de fachada y ascensor pueden superar los 15.000 € por vivienda — las detectamos en actas antes de que entregues la señal.',
        'Un piso de 320.000 € en Madrid implica entre 9.600 € y 16.000 € de comisión si pasas por agencia. Con Inmonest pagas 450 € fijos por arras penitenciales redactadas e informe documental completo, con gestor asignado que conoce los requisitos del Ayuntamiento de Madrid y la normativa autonómica.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis del inmueble en Madrid', desc: 'Tu gestor revisa distrito, antigüedad del edificio, si aplica ITE del Ayuntamiento de Madrid y plazos realistas para hipoteca en bancos madrileños.' },
      { titulo: 'Arras adaptadas a la Comunidad de Madrid', desc: 'Redactamos contrato con ITP al 6 %, cláusula suspensiva por financiación y plazos de 45–60 días habituales en el mercado madrileño.' },
      { titulo: 'Auditoría registral y comunidad', desc: 'Solicitamos nota simple al Registro de Madrid, certificado de deudas de la comunidad y actas de los últimos dos ejercicios.' },
      { titulo: 'Informe con hallazgos locales', desc: 'Detectamos derramas en edificios de Tetuán, discrepancias catastrales en Vallecas o cargas no reflejadas en el anuncio de Idealista.' },
      { titulo: 'Seguimiento hasta escritura en notaría madrileña', desc: 'Coordinamos con notaría, verificamos liquidación de ITP en la Comunidad de Madrid y resolvemos incidencias pre-firma.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Madrid (titularidad, hipotecas, embargos)',
      'Certificado de deudas de la comunidad de propietarios (obligatorio en Madrid)',
      'IBI al corriente — verificación con recibos del Ayuntamiento de Madrid',
      'ITE / IEE si el edificio supera 50 años (frecuente en Chamberí, Tetuán, Centro)',
      'Cédula de habitabilidad o certificado de primera ocupación vigente',
      'Certificado energético con etiqueta actualizada',
      'Licencias de obra y certificado final si hubo reforma',
      'Coherencia entre catastro, registro y metros reales del piso',
    ],
  },

  barcelona: {
    barriosPrecio: [
      { barrio: 'Eixample', precioM2: '4.200 – 5.000 €/m²', perfil: 'Reformas sin licencia frecuentes; cédula de habitabilidad imprescindible' },
      { barrio: 'Gràcia', precioM2: '4.000 – 4.800 €/m²', perfil: 'Operaciones entre particulares con plazos de 48 h; riesgo de deuda de comunidad oculta' },
      { barrio: 'Sarrià-Sant Gervasi', precioM2: '4.800 – 5.800 €/m²', perfil: 'Mercado prime; edificios con ITE del Ajuntament de Barcelona pendiente' },
      { barrio: 'Poblenou', precioM2: '3.800 – 4.500 €/m²', perfil: 'Regeneración urbana; pisos con terrazas sin inscribir en registro' },
      { barrio: "L'Hospitalet", precioM2: '2.600 – 3.200 €/m²', perfil: 'Área metropolitana; alto volumen de particulares sin revisión documental' },
      { barrio: 'Badalona', precioM2: '2.400 – 2.900 €/m²', perfil: 'Precio accesible; arras genéricas no adaptadas a normativa catalana' },
    ],
    fiscalidadLocal: {
      itp: '10 % en Cataluña (Generalitat) — uno de los tipos más altos de España',
      plusvalia: 'IIVTNU del Ajuntament de Barcelona — plusvalía municipal según valor catastral',
      notas: [
        'La Generalitat exige cédula de habitabilidad vigente para cualquier compraventa',
        'En Cataluña el certificado energético (CEE) es obligatorio desde la publicación del anuncio',
        'Verificamos plusvalía municipal (IIVTNU) que debe liquidar el vendedor',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Barcelona: qué exige la Generalitat',
      parrafos: [
        'Barcelona es el mercado con normativa técnica más exigente de España. La cédula de habitabilidad de la Generalitat, el certificado energético y la ITE del edificio son requisitos habituales que muchos vendedores particulares no aportan antes de la señal. En el Eixample y Gràcia detectamos a menudo reformas de cocina y baño sin licencia final de obra — un riesgo urbanístico que heredas si firmas arras sin revisión.',
        'El ITP del 10 % en Cataluña encarece la operación: en un piso de 350.000 € pagarás 35.000 € de impuesto de transmisiones. Por eso es crítico verificar la documentación antes de entregar 30.000–50.000 € de señal. El Pack Arras Plus incluye arras redactadas válidas bajo jurisprudencia catalana y auditoría de cédula, ITE, actas de comunidad y nota simple.',
        'En operaciones entre particulares en Sants, Poblenou o l\'Hospitalet, el vendedor suele presionar con plazos de 48–72 h. Redactamos arras con plazos realistas (60 días), cláusula suspensiva por hipoteca y penitenciales equilibrados — sin pagar los 10.500–17.500 € de comisión de una agencia barcelonesa.',
      ],
    },
    pasosLocales: [
      { titulo: 'Verificación normativa catalana', desc: 'Comprobamos requisitos de la Generalitat: cédula de habitabilidad, CEE y ITE del Ajuntament de Barcelona si aplica.' },
      { titulo: 'Arras válidas en Cataluña', desc: 'Redactamos contrato adaptado a normativa autonómica, en castellano o catalán según acuerden las partes.' },
      { titulo: 'Licencias de obra en el Eixample', desc: 'Consultamos licencias en el Ayuntamiento de Barcelona y coherencia con el estado real del inmueble.' },
      { titulo: 'Informe documental completo', desc: 'Análisis de deudas de comunidad, derramas en edificios de Gràcia y cargas registrales no mencionadas en el anuncio.' },
      { titulo: 'Coordinación pre-escritura', desc: 'Verificamos liquidación de ITP del 10 % y plusvalía municipal antes de la firma en notaría barcelonesa.' },
    ],
    checklistPreArras: [
      'Cédula de habitabilidad de la Generalitat (obligatoria en compraventa catalana)',
      'Certificado energético (CEE) vigente',
      'ITE / certificado de inspección técnica del edificio (Ajuntament de Barcelona)',
      'Nota simple registral y concordancia con catastro',
      'Certificado de deudas de la comunidad de propietarios',
      'Licencias de obra y certificado final si hubo reforma en el Eixample o Gràcia',
      'IBI y plusvalía municipal (IIVTNU) al corriente',
      'Estatutos de la comunidad — compatibilidad con uso pretendido',
    ],
  },

  valencia: {
    barriosPrecio: [
      { barrio: 'Ciutat Vella', precioM2: '2.800 – 3.400 €/m²', perfil: 'Edificios históricos; ITE y licencias de reforma imprescindibles' },
      { barrio: 'Eixample', precioM2: '2.600 – 3.200 €/m²', perfil: 'Operaciones entre particulares dinámicas; derramas en edificios del s. XX' },
      { barrio: 'Ruzafa', precioM2: '3.000 – 3.600 €/m²', perfil: 'Barrio trendy; reformas sin legalizar y discrepancias de metros' },
      { barrio: 'Benimaclet', precioM2: '2.200 – 2.800 €/m²', perfil: 'Demanda de particulares; arras con plazos cortos para hipoteca' },
      { barrio: 'Paterna', precioM2: '1.800 – 2.300 €/m²', perfil: 'Área metropolitana; operaciones rápidas sin due diligence' },
      { barrio: 'Mislata', precioM2: '1.600 – 2.100 €/m²', perfil: 'Precio accesible; riesgo de deudas de comunidad ocultas' },
    ],
    fiscalidadLocal: {
      itp: '10 % en Comunitat Valenciana',
      plusvalia: 'IIVTNU del Ajuntament de València — calculada según valor catastral y años de tenencia',
      notas: [
        'La Generalitat Valenciana exige cédula de habitabilidad y certificado energético',
        'En Valencia capital conviene verificar licencias de obra en edificios del Cabanyal y Ciutat Vella',
        'El ITP del 10 % se liquida en la Agencia Tributaria Valenciana tras la escritura',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar de particular en Valencia: mercado y documentación',
      parrafos: [
        'Valencia combina precios más accesibles que Madrid o Barcelona con un mercado muy activo entre particulares en Ruzafa, Benimaclet y el Eixample. Los vendedores valencianos suelen negociar directamente por WhatsApp o Idealista, pero entregan borradores de arras copiados de internet — sin cláusula suspensiva por hipoteca ni revisión de actas de comunidad.',
        'En Ciutat Vella y el Cabanyal, edificios históricos requieren ITE y licencias de reforma verificadas en el Ayuntament de València. En Ruzafa detectamos frecuentemente discrepancias entre los metros del anuncio y el registro tras reformas integrales. El Pack Arras Plus cubre arras redactadas e informe documental adaptado a la normativa de la Generalitat Valenciana.',
        'En un piso de 260.000 € en Valencia, la agencia cobraría 7.800–13.000 €. Pagas 450 € por arras penitenciales e informe completo con gestor que conoce el mercado valenciano y los requisitos del Registro de la Propiedad de Valencia.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis del barrio valenciano', desc: 'Evaluamos si el inmueble está en zona histórica (Ciutat Vella), área metropolitana o barrio en transformación (Ruzafa, Cabanyal).' },
      { titulo: 'Arras con normativa valenciana', desc: 'Redactamos contrato con ITP al 10 %, plazos de 45–60 días y cláusulas válidas en la Comunitat Valenciana.' },
      { titulo: 'Documentación técnica Generalitat', desc: 'Verificamos cédula de habitabilidad, CEE e ITE en edificios de más de 50 años del Eixample valenciano.' },
      { titulo: 'Informe de comunidad y cargas', desc: 'Revisamos actas, derramas en edificios de Benimaclet y nota simple del Registro de Valencia.' },
      { titulo: 'Pre-escritura en notaría valenciana', desc: 'Coordinamos liquidación de ITP y verificamos que toda la documentación esté en regla antes de la firma.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Valencia',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad (Generalitat Valenciana)',
      'Certificado energético vigente',
      'ITE en edificios históricos de Ciutat Vella o Cabanyal',
      'Licencias de obra en el Ayuntament de València si hubo reforma',
      'IBI al corriente — recibos del ayuntamiento',
      'Coherencia catastro-registro (frecuente en Ruzafa tras reformas)',
    ],
  },

  sevilla: {
    barriosPrecio: [
      { barrio: 'Triana', precioM2: '3.000 – 3.600 €/m²', perfil: 'Casco histórico UNESCO; IEE obligatorio en edificios antiguos' },
      { barrio: 'Nervión', precioM2: '2.800 – 3.200 €/m²', perfil: 'Barrio residencial consolidado; operaciones entre particulares sin revisión' },
      { barrio: 'Los Remedios', precioM2: '2.900 – 3.400 €/m²', perfil: 'Alta demanda; derramas en comunidades de edificios de los 70–80' },
      { barrio: 'Macarena', precioM2: '2.400 – 2.900 €/m²', perfil: 'Centro histórico; riesgo de VFT (vivienda turística) mal declarada' },
      { barrio: 'Tomares', precioM2: '2.000 – 2.500 €/m²', perfil: 'Área metropolitana; presión para firmar arras en días' },
      { barrio: 'Dos Hermanas', precioM2: '1.600 – 2.100 €/m²', perfil: 'Precio accesible; arras genéricas sin protección hipotecaria' },
    ],
    fiscalidadLocal: {
      itp: '7 % en Andalucía (Junta de Andalucía) — tipo general para vivienda',
      plusvalia: 'IIVTNU del Ayuntamiento de Sevilla según ordenanza municipal',
      notas: [
        'La Junta de Andalucía exige IEE (Informe de Evaluación del Edificio) en edificios de más de 50 años',
        'Regulación estricta de vivienda turística (VFT) — verificamos licencia y estatutos comunitarios',
        'Cédula de habitabilidad obligatoria en operaciones de compraventa andaluza',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Sevilla según normativa andaluza',
      parrafos: [
        'Sevilla combina un casco histórico de altísima demanda (Triana, Santa Cruz, Macarena) con barrios residenciales como Nervión o Los Remedios donde cada vez más compradores contactan directamente con el propietario. La Junta de Andalucía exige IEE en edificios antiguos y regula con rigor la vivienda turística — dos puntos que rara vez aparecen en el anuncio de Idealista.',
        'En Triana y el Arenal, edificios señoriales acumulan derramas de rehabilitación de fachada que pueden superar los 8.000 € por vivienda. En Nervión detectamos operaciones donde el vendedor impone arras con plazo de 15–20 días — imposible si tu banco necesita 45 días para la hipoteca. El Pack Arras Plus redacta arras equilibradas y audita actas, IEE y nota simple antes de la señal.',
        'En un piso de 220.000 € en Sevilla, la comisión de agencia sería 6.600–11.000 €. Con Inmonest pagas 450 € fijos por arras penitenciales e informe documental adaptado a la normativa de la Junta de Andalucía.',
      ],
    },
    pasosLocales: [
      { titulo: 'Evaluación IEE andaluz', desc: 'Verificamos si el edificio requiere Informe de Evaluación del Edificio (habitual en Triana, Macarena y casco histórico).' },
      { titulo: 'Control VFT y estatutos', desc: 'Comprobamos registro de vivienda turística de la Junta y compatibilidad con estatutos comunitarios en zonas saturadas.' },
      { titulo: 'Arras penitenciales andaluzas', desc: 'Redactamos contrato con ITP al 7 %, plazos realistas y cláusula suspensiva por financiación.' },
      { titulo: 'Auditoría de comunidad en Nervión y Triana', desc: 'Revisamos actas, derramas aprobadas y deudas pendientes en edificios del s. XIX y XX.' },
      { titulo: 'Informe pre-señal', desc: 'Entregamos informe escrito con hallazgos antes o justo después de firmar arras, con recomendaciones de renegociación.' },
    ],
    checklistPreArras: [
      'Nota simple registral del Registro de la Propiedad de Sevilla',
      'IEE (Informe de Evaluación del Edificio) si el edificio supera 50 años',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad (Junta de Andalucía)',
      'Certificado energético vigente',
      'Registro VFT — licencia de vivienda turística si aplica',
      'Licencias de obra en edificios protegidos del casco histórico',
      'IBI al corriente con el Ayuntamiento de Sevilla',
    ],
  },

  malaga: {
    barriosPrecio: [
      { barrio: 'Centro Histórico', precioM2: '3.500 – 4.200 €/m²', perfil: 'Regeneración urbana; reformas sin licencia y VFT oculta' },
      { barrio: 'La Malagueta', precioM2: '3.800 – 4.500 €/m²', perfil: 'Litoral; edificios costeros con IEE afectado por humedad y salitre' },
      { barrio: 'Soho', precioM2: '3.200 – 3.900 €/m²', perfil: 'Barrio en transformación; licencias de obra imprescindibles' },
      { barrio: 'Teatinos', precioM2: '2.800 – 3.400 €/m²', perfil: 'Zona universitaria; alto volumen de particulares sin revisión' },
      { barrio: 'El Palo-Pedregalejo', precioM2: '2.600 – 3.200 €/m²', perfil: 'Frente marítimo; riesgo de licencia VFT caducada' },
      { barrio: 'Benalmádena', precioM2: '2.800 – 3.500 €/m²', perfil: 'Costa del Sol; operaciones con compradores internacionales' },
    ],
    fiscalidadLocal: {
      itp: '7 % en Andalucía (Junta de Andalucía)',
      plusvalia: 'IIVTNU del Ayuntamiento de Málaga — plusvalía municipal en operaciones de reventa',
      notas: [
        'La Junta ha reforzado la regulación de VFT en Málaga capital y municipios costeros',
        'Compradores internacionales deben verificar arras válidas bajo derecho español',
        'IEE obligatorio en edificios de más de 50 años — frecuente en Centro Histórico y La Malagueta',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar en Málaga y Costa del Sol de particular: guía documental',
      parrafos: [
        'Málaga es uno de los mercados con mayor presencia de compradores internacionales y operaciones directas entre particulares. Soho, Teatinos y el Centro Histórico concentran anuncios sin agencia, pero los vendedores entregan borradores de arras redactados a su favor — plazos de 72 h, señal del 10 %, sin protección hipotecaria.',
        'La regulación de vivienda turística (VFT) de la Junta de Andalucía afecta a muchos pisos en La Malagueta, El Palo y Benalmádena. Comprar sin verificar licencia VFT, estatutos comunitarios y IEE de edificios costeros puede costarte decenas de miles de euros. El Pack Arras Plus incluye arras válidas en España y auditoría completa antes de la señal.',
        'En un piso de 300.000 € en Málaga, la agencia cobraría 9.000–15.000 €. Pagas 450 € por arras redactadas e informe documental con gestor que conoce la normativa andaluza y el mercado internacional de la Costa del Sol.',
      ],
    },
    pasosLocales: [
      { titulo: 'Verificación VFT en la costa', desc: 'Comprobamos registro turístico de la Junta, moratorias en Málaga capital y compatibilidad con la comunidad.' },
      { titulo: 'Arras para compradores nacionales e internacionales', desc: 'Redactamos contrato válido bajo derecho español con cláusulas en castellano, adaptado a hipoteca en banco español.' },
      { titulo: 'Licencias en Soho y Centro Histórico', desc: 'Verificamos legalización de reformas en el Ayuntamiento de Málaga.' },
      { titulo: 'IEE en edificios costeros', desc: 'Analizamos informe de evaluación del edificio en La Malagueta y Pedregalejo — humedad y salitre agravan el estado.' },
      { titulo: 'Informe documental Costa del Sol', desc: 'Cruzamos nota simple, actas de comunidad, catastro y licencias antes de entregar la señal.' },
    ],
    checklistPreArras: [
      'Registro VFT de la Junta de Andalucía (vivienda turística)',
      'Nota simple registral del Registro de Málaga',
      'IEE si el edificio supera 50 años (Centro Histórico, La Malagueta)',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad andaluza vigente',
      'Licencias de obra en Soho, Muelle Uno o Teatinos',
      'Certificado energético actualizado',
      'Coherencia catastro-registro (frecuente en operaciones internacionales)',
    ],
  },

  zaragoza: {
    barriosPrecio: [
      { barrio: 'Centro / Delicias', precioM2: '2.200 – 2.800 €/m²', perfil: 'Ensanche zaragozano; ITE pendiente en edificios del s. XX' },
      { barrio: 'Actur', precioM2: '1.900 – 2.400 €/m²', perfil: 'Urbanizaciones años 2000; derramas de fachada y ascensor' },
      { barrio: 'Valdespartera', precioM2: '2.000 – 2.500 €/m²', perfil: 'Barrio en crecimiento; operaciones rápidas entre particulares' },
      { barrio: 'Montecanal', precioM2: '2.100 – 2.600 €/m²', perfil: 'Zona residencial; arras con plazos de 10–15 días habituales' },
      { barrio: 'La Almozara', precioM2: '2.300 – 2.900 €/m²', perfil: 'Regeneración urbana; reformas sin actualizar registro' },
      { barrio: 'Utebo', precioM2: '1.500 – 1.900 €/m²', perfil: 'Área metropolitana; precio accesible, poco revisión documental' },
    ],
    fiscalidadLocal: {
      itp: '8 % en Aragón (Gobierno de Aragón)',
      plusvalia: 'IIVTNU del Ayuntamiento de Zaragoza según ordenanza fiscal',
      notas: [
        'Aragón aplica ITP del 8 % en transmisiones de vivienda entre particulares',
        'El Ayuntamiento de Zaragoza exige ITE en edificios de más de 50 años del Ensanche',
        'Mercado dinámico: plazos cortos habituales — conviene arras con cláusula hipotecaria',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Zaragoza: mercado accesible, riesgos reales',
      parrafos: [
        'Zaragoza ofrece uno de los mercados más accesibles de las grandes ciudades españolas, con alto volumen de operaciones entre particulares en Delicias, Actur, Las Fuentes y el Ensanche. Los plazos son cortos y los vendedores presionan para firmar arras en días — sin que nadie revise la documentación del Registro de Zaragoza.',
        'En Actur y Valdespartera, urbanizaciones de los años 2000 acumulan derramas de fachada, ascensor y eficiencia energética que rara vez aparecen en el anuncio. En Delicias detectamos discrepancias entre metros registrales y catastrales en pisos reformados del Ensanche. El Pack Arras Plus redacta arras con plazos de 45–60 días e informe documental adaptado a la normativa aragonesa.',
        'En un piso de 185.000 € en Zaragoza, la agencia cobraría 5.550–9.250 €. Pagas 450 € fijos por arras penitenciales e informe completo con gestor asignado.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis del mercado zaragozano', desc: 'Evaluamos barrio (Actur, Delicias, Valdespartera), antigüedad del edificio y plazos realistas para hipoteca.' },
      { titulo: 'Arras con ITP aragonés del 8 %', desc: 'Redactamos contrato con cláusula suspensiva por financiación y penitenciales equilibrados.' },
      { titulo: 'ITE del Ensanche zaragozano', desc: 'Verificamos inspección técnica en edificios de principios del s. XX del centro histórico.' },
      { titulo: 'Derramas en Actur y Valdespartera', desc: 'Revisamos actas de comunidades de los años 2000 con derramas de fachada y ascensor pendientes.' },
      { titulo: 'Informe pre-señal en Zaragoza', desc: 'Entregamos informe escrito con hallazgos y recomendaciones antes de entregar la señal.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Zaragoza',
      'Certificado de deudas de la comunidad (Actur, Valdespartera, Delicias)',
      'ITE / IEE si el edificio supera 50 años (Ensanche zaragozano)',
      'Cédula de habitabilidad aragonesa vigente',
      'Certificado energético actualizado',
      'Licencias de obra en el Ayuntamiento de Zaragoza',
      'IBI al corriente — recibos municipales',
      'Coherencia catastro-registro en pisos reformados del centro',
    ],
  },

  bilbao: {
    barriosPrecio: [
      { barrio: 'Indautxu', precioM2: '3.800 – 4.500 €/m²', perfil: 'Ensanche bilbaíno; edificios señoriales con ITE y derramas elevadas' },
      { barrio: 'Abando', precioM2: '3.600 – 4.200 €/m²', perfil: 'Centro financiero; operaciones entre particulares con plazos cortos' },
      { barrio: 'Deusto', precioM2: '3.200 – 3.800 €/m²', perfil: 'Zona universitaria; discrepancias catastro-registro frecuentes' },
      { barrio: 'Bilbao La Vieja', precioM2: '2.800 – 3.400 €/m²', perfil: 'Regeneración urbana; licencias de obra imprescindibles' },
      { barrio: 'Getxo', precioM2: '3.500 – 4.800 €/m²', perfil: 'Gran Bilbao premium; plusvalía foral de Bizkaia a verificar' },
      { barrio: 'Barakaldo', precioM2: '2.000 – 2.600 €/m²', perfil: 'Área metropolitana; precio accesible, arras sin cláusula hipotecaria' },
    ],
    fiscalidadLocal: {
      itp: '4 % en País Vasco (Bizkaia) — tipo reducido respecto al resto de España',
      plusvalia: 'Plusvalía foral de Bizkaia — cálculo distinto al IIVTNU estatal; verificamos liquidación del vendedor',
      notas: [
        'El País Vasco tiene normativa foral propia en materia urbanística e hipotecaria',
        'La plusvalía foral de Bizkaia se calcula con coeficientes diferentes al resto de España',
        'El Ayuntamiento de Bilbao exige ITE en edificios de más de 50 años del Ensanche',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Bilbao: normativa foral y mercado de Bizkaia',
      parrafos: [
        'Bilbao concentra operaciones entre particulares en Indautxu, Deusto y el Ensanche, donde el precio medio supera los 3.500 €/m². El País Vasco tiene normativa foral propia: la plusvalía de Bizkaia se calcula de forma diferente al resto de España, y muchos compradores de fuera no conocen los requisitos documentales del mercado bilbaíno.',
        'En Indautxu y Abando, edificios del s. XX acumulan derramas de rehabilitación de fachada que pueden superar los 10.000 € por vivienda. En Deusto detectamos discrepancias entre metros del anuncio y registro. El Pack Arras Plus redacta arras válidas bajo derecho común con atención a particularidades forales y audita ITE, actas y nota simple antes de la señal.',
        'En un piso de 280.000 € en Bilbao, la agencia cobraría 8.400–14.000 €. Pagas 450 € fijos por arras penitenciales e informe documental con gestor que conoce la normativa de Bizkaia y el Registro de Bilbao.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis foral vascoo', desc: 'Verificamos plusvalía foral de Bizkaia, ITP al 4 % y requisitos del Ayuntamiento de Bilbao.' },
      { titulo: 'Arras equilibradas en Bizkaia', desc: 'Redactamos contrato con plazos de 45–60 días y cláusula suspensiva por financiación en bancos vascos.' },
      { titulo: 'ITE del Ensanche bilbaíno', desc: 'Comprobamos inspección técnica en edificios de Indautxu, Abando y casco histórico.' },
      { titulo: 'Auditoría de comunidad', desc: 'Revisamos actas, derramas en edificios señoriales y certificado de deudas.' },
      { titulo: 'Informe pre-señal en Gran Bilbao', desc: 'Informe escrito con hallazgos antes de entregar la señal en operaciones entre particulares.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Bilbao',
      'Plusvalía foral de Bizkaia — verificación de liquidación del vendedor',
      'ITE del edificio (Ayuntamiento de Bilbao) si supera 50 años',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado',
      'IBI al corriente con el Ayuntamiento de Bilbao',
      'Licencias de obra en Bilbao La Vieja o Deusto si hubo reforma',
    ],
  },

  coruna: {
    barriosPrecio: [
      { barrio: 'Ensanche', precioM2: '2.400 – 3.000 €/m²', perfil: 'Centro coruñés; derramas en edificios del s. XX' },
      { barrio: 'Ciudad Vieja', precioM2: '2.600 – 3.200 €/m²', perfil: 'Casco histórico; ITE pendiente en edificios antiguos' },
      { barrio: 'Monte Alto', precioM2: '2.200 – 2.700 €/m²', perfil: 'Barrio residencial; operaciones entre particulares sin revisión' },
      { barrio: 'Elviña', precioM2: '1.900 – 2.400 €/m²', perfil: 'Zona universitaria; arras con plazos cortos habituales' },
      { barrio: 'Oleiros', precioM2: '2.300 – 2.900 €/m²', perfil: 'Área metropolitana premium; discrepancias catastro-registro' },
      { barrio: 'Arteixo', precioM2: '1.700 – 2.200 €/m²', perfil: 'Extrarradio; precio accesible, poco due diligence previo' },
    ],
    fiscalidadLocal: {
      itp: '10 % en Galicia (Xunta de Galicia)',
      plusvalia: 'IIVTNU del Concello da Coruña según ordenanza municipal',
      notas: [
        'Galicia aplica ITP del 10 % — entre los tipos más altos junto a Cataluña y Valencia',
        'La Xunta exige cédula de habitabilidad y certificado energético en compraventa',
        'En A Coruña es frecuente comprar desde Madrid o Santiago — el pack funciona 100 % online',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en A Coruña: guía para compradores gallegos y foráneos',
      parrafos: [
        'A Coruña concentra operaciones directas entre comprador y vendedor en el Ensanche, Monte Alto y municipios como Oleiros o Arteixo. Muchos compradores llegan desde Madrid, Santiago o Vigo sin conocer los requisitos documentales de la Xunta de Galicia — y firman arras en 48 h sin revisar actas de comunidad.',
        'En el Ensanche coruñés, edificios de principios del s. XX acumulan derramas de fachada y ascensor. En Ciudad Vieja la ITE es frecuentemente obligatoria. El ITP del 10 % en Galicia encarece la operación: en un piso de 210.000 € pagarás 21.000 € de impuesto. Por eso es crítico verificar documentación antes de la señal.',
        'El Pack Arras Plus incluye arras redactadas e informe documental adaptado a la normativa gallega por 450 € fijos — frente a 6.300–10.500 € de comisión de agencia en A Coruña.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis del mercado coruñés', desc: 'Evaluamos barrio (Ensanche, Oleiros, Elviña), antigüedad del edificio y si compras desde otra provincia.' },
      { titulo: 'Arras con ITP gallego del 10 %', desc: 'Redactamos contrato con plazos realistas y cláusula suspensiva por financiación.' },
      { titulo: 'Documentación Xunta de Galicia', desc: 'Verificamos cédula de habitabilidad, CEE e ITE en edificios del Ensanche y Ciudad Vieja.' },
      { titulo: 'Auditoría de comunidad', desc: 'Revisamos actas, derramas aprobadas y deudas en edificios del s. XX.' },
      { titulo: 'Coordinación online pre-escritura', desc: 'Gestor asignado coordina con notaría en A Coruña sin que necesites desplazarte hasta la firma.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de A Coruña',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad (Xunta de Galicia)',
      'Certificado energético vigente',
      'ITE en edificios de Ciudad Vieja y Ensanche',
      'IBI al corriente con el Concello da Coruña',
      'Licencias de obra si hubo reforma',
      'Coherencia catastro-registro (frecuente en Oleiros y Ensanche)',
    ],
  },

  valladolid: {
    barriosPrecio: [
      { barrio: 'Centro', precioM2: '2.000 – 2.600 €/m²', perfil: 'Casco histórico; protección patrimonial y licencias de reforma' },
      { barrio: 'Parquesol', precioM2: '1.900 – 2.400 €/m²', perfil: 'Barrio residencial; derramas en urbanizaciones años 90–2000' },
      { barrio: 'Delicias', precioM2: '1.800 – 2.300 €/m²', perfil: 'Operaciones entre particulares dinámicas; ITE en edificios del s. XX' },
      { barrio: 'La Victoria', precioM2: '1.700 – 2.200 €/m²', perfil: 'Precio accesible; presión para firmar arras en días' },
      { barrio: 'Laguna de Duero', precioM2: '1.600 – 2.000 €/m²', perfil: 'Área metropolitana; compradores desde Madrid sin revisión local' },
      { barrio: 'Rondilla', precioM2: '1.500 – 1.900 €/m²', perfil: 'Barrio tradicional; arras genéricas sin cláusula hipotecaria' },
    ],
    fiscalidadLocal: {
      itp: '8 % en Castilla y León (Junta de Castilla y León)',
      plusvalia: 'IIVTNU del Ayuntamiento de Valladolid según ordenanza fiscal',
      notas: [
        'Castilla y León aplica ITP del 8 % en transmisiones de vivienda',
        'Muchos compradores llegan desde Madrid — el pack funciona 100 % online',
        'En el centro histórico conviene verificar protección patrimonial y licencias de reforma',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Valladolid desde Madrid u otra provincia',
      parrafos: [
        'Valladolid es destino frecuente de compradores que se mudan desde Madrid u otras ciudades: precios más accesibles (1.800–2.600 €/m² en Parquesol o Delicias) y buena conexión AVE. Pero comprar a distancia sin revisar documentación local es arriesgado — el vendedor presiona para firmar arras en 72 h y nadie verifica actas de comunidad ni ITE del edificio.',
        'En Parquesol y Delicias, urbanizaciones de los 90–2000 acumulan derramas de fachada y ascensor. En el centro histórico hay particularidades urbanísticas por protección patrimonial. El Pack Arras Plus redacta arras con plazos realistas e informe documental adaptado a la Junta de Castilla y León — todo online, sin gestoría presencial.',
        'En un piso de 190.000 € en Valladolid, la agencia cobraría 5.700–9.500 €. Pagas 450 € fijos por arras penitenciales e informe completo con gestor asignado.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis a distancia del inmueble', desc: 'Tu gestor evalúa barrio (Parquesol, Delicias, Centro), antigüedad y documentación disponible — sin desplazarte.' },
      { titulo: 'Arras con ITP castellanoleonés del 8 %', desc: 'Redactamos contrato con cláusula hipotecaria y plazos de 45–60 días adaptados al mercado vallisoletano.' },
      { titulo: 'Protección patrimonial del centro', desc: 'Verificamos licencias de reforma y restricciones urbanísticas en el casco histórico de Valladolid.' },
      { titulo: 'Derramas en Parquesol', desc: 'Revisamos actas de comunidades de los 90–2000 con derramas pendientes.' },
      { titulo: 'Coordinación con notaría en Valladolid', desc: 'Gestor coordina documentación y firma; tú solo te desplazas el día de la escritura.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Valladolid',
      'Certificado de deudas de la comunidad (Parquesol, Delicias, La Victoria)',
      'ITE si el edificio supera 50 años (centro histórico)',
      'Cédula de habitabilidad castellanoleonesa vigente',
      'Certificado energético actualizado',
      'Licencias de reforma en edificios protegidos del centro',
      'IBI al corriente con el Ayuntamiento de Valladolid',
      'Coherencia catastro-registro en pisos reformados',
    ],
  },

  murcia: {
    barriosPrecio: [
      { barrio: 'Centro', precioM2: '1.600 – 2.200 €/m²', perfil: 'Casco histórico; edificios antiguos con ITE pendiente' },
      { barrio: 'Vista Alegre', precioM2: '1.700 – 2.300 €/m²', perfil: 'Barrio residencial; operaciones rápidas entre particulares' },
      { barrio: 'El Carmen', precioM2: '1.500 – 2.000 €/m²', perfil: 'Precio accesible; presión para señal el mismo día' },
      { barrio: 'La Flota', precioM2: '1.400 – 1.900 €/m²', perfil: 'Zona periférica; arras sin revisión documental previa' },
      { barrio: 'Cartagena', precioM2: '1.500 – 2.100 €/m²', perfil: 'Segunda ciudad de la región; operaciones con plazos cortos' },
      { barrio: 'Lorca', precioM2: '1.200 – 1.700 €/m²', perfil: 'Precio muy accesible; riesgo de deudas de comunidad ocultas' },
    ],
    fiscalidadLocal: {
      itp: '8 % en Región de Murcia',
      plusvalia: 'IIVTNU del Ayuntamiento de Murcia según ordenanza municipal',
      notas: [
        'La Región de Murcia aplica ITP del 8 % en compraventa de vivienda',
        'Mercado muy accesible — operaciones entre particulares muy frecuentes',
        'En Cartagena y Lorca aplicamos el mismo pack con gestor online',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Murcia: mercado accesible, revisión imprescindible',
      parrafos: [
        'Murcia es uno de los mercados más accesibles de España (1.400–2.300 €/m² en capital), con altísimo volumen de operaciones entre particulares en Vista Alegre, El Carmen y barrios periféricos. La facilidad de precio no elimina el riesgo: el vendedor presiona para entregar señal el mismo día sin certificado de deudas ni nota simple revisada.',
        'En urbanizaciones de Churra, El Palmar o Molina de Segura acumulamos derramas de fachada en comunidades de los 2000. En Cartagena detectamos discrepancias catastrales en pisos reformados. El Pack Arras Plus redacta arras equilibradas e informe documental adaptado a la Región de Murcia por 450 € fijos.',
        'En un piso de 175.000 € en Murcia, la agencia cobraría 5.250–8.750 €. Con Inmonest pagas 450 € por arras penitenciales e informe completo — también en Cartagena y Lorca.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis del mercado murciano', desc: 'Evaluamos barrio (Vista Alegre, El Carmen, Cartagena), precio y documentación disponible del vendedor.' },
      { titulo: 'Arras con ITP murciano del 8 %', desc: 'Redactamos contrato con plazo de 48 h para revisión documental y 45–60 días para escritura.' },
      { titulo: 'Auditoría de comunidad', desc: 'Revisamos actas y derramas en urbanizaciones de Churra, El Palmar y Molina de Segura.' },
      { titulo: 'Informe pre-señal', desc: 'Detectamos deudas ocultas, discrepancias catastrales y cargas registrales antes de entregar la señal.' },
      { titulo: 'Cobertura en Cartagena y Lorca', desc: 'Mismo servicio online para compradores en toda la Región de Murcia.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Murcia (o Cartagena/Lorca)',
      'Certificado de deudas de la comunidad de propietarios',
      'Cédula de habitabilidad regional vigente',
      'Certificado energético actualizado',
      'ITE si el edificio lo exige (centro histórico de Murcia)',
      'IBI al corriente con el ayuntamiento correspondiente',
      'Licencias de obra si hubo reforma',
      'Coherencia catastro-registro en pisos de Vista Alegre o Cartagena',
    ],
  },

  pamplona: {
    barriosPrecio: [
      { barrio: 'Casco Antiguo', precioM2: '2.800 – 3.400 €/m²', perfil: 'Centro histórico; ITE pendiente en edificios antiguos' },
      { barrio: 'Iturrama', precioM2: '2.400 – 3.000 €/m²', perfil: 'Barrio residencial; derramas en urbanizaciones años 2000' },
      { barrio: 'Ermitagaña', precioM2: '2.800 – 3.400 €/m²', perfil: 'Zona premium; discrepancias catastro-registro frecuentes' },
      { barrio: 'Mendillorri', precioM2: '2.300 – 2.900 €/m²', perfil: 'Barrio en crecimiento; operaciones entre particulares sin revisión' },
      { barrio: 'Lezkairu', precioM2: '2.500 – 3.100 €/m²', perfil: 'Desarrollo urbanístico reciente; arras con plazos cortos' },
      { barrio: 'Burlada', precioM2: '2.000 – 2.600 €/m²', perfil: 'Área metropolitana; precio accesible, arras genéricas' },
    ],
    fiscalidadLocal: {
      itp: '6 % en Navarra (Gobierno de Navarra) — convenio foral con tipos propios',
      plusvalia: 'Plusvalía municipal del Ayuntamiento de Pamplona según normativa navarra',
      notas: [
        'Navarra tiene normativa foral propia — ITP del 6 %, inferior a muchas comunidades',
        'El derecho foral navarro afecta a aspectos urbanísticos y fiscales de la compraventa',
        'El Ayuntamiento de Pamplona exige ITE en edificios de más de 50 años del casco antiguo',
      ],
    },
    guiaComprador: {
      titulo: 'Comprar piso de particular en Pamplona: normativa foral navarra',
      parrafos: [
        'Pamplona concentra operaciones entre particulares en Iturrama, Ermitagaña y barrios periféricos en crecimiento. Navarra tiene normativa foral propia que afecta a la compraventa: ITP del 6 % (inferior al 10 % de Cataluña o Galicia) pero con particularidades urbanísticas que conviene verificar antes de firmar arras.',
        'En Iturrama y Mendillorri, urbanizaciones de los 2000 acumulan derramas de fachada y ascensor. En el Casco Antiguo la ITE es frecuentemente obligatoria. Los vendedores navarros suelen fijar plazos de 10–15 días para escritura — imposible si tu banco necesita 45 días. El Pack Arras Plus redacta arras con plazos realistas e informe documental adaptado a Navarra.',
        'En un piso de 240.000 € en Pamplona, la agencia cobraría 7.200–12.000 €. Pagas 450 € fijos por arras penitenciales e informe completo con gestor asignado.',
      ],
    },
    pasosLocales: [
      { titulo: 'Análisis normativa navarra', desc: 'Verificamos ITP del 6 %, particularidades forales y requisitos del Ayuntamiento de Pamplona.' },
      { titulo: 'Arras con plazos realistas', desc: 'Redactamos contrato con cláusula suspensiva por financiación y 45–60 días para escritura.' },
      { titulo: 'ITE del casco antiguo', desc: 'Comprobamos inspección técnica en edificios del Casco Antiguo y Ensanche pamplonés.' },
      { titulo: 'Derramas en Iturrama y Mendillorri', desc: 'Revisamos actas de comunidades de los 2000 con derramas de fachada pendientes.' },
      { titulo: 'Informe pre-señal en Navarra', desc: 'Informe escrito con hallazgos antes de entregar la señal en operaciones entre particulares.' },
    ],
    checklistPreArras: [
      'Nota simple del Registro de la Propiedad de Pamplona',
      'Certificado de deudas de la comunidad (Iturrama, Ermitagaña, Mendillorri)',
      'ITE si el edificio supera 50 años (Casco Antiguo)',
      'Cédula de habitabilidad navarra vigente',
      'Certificado energético actualizado',
      'Licencias de obra en el Ayuntamiento de Pamplona',
      'IBI al corriente — recibos municipales',
      'Verificación normativa foral navarra aplicable a la operación',
    ],
  },
}
