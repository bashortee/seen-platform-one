import { useEffect, useState } from 'react'
import { usePreferences } from './preferences'

export type DemoStatus = 'loading' | 'ready' | 'off'

/**
 * Drives the loading → ready lifecycle of demo panels and respects the
 * "Show demo data" preference. When real connections exist this hook is the
 * seam where actual fetching replaces the short local delay.
 */
export function useDemoData(key: unknown = 'default', delay = 550): DemoStatus {
  const { showDemoData } = usePreferences()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!showDemoData) return
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), delay)
    return () => window.clearTimeout(t)
  }, [key, delay, showDemoData])

  if (!showDemoData) return 'off'
  return loading ? 'loading' : 'ready'
}
