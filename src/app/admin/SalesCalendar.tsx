'use client'

import { useState } from 'react'

interface DailySaleItem {
  id: string
  name: string
  email: string | null
  service: string
  amount: number
  time: string
}

interface DailySale {
  date: string
  orders: number
  revenue: number
  paid: number
  items: DailySaleItem[]
}

interface SalesCalendarProps {
  dailyMetrics: DailySale[]
  compact?: boolean
}

export default function SalesCalendar({ dailyMetrics, compact = false }: SalesCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Navegar meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
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

  // Fecha (YYYY-MM-DD) para un día específico del mes visible
  const dateStrFor = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // Obtener datos de venta para un día específico
  const getSaleData = (day: number): DailySale | null => {
    return salesByDate.get(dateStrFor(day)) || null
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

  const monthTotal = calendarDays.reduce((sum: number, day) => {
    if (day === null) return sum
    const data = getSaleData(day)
    return sum + (data?.revenue ?? 0)
  }, 0)

  const selectedData = selectedDate ? salesByDate.get(selectedDate) || null : null
  const selectedDay = selectedDate ? Number(selectedDate.slice(-2)) : null

  const handleDayClick = (day: number) => {
    const dateStr = dateStrFor(day)
    const data = salesByDate.get(dateStr)
    if (!data || data.paid <= 0) {
      setSelectedDate(null)
      return
    }
    setSelectedDate(prev => (prev === dateStr ? null : dateStr))
  }

  return (
    <div className={compact ? '' : 'bg-white rounded-2xl border border-gray-200 p-6'}>
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Calendario de ventas</h3>
          <p className="text-xs text-gray-500 mt-0.5">{monthTotal.toFixed(0)} € este mes</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            aria-label="Mes anterior"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-gray-700 min-w-[92px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            aria-label="Mes siguiente"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {dayNames.map((dayName, idx) => (
          <div
            key={idx}
            className="text-center text-[10px] font-semibold text-gray-400 uppercase py-1"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />
          }

          const saleData = getSaleData(day)
          const hasSale = !!saleData && saleData.paid > 0
          const today = isToday(day)
          const isSelected = selectedDate === dateStrFor(day)

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg
                border relative group transition-all
                ${hasSale ? 'cursor-pointer' : 'cursor-default'}
                ${today ? 'border-gold-500 ring-1 ring-[#c9962a]/30' : 'border-gray-200'}
                ${hasSale ? 'bg-gold-500/10 border-gold-500/50' : 'bg-white hover:bg-gray-50'}
                ${isSelected ? 'ring-2 ring-[#8a6a1e] border-[#8a6a1e]' : ''}
              `}
            >
              <span className={`text-xs font-semibold ${hasSale ? 'text-[#8a6a1e]' : 'text-gray-600'}`}>
                {day}
              </span>

              {hasSale && (
                <span className="text-[9px] font-bold text-[#8a6a1e] mt-0.5">
                  {saleData!.revenue.toFixed(0)}€
                </span>
              )}

              {hasSale && !isSelected && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold text-[#f4d98a]">
                      {day} de {monthNames[month]}
                    </div>
                    <div className="mt-1">{saleData!.revenue.toFixed(2)} €</div>
                    <div className="text-gray-300">
                      {saleData!.paid} venta{saleData!.paid > 1 ? 's' : ''} · click para ver detalle
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Detalle real del día seleccionado */}
      {selectedData && selectedDay !== null && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-bold text-gray-900">
              {selectedDay} de {monthNames[month]} · {selectedData.revenue.toFixed(2)} € · {selectedData.paid} venta{selectedData.paid > 1 ? 's' : ''}
            </p>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="text-[11px] text-gray-400 hover:text-gray-600"
            >
              Cerrar
            </button>
          </div>
          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {selectedData.items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{item.service} · {item.time}</p>
                  {item.email && <p className="text-[10px] text-gray-400 truncate">{item.email}</p>}
                </div>
                <p className="text-xs font-bold text-[#8a6a1e] flex-shrink-0">{item.amount.toFixed(0)} €</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leyenda */}
      <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-gold-500 ring-1 ring-[#c9962a]/30" />
          <span className="text-[11px] text-gray-500">Hoy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gold-500/10 border border-gold-500/50" />
          <span className="text-[11px] text-gray-500">Con ventas · click para ver detalle</span>
        </div>
      </div>
    </div>
  )
}
