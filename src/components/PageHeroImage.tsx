import Image from 'next/image'
import { BRAND_IMAGES } from '@/lib/brand-images'
import { cn } from '@/lib/cn'

/** Proporción del marco — evita estirar fotos verticales en franjas horizontales */
export type PageHeroImageAspect = 'banner' | 'wide' | 'standard'

const ASPECT_CLASS: Record<PageHeroImageAspect, string> = {
  banner: 'aspect-[2/1] sm:aspect-[21/9]',
  wide: 'aspect-video',
  standard: 'aspect-[4/3]',
}

type PageHeroImageProps = {
  src?: string
  alt: string
  className?: string
  priority?: boolean
  aspect?: PageHeroImageAspect
  /** p. ej. "center top" para retratos */
  objectPosition?: string
}

export default function PageHeroImage({
  src = BRAND_IMAGES.gestoria.src,
  alt,
  className = 'mb-10',
  priority = false,
  aspect = 'wide',
  objectPosition = 'center',
}: PageHeroImageProps) {
  return (
    <figure
      className={cn(
        'not-prose relative w-full overflow-hidden rounded-xl shadow-lg bg-gray-100',
        ASPECT_CLASS[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
        style={{ objectPosition }}
      />
    </figure>
  )
}
