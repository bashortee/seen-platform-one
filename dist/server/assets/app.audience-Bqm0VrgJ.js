import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Flame, TrendingDown, Minus, TrendingUp } from "lucide-react";
import { C as ChartCard, B as BarChart } from "./BarChart--GA2hRg9.js";
import { C as Card } from "./Card-DHBEemWN.js";
import { P as PageHeader, D as DemoBadge, f as formatNumber, b as Delta, B as Badge } from "./Misc-CtC884cP.js";
import { D as DataTable } from "./DataTable-DeXSD6x6.js";
import { N as NotConnectedState, S as Skeleton, a as EmptyState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { c as citySignals, g as ageBands, l as listenerTypes } from "./demo-C1AcIFzz.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
import "react-chartjs-2";
import "chart.js";
import "@tanstack/react-router";
import "./Button-BRatFXcr.js";
import "./preferences-CDJjCwCs.js";
const regions = ["All", "Europe", "North America", "Latin America", "Asia-Pacific", "Africa"];
const signalMeta = {
  Breakout: {
    tone: "signal",
    icon: Flame
  },
  Rising: {
    tone: "good",
    icon: TrendingUp
  },
  Steady: {
    tone: "neutral",
    icon: Minus
  },
  Cooling: {
    tone: "serious",
    icon: TrendingDown
  }
};
function Audience() {
  const [region, setRegion] = useState("All");
  const status = useDemoData();
  const cities = useMemo(() => citySignals.filter((c) => region === "All" || c.region === region), [region]);
  const breakouts = citySignals.filter((c) => c.signal === "Breakout");
  const total = citySignals.reduce((s, c) => s + c.listeners, 0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Insights", title: "Audience & geography", description: "Who is listening, where they are, and which places are starting to pay attention." }),
    status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "audience data" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("section", { "aria-labelledby": "breakout-heading", className: "grid gap-3 md:grid-cols-[1fr_2fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-signal/20 bg-signal/[0.04] p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Flame, { className: "h-4 w-4 text-signal-soft", "aria-hidden": true }),
            /* @__PURE__ */ jsx("h2", { id: "breakout-heading", className: "text-sm font-medium", children: "Breakout cities" }),
            /* @__PURE__ */ jsx(DemoBadge, {})
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-fg-2", children: "Cities growing more than 25% in 28 days. These are the places where a show, an ad test or localised content is most likely to pay off." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: status === "loading" ? Array.from({
          length: 3
        }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-2xl" }, i)) : breakouts.map((c) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-fg-3", children: c.country }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-medium", children: c.city }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 font-display text-3xl leading-none", children: formatNumber(c.listeners) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs text-fg-3", children: [
            /* @__PURE__ */ jsx(Delta, { value: c.growth }),
            " listeners"
          ] })
        ] }, c.city)) })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "mt-4", title: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        "City signals ",
        /* @__PURE__ */ jsx(DemoBadge, {})
      ] }), description: `${formatNumber(total)} listeners across the top ${citySignals.length} cities, last 28 days`, actions: /* @__PURE__ */ jsx(Tabs, { label: "Region", size: "sm", value: region, onChange: setRegion, options: regions.map((r) => ({
        value: r,
        label: r,
        count: r === "All" ? void 0 : citySignals.filter((c) => c.region === r).length
      })) }), children: status === "loading" ? /* @__PURE__ */ jsx(Skeleton, { className: "h-72" }) : /* @__PURE__ */ jsx(DataTable, { caption: "City listener signals (demo data)", rows: cities, rowKey: (c) => c.city, initialSort: {
        key: "listeners",
        dir: "desc"
      }, empty: /* @__PURE__ */ jsx(EmptyState, { title: "No cities in this region yet", description: "Try another region." }), columns: [{
        key: "city",
        header: "City",
        sortValue: (c) => c.city,
        cell: (c) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-fg", children: c.city }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-fg-3", children: c.country })
        ] })
      }, {
        key: "region",
        header: "Region",
        hideOnMobile: true,
        sortValue: (c) => c.region,
        cell: (c) => c.region
      }, {
        key: "listeners",
        header: "Listeners",
        align: "right",
        sortValue: (c) => c.listeners,
        cell: (c) => formatNumber(c.listeners)
      }, {
        key: "share",
        header: "Share",
        hideOnMobile: true,
        sortValue: (c) => c.listeners,
        cell: (c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 rounded-full bg-white/[0.05]", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-series-1", style: {
            width: `${c.listeners / citySignals[0].listeners * 100}%`
          } }) }),
          /* @__PURE__ */ jsxs("span", { className: "tabular text-xs text-fg-3", children: [
            (c.listeners / total * 100).toFixed(1),
            "%"
          ] })
        ] })
      }, {
        key: "growth",
        header: "28D growth",
        align: "right",
        sortValue: (c) => c.growth,
        cell: (c) => /* @__PURE__ */ jsx(Delta, { value: c.growth })
      }, {
        key: "signal",
        header: "Signal",
        sortValue: (c) => c.signal,
        cell: (c) => {
          const m = signalMeta[c.signal];
          return /* @__PURE__ */ jsxs(Badge, { tone: m.tone, children: [
            /* @__PURE__ */ jsx(m.icon, { className: "h-3 w-3", "aria-hidden": true }),
            " ",
            c.signal
          ] });
        }
      }] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx(ChartCard, { title: "Age of listeners", description: "Share of listeners by age band", status, table: {
          headers: ["Age", "Share %"],
          rows: ageBands.map((a) => [a.band, a.share])
        }, children: /* @__PURE__ */ jsx(BarChart, { labels: ageBands.map((a) => a.band), data: ageBands.map((a) => a.share), label: "Share of listeners", unit: "%", ariaLabel: "Bar chart of listener age bands, demo data" }) }),
        /* @__PURE__ */ jsx(Card, { title: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          "Listener engagement ",
          /* @__PURE__ */ jsx(DemoBadge, {})
        ] }), description: "How regularly the audience comes back", children: status === "loading" ? /* @__PURE__ */ jsx(Skeleton, { className: "h-48" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 gap-[2px] overflow-hidden rounded-lg", "aria-hidden": true, children: listenerTypes.map((l, i) => /* @__PURE__ */ jsx("div", { style: {
            width: `${l.share}%`,
            background: ["#3987e5", "#256abf", "#383835"][i]
          } }, l.label)) }),
          /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: listenerTypes.map((l, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5 text-fg-2", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-sm", style: {
                background: ["#3987e5", "#256abf", "#383835"][i]
              }, "aria-hidden": true }),
              l.label
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "tabular", children: [
              l.share.toFixed(1),
              "%"
            ] })
          ] }, l.label)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 rounded-xl border border-white/[0.06] p-4 text-sm text-fg-2", children: "A quarter of listeners haven't played a track in 28 days. A new release or a stripped session is the usual way to bring them back." })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Audience as component
};
