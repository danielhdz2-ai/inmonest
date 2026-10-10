import { redirect } from 'next/navigation'

/** Ruta legacy: desglose Barcelona en inventario admin. */
export default function GestoriaCiudadesBarcelonaRedirect() {
  redirect('/admin/inventario-seo#barcelona')
}
