import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Building2, Check, Mic2, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Misc'
import { cn } from '@/lib/cn'
import { setPreferences, usePreferences, type Role } from '@/lib/preferences'

export const Route = createFileRoute('/onboarding')({
  head: () => ({ meta: [{ title: 'Choose your role — SEEN' }] }),
  component: Onboarding,
})

const roles: Array<{
  value: Role
  title: string
  body: string
  icon: typeof Mic2
  gets: string[]
}> = [
  {
    value: 'artist',
    title: 'Artist',
    body: 'I release my own music and want to understand where it is landing.',
    icon: Mic2,
    gets: ['A single artist workspace', 'Weekly recommended actions', 'Release planning'],
  },
  {
    value: 'manager',
    title: 'Manager',
    body: 'I look after one or more artists and coordinate their next moves.',
    icon: Users,
    gets: ['Switch between managed artists', 'Career gap reviews', 'Shared action planner'],
  },
  {
    value: 'label',
    title: 'Label',
    body: 'I run or work at a label and need a roster-wide view of momentum.',
    icon: Building2,
    gets: ['Roster switcher', 'Market opportunity ranking', 'Catalogue metadata health'],
  },
]

function Onboarding() {
  const prefs = usePreferences()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role | null>(prefs.role)
  const [error, setError] = useState(false)

  function onContinue() {
    if (!role) {
      setError(true)
      return
    }
    setPreferences({ role })
    navigate({ to: '/app' })
  }

  return (
    <div className="relative z-10 min-h-screen px-5 py-8 sm:px-10">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between">
        <Link to="/" aria-label="SEEN home">
          <Logo />
        </Link>
        <p className="font-mono text-xs text-fg-3">Step 1 of 1</p>
      </div>

      <main className="mx-auto max-w-[1080px] pt-16 pb-16 sm:pt-24">
        <div className="rise max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg-3 uppercase">
            {prefs.displayName ? `Welcome, ${prefs.displayName}` : 'Welcome to SEEN'}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1] tracking-tight sm:text-6xl">
            How will you use SEEN?
          </h1>
          <p className="mt-4 text-fg-2">
            This shapes your workspace. You can change it later in Settings.
          </p>
        </div>

        <fieldset className="mt-12">
          <legend className="sr-only">Choose your role</legend>
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((r, i) => {
              const selected = role === r.value
              return (
                <label
                  key={r.value}
                  className={cn(
                    'rise group relative flex cursor-pointer flex-col rounded-2xl border p-6 transition-all',
                    selected
                      ? 'border-signal/50 bg-signal/[0.05]'
                      : 'border-white/[0.08] bg-ink-900 hover:border-white/20',
                  )}
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={selected}
                    onChange={() => {
                      setRole(r.value)
                      setError(false)
                    }}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <r.icon className={cn('h-6 w-6', selected ? 'text-signal-soft' : 'text-fg-3')} aria-hidden />
                    <span
                      aria-hidden
                      className={cn(
                        'grid h-5 w-5 place-items-center rounded-full border transition-colors',
                        selected ? 'border-signal bg-signal text-signal-ink' : 'border-white/20',
                      )}
                    >
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </div>
                  <span className="mt-10 text-2xl font-medium tracking-tight">{r.title}</span>
                  <span className="mt-2 text-sm text-fg-2">{r.body}</span>
                  <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
                    {r.gets.map((g) => (
                      <li key={g} className="flex items-center gap-2 text-[13px] text-fg-3">
                        <span className="h-1 w-1 rounded-full bg-fg-3" aria-hidden />
                        {g}
                      </li>
                    ))}
                  </ul>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button size="lg" onClick={onContinue}>
            Continue to dashboard <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          {error && (
            <p role="alert" className="text-sm text-critical">
              Choose a role to continue.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
