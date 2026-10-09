import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { BarChart3, Table2 } from "lucide-react";
import { C as Card } from "./Card-DHBEemWN.js";
import { c as cn, D as DemoBadge } from "./Misc-CtC884cP.js";
import { N as NotConnectedState, S as Skeleton } from "./States-BNdbGBv0.js";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);
const SERIES = ["#3987e5", "#d95926", "#199e70"];
const ink = {
  primary: "#eef1f6",
  secondary: "#b9c0cc",
  muted: "#848c99",
  grid: "#232833",
  axis: "#343b48",
  surface: "#11141b"
};
Chart.defaults.font.family = "Geist, ui-sans-serif, system-ui, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.color = ink.muted;
const tooltip = {
  backgroundColor: "#1b2029",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  titleColor: ink.primary,
  bodyColor: ink.secondary,
  padding: 10,
  cornerRadius: 10,
  boxPadding: 4,
  usePointStyle: true,
  titleFont: { weight: 500 }
};
function compact(v) {
  const n = Number(v);
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}K`;
  return String(n);
}
function ChartCard({
  title,
  description,
  status,
  legend,
  table,
  children,
  actions,
  className,
  height = 260,
  emptyLabel = "data"
}) {
  const [view, setView] = useState("chart");
  return /* @__PURE__ */ jsx(
    Card,
    {
      className,
      title: /* @__PURE__ */ jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
        title,
        status !== "off" && /* @__PURE__ */ jsx(DemoBadge, {})
      ] }),
      description,
      actions: status === "ready" && /* @__PURE__ */ jsxs(Fragment, { children: [
        actions,
        table && /* @__PURE__ */ jsxs("div", { className: "flex rounded-full border border-white/[0.07] p-0.5", role: "group", "aria-label": `${title} view`, children: [
          /* @__PURE__ */ jsx(ViewButton, { active: view === "chart", onClick: () => setView("chart"), label: "Chart view", children: /* @__PURE__ */ jsx(BarChart3, { className: "h-3.5 w-3.5", "aria-hidden": true }) }),
          /* @__PURE__ */ jsx(ViewButton, { active: view === "table", onClick: () => setView("table"), label: "Table view", children: /* @__PURE__ */ jsx(Table2, { className: "h-3.5 w-3.5", "aria-hidden": true }) })
        ] })
      ] }),
      children: status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: emptyLabel }) : status === "loading" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end gap-3", style: { height }, "aria-busy": "true", "aria-label": "Loading chart", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "w-full flex-1" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        legend && legend.length > 1 && view === "chart" && /* @__PURE__ */ jsx("ul", { className: "mb-4 flex flex-wrap gap-x-5 gap-y-2", "aria-label": "Legend", children: legend.map((l, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-xs text-fg-2", children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "h-2 w-2 rounded-full", style: { background: SERIES[i % SERIES.length] } }),
          l
        ] }, l)) }),
        view === "chart" || !table ? children : /* @__PURE__ */ jsx("div", { className: "overflow-auto", style: { maxHeight: height + 32 }, children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxs("caption", { className: "sr-only", children: [
            title,
            " (demo data)"
          ] }),
          /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-ink-900", children: /* @__PURE__ */ jsx("tr", { children: table.headers.map((h, i) => /* @__PURE__ */ jsx("th", { scope: "col", className: cn("border-b border-white/[0.07] py-2 text-[11px] font-medium tracking-wider text-fg-3 uppercase", i ? "text-right" : "text-left"), children: h }, h)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: table.rows.map((r) => /* @__PURE__ */ jsx("tr", { className: "border-b border-white/[0.04]", children: r.map((c, i) => /* @__PURE__ */ jsx("td", { className: cn("tabular py-2 text-fg-2", i ? "text-right" : "text-left"), children: typeof c === "number" ? c.toLocaleString("en-GB") : c }, i)) }, String(r[0]))) })
        ] }) })
      ] })
    }
  );
}
function ViewButton({
  active,
  onClick,
  label,
  children
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      "aria-pressed": active,
      onClick,
      className: cn(
        "grid h-7 w-7 place-items-center rounded-full transition-colors",
        active ? "bg-ink-700 text-fg" : "text-fg-3 hover:text-fg"
      ),
      children
    }
  );
}
function BarChart({
  labels,
  data,
  label,
  height = 240,
  horizontal = false,
  unit = "",
  color = SERIES[0],
  ariaLabel
}) {
  const valueAxis = {
    beginAtZero: true,
    grid: { color: ink.grid },
    border: { display: false },
    ticks: { callback: (v) => compact(v) + unit, maxTicksLimit: 5 }
  };
  const categoryAxis = {
    grid: { display: false },
    border: { color: ink.axis },
    ticks: { color: ink.secondary }
  };
  return /* @__PURE__ */ jsx("div", { style: { height }, className: "relative", children: /* @__PURE__ */ jsx(
    Bar,
    {
      "aria-label": ariaLabel,
      role: "img",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: color,
            hoverBackgroundColor: color,
            borderRadius: 4,
            borderSkipped: "start",
            barPercentage: 0.7,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        indexAxis: horizontal ? "y" : "x",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltip,
            callbacks: {
              label: (ctx) => ` ${label}: ${Number(horizontal ? ctx.parsed.x : ctx.parsed.y).toLocaleString("en-GB")}${unit}`
            }
          }
        },
        scales: horizontal ? { x: valueAxis, y: categoryAxis } : { x: categoryAxis, y: valueAxis }
      }
    }
  ) });
}
export {
  BarChart as B,
  ChartCard as C,
  SERIES as S,
  compact as c,
  ink as i,
  tooltip as t
};
