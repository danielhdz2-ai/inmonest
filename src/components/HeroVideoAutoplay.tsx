'use client'

import { useEffect } from 'react'

/** Refuerza autoplay del hero tras hidratar (Chrome / Edge). */
export default function HeroVideoAutoplay() {
  useEffect(() => {
    const el = document.querySelector<HTMLVideoElement>('video.hero-bg-video')
    if (!el) return
    el.muted = true
    const play = () => {
      void el.play().catch(() => {})
    }
    if (el.readyState >= 2) play()
    else el.addEventListener('loadeddata', play, { once: true })
  }, [])

  return null
}
