'use client'

import { getDocsPreviewForService } from '@/lib/gestoria-service-docs'
import { getServiceDisplayName, getServicePrice } from '@/lib/gestoria-leads'

export type LeadContrato = {
  id: string
  service_key: string
  service_name: string | null
  client_name: string | null
  amount_eur: number | null
  status: string
  paid_at: string | null
  created_at?: string | null
}

type Props = {
  lead: LeadContrato
  paying: boolean
  onPay: () => void
}

export default function GestoriaLeadPanel({ lead, paying, onPay }: Props) {
  const serviceName = lead.service_name ?? getServiceDisplayName(lead.service_key)
  const price = lead.amount_eur ?? getServicePrice(lead.service_key) ?? 145
  const docs = getDocsPreviewForService(lead.service_key)

  return (
    <div className="bg-white rounded-2xl border-2 border-gold-300 overflow-hidden shadow-sm -mx-1 sm:mx-0">
      <div className="bg-gradient-to-r from-[#fdf8ee] to-white px-4 sm:px-6 py-4 sm:py-5 border-b border-gold-300/60">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-cream-100 border border-gold-300 px-2.5 py-1 rounded-full mb-2">
          Pendiente de contratar
        </span>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{serviceName}</h2>
            {lead.client_name && (
              <p className="text-sm text-gray-500 mt-1">Hola, {lead.client_name}</p>
            )}
          </div>
          <div className="sm:text-right flex-shrink-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-gold-500">{price} €</p>
            <p className="text-xs text-gray-400">IVA incluido</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
          <p className="font-semibold mb-1">Tu área de gestoría</p>
          <p className="text-blue-800/90 leading-relaxed text-xs sm:text-sm">
            Contrata cuando quieras y sube la documentación desde el móvil — o envíala a{' '}
            <a href="mailto:info@inmonest.com" className="underline font-medium">info@inmonest.com</a>.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">Documentos que pediremos</h3>
          <ul className="space-y-2">
            {docs.map((d) => (
              <li
                key={d.key}
                className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-3 border border-gray-100 min-h-[48px]"
              >
                <span className="text-lg flex-shrink-0">{d.icon}</span>
                <span className="flex-1 leading-snug">{d.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={onPay}
            disabled={paying}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gold-500 active:bg-[#b8841e] disabled:opacity-60 text-white font-bold min-h-[52px] px-6 rounded-xl transition-colors shadow-md touch-manipulation"
          >
            {paying ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Redirigiendo al pago…
              </>
            ) : (
              <>Contratar — {price} €</>
            )}
          </button>
          <a
            href="https://wa.me/34745022862?text=Hola,%20tengo%20dudas%20sobre%20gestoría%20Inmonest"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#25D366] bg-[#25D366]/10 text-[#128C7E] font-semibold min-h-[52px] px-6 rounded-xl active:bg-[#25D366]/20 touch-manipulation"
          >
            WhatsApp
          </a>
        </div>

        <a
          href="tel:+34745022862"
          className="block w-full text-center text-sm text-gold-500 font-semibold min-h-[44px] leading-[44px] touch-manipulation"
        >
          O llama al 745 022 862
        </a>
      </div>
    </div>
  )
}
