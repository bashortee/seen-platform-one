import { cn } from '@/lib/cn'

export interface CardProps {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  as?: 'section' | 'article' | 'div'
}

export function Card({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  as: Tag = 'section',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-2xl border border-white/[0.07] bg-ink-900/80',
        className,
      )}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[15px] font-medium tracking-tight text-fg">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-fg-3">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </header>
      )}
      <div className={cn('p-5 sm:p-6', bodyClassName)}>{children}</div>
    </Tag>
  )
}
