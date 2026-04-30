/**
 * Componente para gestionar suscripción a notificaciones push
 * Muestra estado actual y permite activar/desactivar
 */

'use client'

import { usePushNotifications } from '@/hooks/usePushNotifications'

export default function PushNotificationSettings() {
  const {
    permission,
    isSupported,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
  } = usePushNotifications()

  if (!isSupported) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">
          🔔 Notificaciones Push
        </h3>
        <p className="text-xs text-gray-500">
          Tu navegador no soporta notificaciones push
        </p>
      </div>
    )
  }

  const handleToggle = async () => {
    if (isSubscribed) {
      await unsubscribe()
    } else {
      await subscribe()
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            🔔 Notificaciones Push
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            Recibe alertas instantáneas de nuevos mensajes, favoritos y pisos que coincidan con tus búsquedas
          </p>

          {/* Estado actual */}
          <div className="flex items-center gap-2 text-xs">
            {permission === 'denied' ? (
              <span className="text-red-600 font-medium">
                ❌ Permiso denegado - Habilítalo en la configuración del navegador
              </span>
            ) : isSubscribed ? (
              <span className="text-green-600 font-medium">
                ✅ Activadas
              </span>
            ) : (
              <span className="text-gray-500">
                Desactivadas
              </span>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* Toggle button */}
        {permission !== 'denied' && (
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isSubscribed ? 'bg-[#c9962a]' : 'bg-gray-200'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isSubscribed ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        )}
      </div>

      {/* Información adicional */}
      {permission === 'default' && !isSubscribed && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800">
            💡 Al activar, tu navegador te pedirá permiso para mostrar notificaciones.
            Podrás desactivarlas en cualquier momento.
          </p>
        </div>
      )}
    </div>
  )
}
