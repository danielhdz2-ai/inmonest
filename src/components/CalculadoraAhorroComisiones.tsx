'use client'

import { useState } from 'react'

interface ResultadoCalculo {
  precioVenta: number
  comisionAgencia: number
  costoInmonest: number
  ahorroTotal: number
  porcentajeAhorro: number
}

export default function CalculadoraAhorroComisiones() {
  const [precio, setPrecio] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const calcularAhorro = () => {
    const precioVenta = parseFloat(precio.replace(/\./g, '').replace(',', '.'))
    
    if (!precioVenta || precioVenta < 10000) {
      alert('Por favor, introduce un precio de venta válido (mínimo 10,000€)')
      return
    }

    // Comisión típica agencia: 3-5% (usamos 4% como promedio)
    const comisionAgencia = precioVenta * 0.04
    
    // Costo servicio Inmonest (venta completa)
    const costoInmonest = 666
    
    // Ahorro total
    const ahorroTotal = comisionAgencia - costoInmonest
    const porcentajeAhorro = (ahorroTotal / comisionAgencia) * 100

    setResultado({
      precioVenta,
      comisionAgencia,
      costoInmonest,
      ahorroTotal,
      porcentajeAhorro
    })
  }

  const enviarResultado = async () => {
    if (!email || !email.includes('@')) {
      alert('Por favor, introduce un email válido')
      return
    }

    if (!resultado) return

    setLoading(true)

    try {
      // TODO: Integrar con API de email marketing (Mailchimp, Brevo, etc.)
      // Por ahora solo simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Aquí iría la llamada real a tu API
      /*
      await fetch('/api/lead-magnet/calculadora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          precioVenta: resultado.precioVenta,
          ahorroCalculado: resultado.ahorroTotal,
          timestamp: new Date().toISOString()
        })
      })
      */

      setEmailEnviado(true)
      
      // GTM event para tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_captured',
          lead_source: 'calculadora_ahorro',
          lead_value: resultado.ahorroTotal
        })
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Hubo un error al enviar el resultado. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPrecio = (value: string) => {
    // Eliminar caracteres no numéricos
    const numeros = value.replace(/\D/g, '')
    
    // Formatear con puntos de miles
    return numeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    setPrecio(formatPrecio(valor))
    setResultado(null)
    setEmailEnviado(false)
  }

  return (
    <div className="bg-gradient-to-br from-[#fef9e8] to-white rounded-2xl shadow-xl border border-[#c9962a]/20 overflow-hidden">
      <div className="bg-gradient-to-r from-[#c9962a] to-[#a87a20] px-6 py-8 text-center">
        <div className="text-4xl mb-3">💰</div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Calculadora de Ahorro
        </h2>
        <p className="text-white/90 text-sm md:text-base">
          Descubre cuánto ahorras vendiendo sin agencia inmobiliaria
        </p>
      </div>

      <div className="p-6 md:p-8">
        {/* Input precio */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Por cuánto vendes tu piso?
          </label>
          <div className="relative">
            <input
              type="text"
              value={precio}
              onChange={handlePrecioChange}
              placeholder="Ej: 250.000"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-[#c9962a] focus:outline-none transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
              €
            </span>
          </div>
        </div>

        {/* Botón calcular */}
        {!resultado && (
          <button
            onClick={calcularAhorro}
            disabled={!precio}
            className="w-full bg-[#c9962a] text-white font-bold py-4 rounded-lg hover:bg-[#a87a20] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
          >
            Calcular mi ahorro
          </button>
        )}

        {/* Resultado */}
        {resultado && !emailEnviado && (
          <div className="space-y-4">
            {/* Breakdown */}
            <div className="bg-white rounded-xl border-2 border-[#c9962a]/30 p-5 space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Precio de venta</span>
                <span className="font-bold text-gray-900">{formatCurrency(resultado.precioVenta)}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Comisión agencia (4%)</span>
                <span className="font-semibold text-red-600">-{formatCurrency(resultado.comisionAgencia)}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Servicio Inmonest</span>
                <span className="font-semibold text-green-600">-{formatCurrency(resultado.costoInmonest)}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-900">Tu ahorro total</span>
                <span className="font-bold text-2xl text-[#c9962a]">
                  {formatCurrency(resultado.ahorroTotal)}
                </span>
              </div>
            </div>

            {/* Destaque ahorro */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200">
              <div className="text-green-600 text-5xl font-black mb-2">
                {resultado.porcentajeAhorro.toFixed(0)}%
              </div>
              <p className="text-green-800 font-semibold text-lg mb-1">
                de ahorro vs. agencia tradicional
              </p>
              <p className="text-green-700 text-sm">
                Son <strong>{formatCurrency(resultado.ahorroTotal)}</strong> que te quedas tú
              </p>
            </div>

            {/* Captura email */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">📧</div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Recibe un informe detallado gratis
                </h3>
                <p className="text-sm text-gray-600">
                  Te enviamos un PDF con tu cálculo personalizado + guía de venta sin comisiones
                </p>
              </div>
              
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none"
                />
                <button
                  onClick={enviarResultado}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 shadow-lg"
                >
                  {loading ? 'Enviando...' : 'Enviar informe gratuito'}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                🔒 No spam. Solo información útil sobre venta sin comisiones.
              </p>
            </div>

            {/* CTA gestoría */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                ¿Quieres acompañamiento legal completo por solo 666€?
              </p>
              <a
                href="/gestoria/venta-completa-reserva-escritura"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9962a] text-white font-semibold rounded-lg hover:bg-[#a87a20] transition-colors"
              >
                Ver servicio de venta completa →
              </a>
            </div>
          </div>
        )}

        {/* Confirmación envío */}
        {emailEnviado && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Informe enviado!
            </h3>
            <p className="text-gray-600 mb-6">
              Revisa tu bandeja de entrada ({email})<br />
              Te hemos enviado tu cálculo personalizado + guía de venta.
            </p>
            <div className="space-y-3">
              <a
                href="/gestoria/venta-completa-reserva-escritura"
                className="block px-6 py-3 bg-[#c9962a] text-white font-semibold rounded-lg hover:bg-[#a87a20] transition-colors"
              >
                Contratar acompañamiento legal (666€)
              </a>
              <a
                href="/publicar-anuncio"
                className="block px-6 py-3 border-2 border-[#c9962a] text-[#c9962a] font-semibold rounded-lg hover:bg-[#c9962a] hover:text-white transition-colors"
              >
                Publicar mi piso gratis
              </a>
            </div>
          </div>
        )}

        {/* Beneficios */}
        {!resultado && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-center">
              Con Inmonest ahorras miles de euros
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: '💸', text: 'Sin comisiones' },
                { icon: '📋', text: 'Contratos legales' },
                { icon: '👨‍⚖️', text: 'Asesor personal' },
                { icon: '⚡', text: 'Proceso rápido' }
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-100">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
