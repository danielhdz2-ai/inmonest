type JsonLdProps = {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLd({ schema }: JsonLdProps) {
  const payload = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
