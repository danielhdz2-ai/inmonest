'use client'

import Image from 'next/image'

type Props = {
  imageSrc?: string
  imageAlt?: string
  icon?: string
  title: string
  description: string
  primaryLabel: string
  onPrimary: () => void
  secondaryLabel?: string
  onSecondary?: () => void
}

export default function GestoriaPanelEmptyState({
  imageSrc,
  imageAlt = '',
  icon = '📋',
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {imageSrc ? (
        <div className="relative h-32 sm:h-40 w-full bg-gray-100">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ) : null}
      <div className="p-5 sm:p-10 text-center">
        {!imageSrc && <p className="text-4xl mb-3">{icon}</p>}
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed px-1">{description}</p>
        <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onPrimary}
            className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-gold-500 text-white text-sm font-bold px-6 py-3.5 min-h-[48px] touch-manipulation hover:bg-gold-600 transition-colors active:scale-[0.99]"
          >
            {primaryLabel}
          </button>
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-3.5 min-h-[48px] touch-manipulation hover:border-gold-400 transition-colors active:scale-[0.99]"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
