import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sanitizeNextPathForUser } from '@/lib/auth-redirect'
import { resolvePostLoginRedirect } from '@/lib/post-login-redirect'
import LoginForm from './LoginForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; signed_out?: string }>
}) {
  const params = await searchParams
  const signedOut = params.signed_out === '1'

  let existingUser: { id: string; email: string } | null = null
  if (!signedOut) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        existingUser = { id: user.id, email: user.email }
      }
    } catch {
      /* Supabase no disponible: mostrar formulario */
    }
  }

  if (existingUser) {
    const safeNext = sanitizeNextPathForUser(existingUser.email, params.next ?? null)
    redirect(await resolvePostLoginRedirect(existingUser.id, existingUser.email, safeNext))
  }

  return (
    <Suspense fallback={<div className="w-full max-w-sm h-96 animate-pulse bg-gray-100 rounded-2xl" />}>
      <LoginForm />
    </Suspense>
  )
}
