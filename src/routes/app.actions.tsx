import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Check, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SelectField, TextField } from '@/components/ui/Field'
import { PageHeader, ProgressBar } from '@/components/ui/Misc'
import { EmptyState } from '@/components/ui/States'
import { Tabs } from '@/components/ui/Tabs'
import type { OpportunityCategory, Task, TaskPriority, TaskStatus } from '@/data/demo'
import { cn } from '@/lib/cn'
import { resetPreferences, usePreferences } from '@/lib/preferences'
import { addTask, removeTask, updateTask } from '@/lib/tasks'

export const Route = createFileRoute('/app/actions')({
  head: () => ({ meta: [{ title: 'Action planner — SEEN' }] }),
  component: Actions,
})

const statusLabels: Record<TaskStatus, string> = { todo: 'To do', doing: 'In progress', done: 'Done' }
const priorityTone = { High: 'critical', Medium: 'warning', Low: 'neutral' } as const
const categories: OpportunityCategory[] = ['Release', 'Audience', 'Playlisting', 'Social', 'Live', 'Metadata']

function dueLabel(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.round((d.getTime() - today.getTime()) / 86_400_000)
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  if (days < 0) return { text: `${date} · overdue`, overdue: true }
  if (days === 0) return { text: 'Today', overdue: false }
  if (days === 1) return { text: 'Tomorrow', overdue: false }
  return { text: date, overdue: false }
}

function Actions() {
  const { tasks } = usePreferences()
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')
  const [showForm, setShowForm] = useState(false)

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      doing: tasks.filter((t) => t.status === 'doing').length,
      done: tasks.filter((t) => t.status === 'done').length,
    }),
    [tasks],
  )
  const progress = tasks.length ? (counts.done / tasks.length) * 100 : 0
  const visible = tasks.filter((t) => filter === 'all' || t.status === filter)
  const highOpen = tasks.filter((t) => t.priority === 'High' && t.status !== 'done').length

  return (
    <>
      <PageHeader
        eyebrow="Act"
        title="Action planner"
        demo={false}
        description="Turn insights into tasks and track them through to done. Tasks are saved in this browser only for now."
        actions={
          <Button onClick={() => setShowForm((s) => !s)} aria-expanded={showForm}>
            <Plus className="h-4 w-4" aria-hidden /> New task
          </Button>
        }
      />

      <section aria-label="Progress" className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] text-fg-3">Overall progress</p>
            <p className="tabular text-sm text-fg-2">
              {counts.done} of {counts.all} done
            </p>
          </div>
          <p className="mt-3 font-display text-5xl leading-none">{Math.round(progress)}%</p>
          <ProgressBar value={progress} label="Tasks completed" className="mt-4" />
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
          <p className="text-[13px] text-fg-3">In progress</p>
          <p className="mt-3 font-display text-5xl leading-none">{counts.doing}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5">
          <p className="text-[13px] text-fg-3">High priority open</p>
          <p className="mt-3 font-display text-5xl leading-none">{highOpen}</p>
        </div>
      </section>

      {showForm && <NewTaskForm onDone={() => setShowForm(false)} />}

      <Card className="mt-4" bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <Tabs
            label="Filter tasks"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: 'All', count: counts.all },
              { value: 'todo', label: 'To do', count: counts.todo },
              { value: 'doing', label: 'In progress', count: counts.doing },
              { value: 'done', label: 'Done', count: counts.done },
            ]}
          />
          <button type="button" onClick={resetPreferences} className="text-xs text-fg-3 hover:text-fg">
            Reset to sample tasks
          </button>
        </div>

        {visible.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<Check className="h-5 w-5" aria-hidden />}
              title={filter === 'all' ? 'No tasks yet' : `Nothing ${statusLabels[filter as TaskStatus].toLowerCase()}`}
              description="Add a task, or send one over from Opportunities & gaps."
              action={<Button size="sm" onClick={() => setShowForm(true)}>New task</Button>}
            />
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {visible.map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}

function TaskRow({ task }: { task: Task }) {
  const due = dueLabel(task.due)
  const done = task.status === 'done'
  return (
    <li className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={`Mark "${task.title}" as ${done ? 'not done' : 'done'}`}
        onClick={() => updateTask(task.id, { status: done ? 'todo' : 'done' })}
        className={cn(
          'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors',
          done ? 'border-signal bg-signal text-signal-ink' : 'border-white/25 hover:border-signal',
        )}
      >
        {done && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={cn('text-sm', done ? 'text-fg-3 line-through' : 'text-fg')}>{task.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-3">
          <span>{task.category}</span>
          <span aria-hidden>·</span>
          <span className={cn('inline-flex items-center gap-1', due.overdue && !done && 'text-critical')}>
            <CalendarDays className="h-3 w-3" aria-hidden /> {due.text}
          </span>
        </div>
      </div>
      <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
      <label className="sr-only" htmlFor={`status-${task.id}`}>Status</label>
      <select
        id={`status-${task.id}`}
        value={task.status}
        onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
        className="h-8 rounded-full border border-white/10 bg-ink-850 px-3 text-xs text-fg-2"
      >
        {Object.entries(statusLabels).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => removeTask(task.id)}
        aria-label={`Delete "${task.title}"`}
        className="grid h-8 w-8 place-items-center rounded-full text-fg-3 opacity-100 hover:bg-critical/10 hover:text-critical sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}

function NewTaskForm({ onDone }: { onDone: () => void }) {
  const defaultDue = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10)
  const [title, setTitle] = useState('')
  const [due, setDue] = useState(defaultDue)
  const [priority, setPriority] = useState<TaskPriority>('Medium')
  const [category, setCategory] = useState<OpportunityCategory>('Release')
  const [error, setError] = useState<string>()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (title.trim().length < 3) {
      setError('Give the task a short, clear title (at least 3 characters).')
      return
    }
    addTask({ title: title.trim(), due, priority, category, status: 'todo' })
    onDone()
  }

  return (
    <Card className="rise mt-4" title="New task">
      <form noValidate onSubmit={submit} className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-start">
        <TextField
          label="Task"
          placeholder="e.g. Send Glasshouse to three blogs"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setError(undefined)
          }}
          error={error}
          autoFocus
        />
        <TextField label="Due" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <SelectField label="Priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </SelectField>
        <SelectField label="Area" value={category} onChange={(e) => setCategory(e.target.value as OpportunityCategory)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </SelectField>
        <div className="flex gap-2 md:pt-[26px]">
          <Button type="submit">Add</Button>
          <Button variant="ghost" onClick={onDone}>Cancel</Button>
        </div>
      </form>
    </Card>
  )
}
