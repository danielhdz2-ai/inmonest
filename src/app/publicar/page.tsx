import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/NavbarServer'
import PublicarWizard from './PublicarWizard'

export const metadata = {
  title: 'Publicar anuncio gratis — Mi Vivienda Libre',
  description: 'Publica tu piso gratis. Sin comisiones, trato directo entre propietario e inquilino.',
}

export default async function PublicarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/publicar')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fef9e8] py-10 px-4">
        <PublicarWizard userId={user.id} />
      </main>
    </>
  )
}
