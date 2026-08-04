import Image from 'next/image'
import { BRAND_IMAGES } from '@/lib/brand-images'

type PageHeroImageProps = {
  src?: string
  alt: string
  className?: string
  priority?: boolean
}

export default function PageHeroImage({
  src = BRAND_IMAGES.gestoria.src,
  alt,
  className = 'mb-10',
  priority = false,
}: PageHeroImageProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={480}
        className="w-full h-44 sm:h-56 md:h-64 object-cover"
        priority={priority}
      />
    </div>
  )
}
