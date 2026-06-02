'use client'

import { useState } from 'react'

interface DailySale {
  date: string
  orders: number
  revenue: number
  paid: number
}

interface SalesCalendarProps {
  dailyMetrics: DailySale[]
}

export default function SalesCalendar({ dailyMetrics }: SalesCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Navegar meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Obtener información del mes actual
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay() // 0 = Domingo, 1 = Lunes, etc.

  // Convertir dailyMetrics a un mapa por fecha para acceso rápido
  const salesByDate = new Map<string, DailySale>()
  dailyMetrics.forEach(metric => {
    salesByDate.set(metric.date, metric)
  })

  // Crear array de días del calendario
  const calendarDays: (number | null)[] = []
  
  // Ajustar para que la semana empiece en Lunes (0 = Lunes)
  const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1
  
  // Espacios en blanco antes del primer día
  for (let i = 0; i < adjustedStartDay; i++) {
    calendarDays.push(null)
  }
  
  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  // Obtener datos de venta para un día específico
  const getSaleData = (day: number): DailySale | null => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return salesByDate.get(dateStr) || null
  }

  // Verificar si es el día actual
  const isToday = (day: number): boolean => {
    const today = new Date()
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  // Nombre del mes
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">📅 Calendario de Ventas</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Mes anterior"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-base font-semibold text-gray-900 min-w-[140px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Mes siguiente"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((dayName, idx) => (
          <div
            key={idx}
            className="text-center text-xs font-semibold text-gray-500 uppercase py-2"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />
          }

          const saleData = getSaleData(day)
          const hasSale = saleData && saleData.paid > 0
          const today = isToday(day)

          return (
            <div
              key={day}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg
                border-2 relative group cursor-default transition-all
                ${today ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${hasSale ? 'bg-green-100 border-green-500 hover:bg-green-200' : 'bg-white hover:bg-gray-50'}
              `}
            >
              {/* Número del día */}
              <span className={`text-sm font-semibold ${hasSale ? 'text-green-900' : 'text-gray-700'}`}>
                {day}
              </span>

              {/* Indicador de venta */}
              {hasSale && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  <span className="text-[10px] font-bold text-green-700">
                    {saleData.revenue.toFixed(0)}€
                  </span>
                </div>
              )}

              {/* Tooltip al hover */}
              {hasSale && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold text-green-400">
                      {day} de {monthNames[month]}
                    </div>
                    <div className="mt-1">
                      💰 {saleData.revenue.toFixed(2)} €
                    </div>
                    <div>
                      📦 {saleData.paid} venta{saleData.paid > 1 ? 's' : ''}
                    </div>
                  </div>
                  {/* Flecha del tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-50" />
          <span className="text-xs text-gray-600">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500" />
          <span className="text-xs text-gray-600">Con ventas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border-2 border-gray-200" />
          <span className="text-xs text-gray-600">Sin ventas</span>
        </div>
      </div>
    </div>
  )
}
