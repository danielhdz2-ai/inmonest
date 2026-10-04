// Deploy: 2026-04-28 - Calculadoras interactivas
import type { NextConfig } from "next";
import path from "path";
import { SEO_REDIRECTS } from "./src/lib/seo-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  experimental: {
    optimizePackageImports: ['@/components/ui/Icons'],
  },
  
  // Redirects 301 para URLs antiguas o eliminadas
  async redirects() {
    return [
      // ═══ WWW → APEX (GSC: error de redirección en www.inmonest.com) ═══
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.inmonest.com' }],
        destination: 'https://inmonest.com/:path*',
        permanent: true,
      },

      // ═══ SERVICIOS ELIMINADOS ═══
      // Redirigir a gestoría principal
      {
        source: '/gestoria/certificado-eficiencia-energetica',
        destination: '/gestoria',
        permanent: true, // 301
      },
      {
        source: '/gestoria/nota-simple',
        destination: '/gestoria',
        permanent: true,
      },
      {
        source: '/gestoria/cedula-habitabilidad',
        destination: '/gestoria',
        permanent: true,
      },
      
      // ═══ URLS ANTIGUAS DE CONTRATOS ═══
      {
        source: '/contratos/:slug',
        destination: '/gestoria/solicitar/:slug',
        permanent: true,
      },
      
      // ═══ NORMALIZACIÓN GESTORÍA POR CIUDAD ═══
      {
        source: '/gestoria/:ciudad/contratos',
        destination: '/gestoria/:ciudad',
        permanent: true,
      },
      {
        source: '/gestoria/:ciudad/contratos-inmobiliarios',
        destination: '/gestoria/:ciudad',
        permanent: true,
      },
      
      // ═══ REDIRECTS ESPECÍFICOS CIUDAD ═══
      // Zaragoza
      {
        source: '/gestoria/zaragoza/contratos-inmobiliarios',
        destination: '/zaragoza/contrato-alquiler',
        permanent: true,
      },
      // Sevilla
      {
        source: '/gestoria/sevilla/gestoria-online',
        destination: '/gestoria/sevilla',
        permanent: true,
      },
      {
        source: '/gestoria/sevilla/contratos',
        destination: '/gestoria/sevilla',
        permanent: true,
      },
      // Granada
      {
        source: '/gestoria/granada/contratos-alquiler-compraventa',
        destination: '/granada/contrato-alquiler',
        permanent: true,
      },
      {
        source: '/gestoria/granada',
        destination: '/granada/contrato-alquiler',
        permanent: true,
      },
      // Bilbao
      {
        source: '/gestoria/bilbao/contratos',
        destination: '/bilbao/contrato-arras',
        permanent: true,
      },
      
      // ═══ PISOS - PARÁMETROS LEGACY ═══
      // URLs con parámetros antiguos → Redirigir a URLs limpias
      {
        source: '/pisos/alquiler',
        destination: '/pisos?operacion=rent',
        permanent: true,
      },
      {
        source: '/pisos/compra',
        destination: '/pisos?operacion=sale',
        permanent: true,
      },
      {
        source: '/pisos/venta',
        destination: '/pisos?operacion=sale',
        permanent: true,
      },
      
      // ═══ PÁGINAS ANTIGUAS ELIMINADAS ═══
      {
        source: '/anuncios',
        destination: '/pisos',
        permanent: true,
      },
      {
        source: '/inmuebles',
        destination: '/pisos',
        permanent: true,
      },
      {
        source: '/propiedades',
        destination: '/pisos',
        permanent: true,
      },
      
      // ═══ BLOG - POSTS ELIMINADOS O MOVIDOS ═══
      {
        source: '/blog/arras-penitenciales',
        destination: '/gestoria/guia-arras-penitenciales',
        permanent: true,
      },
      {
        source: '/blog/contrato-arras',
        destination: '/gestoria/contrato-arras',
        permanent: true,
      },
      
      // ═══ MI-CUENTA - RUTAS ANTIGUAS ═══
      {
        source: '/perfil',
        destination: '/mi-cuenta/perfil',
        permanent: true,
      },
      {
        source: '/mis-anuncios',
        destination: '/mi-cuenta/anuncios',
        permanent: true,
      },
      {
        source: '/mis-favoritos',
        destination: '/mi-cuenta/favoritos',
        permanent: true,
      },
      
      // ═══ LANDING PAGES CONSOLIDADAS ═══
      {
        source: '/vender-piso',
        destination: '/vender-piso-sin-agencia',
        permanent: true,
      },
      {
        source: '/vender-casa-sin-comision',
        destination: '/vender-piso-sin-agencia',
        permanent: true,
      },

      // Redirects SEO adicionales (GSC / enlaces legacy)
      ...SEO_REDIRECTS,
    ]
  },
  
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://api.stripe.com https://challenges.cloudflare.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          { key: "Content-Security-Policy", value: csp },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        ],
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    // CDNs externos usados por los scrapers — evita errores de dominio no permitido
    remotePatterns: [
      { protocol: 'https', hostname: 'cdnsolvproep.solvia.es' },
      { protocol: 'https', hostname: 'stbssolvplatpro04.blob.core.windows.net' },
      { protocol: 'https', hostname: '**.aliseda.es' },
      { protocol: 'https', hostname: '**.fotocasa.es' },
      { protocol: 'https', hostname: '**.habitaclia.com' },
      { protocol: 'https', hostname: '**.pisos.com' },
      { protocol: 'https', hostname: '**.milanuncios.com' },
      { protocol: 'https', hostname: '**.idealista.com' },
      { protocol: 'https', hostname: '**.enalquiler.com' },
    ],
  },
};

export default nextConfig;
