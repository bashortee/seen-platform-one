
import { useEffect, useState } from 'react'
import { usePreferences, usePreferencesHydrated } from './preferences'

export type DemoStatus = 'loading' | 'ready' | 'off'

/**
 * Waits for saved preferences to load before showing demo content.
 * Respects the "Show demo data" preference and simulates panel loading.
 */
export function useDemoData(key: unknown = 'default', delay = 550): DemoStatus {
  const isHydrated = usePreferencesHydrated()
  const { showDemoData } = usePreferences()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated || !showDemoData) {
      setLoading(true)
      return
    }

    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), delay)
    return () => window.clearTimeout(t)
  }, [isHydrated, key, delay, showDemoData])

  if (!isHydrated) return 'loading'
  if (!showDemoData) return 'off'
  return loading ? 'loading' : 'ready'
}