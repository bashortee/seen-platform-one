import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { C as ChartCard, S as SERIES, B as BarChart } from "./BarChart--GA2hRg9.js";
import { L as LineChart } from "./LineChart-CuJZ0duJ.js";
import { C as Card } from "./Card-DHBEemWN.js";
import { P as PageHeader, S as StatTile, c as cn, f as formatNumber, b as Delta, D as DemoBadge } from "./Misc-CtC884cP.js";
import { D as DataTable } from "./DataTable-DeXSD6x6.js";
import { S as Skeleton, N as NotConnectedState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { w as weeks, s as streamsBySource, b as performanceRanges, t as tracks, p as performanceKpis, j as listenerFunnel, h as releaseById } from "./demo-C1AcIFzz.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
import "react-chartjs-2";
import "chart.js";
import "@tanstack/react-router";
import "./Button-BRatFXcr.js";
import "./preferences-CDJjCwCs.js";
const sources = Object.keys(streamsBySource);
function Performance() {
  const [range, setRange] = useState("14w");
  const [active, setActive] = useState(sources);
  const status = useDemoData();
  const chartStatus = useDemoData(range, 350);
  const n = performanceRanges[range];
  const labels = weeks.slice(-n);
  const series = useMemo(() => sources.map((label, colorIndex) => ({
    label,
    colorIndex,
    data: streamsBySource[label].slice(-n)
  })).filter((s) => active.includes(s.label)), [active, n]);
  function toggle(label) {
    setActive((a) => a.includes(label) ? a.length > 1 ? a.filter((x) => x !== label) : a : [...a, label]);
  }
  const released = tracks.filter((t) => t.streams > 0);
  const topByStreams = [...released].sort((a, b) => b.streams - a.streams).slice(0, 6);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Insights", title: "Performance analytics", description: "How listening is changing, where it comes from, and which tracks are carrying momentum.", actions: /* @__PURE__ */ jsx(Tabs, { label: "Time range", value: range, onChange: setRange, options: [{
      value: "4w",
      label: "Last 4 weeks"
    }, {
      value: "8w",
      label: "8 weeks"
    }, {
      value: "14w",
      label: "14 weeks"
    }] }) }),
    /* @__PURE__ */ jsx("section", { "aria-label": "Key figures", className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: status === "ready" ? performanceKpis.map((k) => /* @__PURE__ */ jsx(StatTile, { ...k, invertDelta: k.label.startsWith("Skip") }, k.label)) : status === "loading" ? Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-[132px] rounded-2xl" }, i)) : null }),
    /* @__PURE__ */ jsx(ChartCard, { className: "mt-4", title: "Streams by discovery source", description: "Weekly streams. Select sources to compare.", status: status === "ready" ? chartStatus : status, height: 300, emptyLabel: "streaming data", actions: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", role: "group", "aria-label": "Filter sources", children: sources.map((s, i) => {
      const on = active.includes(s);
      return /* @__PURE__ */ jsxs("button", { type: "button", "aria-pressed": on, onClick: () => toggle(s), className: cn("inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs transition-colors", on ? "border-white/15 bg-white/[0.05] text-fg" : "border-white/[0.06] text-fg-3 hover:text-fg-2"), children: [
        /* @__PURE__ */ jsx("span", { className: "grid h-3 w-3 place-items-center rounded-full", style: {
          background: on ? SERIES[i] : "transparent",
          boxShadow: `inset 0 0 0 1.5px ${SERIES[i]}`
        }, children: on && /* @__PURE__ */ jsx(Check, { className: "h-2 w-2 text-ink-950", strokeWidth: 4, "aria-hidden": true }) }),
        s
      ] }, s);
    }) }), table: {
      headers: ["Week", ...series.map((s) => s.label)],
      rows: labels.map((w, i) => [w, ...series.map((s) => s.data[i])])
    }, children: /* @__PURE__ */ jsx(LineChart, { labels, series, height: 300, ariaLabel: "Line chart of weekly streams by discovery source, demo data" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx(ChartCard, { title: "Listener journey", description: "From first reach to following, last 28 days", status, emptyLabel: "listener data", table: {
        headers: ["Stage", "Listeners", "% of reached"],
        rows: listenerFunnel.map((f) => [f.stage, f.value, `${(f.value / listenerFunnel[0].value * 100).toFixed(1)}%`])
      }, children: /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: listenerFunnel.map((f) => {
        const pct = f.value / listenerFunnel[0].value * 100;
        return /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-fg-2", children: f.stage }),
            /* @__PURE__ */ jsxs("span", { className: "tabular", children: [
              formatNumber(f.value),
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-fg-3", children: [
                "· ",
                pct.toFixed(1),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-7 rounded-md bg-white/[0.03]", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-md bg-series-1", style: {
            width: `${Math.max(pct, 2)}%`
          } }) })
        ] }, f.stage);
      }) }) }),
      /* @__PURE__ */ jsx(ChartCard, { title: "Streams by track", description: "Lifetime streams, top six", status, emptyLabel: "track data", table: {
        headers: ["Track", "Streams"],
        rows: topByStreams.map((t) => [t.title, t.streams])
      }, children: /* @__PURE__ */ jsx(BarChart, { horizontal: true, labels: topByStreams.map((t) => t.title), data: topByStreams.map((t) => t.streams), label: "Streams", height: 250, ariaLabel: "Bar chart of lifetime streams per track, demo data" }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "mt-4", title: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      "Track momentum ",
      status !== "off" && /* @__PURE__ */ jsx(DemoBadge, {})
    ] }), description: "Sort by any column to find what is rising or fading.", children: status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "track data" }) : status === "loading" ? /* @__PURE__ */ jsx(Skeleton, { className: "h-64" }) : /* @__PURE__ */ jsx(DataTable, { caption: "Track momentum (demo data)", rows: released, rowKey: (t) => t.id, initialSort: {
      key: "trend",
      dir: "desc"
    }, columns: [{
      key: "title",
      header: "Track",
      sortValue: (t) => t.title,
      cell: (t) => /* @__PURE__ */ jsx("span", { className: "text-fg", children: t.title })
    }, {
      key: "release",
      header: "Release",
      hideOnMobile: true,
      cell: (t) => releaseById(t.releaseId)?.title
    }, {
      key: "streams",
      header: "Streams",
      align: "right",
      sortValue: (t) => t.streams,
      cell: (t) => formatNumber(t.streams)
    }, {
      key: "save",
      header: "Save rate",
      align: "right",
      sortValue: (t) => t.saveRate,
      cell: (t) => `${t.saveRate.toFixed(1)}%`
    }, {
      key: "trend",
      header: "4W trend",
      align: "right",
      sortValue: (t) => t.trend,
      cell: (t) => /* @__PURE__ */ jsx(Delta, { value: t.trend })
    }] }) })
  ] });
}
export {
  Performance as component
};
