import { Suspense } from 'react'
import GraciasContent from './GraciasContent'

export const metadata = {
  title: 'Pedido confirmado — Inmonest Gestoría',
  robots: 'noindex, nofollow',
}

export default function GraciasPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#c9962a] border-t-transparent rounded-full" />
      </main>
    }>
      <GraciasContent />
    </Suspense>
  )
}
