import { FlaskConical } from 'lucide-react'
import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'signal' | 'good' | 'warning' | 'serious' | 'critical' | 'info'

const tones: Record<Tone, string> = {
  neutral: 'border-white/10 bg-white/[0.04] text-fg-2',
  signal: 'border-signal/25 bg-signal/10 text-signal-soft',
  good: 'border-good/30 bg-good/10 text-[#5fd35f]',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  serious: 'border-serious/30 bg-serious/10 text-serious',
  critical: 'border-critical/30 bg-critical/10 text-critical',
  info: 'border-series-1/30 bg-series-1/10 text-[#7fb2f0]',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Required on every chart, figure and table built from sample data. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      title="Sample data for a fictional artist. Not real performance data."
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-warning/25 bg-warning/[0.08] px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-warning uppercase',
        className,
      )}
    >
      <FlaskConical className="h-3 w-3" aria-hidden />
      Demo data
    </span>
  )
}
