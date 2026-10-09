import { Bar } from 'react-chartjs-2'
import { SERIES, compact, ink, tooltip } from './theme'

export function BarChart({
  labels,
  data,
  label,
  height = 240,
  horizontal = false,
  unit = '',
  color = SERIES[0],
  ariaLabel,
}: {
  labels: string[]
  data: number[]
  label: string
  height?: number
  horizontal?: boolean
  unit?: string
  color?: string
  ariaLabel: string
}) {
  const valueAxis = {
    beginAtZero: true,
    grid: { color: ink.grid },
    border: { display: false },
    ticks: { callback: (v: number | string) => compact(v) + unit, maxTicksLimit: 5 },
  }
  const categoryAxis = {
    grid: { display: false },
    border: { color: ink.axis },
    ticks: { color: ink.secondary },
  }
  return (
    <div style={{ height }} className="relative">
      <Bar
        aria-label={ariaLabel}
        role="img"
        data={{
          labels,
          datasets: [
            {
              label,
              data,
              backgroundColor: color,
              hoverBackgroundColor: color,
              borderRadius: 4,
              borderSkipped: 'start',
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
          ],
        }}
        options={{
          indexAxis: horizontal ? 'y' : 'x',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              ...tooltip,
              callbacks: {
                label: (ctx) =>
                  ` ${label}: ${Number(horizontal ? ctx.parsed.x : ctx.parsed.y).toLocaleString('en-GB')}${unit}`,
              },
            },
          },
          scales: horizontal
            ? { x: valueAxis, y: categoryAxis }
            : { x: categoryAxis, y: valueAxis },
        }}
      />
    </div>
  )
}
