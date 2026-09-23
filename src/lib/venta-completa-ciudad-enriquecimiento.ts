import { VENTA_COMPLETA_ENRIQUECIMIENTO_CORE } from './venta-completa-ciudad-enriquecimiento-core'

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

  murcia: {
    gestoriaTitulo: 'Gestoría para vender en Murcia sin comisión de agencia',
    gestoriaIntro:
      'Murcia concentra operaciones rápidas entre particulares en Vista Alegre y El Carmen. Inmonest redacta arras, revisa deudas de comunidad en urbanizaciones y te acompaña hasta notaría por 687 € fijos.',
    situacionesTitulo: 'Situaciones habituales de vendedores en Murcia',
    situaciones: [
      {
        titulo: 'Presión para firmar arras el mismo día',
        desc: 'El comprador exige señal sin revisar certificado de deudas. Tu gestor negocia plazos y redacta arras equilibradas.',
      },
      {
        titulo: 'Piso en urbanización con derramas',
        desc: 'Comunidades en Churra o El Palmar con cuotas pendientes. Verificamos actas antes de comprometer el precio.',
      },
      {
        titulo: 'Venta en Cartagena o Lorca',
        desc: 'Mismo servicio online con adaptación registral al municipio del inmueble y coordinación notarial.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por zonas de Murcia',
    barriosIntro: 'Mercado accesible pero con riesgos documentales si vendes sin gestoría:',
    barrios: [
      { nombre: 'Centro y El Carmen', contexto: 'Edificios antiguos, operaciones rápidas', operativa: 'ITE y cédula regional verificadas antes de arras.' },
      { nombre: 'Vista Alegre', contexto: 'Alta rotación entre particulares', operativa: 'Pack documental completo subido al panel de gestoría.' },
      { nombre: 'La Flota y periferia', contexto: 'Precio accesible, compradores jóvenes', operativa: 'Arras con condición de hipoteca del comprador.' },
      { nombre: 'Cartagena', contexto: 'Segunda ciudad de la región', operativa: 'Coordinación registral cartagenera y plazos realistas.' },
      { nombre: 'Lorca', contexto: 'Operaciones directas frecuentes', operativa: 'Checklist documental adaptado a municipio lorquino.' },
    ],
    tramitesTitulo: 'Trámites de venta en Región de Murcia',
    tramitesIntro: 'Documentación habitual en notaría murciana:',
    tramitesLocales: ['Cédula de habitabilidad regional', 'Certificado energético', 'Nota simple sin cargas', 'IBI y plusvalía municipal', 'Certificado de deudas de comunidad'],
    pasosTitulo: 'Proceso de venta en Murcia',
    pasos: [
      { titulo: 'Consulta', desc: 'Precio pactado y urgencia del comprador.' },
      { titulo: '687 € fijos', desc: 'Sin % sobre un piso de 175.000 €.' },
      { titulo: 'Arras + docs', desc: 'Contrato y recopilación documental regional.' },
      { titulo: 'Escritura', desc: 'Expediente listo para notaría en Murcia o área metropolitana.' },
    ],
  },

  granada: {
    gestoriaTitulo: 'Vender en Granada entre particulares con gestoría online',
    gestoriaIntro:
      'Granada mezcla casco histórico, universidad y periferia en expansión. Somos gestoría para vendedores que ya tienen comprador — no agencia. 687 € hasta escritura.',
    situacionesTitulo: 'Situaciones habituales en Granada',
    situaciones: [
      { titulo: 'Piso en el Albaicín o Realejo', desc: 'Edificios protegidos y reformas sin licencia. Revisamos documentación urbanística antes de arras.' },
      { titulo: 'Venta por traslado laboral', desc: 'Plazos cortos del comprador. Coordinamos arras, hipoteca ajena y notaría granadina.' },
      { titulo: 'Herencia entre hermanos', desc: 'Varios titulares en registro. Tu gestor alinea documentación para una sola venta a particular.' },
    ],
    barriosTitulo: 'Ventas por barrios de Granada',
    barriosIntro: 'Adaptamos arras y checklist al barrio y al perfil del comprador:',
    barrios: [
      { nombre: 'Centro y Realejo', contexto: 'Casco histórico', operativa: 'Revisión de licencias de obra y protección patrimonial.' },
      { nombre: 'Zaidín y Chana', contexto: 'Familias y estudiantes', operativa: 'Operaciones rápidas con arras penitenciales claras.' },
      { nombre: 'Albaicín', contexto: 'Turismo y segunda residencia', operativa: 'Verificación de uso turístico vs habitual en comunidad.' },
      { nombre: 'Armilla y área metropolitana', contexto: 'Expansión urbana', operativa: 'Documentación andaluza estándar y plazos de hipoteca.' },
    ],
    tramitesTitulo: 'Trámites de venta en Granada',
    tramitesIntro: 'Requisitos andaluces antes de escritura:',
    tramitesLocales: ['Cédula de habitabilidad andaluza', 'Certificado energético', 'Nota simple registral', 'Deudas de comunidad e IBI', 'ITE en edificios antiguos del centro'],
    pasosTitulo: 'Tu venta en Granada paso a paso',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Barrio, precio y estado de la documentación.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana frente a comisión de agencia.' },
      { titulo: 'Panel de gestoría', desc: 'Subes docs y sigues el expediente online.' },
      { titulo: 'Notaría', desc: 'Coordinación hasta firma de escritura pública.' },
    ],
  },

  mallorca: {
    gestoriaTitulo: 'Gestoría inmobiliaria para vender en Mallorca sin agencia',
    gestoriaIntro:
      'En Palma y Mallorca venden muchos particulares a compradores nacionales y extranjeros. Inmonest redacta arras, verifica cédula balear y cargas, y coordina notaría por 687 € — sin comisión del 3-5 %.',
    situacionesTitulo: 'Situaciones habituales en Mallorca',
    situaciones: [
      { titulo: 'Comprador extranjero con plazos de NIE', desc: 'Arras con condición suspensiva mientras se regulariza la documentación del comprador.' },
      { titulo: 'Segunda residencia en Portixol o Calvià', desc: 'Distinción entre uso habitual y turístico en comunidad y registro.' },
      { titulo: 'Venta desde península', desc: 'Propietario no residente: gestoría 100 % online con notaría palmesana.' },
    ],
    barriosTitulo: 'Venta entre particulares en Palma y Mallorca',
    barriosIntro: 'Cada zona tiene compradores y trámites distintos:',
    barrios: [
      { nombre: 'Palma Centro', contexto: 'Piso urbano, rotación alta', operativa: 'Arras con inventario si vendes amueblado.' },
      { nombre: 'Portixol y Playa', contexto: 'Segunda residencia', operativa: 'Revisión de certificados y comunidad costera.' },
      { nombre: 'Son Espanyolet', contexto: 'Familias y profesionales', operativa: 'Documentación balear completa para notaría.' },
      { nombre: 'Calvià y litoral', contexto: 'Compradores internacionales', operativa: 'Plazos realistas para financiación y NIE.' },
      { nombre: 'Inca y interior', contexto: 'Precio más accesible', operativa: 'Mismo pack gestoría con registro local.' },
    ],
    tramitesTitulo: 'Trámites de venta en Baleares',
    tramitesIntro: 'Documentación exigida en notaría balear:',
    tramitesLocales: ['Cédula de habitabilidad balear', 'Certificado energético', 'Nota simple sin cargas', 'IBI en Palma o municipio', 'Certificado de deudas de comunidad'],
    pasosTitulo: 'Proceso de venta en Mallorca',
    pasos: [
      { titulo: 'Consulta inicial', desc: 'Municipio, precio pactado y perfil del comprador.' },
      { titulo: '687 € fijos', desc: 'Sin comisión sobre 320.000 € o más.' },
      { titulo: 'Gestor + panel', desc: 'Seguimiento online hasta notaría.' },
      { titulo: 'Escritura', desc: 'Expediente completo en notaría de Palma o Mallorca.' },
    ],
  },

  asturias: {
    gestoriaTitulo: 'Vender en Asturias con gestoría — Oviedo, Gijón y Avilés sin agencia',
    gestoriaIntro:
      'Si ya tienes comprador en Oviedo, Gijón, Avilés o la costa asturiana, Inmonest actúa como tu gestoría inmobiliaria: arras penitenciales, documentación del Principado e ITE en ensanches, y coordinación con notaría. 687 € fijos — frente a 5.550–9.250 € de comisión en un piso de 185.000 €.',
    situacionesTitulo: 'Situaciones habituales al vender en Asturias',
    situaciones: [
      {
        titulo: 'Piso en Oviedo Centro con derrama de fachada',
        desc: 'Comunidades del ensanche con obras pendientes. Revisamos actas de los últimos dos años antes de que firmes arras con tu comprador.',
      },
      {
        titulo: 'Venta en Gijón Cimadevilla entre particulares',
        desc: 'Edificio histórico con discrepancias catastro-registro. Describimos el inmueble con coherencia en contrato y nota simple.',
      },
      {
        titulo: 'Comprador con hipoteca en Kutxabank o Santander',
        desc: 'Plazos de 45–60 días habituales en Asturias. Redactamos arras con condición suspensiva de financiación para no perder la operación.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por zonas de Asturias',
    barriosIntro:
      'Oviedo, Gijón y Avilés no se venden igual: el checklist documental y los plazos de arras cambian según barrio y edificio:',
    barrios: [
      {
        nombre: 'Oviedo Centro y Ensanche',
        contexto: '1.900–2.600 €/m² — ITE frecuente en edificios de los 60–70',
        operativa: 'Verificación de inspección técnica, derramas de fachada y certificado de deudas de comunidad.',
      },
      {
        nombre: 'Gijón Cimadevilla y Centro',
        contexto: 'Centro histórico — discrepancias catastro-registro',
        operativa: 'Coherencia registral en arras y revisión de cargas antes de señal.',
      },
      {
        nombre: 'Avilés y Langreo',
        contexto: 'Ticket medio — operaciones directas sin agencia',
        operativa: 'Venta completa con documentación asturiana estándar y plazos realistas de hipoteca.',
      },
      {
        nombre: 'El Milán y Pumarín',
        contexto: 'Familias que venden para ampliar vivienda',
        operativa: 'Arras penitenciales claras y orientación sobre plusvalía municipal (Oviedo / Gijón).',
      },
      {
        nombre: 'Costa y Villaviciosa',
        contexto: 'Segunda residencia — compradores de Madrid o País Vasco',
        operativa: 'Gestoría 100 % online con notaría asturiana; IBI al corriente y cédula vigente.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en el Principado de Asturias',
    tramitesIntro: 'Documentación que suele exigir la notaría en Oviedo, Gijón o Avilés:',
    tramitesLocales: [
      'Cédula de habitabilidad vigente (Principado de Asturias)',
      'Certificado energético antes de compraventa',
      'ITE / IEE en edificios de más de 50 años del ensanche',
      'Plusvalía municipal (IIVTNU) — orientación según ayuntamiento',
      'Certificado de deudas de comunidad e IBI al corriente',
    ],
    pasosTitulo: 'Tu venta en Asturias paso a paso',
    pasos: [
      { titulo: 'Llamada en 24 h', desc: 'Barrio (Oviedo, Gijón, Avilés), precio pactado y estado de la documentación.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana frente a 5.550–9.250 € de comisión en piso de 185.000 €.' },
      { titulo: 'Arras y expediente', desc: 'Redacción de contratos y recopilación de certificados asturianos en el panel online.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría hasta que el comprador firme y cobres el precio.' },
    ],
  },

  santander: {
    gestoriaTitulo: 'Vender en Santander sin inmobiliaria — gestoría hasta escritura',
    gestoriaIntro:
      'Propietarios en Santander, El Sardinero, Camargo o Cueto que venden a un particular confían en Inmonest para arras, documentación cantábrica e ITE en edificios costeros. No captamos compradores ni cobramos comisión: 687 € fijos frente a 6.600–11.000 € de agencia en un piso de 220.000 €.',
    situacionesTitulo: 'Casos frecuentes al vender en Cantabria',
    situaciones: [
      {
        titulo: 'Piso en El Sardinero con ITE pendiente',
        desc: 'Edificios de los 70 en la costa con inspección vencida. Verificamos antes de arras para que el comprador no se eche atrás en notaría.',
      },
      {
        titulo: 'Venta estival con plazos de 48–72 h',
        desc: 'Compradores presionan en verano. Redactamos arras con plazos realistas y condición suspensiva de hipoteca.',
      },
      {
        titulo: 'Segunda residencia en Somo o costa',
        desc: 'Vendes un piso que usabas en verano. Revisamos IBI con el Ayuntamiento de Santander y distinción de uso habitual.',
      },
    ],
    barriosTitulo: 'Operativa de venta por zonas de Santander',
    barriosIntro:
      'Centro, Sardinero y área metropolitana tienen compradores y documentación distinta. Adaptamos arras y checklist:',
    barrios: [
      {
        nombre: 'Centro y Cuatro Caminos',
        contexto: '2.400–3.200 €/m² — profesionales y familias',
        operativa: 'Arras con revisión de comunidad, certificado energético e IBI municipal al día.',
      },
      {
        nombre: 'El Sardinero',
        contexto: '2.800–3.800 €/m² — edificios costeros antiguos',
        operativa: 'ITE obligatoria verificada antes de señal; arras con plazos para financiación.',
      },
      {
        nombre: 'Cueto y Peñacastillo',
        contexto: 'Residencial consolidado — operaciones entre particulares',
        operativa: 'Documentación cantábrica completa y orientación sobre plusvalía municipal.',
      },
      {
        nombre: 'Camargo y área metropolitana',
        contexto: '1.800–2.400 €/m² — compradores de Santander capital',
        operativa: 'Misma gestoría online con registro local y plazos de hipoteca realistas.',
      },
      {
        nombre: 'Somo y costa oriental',
        contexto: 'Segunda residencia — compradores nacionales',
        operativa: 'Contratos claros sobre financiación y plazo a notaría en municipio costero.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en Cantabria',
    tramitesIntro: 'Requisitos habituales en notaría santanderina:',
    tramitesLocales: [
      'Cédula de habitabilidad y certificado energético vigentes',
      'ITE en edificios antiguos del centro y El Sardinero',
      'IBI al corriente con el Ayuntamiento de Santander',
      'Certificado de deudas de comunidad y plusvalía municipal (IIVTNU)',
      'Nota simple registral sin cargas ocultas',
    ],
    pasosTitulo: 'Proceso de venta en Santander con Inmonest',
    pasos: [
      { titulo: 'Consulta inicial', desc: 'Zona (centro, Sardinero, Camargo), precio y perfil del comprador.' },
      { titulo: '687 € fijos', desc: 'Sin comisión del 3–5 % sobre 220.000 €.' },
      { titulo: 'Panel de gestoría', desc: 'Subes documentación; el gestor valida ITE, comunidad y cédula.' },
      { titulo: 'Escritura', desc: 'Expediente completo en notaría de Santander o área metropolitana.' },
    ],
  },

  vitoria: {
    gestoriaTitulo: 'Vender en Vitoria-Gasteiz con gestoría foral — sin comisión de agencia',
    gestoriaIntro:
      'Si ya tienes comprador en Vitoria-Gasteiz, Lakua, Zabalgana o el casco medieval, Inmonest redacta arras, verifica documentación foral vasca y coordina con notaría. Gestoría solo para el vendedor particular: 687 € fijos — frente a 7.200–12.000 € de comisión en un piso de 240.000 €.',
    situacionesTitulo: 'Escenarios típicos al vender en Álava',
    situaciones: [
      {
        titulo: 'Piso en Lakua con derrama en urbanización',
        desc: 'Comunidades de expansión urbana con obras pendientes. Revisamos actas y certificado de deudas antes de arras.',
      },
      {
        titulo: 'Venta en Ensanche con arras del comprador',
        desc: 'El comprador trae borrador desequilibrado. Redactamos arras penitenciales con plazos de 45–60 días y cláusula hipotecaria.',
      },
      {
        titulo: 'Edificio del casco medieval con ITE',
        desc: 'Inspección técnica pendiente en edificio antiguo. Detectamos el riesgo antes de comprometer señal con el comprador.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por barrios de Vitoria',
    barriosIntro:
      'Ensanche, Lakua y Zabalgana tienen perfiles de comprador y normativa distinta. Tu gestor adapta el expediente:',
    barrios: [
      {
        nombre: 'Ensanche',
        contexto: '2.400–3.100 €/m² — mercado estable, familias',
        operativa: 'Arras equilibradas, revisión de cargas registrales y fiscalidad foral vasca.',
      },
      {
        nombre: 'Lakua',
        contexto: '2.200–2.900 €/m² — urbanizaciones con derramas',
        operativa: 'Verificación de actas de comunidad y certificado de deudas antes de señal.',
      },
      {
        nombre: 'Zabalgana y Salburua',
        contexto: 'Expansión urbana — operaciones entre particulares',
        operativa: 'Documentación foral completa y plazos realistas para hipoteca del comprador.',
      },
      {
        nombre: 'Casco Medieval',
        contexto: 'Edificios antiguos — ITE habitual',
        operativa: 'Inspección técnica verificada; coherencia catastro-registro en contrato.',
      },
      {
        nombre: 'Armentia y periferia',
        contexto: 'Ticket medio — primer vivienda del comprador',
        operativa: 'Venta completa con orientación sobre plusvalía de Vitoria-Gasteiz.',
      },
    ],
    tramitesTitulo: 'Documentación de venta en Álava (País Vasco)',
    tramitesIntro: 'Trámites que exige una notaría en Vitoria-Gasteiz:',
    tramitesLocales: [
      'Nota simple registral actualizada',
      'Certificado de eficiencia energético vigente',
      'Cédula de habitabilidad y certificado de deudas de comunidad',
      'ITE en edificios antiguos del casco medieval',
      'Verificación de normativa foral vasca aplicable a la transmisión',
    ],
    pasosTitulo: 'Tu venta en Vitoria-Gasteiz paso a paso',
    pasos: [
      { titulo: 'Contratas online', desc: '687 € IVA incl. Gestor asignado en menos de 24 h.' },
      { titulo: 'Arras a tu favor', desc: 'Contratos redactados protegiendo tus intereses como vendedor en Álava.' },
      { titulo: 'Expediente foral', desc: 'Subes docs al panel; verificamos ITE, comunidad e IBI antes de notaría.' },
      { titulo: 'Firma y cobro', desc: 'Coordinación el día de escritura en notaría vitoriana.' },
    ],
  },

  'san-sebastian': {
    gestoriaTitulo: 'Vender en San Sebastián / Donostia sin agencia — gestoría premium',
    gestoriaIntro:
      'En Donostia el ticket es alto y un error documental cuesta mucho más que 687 €. Si ya tienes comprador en el Centro, Gros o Amara, Inmonest redacta arras, audita derramas en edificios señoriales y coordina con notaría. 687 € fijos — frente a 11.400–19.000 € de comisión en un piso de 380.000 €.',
    situacionesTitulo: 'Situaciones reales al vender en Donostia',
    situaciones: [
      {
        titulo: 'Piso en Gros con derrama de 12.000 €',
        desc: 'Comunidades del Ensanche con obras de fachada de alto importe. Revisamos actas recientes antes de que firmes arras.',
      },
      {
        titulo: 'Venta con señal alta y plazo de 15 días',
        desc: 'Vendedores en mercado premium presionan plazos cortos. Equilibramos cláusulas y condición suspensiva de hipoteca.',
      },
      {
        titulo: 'Piso reformado en Amara sin licencia',
        desc: 'Reformas integrales sin licencia municipal. Verificamos coherencia catastro-registro y documentación urbanística.',
      },
    ],
    barriosTitulo: 'Venta entre particulares por barrios de San Sebastián',
    barriosIntro:
      'Centro, Gros y Amara son mercados distintos dentro de Donostia. Adaptamos arras, plazos y due diligence documental:',
    barrios: [
      {
        nombre: 'Centro / Parte Vieja',
        contexto: '4.800–6.200 €/m² — mercado premium, derramas elevadas',
        operativa: 'Revisión exhaustiva de actas, ITE y cargas antes de señal alta.',
      },
      {
        nombre: 'Gros',
        contexto: '4.500–5.800 €/m² — alta demanda, plazos cortos',
        operativa: 'Arras con plazos realistas para financiación y cláusulas equilibradas.',
      },
      {
        nombre: 'Amara',
        contexto: '3.800–4.800 €/m² — residencial familiar',
        operativa: 'Verificación de reformas, licencias y certificado de deudas de comunidad.',
      },
      {
        nombre: 'Antiguo e Intxaurrondo',
        contexto: 'Operaciones entre particulares con hipoteca',
        operativa: 'Documentación foral gipuzkoana completa y orientación sobre plusvalía municipal.',
      },
      {
        nombre: 'Aiete y Egia',
        contexto: 'Profesionales y familias — ticket alto',
        operativa: 'Venta completa con seguimiento hasta notaría donostiarra.',
      },
    ],
    tramitesTitulo: 'Trámites de venta en Gipuzkoa (País Vasco)',
    tramitesIntro: 'Documentación crítica en un mercado de 350.000 €+ por piso:',
    tramitesLocales: [
      'Nota simple registral y actas de comunidad de los últimos 2 años',
      'Certificado energético e ITE en edificios del Ensanche donostiarra',
      'Cédula de habitabilidad y certificado de deudas de comunidad',
      'Coherencia catastro-registro en pisos reformados',
      'Plusvalía municipal de San Sebastián — orientación de cálculo',
    ],
    pasosTitulo: 'Proceso de venta en San Sebastián con Inmonest',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Barrio (Centro, Gros, Amara), precio pactado y urgencia del comprador.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana frente a 11.400–19.000 € de comisión de agencia.' },
      { titulo: 'Due diligence vendedor', desc: 'Auditoría documental antes de arras en mercado premium.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría hasta firma y cobro del precio.' },
    ],
  },
}

export function getVentaCompletaEnriquecimiento(slug: string): VentaCompletaEnriquecimiento | undefined {
  return VENTA_COMPLETA_ENRIQUECIMIENTO[slug] ?? VENTA_COMPLETA_ENRIQUECIMIENTO_CORE[slug]
}
