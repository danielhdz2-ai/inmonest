import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.roots = [path.resolve(__dirname)]
    return config
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
