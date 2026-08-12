import { NextResponse } from 'next/server'
import { getGoogleWriteReviewUrl } from '@/lib/google-business'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.redirect(getGoogleWriteReviewUrl(), {
    status: 307,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}
