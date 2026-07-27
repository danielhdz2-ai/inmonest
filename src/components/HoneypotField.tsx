'use client'

interface Props {
  value: string
  onChange: (value: string) => void
}

/** Campo oculto para bots — no debe rellenarse por usuarios reales */
export default function HoneypotField({ value, onChange }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
      tabIndex={-1}
    >
      <label htmlFor="_hp_url">Deja este campo vacío</label>
      <input
        type="text"
        id="_hp_url"
        name="_hp_url"
        autoComplete="off"
        tabIndex={-1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
