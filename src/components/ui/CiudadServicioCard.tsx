import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type CiudadServicioCardProps = {
  href: string
  nombre: string
  imageSrc: string
  imageAlt: string
  className?: string
}

export function CiudadServicioCard({
  href,
  nombre,
  imageSrc,
  imageAlt,
  className,
}: CiudadServicioCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-black shadow-md hover:shadow-xl transition-shadow min-h-[140px] flex flex-col justify-end',
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, 280px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="relative z-10 p-4">
        <p className="font-bold text-white text-lg">{nombre}</p>
        <p className="text-gold-400 text-xs font-semibold mt-1">Ver servicio</p>
      </div>
    </Link>
  )
}
