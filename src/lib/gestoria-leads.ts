import { GESTORIA_SERVICIOS, getPrecioServicio } from '@/lib/gestoria-catalogo'

export function getServiceDisplayName(serviceKey: string, fallback?: string): string {
  return GESTORIA_SERVICIOS[serviceKey]?.nombre ?? fallback ?? serviceKey.replace(/-/g, ' ')
}

export function getServicePrice(serviceKey: string): number | null {
  return getPrecioServicio(serviceKey) ?? GESTORIA_SERVICIOS[serviceKey]?.precio ?? null
}

export function buildGestoriaPanelUrl(params?: { lead?: boolean; pago?: boolean }) {
  const q = new URLSearchParams()
  if (params?.lead) q.set('lead', '1')
  if (params?.pago) q.set('pago', '1')
  const qs = q.toString()
  return `/mi-cuenta/contratos${qs ? `?${qs}` : ''}`
}

/** Ruta de registro/login con retorno al panel de gestoría */
export function buildAuthRedirectUrl(
  mode: 'login' | 'registro',
  opts: { email?: string; lead?: boolean },
): string {
  const next = buildGestoriaPanelUrl({ lead: opts.lead })
  const q = new URLSearchParams({ next })
  if (opts.email) q.set('email', opts.email)
  return `/${mode}?${q.toString()}`
}

export function safeInternalPath(path: string | null | undefined): string | null {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return null
  return path
}

export function isLeadStatus(status: string, paidAt: string | null): boolean {
  return status === 'lead' || (status === 'pending' && !paidAt)
}

export function isPaidStatus(status: string, paidAt: string | null): boolean {
  return status === 'paid' || Boolean(paidAt)
}
