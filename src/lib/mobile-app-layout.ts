/** Alturas del shell móvil tipo app (deben coincidir con globals.css). */
export const MOBILE_NAV_HEIGHT = '4.25rem'
export const MOBILE_STICKY_DOCK_HEIGHT = '3.75rem'

export const mobileNavBottom = `calc(${MOBILE_NAV_HEIGHT} + env(safe-area-inset-bottom, 0px))`

export const mobileStickyDockBottom = `calc(${MOBILE_NAV_HEIGHT} + ${MOBILE_STICKY_DOCK_HEIGHT} + env(safe-area-inset-bottom, 0px))`

/** Espaciador final en páginas con barra sticky + nav inferior */
export const mobileDockSpacerClass =
  'lg:hidden h-[calc(4.25rem+3.75rem+env(safe-area-inset-bottom,0px))] shrink-0'

/** Solo nav inferior (sin sticky dock) */
export const mobileNavSpacerClass =
  'lg:hidden h-[calc(4.25rem+env(safe-area-inset-bottom,0px))] shrink-0'

/** FABs flotantes encima del nav móvil (WhatsApp encima de “Buscar con IA”) */
export const mobileChatFabBottom =
  'calc(4.75rem + env(safe-area-inset-bottom, 0px))'
export const mobileWhatsAppFabBottom =
  'calc(9.5rem + env(safe-area-inset-bottom, 0px))'
export const mobileChatPanelBottom =
  'calc(5.5rem + env(safe-area-inset-bottom, 0px))'
