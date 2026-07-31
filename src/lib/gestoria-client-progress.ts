import { getRequiredDocsForService, type ServiceDocRequirement } from '@/lib/gestoria-service-docs'

export const WORKFLOW_STEPS = [
  { n: 1, label: 'Pago recibido', desc: 'Tu pago ha sido confirmado', icon: '💳' },
  { n: 2, label: 'Documentación', desc: 'Sube los documentos de tu servicio', icon: '📋' },
  { n: 3, label: 'En elaboración', desc: 'Nuestro equipo redacta tu contrato', icon: '⚙️' },
  { n: 4, label: 'Entregado', desc: 'Contrato listo para descargar', icon: '✅' },
] as const

export type UserDocRecord = {
  doc_key: string
  file_name: string
  status: string
  uploaded_at?: string
  gestoria_request_id?: string | null
  partes_data?: Record<string, unknown> | null
}

export type ChecklistItem = ServiceDocRequirement & {
  uploaded: UserDocRecord | null
  state: 'done' | 'pending' | 'reviewing' | 'rejected'
}

export type GestoriaProgress = {
  currentStep: number
  progressPercent: number
  docsComplete: boolean
  requiredUploaded: number
  requiredTotal: number
  checklist: ChecklistItem[]
  stepLabel: string
  stepDesc: string
}

type ContratoLike = {
  id?: string
  paid_at: string | null
  step: number | null
  contract_path: string | null
  contract_delivered_at?: string | null
  expected_delivery_date?: string | null
  service_key: string
}

export type TimelineStepDate = {
  step: number
  date: string | null
  label: string
}

export function buildTimelineDates(
  contrato: ContratoLike,
  userDocs: UserDocRecord[],
): TimelineStepDate[] {
  const requestDocs = contrato.id ? filterDocsForRequest(userDocs, contrato.id) : userDocs
  const uploadedDates = requestDocs
    .map((d) => d.uploaded_at)
    .filter(Boolean)
    .sort() as string[]
  const firstDocAt = uploadedDates[0] ?? null

  return WORKFLOW_STEPS.map((step) => {
    let date: string | null = null
    if (step.n === 1) date = contrato.paid_at ?? null
    if (step.n === 2) date = firstDocAt
    if (step.n === 3) {
      if ((contrato.step ?? 1) >= 3) {
        date = contrato.expected_delivery_date
          ? `${contrato.expected_delivery_date}T12:00:00.000Z`
          : firstDocAt
      }
    }
    if (step.n === 4) {
      date = contrato.contract_delivered_at ?? (contrato.contract_path ? contrato.paid_at : null)
    }
    return { step: step.n, date, label: step.label }
  })
}

function docState(uploaded: UserDocRecord | null): ChecklistItem['state'] {
  if (!uploaded) return 'pending'
  if (uploaded.status === 'validated') return 'done'
  if (uploaded.status === 'rejected') return 'rejected'
  return 'reviewing'
}

function isPdfDocName(fileName: string | null | undefined): boolean {
  return /\.pdf$/i.test(fileName ?? '')
}

/**
 * El DNI admite PDF único (ambas caras) o foto anverso + reverso.
 * Solo se considera completo si es PDF, o si hay foto de ambas caras.
 */
function dniState(front: UserDocRecord | null, back: UserDocRecord | null): ChecklistItem['state'] {
  if (!front) return 'pending'
  if (isPdfDocName(front.file_name)) return docState(front)

  if (!back) return 'pending'
  const states = [docState(front), docState(back)]
  if (states.includes('rejected')) return 'rejected'
  if (states.every((s) => s === 'done')) return 'done'
  return 'reviewing'
}

export function filterDocsForRequest(userDocs: UserDocRecord[], requestId: string): UserDocRecord[] {
  const scoped = userDocs.filter((d) => d.gestoria_request_id === requestId)
  if (scoped.length > 0) return scoped
  // Compatibilidad: docs antiguos sin request_id
  return userDocs.filter((d) => !d.gestoria_request_id)
}

/** Devuelve anverso/reverso del DNI y si el anverso es un PDF (no requiere reverso) */
export function getDniParts(
  userDocs: UserDocRecord[],
  requestId?: string,
): { front: UserDocRecord | null; back: UserDocRecord | null; frontIsPdf: boolean } {
  const docs = requestId ? filterDocsForRequest(userDocs, requestId) : userDocs
  const front = docs.find((d) => d.doc_key === 'dni') ?? null
  const back = docs.find((d) => d.doc_key === 'dni-reverso') ?? null
  return { front, back, frontIsPdf: isPdfDocName(front?.file_name) }
}

export function buildDocChecklist(
  serviceKey: string,
  userDocs: UserDocRecord[],
  requestId?: string,
): ChecklistItem[] {
  const docs = requestId ? filterDocsForRequest(userDocs, requestId) : userDocs
  const requirements = getRequiredDocsForService(serviceKey)
  return requirements.map((req) => {
    const uploaded = docs.find((d) => d.doc_key === req.key) ?? null

    if (req.key === 'dni') {
      const back = docs.find((d) => d.doc_key === 'dni-reverso') ?? null
      return { ...req, uploaded, state: dniState(uploaded, back) }
    }

    const hasPartesForm =
      req.key === 'partes' &&
      uploaded?.partes_data &&
      Object.keys(uploaded.partes_data).length > 0
    let state = docState(uploaded)
    if (hasPartesForm && state === 'pending') state = 'reviewing'
    return { ...req, uploaded, state }
  })
}

export function computeGestoriaProgress(contrato: ContratoLike, userDocs: UserDocRecord[]): GestoriaProgress {
  const checklist = buildDocChecklist(contrato.service_key, userDocs, contrato.id)
  const required = checklist.filter((c) => c.required)
  const requiredUploaded = required.filter((c) => c.state !== 'pending' && c.state !== 'rejected').length
  const requiredTotal = required.length
  const docsComplete = requiredTotal === 0 || requiredUploaded >= requiredTotal

  const paymentDone = Boolean(contrato.paid_at)
  const inProduction = (contrato.step ?? 1) >= 3
  const delivered = Boolean(contrato.contract_path)

  let currentStep = 1
  if (paymentDone) currentStep = 2
  if (paymentDone && docsComplete) currentStep = 3
  if (inProduction) currentStep = Math.max(currentStep, 3)
  if (delivered) currentStep = 4
  currentStep = Math.max(currentStep, Math.min(contrato.step ?? 1, 4))

  let progressPercent = 0
  if (paymentDone) progressPercent += 25
  if (requiredTotal > 0) {
    progressPercent += Math.round((requiredUploaded / requiredTotal) * 25)
  } else if (paymentDone) {
    progressPercent += 25
  }
  if (docsComplete && inProduction) progressPercent += 25
  else if (docsComplete && currentStep >= 3) progressPercent = Math.max(progressPercent, 75)
  if (delivered) progressPercent = 100

  const stepInfo = WORKFLOW_STEPS[currentStep - 1] ?? WORKFLOW_STEPS[0]

  return {
    currentStep,
    progressPercent,
    docsComplete,
    requiredUploaded,
    requiredTotal,
    checklist,
    stepLabel: stepInfo.label,
    stepDesc: stepInfo.desc,
  }
}

export function getServiceShortTitle(serviceKey: string, serviceName?: string | null): string {
  if (serviceName?.trim()) return serviceName.trim()
  const map: Record<string, string> = {
    'arras-penitenciales': 'Tu contrato de arras',
    'arras-confirmatorias': 'Tu contrato de arras confirmatorias',
    'contrato-alquiler': 'Tu contrato de alquiler',
    'contrato-alquiler-barcelona': 'Tu contrato de alquiler',
    'pack-due-diligence-precompra': 'Tu due diligence pre-compra',
    'venta-completa-reserva-escritura': 'Tu servicio de venta completa',
    'compra-completa-reserva-escritura': 'Tu servicio de compra completa',
  }
  return map[serviceKey] ?? `Tu servicio de ${serviceKey.replace(/-/g, ' ')}`
}
