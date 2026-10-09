import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Flame, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { BarChart } from '@/components/charts/BarChart'
import { ChartCard } from '@/components/charts/ChartCard'
import { Card } from '@/components/ui/Card'
import { Badge, DemoBadge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { Delta, PageHeader } from '@/components/ui/Misc'
import { EmptyState, NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import { ageBands, citySignals, listenerTypes, type CitySignal } from '@/data/demo'
import { formatNumber } from '@/lib/cn'
import { useDemoData } from '@/lib/useDemoData'

export const Route = createFileRoute('/app/audience')({
  head: () => ({ meta: [{ title: 'Audience & geography — SEEN' }] }),
  component: Audience,
})

type Region = CitySignal['region'] | 'All'
const regions: Region[] = ['All', 'Europe', 'North America', 'Latin America', 'Asia-Pacific', 'Africa']

const signalMeta = {
  Breakout: { tone: 'signal', icon: Flame },
  Rising: { tone: 'good', icon: TrendingUp },
  Steady: { tone: 'neutral', icon: Minus },
  Cooling: { tone: 'serious', icon: TrendingDown },
} as const

function Audience() {
  const [region, setRegion] = useState<Region>('All')
  const status = useDemoData()

  const cities = useMemo(
    () => citySignals.filter((c) => region === 'All' || c.region === region),
    [region],
  )
  const breakouts = citySignals.filter((c) => c.signal === 'Breakout')
  const total = citySignals.reduce((s, c) => s + c.listeners, 0)

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Audience & geography"
        description="Who is listening, where they are, and which places are starting to pay attention."
      />

      {status === 'off' ? (
        <NotConnectedState what="audience data" />
      ) : (
        <>
          <section aria-labelledby="breakout-heading" className="grid gap-3 md:grid-cols-[1fr_2fr]">
            <div className="rounded-2xl border border-signal/20 bg-signal/[0.04] p-6">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-signal-soft" aria-hidden />
                <h2 id="breakout-heading" className="text-sm font-medium">Breakout cities</h2>
                <DemoBadge />
              </div>
              <p className="mt-4 text-sm text-fg-2">
                Cities growing more than 25% in 28 days. These are the places where a show, an ad test
                or localised content is most likely to pay off.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {status === 'loading'
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)
                : breakouts.map((c) => (
                    <div key={c.city} className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
                      <p className="text-xs text-fg-3">{c.country}</p>
                      <p className="mt-1 text-lg font-medium">{c.city}</p>
                      <p className="mt-4 font-display text-3xl leading-none">{formatNumber(c.listeners)}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-fg-3">
                        <Delta value={c.growth} /> listeners
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          <Card
            className="mt-4"
            title={
              <span className="flex items-center gap-2">
                City signals <DemoBadge />
              </span>
            }
            description={`${formatNumber(total)} listeners across the top ${citySignals.length} cities, last 28 days`}
            actions={
              <Tabs
                label="Region"
                size="sm"
                value={region}
                onChange={setRegion}
                options={regions.map((r) => ({
                  value: r,
                  label: r,
                  count: r === 'All' ? undefined : citySignals.filter((c) => c.region === r).length,
                }))}
              />
            }
          >
            {status === 'loading' ? (
              <Skeleton className="h-72" />
            ) : (
              <DataTable
                caption="City listener signals (demo data)"
                rows={cities}
                rowKey={(c) => c.city}
                initialSort={{ key: 'listeners', dir: 'desc' }}
                empty={<EmptyState title="No cities in this region yet" description="Try another region." />}
                columns={[
                  {
                    key: 'city',
                    header: 'City',
                    sortValue: (c) => c.city,
                    cell: (c) => (
                      <div>
                        <p className="text-fg">{c.city}</p>
                        <p className="text-xs text-fg-3">{c.country}</p>
                      </div>
                    ),
                  },
                  { key: 'region', header: 'Region', hideOnMobile: true, sortValue: (c) => c.region, cell: (c) => c.region },
                  { key: 'listeners', header: 'Listeners', align: 'right', sortValue: (c) => c.listeners, cell: (c) => formatNumber(c.listeners) },
                  {
                    key: 'share',
                    header: 'Share',
                    hideOnMobile: true,
                    sortValue: (c) => c.listeners,
                    cell: (c) => (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-white/[0.05]">
                          <div className="h-full rounded-full bg-series-1" style={{ width: `${(c.listeners / citySignals[0].listeners) * 100}%` }} />
                        </div>
                        <span className="tabular text-xs text-fg-3">{((c.listeners / total) * 100).toFixed(1)}%</span>
                      </div>
                    ),
                  },
                  { key: 'growth', header: '28D growth', align: 'right', sortValue: (c) => c.growth, cell: (c) => <Delta value={c.growth} /> },
                  {
                    key: 'signal',
                    header: 'Signal',
                    sortValue: (c) => c.signal,
                    cell: (c) => {
                      const m = signalMeta[c.signal]
                      return (
                        <Badge tone={m.tone}>
                          <m.icon className="h-3 w-3" aria-hidden /> {c.signal}
                        </Badge>
                      )
                    },
                  },
                ]}
              />
            )}
          </Card>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="Age of listeners"
              description="Share of listeners by age band"
              status={status}
              table={{ headers: ['Age', 'Share %'], rows: ageBands.map((a) => [a.band, a.share]) }}
            >
              <BarChart
                labels={ageBands.map((a) => a.band)}
                data={ageBands.map((a) => a.share)}
                label="Share of listeners"
                unit="%"
                ariaLabel="Bar chart of listener age bands, demo data"
              />
            </ChartCard>

            <Card
              title={
                <span className="flex items-center gap-2">
                  Listener engagement <DemoBadge />
                </span>
              }
              description="How regularly the audience comes back"
            >
              {status === 'loading' ? (
                <Skeleton className="h-48" />
              ) : (
                <>
                  <div className="flex h-10 gap-[2px] overflow-hidden rounded-lg" aria-hidden>
                    {listenerTypes.map((l, i) => (
                      <div key={l.label} style={{ width: `${l.share}%`, background: ['#3987e5', '#256abf', '#383835'][i] }} />
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {listenerTypes.map((l, i) => (
                      <li key={l.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2.5 text-fg-2">
                          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ['#3987e5', '#256abf', '#383835'][i] }} aria-hidden />
                          {l.label}
                        </span>
                        <span className="tabular">{l.share.toFixed(1)}%</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-xl border border-white/[0.06] p-4 text-sm text-fg-2">
                    A quarter of listeners haven't played a track in 28 days. A new release or a
                    stripped session is the usual way to bring them back.
                  </p>
                </>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  )
}
