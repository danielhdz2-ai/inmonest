import { cn } from '@/lib/cn'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900',
          'placeholder:text-gray-400 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500',
          error && 'border-red-300 focus:ring-red-200 focus:border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
