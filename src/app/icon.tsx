import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#1a0d00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 900,
          letterSpacing: '-0.05em',
        }}
      >
        <span style={{ color: 'white' }}>I</span>
        <span style={{ color: '#c9962a' }}>N</span>
      </div>
    ),
    {
      ...size,
    }
  )
}
