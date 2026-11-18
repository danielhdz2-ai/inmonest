'use client'

import { gtmPush } from '@/components/GTMProvider'
import { Button } from '@/components/ui/Button'
import { buildGestoriaWhatsAppHref, gestoriaWhatsAppMessageForPath } from '@/lib/gestoria-contact'

const HOME_WA_HREF = buildGestoriaWhatsAppHref(gestoriaWhatsAppMessageForPath('/'))

export default function HomeHeroCtas() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        href="/gestoria/solicitar"
        variant="primary"
        className="rounded-full"
        onClick={() => gtmPush({ event: 'home_cta_click', cta_id: 'hero_solicitar' })}
      >
        Solicitar contrato
      </Button>
      <a
        href={HOME_WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => gtmPush({ event: 'wa_click', wa_source: 'home_hero', page_path: '/' })}
        className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#25d366] text-white hover:bg-[#1ebe5d] transition-colors shadow-lg"
      >
        WhatsApp — gestor en 24 h
      </a>
      <Button
        href="/gestoria/contrato-alquiler"
        variant="ghost"
        className="rounded-full"
        onClick={() => gtmPush({ event: 'home_cta_click', cta_id: 'hero_lau_info' })}
      >
        Ver precio y qué incluye
      </Button>
    </div>
  )
}
