/** Preload del vídeo hero solo en la home (LCP). */
export default function HomeVideoPreload() {
  return (
    <link
      rel="preload"
      href="/video/gestoria-hero-walking.mp4"
      as="video"
      type="video/mp4"
      fetchPriority="high"
    />
  )
}
