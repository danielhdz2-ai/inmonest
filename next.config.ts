// Deploy: 2026-04-28 - Calculadoras interactivas
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // Redirects 301 para URLs antiguas o eliminadas
  async redirects() {
    return [
      // Servicios eliminados → redirigir a gestoría principal
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
      // Si había URLs antiguas de contratos, agregar aquí
      // {
      //   source: '/contratos/:slug',
      //   destination: '/gestoria/solicitar/:slug',
      //   permanent: true,
      // },
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
