import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
)

/** Dark-surface categorical slots, fixed order (validated palette). */
export const SERIES = ['#3987e5', '#d95926', '#199e70'] as const
export const SIGNAL = '#2f6fed'

export const ink = {
  primary: '#eef1f6',
  secondary: '#b9c0cc',
  muted: '#848c99',
  grid: '#232833',
  axis: '#343b48',
  surface: '#11141b',
}

ChartJS.defaults.font.family = 'Geist, ui-sans-serif, system-ui, sans-serif'
ChartJS.defaults.font.size = 11
ChartJS.defaults.color = ink.muted

export const tooltip = {
  backgroundColor: '#1b2029',
  borderColor: 'rgba(255,255,255,0.1)',
  borderWidth: 1,
  titleColor: ink.primary,
  bodyColor: ink.secondary,
  padding: 10,
  cornerRadius: 10,
  boxPadding: 4,
  usePointStyle: true,
  titleFont: { weight: 500 as const },
}

export function compact(v: number | string) {
  const n = Number(v)
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`
  return String(n)
}
