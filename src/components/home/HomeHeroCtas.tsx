'use client'

import { gtmPush } from '@/components/GTMProvider'
import { Button } from '@/components/ui/Button'

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
