
import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Field'
import { supabase } from '@/lib/supabase'
import { validateEmail } from '@/lib/validation'

export const Route = createFileRoute('/sign-in')({
  head: () => ({ meta: [{ title: 'Sign in — SEEN' }] }),
  component: SignIn,
})

function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [authError, setAuthError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')

    const next = {
      email: validateEmail(email),
      password: password ? undefined : 'Enter your password.',
    }

    setErrors(next)
    if (next.email || next.password) return

    setSubmitting(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setAuthError(
          error.message === 'Invalid login credentials'
            ? 'Email or password is incorrect. Check your details and try again.'
            : error.message
        )
        return
      }

      await navigate({ to: '/app' })
    } catch {
      setAuthError('Unable to sign in right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      aside={
        <div className="max-w-md">
          <p className="font-mono text-[11px] tracking-[0.18em] text-signal-soft uppercase">
            This week in the demo
          </p>
          <p className="mt-4 font-display text-4xl leading-[1.1] tracking-tight">
            Three new recommended actions are waiting for Halcyon Reed.
          </p>
          <p className="mt-4 text-sm text-fg-3">Fictional artist · sample data</p>
        </div>
      }
    >
      <h1 className="font-display text-4xl tracking-tight">Welcome back</h1>

      <p className="mt-2 text-sm text-fg-2">
        New to SEEN?{' '}
        <Link
          to="/sign-up"
          className="text-fg underline decoration-white/20 underline-offset-4 hover:decoration-signal"
        >
          Create a workspace
        </Link>
      </p>

      <form noValidate onSubmit={onSubmit} className="mt-8 space-y-4">
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {authError && (
          <p role="alert" className="text-sm text-critical">
            {authError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <p className="text-center text-xs text-fg-3">
          Or{' '}
          <Link
            to="/app"
            className="text-fg-2 underline underline-offset-4 hover:text-fg"
          >
            continue as a guest
          </Link>{' '}
          to explore the demo.
        </p>
      </form>
    </AuthLayout>
  )
}