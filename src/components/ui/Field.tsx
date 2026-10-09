import { useId } from 'react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-xl border bg-ink-950/70 px-3.5 text-sm text-fg placeholder:text-fg-3/70 transition-colors focus:outline-none focus:border-signal/60 focus:ring-2 focus:ring-signal/15'

export function inputClass(invalid?: boolean, size: 'sm' | 'md' = 'md') {
  return cn(control, size === 'sm' ? 'h-9' : 'h-11', invalid ? 'border-critical/60' : 'border-white/10')
}

export function TextField({
  label,
  error,
  hint,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-fg-2">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClass(!!error)}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-critical">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-fg-3">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function SelectField({
  label,
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-fg-2">
        {label}
      </label>
      <select
        id={id}
        className={cn(inputClass(), 'appearance-none bg-[length:12px] pr-9')}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}) {
  const id = useId()
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {description && <p className="mt-0.5 text-sm text-fg-3">{description}</p>}
      </div>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors',
          checked ? 'border-signal/40 bg-signal' : 'border-white/10 bg-ink-700',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full transition-transform',
            checked ? 'translate-x-5 bg-signal-ink' : 'bg-fg-3',
          )}
        />
      </button>
    </div>
  )
}
