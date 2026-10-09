import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { BarChart } from '@/components/charts/BarChart'
import { ChartCard } from '@/components/charts/ChartCard'
import { LineChart } from '@/components/charts/LineChart'
import { SERIES } from '@/components/charts/theme'
import { Card } from '@/components/ui/Card'
import { DemoBadge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { Delta, PageHeader, StatTile } from '@/components/ui/Misc'
import { NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import {
  listenerFunnel,
  performanceKpis,
  performanceRanges,
  releaseById,
  streamsBySource,
  tracks,
  weeks,
  type PerformanceRange,
} from '@/data/demo'
import { cn, formatNumber } from '@/lib/cn'
import { useDemoData } from '@/lib/useDemoData'

export const Route = createFileRoute('/app/performance')({
  head: () => ({ meta: [{ title: 'Performance — SEEN' }] }),
  component: Performance,
})

const sources = Object.keys(streamsBySource) as Array<keyof typeof streamsBySource>

function Performance() {
  const [range, setRange] = useState<PerformanceRange>('14w')
  const [active, setActive] = useState<string[]>(sources)
  const status = useDemoData()
  const chartStatus = useDemoData(range, 350)

  const n = performanceRanges[range]
  const labels = weeks.slice(-n)
  const series = useMemo(
    () =>
      sources
        .map((label, colorIndex) => ({ label, colorIndex, data: streamsBySource[label].slice(-n) }))
        .filter((s) => active.includes(s.label)),
    [active, n],
  )

  function toggle(label: string) {
    setActive((a) =>
      a.includes(label) ? (a.length > 1 ? a.filter((x) => x !== label) : a) : [...a, label],
    )
  }

  const released = tracks.filter((t) => t.streams > 0)
  const topByStreams = [...released].sort((a, b) => b.streams - a.streams).slice(0, 6)

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Performance analytics"
        description="How listening is changing, where it comes from, and which tracks are carrying momentum."
        actions={
          <Tabs
            label="Time range"
            value={range}
            onChange={setRange}
            options={[
              { value: '4w', label: 'Last 4 weeks' },
              { value: '8w', label: '8 weeks' },
              { value: '14w', label: '14 weeks' },
            ]}
          />
        }
      />

      <section aria-label="Key figures" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {status === 'ready'
          ? performanceKpis.map((k) => <StatTile key={k.label} {...k} invertDelta={k.label.startsWith('Skip')} />)
          : status === 'loading'
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[132px] rounded-2xl" />)
            : null}
      </section>

      <ChartCard
        className="mt-4"
        title="Streams by discovery source"
        description="Weekly streams. Select sources to compare."
        status={status === 'ready' ? chartStatus : status}
        height={300}
        emptyLabel="streaming data"
        actions={
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter sources">
            {sources.map((s, i) => {
              const on = active.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s)}
                  className={cn(
                    'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs transition-colors',
                    on ? 'border-white/15 bg-white/[0.05] text-fg' : 'border-white/[0.06] text-fg-3 hover:text-fg-2',
                  )}
                >
                  <span className="grid h-3 w-3 place-items-center rounded-full" style={{ background: on ? SERIES[i] : 'transparent', boxShadow: `inset 0 0 0 1.5px ${SERIES[i]}` }}>
                    {on && <Check className="h-2 w-2 text-ink-950" strokeWidth={4} aria-hidden />}
                  </span>
                  {s}
                </button>
              )
            })}
          </div>
        }
        table={{
          headers: ['Week', ...series.map((s) => s.label)],
          rows: labels.map((w, i) => [w, ...series.map((s) => s.data[i])]),
        }}
      >
        <LineChart labels={labels} series={series} height={300} ariaLabel="Line chart of weekly streams by discovery source, demo data" />
      </ChartCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Listener journey"
          description="From first reach to following, last 28 days"
          status={status}
          emptyLabel="listener data"
          table={{
            headers: ['Stage', 'Listeners', '% of reached'],
            rows: listenerFunnel.map((f) => [f.stage, f.value, `${((f.value / listenerFunnel[0].value) * 100).toFixed(1)}%`]),
          }}
        >
          <ol className="space-y-4">
            {listenerFunnel.map((f) => {
              const pct = (f.value / listenerFunnel[0].value) * 100
              return (
                <li key={f.stage}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-fg-2">{f.stage}</span>
                    <span className="tabular">
                      {formatNumber(f.value)} <span className="text-xs text-fg-3">· {pct.toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="mt-2 h-7 rounded-md bg-white/[0.03]">
                    <div className="h-full rounded-md bg-series-1" style={{ width: `${Math.max(pct, 2)}%` }} />
                  </div>
                </li>
              )
            })}
          </ol>
        </ChartCard>

        <ChartCard
          title="Streams by track"
          description="Lifetime streams, top six"
          status={status}
          emptyLabel="track data"
          table={{ headers: ['Track', 'Streams'], rows: topByStreams.map((t) => [t.title, t.streams]) }}
        >
          <BarChart
            horizontal
            labels={topByStreams.map((t) => t.title)}
            data={topByStreams.map((t) => t.streams)}
            label="Streams"
            height={250}
            ariaLabel="Bar chart of lifetime streams per track, demo data"
          />
        </ChartCard>
      </div>

      <Card
        className="mt-4"
        title={
          <span className="flex items-center gap-2">
            Track momentum {status !== 'off' && <DemoBadge />}
          </span>
        }
        description="Sort by any column to find what is rising or fading."
      >
        {status === 'off' ? (
          <NotConnectedState what="track data" />
        ) : status === 'loading' ? (
          <Skeleton className="h-64" />
        ) : (
          <DataTable
            caption="Track momentum (demo data)"
            rows={released}
            rowKey={(t) => t.id}
            initialSort={{ key: 'trend', dir: 'desc' }}
            columns={[
              { key: 'title', header: 'Track', sortValue: (t) => t.title, cell: (t) => <span className="text-fg">{t.title}</span> },
              { key: 'release', header: 'Release', hideOnMobile: true, cell: (t) => releaseById(t.releaseId)?.title },
              { key: 'streams', header: 'Streams', align: 'right', sortValue: (t) => t.streams, cell: (t) => formatNumber(t.streams) },
              { key: 'save', header: 'Save rate', align: 'right', sortValue: (t) => t.saveRate, cell: (t) => `${t.saveRate.toFixed(1)}%` },
              { key: 'trend', header: '4W trend', align: 'right', sortValue: (t) => t.trend, cell: (t) => <Delta value={t.trend} /> },
            ]}
          />
        )}
      </Card>
    </>
  )
}
