import { redirect } from 'next/navigation'

/** Ruta legacy: inventario SEO solo en panel admin. */
export default function GestoriaCiudadesRedirect() {
  redirect('/admin/inventario-seo')
}
