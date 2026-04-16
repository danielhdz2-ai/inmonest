import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Sirve el sitemap desde el route handler /api/sitemap para
      // evitar el bug de Next.js que no escapa & en metadata routes
      // y para bypassear cualquier caché de build anterior
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  turbopack: {
    root: path.resolve(__dirname),
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
