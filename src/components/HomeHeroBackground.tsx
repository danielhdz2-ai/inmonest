const VIDEO = '/video/gestoria-hero-walking.mp4'

/** Fondo del hero home: vídeo en bucle, encuadrado a la derecha (personas visibles). */
export default function HomeHeroBackground() {
  return (
    <div className="absolute inset-0 bg-neutral-900">
      <video
        className="hero-bg-video absolute inset-0 z-[1] h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        src={VIDEO}
      />
    </div>
  )
}
