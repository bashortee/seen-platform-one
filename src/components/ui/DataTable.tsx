import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface Column<T> {
  key: string
  header: string
  cell: (row: T) => React.ReactNode
  /** Provide to make the column sortable. */
  sortValue?: (row: T) => number | string
  align?: 'left' | 'right'
  className?: string
  /** Hide on small screens. */
  hideOnMobile?: boolean
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  initialSort,
  empty,
  onRowClick,
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  caption: string
  initialSort?: { key: string; dir: 'asc' | 'desc' }
  empty?: React.ReactNode
  onRowClick?: (row: T) => void
}) {
  const [sort, setSort] = useState(initialSort)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortValue) return rows
    const get = col.sortValue
    return [...rows].sort((a, b) => {
      const av = get(a)
      const bv = get(b)
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv))
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [rows, sort, columns])

  function toggle(key: string) {
    setSort((s) =>
      s?.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'desc' },
    )
  }

  if (rows.length === 0 && empty) return <>{empty}</>

  return (
    <div className="-mx-5 overflow-x-auto sm:-mx-6">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/[0.07]">
            {columns.map((col) => {
              const active = sort?.key === col.key
              const ariaSort = active
                ? sort!.dir === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn(
                    'px-5 py-2.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-fg-3 uppercase first:pl-5 sm:first:pl-6 sm:last:pr-6',
                    col.align === 'right' ? 'text-right' : 'text-left',
                    col.hideOnMobile && 'hidden md:table-cell',
                  )}
                >
                  {col.sortValue ? (
                    <button
                      type="button"
                      onClick={() => toggle(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1 uppercase hover:text-fg',
                        active && 'text-fg-2',
                      )}
                    >
                      {col.header}
                      {active ? (
                        sort!.dir === 'asc' ? (
                          <ArrowUp className="h-3 w-3" aria-hidden />
                        ) : (
                          <ArrowDown className="h-3 w-3" aria-hidden />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-50" aria-hidden />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.025]',
                onRowClick && 'cursor-pointer',
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-5 py-3 text-fg-2 first:pl-5 sm:first:pl-6 sm:last:pr-6',
                    col.align === 'right' && 'tabular text-right',
                    col.hideOnMobile && 'hidden md:table-cell',
                    col.className,
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
