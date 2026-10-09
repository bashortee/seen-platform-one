import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Compass, Disc3, Globe2 } from 'lucide-react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { buttonClass } from '@/components/ui/Button'
import { DemoBadge } from '@/components/ui/Badge'
import { Logo } from '@/components/ui/Misc'

export const Route = createFileRoute('/')({
  component: Landing,
})

function Landing() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-16 pb-20 text-center sm:px-8 lg:pt-28">
      <p className="rise text-sm font-medium text-signal-soft">Smart Entertainment Evolution Engine</p>
      <h1 className="rise mt-4 font-display text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.05]" style={{ animationDelay: '80ms' }}>
        Know what your music is <em>telling</em> you.
      </h1>
      <p className="rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-2" style={{ animationDelay: '160ms' }}>
        SEEN brings your catalogue, streaming, audience and social signals into one place,
        then turns them into clear next steps — for artists, managers and labels.
      </p>
      <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '240ms' }}>
        <Link to="/sign-up" className={buttonClass('primary', 'lg')}>
          Get started <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link to="/app" className={buttonClass('secondary', 'lg')}>
          View the demo
        </Link>
      </div>
      <p className="rise mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-fg-3" style={{ animationDelay: '300ms' }}>
        Early preview. No platforms are connected yet — the demo uses <DemoBadge /> for a fictional artist.
      </p>
    </section>
  )
}

const features = [
  {
    icon: Disc3,
    title: 'Your catalogue in one place',
    body: 'Releases, tracks and metadata health, checked as you go.',
  },
  {
    icon: Globe2,
    title: 'Signals, shown plainly',
    body: 'Performance trends, breakout cities and social engagement.',
  },
  {
    icon: Compass,
    title: 'Clear next steps',
    body: 'Gaps and opportunities turned into tasks you can track.',
  },
]

function Features() {
  return (
    <section aria-label="What SEEN does" className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="rounded-2xl border border-white/[0.07] bg-ink-900 p-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-signal/10">
              <f.icon className="h-5 w-5 text-signal-soft" aria-hidden />
            </div>
            <h2 className="mt-5 text-base font-semibold">{f.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-2">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Logo />
        <p>© {new Date().getFullYear()} SEEN. Early preview — demo data only.</p>
      </div>
    </footer>
  )
}
