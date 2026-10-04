/**
 * Datos identificativos LSSI (art. 10). Opcionalmente sobreescribir en Vercel:
 * INMONEST_LEGAL_NIF, INMONEST_LEGAL_ADDRESS, INMONEST_LEGAL_REGISTRY
 */
const DEFAULT_NIF = '47838291P'
const DEFAULT_FISCAL_ADDRESS = 'Calle de Mejía Lequerica, 42, Barcelona'

export type LegalEntity = {
  denomination: string
  tradeName: string
  nif: string
  address: string
  mercantileRegistry: string | null
  email: string
  phone: string
  website: string
}

export function getLegalEntity(): LegalEntity {
  const nif = (process.env.INMONEST_LEGAL_NIF?.trim() || DEFAULT_NIF).toUpperCase()
  const address = process.env.INMONEST_LEGAL_ADDRESS?.trim() || DEFAULT_FISCAL_ADDRESS
  const mercantileRegistry = process.env.INMONEST_LEGAL_REGISTRY?.trim() || null

  return {
    denomination: process.env.INMONEST_LEGAL_NAME?.trim() || 'Inmonest',
    tradeName: 'Inmonest',
    nif,
    address,
    mercantileRegistry,
    email: 'info@inmonest.com',
    phone: process.env.INMONEST_LEGAL_PHONE?.trim() || '+34 745 022 862',
    website: 'https://inmonest.com',
  }
}

export function isLegalEntityComplete(entity: LegalEntity): boolean {
  return Boolean(entity.nif && entity.address)
}
