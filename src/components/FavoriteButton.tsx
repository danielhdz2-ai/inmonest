'use client'

import { useState } from 'react'

interface Props {
  listingId: string
  initialFavorited?: boolean
}

export default function FavoriteButton({ listingId, initialFavorited = false }: Props) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading]     = useState(false)

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    setLoading(true)
    const prev = favorited
    setFavorited(!prev) // optimistic
    try {
      const res  = await fetch('/api/favoritos/toggle', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ listing_id: listingId }),
      })
      if (!res.ok) setFavorited(prev) // revert on error
    } catch {
      setFavorited(prev)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`absolute bottom-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
        favorited
          ? 'bg-rose-500 text-white'
          : 'bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-white'
      } ${loading ? 'opacity-60' : ''}`}
    >
      <svg
        className="w-4 h-4"
        fill={favorited ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}
