export type ServicioDetalleBloque = {
  numero: number
  titulo: string
  items: string[]
}

export const VENTA_COMPLETA_BLOQUES_SERVICIO: ServicioDetalleBloque[] = [
  {
    numero: 1,
    titulo: 'Análisis inicial y asignación de gestor',
    items: [
      'Primera llamada en menos de 24h con tu gestor inmobiliario especializado',
      'Estudio de la operación: precio pactado, plazos, hipoteca del comprador y estado documental',
      'Verificación de titularidad, cargas registrales y deudas pendientes',
      'Plan de acción personalizado con calendario hasta escritura',
    ],
  },
  {
    numero: 2,
    titulo: 'Contrato de reserva (si aún no lo has firmado)',
    items: [
      'Redacción personalizada con datos reales del inmueble y las partes',
      'Cláusulas de protección: plazos, condiciones suspensivas y devolución de señal',
      'Asesoramiento sobre importe de señal adecuado para tu operación',
      'Explicación cláusula a cláusula antes de que firmes nada',
    ],
  },
  {
    numero: 3,
    titulo: 'Contrato de arras penitenciales o confirmatorias',
    items: [
      'Redacción completa adaptada a la normativa autonómica',
      'Descripción exacta del inmueble según datos registrales y catastrales',
      'Condiciones de pago: señal, resto del precio y fecha límite de escritura',
      'Cláusulas de penalización, cumplimiento y resolución por incumplimiento del comprador',
    ],
  },
  {
    numero: 4,
    titulo: 'Recogida y verificación de toda la documentación',
    items: [
      'Nota simple registral actualizada (te guiamos en la solicitud)',
      'Escrituras de propiedad y DNI/NIE de todos los titulares',
      'Certificado de eficiencia energética vigente',
      'Cédula de habitabilidad según tu comunidad autónoma',
      'Último recibo IBI, recibos de comunidad y certificado de estar al corriente de pago',
      'Licencias de obra en reformas recientes, si aplica',
      'Checklist final: confirmamos que la notaría no rechazará nada el día de la firma',
    ],
  },
  {
    numero: 5,
    titulo: 'Asesoramiento continuo con tu gestor',
    items: [
      'Disponible por teléfono, WhatsApp y email durante todo el proceso',
      'Resolución de dudas en cada fase: arras, hipoteca del comprador, plazos',
      'Coordinación con el comprador y su banco si hay financiación',
      'Información sobre plusvalía municipal (IIVTNU) e IRPF por ganancia patrimonial',
      'Seguimiento hasta que el dinero esté en tu cuenta',
    ],
  },
  {
    numero: 6,
    titulo: 'Coordinación con notaría y día de la escritura',
    items: [
      'Envío de documentación completa a la notaría elegida',
      'Verificación previa de que todo está listo para escriturar',
      'Asesoramiento sobre gastos de notaría, registro e impuestos del vendedor',
      'Acompañamiento y soporte el día de la firma: sabes qué firmar y qué esperar',
      'Confirmación de que la operación se ha cerrado correctamente',
    ],
  },
]

export const VENTA_COMPLETA_PASOS_PROCESO = [
  {
    paso: '1',
    titulo: 'Llamas o contratas online',
    desc: 'Cuéntanos que ya tienes comprador. En 24h te contacta tu gestor. Pago único de 687€ IVA incluido.',
  },
  {
    paso: '2',
    titulo: 'Revisamos tu situación',
    desc: 'Analizamos contratos ya firmados (si los hay), documentación disponible y plazos acordados con el comprador.',
  },
  {
    paso: '3',
    titulo: 'Redactamos o revisamos contratos',
    desc: 'Reserva y arras redactados por profesionales o revisión de los que te hayan dado, protegiendo tus intereses como vendedor.',
  },
  {
    paso: '4',
    titulo: 'Preparamos toda la documentación',
    desc: 'Te decimos exactamente qué necesitas y dónde conseguirlo. Nada se queda pendiente para notaría.',
  },
  {
    paso: '5',
    titulo: 'Coordinamos con notaría',
    desc: 'Enviamos el expediente, verificamos que está completo y fijamos fecha de firma con el comprador.',
  },
  {
    paso: '6',
    titulo: 'Escrituras y venta completada',
    desc: 'Firmas con tranquilidad. Tu gestor ha verificado cada paso. Vendiste entre particulares sin comisión de agencia.',
  },
] as const

export const VENTA_COMPLETA_COMPARATIVA = [
  { aspecto: 'Redacción de contratos', inmonest: 'Incluida y personalizada', solo: 'Plantilla de internet' },
  { aspecto: 'Gestor inmobiliario dedicado', inmonest: 'Asignado en 24h', solo: 'No tienes' },
  { aspecto: 'Documentación para notaría', inmonest: 'Checklist y seguimiento', solo: 'Buscas tú a ciegas' },
  { aspecto: 'Coordinación con notaría', inmonest: 'Incluida', solo: 'Te las arreglas solo' },
  { aspecto: 'Asesoramiento fiscal (plusvalía, IRPF)', inmonest: 'Orientación incluida', solo: 'No incluido' },
  { aspecto: 'Coste total', inmonest: '687€ fijos', solo: '0€… hasta que algo sale mal' },
  { aspecto: 'Comisión de agencia', inmonest: '0% — no somos agencia', solo: '3-5% si usas inmobiliaria' },
] as const

export const VENTA_COMPLETA_DOCUMENTOS_CHECKLIST = [
  'DNI o NIE de todos los propietarios',
  'Escritura de compra original',
  'Nota simple registral actualizada (máx. 3 meses)',
  'Certificado de eficiencia energética',
  'Cédula de habitabilidad vigente',
  'Último recibo del IBI pagado',
  'Certificado de deudas de la comunidad de propietarios',
  'Últimos recibos de suministros (agua, gas, luz)',
  'Licencias de obra legalizadas (si hubo reformas)',
  'IBAN para recibir el pago del comprador',
] as const
