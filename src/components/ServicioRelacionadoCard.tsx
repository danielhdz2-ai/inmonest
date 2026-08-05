import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type ServicioRelacionadoCardProps = {
  href: string
  nombre: string
  precio: number
  descripcion?: string
  imageSrc: string
  imageAlt: string
  className?: string
}

export function ServicioRelacionadoCard({
  href,
  nombre,
  precio,
  descripcion,
  imageSrc,
  imageAlt,
  className,
}: ServicioRelacionadoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-black shadow-md hover:shadow-xl transition-shadow min-h-[220px] flex flex-col justify-end',
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="relative z-10 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">Servicio</p>
        <h3 className="font-bold text-white text-lg leading-snug mb-1 group-hover:text-gold-300 transition-colors">
          {nombre}
        </h3>
        {descripcion ? (
          <p className="text-white/70 text-xs leading-relaxed mb-2 line-clamp-2">{descripcion}</p>
        ) : null}
        <p className="text-gold-400 font-bold text-sm">Desde {precio}€</p>
      </div>
    </Link>
  )
}
