export type VentaCompletaBarrio = {
  nombre: string
  contexto: string
  operativa: string
}

export type VentaCompletaEnriquecimiento = {
  gestoriaTitulo: string
  gestoriaIntro: string
  situacionesTitulo: string
  situaciones: { titulo: string; desc: string }[]
  barriosTitulo: string
  barriosIntro: string
  barrios: VentaCompletaBarrio[]
  tramitesTitulo: string
  tramitesIntro: string
  tramitesLocales: string[]
  pasosTitulo: string
  pasos: { titulo: string; desc: string }[]
}

export const VENTA_COMPLETA_ENRIQUECIMIENTO: Record<string, VentaCompletaEnriquecimiento> = {
  alicante: {
    gestoriaTitulo: 'Gestoría inmobiliaria para vender en Alicante sin agencia',
    gestoriaIntro:
      'Inmonest no es una inmobiliaria: somos gestoría online para propietarios particulares que ya tienen comprador en Alicante, la Costa Blanca o el interior. Redactamos contratos, recopilamos documentación valenciana y te acompañamos hasta la escritura por 687 € fijos — sin comisión del 3-5 % sobre el precio de venta.',
    situacionesTitulo: 'Situaciones habituales en Alicante',
    situaciones: [
      {
        titulo: 'Comprador extranjero con NIE en trámite',
        desc: 'En Playa de San Juan o Benidorm es frecuente. Redactamos arras con condición suspensiva y plazos realistas mientras se regulariza la documentación.',
      },
      {
        titulo: 'Segunda residencia en la costa',
        desc: 'Vendes un piso que usabas en verano. Verificamos cédula de habitabilidad, IBI al día y distinción entre uso habitual y turístico antes de firmar arras.',
      },
      {
        titulo: 'Piso heredado en Elche o centro',
        desc: 'Varios titulares, escrituras antiguas o cargas pendientes. Tu gestor coordina nota simple, certificados y documentación para que notaría no bloquee el día de firma.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por zonas de Alicante',
    barriosIntro:
      'Cada barrio tiene un comprador distinto y documentación distinta. Adaptamos arras, plazos y checklist documental al contexto real del inmueble:',
    barrios: [
      {
        nombre: 'Centro y Explanada',
        contexto: 'Piso urbano con rotación de inquilinos previa',
        operativa: 'Pack vendedor con certificado energético, deudas de comunidad e inventario si vendes amueblado.',
      },
      {
        nombre: 'Playa de San Juan y Campello',
        contexto: 'Costa — compradores nacionales e internacionales',
        operativa: 'Arras con due diligence documental: licencia turística vs LAU, cargas y NIE del comprador.',
      },
      {
        nombre: 'Carolinas y Benalúa',
        contexto: 'Familias que venden para comprar en periferia',
        operativa: 'Venta completa con plazos cortos; coordinación con hipoteca del comprador y AVANT si había alquiler previo.',
      },
      {
        nombre: 'Elche y área metropolitana',
        contexto: 'Ticket medio, operaciones entre particulares',
        operativa: 'Documentación valenciana completa y orientación sobre plusvalía municipal antes de escritura.',
      },
      {
        nombre: 'Benidorm y Torrevieja',
        contexto: 'Inversión costera, muchos compradores extranjeros',
        operativa: 'Contratos en castellano con cláusulas claras sobre financiación y plazo a notaría en municipio costero.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en Alicante que gestionamos',
    tramitesIntro: 'Checklist adaptado a Comunitat Valenciana y mercado costero:',
    tramitesLocales: [
      'Cédula de habitabilidad vigente (Generalitat / AVANT)',
      'Certificado energético antes de compraventa',
      'Plusvalía municipal (IIVTNU) — orientación de cálculo para el vendedor',
      'Verificación de Registro de Turisme si el piso tuvo uso turístico',
    ],
    pasosTitulo: 'Cómo vendemos contigo en Alicante',
    pasos: [
      { titulo: 'Llamada en 24 h', desc: 'Analizamos barrio, precio pactado con tu comprador y documentación disponible.' },
      { titulo: '687 € tarifa plana', desc: 'Sin % sobre un piso de 240.000 € — ahorro de 7.200–12.000 € frente a agencia.' },
      { titulo: 'Arras y documentación', desc: 'Redacción de contratos y recopilación de certificados valencianos.' },
      { titulo: 'Escritura en notaría', desc: 'Coordinación del expediente hasta que el dinero esté en tu cuenta.' },
    ],
  },

  bilbao: {
    gestoriaTitulo: 'Vender en Bilbao con gestoría — no con comisión de agencia',
    gestoriaIntro:
      'Si ya tienes comprador en Bilbao, Getxo o el Gran Bilbao, Inmonest actúa como tu gestoría inmobiliaria: contratos, documentación foral y coordinación con notaría. Trabajamos solo para ti como vendedor particular — 687 € fijos, 0 % sobre el precio del piso.',
    situacionesTitulo: 'Casos frecuentes en Bizkaia',
    situaciones: [
      {
        titulo: 'Piso señorial en Abando con derrama pendiente',
        desc: 'Revisamos actas de comunidad de los últimos dos años y derramas antes de que firmes arras; evitas sorpresas en notaría.',
      },
      {
        titulo: 'Venta rápida en Deusto o Uribarri',
        desc: 'Comprador joven con hipoteca en trámite. Incluimos condición suspensiva y plazos realistas en arras penitenciales.',
      },
      {
        titulo: 'Adosado en Getxo entre particulares',
        desc: 'Garaje, trastero y elementos comunes en escritura. Describimos el inmueble con coherencia registral en contrato y nota simple.',
      },
    ],
    barriosTitulo: 'Operativa de venta por barrios en Bilbao',
    barriosIntro:
      'Desde Indautxu hasta Barakaldo, el perfil del comprador y la documentación del edificio cambian. Tu gestor adapta el expediente:',
    barrios: [
      {
        nombre: 'Abando e Indautxu',
        contexto: 'Ticket alto, compradores exigentes',
        operativa: 'Arras con revisión de cargas, ITE en edificios señoriales y coordinación con notarías del centro.',
      },
      {
        nombre: 'Deusto y Uribarri',
        contexto: 'Familias y operaciones con financiación',
        operativa: 'Plazos ajustados a aprobación hipotecaria; checklist de comunidad en fincas universitarias.',
      },
      {
        nombre: 'Casco Viejo y San Francisco',
        contexto: 'Edificios históricos, obras en fachada',
        operativa: 'Verificación de obras en comunidad e ITE antes de comprometer señal con el comprador.',
      },
      {
        nombre: 'Getxo y Portugalete',
        contexto: 'Área metropolitana costera',
        operativa: 'Venta completa con documentación foral vasca y orientación sobre plusvalía municipal.',
      },
      {
        nombre: 'Barakaldo y Santurtzi',
        contexto: 'Ticket medio, primer vivienda del comprador',
        operativa: 'Contratos ágiles, arras penitenciales y seguimiento hasta escritura en notaría local.',
      },
    ],
    tramitesTitulo: 'Documentación de venta en País Vasco',
    tramitesIntro: 'Trámites que exige una notaría en Bizkaia:',
    tramitesLocales: [
      'Nota simple registral actualizada del Registro de Bilbao',
      'Certificado de eficiencia energético vigente',
      'Certificado de deudas de comunidad e IBI al corriente',
      'ITE / inspección técnica en edificios antiguos del casco',
    ],
    pasosTitulo: 'Proceso de venta en Bilbao con Inmonest',
    pasos: [
      { titulo: 'Contratas online', desc: '687 € IVA incl. Gestor asignado en menos de 24 h.' },
      { titulo: 'Contratos a tu favor', desc: 'Reserva y arras redactadas protegiendo tus intereses como vendedor.' },
      { titulo: 'Expediente documental', desc: 'Subes todo al panel; verificamos antes de enviar a notaría.' },
      { titulo: 'Firma y cobro', desc: 'Acompañamiento el día de escritura y confirmación de cierre.' },
    ],
  },

  zaragoza: {
    gestoriaTitulo: 'Gestoría para vender tu piso en Zaragoza sin inmobiliaria',
    gestoriaIntro:
      'Inmonest ayuda a propietarios particulares en Zaragoza que venden por su cuenta: tienes comprador, precio acordado y necesitas alguien que redacte contratos y prepare la notaría. Somos gestoría inmobiliaria online — no captamos compradores ni cobramos comisión sobre tu venta.',
    situacionesTitulo: 'Escenarios típicos en Zaragoza',
    situaciones: [
      {
        titulo: 'Primera venta en Delicias o Actur',
        desc: 'Vendes el piso donde criaste a la familia. Te guiamos en arras, plusvalía e IRPF con lenguaje claro, sin tecnicismos innecesarios.',
      },
      {
        titulo: 'Comprador con hipoteca en Caixa o Ibercaja',
        desc: 'Plazos de 30-45 días hasta escritura. Cláusulas suspensivas bien redactadas para que no pierdas el comprador ni la señal.',
      },
      {
        titulo: 'Piso en casco con IEE pendiente',
        desc: 'Edificios de más de 50 años en el Centro. Detectamos IEE/ITE antes de arras para que el comprador no se eche atrás en el último momento.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por barrios de Zaragoza',
    barriosIntro:
      'Un piso en Romareda no se vende igual que un adosado en Utebo. Contextualizamos contratos y documentación:',
    barrios: [
      {
        nombre: 'Centro y Casco Histórico',
        contexto: 'Edificios antiguos, IEE habitual',
        operativa: 'Verificación de inspección técnica y certificado energético antes de señal.',
      },
      {
        nombre: 'Delicias y Actur',
        contexto: 'Demanda familiar estable',
        operativa: 'Venta completa con arras penitenciales y pack documental para notaría zaragozana.',
      },
      {
        nombre: 'Universidad y Romareda',
        contexto: 'Vendedores que alquilaron antes',
        operativa: 'Rescisión de alquiler previo, fianza INAGA y arras coordinadas si vendes tras desalojar.',
      },
      {
        nombre: 'Las Fuentes y Torrero',
        contexto: 'Residencial consolidado',
        operativa: 'Documentación de comunidad al día; orientación sobre ganancia patrimonial.',
      },
      {
        nombre: 'Utebo y Cuarte de Huerva',
        contexto: 'Periferia — compradores de Zaragoza capital',
        operativa: 'Misma gestoría online con referencias registrales del municipio del inmueble.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en Aragón',
    tramitesIntro: 'Lo que suele pedir la notaría en Zaragoza:',
    tramitesLocales: [
      'IEE en edificios de más de 50 años (muy habitual en casco)',
      'Certificado energético y cédula de habitabilidad',
      'Plusvalía municipal (IIVTNU) — cálculo orientativo',
      'Nota simple sin cargas ocultas ni usufructos',
    ],
    pasosTitulo: 'Tu venta en Zaragoza paso a paso',
    pasos: [
      { titulo: 'Cuéntanos tu caso', desc: 'Comprador, barrio (Delicias, Actur, Casco…) y plazo acordado.' },
      { titulo: '687 € sin sorpresas', desc: 'Frente a 5.700–9.500 € de comisión en piso de 190.000 €.' },
      { titulo: 'Panel online', desc: 'Subes DNIs, escrituras y recibos; el gestor valida cada documento.' },
      { titulo: 'Escritura', desc: 'Expediente completo en notaría de Zaragoza o área metropolitana.' },
    ],
  },

  coruna: {
    gestoriaTitulo: 'Vender en A Coruña con gestoría para particulares',
    gestoriaIntro:
      'Propietarios en A Coruña, Oleiros o Arteixo que venden sin agencia confían en Inmonest para la parte legal: arras, documentación gallega y día de escritura. No somos portal de anuncios ni inmobiliaria — somos gestoría inmobiliaria con panel online y gestor asignado.',
    situacionesTitulo: 'Situaciones reales en A Coruña',
    situaciones: [
      {
        titulo: 'Piso en Ciutat Vella con obras en fachada',
        desc: 'Revisamos actas de comunidad y derramas de rehabilitación antes de que entregues señal al comprador.',
      },
      {
        titulo: 'Venta desde Madrid o Galicia interior',
        desc: 'Gestionas todo online: videollamada con tu gestor, subida de documentos al panel y firma en notaría coruñesa.',
      },
      {
        titulo: 'Comprador que pide 15 días para la hipoteca',
        desc: 'Arras con condición suspensiva bien redactada — plazo realista sin bloquear tu operación.',
      },
    ],
    barriosTitulo: 'Barrios de A Coruña donde acompañamos ventas',
    barriosIntro:
      'Operativa adaptada al mercado atlántico y al tipo de comprador en cada zona:',
    barrios: [
      {
        nombre: 'Ciudad Vieja y Puertochico',
        contexto: 'Alta demanda, edificios históricos',
        operativa: 'ITE, certificado energético y deudas de comunidad verificados antes de arras.',
      },
      {
        nombre: 'Orzán y Riazor',
        contexto: 'Perfil joven, operaciones rápidas',
        operativa: 'Contratos ágiles y coordinación con banco del comprador.',
      },
      {
        nombre: 'Elviña y Zapateira',
        contexto: 'Zona universitaria',
        operativa: 'Venta tras finalizar alquiler a estudiantes; liquidación de fianza y arras coordinadas.',
      },
      {
        nombre: 'Oleiros y Arteixo',
        contexto: 'Familias en área metropolitana',
        operativa: 'Venta completa con documentación registral de municipio correspondiente.',
      },
      {
        nombre: 'Os Mallos y Agra del Orzán',
        contexto: 'Ticket accesible, compradores primerizos',
        operativa: 'Arras penitenciales claras y checklist documental sin lagunas.',
      },
    ],
    tramitesTitulo: 'Documentación para vender en Galicia',
    tramitesIntro: 'Checklist para notaría en A Coruña:',
    tramitesLocales: [
      'Depósito de fianza legal (si vendes tras alquiler LAU activo)',
      'Certificado energético y deudas de comunidad',
      'IBI y plusvalía municipal al corriente',
      'Nota simple del Registro de A Coruña',
    ],
    pasosTitulo: 'Vender en A Coruña con Inmonest',
    pasos: [
      { titulo: 'Gestor en 24 h', desc: 'Especialista en ventas entre particulares en Galicia.' },
      { titulo: '687 € fijos', desc: 'Sin comisión del 3-5 % — ahorro de 6.000–10.000 € en piso de 200.000 €.' },
      { titulo: 'Contratos + docs', desc: 'Reserva, arras y expediente completo para notaría.' },
      { titulo: 'Escritura', desc: 'Soporte el día de firma; confirmación de venta cerrada.' },
    ],
  },

  pamplona: {
    gestoriaTitulo: 'Gestoría inmobiliaria para vender en Pamplona sin agencia',
    gestoriaIntro:
      'Inmonest acompaña a vendedores particulares en Pamplona y Navarra: ya tienes comprador y quieres cerrar con garantías. Redactamos contratos, verificamos documentación foral y coordinamos notaría por 687 € — sin ceder un 3-5 % del precio a una inmobiliaria.',
    situacionesTitulo: 'Casos habituales en Pamplona',
    situaciones: [
      {
        titulo: 'Venta en Iturrama tras años de alquiler',
        desc: 'Verificamos que el inquilino salió correctamente, fianza depositada y contrato rescindido antes de las arras con el comprador.',
      },
      {
        titulo: 'Piso en Casco Antiguo con obras en comunidad',
        desc: 'Actas y derramas de fachada revisadas para que el comprador no exija descuento el día antes de notaría.',
      },
      {
        titulo: 'Comprador de Burlada o Comarca',
        desc: 'Operación entre particulares en distintos municipios navarros — misma gestoría online con adaptación registral.',
      },
    ],
    barriosTitulo: 'Ventas entre particulares por zonas de Pamplona',
    barriosIntro:
      'Desde el Ensanche hasta Barañáin, adaptamos plazos, arras y documentación al barrio y al perfil del comprador:',
    barrios: [
      {
        nombre: 'Casco Antiguo y Ensanche',
        contexto: 'Alta rotación, edificios con historia',
        operativa: 'Arras con revisión de obras en fachada e ITE si aplica.',
      },
      {
        nombre: 'Iturrama y San Juan',
        contexto: 'Familias que venden para mudarse',
        operativa: 'Venta completa con orientación fiscal (plusvalía, IRPF) incluida.',
      },
      {
        nombre: 'Mendillorri y Rochapea',
        contexto: 'Expansión urbana, compradores jóvenes',
        operativa: 'Contratos rápidos y condición de hipoteca del comprador.',
      },
      {
        nombre: 'Burlada y Barañáin',
        contexto: 'Comarca de Pamplona',
        operativa: 'Documentación navarra y coordinación con notaría de la comarca.',
      },
      {
        nombre: 'Buztintxuri y Ermitagaña',
        contexto: 'Perfil mixto urbano',
        operativa: 'Checklist documental completo subido al panel de gestoría.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en Navarra',
    tramitesIntro: 'Documentación habitual en notaría pamplonesa:',
    tramitesLocales: [
      'Certificado energético y deudas de comunidad',
      'Normativa autonómica navarra de fianzas (si procede)',
      'Plusvalía municipal e IBI',
      'Nota simple registral sin cargas',
    ],
    pasosTitulo: 'Proceso de venta en Pamplona',
    pasos: [
      { titulo: 'Primera consulta', desc: 'Barrio, precio pactado y estado de documentación.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana vs miles en comisión de agencia.' },
      { titulo: 'Panel + gestor', desc: 'Seguimiento online con Daniel o tu gestor asignado.' },
      { titulo: 'Escritura', desc: 'Expediente enviado a notaría; firma con tranquilidad.' },
    ],
  },
}

export function getVentaCompletaEnriquecimiento(slug: string): VentaCompletaEnriquecimiento | undefined {
  return VENTA_COMPLETA_ENRIQUECIMIENTO[slug]
}
