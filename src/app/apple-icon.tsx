import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation - Apple touch icon (más grande y detallado)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: '#1a0d00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          borderRadius: '20px',
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
