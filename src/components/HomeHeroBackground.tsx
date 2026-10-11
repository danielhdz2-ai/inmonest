import Image from 'next/image'

const POSTER = '/gestoria-expertos-calle.jpg'
const VIDEO = '/video/gestoria-hero-calle.mp4'

/** Fondo del hero home: vídeo en bucle (HTML) + poster accesible. */
export default function HomeHeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src={POSTER}
        alt="Expertos gestores Inmonest — gestoría inmobiliaria online"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <video
        className="hero-bg-video absolute inset-0 z-[1] h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        aria-hidden
      >
        <source src={VIDEO} type="video/mp4" />
      </video>
    </div>
  )
}
