import PrestamoParticularesCiudadLanding from '@/components/PrestamoParticularesCiudadLanding'
import {
  PRESTAMO_PARTICULARES_CIUDADES,
  buildPrestamoParticularesMetadata,
} from '@/lib/prestamo-particulares-ciudad-data'

const config = PRESTAMO_PARTICULARES_CIUDADES.zaragoza

export const metadata = buildPrestamoParticularesMetadata(config)

export const revalidate = 86400

export default function PrestamoParticularesZaragozaPage() {
  return <PrestamoParticularesCiudadLanding config={config} />
}
