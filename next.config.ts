// Deploy: 2026-04-28 - Calculadoras interactivas
import type { NextConfig } from "next";
import path from "path";
import { SEO_REDIRECTS } from "./src/lib/seo-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // Redirects 301 para URLs antiguas o eliminadas
  async redirects() {
    return [
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
      {
        source: '/gestoria/zaragoza',
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
      // Málaga
      {
        source: '/gestoria/malaga',
        destination: '/malaga/contrato-alquiler',
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
  
  images: {
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
