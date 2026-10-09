
import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Field'
import { supabase } from '@/lib/supabase'
import { setPreferences } from '@/lib/preferences'
import { validateEmail, validatePassword } from '@/lib/validation'

export const Route = createFileRoute('/sign-up')({
  head: () => ({ meta: [{ title: 'Create your workspace — SEEN' }] }),
  component: SignUp,
})

type Errors = Partial<Record<'name' | 'email' | 'password' | 'terms', string>>

function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [authError, setAuthError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setAuthError('')

    const next: Errors = {
      name: form.name.trim() ? undefined : 'Enter your name or artist name.',
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      terms: form.terms ? undefined : 'Please confirm you understand the early-access status.',
    }

    setErrors(next)

    if (Object.values(next).some(Boolean)) return

    setSubmitting(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            display_name: form.name.trim(),
          },
        },
      })

      if (error) {
        setAuthError(error.message)
        return
      }

      setPreferences({ displayName: form.name.trim() })

      if (data.session) {
        await navigate({ to: '/onboarding' })
      } else {
        setMessage(
          'Registration submitted. Check your email for a confirmation link before signing in.'
        )
      }
    } catch {
      setAuthError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      aside={
        <blockquote className="max-w-md">
          <p className="font-display text-4xl leading-[1.1] tracking-tight">
            “The point isn't more charts. It's knowing which three things to do this week.”
          </p>
          <footer className="mt-6 text-sm text-fg-3">
            The idea behind SEEN
          </footer>
        </blockquote>
      }
    >
      <h1 className="font-display text-4xl tracking-tight">
        Create your workspace
      </h1>

      <p className="mt-2 text-sm text-fg-2">
        Already have one?{' '}
        <Link
          to="/sign-in"
          className="text-fg underline decoration-white/20 underline-offset-4 hover:decoration-signal"
        >
          Sign in
        </Link>
      </p>

      {message ? (
        <div className="mt-8 space-y-4">
          <p role="status" className="text-sm text-fg-2">
            {message}
          </p>
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-2 text-sm text-fg underline underline-offset-4"
          >
            Go to sign in <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-8 space-y-4">
          <TextField
            label="Name or artist name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />

          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />

          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            hint="At least 8 characters."
          />

          <div>
            <label className="flex items-start gap-3 text-sm text-fg-2">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) =>
                  setForm({ ...form, terms: e.target.checked })
                }
                aria-invalid={errors.terms ? true : undefined}
                className="mt-0.5 h-4 w-4 rounded accent-[#2f6fed]"
              />
              I understand SEEN is in early access and some analytics may use demo data.
            </label>
            {errors.terms && (
              <p className="mt-1.5 text-xs text-critical">
                {errors.terms}
              </p>
            )}
          </div>

          {authError && (
            <p role="alert" className="text-sm text-critical">
              {authError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create workspace'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}