import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Disc3 } from 'lucide-react'
import { ChartCard } from '@/components/charts/ChartCard'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { OpportunityCard } from '@/components/OpportunityCard'
import { Card } from '@/components/ui/Card'
import { buttonClass } from '@/components/ui/Button'
import { DemoBadge } from '@/components/ui/Badge'
import { Delta, PageHeader, ProgressBar, StatTile } from '@/components/ui/Misc'
import { NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import {
  citySignals,
  demoArtist,
  opportunities,
  performanceKpis,
  performanceRanges,
  releases,
  socialChannels,
  streamsBySource,
  tracks,
  weeks,
  type PerformanceRange,
} from '@/data/demo'
import { formatNumber } from '@/lib/cn'

import {
  usePreferences,
  usePreferencesHydrated,
} from '@/lib/preferences'
import { useDemoData } from '@/lib/useDemoData'
import { ArtistProfiles } from '@/components/ArtistProfiles'

export const Route = createFileRoute('/app/')({
  head: () => ({ meta: [{ title: 'Dashboard — SEEN' }] }),
  component: Dashboard,
})

const roleIntro = {
  artist: 'Your week at a glance',
  manager: 'Roster overview',
  label: 'Label overview',
} as const

function Dashboard() {
 
const { role, displayName, showDemoData } = usePreferences()
const isHydrated = usePreferencesHydrated()
  const [range, setRange] = useState<PerformanceRange>('14w')
  const status = useDemoData()
  const chartStatus = useDemoData(range, 350)

  const sliced = useMemo(() => {
    const n = performanceRanges[range]
    return {
      labels: weeks.slice(-n),
      series: Object.entries(streamsBySource).map(([label, data]) => ({ label, data: data.slice(-n) })),
    }
  }, [range])

  return (
    <>
          <ArtistProfiles />
      <PageHeader
        eyebrow={role ? roleIntro[role] : 'Dashboard'}
        
title={
  !isHydrated
    ? 'Loading your dashboard…'
    : displayName
      ? `Good to see you, ${displayName.split(' ')[0]}.`
      : showDemoData
        ? `${demoArtist.name}, this week.`
        : 'Your dashboard'
}
        
description={
  !isHydrated
    ? 'Loading your saved preferences…'
    : showDemoData
      ? (
          <>
            Viewing{' '}
            <strong className="font-medium text-fg">
              {demoArtist.name}
            </strong>
            , a fictional demo artist. All figures below are sample data to
            show how SEEN will present your own.
          </>
        )
      : 'Your music workspace. Your dashboard will show your artist data here.'
}
        actions={
          <Link to="/app/assistant" className={buttonClass('secondary', 'md')}>
            Ask SEEN about this week <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
      />

      {/* KPI row */}
      <section aria-label="Key figures" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {status === 'off'
          ? null
          : status === 'loading'
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[132px] rounded-2xl" />)
            : performanceKpis.map((k) => (
                <StatTile key={k.label} {...k} invertDelta={k.label.startsWith('Skip')} />
              ))}
      </section>

      <div className="mt-4">
        <ChartCard
          title="Performance trend"
          description="Weekly streams by discovery source"
          status={status === 'ready' ? chartStatus : status}
          legend={sliced.series.map((s) => s.label)}
          emptyLabel="streaming data"
          actions={
            <Tabs
              label="Time range"
              size="sm"
              value={range}
              onChange={setRange}
              options={[
                { value: '4w', label: '4W' },
                { value: '8w', label: '8W' },
                { value: '14w', label: '14W' },
              ]}
            />
          }
          table={{
            headers: ['Week', ...sliced.series.map((s) => s.label)],
            rows: sliced.labels.map((w, i) => [w, ...sliced.series.map((s) => s.data[i])]),
          }}
        >
          <LineChart labels={sliced.labels} series={sliced.series} ariaLabel="Line chart of weekly streams by source, demo data" />
        </ChartCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <CatalogueOverview status={status} />

        <ChartCard
          title="Geographic signals"
          description="Top cities by listeners, last 28 days"
          status={status}
          emptyLabel="audience data"
          height={260}
          actions={
            <Link to="/app/audience" className="text-xs text-fg-3 hover:text-fg">
              View all
            </Link>
          }
          table={{
            headers: ['City', 'Listeners', 'Growth %'],
            rows: citySignals.slice(0, 5).map((c) => [c.city, c.listeners, c.growth]),
          }}
        >
          <BarChart
            horizontal
            labels={citySignals.slice(0, 5).map((c) => c.city)}
            data={citySignals.slice(0, 5).map((c) => c.listeners)}
            label="Listeners"
            ariaLabel="Bar chart of listeners by city, demo data"
          />
        </ChartCard>

        <SocialSnapshot status={status} />
      </div>

      <section aria-labelledby="actions-heading" className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="actions-heading" className="font-display text-2xl">
              Recommended actions
            </h2>
            <p className="mt-1 text-sm text-fg-3">Derived from the demo signals above.</p>
          </div>
          <Link to="/app/opportunities" className="text-sm text-fg-2 hover:text-fg">
            All opportunities →
          </Link>
        </div>
        {status === 'off' ? (
          <NotConnectedState what="recommendations" />
        ) : status === 'loading' ? (
          <div className="grid gap-3 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {opportunities.slice(0, 3).map((o) => (
              <OpportunityCard key={o.id} o={o} compact />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function CatalogueOverview({ status }: { status: ReturnType<typeof useDemoData> }) {
  const released = releases.filter((r) => r.status === 'Released')
  const avgMeta = Math.round(releases.reduce((s, r) => s + r.metadataScore, 0) / releases.length)
  const top = [...tracks].sort((a, b) => b.streams - a.streams).slice(0, 3)

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          Catalogue overview {status !== 'off' && <DemoBadge />}
        </span>
      }
      actions={
        <Link to="/app/catalogue" className="text-xs text-fg-3 hover:text-fg">
          Open catalogue
        </Link>
      }
    >
      {status === 'off' ? (
        <NotConnectedState what="catalogue" />
      ) : status === 'loading' ? (
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-40" />
        </div>
      ) : (
        <>
          <dl className="grid grid-cols-3 gap-3">
            {[
              ['Releases', releases.length],
              ['Released', released.length],
              ['Tracks', tracks.length],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-fg-3">{k}</dt>
                <dd className="mt-1 font-display text-2xl leading-none">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <div className="flex justify-between text-xs">
              <span className="text-fg-3">Average metadata health</span>
              <span className="tabular text-fg-2">{avgMeta}%</span>
            </div>
            <ProgressBar value={avgMeta} label="Average metadata health" className="mt-2" />
          </div>
          <ul className="mt-6 divide-y divide-white/[0.05]">
            {top.map((t, i) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5">
                <span className="w-4 font-mono text-[11px] text-fg-3">{i + 1}</span>
                <Disc3 className="h-4 w-4 text-fg-3" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                <span className="tabular text-xs text-fg-2">{formatNumber(t.streams)}</span>
                <Delta value={t.trend} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  )
}

function SocialSnapshot({ status }: { status: ReturnType<typeof useDemoData> }) {
  const max = Math.max(...socialChannels.map((c) => c.followers))
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          Social presence {status !== 'off' && <DemoBadge />}
        </span>
      }
      description="Followers and 30-day growth"
      actions={
        <Link to="/app/social" className="text-xs text-fg-3 hover:text-fg">
          View details
        </Link>
      }
    >
      {status === 'off' ? (
        <NotConnectedState what="social data" />
      ) : status === 'loading' ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
        </div>
      ) : (
        <ul className="space-y-5">
          {socialChannels.map((c) => (
            <li key={c.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm">
                  {c.name} <span className="text-xs text-fg-3">{c.handle}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular text-sm text-fg-2">{formatNumber(c.followers)}</span>
                  <Delta value={c.growth} />
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[0.05]">
                <div className="h-full rounded-full bg-series-1" style={{ width: `${(c.followers / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
