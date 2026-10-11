'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
  videoSrc: string
  posterSrc: string
  posterAlt: string
  priority?: boolean
}

/**
 * Hero decorativo: vídeo en bucle en desktop; poster estático en móvil o si el usuario prefiere menos movimiento.
 */
export default function HeroBackgroundMedia({
  videoSrc,
  posterSrc,
  posterAlt,
  priority = true,
}: Props) {
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')

    const update = () => {
      setUseVideo(!motion.matches && desktop.matches)
    }

    update()
    motion.addEventListener('change', update)
    desktop.addEventListener('change', update)
    return () => {
      motion.removeEventListener('change', update)
      desktop.removeEventListener('change', update)
    }
  }, [])

  if (!useVideo) {
    return (
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        className="object-cover"
        priority={priority}
        sizes="100vw"
      />
    )
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={posterSrc}
      aria-hidden
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
