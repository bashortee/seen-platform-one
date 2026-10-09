import { Link } from '@tanstack/react-router'
import { Check, Plus } from 'lucide-react'
import type { Opportunity } from '@/data/demo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { addTaskFromOpportunity } from '@/lib/tasks'
import { usePreferences } from '@/lib/preferences'

const impactTone = { High: 'signal', Medium: 'info', Low: 'neutral' } as const

export function OpportunityCard({ o, compact = false }: { o: Opportunity; compact?: boolean }) {
  const { tasks } = usePreferences()
  const planned = tasks.some((t) => t.opportunityId === o.id)

  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.07] bg-ink-850/70 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={impactTone[o.impact]}>{o.impact} impact</Badge>
        <Badge>{o.effort} effort</Badge>
        <span className="text-[11px] text-fg-3">{o.category}</span>
      </div>
      <h3 className="mt-3 text-[15px] leading-snug font-medium text-fg">{o.title}</h3>
      {!compact && <p className="mt-2 text-sm text-fg-2">{o.rationale}</p>}
      <p className="mt-2 font-mono text-[11px] text-fg-3">{o.evidence}</p>
      <div className="mt-auto pt-4">
        {planned ? (
          <Link to="/app/actions" className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-soft hover:underline">
            <Check className="h-3.5 w-3.5" aria-hidden /> In your action planner
          </Link>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => addTaskFromOpportunity(o)}>
            <Plus className="h-3.5 w-3.5" aria-hidden /> Add to planner
          </Button>
        )}
      </div>
    </article>
  )
}
