import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DebugSessionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const adminEmail = process.env.CONTACT_NOTIFY_EMAIL

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Debug de Sesión</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-sm text-gray-500 mb-1">Email actual logueado:</p>
            <p className="text-lg font-mono font-bold text-blue-600">{user.email}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-500 mb-1">Email admin configurado:</p>
            <p className="text-lg font-mono font-bold text-green-600">{adminEmail || 'No configurado'}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-500 mb-1">¿Coinciden?</p>
            <p className={`text-lg font-bold ${user.email === adminEmail ? 'text-green-600' : 'text-red-600'}`}>
              {user.email === adminEmail ? '✅ SÍ - Tienes acceso admin' : '❌ NO - Sin acceso admin'}
            </p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-500 mb-1">Proveedor de autenticación:</p>
            <p className="text-lg font-bold text-purple-600">
              {user.app_metadata?.provider || 'email'}
            </p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-500 mb-1">Email confirmado:</p>
            <p className={`text-lg font-bold ${user.email_confirmed_at ? 'text-green-600' : 'text-red-600'}`}>
              {user.email_confirmed_at ? '✅ Sí' : '❌ No'}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">Metadatos del usuario:</p>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a 
            href="/admin" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Ir a Admin
          </a>
          <a 
            href="/mi-cuenta" 
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
          >
            Mi Cuenta
          </a>
        </div>
      </div>
    </div>
  )
}
