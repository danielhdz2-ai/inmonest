import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { safeInternalPath } from '@/lib/gestoria-leads'
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
        const next = safeInternalPath(params.next)
        if (next) redirect(next)
        if (isAdminEmail(user.email)) redirect('/admin')
        redirect('/mi-cuenta')
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
