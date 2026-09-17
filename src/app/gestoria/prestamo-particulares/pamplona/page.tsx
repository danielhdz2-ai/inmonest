import PrestamoParticularesCiudadLanding from '@/components/PrestamoParticularesCiudadLanding'
import { PRESTAMO_PARTICULARES_CIUDADES, buildPrestamoParticularesMetadata as buildMetadata } from '@/lib/prestamo-particulares-ciudad-data'

const config = PRESTAMO_PARTICULARES_CIUDADES.pamplona

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function PrestamoParticularesPamplonaPage() {
  return <PrestamoParticularesCiudadLanding config={config} />
}
