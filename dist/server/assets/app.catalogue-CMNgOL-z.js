import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { C as Card } from "./Card-DHBEemWN.js";
import { P as PageHeader, c as cn, D as DemoBadge, B as Badge, f as formatNumber, b as Delta, a as ProgressBar } from "./Misc-CtC884cP.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { D as DataTable } from "./DataTable-DeXSD6x6.js";
import { i as inputClass } from "./Field-B-owlbUR.js";
import { N as NotConnectedState, S as Skeleton, a as EmptyState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { r as releases, t as tracks, h as releaseById } from "./demo-C1AcIFzz.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
import "@tanstack/react-router";
import "./preferences-CDJjCwCs.js";
const statusTone = {
  Released: "good",
  Scheduled: "info",
  Draft: "neutral"
};
function duration(sec) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}
function dateLabel(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function Catalogue() {
  const [view, setView] = useState("releases");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const status = useDemoData();
  const q = query.trim().toLowerCase();
  const filteredReleases = useMemo(() => releases.filter((r) => (type === "all" || r.type === type) && (statusFilter === "all" || r.status === statusFilter) && (!q || r.title.toLowerCase().includes(q))), [q, type, statusFilter]);
  const filteredTracks = useMemo(() => tracks.filter((t) => {
    const r = releaseById(t.releaseId);
    return (type === "all" || r.type === type) && (statusFilter === "all" || r.status === statusFilter) && (!q || t.title.toLowerCase().includes(q) || r.title.toLowerCase().includes(q));
  }), [q, type, statusFilter]);
  const hasFilters = q || type !== "all" || statusFilter !== "all";
  const clear = () => {
    setQuery("");
    setType("all");
    setStatusFilter("all");
  };
  const trackColumns = [{
    key: "title",
    header: "Track",
    sortValue: (t) => t.title,
    cell: (t) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-fg", children: [
      t.title,
      t.explicit && /* @__PURE__ */ jsx("span", { title: "Explicit", className: "rounded bg-white/10 px-1 text-[9px] font-semibold text-fg-2", children: "E" })
    ] })
  }, {
    key: "release",
    header: "Release",
    cell: (t) => releaseById(t.releaseId)?.title,
    sortValue: (t) => releaseById(t.releaseId)?.title ?? "",
    hideOnMobile: true
  }, {
    key: "duration",
    header: "Length",
    align: "right",
    cell: (t) => duration(t.durationSec),
    sortValue: (t) => t.durationSec,
    hideOnMobile: true
  }, {
    key: "isrc",
    header: "ISRC",
    cell: (t) => /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-fg-3", children: t.isrc }),
    hideOnMobile: true
  }, {
    key: "streams",
    header: "Streams",
    align: "right",
    cell: (t) => t.streams ? formatNumber(t.streams) : "—",
    sortValue: (t) => t.streams
  }, {
    key: "save",
    header: "Save rate",
    align: "right",
    cell: (t) => t.saveRate ? `${t.saveRate.toFixed(1)}%` : "—",
    sortValue: (t) => t.saveRate
  }, {
    key: "trend",
    header: "4W trend",
    align: "right",
    cell: (t) => t.streams ? /* @__PURE__ */ jsx(Delta, { value: t.trend }) : "—",
    sortValue: (t) => t.trend
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Catalogue", title: "Releases & tracks", description: "Every release in the workspace, with metadata health and track-level performance." }),
    /* @__PURE__ */ jsxs(Card, { bodyClassName: "p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:p-5 lg:flex-row lg:items-center", children: [
        /* @__PURE__ */ jsx(Tabs, { label: "Catalogue view", value: view, onChange: setView, options: [{
          value: "releases",
          label: "Releases",
          count: filteredReleases.length
        }, {
          value: "tracks",
          label: "Tracks",
          count: filteredTracks.length
        }] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-2 sm:flex-row lg:justify-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative sm:w-64", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-3", "aria-hidden": true }),
            /* @__PURE__ */ jsx("label", { htmlFor: "cat-search", className: "sr-only", children: "Search catalogue" }),
            /* @__PURE__ */ jsx("input", { id: "cat-search", type: "search", placeholder: "Search titles", value: query, onChange: (e) => setQuery(e.target.value), className: cn(inputClass(false, "sm"), "pl-9") })
          ] }),
          /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "type-filter", children: "Release type" }),
          /* @__PURE__ */ jsxs("select", { id: "type-filter", value: type, onChange: (e) => setType(e.target.value), className: cn(inputClass(false, "sm"), "sm:w-36"), children: [
            /* @__PURE__ */ jsx("option", { value: "all", children: "All types" }),
            /* @__PURE__ */ jsx("option", { children: "Album" }),
            /* @__PURE__ */ jsx("option", { children: "EP" }),
            /* @__PURE__ */ jsx("option", { children: "Single" })
          ] }),
          /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "status-filter", children: "Release status" }),
          /* @__PURE__ */ jsxs("select", { id: "status-filter", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: cn(inputClass(false, "sm"), "sm:w-36"), children: [
            /* @__PURE__ */ jsx("option", { value: "all", children: "Any status" }),
            /* @__PURE__ */ jsx("option", { children: "Released" }),
            /* @__PURE__ */ jsx("option", { children: "Scheduled" }),
            /* @__PURE__ */ jsx("option", { children: "Draft" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          status !== "off" && /* @__PURE__ */ jsx(DemoBadge, {}),
          hasFilters && /* @__PURE__ */ jsxs("button", { type: "button", onClick: clear, className: "inline-flex items-center gap-1 text-xs text-fg-3 hover:text-fg", children: [
            /* @__PURE__ */ jsx(X, { className: "h-3 w-3", "aria-hidden": true }),
            " Clear filters"
          ] })
        ] }),
        status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "catalogue" }) : status === "loading" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4", children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "aspect-[4/5] rounded-2xl" }, i)) }) : view === "releases" ? filteredReleases.length === 0 ? /* @__PURE__ */ jsx(NoResults, { onClear: clear }) : /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4", children: filteredReleases.map((r) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelected(r), className: "group w-full text-left", "aria-label": `${r.title}, ${r.type}, ${r.status}. View details`, children: [
          /* @__PURE__ */ jsx(Artwork, { release: r }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-fg group-hover:text-signal-soft", children: r.title }),
              /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-fg-3", children: [
                r.type,
                " · ",
                dateLabel(r.date)
              ] })
            ] }),
            /* @__PURE__ */ jsx(Badge, { tone: statusTone[r.status], children: r.status })
          ] })
        ] }) }, r.id)) }) : /* @__PURE__ */ jsx(DataTable, { caption: "Tracks in catalogue (demo data)", columns: trackColumns, rows: filteredTracks, rowKey: (t) => t.id, initialSort: {
          key: "streams",
          dir: "desc"
        }, empty: /* @__PURE__ */ jsx(NoResults, { onClear: clear }) })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsx(ReleaseDrawer, { release: selected, onClose: () => setSelected(null) })
  ] });
}
function NoResults({
  onClear
}) {
  return /* @__PURE__ */ jsx(EmptyState, { icon: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5", "aria-hidden": true }), title: "Nothing matches those filters", description: "Try a different title or clear the filters to see the full catalogue.", action: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", onClick: onClear, children: "Clear filters" }) });
}
function Artwork({
  release,
  className
}) {
  const [a, b] = release.artwork;
  return /* @__PURE__ */ jsxs("div", { className: cn("relative aspect-square overflow-hidden rounded-2xl border border-white/[0.06] transition-transform duration-300 group-hover:-translate-y-0.5", className), style: {
    background: a
  }, "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -right-1/4 -bottom-1/4 aspect-square w-[90%] rounded-full opacity-80", style: {
      background: b
    } }),
    /* @__PURE__ */ jsx("div", { className: "absolute -right-1/4 -bottom-1/4 aspect-square w-[60%] rounded-full", style: {
      background: a
    } }),
    /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-3 font-display text-lg leading-tight text-white/85", children: release.title })
  ] });
}
function ReleaseDrawer({
  release,
  onClose
}) {
  const list = tracks.filter((t) => t.releaseId === release.id);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const missing = [release.metadataScore < 80 && "Songwriter and producer credits", release.metadataScore < 60 && "Genre and mood tags", release.metadataScore < 30 && "ISRC codes for every track"].filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", role: "dialog", "aria-modal": "true", "aria-labelledby": "release-title", children: [
    /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Close details", className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "rise relative h-full w-full max-w-md overflow-y-auto border-l border-white/[0.08] bg-ink-900 p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(DemoBadge, {}),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, autoFocus: true, className: "grid h-8 w-8 place-items-center rounded-full text-fg-2 hover:bg-white/5", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx(Artwork, { release, className: "mt-6 w-40" }),
      /* @__PURE__ */ jsx("h2", { id: "release-title", className: "mt-5 font-display text-4xl tracking-tight", children: release.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-fg-3", children: [
        release.type,
        " · ",
        dateLabel(release.date),
        " · UPC ",
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: release.upc })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-white/[0.06] p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-fg-2", children: "Metadata health" }),
          /* @__PURE__ */ jsxs("span", { className: "tabular", children: [
            release.metadataScore,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ProgressBar, { value: release.metadataScore, label: "Metadata health", className: "mt-2" }),
        missing.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1 text-xs text-fg-3", children: missing.map((m) => /* @__PURE__ */ jsxs("li", { children: [
          "Missing: ",
          m
        ] }, m)) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-8 text-sm font-medium", children: "Tracklist" }),
      list.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-fg-3", children: "No tracks added to this release yet." }) : /* @__PURE__ */ jsx("ol", { className: "mt-3 divide-y divide-white/[0.05]", children: list.map((t, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 py-3 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "w-4 font-mono text-[11px] text-fg-3", children: i + 1 }),
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: t.title }),
        /* @__PURE__ */ jsx("span", { className: "tabular text-xs text-fg-3", children: duration(t.durationSec) }),
        /* @__PURE__ */ jsx("span", { className: "tabular w-14 text-right text-xs text-fg-2", children: t.streams ? formatNumber(t.streams) : "—" })
      ] }, t.id)) })
    ] })
  ] });
}
export {
  Catalogue as component
};
