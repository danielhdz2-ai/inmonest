'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FirmaCertIncluidaSection from '@/components/FirmaCertIncluidaSection'
import AgenciaPackActionModal from './AgenciaPackActionModal'
import AgenciaGestoriaPanelDemo from './AgenciaGestoriaPanelDemo'
import {
  AGENCIA_CONTRATOS_INCLUIDOS,
  AGENCIA_CONTRATO_PRECIO_REF,
  AGENCIA_GESTORIA_FAQ,
  AGENCIA_GESTORIA_PACKS,
  AGENCIA_GESTORIA_WORKFLOW,
  AGENCIA_SLA_HORAS,
  agenciaDescuentoPct,
  type AgenciaGestoriaPack,
} from '@/lib/agencias-gestoria-packs'

export default function AgenciasGestoriaContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedPack, setSelectedPack] = useState<AgenciaGestoriaPack | null>(null)
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: '',
    plan: 'agencia',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/agencias/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          plan: `gestoria-${form.plan}`,
          mensaje: form.mensaje || `Solicitud pack gestoría: ${form.plan}`,
        }),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch {
      setError('Hubo un problema al enviar. Escríbenos a info@inmonest.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden text-white py-20 sm:py-24 px-4">
        <Image
          src="/gestoria10.jpg"
          alt="Gestoría inmobiliaria para agencias"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1410]/90 via-[#0a1410]/75 to-[#0a1410]/60" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/agencias"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-gold-300 mb-6 transition-colors"
          >
            ← Portal para agencias
          </Link>
          <span className="inline-block bg-gold-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Gestoría B2B
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            Contratos profesionales para tu agencia desde{' '}
            <span className="text-gold-300">110 €</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mb-8 leading-relaxed">
            Packs anuales para agencias y agentes independientes. Redacción por gestor, entrega en{' '}
            <strong className="text-white">{AGENCIA_SLA_HORAS}</strong> y firma electrónica certificada
            FIRMACERT incluida. Mismo panel, mismo flujo — precio de profesional.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              `${AGENCIA_SLA_HORAS} de entrega`,
              'FirmaCert eIDAS incluida',
              'Desde 110 €/contrato',
              `vs ${AGENCIA_CONTRATO_PRECIO_REF} € retail`,
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/90"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packs"
              className="px-8 py-4 bg-gold-500 text-white font-bold rounded-full text-center hover:bg-gold-600 transition-colors"
            >
              Ver packs
            </a>
            <a
              href="#contactar"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full text-center hover:bg-white/10 transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </section>

      {/* Packs */}
      <section id="packs" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Packs anuales de contratos</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Elige el volumen que encaje con tu operativa. Todos incluyen redacción por gestor, entrega en{' '}
              {AGENCIA_SLA_HORAS} y firma electrónica certificada.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {AGENCIA_GESTORIA_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-2xl p-8 flex flex-col ${
                  pack.highlight
                    ? 'bg-gray-900 text-white ring-2 ring-[#c9962a] shadow-xl relative'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {pack.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Recomendado
                  </span>
                )}
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                    pack.highlight ? 'text-gold-400' : 'text-gold-600'
                  }`}
                >
                  {pack.subtitulo}
                </p>
                <h3 className={`text-xl font-bold mb-1 ${pack.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {pack.nombre}
                </h3>
                <p className={`text-sm mb-5 ${pack.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pack.idealPara}
                </p>
                <div className="mb-1">
                  <span className={`text-4xl font-black ${pack.highlight ? 'text-gold-300' : 'text-gold-500'}`}>
                    {pack.precioUnitario} €
                  </span>
                  <span className={`text-sm ml-1 ${pack.highlight ? 'text-gray-400' : 'text-gray-400'}`}>
                    /contrato
                  </span>
                </div>
                <p className={`text-sm mb-1 ${pack.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                  {pack.contratosAnuales} contratos/año ·{' '}
                  <strong>{pack.precioTotal.toLocaleString('es-ES')} €</strong> total
                </p>
                <p className={`text-xs mb-6 ${pack.highlight ? 'text-gold-400' : 'text-green-600'}`}>
                  Ahorras {agenciaDescuentoPct(pack.precioUnitario)} % vs precio público ({AGENCIA_CONTRATO_PRECIO_REF} €)
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {pack.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${
                        pack.highlight ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setSelectedPack(pack)}
                  className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    pack.highlight
                      ? 'bg-gold-500 text-white hover:bg-gold-600'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Solicitar {pack.nombre}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contratos incluidos */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1 crédito = 1 contrato profesional</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Cada crédito del pack cubre la redacción completa de uno de estos documentos, con PDF firmable
              y FirmaCert incluida. El gestor adapta cláusulas a la operación concreta.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {AGENCIA_CONTRATOS_INCLUIDOS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold-200 bg-[#fdfbf5] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">Comparativa rápida</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gold-100">
                <span className="text-sm text-gray-600">Particular (sin pack)</span>
                <span className="font-bold text-gray-900">{AGENCIA_CONTRATO_PRECIO_REF} € · 48 h</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gold-100">
                <span className="text-sm text-gray-600">Agencia con pack</span>
                <span className="font-bold text-gold-700">110–113 € · {AGENCIA_SLA_HORAS}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">FirmaCert eIDAS</span>
                <span className="font-bold text-green-700">Incluida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Cómo funciona</h2>
          <p className="text-center text-gray-500 text-sm mb-12 max-w-xl mx-auto">
            El mismo flujo que ya usan los particulares: compra, documentación, panel del gestor y entrega.
            Con pack activo, tu operación entra en cola prioritaria.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {AGENCIA_GESTORIA_WORKFLOW.map((item) => (
              <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="text-3xl font-black text-gray-100 mb-2">{item.step}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AgenciaGestoriaPanelDemo />

      <FirmaCertIncluidaSection />

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {AGENCIA_GESTORIA_FAQ.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm text-gray-900">{faq.q}</span>
                  <span className="text-gold-500 text-xl flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contactar" className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Activa tu pack</h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            Te contactamos en 24 h para verificar tu agencia y activar el pack con acceso al panel.
          </p>
          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-green-800 mb-2">¡Solicitud recibida!</h3>
              <p className="text-green-700 text-sm">Te contactaremos en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre *</label>
                  <input
                    required
                    value={form.nombre}
                    onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Agencia / Marca *</label>
                  <input
                    required
                    value={form.empresa}
                    onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Teléfono</label>
                  <input
                    value={form.telefono}
                    onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pack de interés</label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                >
                  {AGENCIA_GESTORIA_PACKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} — {p.contratosAnuales} contratos ({p.precioTotal.toLocaleString('es-ES')} €/año)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Operativa (opcional)</label>
                <textarea
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                  placeholder="Ej: 4 alquileres y 2 arras al mes en Valencia..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 bg-gold-500 text-white font-bold rounded-full text-sm hover:bg-gold-600 transition-colors disabled:opacity-60"
              >
                {sending ? 'Enviando…' : 'Solicitar activación del pack →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {selectedPack && (
        <AgenciaPackActionModal pack={selectedPack} onClose={() => setSelectedPack(null)} />
      )}

      <section className="bg-gray-900 text-white py-10 px-4 text-center">
        <p className="text-gray-400 text-sm">
          ¿Ya publicas en Inmonest?{' '}
          <Link href="/agencias" className="text-gold-300 font-semibold hover:underline">
            Ver planes de portal
          </Link>
          {' · '}
          <Link href="/gestoria/solicitar" className="text-gold-300 font-semibold hover:underline">
            Contratar contrato suelto
          </Link>
        </p>
      </section>
    </main>
  )
}
