import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check, Lock, Unplug } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Switch, TextField } from '@/components/ui/Field'
import { PageHeader } from '@/components/ui/Misc'
import { Tabs } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import {
  resetPreferences,
  roleLabels,
  setPreferences,
  usePreferences,
  type Role,
} from '@/lib/preferences'

const tabs = ['profile', 'data', 'notifications'] as const
type SettingsTab = (typeof tabs)[number]

export const Route = createFileRoute('/app/settings')({
  head: () => ({ meta: [{ title: 'Settings — SEEN' }] }),
  validateSearch: (search: Record<string, unknown>): { tab?: SettingsTab } => ({
    tab: tabs.includes(search.tab as SettingsTab) ? (search.tab as SettingsTab) : undefined,
  }),
  component: Settings,
})

const connections = [
  { group: 'Streaming', items: ['Spotify for Artists', 'Apple Music for Artists', 'YouTube Music', 'Amazon Music', 'Deezer'] },
  { group: 'Social', items: ['Instagram', 'TikTok', 'YouTube', 'X'] },
  { group: 'Distribution', items: ['Distributor (CSV import)', 'Royalty statements'] },
]

function Settings() {
  const { tab = 'profile' } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  return (
    <>
      <PageHeader eyebrow="Workspace" title="Settings" demo={false} description="Manage your profile, data sources and preferences." />
      <Tabs
        label="Settings sections"
        value={tab}
        onChange={(t) => navigate({ search: { tab: t }, replace: true })}
        options={[
          { value: 'profile', label: 'Profile' },
          { value: 'data', label: 'Data & connections' },
          { value: 'notifications', label: 'Notifications' },
        ]}
        className="mb-6"
      />
      {tab === 'profile' && <ProfileTab />}
      {tab === 'data' && <DataTab />}
      {tab === 'notifications' && <NotificationsTab />}
    </>
  )
}

function ProfileTab() {
  const prefs = usePreferences()
  const [name, setName] = useState(prefs.displayName)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string>()

  function save(e: React.FormEvent) {
    e.preventDefault()
    if (name.length > 60) {
      setError('Keep your display name under 60 characters.')
      return
    }
    setPreferences({ displayName: name.trim() })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Profile" description="Shown in your workspace. Stored in this browser only.">
        <form noValidate onSubmit={save} className="space-y-4">
          <TextField
            label="Display name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError(undefined)
            }}
            placeholder="Your name or artist name"
            error={error}
          />
          <div className="flex items-center gap-3">
            <Button type="submit">Save changes</Button>
            {saved && (
              <span role="status" className="inline-flex items-center gap-1 text-sm text-signal-soft">
                <Check className="h-4 w-4" aria-hidden /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card title="Role" description="Changes how the workspace and roster switcher behave.">
        <fieldset>
          <legend className="sr-only">Role</legend>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(roleLabels) as Role[]).map((r) => (
              <label
                key={r}
                className={cn(
                  'cursor-pointer rounded-xl border px-3 py-3 text-center text-sm transition-colors',
                  prefs.role === r ? 'border-signal/50 bg-signal/[0.06] text-fg' : 'border-white/[0.08] text-fg-2 hover:border-white/20',
                )}
              >
                <input type="radio" name="role" className="sr-only" checked={prefs.role === r} onChange={() => setPreferences({ role: r })} />
                {roleLabels[r]}
              </label>
            ))}
          </div>
        </fieldset>
      </Card>

      <Card title="Account" description="Sign-in and account security arrive in a later release." className="lg:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-fg-2">
            <Lock className="h-4 w-4 text-fg-3" aria-hidden /> You're using SEEN as a guest preview. No account exists yet.
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm('Reset all preview settings and tasks stored in this browser?')) resetPreferences()
            }}
          >
            Reset preview data
          </Button>
        </div>
      </Card>
    </div>
  )
}

function DataTab() {
  const { showDemoData } = usePreferences()
  return (
    <div className="space-y-4">
      <Card title="Demo data">
        <Switch
          checked={showDemoData}
          onChange={(v) => setPreferences({ showDemoData: v })}
          label="Show demo data"
          description="Fills the interface with sample figures for a fictional artist. Turn it off to see how SEEN looks before any source is connected."
        />
      </Card>

      <Card
        title="Connections"
        description="SEEN doesn't connect to any platform yet. These integrations are planned; credentials will be handled on the server, never in your browser."
      >
        <div className="space-y-8">
          {connections.map((g) => (
            <div key={g.group}>
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase">{g.group}</h3>
              <ul className="mt-3 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06]">
                {g.items.map((name) => (
                  <li key={name} className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm">{name}</span>
                    <span className="flex items-center gap-3">
                      <Badge>
                        <Unplug className="h-3 w-3" aria-hidden /> Not connected
                      </Badge>
                      <Button variant="secondary" size="sm" disabled title="Coming in a later release">
                        Coming soon
                      </Button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({ weekly: true, breakout: true, tasks: false })
  return (
    <Card title="Notifications" description="Choose what SEEN will tell you about once email delivery is available. Preferences are not saved yet.">
      <div className="space-y-6">
        <Switch checked={prefs.weekly} onChange={(v) => setPrefs({ ...prefs, weekly: v })} label="Weekly summary" description="A Monday digest of changes and recommended actions." />
        <Switch checked={prefs.breakout} onChange={(v) => setPrefs({ ...prefs, breakout: v })} label="Breakout alerts" description="When a city or track grows unusually fast." />
        <Switch checked={prefs.tasks} onChange={(v) => setPrefs({ ...prefs, tasks: v })} label="Task reminders" description="A nudge the day before a task is due." />
      </div>
    </Card>
  )
}
