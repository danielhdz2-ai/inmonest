import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail, emailBienvenida } from '@/lib/email'
import { safeInternalPath } from '@/lib/gestoria-leads'
import { resolvePostLoginRedirect } from '@/lib/post-login-redirect'
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // El parámetro next se ignorará si el usuario es admin
  const next = searchParams.get('next')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      const user = data.user
      const nombre = (user.user_metadata?.full_name as string | undefined) ?? 'Usuario'
      const email  = user.email ?? ''

      // Enviar bienvenida solo la primera vez (cuando se confirma el email)
      // Detectamos "primera vez" si email_confirmed_at acaba de establecerse
      const creadoHace = Date.now() - new Date(user.created_at).getTime()
      const esNuevo = creadoHace < 10 * 60 * 1000 // menos de 10 minutos

      if (esNuevo && email) {
        sendEmail({
          to: email,
          subject: `¡Bienvenido a Inmonest, ${nombre}! 🎉`,
          html: emailBienvenida(nombre, email),
        }).catch(() => { /* no crítico */ })
      }

      const nextPath = safeInternalPath(next)
      let redirectUrl: string
      if (nextPath) {
        redirectUrl = nextPath
      } else {
        redirectUrl = await resolvePostLoginRedirect(user.id, email)
      }
      return NextResponse.redirect(`${origin}${redirectUrl}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
