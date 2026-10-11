import { redirect } from 'next/navigation'

/** Ruta legacy: inventario público por ciudad (no panel admin). */
export default function GestoriaCiudadesRedirect() {
  redirect('/contratos-inmobiliarios')
}
