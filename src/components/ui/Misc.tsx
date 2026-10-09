import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn, formatDelta, formatNumber } from '@/lib/cn'
import { DemoBadge } from './Badge'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  demo = true,
}: {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  demo?: boolean
}) {
  return (
    <div className="rise flex flex-col gap-5 pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          {eyebrow && (
            <p className="text-sm text-fg-3">
              {eyebrow}
            </p>
          )}
          {demo && <DemoBadge />}
        </div>
        <h1 className="mt-2 font-display text-3xl leading-tight text-fg sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  const good = invert ? value < 0 : value > 0
  const Icon = value > 0 ? ArrowUpRight : value < 0 ? ArrowDownRight : Minus
  return (
    <span
      className={cn(
        'tabular inline-flex items-center gap-0.5 text-xs font-medium',
        value === 0 ? 'text-fg-3' : good ? 'text-[#5fd35f]' : 'text-critical',
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {formatDelta(value)}
      <span className="sr-only">{good ? '(improving)' : value === 0 ? '' : '(declining)'}</span>
    </span>
  )
}

export function StatTile({
  label,
  value,
  unit,
  delta,
  hint,
  invertDelta,
}: {
  label: string
  value: number
  unit?: string
  delta?: number
  hint?: string
  invertDelta?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
      <p className="text-[13px] text-fg-3">{label}</p>
      <p className="mt-3 font-display text-3xl leading-none text-fg">
        {unit ? value.toFixed(1) : formatNumber(value)}
        {unit && <span className="ml-0.5 text-xl text-fg-2">{unit}</span>}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {delta !== undefined && <Delta value={delta} invert={invertDelta} />}
        {hint && <span className="text-xs text-fg-3">{hint}</span>}
      </div>
    </div>
  )
}

export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      aria-label={label}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]', className)}
    >
      <div
        className="h-full rounded-full bg-signal transition-[width] duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span aria-hidden className="flex h-5 items-end gap-[3px]">
        <span className="h-2.5 w-[3px] rounded-full bg-signal" />
        <span className="h-5 w-[3px] rounded-full bg-signal" />
        <span className="h-3.5 w-[3px] rounded-full bg-signal" />
        <span className="h-1.5 w-[3px] rounded-full bg-signal/60" />
      </span>
      <span className="text-[17px] font-semibold tracking-[0.2em] text-fg">SEEN</span>
    </span>
  )
}
