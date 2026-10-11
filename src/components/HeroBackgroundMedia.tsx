import Image from 'next/image'

type Props = {
  videoSrc: string
  posterSrc: string
  posterAlt: string
  priority?: boolean
}

/**
 * Hero: poster siempre visible; vídeo encima en bucle (autoplay silenciado).
 * Sin estado cliente — el MP4 va en el HTML inicial.
 */
export default function HeroBackgroundMedia({
  videoSrc,
  posterSrc,
  posterAlt,
  priority = true,
}: Props) {
  return (
    <div className="absolute inset-0">
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        className="object-cover"
        priority={priority}
        sizes="100vw"
      />
      <video
        className="absolute inset-0 z-[1] h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}
