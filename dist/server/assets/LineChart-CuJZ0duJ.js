import { jsx } from "react/jsx-runtime";
import { Line } from "react-chartjs-2";
import { i as ink, t as tooltip, c as compact, S as SERIES } from "./BarChart--GA2hRg9.js";
function LineChart({
  labels,
  series,
  height = 260,
  area = false,
  unit = "",
  ariaLabel
}) {
  return /* @__PURE__ */ jsx("div", { style: { height }, className: "relative", children: /* @__PURE__ */ jsx(
    Line,
    {
      "aria-label": ariaLabel,
      role: "img",
      data: {
        labels,
        datasets: series.map((s, idx) => {
          const i = s.colorIndex ?? idx;
          return {
            label: s.label,
            data: s.data,
            borderColor: SERIES[i % SERIES.length],
            backgroundColor: `${SERIES[i % SERIES.length]}1f`,
            fill: area && i === 0 ? "origin" : false,
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: ink.surface,
            pointBackgroundColor: SERIES[i % SERIES.length]
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltip,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString("en-GB")}${unit}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { color: ink.axis },
            ticks: { maxRotation: 0, autoSkipPadding: 16 }
          },
          y: {
            beginAtZero: true,
            grid: { color: ink.grid },
            border: { display: false },
            ticks: { callback: (v) => compact(v) + unit, maxTicksLimit: 5 }
          }
        }
      }
    }
  ) });
}
export {
  LineChart as L
};
