import Image from 'next/image'
import Link from 'next/link'
import FooterGestoriaContact from '@/components/FooterGestoriaContact'

const CIUDADES = [
  { slug: 'madrid',    nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia',  nombre: 'Valencia' },
  { slug: 'sevilla',   nombre: 'Sevilla' },
  { slug: 'malaga',    nombre: 'Málaga' },
  { slug: 'bilbao',    nombre: 'Bilbao' },
  { slug: 'zaragoza',  nombre: 'Zaragoza' },
  { slug: 'alicante',  nombre: 'Alicante' },
]

const SERVICIOS_CIUDAD = [
  { titulo: 'Contratos de Arras',       ruta: 'contrato-arras' },
  { titulo: 'Contratos de Alquiler',    ruta: 'contrato-alquiler' },
  { titulo: 'Alquiler de Particulares', ruta: 'alquiler-particulares' },
  { titulo: 'Alquiler sin Agencia',     ruta: 'alquiler-sin-agencia' },
]

const SELLOS_CONFIANZA = [
  { src: '/sellos-confianza/Sello-Confianza-Online.png', alt: 'Sello Confianza Online', w: 140, h: 56 },
  { src: '/sellos-confianza/pyme_innovadora_meic-SP_web.png', alt: 'Pyme Innovadora MEIC', w: 120, h: 56 },
  { src: '/sellos-confianza/efqm500.png', alt: 'EFQM Recognised', w: 72, h: 56 },
  { src: '/sellos-confianza/RGPD.jpg', alt: 'Cumplimiento RGPD', w: 72, h: 56 },
  { src: '/sellos-confianza/api.jpg', alt: 'Agente de la Propiedad Inmobiliaria (API)', w: 72, h: 56 },
  { src: '/sellos-confianza/banner-consejo.jpg', alt: 'Consejo General de Colegios de Gestores Administrativos de España', w: 160, h: 56 },
  { src: '/sellos-confianza/Logo-ICAB-2023-scaled.jpg', alt: 'Ilustre Colegio de la Abogacía de Barcelona (ICAB)', w: 100, h: 56 },
]

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0d1a0f] text-white">

      {/* ── Separador dorado ───────────────────────────────────── */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#c9962a] to-transparent" />

      {/* ── SERVICIOS DE GESTORÍA ───────────────────────────────── */}
      <div className="border-b border-white/10 px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#c9962a]">
            Servicios de Gestoría
          </p>
          <Link 
            href="/gestoria/ciudades" 
            className="text-xs text-[#c9962a] hover:text-[#f4c94a] transition-colors flex items-center gap-1"
          >
            Ver todos los servicios →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-4">
          <Link href="/gestoria" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Gestoría Inmobiliaria
          </Link>
          <Link href="/gestoria/contrato-arras" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Contrato de Arras
          </Link>
          <Link href="/gestoria/contrato-alquiler" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Contrato de Alquiler
          </Link>
          <Link href="/gestoria/cuanto-cuesta-contrato-alquiler" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Precio contrato alquiler
          </Link>
          <Link href="/gestoria/prestamo-particulares" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Préstamo entre particulares
          </Link>
          <Link href="/gestoria/contrato-alquiler-habitacion" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Alquiler habitación
          </Link>
          <Link href="/gestoria/venta-completa-reserva-escritura" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Venta completa + escritura
          </Link>
          <Link href="/gestoria/revision-contrato-alquiler" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Revisión contrato alquiler
          </Link>
          <Link href="/gestoria/contrato-compraventa" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Contrato de compraventa
          </Link>
          <Link href="/gestoria/asesoria-compra-piso" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Asesoría compra de piso
          </Link>
          <Link href="/gestoria/due-diligence-precompra" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Due diligence (350€)
          </Link>
          <Link href="/vender-piso-sin-agencia" className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors">
            Vender sin agencia
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/gestoria/bilbao" className="text-xs text-white/45 hover:text-[#f4c94a] transition-colors">
            Gestoría Bilbao
          </Link>
          <Link href="/gestoria/alicante" className="text-xs text-white/45 hover:text-[#f4c94a] transition-colors">
            Gestoría Alicante
          </Link>
          <Link href="/gestoria/palma" className="text-xs text-white/45 hover:text-[#f4c94a] transition-colors">
            Gestoría Palma
          </Link>
          <Link href="/gestoria/ciudades" className="text-xs text-white/45 hover:text-[#f4c94a] transition-colors">
            Todas las ciudades →
          </Link>
        </div>
      </div>

      {/* ── Banner sellos de confianza (contraste blanco) ───────── */}
      <div className="bg-white px-6 sm:px-10 lg:px-16 py-7 border-y border-gray-100">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-5">
          Sellos de confianza
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10">
          {SELLOS_CONFIANZA.map((sello) => (
            <div
              key={sello.src}
              className="relative flex h-12 sm:h-14 w-auto items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image
                src={sello.src}
                alt={sello.alt}
                width={sello.w}
                height={sello.h}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── HUB SEO: Contratos e información por ciudad ─────────── */}
      <div className="border-b border-white/10 px-6 sm:px-10 lg:px-16 py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#c9962a] mb-6">
          Información por ciudad
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8">
          {SERVICIOS_CIUDAD.map(({ titulo, ruta }) => (
            <div key={ruta}>
              <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-3">
                {titulo}
              </p>
              <ul className="space-y-1.5">
                {CIUDADES.map(({ slug, nombre }) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}/${ruta}`}
                      className="text-sm text-white/60 hover:text-[#f4c94a] transition-colors leading-snug"
                    >
                      {nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cuerpo principal: imagen izquierda + contenido derecha ── */}
      <div className="flex flex-col lg:flex-row min-h-[320px]">

        {/* Mitad izquierda — imagen familia */}
        <div className="relative lg:w-2/5 min-h-[260px] lg:min-h-0 shrink-0">
          <Image
            src="/familia1.jpg"
            alt="Familia en su hogar"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-[#0d1a0f]" />
        </div>

        {/* Mitad derecha — logo + columnas */}
        <div className="flex-1 px-8 sm:px-10 lg:px-12 pt-12 pb-10">

          {/* Logo + tagline */}
          <div className="flex flex-col items-start mb-10">
            <Link href="/" className="mb-3">
              <span className="text-2xl font-extrabold tracking-tight leading-none">
                <span className="text-white">Inmo</span><span className="text-[#c9962a]">nest</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Tu portal inmobiliario de confianza. Sin comisiones, sin intermediarios.
            </p>
          </div>

          {/* ── Tres columnas ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

            {/* Columna 1 — Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9962a] mb-4">Legal</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><Link href="/aviso-legal" className="hover:text-[#f4c94a] transition-colors">Aviso Legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-[#f4c94a] transition-colors">Política de Privacidad</Link></li>
                <li><Link href="/cookies" className="hover:text-[#f4c94a] transition-colors">Política de Cookies</Link></li>
                <li><Link href="/seguridad" className="hover:text-[#f4c94a] transition-colors">Seguridad</Link></li>
              </ul>
            </div>

            {/* Columna 2 — Servicios */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9962a] mb-4">Servicios</h3>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><Link href="/pisos" className="hover:text-[#f4c94a] transition-colors">Portal inmobiliario</Link></li>
                <li><Link href="/pisos?operacion=rent" className="hover:text-[#f4c94a] transition-colors">Alquiler</Link></li>
                <li><Link href="/pisos?operacion=rent&solo_particulares=true" className="hover:text-[#f4c94a] transition-colors">Pisos de Particulares</Link></li>
                <li><Link href="/pisos?operacion=sale" className="hover:text-[#f4c94a] transition-colors">Compra</Link></li>
                <li><Link href="/publicar-anuncio" className="hover:text-[#f4c94a] transition-colors">Publicar anuncio</Link></li>
                <li><Link href="/gestoria" className="hover:text-[#f4c94a] transition-colors">Gestoría online</Link></li>
                <li><Link href="/vender-casa" className="hover:text-[#f4c94a] transition-colors">Vender sin comisión</Link></li>
              </ul>
            </div>

            {/* Columna 3 — Sobre nosotros + contacto */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9962a] mb-4">Sobre Inmonest</h3>
              <ul className="space-y-2.5 text-sm text-white/60 mb-6">
                <li><Link href="/sobre-nosotros" className="hover:text-[#f4c94a] transition-colors">Quiénes somos</Link></li>
                <li><Link href="/blog" className="hover:text-[#f4c94a] transition-colors">Blog inmobiliario</Link></li>
                <li><FooterGestoriaContact /></li>
                <li>
                  <a href="mailto:info@inmonest.com" className="hover:text-[#f4c94a] transition-colors">
                    info@inmonest.com
                  </a>
                </li>
              </ul>

              {/* Redes sociales */}
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/inmo.nest" target="_blank" rel="noopener noreferrer" aria-label="Inmonest en Instagram" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#c9962a]/80 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/inmonest" target="_blank" rel="noopener noreferrer" aria-label="Inmonest en Facebook" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877f2]/80 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://x.com/inmonest" target="_blank" rel="noopener noreferrer" aria-label="Inmonest en X" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* ── Copyright ─────────────────────────────────────────── */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <span>© 2026 Inmonest — Tu portal inmobiliario de confianza</span>
            <span className="hidden sm:block">Hecho con ❤ en España</span>
          </div>

        </div>{/* /mitad derecha */}
      </div>{/* /flex layout */}
    </footer>
  )
}
