import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertOctagon, AlertTriangle, Check, CircleAlert, Plus } from 'lucide-react'
import { OpportunityCard } from '@/components/OpportunityCard'
import { DemoBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/Misc'
import { EmptyState, NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import {
  careerGaps,
  opportunities,
  type CareerGap,
  type OpportunityCategory,
} from '@/data/demo'
import { cn } from '@/lib/cn'
import { usePreferences } from '@/lib/preferences'
import { addTask } from '@/lib/tasks'
import { useDemoData } from '@/lib/useDemoData'

export const Route = createFileRoute('/app/opportunities')({
  head: () => ({ meta: [{ title: 'Opportunities & gaps — SEEN' }] }),
  component: Opportunities,
})

const categories: Array<OpportunityCategory | 'All'> = ['All', 'Release', 'Audience', 'Playlisting', 'Social', 'Live', 'Metadata']
const rank = { High: 3, Medium: 2, Low: 1 }

const severityMeta = {
  critical: { label: 'Critical', icon: AlertOctagon, className: 'text-critical border-critical/40' },
  serious: { label: 'Serious', icon: AlertTriangle, className: 'text-serious border-serious/40' },
  warning: { label: 'Worth fixing', icon: CircleAlert, className: 'text-warning border-warning/40' },
} as const

function Opportunities() {
  const [tab, setTab] = useState<'opportunities' | 'gaps'>('opportunities')
  const [category, setCategory] = useState<OpportunityCategory | 'All'>('All')
  const [sort, setSort] = useState<'impact' | 'effort'>('impact')
  const status = useDemoData()

  const list = useMemo(() => {
    const filtered = opportunities.filter((o) => category === 'All' || o.category === category)
    return [...filtered].sort((a, b) =>
      sort === 'impact' ? rank[b.impact] - rank[a.impact] : rank[a.effort] - rank[b.effort],
    )
  }, [category, sort])

  return (
    <>
      <PageHeader
        eyebrow="Act"
        title="Opportunities & career gaps"
        description="What SEEN would do next with this catalogue and audience, and what is holding it back."
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          label="Section"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'opportunities', label: 'Opportunities', count: opportunities.length },
            { value: 'gaps', label: 'Career gaps', count: careerGaps.length },
          ]}
        />
        {tab === 'opportunities' && (
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="opp-sort" className="text-fg-3">Sort by</label>
            <select
              id="opp-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as 'impact' | 'effort')}
              className="h-9 rounded-full border border-white/10 bg-ink-900 px-3 text-sm"
            >
              <option value="impact">Highest impact</option>
              <option value="effort">Lowest effort</option>
            </select>
          </div>
        )}
      </div>

      {status === 'off' ? (
        <NotConnectedState what="recommendations" />
      ) : status === 'loading' ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-2xl" />)}
        </div>
      ) : tab === 'opportunities' ? (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  'h-8 rounded-full border px-3 text-xs transition-colors',
                  category === c ? 'border-signal/40 bg-signal/10 text-signal-soft' : 'border-white/[0.08] text-fg-3 hover:text-fg',
                )}
              >
                {c}
              </button>
            ))}
            <DemoBadge className="ml-auto" />
          </div>
          {list.length === 0 ? (
            <EmptyState
              title={`No ${category.toLowerCase()} opportunities right now`}
              description="SEEN hasn't spotted anything in this category in the demo data. Try another category."
              action={<Button variant="secondary" size="sm" onClick={() => setCategory('All')}>Show all</Button>}
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {list.map((o) => (
                <OpportunityCard key={o.id} o={o} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-5 flex justify-end">
            <DemoBadge />
          </div>
          <ol className="space-y-3">
            {careerGaps.map((g) => (
              <GapRow key={g.id} gap={g} />
            ))}
          </ol>
        </>
      )}
    </>
  )
}

function GapRow({ gap }: { gap: CareerGap }) {
  const { tasks } = usePreferences()
  const planned = tasks.some((t) => t.title === gap.fix)
  const m = severityMeta[gap.severity]

  return (
    <li className="grid gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5 md:grid-cols-[160px_1fr_auto] md:items-center">
      <span className={cn('inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium', m.className)}>
        <m.icon className="h-3.5 w-3.5" aria-hidden />
        {m.label}
      </span>
      <div>
        <h3 className="font-medium">{gap.title}</h3>
        <p className="mt-1 text-sm text-fg-2">{gap.detail}</p>
        <p className="mt-2 text-sm text-fg-3">
          <span className="text-fg-2">Suggested fix:</span> {gap.fix}
        </p>
      </div>
      {planned ? (
        <Link to="/app/actions" className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-soft hover:underline">
          <Check className="h-3.5 w-3.5" aria-hidden /> Planned
        </Link>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const due = new Date()
            due.setDate(due.getDate() + 7)
            addTask({
              title: gap.fix,
              status: 'todo',
              priority: gap.severity === 'critical' ? 'High' : gap.severity === 'serious' ? 'Medium' : 'Low',
              due: due.toISOString().slice(0, 10),
              category: 'Release',
            })
          }}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Create task
        </Button>
      )}
    </li>
  )
}
