import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Mic2, Users, Building2, Check, ArrowRight } from "lucide-react";
import { B as Button } from "./Button-BRatFXcr.js";
import { L as Logo, c as cn } from "./Misc-CtC884cP.js";
import { u as usePreferences, s as setPreferences } from "./preferences-CDJjCwCs.js";
import "./demo-C1AcIFzz.js";
const roles = [{
  value: "artist",
  title: "Artist",
  body: "I release my own music and want to understand where it is landing.",
  icon: Mic2,
  gets: ["A single artist workspace", "Weekly recommended actions", "Release planning"]
}, {
  value: "manager",
  title: "Manager",
  body: "I look after one or more artists and coordinate their next moves.",
  icon: Users,
  gets: ["Switch between managed artists", "Career gap reviews", "Shared action planner"]
}, {
  value: "label",
  title: "Label",
  body: "I run or work at a label and need a roster-wide view of momentum.",
  icon: Building2,
  gets: ["Roster switcher", "Market opportunity ranking", "Catalogue metadata health"]
}];
function Onboarding() {
  const prefs = usePreferences();
  const navigate = useNavigate();
  const [role, setRole] = useState(prefs.role);
  const [error, setError] = useState(false);
  function onContinue() {
    if (!role) {
      setError(true);
      return;
    }
    setPreferences({
      role
    });
    navigate({
      to: "/app"
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 min-h-screen px-5 py-8 sm:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1080px] items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "SEEN home", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-fg-3", children: "Step 1 of 1" })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1080px] pt-16 pb-16 sm:pt-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "rise max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] tracking-[0.18em] text-fg-3 uppercase", children: prefs.displayName ? `Welcome, ${prefs.displayName}` : "Welcome to SEEN" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-5xl leading-[1] tracking-tight sm:text-6xl", children: "How will you use SEEN?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-fg-2", children: "This shapes your workspace. You can change it later in Settings." })
      ] }),
      /* @__PURE__ */ jsxs("fieldset", { className: "mt-12", children: [
        /* @__PURE__ */ jsx("legend", { className: "sr-only", children: "Choose your role" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3", children: roles.map((r, i) => {
          const selected = role === r.value;
          return /* @__PURE__ */ jsxs("label", { className: cn("rise group relative flex cursor-pointer flex-col rounded-2xl border p-6 transition-all", selected ? "border-signal/50 bg-signal/[0.05]" : "border-white/[0.08] bg-ink-900 hover:border-white/20"), style: {
            animationDelay: `${80 + i * 60}ms`
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "radio", name: "role", value: r.value, checked: selected, onChange: () => {
              setRole(r.value);
              setError(false);
            }, className: "sr-only" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(r.icon, { className: cn("h-6 w-6", selected ? "text-signal-soft" : "text-fg-3"), "aria-hidden": true }),
              /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: cn("grid h-5 w-5 place-items-center rounded-full border transition-colors", selected ? "border-signal bg-signal text-signal-ink" : "border-white/20"), children: selected && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-10 text-2xl font-medium tracking-tight", children: r.title }),
            /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm text-fg-2", children: r.body }),
            /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2 border-t border-white/[0.06] pt-5", children: r.gets.map((g) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-[13px] text-fg-3", children: [
              /* @__PURE__ */ jsx("span", { className: "h-1 w-1 rounded-full bg-fg-3", "aria-hidden": true }),
              g
            ] }, g)) })
          ] }, r.value);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onContinue, children: [
          "Continue to dashboard ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
        ] }),
        error && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-sm text-critical", children: "Choose a role to continue." })
      ] })
    ] })
  ] });
}
export {
  Onboarding as component
};
