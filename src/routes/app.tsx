import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '@/components/layout/AppShell'
import { ErrorState } from '@/components/ui/States'

export const Route = createFileRoute('/app')({
  component: AppLayout,
  errorComponent: ({ error, reset }) => (
    <AppShell>
      <ErrorState
        title="This page couldn't be displayed"
        description={error.message || 'An unexpected error occurred in the interface.'}
        onRetry={reset}
      />
    </AppShell>
  ),
})

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
