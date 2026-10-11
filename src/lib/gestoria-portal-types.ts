/** Tipos compartidos del portal cliente de gestoría */

export type GestoriaContrato = {
  id: string
  session_id: string | null
  service_key: string
  service_name: string | null
  client_name: string | null
  client_email?: string | null
  client_phone?: string | null
  amount_eur: number | null
  status: string
  step: number | null
  paid_at: string | null
  contract_path: string | null
  contract_delivered_at?: string | null
  expected_delivery_date?: string | null
  assigned_to?: string | null
  notes?: string | null
  created_at?: string | null
}

export type GestoriaUserDoc = {
  id: string
  doc_key: string
  file_name: string
  status: string
  uploaded_at: string
  notes: string | null
  gestoria_request_id?: string | null
  partes_data?: Record<string, unknown> | null
}

export type GestoriaPortalSection =
  | 'inicio'
  | 'expediente'
  | 'documentos'
  | 'contratos'
  | 'inmueble'
  | 'servicios'
  | 'publicar'
  | 'configuracion'

export type GestoriaPortalIconKey =
  | 'panel'
  | 'expediente'
  | 'documentos'
  | 'contratos'
  | 'inmueble'
  | 'servicios'
  | 'configuracion'
  | 'upload'
  | 'workflow-pay'
  | 'workflow-docs'
  | 'workflow-edit'
  | 'workflow-done'
  | 'more'

export const GESTORIA_PORTAL_SECTIONS: {
  id: GestoriaPortalSection
  label: string
  shortLabel: string
  iconKey: GestoriaPortalIconKey
  desc: string
}[] = [
  { id: 'inicio', label: 'Panel', shortLabel: 'Inicio', iconKey: 'panel', desc: 'Resumen de tu expediente' },
  { id: 'expediente', label: 'Expediente', shortLabel: 'Exped.', iconKey: 'expediente', desc: 'Documentación y seguimiento' },
  { id: 'documentos', label: 'Mis documentos', shortLabel: 'Archivos', iconKey: 'documentos', desc: 'Ver, descargar o eliminar' },
  { id: 'contratos', label: 'Mis contratos', shortLabel: 'Contratos', iconKey: 'contratos', desc: 'Historial de servicios' },
  { id: 'inmueble', label: 'Mi inmueble', shortLabel: 'Inmueble', iconKey: 'inmueble', desc: 'Datos del inmueble' },
  { id: 'servicios', label: 'Contratar más', shortLabel: 'Servicios', iconKey: 'servicios', desc: 'Nuevos contratos y packs' },
  { id: 'configuracion', label: 'Configuración', shortLabel: 'Ajustes', iconKey: 'configuracion', desc: 'Datos personales y cuenta' },
]

const MOBILE_BAR_IDS: GestoriaPortalSection[] = ['inicio', 'expediente', 'servicios', 'configuracion']

const MOBILE_MORE_IDS: GestoriaPortalSection[] = ['documentos', 'contratos', 'inmueble']

/** Barra inferior móvil (4 accesos + menú “Más”). */
export const GESTORIA_PORTAL_MOBILE_SECTIONS = GESTORIA_PORTAL_SECTIONS.filter((s) =>
  MOBILE_BAR_IDS.includes(s.id),
)

export const GESTORIA_PORTAL_MOBILE_MORE_SECTIONS = GESTORIA_PORTAL_SECTIONS.filter((s) =>
  MOBILE_MORE_IDS.includes(s.id),
)

export const GESTORIA_PORTAL_SECTION_TITLES: Record<GestoriaPortalSection, string> = {
  inicio: 'Panel',
  expediente: 'Expediente',
  documentos: 'Mis documentos',
  contratos: 'Mis contratos',
  inmueble: 'Mi inmueble',
  servicios: 'Contratar más',
  publicar: 'Publicar inmueble',
  configuracion: 'Configuración',
}

export const GESTORIA_ORDER_SELECT_CORE =
  'id,session_id,service_key,service_name,client_name,client_email,amount_eur,status,step,paid_at,contract_path,created_at'

/** Columnas opcionales — pueden no existir si faltan migraciones 040/041 */
export const GESTORIA_ORDER_SELECT =
  `${GESTORIA_ORDER_SELECT_CORE},client_phone,contract_delivered_at,expected_delivery_date,assigned_to,notes`

export const USER_DOCS_SELECT_CORE =
  'id,doc_key,file_name,status,uploaded_at,notes'

export const USER_DOCS_SELECT =
  `${USER_DOCS_SELECT_CORE},gestoria_request_id,partes_data`
