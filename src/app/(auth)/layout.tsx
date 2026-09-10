import type { ReactNode } from 'react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Columna izquierda: marketing ────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] flex-col relative overflow-hidden bg-[#0f1a12]">

        {/* Imagen de fondo completa */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/interior3.jpg"
          alt="Gestoría inmobiliaria online para particulares"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay oscuro degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/65" />

        {/* Contenido sobre las imágenes */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">

          {/* Logo */}
          <Link href="/" className="w-fit mb-auto">
            <span className="text-3xl font-black tracking-tight leading-none">
              <span className="text-white">Inmo</span><span className="text-gold-500">nest</span>
            </span>
          </Link>

          {/* Texto central */}
          <div className="py-12">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">Gestoría inmobiliaria para particulares</p>
            <h1 className="text-white text-4xl xl:text-5xl font-black leading-tight mb-6">
              Trámites inmobiliarios<br />desde 61 € en 48 h
            </h1>
            <p className="text-gray-300 text-base xl:text-lg leading-relaxed mb-10 max-w-md">
              Inmonest es <strong className="text-white">gestoría inmobiliaria online</strong> para compradores,
              vendedores e inquilinos que operan entre particulares. Redactamos contratos, revisamos documentación
              y te acompañamos hasta la firma — precio cerrado, sin comisiones sobre el inmueble.
            </p>

            {/* Trámites */}
            <div className="grid grid-cols-1 gap-4 max-w-md">
              {[
                { title: 'Contrato de arras penitenciales', desc: 'Señal de compraventa con cláusulas legales, condición de hipoteca y revisión registral.' },
                { title: 'Contrato de alquiler LAU', desc: 'Fianza, inventario, actualización de renta y normativa autonómica adaptada a tu ciudad.' },
                { title: 'Reserva de compra o alquiler', desc: 'Bloqueo jurídico del inmueble mientras preparas las arras o el contrato definitivo.' },
                { title: 'Compraventa hasta escritura', desc: 'Acompañamiento completo: reserva, arras, documentación y coordinación con notaría.' },
                { title: 'Revisión y corrección de contratos', desc: 'Análisis de cláusulas abusivas antes de firmar o entregar la fianza.' },
              ].map((s) => (
                <div key={s.title} className="flex gap-3 items-start">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                  <div>
                    <p className="text-white font-semibold text-sm">{s.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-xs mt-auto">
            © {new Date().getFullYear()} Inmonest · Gestoría inmobiliaria online
          </p>
        </div>
      </div>

      {/* ── Columna derecha: formulario ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 bg-gradient-to-br from-[#fef9e8] to-white">

        {/* Mini header móvil */}
        <header className="flex lg:hidden p-5">
          <Link href="/" className="flex items-center w-fit">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-[#1a0d00]">Inmo</span><span className="text-gold-500">nest</span>
            </span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          {children}
        </main>

        <footer className="flex lg:hidden text-center text-xs text-gray-400 py-4 justify-center">
          © {new Date().getFullYear()} Inmonest · Gestoría inmobiliaria online
        </footer>
      </div>

    </div>
  )
}

