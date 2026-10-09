import { Link } from '@tanstack/react-router'
import { AlertTriangle, PlugZap } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button, buttonClass } from './Button'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('skeleton rounded-lg', className)} />
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-800 text-fg-2">
        {icon ?? <PlugZap className="h-5 w-5" aria-hidden />}
      </div>
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-fg-3">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

/** Shown wherever data would appear when demo data is switched off. */
export function NotConnectedState({ what }: { what: string }) {
  return (
    <EmptyState
      title={`No ${what} yet`}
      description="SEEN isn't connected to any music or social platform. Connections arrive in a later release — until then you can preview the interface with demo data."
      action={
        <Link to="/app/settings" search={{ tab: 'data' }} className={buttonClass('secondary', 'sm')}>
          Open data settings
        </Link>
      }
    />
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: {
  title?: string
  description?: React.ReactNode
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-critical/25 bg-critical/[0.06] p-5 sm:flex-row sm:items-center"
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-critical" aria-hidden />
      <div className="flex-1">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description && <p className="mt-0.5 text-sm text-fg-2">{description}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
