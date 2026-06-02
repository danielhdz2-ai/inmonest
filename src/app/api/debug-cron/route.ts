import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  
  return NextResponse.json({
    hasCronSecret: !!secret,
    secretLength: secret?.length || 0,
    secretPrefix: secret?.substring(0, 10) || 'no configurado',
    // NO mostrar el secret completo por seguridad
    expectedHeader: 'x-cron-secret',
  })
}
