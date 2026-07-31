/** Documentación requerida por servicio de gestoría */

export type ServiceDocRequirement = {
  key: string
  label: string
  icon: string
  desc: string
  required: boolean
}

const DEFAULT_DOCS: ServiceDocRequirement[] = [
  {
    key: 'dni',
    label: 'DNI / NIE de las partes',
    icon: '🪪',
    desc: 'Ambas caras en PDF o imagen',
    required: true,
  },
  {
    key: 'otro',
    label: 'Datos adicionales del inmueble',
    icon: '📄',
    desc: 'Cualquier documento relevante para tu caso',
    required: false,
  },
]

const BY_SERVICE: Record<string, ServiceDocRequirement[]> = {
  'contrato-alquiler': [
    { key: 'dni', label: 'DNI / NIE propietario e inquilino', icon: '🪪', desc: 'Ambas caras de cada parte', required: true },
    { key: 'nomina', label: 'Nóminas o solvencia del inquilino', icon: '💼', desc: 'Últimas 3 nóminas o aval bancario', required: true },
    { key: 'escrituras', label: 'Escrituras o título del inmueble', icon: '📜', desc: 'Documento de propiedad del arrendador', required: true },
    { key: 'cert-energetico', label: 'Certificado energético', icon: '⚡', desc: 'CE vigente del inmueble', required: true },
    { key: 'cedula-habitabilidad', label: 'Cédula de habitabilidad', icon: '🏠', desc: 'Si aplica en tu comunidad autónoma', required: false },
  ],
  'contrato-alquiler-barcelona': [
    { key: 'dni', label: 'DNI / NIE propietario e inquilino', icon: '🪪', desc: 'Ambas caras de cada parte', required: true },
    { key: 'nomina', label: 'Nóminas o solvencia del inquilino', icon: '💼', desc: 'Últimas 3 nóminas o aval bancario', required: true },
    { key: 'escrituras', label: 'Escrituras o título del inmueble', icon: '📜', desc: 'Documento de propiedad del arrendador', required: true },
    { key: 'cert-energetico', label: 'Certificado energético', icon: '⚡', desc: 'CE vigente del inmueble', required: true },
  ],
  'alquiler-temporada': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Propietario e inquilino temporal', required: true },
    { key: 'escrituras', label: 'Título del inmueble', icon: '📜', desc: 'Escritura o contrato de propiedad', required: true },
    { key: 'partes', label: 'Datos de las partes y fechas', icon: '📋', desc: 'Periodo del alquiler, renta y condiciones acordadas', required: true },
  ],
  'alquiler-habitaciones': [
    { key: 'dni', label: 'DNI / NIE propietario e inquilino', icon: '🪪', desc: 'Ambas caras de cada parte', required: true },
    { key: 'escrituras', label: 'Escrituras del inmueble', icon: '📜', desc: 'Documento de propiedad', required: true },
    { key: 'partes', label: 'Datos de habitación y renta', icon: '📋', desc: 'Habitación, importe y reglas de convivencia', required: true },
  ],
  'alquiler-local-comercial': [
    { key: 'dni', label: 'DNI / CIF de las partes', icon: '🪪', desc: 'Arrendador y arrendatario', required: true },
    { key: 'escrituras', label: 'Escrituras del local', icon: '📜', desc: 'Título de propiedad o contrato de arrendamiento superior', required: true },
    { key: 'partes', label: 'Condiciones del local', icon: '📋', desc: 'Superficie, actividad, renta y duración', required: true },
  ],
  'arras-penitenciales': [
    { key: 'dni', label: 'DNI / NIE comprador y vendedor', icon: '🪪', desc: 'Documento de identidad de ambas partes', required: true },
    { key: 'nota-simple', label: 'Nota simple registral', icon: '🏛️', desc: 'Del Registro de la Propiedad (menos de 3 meses)', required: true },
    { key: 'partes', label: 'Datos de las partes', icon: '📋', desc: 'Nombre, contacto, precio y condiciones acordadas', required: true },
  ],
  'arras-confirmatorias': [
    { key: 'dni', label: 'DNI / NIE comprador y vendedor', icon: '🪪', desc: 'Documento de identidad de ambas partes', required: true },
    { key: 'nota-simple', label: 'Nota simple registral', icon: '🏛️', desc: 'Del Registro de la Propiedad', required: true },
    { key: 'partes', label: 'Condiciones de la operación', icon: '📋', desc: 'Precio, plazos y condiciones suspensivas', required: true },
  ],
  'arras-parking-garage': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Comprador y vendedor', required: true },
    { key: 'nota-simple', label: 'Nota simple del parking', icon: '🏛️', desc: 'Registro de la Propiedad', required: true },
    { key: 'partes', label: 'Datos de la operación', icon: '📋', desc: 'Plaza, precio y condiciones', required: true },
  ],
  'reserva-compra': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Comprador y vendedor', required: true },
    { key: 'partes', label: 'Condiciones de la reserva', icon: '📋', desc: 'Precio, señal y plazo para firmar arras', required: true },
  ],
  'reserva-alquiler': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Propietario e inquilino', required: true },
    { key: 'partes', label: 'Condiciones de la reserva', icon: '📋', desc: 'Inmueble, renta y fecha de entrada', required: true },
  ],
  'pack-due-diligence-precompra': [
    { key: 'dni', label: 'DNI / NIE del comprador', icon: '🪪', desc: 'Documento de identidad', required: true },
    { key: 'nota-simple', label: 'Nota simple del inmueble', icon: '🏛️', desc: 'Registro de la Propiedad', required: true },
    { key: 'contrato-alquiler', label: 'Contrato de arras firmado', icon: '📋', desc: 'Copia del contrato de arras', required: true },
    { key: 'otro', label: 'Actas de comunidad', icon: '📄', desc: 'Si las tienes disponibles', required: false },
  ],
  'venta-completa-reserva-escritura': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Vendedor y comprador', required: true },
    { key: 'nota-simple', label: 'Nota simple registral', icon: '🏛️', desc: 'Del inmueble en venta', required: true },
    { key: 'escrituras', label: 'Documentación del inmueble', icon: '📜', desc: 'Escrituras y certificados disponibles', required: true },
    { key: 'partes', label: 'Datos de la operación', icon: '📋', desc: 'Precio, hipoteca y condiciones', required: true },
  ],
  'compra-completa-reserva-escritura': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Comprador y vendedor', required: true },
    { key: 'nota-simple', label: 'Nota simple registral', icon: '🏛️', desc: 'Del inmueble', required: true },
    { key: 'nomina', label: 'Solvencia / financiación', icon: '💼', desc: 'Preaprobación hipotecaria o solvencia', required: true },
    { key: 'partes', label: 'Condiciones de compra', icon: '📋', desc: 'Precio, plazos y condiciones acordadas', required: true },
  ],
  'revision-alquiler': [
    { key: 'contrato-alquiler', label: 'Contrato a revisar', icon: '📋', desc: 'PDF del borrador o contrato recibido', required: true },
    { key: 'partes', label: 'Tus dudas o cláusulas a revisar', icon: '📄', desc: 'Indica qué te preocupa', required: false },
  ],
  'revision-arras': [
    { key: 'contrato-alquiler', label: 'Contrato de arras a revisar', icon: '📋', desc: 'PDF del documento', required: true },
    { key: 'partes', label: 'Tus dudas o cláusulas a revisar', icon: '📄', desc: 'Indica qué te preocupa', required: false },
  ],
  'revision-correccion': [
    { key: 'contrato-alquiler', label: 'Contrato a corregir', icon: '📋', desc: 'PDF del borrador actual', required: true },
    { key: 'partes', label: 'Correcciones solicitadas', icon: '📄', desc: 'Detalla los cambios que necesitas', required: true },
  ],
  'revision-correccion-arras': [
    { key: 'contrato-alquiler', label: 'Contrato de arras a corregir', icon: '📋', desc: 'PDF del borrador actual', required: true },
    { key: 'partes', label: 'Correcciones solicitadas', icon: '📄', desc: 'Detalla los cambios que necesitas', required: true },
  ],
  'prestamo-particulares': [
    { key: 'dni', label: 'DNI / NIE prestamista y prestatario', icon: '🪪', desc: 'Documento de identidad de ambos', required: true },
    { key: 'partes', label: 'Condiciones del préstamo', icon: '📋', desc: 'Importe, interés, plazo y garantías', required: true },
  ],
  'liquidacion-fianza': [
    { key: 'dni', label: 'DNI / NIE de las partes', icon: '🪪', desc: 'Propietario e inquilino', required: true },
    { key: 'contrato-alquiler', label: 'Contrato de alquiler', icon: '📋', desc: 'Contrato vigente o finalizado', required: true },
    { key: 'facturas', label: 'Facturas o estado del piso', icon: '🧾', desc: 'Suministros, reparaciones o inventario', required: false },
  ],
  'asesoria-compra': [
    { key: 'dni', label: 'DNI / NIE del comprador', icon: '🪪', desc: 'Documento de identidad', required: true },
    { key: 'partes', label: 'Datos del inmueble y operación', icon: '📋', desc: 'Dirección, precio y situación actual', required: true },
  ],
  'contrato-compraventa': [
    { key: 'dni', label: 'DNI / NIE comprador y vendedor', icon: '🪪', desc: 'Documento de identidad', required: true },
    { key: 'nota-simple', label: 'Nota simple registral', icon: '🏛️', desc: 'Del inmueble', required: true },
    { key: 'partes', label: 'Condiciones de compraventa', icon: '📋', desc: 'Precio, forma de pago y entrega', required: true },
  ],
}

const SERVICE_ALIASES: Record<string, string> = {
  'alquiler-vivienda-lau': 'contrato-alquiler',
  'contrato-alquiler-temporal': 'alquiler-temporada',
  'alquiler-habitacion': 'alquiler-habitaciones',
}

function resolveServiceDocsKey(serviceKey: string): string {
  if (BY_SERVICE[serviceKey]) return serviceKey
  return SERVICE_ALIASES[serviceKey] ?? serviceKey
}

export function getRequiredDocsForService(serviceKey: string): ServiceDocRequirement[] {
  const key = resolveServiceDocsKey(serviceKey)
  return BY_SERVICE[key] ?? DEFAULT_DOCS
}

export function getDocsPreviewForService(serviceKey: string): { key: string; label: string; icon: string }[] {
  return getRequiredDocsForService(serviceKey).map(({ key, label, icon }) => ({ key, label, icon }))
}

/** Documentos auxiliares que no forman parte de ningún listado por servicio */
const EXTRA_DOC_META: Record<string, ServiceDocRequirement> = {
  'dni-reverso': {
    key: 'dni-reverso',
    label: 'DNI / NIE (reverso)',
    icon: '🪪',
    desc: 'Reverso del documento de identidad',
    required: false,
  },
}

export function getDocMeta(docKey: string): ServiceDocRequirement | null {
  for (const entry of Object.values(BY_SERVICE)) {
    const found = entry.find((d) => d.key === docKey)
    if (found) return found
  }
  return DEFAULT_DOCS.find((d) => d.key === docKey) ?? EXTRA_DOC_META[docKey] ?? null
}

export function resolveServiceKeyFromLabel(servicio: string, ciudad?: string): string {
  const s = servicio.toLowerCase()
  if (s.includes('due diligence')) return 'pack-due-diligence-precompra'
  if (s.includes('arras')) return 'arras-penitenciales'
  if (s.includes('alquiler') && ciudad?.toLowerCase() === 'barcelona') return 'contrato-alquiler-barcelona'
  if (s.includes('alquiler')) return 'contrato-alquiler'
  if (s.includes('venta completa')) return 'venta-completa-reserva-escritura'
  if (s.includes('compra completa')) return 'compra-completa-reserva-escritura'
  return 'contrato-alquiler'
}
