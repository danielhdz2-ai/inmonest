import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'

export type AsesoriaCompraEnriquecimiento = {
  beneficiosTitulo: string
  beneficiosIntro: string
  tramitesTitulo: string
  tramitesIntro: string
  tramitesLocales: string[]
  pasosTitulo: string
  pasos: { titulo: string; desc: string }[]
}

export const ASESORIA_COMPRA_ENRIQUECIMIENTO: Record<string, AsesoriaCompraEnriquecimiento> = {
  madrid: {
    beneficiosTitulo: 'Comprar en Madrid de particular sin comisión de agencia',
    beneficiosIntro:
      'En Madrid capital el 40 % de operaciones van con plazos inferiores a una semana. Sin gestor, firmas arras con cláusulas desequilibradas o sin revisar IEE en edificios del centro.',
    tramitesTitulo: 'Trámites de compra en Madrid que revisamos',
    tramitesIntro: 'Checklist adaptado a Comunidad de Madrid e ITE/IEE en edificios antiguos:',
    tramitesLocales: [
      'Depósito de fianza legal ante organismo autonómico madrileño',
      'IEE e ITE en edificios de más de 50 años en Chamberí o Centro',
      'Verificación de plusvalía municipal e IBI al día antes de escritura',
    ],
    pasosTitulo: 'Cómo compramos contigo en Madrid',
    pasos: [
      { titulo: 'Llamada en 24 h', desc: 'Analizamos barrio (Salamanca, Vallecas, metropolitanos), precio y urgencia del vendedor.' },
      { titulo: '687 € tarifa plana', desc: 'Sin % sobre un piso de 320.000 € — ahorro de 9.600–16.000 € vs agencia.' },
      { titulo: 'Reserva y arras', desc: 'Revisión de condición suspensiva de hipoteca y nota simple del Registro de Madrid.' },
      { titulo: 'Escritura en notaría', desc: 'Coordinación documental hasta firma — incluso si compras desde otra provincia.' },
    ],
  },
  barcelona: {
    beneficiosTitulo: 'Asesoría compra piso Barcelona — Generalitat e ITE',
    beneficiosIntro:
      'En Barcelona la cédula de habitabilidad y la ITE bloquean operaciones cada semana. Comprar de particular en Idealista sin revisión legal es el error más caro.',
    tramitesTitulo: 'Documentación obligatoria en Cataluña',
    tramitesIntro: 'Revisamos lo que muchos vendedores particulares no entregan:',
    tramitesLocales: [
      'Cédula de habitabilidad de la Generalitat — obligatoria en notaría',
      'ITE en edificios con certificación pendiente en Eixample o Gràcia',
      'Estatutos de comunidad y derramas en zonas tensionadas de alquiler',
    ],
    pasosTitulo: 'Proceso de compra en Barcelona',
    pasos: [
      { titulo: 'Consulta inicial', desc: 'Valoramos si compras para habitación propia o inversión en zona tensionada.' },
      { titulo: 'Contratación 687 €', desc: 'Tarifa fija frente a 10.500–17.500 € de comisión en piso de 350.000 €.' },
      { titulo: 'Arras con ITE', desc: 'Detectamos inspecciones pendientes antes de entregar señal en Sants o Eixample.' },
      { titulo: 'Hasta escritura', desc: 'Coordinación con notaría barcelonesa y verificación final de cargas.' },
    ],
  },
  valencia: {
    beneficiosTitulo: 'Compra de piso en Valencia con gestor valenciano',
    beneficiosIntro:
      'Ruzafa, Benimaclet y el centro mueven operaciones rápidas entre particulares. La cédula valenciana y las derramas de rehabilitación son los puntos críticos.',
    tramitesTitulo: 'Trámites en Comunitat Valenciana',
    tramitesIntro: 'Documentación que exige la Generalitat Valenciana:',
    tramitesLocales: [
      'Cédula de habitabilidad autonómica vigente',
      'Certificado energético y IEE en edificios antiguos de Ciutat Vella',
      'Deudas de comunidad y derramas de fachada en edificios costeros',
    ],
    pasosTitulo: 'Tu compra en Valencia paso a paso',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Analizamos barrio valenciano, precio de referencia y documentación del vendedor.' },
      { titulo: '687 € IVA incl.', desc: 'Sin comisión del 3-5 % sobre el precio del piso.' },
      { titulo: 'Revisión de arras', desc: 'Cláusulas sobre vivienda turística mal inscrita en Registro de Turisme.' },
      { titulo: 'Escritura', desc: 'Acompañamiento hasta notaría con gestor que conoce normativa valenciana.' },
    ],
  },
  sevilla: {
    beneficiosTitulo: 'Comprar piso de particular en Sevilla con seguridad',
    beneficiosIntro:
      'Triana, Nervión y Los Remedios concentran compraventa entre particulares. Plusvalía municipal e IBI deben revisarse antes de la señal.',
    tramitesTitulo: 'Trámites de compra en Sevilla',
    tramitesIntro: 'Adaptado al mercado andaluz y Ayuntamiento de Sevilla:',
    tramitesLocales: [
      'Plusvalía municipal (IIVTNU) — cálculo orientativo antes de firmar',
      'Certificado de deudas de comunidad en edificios históricos',
      'Cédula de habitabilidad y eficiencia energética andaluza',
    ],
    pasosTitulo: 'Proceso en Sevilla en 4 fases',
    pasos: [
      { titulo: 'Contacto 24 h', desc: 'Gestora Carmen analiza tu operación en capital o área metropolitana.' },
      { titulo: '687 € fijos', desc: 'Alternativa a comisión de agencia en mercado sevillano.' },
      { titulo: 'Arras y documentación', desc: 'Revisión registral y técnica en edificios del centro histórico.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría hasta entrega de llaves.' },
    ],
  },
  malaga: {
    beneficiosTitulo: 'Compra en Málaga y Costa del Sol sin agencia',
    beneficiosIntro:
      'Compradores internacionales y operaciones en máximos históricos exigen revisión de VFT, IEE y plusvalía antes de arras.',
    tramitesTitulo: 'Documentación en compraventa malagueña',
    tramitesIntro: 'Riesgos frecuentes en Costa del Sol:',
    tramitesLocales: [
      'Registro VFT si el piso tuvo uso turístico — Junta de Andalucía',
      'IEE obligatorio en edificios de +50 años para vender en Andalucía',
      'Derramas de rehabilitación en edificios del centro y litoral',
    ],
    pasosTitulo: 'Acompañamiento de compra en Málaga',
    pasos: [
      { titulo: 'Consulta inicial', desc: 'Evaluamos zona (centro, Teatinos, Costa del Sol) y perfil del vendedor.' },
      { titulo: '687 € plano', desc: 'Sin comisión sobre ticket de 300.000 € o más.' },
      { titulo: 'Due diligence lite', desc: 'Nota simple, cargas y documentación técnica antes de señal.' },
      { titulo: 'Escritura', desc: 'Gestora en Andalucía hasta firma notarial.' },
    ],
  },
  alicante: {
    beneficiosTitulo: 'Compra piso Alicante y Costa Blanca — gestoría fija',
    beneficiosIntro:
      'Playa de San Juan, centro y Elche: operaciones con compradores extranjeros donde la documentación técnica se omite con frecuencia.',
    tramitesTitulo: 'Trámites en provincia de Alicante',
    tramitesIntro: 'Revisión conforme Comunitat Valenciana:',
    tramitesLocales: [
      'Cédula de habitabilidad y certificado energético',
      'Situación de vivienda turística en anuncios de costa',
      'Deudas de comunidad en edificios de Playa de San Juan',
    ],
    pasosTitulo: 'Proceso de compra en Alicante',
    pasos: [
      { titulo: 'Llamada con gestor', desc: 'Barrio alicantino, plazos y financiación hipotecaria.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa fija para compradores de particular.' },
      { titulo: 'Revisión de arras', desc: 'Cláusulas y documentación del vendedor en Costa Blanca.' },
      { titulo: 'Escritura', desc: 'Coordinación hasta notaría en Alicante o Elche.' },
    ],
  },
  zaragoza: {
    beneficiosTitulo: 'Comprar de particular en Zaragoza — 687 €',
    beneficiosIntro:
      'Mercado aragonés con precios más accesibles pero mismos riesgos: arras mal redactadas, cargas ocultas y plazos de hipoteca incoherentes.',
    tramitesTitulo: 'Trámites de compra en Zaragoza',
    tramitesIntro: 'Checklist para capital y área metropolitana:',
    tramitesLocales: [
      'Nota simple del Registro de la Propiedad de Zaragoza',
      'Certificado de eficiencia energética e ITE si aplica',
      'IBI y deudas de comunidad en Delicias o Valdespartera',
    ],
    pasosTitulo: 'Cuatro pasos en Zaragoza',
    pasos: [
      { titulo: 'Análisis inicial', desc: 'Operación en centro, Actur o Valdespartera.' },
      { titulo: '687 € sin comisión', desc: 'Frente a miles de euros de agencia inmobiliaria.' },
      { titulo: 'Arras y docs', desc: 'Revisión de reserva y documentación técnica.' },
      { titulo: 'Escritura', desc: 'Seguimiento hasta firma en notaría zaragozana.' },
    ],
  },
  valladolid: {
    beneficiosTitulo: 'Asesoría compra piso Valladolid entre particulares',
    beneficiosIntro:
      'Mercado castellano estable: operaciones familiares donde la revisión de arras evita pleitos por plazos o cargas registrales.',
    tramitesTitulo: 'Documentación en Valladolid',
    tramitesIntro: 'Trámites habituales en capital castellana:',
    tramitesLocales: [
      'Cédula de habitabilidad y certificado energético',
      'Nota simple y cargas en compraventa de particulares',
      'Plusvalía municipal e IBI antes de escritura',
    ],
    pasosTitulo: 'Proceso en Valladolid',
    pasos: [
      { titulo: 'Consulta', desc: 'Análisis de operación en capital o área.' },
      { titulo: '687 € fijos', desc: 'Sin porcentaje sobre precio del inmueble.' },
      { titulo: 'Revisión legal', desc: 'Arras, reserva y documentación del vendedor.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría local.' },
    ],
  },
  mallorca: {
    beneficiosTitulo: 'Compra piso Mallorca — normativa balear',
    beneficiosIntro:
      'Palma y municipios costeros: restricciones de compra, vivienda turística y escasez de stock exigen due diligence antes de señal.',
    tramitesTitulo: 'Trámites en Islas Baleares',
    tramitesIntro: 'Documentación específica balear:',
    tramitesLocales: [
      'Depósito en IBAVI cuando corresponde por normativa de alquiler',
      'Situación de vivienda de uso turístico en el inmueble',
      'Cédula de habitabilidad y eficiencia energética balear',
    ],
    pasosTitulo: 'Compra en Mallorca con gestor',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Palma, Calvià o interior — perfil de operación.' },
      { titulo: '687 € plano', desc: 'Alternativa a comisión de agencia insular.' },
      { titulo: 'Revisión documental', desc: 'Cargas, derramas y licencias turísticas.' },
      { titulo: 'Escritura', desc: 'Acompañamiento hasta notaría en Baleares.' },
    ],
  },
  bilbao: {
    beneficiosTitulo: 'Compra piso Bilbao de particular — Bizkaia',
    beneficiosIntro:
      'Indautxu, Casco Viejo y Getxo: mercado con operaciones rápidas donde la nota simple y la fiscalidad foral merecen revisión profesional.',
    tramitesTitulo: 'Trámites de compra en Bizkaia',
    tramitesIntro: 'Adaptado a País Vasco:',
    tramitesLocales: [
      'Nota simple y cargas registrales',
      'Certificado energético e inspecciones en edificios protegidos',
      'Deudas de comunidad en edificios del Casco Viejo',
    ],
    pasosTitulo: 'Proceso en Bilbao',
    pasos: [
      { titulo: 'Consulta 24 h', desc: 'Barrio bilbaíno y condiciones del vendedor.' },
      { titulo: '687 € IVA incl.', desc: 'Sin comisión del 3-5 %.' },
      { titulo: 'Arras revisadas', desc: 'Plazos de hipoteca y cláusulas de arras penitenciales.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría en Gran Bilbao.' },
    ],
  },
  coruna: {
    beneficiosTitulo: 'Comprar piso en A Coruña sin comisión',
    beneficiosIntro:
      'Ensanche coruñés y Orzán: edificios de piedra con humedades ocultas y cargas que conviene detectar antes de entregar señal.',
    tramitesTitulo: 'Documentación en A Coruña',
    tramitesIntro: 'Checklist gallego:',
    tramitesLocales: [
      'Cédula de habitabilidad y certificado energético',
      'ITE en edificios antiguos del casco histórico',
      'Nota simple del Registro de A Coruña',
    ],
    pasosTitulo: 'Compra en A Coruña paso a paso',
    pasos: [
      { titulo: 'Llamada inicial', desc: 'Operación en Coruña, Ferrol o área.' },
      { titulo: '687 € fijos', desc: 'Gestoría sin porcentaje sobre el piso.' },
      { titulo: 'Revisión arras', desc: 'Documentación técnica y registral gallega.' },
      { titulo: 'Escritura', desc: 'Seguimiento hasta firma notarial.' },
    ],
  },
  murcia: {
    beneficiosTitulo: 'Asesoría compra piso Murcia — particulares',
    beneficiosIntro:
      'Mercado regional con operaciones ágiles: reserva y arras firmadas sin revisar deudas de comunidad o cédula autonómica.',
    tramitesTitulo: 'Trámites en Región de Murcia',
    tramitesIntro: 'Documentación habitual murciana:',
    tramitesLocales: [
      'Cédula de habitabilidad regional',
      'Certificado energético e IBI al día',
      'Deudas de comunidad en edificios del centro y pedanías',
    ],
    pasosTitulo: 'Proceso en Murcia',
    pasos: [
      { titulo: 'Consulta', desc: 'Capital murciana o área metropolitana.' },
      { titulo: '687 € plano', desc: 'Sin comisión de agencia.' },
      { titulo: 'Revisión legal', desc: 'Arras, reserva y nota simple.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría murciana.' },
    ],
  },
  salamanca: {
    beneficiosTitulo: 'Comprar en Salamanca de particular — casco y universidad',
    beneficiosIntro:
      'Salamanca mezcla casco histórico protegido y demanda de alquiler estudiantil. Comprar sin revisar licencias o ITE en el centro puede bloquear la operación.',
    tramitesTitulo: 'Trámites de compra en Salamanca',
    tramitesIntro: 'Checklist castellanoleonés antes de arras:',
    tramitesLocales: [
      'ITE en edificios antiguos del centro',
      'Cédula de habitabilidad vigente',
      'Nota simple y deudas de comunidad',
    ],
    pasosTitulo: 'Tu compra en Salamanca',
    pasos: [
      { titulo: 'Consulta', desc: 'Barrio, precio y documentación del vendedor.' },
      { titulo: '687 € fijos', desc: 'Sin comisión sobre el precio del piso.' },
      { titulo: 'Revisión legal', desc: 'Arras, registral y técnica.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría salmantina.' },
    ],
  },
  granada: {
    beneficiosTitulo: 'Asesoría compra piso Granada — particular sin agencia',
    beneficiosIntro:
      'Granada concentra operaciones directas en Realejo, Zaidín y Albaicín. La cédula andaluza y las obras sin licencia son los riesgos más frecuentes.',
    tramitesTitulo: 'Trámites de compra en Granada',
    tramitesIntro: 'Documentación andaluza que revisamos:',
    tramitesLocales: [
      'Cédula de habitabilidad andaluza',
      'Certificado energético e ITE si aplica',
      'Uso turístico vs habitual en comunidad',
    ],
    pasosTitulo: 'Proceso en Granada',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Análisis de barrio y urgencia del vendedor.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana frente a comisión de agencia.' },
      { titulo: 'Arras equilibradas', desc: 'Plazos realistas para hipoteca.' },
      { titulo: 'Hasta escritura', desc: 'Gestor asignado en notaría granadina.' },
    ],
  },
  pamplona: {
    beneficiosTitulo: 'Compra piso Pamplona de particular — Navarra',
    beneficiosIntro:
      'Ensanche e Iturrama: mercado estable con demanda residencial alta. Revisar arras y documentación foral antes de señal.',
    tramitesTitulo: 'Trámites de compra en Navarra',
    tramitesIntro: 'Adaptado a normativa navarra:',
    tramitesLocales: [
      'Cédula de habitabilidad y certificado energético',
      'Nota simple del Registro de Pamplona',
      'Deudas de comunidad e IBI municipal',
    ],
    pasosTitulo: 'Proceso en Pamplona',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Análisis de operación en capital navarra.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa fija sin comisión.' },
      { titulo: 'Revisión de contratos', desc: 'Reserva, arras y documentación del vendedor.' },
      { titulo: 'Escritura', desc: 'Acompañamiento hasta notaría.' },
    ],
  },

  asturias: {
    beneficiosTitulo: 'Comprar piso en Asturias de particular — Oviedo y Gijón',
    beneficiosIntro:
      'Oviedo Centro y Gijón Cimadevilla concentran operaciones directas entre comprador y vendedor. Sin revisión, heredas derramas en ensanches del 60–70 o arras con plazos imposibles para la hipoteca. ITP del 8 % en el Principado.',
    tramitesTitulo: 'Trámites de compra en el Principado de Asturias',
    tramitesIntro: 'Checklist asturiano antes de entregar señal:',
    tramitesLocales: [
      'ITE / IEE en edificios de más de 50 años del ensanche ovieense y gijonés',
      'Certificado de deudas de comunidad — derramas de fachada frecuentes',
      'Cédula de habitabilidad y certificado energético vigentes',
      'Nota simple registral y coherencia catastro-registro',
      'IBI al corriente en Oviedo, Gijón o Avilés',
    ],
    pasosTitulo: 'Cómo compramos contigo en Asturias',
    pasos: [
      { titulo: 'Llamada en 24 h', desc: 'Barrio (Oviedo Centro, Cimadevilla, Avilés), precio y documentación del vendedor.' },
      { titulo: '687 € tarifa plana', desc: 'Sin % sobre un piso de 185.000 € — ahorro de 5.550–9.250 € vs agencia.' },
      { titulo: 'Reserva y arras', desc: 'Cláusula suspensiva de hipoteca y plazos de 45–60 días adaptados a banca asturiana.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría en Oviedo, Gijón o Avilés — incluso si compras desde otra provincia.' },
    ],
  },

  santander: {
    beneficiosTitulo: 'Asesoría compra piso Santander — Cantabria y costa',
    beneficiosIntro:
      'Santander mezcla mercado residencial y costero. En verano es habitual comprar sin agencia con plazos de 48–72 h y arras del vendedor sin revisar ITE en El Sardinero. ITP del 8 % en Cantabria.',
    tramitesTitulo: 'Documentación obligatoria en Cantabria',
    tramitesIntro: 'Riesgos frecuentes en compraventa santanderina:',
    tramitesLocales: [
      'ITE en edificios antiguos del centro y El Sardinero',
      'IBI al corriente con el Ayuntamiento de Santander',
      'Certificado de deudas de comunidad y cédula de habitabilidad',
      'Nota simple del Registro sin cargas ocultas',
      'Arras con plazos realistas para concesión hipotecaria',
    ],
    pasosTitulo: 'Proceso de compra en Santander',
    pasos: [
      { titulo: 'Consulta inicial', desc: 'Zona (centro, Sardinero, Camargo), precio y urgencia del vendedor.' },
      { titulo: '687 € plano', desc: 'Frente a 6.600–11.000 € de comisión en piso de 220.000 €.' },
      { titulo: 'Arras con ITE', desc: 'Detectamos inspecciones pendientes en edificios costeros antes de la señal.' },
      { titulo: 'Hasta escritura', desc: 'Gestor asignado y seguimiento WhatsApp hasta notaría cantábrica.' },
    ],
  },

  vitoria: {
    beneficiosTitulo: 'Compra piso Vitoria-Gasteiz de particular — normativa foral vasca',
    beneficiosIntro:
      'Ensanche, Lakua y Zabalgana mueven operaciones familiares entre particulares. Vitoria exige coherencia documental antes de notaría: cargas registrales, ITE en casco medieval y arras desequilibradas son los errores más caros. ITP del 7 % en Álava.',
    tramitesTitulo: 'Trámites de compra en Álava (País Vasco)',
    tramitesIntro: 'Documentación foral que revisamos antes de arras:',
    tramitesLocales: [
      'Nota simple registral y verificación de cargas pendientes',
      'ITE en edificios antiguos del casco medieval de Vitoria',
      'Certificado de deudas de comunidad — derramas en urbanizaciones de Lakua',
      'Cédula de habitabilidad y certificado energético',
      'Normativa foral vasca aplicable a la transmisión',
    ],
    pasosTitulo: 'Tu compra en Vitoria-Gasteiz paso a paso',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Análisis de barrio (Ensanche, Lakua, Zabalgana) y condiciones del vendedor.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa fija frente a 7.200–12.000 € de comisión en piso de 240.000 €.' },
      { titulo: 'Revisión de arras', desc: 'Plazos de 45–60 días y cláusula suspensiva de financiación.' },
      { titulo: 'Escritura', desc: 'Acompañamiento hasta notaría vitoriana con gestor que conoce normativa foral.' },
    ],
  },

  'san-sebastian': {
    beneficiosTitulo: 'Asesoría compra piso San Sebastián — mercado premium Donostia',
    beneficiosIntro:
      'Donostia es uno de los mercados más caros del norte (4.500–6.000 €/m² en Centro y Gros). Un error documental puede costar decenas de miles. Comprar de particular sin due diligence previa a la señal es el riesgo más grave. ITP del 7 % en Gipuzkoa.',
    tramitesTitulo: 'Due diligence de compra en Gipuzkoa',
    tramitesIntro: 'Checklist obligatorio en operaciones de 350.000 €+:',
    tramitesLocales: [
      'Actas de comunidad de los últimos 2 años — derramas señoriales elevadas',
      'ITE en edificios del Ensanche donostiarra',
      'Coherencia catastro-registro en pisos reformados (Amara, Gros)',
      'Nota simple registral y certificado de deudas de comunidad',
      'Arras equilibradas — plazos y señal proporcionados al ticket',
    ],
    pasosTitulo: 'Proceso de compra en San Sebastián',
    pasos: [
      { titulo: 'Contacto 24 h', desc: 'Barrio (Centro, Gros, Amara), precio de referencia y documentación disponible.' },
      { titulo: '687 € fijos', desc: 'Sin comisión del 3–5 % sobre 380.000 € — ahorro de 11.400–19.000 €.' },
      { titulo: 'Informe pre-arras', desc: 'Hallazgos documentales por escrito antes de entregar señal alta.' },
      { titulo: 'Escritura', desc: 'Coordinación con notaría donostiarra hasta firma y entrega de llaves.' },
    ],
  },
}

/** FAQ base reescrita por ciudad — evita respuestas idénticas en schema.org */
export const ASESORIA_FAQ_BASE_POR_CIUDAD: Record<string, DueDiligenceFaqItem[]> = {
  madrid: [
    { q: '¿Qué incluye la asesoría de compra en Madrid?', a: 'Gestor asignado, revisión de reserva y arras, nota simple del Registro de Madrid, verificación de IEE/ITE en edificios antiguos, coordinación con notaría y seguimiento WhatsApp hasta escritura.' },
    { q: '¿Puedo comprar en Idealista sin pagar comisión?', a: 'Sí, si el anuncio es de particular. Inmonest cubre la parte legal por 687 €: tú negocias el precio; nosotros revisamos contratos y documentación madrileña.' },
    { q: '¿Trabajáis con hipotecas de cualquier banco en Madrid?', a: 'Sí. Incluimos cláusula suspensiva de financiación en arras para operaciones en Getafe, Chamberí o metropolitanos donde la hipoteca tarda semanas.' },
    { q: '¿Conocéis la normativa de la Comunidad de Madrid?', a: 'Sí: depósito de fianza autonómico, IEE en edificios de +50 años, documentación exigible en notaría madrileña y plazos típicos del mercado capitalino.' },
    { q: '¿Cuándo contratar en una operación rápida de Madrid?', a: 'Antes de entregar señal. En Madrid muchas operaciones cierran en 48-72 h — una revisión express evita cláusulas irreversibles.' },
    { q: '¿Qué pasa si hay cargas en la nota simple?', a: 'Informe claro: renegociar precio, exigir cancelación de carga antes de escritura o desistir con arras recuperables si procede.' },
  ],
  barcelona: [
    { q: '¿Qué incluye la asesoría de compra en Barcelona?', a: 'Revisión de reserva y arras, cédula de la Generalitat, ITE pendiente, nota simple, deudas de comunidad y coordinación con notaría barcelonesa hasta escritura.' },
    { q: '¿Puedo comprar de particular en Barcelona sin agencia?', a: 'Sí. Negocias directo con el vendedor; nosotros revisamos la parte legal por 687 € fijos en lugar del 3-5 % de comisión.' },
    { q: '¿La ITE puede bloquear mi compra en Barcelona?', a: 'Sí. Si el edificio del Eixample tiene ITE vencida, notaría puede parar la operación. Lo verificamos antes de que entregues señal.' },
    { q: '¿Conocéis la normativa catalana?', a: 'Sí: cédula de habitabilidad, límites de renta en zona tensionada si compras para alquilar, estatutos de comunidad y requisitos de la Generalitat.' },
    { q: '¿Cuándo debo contratar en Barcelona?', a: 'Idealmente antes de firmar reserva. Si el vendedor presiona con plazo de 24 h, priorizamos revisión express del borrador.' },
    { q: '¿Qué hacéis si detectáis derramas ocultas?', a: 'Informe con importe de derrama, opciones de renegociación de precio o condición en arras para que el vendedor liquide antes de escritura.' },
  ],
  valencia: [
    { q: '¿Qué incluye la asesoría de compra en Valencia?', a: 'Gestor asignado, revisión de arras, cédula valenciana, certificado energético, nota simple, deudas de comunidad y acompañamiento hasta escritura en notaría valenciana.' },
    { q: '¿Comprar de particular en Valencia es seguro?', a: 'Sí con revisión previa. Muchos compradores encuentran piso en portales y contactan directo — cubrimos la capa legal que la agencia haría sin cobrar %.' },
    { q: '¿Revisáis vivienda turística mal declarada?', a: 'Sí. En Valencia capital detectamos inscripciones en Registro de Turisme que afectan al uso del inmueble y a la operación.' },
    { q: '¿Conocéis la normativa valenciana?', a: 'Sí: cédula de habitabilidad de la Generalitat, IEE en edificios antiguos de Ciutat Vella y derramas de rehabilitación de fachada.' },
    { q: '¿Cuándo contratar en Valencia?', a: 'Antes de reserva o inmediatamente después. En Ruzafa y Benimaclet las operaciones van rápido.' },
    { q: '¿Qué pasa con derramas de comunidad?', a: 'Verificamos certificado de deudas; si hay derrama pendiente de 5.000 € o más, renegociamos o condicionamos la compra.' },
  ],
  asturias: [
    { q: '¿Qué incluye la asesoría de compra en Asturias?', a: 'Gestor asignado en Oviedo, Gijón o Avilés, revisión de reserva y arras, nota simple, ITE en ensanches, deudas de comunidad y coordinación con notaría asturiana hasta escritura.' },
    { q: '¿Puedo comprar de particular en Oviedo sin agencia?', a: 'Sí. Inmonest cubre la parte legal por 687 € fijos — frente a 5.550–9.250 € de comisión (3–5 %) en un piso de 185.000 € en el Principado.' },
    { q: '¿Revisáis derramas en edificios del ensanche?', a: 'Sí. Comunidades de los 60–70 en Oviedo y Gijón suelen tener obras de fachada pendientes. Verificamos actas antes de que entregues señal.' },
    { q: '¿Conocéis la normativa asturiana?', a: 'Sí: ITP del 8 % en Asturias, cédula de habitabilidad del Principado, ITE en edificios antiguos e IBI al corriente en Oviedo, Gijón o Avilés.' },
    { q: '¿Trabajáis con hipotecas de Kutxabank o Santander en Asturias?', a: 'Sí. Redactamos o revisamos arras con plazos de 45–60 días y cláusula suspensiva de financiación adaptados a la banca asturiana.' },
    { q: '¿Cuándo contratar en Asturias?', a: 'Antes de firmar arras. En operaciones entre particulares en Gijón y Oviedo es habitual que el vendedor presione con plazos de 10–15 días.' },
  ],
  santander: [
    { q: '¿Qué incluye la asesoría de compra en Santander?', a: 'Gestor asignado, revisión de arras, ITE en edificios costeros, nota simple, cédula cantábrica, deudas de comunidad y acompañamiento hasta escritura en notaría de Santander.' },
    { q: '¿Comprar de particular en El Sardinero es seguro?', a: 'Sí con revisión previa. Edificios de los 70 en la costa suelen tener ITE pendiente que el anuncio no menciona — lo verificamos antes de la señal.' },
    { q: '¿Revisáis arras con plazos veraniegos de 48–72 h?', a: 'Sí. En verano es frecuente en Santander. Equilibramos plazos y añadimos condición suspensiva de hipoteca para proteger al comprador.' },
    { q: '¿Conocéis la normativa cantábrica?', a: 'Sí: ITP del 8 % en Cantabria, IBI con el Ayuntamiento de Santander, cédula de habitabilidad y documentación técnica costera.' },
    { q: '¿Operáis en Camargo y área metropolitana?', a: 'Sí. Santander capital, El Sardinero, Cueto, Camargo y Somo con el mismo servicio online y gestor asignado.' },
    { q: '¿Qué pasa si hay ITE desfavorable?', a: 'Informe claro con importe de obras obligatorias; opciones de renegociar precio, condicionar la compra o desistir con arras recuperables si procede.' },
  ],
  vitoria: [
    { q: '¿Qué incluye la asesoría de compra en Vitoria-Gasteiz?', a: 'Gestor asignado, revisión de reserva y arras, nota simple, ITE en casco medieval, deudas de comunidad en Lakua y coordinación con notaría vitoriana hasta escritura.' },
    { q: '¿Puedo comprar de particular en Vitoria sin agencia?', a: 'Sí. 687 € fijos frente a 7.200–12.000 € de comisión en un piso de 240.000 € en el Ensanche o Zabalgana.' },
    { q: '¿Revisáis normativa foral vasca?', a: 'Sí. Verificamos documentación adaptada a Álava: cargas registrales, fiscalidad foral (ITP 7 %) y requisitos urbanísticos antes de arras.' },
    { q: '¿Qué pasa con cargas registrales pendientes?', a: 'Detectamos hipotecas o usufructos en nota simple; exigimos cancelación antes de escritura o cláusula suspensiva con plazo realista.' },
    { q: '¿Trabajáis con hipotecas en Vitoria?', a: 'Sí. Arras con plazos de 45–60 días y cláusula suspensiva de financiación — habitual en operaciones familiares entre particulares en Álava.' },
    { q: '¿Cuándo contratar en Vitoria-Gasteiz?', a: 'Antes de entregar señal. El mercado es estable pero las arras del vendedor suelen venir desequilibradas si no las revisa un gestor.' },
  ],
  'san-sebastian': [
    { q: '¿Qué incluye la asesoría de compra en San Sebastián?', a: 'Gestor asignado en Donostia, due diligence documental completa, revisión de arras premium, actas de comunidad, ITE del Ensanche y coordinación con notaría gipuzkoana hasta escritura.' },
    { q: '¿Comprar de particular en Gros sin agencia es seguro?', a: 'Solo con revisión previa. En Donostia un error documental puede costar 10.000 € o más — 687 € de gestoría frente a 11.400–19.000 € de comisión de agencia.' },
    { q: '¿Revisáis derramas en edificios señoriales?', a: 'Sí. Comunidades del Ensanche donostiarra con obras de fachada de alto importe. Analizamos actas de los últimos 2 años antes de la señal.' },
    { q: '¿Conocéis la normativa de Gipuzkoa?', a: 'Sí: ITP del 7 % en País Vasco, plusvalía municipal de San Sebastián, cédula de habitabilidad y coherencia catastro-registro en pisos reformados.' },
    { q: '¿Qué pasa con arras de señal alta y plazo de 15 días?', a: 'Equilibramos cláusulas, señal proporcionada al ticket y plazos realistas para aprobación hipotecaria en mercado premium.' },
    { q: '¿Cuándo contratar en Donostia?', a: 'Antes de entregar señal. En operaciones de 350.000 €+ la due diligence previa no es opcional — es la diferencia entre comprar seguro o heredar un problema caro.' },
  ],
}

export function getAsesoriaCompraEnriquecimiento(slug: string): AsesoriaCompraEnriquecimiento | null {
  return ASESORIA_COMPRA_ENRIQUECIMIENTO[slug] ?? null
}

export function getAsesoriaFaqBasePorCiudad(slug: string, nombre: string, region: string, precioEjemplo: number): DueDiligenceFaqItem[] {
  const especifico = ASESORIA_FAQ_BASE_POR_CIUDAD[slug]
  if (especifico) return especifico

  const comisionMin = Math.round(precioEjemplo * 0.03)
  const comisionMax = Math.round(precioEjemplo * 0.05)

  return [
    {
      q: `¿Qué incluye la asesoría de compra en ${nombre}?`,
      a: `Gestor asignado en ${nombre}, revisión de reserva y arras, nota simple registral, verificación de cédula y certificado energético exigidos en ${region}, coordinación con notaría y seguimiento hasta escritura.`,
    },
    {
      q: `¿Puedo comprar de particular en ${nombre} sin agencia?`,
      a: `Sí. Inmonest no es agencia: 687 € fijos frente a ${comisionMin.toLocaleString('es-ES')}–${comisionMax.toLocaleString('es-ES')} € de comisión (3-5 %) en un piso de ${precioEjemplo.toLocaleString('es-ES')} € en ${nombre}.`,
    },
    {
      q: `¿Trabajáis con hipotecas en ${nombre}?`,
      a: `Sí. Revisamos plazos de arras para que encajen con la aprobación hipotecaria — habitual en operaciones entre particulares en ${nombre}.`,
    },
    {
      q: `¿Conocéis la normativa de ${region}?`,
      a: `Sí. Revisamos documentación exigida en ${nombre}: cédula de habitabilidad, certificado energético, inspecciones técnicas y requisitos autonómicos de ${region}.`,
    },
    {
      q: `¿Cuándo contratar en ${nombre}?`,
      a: `Antes de firmar reserva o justo después. Cuanto antes revisemos en ${nombre}, más margen para renegociar o desistir sin pérdidas.`,
    },
    {
      q: `¿Qué pasa si hay problemas en la documentación en ${nombre}?`,
      a: `Informe claro con opciones: renegociar condiciones, cancelar la compra y recuperar arras si procede, o continuar asumiendo el riesgo con pleno conocimiento.`,
    },
  ]
}
