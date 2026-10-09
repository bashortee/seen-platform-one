import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Clock, Unplug } from 'lucide-react'
import { BarChart } from '@/components/charts/BarChart'
import { ChartCard } from '@/components/charts/ChartCard'
import { LineChart } from '@/components/charts/LineChart'
import { Badge, DemoBadge } from '@/components/ui/Badge'
import { Delta, PageHeader } from '@/components/ui/Misc'
import { NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import { contentMix, socialChannels, weeklyEngagement, weeks } from '@/data/demo'
import { formatNumber } from '@/lib/cn'
import { useDemoData } from '@/lib/useDemoData'

export const Route = createFileRoute('/app/social')({
  head: () => ({ meta: [{ title: 'Social presence — SEEN' }] }),
  component: Social,
})

const engagementKeys = Object.keys(weeklyEngagement) as Array<keyof typeof weeklyEngagement>
type ChannelFilter = 'all' | (typeof engagementKeys)[number]

function Social() {
  const [channel, setChannel] = useState<ChannelFilter>('all')
  const status = useDemoData()
  const chartStatus = useDemoData(channel, 300)

  const series = useMemo(
    () =>
      engagementKeys
        .map((label, colorIndex) => ({ label, colorIndex, data: weeklyEngagement[label] }))
        .filter((s) => channel === 'all' || s.label === channel),
    [channel],
  )

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Social presence"
        description="Reach, engagement and posting rhythm across channels — and where the gaps are."
      />

      <div role="note" className="mb-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-ink-900/60 p-4 text-sm text-fg-2">
        <Unplug className="mt-0.5 h-4 w-4 shrink-0 text-fg-3" aria-hidden />
        <p>
          No social accounts are connected. The handles and figures below belong to a fictional demo
          artist and illustrate how SEEN will summarise your channels once connections are available.
        </p>
      </div>

      {status === 'off' ? (
        <NotConnectedState what="social data" />
      ) : (
        <>
          <section aria-label="Channels" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {status === 'loading'
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)
              : socialChannels.map((c) => {
                  const quiet = c.lastPostDaysAgo > 14
                  return (
                    <article key={c.id} className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-sm font-medium">{c.name}</h2>
                          <p className="text-xs text-fg-3">{c.handle}</p>
                        </div>
                        <Badge>
                          <Unplug className="h-3 w-3" aria-hidden /> Not connected
                        </Badge>
                      </div>
                      <p className="mt-6 font-display text-4xl leading-none">{formatNumber(c.followers)}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-fg-3">
                        followers <Delta value={c.growth} />
                      </div>
                      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4 text-xs">
                        <div>
                          <dt className="text-fg-3">Engagement</dt>
                          <dd className="tabular mt-0.5 text-sm text-fg">{c.engagementRate.toFixed(1)}%</dd>
                        </div>
                        <div>
                          <dt className="text-fg-3">Posts / 30d</dt>
                          <dd className="tabular mt-0.5 text-sm text-fg">{c.postsPer30d}</dd>
                        </div>
                      </dl>
                      <p className={quiet ? 'mt-4 flex items-center gap-1.5 text-xs text-warning' : 'mt-4 flex items-center gap-1.5 text-xs text-fg-3'}>
                        <Clock className="h-3 w-3" aria-hidden />
                        Last post {c.lastPostDaysAgo} days ago{quiet && ' — gone quiet'}
                      </p>
                    </article>
                  )
                })}
          </section>

          <ChartCard
            className="mt-4"
            title="Weekly engagements"
            description="Likes, comments, shares and saves per week"
            status={status === 'ready' ? chartStatus : status}
            legend={channel === 'all' ? series.map((s) => s.label) : undefined}
            actions={
              <Tabs
                label="Channel"
                size="sm"
                value={channel}
                onChange={setChannel}
                options={[{ value: 'all' as ChannelFilter, label: 'All' }, ...engagementKeys.map((k) => ({ value: k as ChannelFilter, label: k }))]}
              />
            }
            table={{
              headers: ['Week', ...series.map((s) => s.label)],
              rows: weeks.map((w, i) => [w, ...series.map((s) => s.data[i])]),
            }}
          >
            <LineChart labels={weeks} series={series} ariaLabel="Line chart of weekly social engagements, demo data" />
          </ChartCard>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <ChartCard
              title="What content works"
              description="Average engagement rate by format, last 90 days"
              status={status}
              table={{
                headers: ['Format', 'Posts', 'Avg engagement %'],
                rows: contentMix.map((c) => [c.format, c.posts, c.avgEngagement]),
              }}
            >
              <BarChart
                horizontal
                labels={contentMix.map((c) => c.format)}
                data={contentMix.map((c) => c.avgEngagement)}
                label="Avg engagement"
                unit="%"
                ariaLabel="Bar chart of engagement rate by content format, demo data"
              />
            </ChartCard>

            <section className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-6">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-medium">Presence gaps</h2>
                <DemoBadge />
              </div>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="border-l-2 border-warning/60 pl-4">
                  <p className="font-medium">YouTube has gone quiet</p>
                  <p className="mt-1 text-fg-2">18 days since the last upload. Live session clips could be reused as Shorts.</p>
                </li>
                <li className="border-l-2 border-warning/60 pl-4">
                  <p className="font-medium">X engagement is low</p>
                  <p className="mt-1 text-fg-2">1.2% engagement and shrinking followers. Consider posting less there and more on TikTok.</p>
                </li>
                <li className="border-l-2 border-signal/60 pl-4">
                  <p className="font-medium">TikTok is growing fastest</p>
                  <p className="mt-1 text-fg-2">+12.1% followers with only six posts in 30 days — more frequent posting is likely to help.</p>
                </li>
              </ul>
            </section>
          </div>
        </>
      )}
    </>
  )
}
