/**
 * monthly-cost-calculator.ts
 * 
 * Calculadora de gastos mensuales estimados para alquileres
 * Proporciona transparencia total al inquilino
 */

export interface MonthlyExpenses {
  rent: number                    // Alquiler base
  utilities: number               // Luz + Agua + Gas estimado
  internet: number                // Internet/fibra
  insurance: number               // Seguro impago (opcional)
  communityFees: number          // Gastos de comunidad (si aplican)
  total: number                   // Total mensual estimado
  breakdown: {
    label: string
    amount: number
    isEstimated: boolean
  }[]
}

interface CalculatorInput {
  rent: number
  area_m2: number
  bedrooms: number
  hasCommunityFees?: boolean
  communityFeesAmount?: number
  includeInsurance?: boolean
}

/**
 * Calcula gastos mensuales estimados para un alquiler
 */
export function calculateMonthlyExpenses(input: CalculatorInput): MonthlyExpenses {
  const { rent, area_m2, bedrooms, hasCommunityFees, communityFeesAmount, includeInsurance } = input
  
  // ── SUMINISTROS (Luz + Agua + Gas) ──────────────────────────────
  // Estimación basada en superficie y número de habitaciones
  // Fuente: OCU 2024, consumo medio hogares españoles
  let utilities = 0
  
  if (area_m2 < 50) {
    utilities = 80  // Estudio/piso pequeño
  } else if (area_m2 < 80) {
    utilities = 120  // Piso medio (1-2 hab)
  } else if (area_m2 < 120) {
    utilities = 160  // Piso grande (3 hab)
  } else {
    utilities = 200  // Piso muy grande (4+ hab)
  }
  
  // Ajuste por número de habitaciones (más habitantes = más consumo)
  if (bedrooms >= 3) {
    utilities += 30
  }
  
  // ── INTERNET ─────────────────────────────────────────────────────
  // Fibra estándar en España (promedio 2024)
  const internet = 35
  
  // ── SEGURO DE IMPAGO ─────────────────────────────────────────────
  // Típicamente 2.5-3% del alquiler anual / 12 meses
  // Solo si el usuario lo solicita
  const insurance = includeInsurance ? Math.round(rent * 0.03) : 0
  
  // ── GASTOS DE COMUNIDAD ──────────────────────────────────────────
  // Si el anuncio especifica que no están incluidos
  const communityFees = hasCommunityFees && communityFeesAmount 
    ? communityFeesAmount 
    : 0
  
  // ── TOTAL ────────────────────────────────────────────────────────
  const total = rent + utilities + internet + insurance + communityFees
  
  // ── BREAKDOWN DETALLADO ──────────────────────────────────────────
  const breakdown = [
    {
      label: 'Alquiler mensual',
      amount: rent,
      isEstimated: false,
    },
    {
      label: 'Suministros (Luz, Agua, Gas)',
      amount: utilities,
      isEstimated: true,
    },
    {
      label: 'Internet/Fibra',
      amount: internet,
      isEstimated: true,
    },
  ]
  
  if (communityFees > 0) {
    breakdown.push({
      label: 'Gastos de comunidad',
      amount: communityFees,
      isEstimated: false,
    })
  }
  
  if (insurance > 0) {
    breakdown.push({
      label: 'Seguro impago',
      amount: insurance,
      isEstimated: true,
    })
  }
  
  return {
    rent,
    utilities,
    internet,
    insurance,
    communityFees,
    total,
    breakdown,
  }
}

/**
 * Formatea los gastos para mostrar en el frontend
 */
export function formatExpenses(expenses: MonthlyExpenses): string {
  return `${expenses.total.toLocaleString('es-ES')}€/mes`
}

/**
 * Genera texto descriptivo de los gastos
 */
export function getExpensesDescription(expenses: MonthlyExpenses): string {
  const savings = expenses.rent < 800 ? 'económico' : expenses.rent < 1200 ? 'moderado' : 'premium'
  
  return `El coste mensual total estimado para vivir en este piso es de ${expenses.total.toLocaleString('es-ES')}€, incluyendo alquiler (${expenses.rent}€), suministros (${expenses.utilities}€), internet (${expenses.internet}€)${expenses.communityFees > 0 ? ` y gastos de comunidad (${expenses.communityFees}€)` : ''}. Perfil ${savings}.`
}
