import ServicioGestoriaPage, { generateMetadata as generateServicioMetadata } from '../[servicio]/page'

const SERVICIO = 'reserva-compra'

export async function generateMetadata() {
  return generateServicioMetadata({ params: Promise.resolve({ servicio: SERVICIO }) })
}

export default function ReservaCompraPage() {
  return ServicioGestoriaPage({ params: Promise.resolve({ servicio: SERVICIO }) })
}
