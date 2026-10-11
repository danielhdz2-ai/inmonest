'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {
  videoSrc: string
  posterSrc: string
  posterAlt: string
  priority?: boolean
}

/**
 * Hero decorativo: vídeo en bucle (autoplay silenciado). Solo imagen si prefers-reduced-motion.
 */
export default function HeroBackgroundMedia({
  videoSrc,
  posterSrc,
  posterAlt,
  priority = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(motion.matches)
    apply()
    motion.addEventListener('change', apply)
    return () => motion.removeEventListener('change', apply)
  }, [])

  const tryPlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    const p = el.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => setVideoFailed(true))
    }
  }, [])

  useEffect(() => {
    if (reduceMotion || videoFailed) return
    tryPlay()
  }, [reduceMotion, videoFailed, tryPlay])

  if (reduceMotion || videoFailed) {
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
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterSrc}
      aria-hidden
      onLoadedData={tryPlay}
      onCanPlay={tryPlay}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
