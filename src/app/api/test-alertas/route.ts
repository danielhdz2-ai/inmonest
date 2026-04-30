import { NextResponse } from 'next/server'

/**
 * Endpoint para disparar manualmente el cron de alertas sin autenticación
 * SOLO para desarrollo/testing
 */

export const dynamic = 'force-dynamic'

export async function GET() {
  const cronUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/cron/alertas`
  
  console.log('🔔 Disparando cron de alertas manualmente...')
  
  try {
    const res = await fetch(cronUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Incluir el secret si está configurado
        ...(process.env.CRON_SECRET ? { 'x-cron-secret': process.env.CRON_SECRET } : {}),
      },
    })
    
    const data = await res.json()
    
    console.log('📊 Resultado:', data)
    
    return NextResponse.json({ 
      ok: res.ok, 
      status: res.status,
      ...data 
    })
  } catch (err) {
    console.error('❌ Error:', err)
    return NextResponse.json({ 
      ok: false, 
      error: err instanceof Error ? err.message : 'Error desconocido' 
    }, { status: 500 })
  }
}
