import { redirect } from 'next/navigation'

export default function ReservaCompraRedirect() {
  // Redirect permanente 301 a la página correcta
  redirect('/gestoria/arras-vs-reserva-compra')
}
