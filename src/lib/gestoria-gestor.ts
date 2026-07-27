import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { GESTORIA_PHONE_DISPLAY, GESTORIA_PHONE_TEL, GESTORIA_PHONE_WA } from '@/lib/gestoria-contact'

export type GestorProfile = {
  nombre: string
  foto: string
  rol: string
  email?: string
  telefono: string
  telefonoTel: string
  whatsapp: string
}

const GESTORES_BY_EMAIL: Record<string, GestorProfile> = {
  'daniel.hdz.trader@gmail.com': {
    ...GESTOR_DANIEL_HERNANDEZ,
    email: 'daniel.hdz.trader@gmail.com',
    telefono: GESTORIA_PHONE_DISPLAY,
    telefonoTel: GESTORIA_PHONE_TEL,
    whatsapp: GESTORIA_PHONE_WA,
  },
  'info@inmonest.com': {
    ...GESTOR_CARMEN_VIDAL,
    email: 'info@inmonest.com',
    telefono: GESTORIA_PHONE_DISPLAY,
    telefonoTel: GESTORIA_PHONE_TEL,
    whatsapp: GESTORIA_PHONE_WA,
  },
}

const DEFAULT_GESTOR: GestorProfile = {
  ...GESTOR_CARMEN_VIDAL,
  email: 'info@inmonest.com',
  telefono: GESTORIA_PHONE_DISPLAY,
  telefonoTel: GESTORIA_PHONE_TEL,
  whatsapp: GESTORIA_PHONE_WA,
}

export function resolveGestorForRequest(assignedTo?: string | null): GestorProfile {
  if (!assignedTo?.trim()) return DEFAULT_GESTOR
  const key = assignedTo.trim().toLowerCase()
  return GESTORES_BY_EMAIL[key] ?? { ...DEFAULT_GESTOR, email: assignedTo.trim() }
}
