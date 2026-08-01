import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

/**
 * Cierra sesión de verdad: invalida cookies en la respuesta de redirect.
 * El createClient() del server.ts no puede escribir cookies en route handlers.
 */
export async function POST(request: NextRequest) {
  const { origin } = new URL(request.url)
  let response = NextResponse.redirect(`${origin}/login?signed_out=1`, { status: 302 })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  await supabase.auth.signOut({ scope: 'global' })

  // Evitar caché de páginas autenticadas tras cerrar sesión
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.headers.set('Pragma', 'no-cache')

  return response
}
