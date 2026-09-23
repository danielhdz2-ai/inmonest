import ServicioGestoriaPage, { generateMetadata as generateServicioMetadata } from '../[servicio]/page'

const SERVICIO = 'alquiler-temporada'

export async function generateMetadata() {
  return generateServicioMetadata({ params: Promise.resolve({ servicio: SERVICIO }) })
}

export default function AlquilerTemporadaPage() {
  return ServicioGestoriaPage({ params: Promise.resolve({ servicio: SERVICIO }) })
}
