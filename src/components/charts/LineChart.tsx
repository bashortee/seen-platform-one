import { Line } from 'react-chartjs-2'
import { SERIES, compact, ink, tooltip } from './theme'

export interface Series {
  label: string
  data: number[]
  /** Fixed palette slot so a series keeps its colour when others are filtered out. */
  colorIndex?: number
}

export function LineChart({
  labels,
  series,
  height = 260,
  area = false,
  unit = '',
  ariaLabel,
}: {
  labels: string[]
  series: Series[]
  height?: number
  area?: boolean
  unit?: string
  ariaLabel: string
}) {
  return (
    <div style={{ height }} className="relative">
      <Line
        aria-label={ariaLabel}
        role="img"
        data={{
          labels,
          datasets: series.map((s, idx) => {
            const i = s.colorIndex ?? idx
            return {
            label: s.label,
            data: s.data,
            borderColor: SERIES[i % SERIES.length],
            backgroundColor: `${SERIES[i % SERIES.length]}1f`,
            fill: area && i === 0 ? 'origin' : false,
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: ink.surface,
            pointBackgroundColor: SERIES[i % SERIES.length],
            }
          }),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              ...tooltip,
              callbacks: {
                label: (ctx) =>
                  ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString('en-GB')}${unit}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { color: ink.axis },
              ticks: { maxRotation: 0, autoSkipPadding: 16 },
            },
            y: {
              beginAtZero: true,
              grid: { color: ink.grid },
              border: { display: false },
              ticks: { callback: (v) => compact(v) + unit, maxTicksLimit: 5 },
            },
          },
        }}
      />
    </div>
  )
}
