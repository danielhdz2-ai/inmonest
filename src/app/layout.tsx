import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://inmonest.com'),

  // title.template: todas las subpáginas heredan automáticamente "Título | Inmonest"
  title: {
    default: 'Inmonest | Pisos entre particulares sin comisiones',
    template: '%s | Inmonest',
  },
  description:
    'Compra, vende o alquila tu piso directamente entre particulares. Sin agencias, sin comisiones. Miles de inmuebles en toda España.',
  keywords: [
    'pisos particulares',
    'vender casa sin comisión',
    'alquiler sin agencia',
    'comprar piso sin intermediarios',
    'inmuebles particulares España',
    'portal inmobiliario sin comisiones',
    'contratos de arras',
    'contrato de alquiler',
    'gestoría inmobiliaria online',
    'inmonest',
  ],
  authors: [{ name: 'Inmonest', url: 'https://inmonest.com' }],
  creator: 'Inmonest',
  publisher: 'Inmonest',
  applicationName: 'Inmonest',

  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
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
    title: 'Inmonest | Pisos entre particulares sin comisiones',
    description:
      'Compra, vende o alquila tu piso directamente entre particulares. Sin agencias, sin comisiones.',
    url: 'https://inmonest.com',
    siteName: 'Inmonest',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',  // crea public/og-image.jpg a 1200×630px para mejor resultado
        width: 1200,
        height: 630,
        alt: 'Inmonest — Pisos sin comisiones entre particulares',
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Inmonest | Pisos entre particulares sin comisiones',
    description: 'Compra, vende o alquila tu piso directamente. Sin agencias, sin comisiones.',
    images: ['/og-image.jpg'],
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
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-57Q8NRVN');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57Q8NRVN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
