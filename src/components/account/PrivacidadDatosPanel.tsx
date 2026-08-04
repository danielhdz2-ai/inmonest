'use client'

import Link from 'next/link'

type Props = {
  email: string
  /** Panel gestoría: énfasis en documentos legales subidos */
  variant?: 'gestoria' | 'portal'
  deleteAccountForm?: React.ReactNode
}

const LEGAL_LINKS = [
  {
    href: '/privacidad',
    title: 'Política de privacidad',
    desc: 'Cómo recopilamos, usamos y protegemos tus datos (RGPD).',
    icon: '🔒',
  },
  {
    href: '/cookies',
    title: 'Política de cookies',
    desc: 'Qué cookies usa Inmonest y cómo gestionarlas.',
    icon: '🍪',
  },
  {
    href: '/aviso-legal',
    title: 'Aviso legal',
    desc: 'Condiciones de uso del sitio web y servicios de Inmonest.',
    icon: '📋',
  },
] as const

const RGPD_RIGHTS = [
  { label: 'Acceso', text: 'Saber qué datos tuyos tratamos.' },
  { label: 'Rectificación', text: 'Corregir datos incorrectos o incompletos.' },
  { label: 'Supresión', text: 'Solicitar la eliminación («derecho al olvido»).' },
  { label: 'Portabilidad', text: 'Recibir tus datos en formato legible.' },
  { label: 'Oposición', text: 'Oponerte a tratamientos basados en interés legítimo.' },
  { label: 'Limitación', text: 'Restringir el tratamiento en casos previstos por ley.' },
] as const

function LegalLinkRow({
  href,
  title,
  desc,
  icon,
}: {
  href: string
  title: string
  desc: string
  icon: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold-500/40 hover:bg-cream-100/50 transition-colors group min-h-[72px] touch-manipulation"
    >
      <span className="text-2xl flex-shrink-0 w-10 text-center" aria-hidden>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-gold-700">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <svg
        className="w-5 h-5 text-gray-300 group-hover:text-gold-500 flex-shrink-0 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export default function PrivacidadDatosPanel({
  email,
  variant = 'gestoria',
  deleteAccountForm,
}: Props) {
  const isGestoria = variant === 'gestoria'

  return (
    <div className="space-y-5">
      {/* Banner Inmonest */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1008] to-forest-900 p-5 sm:p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,150,42,0.2),transparent)]" />
        <div className="relative flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4d98a]">Inmonest</p>
            <h2 className="text-base sm:text-lg font-bold mt-1">Protección de tus datos</h2>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              {isGestoria
                ? 'Tratamos tus datos personales y los documentos que subes (DNI, contratos, escrituras) con la máxima confidencialidad, conforme al RGPD y la LOPDGDD.'
                : 'Inmonest trata tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y la legislación española vigente.'}
            </p>
          </div>
        </div>
      </div>

      {/* Tratamiento documentos gestoría */}
      {isGestoria && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Tratamiento de documentos</h3>
          <p className="text-sm text-gray-500 mb-4">
            Información específica sobre los archivos que subes a tu expediente de gestoría.
          </p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="text-gold-500 flex-shrink-0">✓</span>
              <span>
                <strong className="text-gray-800">Finalidad:</strong> redacción y gestión del servicio contratado
                (contratos de arras, alquiler, due diligence, etc.).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-500 flex-shrink-0">✓</span>
              <span>
                <strong className="text-gray-800">Almacenamiento:</strong> servidores seguros en la UE (Supabase),
                con acceso restringido solo a tu cuenta y al equipo autorizado de Inmonest.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-500 flex-shrink-0">✓</span>
              <span>
                <strong className="text-gray-800">Conservación:</strong> mientras dure el expediente y el plazo legal
                aplicable. Tras la baja de cuenta, el acceso al panel se desactiva; los expedientes contractuales se
                conservan según obligaciones legales.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-500 flex-shrink-0">✓</span>
              <span>
                <strong className="text-gray-800">Pagos:</strong> los datos bancarios los procesa Stripe (certificado
                PCI DSS). Inmonest no almacena números completos de tarjeta.
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Enlaces legales */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Políticas y documentos legales</h3>
        <p className="text-sm text-gray-500 mb-4">Consulta la información oficial de Inmonest sobre privacidad y datos.</p>
        <div className="space-y-2">
          {LEGAL_LINKS.map((link) => (
            <LegalLinkRow key={link.href} {...link} />
          ))}
        </div>
      </div>

      {/* Derechos RGPD */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Tus derechos</h3>
        <p className="text-sm text-gray-500 mb-4">
          Puedes ejercerlos escribiendo a{' '}
          <a href="mailto:info@inmonest.com" className="text-gold-500 font-medium hover:underline">
            info@inmonest.com
          </a>{' '}
          desde <strong className="text-gray-700">{email}</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RGPD_RIGHTS.map((r) => (
            <div key={r.label} className="rounded-xl bg-cream-100/60 border border-[#f0dfa0]/50 px-3 py-2.5">
              <p className="text-xs font-bold text-gold-700">{r.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{r.text}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          También puedes reclamar ante la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-500 hover:underline"
          >
            Agencia Española de Protección de Datos (AEPD)
          </a>
          .
        </p>
      </div>

      {/* Responsable */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-600">
        <p>
          <strong className="text-gray-800">Responsable del tratamiento:</strong> Inmonest ·{' '}
          <a href="mailto:info@inmonest.com" className="text-gold-500 hover:underline">
            info@inmonest.com
          </a>
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Última actualización de las políticas: abril de 2026. Inmonest te notificará cambios relevantes por email
          o aviso en el panel.
        </p>
      </div>

      {deleteAccountForm}
    </div>
  )
}
