import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge, DemoBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { inputClass } from '@/components/ui/Field'
import { Delta, PageHeader, ProgressBar } from '@/components/ui/Misc'
import { EmptyState, NotConnectedState, Skeleton } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import {
  releaseById,
  releases,
  tracks,
  type Release,
  type ReleaseStatus,
  type ReleaseType,
  type Track,
} from '@/data/demo'
import { cn, formatNumber } from '@/lib/cn'
import { useDemoData } from '@/lib/useDemoData'

export const Route = createFileRoute('/app/catalogue')({
  head: () => ({ meta: [{ title: 'Catalogue — SEEN' }] }),
  component: Catalogue,
})

const statusTone = { Released: 'good', Scheduled: 'info', Draft: 'neutral' } as const

function duration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

function dateLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function Catalogue() {
  const [view, setView] = useState<'releases' | 'tracks'>('releases')
  const [query, setQuery] = useState('')
  const [type, setType] = useState<ReleaseType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<ReleaseStatus | 'all'>('all')
  const [selected, setSelected] = useState<Release | null>(null)
  const status = useDemoData()

  const q = query.trim().toLowerCase()
  const filteredReleases = useMemo(
    () =>
      releases.filter(
        (r) =>
          (type === 'all' || r.type === type) &&
          (statusFilter === 'all' || r.status === statusFilter) &&
          (!q || r.title.toLowerCase().includes(q)),
      ),
    [q, type, statusFilter],
  )
  const filteredTracks = useMemo(
    () =>
      tracks.filter((t) => {
        const r = releaseById(t.releaseId)!
        return (
          (type === 'all' || r.type === type) &&
          (statusFilter === 'all' || r.status === statusFilter) &&
          (!q || t.title.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
        )
      }),
    [q, type, statusFilter],
  )

  const hasFilters = q || type !== 'all' || statusFilter !== 'all'
  const clear = () => {
    setQuery('')
    setType('all')
    setStatusFilter('all')
  }

  const trackColumns: Column<Track>[] = [
    {
      key: 'title',
      header: 'Track',
      sortValue: (t) => t.title,
      cell: (t) => (
        <span className="flex items-center gap-2 text-fg">
          {t.title}
          {t.explicit && <span title="Explicit" className="rounded bg-white/10 px-1 text-[9px] font-semibold text-fg-2">E</span>}
        </span>
      ),
    },
    { key: 'release', header: 'Release', cell: (t) => releaseById(t.releaseId)?.title, sortValue: (t) => releaseById(t.releaseId)?.title ?? '', hideOnMobile: true },
    { key: 'duration', header: 'Length', align: 'right', cell: (t) => duration(t.durationSec), sortValue: (t) => t.durationSec, hideOnMobile: true },
    { key: 'isrc', header: 'ISRC', cell: (t) => <span className="font-mono text-xs text-fg-3">{t.isrc}</span>, hideOnMobile: true },
    { key: 'streams', header: 'Streams', align: 'right', cell: (t) => (t.streams ? formatNumber(t.streams) : '—'), sortValue: (t) => t.streams },
    { key: 'save', header: 'Save rate', align: 'right', cell: (t) => (t.saveRate ? `${t.saveRate.toFixed(1)}%` : '—'), sortValue: (t) => t.saveRate },
    { key: 'trend', header: '4W trend', align: 'right', cell: (t) => (t.streams ? <Delta value={t.trend} /> : '—'), sortValue: (t) => t.trend },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Releases & tracks"
        description="Every release in the workspace, with metadata health and track-level performance."
      />

      <Card bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:p-5 lg:flex-row lg:items-center">
          <Tabs
            label="Catalogue view"
            value={view}
            onChange={setView}
            options={[
              { value: 'releases', label: 'Releases', count: filteredReleases.length },
              { value: 'tracks', label: 'Tracks', count: filteredTracks.length },
            ]}
          />
          <div className="flex flex-1 flex-col gap-2 sm:flex-row lg:justify-end">
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-3" aria-hidden />
              <label htmlFor="cat-search" className="sr-only">Search catalogue</label>
              <input
                id="cat-search"
                type="search"
                placeholder="Search titles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(inputClass(false, 'sm'), 'pl-9')}
              />
            </div>
            <label className="sr-only" htmlFor="type-filter">Release type</label>
            <select id="type-filter" value={type} onChange={(e) => setType(e.target.value as ReleaseType | 'all')} className={cn(inputClass(false, 'sm'), 'sm:w-36')}>
              <option value="all">All types</option>
              <option>Album</option>
              <option>EP</option>
              <option>Single</option>
            </select>
            <label className="sr-only" htmlFor="status-filter">Release status</label>
            <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ReleaseStatus | 'all')} className={cn(inputClass(false, 'sm'), 'sm:w-36')}>
              <option value="all">Any status</option>
              <option>Released</option>
              <option>Scheduled</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            {status !== 'off' && <DemoBadge />}
            {hasFilters && (
              <button type="button" onClick={clear} className="inline-flex items-center gap-1 text-xs text-fg-3 hover:text-fg">
                <X className="h-3 w-3" aria-hidden /> Clear filters
              </button>
            )}
          </div>

          {status === 'off' ? (
            <NotConnectedState what="catalogue" />
          ) : status === 'loading' ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)}
            </div>
          ) : view === 'releases' ? (
            filteredReleases.length === 0 ? (
              <NoResults onClear={clear} />
            ) : (
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {filteredReleases.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="group w-full text-left"
                      aria-label={`${r.title}, ${r.type}, ${r.status}. View details`}
                    >
                      <Artwork release={r} />
                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-fg group-hover:text-signal-soft">{r.title}</p>
                          <p className="mt-0.5 text-xs text-fg-3">
                            {r.type} · {dateLabel(r.date)}
                          </p>
                        </div>
                        <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <DataTable
              caption="Tracks in catalogue (demo data)"
              columns={trackColumns}
              rows={filteredTracks}
              rowKey={(t) => t.id}
              initialSort={{ key: 'streams', dir: 'desc' }}
              empty={<NoResults onClear={clear} />}
            />
          )}
        </div>
      </Card>

      {selected && <ReleaseDrawer release={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-5 w-5" aria-hidden />}
      title="Nothing matches those filters"
      description="Try a different title or clear the filters to see the full catalogue."
      action={<Button variant="secondary" size="sm" onClick={onClear}>Clear filters</Button>}
    />
  )
}

function Artwork({ release, className }: { release: Release; className?: string }) {
  const [a, b] = release.artwork
  return (
    <div
      className={cn('relative aspect-square overflow-hidden rounded-2xl border border-white/[0.06] transition-transform duration-300 group-hover:-translate-y-0.5', className)}
      style={{ background: a }}
      aria-hidden
    >
      <div className="absolute -right-1/4 -bottom-1/4 aspect-square w-[90%] rounded-full opacity-80" style={{ background: b }} />
      <div className="absolute -right-1/4 -bottom-1/4 aspect-square w-[60%] rounded-full" style={{ background: a }} />
      <span className="absolute top-3 left-3 font-display text-lg leading-tight text-white/85">{release.title}</span>
    </div>
  )
}

function ReleaseDrawer({ release, onClose }: { release: Release; onClose: () => void }) {
  const list = tracks.filter((t) => t.releaseId === release.id)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const missing = [
    release.metadataScore < 80 && 'Songwriter and producer credits',
    release.metadataScore < 60 && 'Genre and mood tags',
    release.metadataScore < 30 && 'ISRC codes for every track',
  ].filter(Boolean) as string[]

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="release-title">
      <button type="button" aria-label="Close details" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="rise relative h-full w-full max-w-md overflow-y-auto border-l border-white/[0.08] bg-ink-900 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <DemoBadge />
          <button type="button" onClick={onClose} autoFocus className="grid h-8 w-8 place-items-center rounded-full text-fg-2 hover:bg-white/5" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <Artwork release={release} className="mt-6 w-40" />
        <h2 id="release-title" className="mt-5 font-display text-4xl tracking-tight">{release.title}</h2>
        <p className="mt-1 text-sm text-fg-3">
          {release.type} · {dateLabel(release.date)} · UPC <span className="font-mono">{release.upc}</span>
        </p>

        <div className="mt-6 rounded-xl border border-white/[0.06] p-4">
          <div className="flex justify-between text-sm">
            <span className="text-fg-2">Metadata health</span>
            <span className="tabular">{release.metadataScore}%</span>
          </div>
          <ProgressBar value={release.metadataScore} label="Metadata health" className="mt-2" />
          {missing.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-fg-3">
              {missing.map((m) => (
                <li key={m}>Missing: {m}</li>
              ))}
            </ul>
          )}
        </div>

        <h3 className="mt-8 text-sm font-medium">Tracklist</h3>
        {list.length === 0 ? (
          <p className="mt-3 text-sm text-fg-3">No tracks added to this release yet.</p>
        ) : (
          <ol className="mt-3 divide-y divide-white/[0.05]">
            {list.map((t, i) => (
              <li key={t.id} className="flex items-center gap-3 py-3 text-sm">
                <span className="w-4 font-mono text-[11px] text-fg-3">{i + 1}</span>
                <span className="flex-1">{t.title}</span>
                <span className="tabular text-xs text-fg-3">{duration(t.durationSec)}</span>
                <span className="tabular w-14 text-right text-xs text-fg-2">{t.streams ? formatNumber(t.streams) : '—'}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
