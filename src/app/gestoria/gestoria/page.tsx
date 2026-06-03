import { redirect } from 'next/navigation'

export default function GestoriaGestoriaRedirect() {
  // Redirect permanente 301 a la página principal de gestoría
  redirect('/gestoria')
}
