import { useEffect, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { ChevronsUpDown, FlaskConical, LogOut, Menu, Unplug, X } from 'lucide-react'
import { Logo } from '@/components/ui/Misc'
import { cn } from '@/lib/cn'
import { roleLabels, setPreferences, usePreferences } from '@/lib/preferences'
import { getArtists, type Artist } from '@/services/artists'

import { navGroups, settingsItem } from './nav'
import { supabase } from '@/lib/supabase'

const navItems = navGroups.flatMap((g) => [...g.items])

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
      >
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen border-r border-white/[0.06] bg-ink-950/80 lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        id="mobile-nav"
        aria-label="Main navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/[0.06] bg-ink-950 transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        inert={!open}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          className="absolute top-5 right-4 grid h-8 w-8 place-items-center rounded-full text-fg-2 hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
        <Sidebar pathname={pathname} />
      </aside>

      <div className="min-w-0">
        <TopBar onMenu={() => setOpen(true)} menuOpen={open} />
        <main id="main" className="mx-auto w-full max-w-[1320px] px-4 pt-8 pb-20 sm:px-6 lg:px-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  )
}


function Sidebar({ pathname }: { pathname: string }) {
  const { role, displayName } = usePreferences()
  const navigate = useNavigate()
  const [signedIn, setSignedIn] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState('')

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSignedIn(Boolean(data.session))
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to || pathname === `${to}/` : pathname.startsWith(to)

  async function handleSignOut() {
    setSigningOut(true)
    setSignOutError('')

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        setSignOutError('Unable to sign out. Please try again.')
        return
      }

      await navigate({ to: '/sign-in' })
    } catch {
      setSignOutError('Unable to sign out. Please try again.')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-5">
        <Link to="/" aria-label="SEEN home">
          <Logo />
        </Link>
      </div>

      <WorkspaceSwitcher />

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 pt-5">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.to, 'exact' in item ? item.exact : false)
            const Icon = item.icon

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-signal/15 text-fg'
                      : 'text-fg-3 hover:bg-white/[0.04] hover:text-fg',
                  )}
                >
                  <Icon className={cn('h-4 w-4', active && 'text-signal-soft')} aria-hidden />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-white/[0.06] p-3">
        <Link
          to={settingsItem.to}
          aria-current={isActive(settingsItem.to) ? 'page' : undefined}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            isActive(settingsItem.to) ? 'bg-signal/15 text-fg' : 'text-fg-3 hover:text-fg',
          )}
        >
          <settingsItem.icon className="h-4 w-4" aria-hidden />
          {settingsItem.label}
        </Link>

        <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-ink-700 text-xs font-medium text-fg-2">
            {(displayName || 'Guest').slice(0, 1).toUpperCase()}
          </div>

          <div className="min-w-0 text-xs">
            <p className="truncate text-fg">{displayName || 'Guest preview'}</p>
            <p className="text-fg-3">
              {role ? roleLabels[role] : 'No role chosen'} · {signedIn ? 'Signed in' : 'Guest preview'}
            </p>
          </div>
        </div>

        {signedIn && (
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-3 transition-colors hover:bg-white/[0.04] hover:text-fg disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
        )}

        {signOutError && (
          <p role="alert" className="px-3 py-1 text-xs text-critical">
            {signOutError}
          </p>
        )}
      </div>
    </div>
  )
}



function WorkspaceSwitcher() {
  const { selectedArtistId } = usePreferences()
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadArtists() {
      setLoading(true)
      setError('')

      try {
        const profiles = await getArtists()
        if (!active) return

        const realArtists = profiles.filter(
          (artist) => !artist.is_demo,
        )

        setArtists(realArtists)

        if (
          !realArtists.some(
            (artist) => artist.id === selectedArtistId,
          )
        ) {
          setPreferences({
            selectedArtistId: realArtists[0]?.id ?? '',
          })
        }
      } catch {
        if (active) {
          setError('Could not load artist profiles.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadArtists()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadArtists()
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [selectedArtistId])

  const selectedArtist = artists.find(
    (artist) => artist.id === selectedArtistId,
  )

  return (
    <div className="mx-3 rounded-lg border border-white/[0.07] bg-ink-900 px-3 py-2.5">
      <p className="text-[11px] text-fg-3">
        Artist workspace
      </p>

      {loading ? (
        <p className="mt-1.5 text-sm text-fg-3">
          Loading artists...
        </p>
      ) : error ? (
        <p className="mt-1.5 text-xs text-critical">
          {error}
        </p>
      ) : artists.length === 0 ? (
        <p className="mt-1.5 text-sm text-fg-3">
          No artist profiles yet
        </p>
      ) : (
        <div className="relative mt-1.5">
          <label htmlFor="roster" className="sr-only">
            Select artist
          </label>

          <select
            id="roster"
            value={selectedArtist?.id ?? ''}
            onChange={(event) =>
              setPreferences({
                selectedArtistId: event.target.value,
              })
            }
            className="w-full appearance-none bg-transparent pr-6 text-sm font-medium text-fg focus:outline-none"
          >
            {artists.map((artist) => (
              <option
                key={artist.id}
                value={artist.id}
                className="bg-ink-900"
              >
                {artist.artist_name}
              </option>
            ))}
          </select>

          <ChevronsUpDown
            className="pointer-events-none absolute top-0.5 right-0 h-4 w-4 text-fg-3"
            aria-hidden
          />
        </div>
      )}

      <p className="mt-1 text-[11px] text-fg-3">
        {selectedArtist
          ? 'Your artist profile'
          : 'Select an artist profile'}
      </p>
    </div>
  )
}

function TopBar({ onMenu, menuOpen }: { onMenu: () => void; menuOpen: boolean }) {
  const { showDemoData } = usePreferences()
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="-ml-1 grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/app" className="lg:hidden" aria-label="Dashboard">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-white/[0.07] px-2.5 py-1 text-[11px] text-fg-3 sm:inline-flex">
            <Unplug className="h-3 w-3" aria-hidden />
            No platforms connected
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showDemoData}
            onClick={() => setPreferences({ showDemoData: !showDemoData })}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors',
              showDemoData
                ? 'border-warning/30 bg-warning/[0.08] text-warning'
                : 'border-white/10 text-fg-3 hover:text-fg',
            )}
          >
            <FlaskConical className="h-3 w-3" aria-hidden />
            Demo data {showDemoData ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </header>
  )
}
