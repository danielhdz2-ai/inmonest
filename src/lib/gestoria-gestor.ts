import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
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

// El gestor asignado en el panel del cliente es siempre Daniel Hernández.
const DEFAULT_GESTOR: GestorProfile = {
  ...GESTOR_DANIEL_HERNANDEZ,
  email: 'info@inmonest.com',
  telefono: GESTORIA_PHONE_DISPLAY,
  telefonoTel: GESTORIA_PHONE_TEL,
  whatsapp: GESTORIA_PHONE_WA,
}

export function resolveGestorForRequest(_assignedTo?: string | null): GestorProfile {
  return DEFAULT_GESTOR
}
