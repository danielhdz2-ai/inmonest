import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LazyChatWidget from "@/components/LazyChatWidget";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalMobileBottomNav from "@/components/ConditionalMobileBottomNav";
import GTMProvider from "@/components/GTMProvider";
import OrganizationSchema from "@/components/OrganizationSchema";

const GTM_ID = 'GTM-57Q8NRVN'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://inmonest.com'),

  // title.template: todas las subpáginas heredan automáticamente "Título | Inmonest"
  title: {
    default: 'Inmonest | Contratos inmobiliarios desde 61 € en 48 h',
    template: '%s | Inmonest',
  },
  description:
    'Contratos inmobiliarios desde 61 € en 48 h. Arras, alquiler LAU y compraventa redactados por expertos. Portal de pisos entre particulares sin comisiones.',
  keywords: [
    'gestoría inmobiliaria online',
    'contratos de arras',
    'contrato de alquiler LAU',
    'contrato compraventa vivienda',
    'gestoría inmobiliaria experta',
    'revisión contrato arras',
    'revisión contrato alquiler',
    'gestoría digital Barcelona',
    'gestoría digital Madrid',
    'gestoría digital Valencia',
    'redactar contrato alquiler',
    'redactar contrato arras',
    'asesoría jurídica compra vivienda',
    'pisos particulares sin comisión',
    'alquiler sin agencia',
    'inmonest',
  ],
  authors: [{ name: 'Inmonest', url: 'https://inmonest.com' }],
  creator: 'Inmonest',
  publisher: 'Inmonest',
  applicationName: 'Inmonest',

  icons: {
    icon: [
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png',       type: 'image/png', sizes: '192x192' },
      { url: '/favicon.ico',    type: 'image/x-icon', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple:    [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  // Directivas de rastreo — permite que Google indexe todo el contenido útil
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph — imagen cuando alguien comparte un link
  openGraph: {
    title: 'Inmonest | Contratos inmobiliarios desde 61 € en 48 h',
    description:
      'Arras, alquiler LAU y compraventa redactados por expertos. Portal de pisos entre particulares sin comisiones.',
    url: 'https://inmonest.com',
    siteName: 'Inmonest',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/promo.png',
        width: 1200,
        height: 630,
        alt: 'Inmonest — Pisos sin comisiones entre particulares',
      },
    ],
  },

  // Twitter / X Card — solo card; título/descripción heredan del openGraph de cada página
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden" data-app-shell="5">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* GTM script — afterInteractive: fires after hydration, non-blocking */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/* SPA route-change page_view tracker */}
        <GTMProvider />

        {/* Schema.org Organization - SEO structured data */}
        <OrganizationSchema />

        {children}
        <ConditionalFooter />
        <ConditionalMobileBottomNav />
        <LazyChatWidget />
      </body>
    </html>
  );
}
