import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui/Misc'

export function AuthLayout({
  children,
  aside,
}: {
  children: React.ReactNode
  aside: React.ReactNode
}) {
  return (
    <div className="relative z-10 grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Link to="/" aria-label="SEEN home" className="self-start">
          <Logo />
        </Link>
        <main className="flex flex-1 items-center py-12">
          <div className="rise mx-auto w-full max-w-[400px]">{children}</div>
        </main>
      </div>
      <aside className="relative hidden overflow-hidden border-l border-white/[0.06] bg-ink-900 lg:block">
        <div className="absolute inset-0 opacity-[0.5]" aria-hidden>
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 600 800">
            {Array.from({ length: 28 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${120 + i * 22} C 150 ${80 + i * 22 + Math.sin(i) * 40}, 380 ${180 + i * 20 - Math.cos(i) * 50}, 600 ${110 + i * 23}`}
                fill="none"
                stroke={i === 14 ? '#2f6fed' : 'rgba(255,255,255,0.06)'}
                strokeWidth={i === 14 ? 1.5 : 1}
              />
            ))}
          </svg>
        </div>
        <div className="relative flex h-full flex-col justify-end p-14">{aside}</div>
      </aside>
    </div>
  )
}

export function PreviewNotice({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action: React.ReactNode
}) {
  return (
    <div role="status" className="rise rounded-2xl border border-warning/25 bg-warning/[0.06] p-5">
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="mt-1.5 text-sm text-fg-2">{children}</p>
      <div className="mt-4">{action}</div>
    </div>
  )
}
