'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { gtmPush } from '@/components/GTMProvider'
import { precioPorNombreServicio } from '@/lib/gestoria-precios-ui'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [data, setData] = useState<{ service_name: string; customer_email: string } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setStatus('error')
      setError('No se encontró el ID de sesión')
      return
    }

    // Verificar el pago con el backend
    fetch(`/api/gestoria/confirm-payment?session_id=${sessionId}`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          setData(result)
          setStatus('success')
          
          // Extraer precio del nombre del servicio o usar valor por defecto
          const price = extractPriceFromService(result.service_name) || 100
          
          // Google Ads conversion tracking: PURCHASE
          gtmPush({
            event: 'purchase',
            ecommerce: {
              transaction_id: sessionId,
              value: price,
              currency: 'EUR',
              items: [{
                item_name: result.service_name,
                price: price,
                quantity: 1
              }]
            }
          })
          
          // También enviamos el evento de conversión directo
          gtmPush({
            event: 'conversion',
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Reemplazar con tu ID real
            value: price,
            currency: 'EUR',
            transaction_id: sessionId
          })
        } else {
          setStatus('error')
          setError(result.error || 'Error al verificar el pago')
        }
      })
      .catch(err => {
        setStatus('error')
        setError('Error de conexión')
        console.error(err)
      })
  }, [searchParams])

  // Helper para extraer precio del nombre del servicio
  const extractPriceFromService = (serviceName: string): number | null => {
    return precioPorNombreServicio(serviceName) ?? null
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gold-300 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">Verificando tu pago...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error en el pago</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/gestoria" 
            className="inline-block bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition-colors"
          >
            Volver a gestoría
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-800 to-forest-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header de éxito */}
        <div className="bg-gradient-to-r from-cream-500 to-gold-600 px-8 py-10 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">¡Pago confirmado!</h1>
          <p className="text-green-50 text-lg">Tu solicitud se ha procesado correctamente</p>
        </div>

        {/* Contenido */}
        <div className="px-8 py-10">
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Servicio contratado</h2>
            <p className="text-xl font-bold text-gray-900 mb-4">{data?.service_name}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Confirmación enviada a: <strong>{data?.customer_email}</strong></span>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold text-gray-900">📋 Próximos pasos</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold text-gray-900">Revisa tu email</p>
                  <p className="text-sm text-gray-600">Recibirás un email con las instrucciones para subir la documentación necesaria.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold text-gray-900">Sube tu documentación</p>
                  <p className="text-sm text-gray-600">Adjunta los documentos que necesitamos para redactar tu contrato.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-semibold text-gray-900">Recibe tu contrato</p>
                  <p className="text-sm text-gray-600">En menos de 48h recibirás tu contrato redactado por nuestros abogados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/" 
              className="flex-1 text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Volver al inicio
            </Link>
            <Link 
              href="/gestoria" 
              className="flex-1 text-center bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition-colors"
            >
              Ver más servicios
            </Link>
          </div>

          {/* Soporte */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">¿Necesitas ayuda?</p>
            <a 
              href="mailto:soporte@inmonest.com" 
              className="text-gold-500 font-semibold hover:underline"
            >
              soporte@inmonest.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ✅ Wrapper con Suspense para evitar error de prerender
export default function ConfirmacionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gold-300 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <ConfirmacionContent />
    </Suspense>
  )
}
