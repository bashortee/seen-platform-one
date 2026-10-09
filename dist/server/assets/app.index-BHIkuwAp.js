import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3 } from "lucide-react";
import { C as ChartCard, B as BarChart } from "./BarChart--GA2hRg9.js";
import { L as LineChart } from "./LineChart-CuJZ0duJ.js";
import { O as OpportunityCard } from "./OpportunityCard-D9J--dpo.js";
import { C as Card } from "./Card-DHBEemWN.js";
import { b as buttonClass } from "./Button-BRatFXcr.js";
import { P as PageHeader, S as StatTile, a as ProgressBar, f as formatNumber, b as Delta, D as DemoBadge } from "./Misc-CtC884cP.js";
import { S as Skeleton, N as NotConnectedState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { s as streamsBySource, w as weeks, a as demoArtist, p as performanceKpis, c as citySignals, o as opportunities, b as performanceRanges, r as releases, t as tracks, e as socialChannels } from "./demo-C1AcIFzz.js";
import { u as usePreferences } from "./preferences-CDJjCwCs.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
import { createClient } from "@supabase/supabase-js";
import "react-chartjs-2";
import "chart.js";
import "./tasks-CEb8df3d.js";
const supabaseUrl = void 0;
const supabaseKey = void 0;
{
  throw new Error("Supabase environment variables are missing.");
}
const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
async function getArtists() {
  const { data, error } = await supabase.from("artists").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching artists:", error.message);
    throw error;
  }
  return data;
}
function ArtistProfiles() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    async function loadArtists() {
      try {
        const data = await getArtists();
        if (active) setArtists(data ?? []);
      } catch {
        if (active) {
          setError("Could not load artist profiles. Please try again later.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadArtists();
    return () => {
      active = false;
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "mt-6 rounded-2xl border border-white/10 p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Artist profiles" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-fg-3", children: "Profiles retrieved from the SEEN database. Streaming and social metrics remain separate." })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-fg-3", children: "Loading artist profiles..." }) : error ? /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-red-400", children: error }) : artists.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-fg-3", children: "No artist profiles have been added yet." }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: artists.map((artist) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "rounded-xl border border-white/10 p-4",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: artist.artist_name }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-fg-3", children: [artist.genre, artist.country].filter(Boolean).join(" · ") || "Profile details not yet available" }),
          artist.artist_type && /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-fg-2", children: artist.artist_type }),
          artist.bio && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-fg-2", children: artist.bio })
        ]
      },
      artist.id
    )) })
  ] });
}
const roleIntro = {
  artist: "Your week at a glance",
  manager: "Roster overview",
  label: "Label overview"
};
function Dashboard() {
  const {
    role,
    displayName
  } = usePreferences();
  const [range, setRange] = useState("14w");
  const status = useDemoData();
  const chartStatus = useDemoData(range, 350);
  const sliced = useMemo(() => {
    const n = performanceRanges[range];
    return {
      labels: weeks.slice(-n),
      series: Object.entries(streamsBySource).map(([label, data]) => ({
        label,
        data: data.slice(-n)
      }))
    };
  }, [range]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ArtistProfiles, {}),
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: role ? roleIntro[role] : "Dashboard", title: displayName ? `Good to see you, ${displayName.split(" ")[0]}.` : `${demoArtist.name}, this week.`, description: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Viewing ",
      /* @__PURE__ */ jsx("strong", { className: "font-medium text-fg", children: demoArtist.name }),
      ", a fictional demo artist. All figures below are sample data to show how SEEN will present your own."
    ] }), actions: /* @__PURE__ */ jsxs(Link, { to: "/app/assistant", className: buttonClass("secondary", "md"), children: [
      "Ask SEEN about this week ",
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
    ] }) }),
    /* @__PURE__ */ jsx("section", { "aria-label": "Key figures", className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: status === "off" ? null : status === "loading" ? Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-[132px] rounded-2xl" }, i)) : performanceKpis.map((k) => /* @__PURE__ */ jsx(StatTile, { ...k, invertDelta: k.label.startsWith("Skip") }, k.label)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(ChartCard, { title: "Performance trend", description: "Weekly streams by discovery source", status: status === "ready" ? chartStatus : status, legend: sliced.series.map((s) => s.label), emptyLabel: "streaming data", actions: /* @__PURE__ */ jsx(Tabs, { label: "Time range", size: "sm", value: range, onChange: setRange, options: [{
      value: "4w",
      label: "4W"
    }, {
      value: "8w",
      label: "8W"
    }, {
      value: "14w",
      label: "14W"
    }] }), table: {
      headers: ["Week", ...sliced.series.map((s) => s.label)],
      rows: sliced.labels.map((w, i) => [w, ...sliced.series.map((s) => s.data[i])])
    }, children: /* @__PURE__ */ jsx(LineChart, { labels: sliced.labels, series: sliced.series, ariaLabel: "Line chart of weekly streams by source, demo data" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx(CatalogueOverview, { status }),
      /* @__PURE__ */ jsx(ChartCard, { title: "Geographic signals", description: "Top cities by listeners, last 28 days", status, emptyLabel: "audience data", height: 260, actions: /* @__PURE__ */ jsx(Link, { to: "/app/audience", className: "text-xs text-fg-3 hover:text-fg", children: "View all" }), table: {
        headers: ["City", "Listeners", "Growth %"],
        rows: citySignals.slice(0, 5).map((c) => [c.city, c.listeners, c.growth])
      }, children: /* @__PURE__ */ jsx(BarChart, { horizontal: true, labels: citySignals.slice(0, 5).map((c) => c.city), data: citySignals.slice(0, 5).map((c) => c.listeners), label: "Listeners", ariaLabel: "Bar chart of listeners by city, demo data" }) }),
      /* @__PURE__ */ jsx(SocialSnapshot, { status })
    ] }),
    /* @__PURE__ */ jsxs("section", { "aria-labelledby": "actions-heading", className: "mt-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { id: "actions-heading", className: "font-display text-2xl", children: "Recommended actions" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-fg-3", children: "Derived from the demo signals above." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/app/opportunities", className: "text-sm text-fg-2 hover:text-fg", children: "All opportunities →" })
      ] }),
      status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "recommendations" }) : status === "loading" ? /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-3", children: Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-48 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-3", children: opportunities.slice(0, 3).map((o) => /* @__PURE__ */ jsx(OpportunityCard, { o, compact: true }, o.id)) })
    ] })
  ] });
}
function CatalogueOverview({
  status
}) {
  const released = releases.filter((r) => r.status === "Released");
  const avgMeta = Math.round(releases.reduce((s, r) => s + r.metadataScore, 0) / releases.length);
  const top = [...tracks].sort((a, b) => b.streams - a.streams).slice(0, 3);
  return /* @__PURE__ */ jsx(Card, { title: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
    "Catalogue overview ",
    status !== "off" && /* @__PURE__ */ jsx(DemoBadge, {})
  ] }), actions: /* @__PURE__ */ jsx(Link, { to: "/app/catalogue", className: "text-xs text-fg-3 hover:text-fg", children: "Open catalogue" }), children: status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "catalogue" }) : status === "loading" ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-16" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-40" })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-3 gap-3", children: [["Releases", releases.length], ["Released", released.length], ["Tracks", tracks.length]].map(([k, v]) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("dt", { className: "text-xs text-fg-3", children: k }),
      /* @__PURE__ */ jsx("dd", { className: "mt-1 font-display text-2xl leading-none", children: v })
    ] }, k)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "text-fg-3", children: "Average metadata health" }),
        /* @__PURE__ */ jsxs("span", { className: "tabular text-fg-2", children: [
          avgMeta,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx(ProgressBar, { value: avgMeta, label: "Average metadata health", className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-6 divide-y divide-white/[0.05]", children: top.map((t, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 py-2.5", children: [
      /* @__PURE__ */ jsx("span", { className: "w-4 font-mono text-[11px] text-fg-3", children: i + 1 }),
      /* @__PURE__ */ jsx(Disc3, { className: "h-4 w-4 text-fg-3", "aria-hidden": true }),
      /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-sm", children: t.title }),
      /* @__PURE__ */ jsx("span", { className: "tabular text-xs text-fg-2", children: formatNumber(t.streams) }),
      /* @__PURE__ */ jsx(Delta, { value: t.trend })
    ] }, t.id)) })
  ] }) });
}
function SocialSnapshot({
  status
}) {
  const max = Math.max(...socialChannels.map((c) => c.followers));
  return /* @__PURE__ */ jsx(Card, { title: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
    "Social presence ",
    status !== "off" && /* @__PURE__ */ jsx(DemoBadge, {})
  ] }), description: "Followers and 30-day growth", actions: /* @__PURE__ */ jsx(Link, { to: "/app/social", className: "text-xs text-fg-3 hover:text-fg", children: "View details" }), children: status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "social data" }) : status === "loading" ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Array.from({
    length: 4
  }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-10" }, i)) }) : /* @__PURE__ */ jsx("ul", { className: "space-y-5", children: socialChannels.map((c) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
        c.name,
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-xs text-fg-3", children: c.handle })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "tabular text-sm text-fg-2", children: formatNumber(c.followers) }),
        /* @__PURE__ */ jsx(Delta, { value: c.growth })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 h-1.5 rounded-full bg-white/[0.05]", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-series-1", style: {
      width: `${c.followers / max * 100}%`
    } }) })
  ] }, c.id)) }) });
}
export {
  Dashboard as component
};
