import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { B as Badge } from "./Misc-CtC884cP.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { b as addTaskFromOpportunity } from "./tasks-CEb8df3d.js";
import { u as usePreferences } from "./preferences-CDJjCwCs.js";
const impactTone = { High: "signal", Medium: "info", Low: "neutral" };
function OpportunityCard({ o, compact = false }) {
  const { tasks } = usePreferences();
  const planned = tasks.some((t) => t.opportunityId === o.id);
  return /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-2xl border border-white/[0.07] bg-ink-850/70 p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs(Badge, { tone: impactTone[o.impact], children: [
        o.impact,
        " impact"
      ] }),
      /* @__PURE__ */ jsxs(Badge, { children: [
        o.effort,
        " effort"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-[11px] text-fg-3", children: o.category })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mt-3 text-[15px] leading-snug font-medium text-fg", children: o.title }),
    !compact && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-fg-2", children: o.rationale }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-[11px] text-fg-3", children: o.evidence }),
    /* @__PURE__ */ jsx("div", { className: "mt-auto pt-4", children: planned ? /* @__PURE__ */ jsxs(Link, { to: "/app/actions", className: "inline-flex items-center gap-1.5 text-xs font-medium text-signal-soft hover:underline", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5", "aria-hidden": true }),
      " In your action planner"
    ] }) : /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", onClick: () => addTaskFromOpportunity(o), children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5", "aria-hidden": true }),
      " Add to planner"
    ] }) })
  ] });
}
export {
  OpportunityCard as O
};
