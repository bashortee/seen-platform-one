import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Unplug, Clock } from "lucide-react";
import { C as ChartCard, B as BarChart } from "./BarChart--GA2hRg9.js";
import { L as LineChart } from "./LineChart-CuJZ0duJ.js";
import { P as PageHeader, B as Badge, f as formatNumber, b as Delta, D as DemoBadge } from "./Misc-CtC884cP.js";
import { N as NotConnectedState, S as Skeleton } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { k as weeklyEngagement, e as socialChannels, w as weeks, m as contentMix } from "./demo-C1AcIFzz.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
import "./Card-DHBEemWN.js";
import "react-chartjs-2";
import "chart.js";
import "@tanstack/react-router";
import "./Button-BRatFXcr.js";
import "./preferences-CDJjCwCs.js";
const engagementKeys = Object.keys(weeklyEngagement);
function Social() {
  const [channel, setChannel] = useState("all");
  const status = useDemoData();
  const chartStatus = useDemoData(channel, 300);
  const series = useMemo(() => engagementKeys.map((label, colorIndex) => ({
    label,
    colorIndex,
    data: weeklyEngagement[label]
  })).filter((s) => channel === "all" || s.label === channel), [channel]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Insights", title: "Social presence", description: "Reach, engagement and posting rhythm across channels — and where the gaps are." }),
    /* @__PURE__ */ jsxs("div", { role: "note", className: "mb-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-ink-900/60 p-4 text-sm text-fg-2", children: [
      /* @__PURE__ */ jsx(Unplug, { className: "mt-0.5 h-4 w-4 shrink-0 text-fg-3", "aria-hidden": true }),
      /* @__PURE__ */ jsx("p", { children: "No social accounts are connected. The handles and figures below belong to a fictional demo artist and illustrate how SEEN will summarise your channels once connections are available." })
    ] }),
    status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "social data" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("section", { "aria-label": "Channels", className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4", children: status === "loading" ? Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-52 rounded-2xl" }, i)) : socialChannels.map((c) => {
        const quiet = c.lastPostDaysAgo > 14;
        return /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium", children: c.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-fg-3", children: c.handle })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { children: [
              /* @__PURE__ */ jsx(Unplug, { className: "h-3 w-3", "aria-hidden": true }),
              " Not connected"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 font-display text-4xl leading-none", children: formatNumber(c.followers) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs text-fg-3", children: [
            "followers ",
            /* @__PURE__ */ jsx(Delta, { value: c.growth })
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-fg-3", children: "Engagement" }),
              /* @__PURE__ */ jsxs("dd", { className: "tabular mt-0.5 text-sm text-fg", children: [
                c.engagementRate.toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-fg-3", children: "Posts / 30d" }),
              /* @__PURE__ */ jsx("dd", { className: "tabular mt-0.5 text-sm text-fg", children: c.postsPer30d })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: quiet ? "mt-4 flex items-center gap-1.5 text-xs text-warning" : "mt-4 flex items-center gap-1.5 text-xs text-fg-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3", "aria-hidden": true }),
            "Last post ",
            c.lastPostDaysAgo,
            " days ago",
            quiet && " — gone quiet"
          ] })
        ] }, c.id);
      }) }),
      /* @__PURE__ */ jsx(ChartCard, { className: "mt-4", title: "Weekly engagements", description: "Likes, comments, shares and saves per week", status: status === "ready" ? chartStatus : status, legend: channel === "all" ? series.map((s) => s.label) : void 0, actions: /* @__PURE__ */ jsx(Tabs, { label: "Channel", size: "sm", value: channel, onChange: setChannel, options: [{
        value: "all",
        label: "All"
      }, ...engagementKeys.map((k) => ({
        value: k,
        label: k
      }))] }), table: {
        headers: ["Week", ...series.map((s) => s.label)],
        rows: weeks.map((w, i) => [w, ...series.map((s) => s.data[i])])
      }, children: /* @__PURE__ */ jsx(LineChart, { labels: weeks, series, ariaLabel: "Line chart of weekly social engagements, demo data" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]", children: [
        /* @__PURE__ */ jsx(ChartCard, { title: "What content works", description: "Average engagement rate by format, last 90 days", status, table: {
          headers: ["Format", "Posts", "Avg engagement %"],
          rows: contentMix.map((c) => [c.format, c.posts, c.avgEngagement])
        }, children: /* @__PURE__ */ jsx(BarChart, { horizontal: true, labels: contentMix.map((c) => c.format), data: contentMix.map((c) => c.avgEngagement), label: "Avg engagement", unit: "%", ariaLabel: "Bar chart of engagement rate by content format, demo data" }) }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[15px] font-medium", children: "Presence gaps" }),
            /* @__PURE__ */ jsx(DemoBadge, {})
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-5 space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxs("li", { className: "border-l-2 border-warning/60 pl-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: "YouTube has gone quiet" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-fg-2", children: "18 days since the last upload. Live session clips could be reused as Shorts." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "border-l-2 border-warning/60 pl-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: "X engagement is low" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-fg-2", children: "1.2% engagement and shrinking followers. Consider posting less there and more on TikTok." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "border-l-2 border-signal/60 pl-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: "TikTok is growing fastest" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-fg-2", children: "+12.1% followers with only six posts in 30 days — more frequent posting is likely to help." })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Social as component
};
