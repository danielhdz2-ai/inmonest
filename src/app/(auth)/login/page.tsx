import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
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

  if (!signedOut) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        redirect(await resolvePostLoginRedirect(user.id, user.email, params.next))
      }
    } catch {
      /* mostrar formulario de login */
    }
  }

  return (
    <Suspense fallback={<div className="w-full max-w-sm h-96 animate-pulse bg-gray-100 rounded-2xl" />}>
      <LoginForm />
    </Suspense>
  )
}
