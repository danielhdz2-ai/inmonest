'use client'

import Link from 'next/link'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

export default function PrivacyAcceptCheckbox({
  checked,
  onChange,
  disabled,
  id = 'privacy-accept',
}: Props) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer text-left">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-gold-600 focus:ring-gold-500 shrink-0"
      />
      <span className="text-xs text-gray-600 leading-relaxed">
        He leído y acepto la{' '}
        <Link href="/privacidad" target="_blank" className="text-gold-600 underline hover:text-gold-700">
          política de privacidad
        </Link>{' '}
        y el{' '}
        <Link href="/aviso-legal" target="_blank" className="text-gold-600 underline hover:text-gold-700">
          aviso legal
        </Link>
        . <span className="text-red-500">*</span>
      </span>
    </label>
  )
}
