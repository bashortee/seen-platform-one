import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/ui/Misc'
import { buttonClass } from '@/components/ui/Button'

export function PublicHeader() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="SEEN home">
          <Logo />
        </Link>
        <nav aria-label="Site" className="flex items-center gap-1 sm:gap-2">
          <Link to="/sign-in" className={buttonClass('ghost', 'sm')}>
            Sign in
          </Link>
          <Link to="/sign-up" className={buttonClass('primary', 'sm')}>
            Get started
          </Link>
        </nav>
      </div>
    </header>
  )
}
