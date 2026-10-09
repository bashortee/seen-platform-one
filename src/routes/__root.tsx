import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import '../styles.css'

const siteName = 'SEEN — Smart Entertainment Evolution Engine'
const siteDescription =
  'SEEN turns music industry data into clear insights and next actions for independent artists, managers and labels.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#0c0c0b' },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main className="relative z-10 grid min-h-screen place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-fg-3 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl">This page went unheard.</h1>
        <p className="mt-4 text-fg-2">
          The address you followed doesn't exist in SEEN.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-signal-ink"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
