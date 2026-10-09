import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CircleAlert, AlertTriangle, AlertOctagon, Check, Plus } from "lucide-react";
import { O as OpportunityCard } from "./OpportunityCard-D9J--dpo.js";
import { P as PageHeader, c as cn, D as DemoBadge } from "./Misc-CtC884cP.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { N as NotConnectedState, S as Skeleton, a as EmptyState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { o as opportunities, i as careerGaps } from "./demo-C1AcIFzz.js";
import { u as usePreferences } from "./preferences-CDJjCwCs.js";
import { a as addTask } from "./tasks-CEb8df3d.js";
import { u as useDemoData } from "./useDemoData-B0mLK5YM.js";
const categories = ["All", "Release", "Audience", "Playlisting", "Social", "Live", "Metadata"];
const rank = {
  High: 3,
  Medium: 2,
  Low: 1
};
const severityMeta = {
  critical: {
    label: "Critical",
    icon: AlertOctagon,
    className: "text-critical border-critical/40"
  },
  serious: {
    label: "Serious",
    icon: AlertTriangle,
    className: "text-serious border-serious/40"
  },
  warning: {
    label: "Worth fixing",
    icon: CircleAlert,
    className: "text-warning border-warning/40"
  }
};
function Opportunities() {
  const [tab, setTab] = useState("opportunities");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("impact");
  const status = useDemoData();
  const list = useMemo(() => {
    const filtered = opportunities.filter((o) => category === "All" || o.category === category);
    return [...filtered].sort((a, b) => sort === "impact" ? rank[b.impact] - rank[a.impact] : rank[a.effort] - rank[b.effort]);
  }, [category, sort]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Act", title: "Opportunities & career gaps", description: "What SEEN would do next with this catalogue and audience, and what is holding it back." }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsx(Tabs, { label: "Section", value: tab, onChange: setTab, options: [{
        value: "opportunities",
        label: "Opportunities",
        count: opportunities.length
      }, {
        value: "gaps",
        label: "Career gaps",
        count: careerGaps.length
      }] }),
      tab === "opportunities" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "opp-sort", className: "text-fg-3", children: "Sort by" }),
        /* @__PURE__ */ jsxs("select", { id: "opp-sort", value: sort, onChange: (e) => setSort(e.target.value), className: "h-9 rounded-full border border-white/10 bg-ink-900 px-3 text-sm", children: [
          /* @__PURE__ */ jsx("option", { value: "impact", children: "Highest impact" }),
          /* @__PURE__ */ jsx("option", { value: "effort", children: "Lowest effort" })
        ] })
      ] })
    ] }),
    status === "off" ? /* @__PURE__ */ jsx(NotConnectedState, { what: "recommendations" }) : status === "loading" ? /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-56 rounded-2xl" }, i)) }) : tab === "opportunities" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-2", role: "group", "aria-label": "Filter by category", children: [
        categories.map((c) => /* @__PURE__ */ jsx("button", { type: "button", "aria-pressed": category === c, onClick: () => setCategory(c), className: cn("h-8 rounded-full border px-3 text-xs transition-colors", category === c ? "border-signal/40 bg-signal/10 text-signal-soft" : "border-white/[0.08] text-fg-3 hover:text-fg"), children: c }, c)),
        /* @__PURE__ */ jsx(DemoBadge, { className: "ml-auto" })
      ] }),
      list.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { title: `No ${category.toLowerCase()} opportunities right now`, description: "SEEN hasn't spotted anything in this category in the demo data. Try another category.", action: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", onClick: () => setCategory("All"), children: "Show all" }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3", children: list.map((o) => /* @__PURE__ */ jsx(OpportunityCard, { o }, o.id)) })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-5 flex justify-end", children: /* @__PURE__ */ jsx(DemoBadge, {}) }),
      /* @__PURE__ */ jsx("ol", { className: "space-y-3", children: careerGaps.map((g) => /* @__PURE__ */ jsx(GapRow, { gap: g }, g.id)) })
    ] })
  ] });
}
function GapRow({
  gap
}) {
  const {
    tasks
  } = usePreferences();
  const planned = tasks.some((t) => t.title === gap.fix);
  const m = severityMeta[gap.severity];
  return /* @__PURE__ */ jsxs("li", { className: "grid gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5 md:grid-cols-[160px_1fr_auto] md:items-center", children: [
    /* @__PURE__ */ jsxs("span", { className: cn("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", m.className), children: [
      /* @__PURE__ */ jsx(m.icon, { className: "h-3.5 w-3.5", "aria-hidden": true }),
      m.label
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: gap.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-fg-2", children: gap.detail }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-fg-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-fg-2", children: "Suggested fix:" }),
        " ",
        gap.fix
      ] })
    ] }),
    planned ? /* @__PURE__ */ jsxs(Link, { to: "/app/actions", className: "inline-flex items-center gap-1.5 text-xs font-medium text-signal-soft hover:underline", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5", "aria-hidden": true }),
      " Planned"
    ] }) : /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", onClick: () => {
      const due = /* @__PURE__ */ new Date();
      due.setDate(due.getDate() + 7);
      addTask({
        title: gap.fix,
        status: "todo",
        priority: gap.severity === "critical" ? "High" : gap.severity === "serious" ? "Medium" : "Low",
        due: due.toISOString().slice(0, 10),
        category: "Release"
      });
    }, children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5", "aria-hidden": true }),
      " Create task"
    ] })
  ] });
}
export {
  Opportunities as component
};
