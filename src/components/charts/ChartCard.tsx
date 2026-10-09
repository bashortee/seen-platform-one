import { useState } from 'react'
import { BarChart3, Table2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { DemoBadge } from '@/components/ui/Badge'
import { NotConnectedState, Skeleton } from '@/components/ui/States'
import type { DemoStatus } from '@/lib/useDemoData'
import { cn } from '@/lib/cn'
import { SERIES } from './theme'

export interface TableView {
  headers: string[]
  rows: Array<Array<string | number>>
}

/**
 * Standard frame for every chart: title, demo label, legend, a chart/table
 * toggle (so values are never colour-only), and loading / not-connected states.
 */
export function ChartCard({
  title,
  description,
  status,
  legend,
  table,
  children,
  actions,
  className,
  height = 260,
  emptyLabel = 'data',
}: {
  title: string
  description?: string
  status: DemoStatus
  legend?: string[]
  table?: TableView
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
  height?: number
  emptyLabel?: string
}) {
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <Card
      className={className}
      title={
        <span className="flex flex-wrap items-center gap-2">
          {title}
          {status !== 'off' && <DemoBadge />}
        </span>
      }
      description={description}
      actions={
        status === 'ready' && (
          <>
            {actions}
            {table && (
              <div className="flex rounded-full border border-white/[0.07] p-0.5" role="group" aria-label={`${title} view`}>
                <ViewButton active={view === 'chart'} onClick={() => setView('chart')} label="Chart view">
                  <BarChart3 className="h-3.5 w-3.5" aria-hidden />
                </ViewButton>
                <ViewButton active={view === 'table'} onClick={() => setView('table')} label="Table view">
                  <Table2 className="h-3.5 w-3.5" aria-hidden />
                </ViewButton>
              </div>
            )}
          </>
        )
      }
    >
      {status === 'off' ? (
        <NotConnectedState what={emptyLabel} />
      ) : status === 'loading' ? (
        <div className="flex flex-col justify-end gap-3" style={{ height }} aria-busy="true" aria-label="Loading chart">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="w-full flex-1" />
        </div>
      ) : (
        <>
          {legend && legend.length > 1 && view === 'chart' && (
            <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
              {legend.map((l, i) => (
                <li key={l} className="flex items-center gap-2 text-xs text-fg-2">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: SERIES[i % SERIES.length] }} />
                  {l}
                </li>
              ))}
            </ul>
          )}
          {view === 'chart' || !table ? (
            children
          ) : (
            <div className="overflow-auto" style={{ maxHeight: height + 32 }}>
              <table className="w-full text-sm">
                <caption className="sr-only">{title} (demo data)</caption>
                <thead className="sticky top-0 bg-ink-900">
                  <tr>
                    {table.headers.map((h, i) => (
                      <th key={h} scope="col" className={cn('border-b border-white/[0.07] py-2 text-[11px] font-medium tracking-wider text-fg-3 uppercase', i ? 'text-right' : 'text-left')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((r) => (
                    <tr key={String(r[0])} className="border-b border-white/[0.04]">
                      {r.map((c, i) => (
                        <td key={i} className={cn('tabular py-2 text-fg-2', i ? 'text-right' : 'text-left')}>
                          {typeof c === 'number' ? c.toLocaleString('en-GB') : c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'grid h-7 w-7 place-items-center rounded-full transition-colors',
        active ? 'bg-ink-700 text-fg' : 'text-fg-3 hover:text-fg',
      )}
    >
      {children}
    </button>
  )
}
