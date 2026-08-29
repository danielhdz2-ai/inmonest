'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FirmaCertIncluidaSection from '@/components/FirmaCertIncluidaSection'
import AgenciaPackActionModal from './AgenciaPackActionModal'
import AgenciaContratosIndependientesModal from './AgenciaContratosIndependientesModal'
import AgenciaGestoriaPanelDemo from './AgenciaGestoriaPanelDemo'
import AgenciasConfianSection from './AgenciasConfianSection'
import AgenciasCasosSection from './AgenciasCasosSection'
import AgenciasAudienciasSection from './AgenciasAudienciasSection'
import AgenciasGestoriaCiudadesNav from './AgenciasGestoriaCiudadesNav'
import AgenciasGestoriaMercadoLocal from './AgenciasGestoriaMercadoLocal'
import type { AgenciaGestoriaCiudadConfig } from '@/lib/agencias-gestoria-ciudades'
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
import { AGENCIA_CONTRATO_PRECIO_B2B } from '@/lib/agencias-gestoria-contratos'

type Props = {
  ciudad?: AgenciaGestoriaCiudadConfig
  /** 'gestoria' = /gestoria/{ciudad}/agencias · 'agencias' = /agencias/gestoria/{ciudad} */
  urlTree?: 'agencias' | 'gestoria'
}

export default function AgenciasGestoriaContent({ ciudad, urlTree = 'agencias' }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedPack, setSelectedPack] = useState<AgenciaGestoriaPack | null>(null)
  const [showContratosModal, setShowContratosModal] = useState(false)
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

  const faqs = ciudad
    ? [...AGENCIA_GESTORIA_FAQ, ...ciudad.faqExtra]
    : [...AGENCIA_GESTORIA_FAQ]

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden text-white py-20 sm:py-24 px-4">
        <Image
          src={ciudad?.heroImage ?? '/gestoria10.jpg'}
          alt={ciudad?.heroImageAlt ?? 'Gestoría inmobiliaria para agencias'}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1410]/90 via-[#0a1410]/75 to-[#0a1410]/60" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/50 mb-6">
            {urlTree === 'gestoria' ? (
              <>
                <Link href="/gestoria" className="hover:text-gold-300 transition-colors">
                  Gestoría
                </Link>
                {ciudad && (
                  <>
                    <span>/</span>
                    <Link
                      href={`/gestoria/${ciudad.slug}`}
                      className="hover:text-gold-300 transition-colors"
                    >
                      {ciudad.nombre}
                    </Link>
                    <span>/</span>
                    <span className="text-white/90">Contratos agencias</span>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/agencias" className="hover:text-gold-300 transition-colors">
                  Portal agencias
                </Link>
                <span>/</span>
                <Link href="/agencias/gestoria" className="hover:text-gold-300 transition-colors">
                  Gestoría B2B
                </Link>
                {ciudad && (
                  <>
                    <span>/</span>
                    <span className="text-white/90">{ciudad.nombre}</span>
                  </>
                )}
              </>
            )}
          </nav>
          <span className="inline-block bg-gold-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            {urlTree === 'gestoria' && ciudad
              ? `Contratos para agencias · ${ciudad.nombre}`
              : `Gestoría B2B${ciudad ? ` · ${ciudad.nombre}` : ''}`}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            {ciudad ? (
              urlTree === 'gestoria' ? (
                <>
                  Contratos para agencias inmobiliarias en{' '}
                  <span className="text-gold-300">{ciudad.nombre}</span>
                </>
              ) : (
                <>
                  Gestoría inmobiliaria para agencias en{' '}
                  <span className="text-gold-300">{ciudad.nombre}</span>
                </>
              )
            ) : (
              <>
                Gestoría inmobiliaria B2B para APIs, autónomos y agencias desde{' '}
                <span className="text-gold-300">{AGENCIA_CONTRATO_PRECIO_B2B} €</span>
              </>
            )}
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mb-8 leading-relaxed">
            {ciudad?.heroLead ?? (
              <>
                Contratos de arras, alquiler LAU y compraventa redactados por gestor. Packs anuales o
                contrato suelto sin compromiso. Entrega en{' '}
                <strong className="text-white">{AGENCIA_SLA_HORAS}</strong> y firma electrónica FIRMACERT
                incluida. Usado por Tecnocasa, Inmo Sants, Interhouse y más.
              </>
            )}
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
              Ver tarifas
            </a>
            <button
              type="button"
              onClick={() => setShowContratosModal(true)}
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full text-center hover:bg-white/10 transition-colors"
            >
              Contrato suelto · {AGENCIA_CONTRATO_PRECIO_B2B} €
            </button>
          </div>
        </div>
      </section>

      <AgenciasConfianSection
        filterIds={ciudad?.confianzaIds}
        titulo={
          ciudad
            ? `Agencias en ${ciudad.nombre} que confían en Inmonest`
            : undefined
        }
      />

      {ciudad ? <AgenciasGestoriaMercadoLocal ciudad={ciudad} /> : null}

      <AgenciasAudienciasSection />

      {/* Packs */}
      <section id="packs" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Elige tu tarifa B2B</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Tres packs anuales con créditos o contrato suelto sin pack. Todos incluyen redacción por gestor,
              entrega en {AGENCIA_SLA_HORAS} y firma electrónica certificada.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {AGENCIA_GESTORIA_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col ${
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
                <h3 className={`text-lg font-bold mb-1 ${pack.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {pack.nombre}
                </h3>
                <p className={`text-sm mb-4 ${pack.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pack.idealPara}
                </p>
                <div className="mb-1">
                  <span className={`text-3xl font-black ${pack.highlight ? 'text-gold-300' : 'text-gold-500'}`}>
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
                <p className={`text-xs mb-5 ${pack.highlight ? 'text-gold-400' : 'text-green-600'}`}>
                  Ahorras {agenciaDescuentoPct(pack.precioUnitario)} % vs retail ({AGENCIA_CONTRATO_PRECIO_REF} €)
                </p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {pack.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-xs ${
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

            {/* Cuarta tarjeta: contrato suelto sin pack */}
            <div className="rounded-2xl p-6 sm:p-7 flex flex-col bg-white border-2 border-dashed border-gold-300 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-gold-700 text-xs font-bold px-4 py-1 rounded-full border border-gold-300">
                Sin compromiso
              </span>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-gold-600">
                Autónomos y prueba
              </p>
              <h3 className="text-lg font-bold mb-1 text-gray-900">Contrato suelto</h3>
              <p className="text-sm mb-4 text-gray-500">
                Sin pack anual. Compra solo cuando lo necesites: arras, alquiler LAU, temporada…
              </p>
              <div className="mb-1">
                <span className="text-3xl font-black text-gold-500">{AGENCIA_CONTRATO_PRECIO_B2B} €</span>
                <span className="text-sm ml-1 text-gray-400">/contrato</span>
              </div>
              <p className="text-sm mb-1 text-gray-600">
                Pago único · sin suscripción
              </p>
              <p className="text-xs mb-5 text-green-600">
                Ahorras {Math.round((1 - AGENCIA_CONTRATO_PRECIO_B2B / AGENCIA_CONTRATO_PRECIO_REF) * 100)} % vs precio público ({AGENCIA_CONTRATO_PRECIO_REF} €)
              </p>
              <ul className="space-y-1.5 mb-6 flex-1">
                {[
                  AGENCIA_SLA_HORAS + ' de entrega',
                  'FirmaCert eIDAS incluida',
                  '6 tipos de contrato disponibles',
                  'Ideal para probar antes del pack',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowContratosModal(true)}
                className="block w-full text-center py-3 rounded-full font-semibold text-sm bg-gold-500 text-white hover:bg-gold-600 transition-colors"
              >
                Comprar contrato suelto →
              </button>
            </div>
          </div>
        </div>
      </section>

      <AgenciasCasosSection
        casos={ciudad?.casos}
        titulo={
          ciudad
            ? `Agencias en ${ciudad.nombre} que ya operan con nosotros`
            : undefined
        }
        subtitulo={
          ciudad
            ? `Casos reales de inmobiliarias, APIs y autónomos en ${ciudad.nombre} y ${ciudad.region}.`
            : undefined
        }
      />

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
            {faqs.map((faq, i) => (
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

      {showContratosModal && (
        <AgenciaContratosIndependientesModal onClose={() => setShowContratosModal(false)} />
      )}

      <AgenciasGestoriaCiudadesNav current={ciudad?.slug} urlTree={urlTree} />

      <section className="bg-white border-t border-gray-100 py-10 px-4 text-center">
        <p className="text-gray-600 text-sm">
          ¿Ya publicas en Inmonest?{' '}
          <Link href="/agencias" className="text-gold-600 font-semibold hover:underline">
            Ver planes de portal
          </Link>
        </p>
      </section>
    </main>
  )
}
