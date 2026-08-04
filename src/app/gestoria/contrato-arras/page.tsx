import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contrato de arras online',
  description:
    'Redacción profesional de contratos de arras y señal. Servicio online en toda España. Arras penitenciales, confirmatorias y señal.',
  alternates: { canonical: `${BASE_URL}/gestoria/arras-penitenciales` },
}

/** URL legacy — redirige al servicio premium unificado */
export default function ContratoArrasRedirect() {
  permanentRedirect('/gestoria/arras-penitenciales')
}
