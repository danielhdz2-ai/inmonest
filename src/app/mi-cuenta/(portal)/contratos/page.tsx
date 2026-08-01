import ContratosGate from '@/components/gestoria-portal/ContratosGate'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Los datos se cargan en cliente vía /api/gestoria/mis-pedidos */
export default function ContratosPage() {
  return <ContratosGate />
}
