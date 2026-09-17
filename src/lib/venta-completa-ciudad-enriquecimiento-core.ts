import type { VentaCompletaEnriquecimiento } from './venta-completa-ciudad-enriquecimiento'

/** Contenido SEO local para ciudades “core” de venta completa (687 €). */
export const VENTA_COMPLETA_ENRIQUECIMIENTO_CORE: Record<string, VentaCompletaEnriquecimiento> = {
  madrid: {
    gestoriaTitulo: 'Gestoría inmobiliaria para vender en Madrid sin comisión de agencia',
    gestoriaIntro:
      'Inmonest es gestoría online para particulares: no publicamos tu piso ni cobramos % sobre la venta. Cuando ya tienes comprador en Madrid o área metropolitana, tu gestor redacta reserva y arras, ordena documentación madrileña (IEE, cédula, comunidad) y coordina notaría por 687 € fijos.',
    situacionesTitulo: 'Situaciones habituales de vendedores en Madrid',
    situaciones: [
      { titulo: 'Comprador con hipoteca en 30 días', desc: 'Plazos imposibles en Chamberí o Vallecas. Arras con cláusula suspensiva y calendario realista con el banco del comprador.' },
      { titulo: 'Piso con inquilino LAU previo', desc: 'Vendes ocupado o con renta en curso. Revisamos contrato de arrendamiento, fianza depositada y comunicación al comprador.' },
      { titulo: 'Herencia con varios titulares', desc: 'Varios herederos en registro. Coordinamos documentación y firma alineada antes de ir a notaría en Madrid.' },
    ],
    barriosTitulo: 'Venta entre particulares por zonas de Madrid',
    barriosIntro: 'Cada distrito exige checklist y plazos distintos. Trabajamos con barrio concreto, no plantillas genéricas:',
    barrios: [
      { nombre: 'Salamanca y Chamberí', contexto: 'Edificios señoriales, IEE frecuente', operativa: 'ITE/IEE y derramas de rehabilitación verificadas antes de arras.' },
      { nombre: 'Carabanchel y Vallecas', contexto: 'Operaciones rápidas entre particulares', operativa: 'Panel de gestoría: subes docs y sigues el expediente con tu gestor.' },
      { nombre: 'Moncloa y Tetuán', contexto: 'Familias que venden para ampliar', operativa: 'Venta completa con orientación plusvalía e IBI al corriente.' },
      { nombre: 'Móstoles, Getafe, Leganés', contexto: 'Área metropolitana', operativa: 'Misma gestoría online con notaría del municipio del inmueble.' },
      { nombre: 'Centro (Sol, Malasaña)', contexto: 'Alta rotación, compradores jóvenes', operativa: 'Arras penitenciales equilibradas y certificado energético al día.' },
    ],
    tramitesTitulo: 'Trámites de venta en Comunidad de Madrid',
    tramitesIntro: 'Documentación que revisamos antes de escritura:',
    tramitesLocales: ['IEE/ITE en edificios +50 años', 'Cédula de habitabilidad', 'Certificado energético', 'Nota simple sin cargas', 'Plusvalía municipal (orientación)'],
    pasosTitulo: 'Cómo vendes con Inmonest en Madrid',
    pasos: [
      { titulo: 'Consulta en 24 h', desc: 'Precio pactado, barrio y urgencia del comprador.' },
      { titulo: '687 € tarifa plana', desc: 'Sin comisión sobre 320.000 € o más.' },
      { titulo: 'Panel + gestor', desc: 'Seguimiento online hasta notaría madrileña.' },
      { titulo: 'Escritura', desc: 'Expediente completo el día de firma.' },
    ],
  },

  barcelona: {
    gestoriaTitulo: 'Vender en Barcelona entre particulares con gestoría, no con agencia',
    gestoriaIntro:
      'Vendes por tu cuenta pero no quieres firmar arras a ciegas. Somos gestoría inmobiliaria: redactamos contratos, verificamos cédula de la Generalitat, ITE y deudas de comunidad, y te acompañamos hasta escritura por 687 €.',
    situacionesTitulo: 'Situaciones habituales en Barcelona',
    situaciones: [
      { titulo: 'ITE vencida en Eixample', desc: 'El comprador pide hipoteca y el banco bloquea. Anticipamos inspección y negociación con el comprador.' },
      { titulo: 'Piso con licencia turística', desc: 'Distinción uso turístico vs habitual en comunidad y registro antes de cerrar precio.' },
      { titulo: 'Vendedor en el extranjero', desc: 'Propietario no residente: gestoría 100 % online y firma en notaría barcelonesa.' },
    ],
    barriosTitulo: 'Ventas por barrios de Barcelona',
    barriosIntro: 'Adaptamos arras y documentación al mercado local:',
    barrios: [
      { nombre: 'Eixample y Gràcia', contexto: 'Edificios modernistas', operativa: 'Revisión ITE, obras en fachada y actas de comunidad.' },
      { nombre: 'Poblenou y Sant Martí', contexto: 'Reformas y discrepancias catastro', operativa: 'Coherencia registro-catastro antes de arras.' },
      { nombre: 'Sants y Les Corts', contexto: 'Familias y operaciones rápidas', operativa: 'Plazos realistas para hipoteca del comprador.' },
      { nombre: 'Ciutat Vella', contexto: 'Protección patrimonial', operativa: 'Licencias de obra y cédula de habitabilidad catalana.' },
      { nombre: 'L’Hospitalet y Badalona', contexto: 'Área metropolitana', operativa: 'Mismo servicio con registro del municipio correspondiente.' },
    ],
    tramitesTitulo: 'Trámites de venta en Cataluña',
    tramitesIntro: 'Requisitos habituales en notaría barcelonesa:',
    tramitesLocales: ['Cédula de habitabilidad Generalitat', 'Certificado energético', 'ITE si aplica', 'Certificado de deudas de comunidad', 'IBI y plusvalía municipal'],
    pasosTitulo: 'Proceso de venta en Barcelona',
    pasos: [
      { titulo: 'Primera llamada', desc: 'Barrio, precio y documentación disponible.' },
      { titulo: '687 € fijos', desc: 'Frente a miles en comisión de inmobiliaria.' },
      { titulo: 'Contratos + docs', desc: 'Gestor asignado por WhatsApp y panel privado.' },
      { titulo: 'Notaría', desc: 'Coordinación hasta escritura pública.' },
    ],
  },

  valencia: {
    gestoriaTitulo: 'Gestoría para vendedores particulares en Valencia',
    gestoriaIntro:
      'Ya tienes comprador en Ruzafa, Benimaclet o la costa. Inmonest no es portal: somos gestoría. Preparamos arras, cédula valenciana, revisión de cargas y expediente para notaría — 687 € sin % sobre el precio.',
    situacionesTitulo: 'Situaciones habituales en Valencia',
    situaciones: [
      { titulo: 'Comprador presiona en 72 h', desc: 'Negociamos plazo para revisar comunidad y cédula antes de la señal.' },
      { titulo: 'Derrama de fachada aprobada', desc: 'Detectamos cuotas pendientes en actas antes de firmar arras.' },
      { titulo: 'Vivienda con alquiler previo', desc: 'Estado del contrato LAU y fianza depositada comunicados al comprador.' },
    ],
    barriosTitulo: 'Venta entre particulares por zonas de Valencia',
    barriosIntro: 'Cada barrio tiene ritmo y documentación distinta:',
    barrios: [
      { nombre: 'Ruzafa y Ciutat Vella', contexto: 'Alta demanda, plazos cortos', operativa: 'Arras con condición de hipoteca y revisión turística si aplica.' },
      { nombre: 'Benimaclet y Algirós', contexto: 'Reformas sin licencia', operativa: 'Cruce cédula, catastro y realidad del inmueble.' },
      { nombre: 'Campanar y Patraix', contexto: 'Familias que venden', operativa: 'Venta completa con checklist valenciano completo.' },
      { nombre: 'Mislata y Paterna', contexto: 'Área metropolitana', operativa: 'Coordinación notarial en municipio del piso.' },
      { nombre: 'Litoral (Malvarrosa)', contexto: 'Segunda residencia', operativa: 'Documentación costera y comunidades con obras marítimas.' },
    ],
    tramitesTitulo: 'Trámites de venta en Comunitat Valenciana',
    tramitesIntro: 'Lo que exige la Generalitat y el ayuntamiento:',
    tramitesLocales: ['Cédula de habitabilidad', 'CEE vigente', 'Registro de Turisme si hubo uso turístico', 'Nota simple', 'IBI al día'],
    pasosTitulo: 'Tu venta en Valencia con Inmonest',
    pasos: [
      { titulo: 'Análisis inicial', desc: 'Barrio valenciano y perfil del comprador.' },
      { titulo: '687 € IVA incl.', desc: 'Tarifa plana de gestoría inmobiliaria.' },
      { titulo: 'Expediente online', desc: 'Panel para subir documentos y hablar con tu gestor.' },
      { titulo: 'Escritura', desc: 'Acompañamiento hasta firma en notaría.' },
    ],
  },

  sevilla: {
    gestoriaTitulo: 'Vender en Sevilla sin agencia — gestoría hasta escritura',
    gestoriaIntro:
      'Triana, Nervión o Los Remedios: muchas ventas van de particular a particular. Te ayudamos con arras, plusvalía municipal, documentación andaluza y notaría por 687 €. Sin comisión del 3-5 %.',
    situacionesTitulo: 'Situaciones habituales en Sevilla',
    situaciones: [
      { titulo: 'Operación en Semana Santa / feria', desc: 'Plazos especiales: calendario realista con notaría sevillana.' },
      { titulo: 'Piso en casco histórico', desc: 'Protección patrimonial y licencias de obra revisadas antes de arras.' },
      { titulo: 'Varios compradores (pareja + aval)', desc: 'Partes identificadas y arras con todos los intervinientes.' },
    ],
    barriosTitulo: 'Ventas por barrios de Sevilla',
    barriosIntro: 'Operativa adaptada al mercado sevillano:',
    barrios: [
      { nombre: 'Triana y Macarena', contexto: 'Casco y edificios antiguos', operativa: 'Comunidad, ITE y cédula andaluza.' },
      { nombre: 'Nervión y Los Remedios', contexto: 'Familias, operaciones ágiles', operativa: 'Arras penitenciales claras y panel de seguimiento.' },
      { nombre: 'Sevilla Este', contexto: 'Urbanizaciones años 2000', operativa: 'Derramas de fachada y piscina comunitaria.' },
      { nombre: 'Heliópolis y Bellavista', contexto: 'Compradores jóvenes', operativa: 'Condición suspensiva de hipoteca del comprador.' },
    ],
    tramitesTitulo: 'Trámites de venta en Sevilla',
    tramitesIntro: 'Checklist antes de ir a notaría:',
    tramitesLocales: ['Cédula de habitabilidad andaluza', 'Certificado energético', 'Plusvalía (IIVTNU)', 'Certificado de deudas de comunidad', 'Nota simple'],
    pasosTitulo: 'Proceso en Sevilla',
    pasos: [
      { titulo: 'Consulta', desc: 'Zona, precio y documentación.' },
      { titulo: '687 €', desc: 'Gestoría fija vs comisión de agencia.' },
      { titulo: 'Gestor + panel', desc: 'Trabajo online con seguimiento real.' },
      { titulo: 'Escritura', desc: 'Expediente listo en notaría sevillana.' },
    ],
  },

  malaga: {
    gestoriaTitulo: 'Gestoría inmobiliaria para vender en Málaga sin comisión',
    gestoriaIntro:
      'Costa, centro o Ronda: si ya tienes comprador particular, Inmonest redacta contratos, verifica documentación andaluza y te acompaña hasta escritura. 687 € — somos gestoría online con gestor asignado, no inmobiliaria.',
    situacionesTitulo: 'Situaciones habituales en Málaga',
    situaciones: [
      { titulo: 'Comprador extranjero en la costa', desc: 'Arras con plazos para NIE y financiación internacional.' },
      { titulo: 'Segunda residencia en Torremolinos', desc: 'Uso turístico vs habitual en comunidad y registros.' },
      { titulo: 'Venta rápida en El Palo', desc: 'Presión por señal: revisión express de nota simple y comunidad.' },
    ],
    barriosTitulo: 'Venta entre particulares en Málaga y costa',
    barriosIntro: 'Zonas con operativa diferenciada:',
    barrios: [
      { nombre: 'Centro histórico', contexto: 'Edificios antiguos', operativa: 'ITE, cédula y obras en portal común.' },
      { nombre: 'Teatinos y El Candado', contexto: 'Universidad y familias', operativa: 'Venta completa con plazos de hipoteca realistas.' },
      { nombre: 'Huelin y Carretería', contexto: 'Precio accesible', operativa: 'Arras equilibradas y checklist documental.' },
      { nombre: 'Torremolinos / Benalmádena', contexto: 'Costa del Sol', operativa: 'Documentación turística y comunidad costera.' },
    ],
    tramitesTitulo: 'Trámites de venta en Málaga',
    tramitesIntro: 'Documentación andaluza habitual:',
    tramitesLocales: ['Cédula de habitabilidad', 'CEE', 'IBI y plusvalía', 'Deudas de comunidad', 'Nota simple registral'],
    pasosTitulo: 'Cómo vendes con Inmonest en Málaga',
    pasos: [
      { titulo: 'Llamada inicial', desc: 'Barrio malagueño y comprador.' },
      { titulo: '687 € fijos', desc: 'Sin % sobre el precio de venta.' },
      { titulo: 'Panel de cliente', desc: 'Subes docs y ves el progreso del expediente.' },
      { titulo: 'Notaría', desc: 'Coordinación hasta escritura.' },
    ],
  },

  salamanca: {
    gestoriaTitulo: 'Vender en Salamanca entre particulares con gestoría online',
    gestoriaIntro:
      'Mercado universitario y casco histórico: vendes sin agencia pero necesitas arras profesionales y documentación castellanoleonesa. Inmonest te acompaña hasta notaría por 687 € con gestor asignado y panel privado.',
    situacionesTitulo: 'Situaciones habituales en Salamanca',
    situaciones: [
      { titulo: 'Piso alquilado a estudiantes', desc: 'Estado del LAU, fianza y comunicación al comprador antes de arras.' },
      { titulo: 'Edificio protegido en el centro', desc: 'Licencias y estado de conservación revisados con tu gestor.' },
      { titulo: 'Comprador de fuera (Madrid)', desc: 'Plazos online: arras y docs sin presencia física hasta notaría.' },
    ],
    barriosTitulo: 'Ventas por zonas de Salamanca',
    barriosIntro: 'Barrios con contextos distintos:',
    barrios: [
      { nombre: 'Centro y Plaza Mayor', contexto: 'Patrimonio y rotación', operativa: 'Documentación técnica y comunidad al día.' },
      { nombre: 'Garrido y San Bernardo', contexto: 'Residencial familiar', operativa: 'Venta completa estándar con plazos hipoteca.' },
      { nombre: 'Vista Hermosa', contexto: 'Chalets y pisos amplios', operativa: 'Certificados y plusvalía orientativa.' },
      { nombre: 'Alamedilla', contexto: 'Precio medio, particulares', operativa: 'Panel Inmonest + gestor hasta escritura.' },
    ],
    tramitesTitulo: 'Trámites de venta en Salamanca',
    tramitesIntro: 'Requisitos en Castilla y León:',
    tramitesLocales: ['Cédula castellanoleonesa', 'Certificado energético', 'ITE en centro histórico', 'Nota simple', 'Comunidad e IBI'],
    pasosTitulo: 'Proceso de venta en Salamanca',
    pasos: [
      { titulo: 'Primera consulta', desc: 'Precio pactado y documentación.' },
      { titulo: '687 €', desc: 'Tarifa plana de gestoría.' },
      { titulo: 'Arras + expediente', desc: 'Seguimiento online con tu gestor.' },
      { titulo: 'Escritura', desc: 'Notaría salmantina con docs completas.' },
    ],
  },

  valladolid: {
    gestoriaTitulo: 'Gestoría para vender en Valladolid sin comisión de agencia',
    gestoriaIntro:
      'Comprador encontrado en Parquesol o Delicias. Inmonest redacta reserva y arras, revisa registro y comunidad, y coordina notaría — 687 €. Ideal si vendes entre particulares sin pasar por inmobiliaria.',
    situacionesTitulo: 'Situaciones habituales en Valladolid',
    situaciones: [
      { titulo: 'Comprador desde Madrid', desc: 'Operación a distancia: gestoría online y firma en notaría vallisoletana.' },
      { titulo: 'Derrama en edificio de los 70', desc: 'Actas revisadas antes de comprometer precio final.' },
      { titulo: 'Arras del comprador desequilibradas', desc: 'Revisión o redacción nueva a tu favor como vendedor.' },
    ],
    barriosTitulo: 'Venta entre particulares por barrios de Valladolid',
    barriosIntro: 'Adaptamos plazos y docs al barrio:',
    barrios: [
      { nombre: 'Centro histórico', contexto: 'Edificios antiguos', operativa: 'ITE y licencias de reforma.' },
      { nombre: 'Parquesol', contexto: 'Alta rotación familiar', operativa: 'Venta completa con panel y gestor 24h.' },
      { nombre: 'Delicias y Rondilla', contexto: 'Operaciones rápidas', operativa: 'Arras con plazos realistas para hipoteca.' },
      { nombre: 'La Victoria', contexto: 'Ticket accesible', operativa: 'Checklist documental completo subido al panel.' },
    ],
    tramitesTitulo: 'Trámites de venta en Valladolid',
    tramitesIntro: 'Documentación habitual en notaría:',
    tramitesLocales: ['Cédula de habitabilidad', 'CEE', 'Certificado de deudas de comunidad', 'Nota simple', 'Plusvalía municipal'],
    pasosTitulo: 'Tu venta en Valladolid con Inmonest',
    pasos: [
      { titulo: 'Consulta', desc: 'Barrio y estado de la documentación.' },
      { titulo: '687 € IVA incl.', desc: 'Sin comisión sobre el precio del piso.' },
      { titulo: 'Gestor asignado', desc: 'WhatsApp + panel de expediente.' },
      { titulo: 'Escritura', desc: 'Coordinación hasta el cierre.' },
    ],
  },
}
