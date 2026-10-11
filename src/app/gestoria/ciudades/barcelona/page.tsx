import { redirect } from 'next/navigation'

/** Ruta legacy: hub Barcelona (público). */
export default function GestoriaCiudadesBarcelonaRedirect() {
  redirect('/barcelona/contrato-alquiler')
}
