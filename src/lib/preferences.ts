import { useSyncExternalStore } from 'react'
import { demoTasks, type Task } from '@/data/demo'

/**
 * Browser-only UI preferences. Nothing here is sent to a server — it lives in
 * localStorage so the preview remembers choices between visits. Real accounts
 * and persistence arrive in a later milestone (see PLAN.md).
 */

export type Role = 'artist' | 'manager' | 'label'

export interface Preferences {
  role: Role | null
  showDemoData: boolean
  displayName: string
  tasks: Task[]
}

const STORAGE_KEY = 'seen.preferences.v1'

const defaults: Preferences = {
  role: null,
  showDemoData: true,
  displayName: '',
  tasks: demoTasks,
}

let state: Preferences = defaults
let hydrated = false
const listeners = new Set<() => void>()

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) state = { ...defaults, ...JSON.parse(raw) }
  } catch {
    state = defaults
  }
}

function emit() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage may be unavailable (private mode); the session still works.
    }
  }
  listeners.forEach((l) => l())
}

export function setPreferences(
  patch: Partial<Preferences> | ((prev: Preferences) => Partial<Preferences>),
) {
  hydrate()
  const next = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...next }
  emit()
}

export function resetPreferences() {
  state = { ...defaults, tasks: demoTasks.map((t) => ({ ...t })) }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  hydrate()
  return state
}

function getServerSnapshot() {
  return defaults
}

export function usePreferences() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export const roleLabels: Record<Role, string> = {
  artist: 'Artist',
  manager: 'Manager',
  label: 'Label',
}
