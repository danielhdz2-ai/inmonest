export default function ContratosLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
        <p className="text-sm text-gray-500">Cargando contratos…</p>
      </div>
    </div>
  )
}
