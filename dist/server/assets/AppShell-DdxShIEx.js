import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useRouterState, Link } from "@tanstack/react-router";
import { Settings, LayoutDashboard, Disc3, LineChart, Globe2, Share2, Compass, CalendarCheck, MessageSquareText, X, Menu, Unplug, FlaskConical, ChevronsUpDown } from "lucide-react";
import { c as cn, L as Logo } from "./Misc-CtC884cP.js";
import { u as usePreferences, r as roleLabels, s as setPreferences } from "./preferences-CDJjCwCs.js";
import { d as demoRoster, a as demoArtist } from "./demo-C1AcIFzz.js";
const navGroups = [
  {
    label: "Overview",
    items: [
      { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { to: "/app/catalogue", label: "Catalogue", icon: Disc3 }
    ]
  },
  {
    label: "Insights",
    items: [
      { to: "/app/performance", label: "Performance", icon: LineChart },
      { to: "/app/audience", label: "Audience & geography", icon: Globe2 },
      { to: "/app/social", label: "Social presence", icon: Share2 }
    ]
  },
  {
    label: "Act",
    items: [
      { to: "/app/opportunities", label: "Opportunities & gaps", icon: Compass },
      { to: "/app/actions", label: "Action planner", icon: CalendarCheck },
      { to: "/app/assistant", label: "Ask SEEN", icon: MessageSquareText }
    ]
  }
];
const settingsItem = { to: "/app/settings", label: "Settings", icon: Settings };
const navItems = navGroups.flatMap((g) => [...g.items]);
function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 min-h-screen lg:grid lg:grid-cols-[240px_1fr]", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#main",
        className: "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink",
        children: "Skip to content"
      }
    ),
    /* @__PURE__ */ jsx("aside", { className: "sticky top-0 hidden h-screen border-r border-white/[0.06] bg-ink-950/80 lg:block", children: /* @__PURE__ */ jsx(Sidebar, { pathname }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        ),
        onClick: () => setOpen(false),
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        id: "mobile-nav",
        "aria-label": "Main navigation",
        className: cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/[0.06] bg-ink-950 transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        ),
        inert: !open,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setOpen(false),
              "aria-label": "Close navigation",
              className: "absolute top-5 right-4 grid h-8 w-8 place-items-center rounded-full text-fg-2 hover:bg-white/5",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(Sidebar, { pathname })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx(TopBar, { onMenu: () => setOpen(true), menuOpen: open }),
      /* @__PURE__ */ jsx("main", { id: "main", className: "mx-auto w-full max-w-[1320px] px-4 pt-8 pb-20 sm:px-6 lg:px-10 lg:pt-10", children })
    ] })
  ] });
}
function Sidebar({ pathname }) {
  const { role, displayName } = usePreferences();
  const isActive = (to, exact) => exact ? pathname === to || pathname === `${to}/` : pathname.startsWith(to);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 pt-6 pb-5", children: /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "SEEN home", children: /* @__PURE__ */ jsx(Logo, {}) }) }),
    /* @__PURE__ */ jsx(WorkspaceSwitcher, {}),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Primary", className: "flex-1 overflow-y-auto px-3 pt-5", children: /* @__PURE__ */ jsx("ul", { className: "space-y-0.5", children: navItems.map((item) => {
      const active = isActive(item.to, "exact" in item ? item.exact : false);
      const Icon = item.icon;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.to,
          "aria-current": active ? "page" : void 0,
          className: cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            active ? "bg-signal/15 text-fg" : "text-fg-3 hover:bg-white/[0.04] hover:text-fg"
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: cn("h-4 w-4", active && "text-signal-soft"), "aria-hidden": true }),
            item.label
          ]
        }
      ) }, item.to);
    }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/[0.06] p-3", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: settingsItem.to,
          "aria-current": isActive(settingsItem.to) ? "page" : void 0,
          className: cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive(settingsItem.to) ? "bg-signal/15 text-fg" : "text-fg-3 hover:text-fg"
          ),
          children: [
            /* @__PURE__ */ jsx(settingsItem.icon, { className: "h-4 w-4", "aria-hidden": true }),
            settingsItem.label
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 rounded-xl px-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-ink-700 text-xs font-medium text-fg-2", children: (displayName || "Guest").slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-xs", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-fg", children: displayName || "Guest preview" }),
          /* @__PURE__ */ jsxs("p", { className: "text-fg-3", children: [
            role ? roleLabels[role] : "No role chosen",
            " · not signed in"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function WorkspaceSwitcher() {
  const { role } = usePreferences();
  const multi = role === "manager" || role === "label";
  const [selected, setSelected] = useState(demoRoster[0].id);
  return /* @__PURE__ */ jsxs("div", { className: "mx-3 rounded-lg border border-white/[0.07] bg-ink-900 px-3 py-2.5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[11px] text-fg-3", children: multi ? role === "label" ? "Label roster" : "Managed artists" : "Artist workspace" }),
    multi ? /* @__PURE__ */ jsxs("div", { className: "relative mt-1.5", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "roster", className: "sr-only", children: "Select artist" }),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "roster",
          value: selected,
          onChange: (e) => setSelected(e.target.value),
          className: "w-full appearance-none bg-transparent pr-6 text-sm font-medium text-fg focus:outline-none",
          children: demoRoster.map((a) => /* @__PURE__ */ jsx("option", { value: a.id, className: "bg-ink-900", children: a.name }, a.id))
        }
      ),
      /* @__PURE__ */ jsx(ChevronsUpDown, { className: "pointer-events-none absolute top-0.5 right-0 h-4 w-4 text-fg-3", "aria-hidden": true })
    ] }) : /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm font-medium text-fg", children: demoArtist.name }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-fg-3", children: "Fictional demo artist" })
  ] });
}
function TopBar({ onMenu, menuOpen }) {
  const { showDemoData } = usePreferences();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-14 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-10", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onMenu,
        "aria-label": "Open navigation",
        "aria-expanded": menuOpen,
        "aria-controls": "mobile-nav",
        className: "-ml-1 grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:bg-white/5 lg:hidden",
        children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx(Link, { to: "/app", className: "lg:hidden", "aria-label": "Dashboard", children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("span", { className: "hidden items-center gap-1.5 rounded-full border border-white/[0.07] px-2.5 py-1 text-[11px] text-fg-3 sm:inline-flex", children: [
        /* @__PURE__ */ jsx(Unplug, { className: "h-3 w-3", "aria-hidden": true }),
        "No platforms connected"
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": showDemoData,
          onClick: () => setPreferences({ showDemoData: !showDemoData }),
          className: cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
            showDemoData ? "border-warning/30 bg-warning/[0.08] text-warning" : "border-white/10 text-fg-3 hover:text-fg"
          ),
          children: [
            /* @__PURE__ */ jsx(FlaskConical, { className: "h-3 w-3", "aria-hidden": true }),
            "Demo data ",
            showDemoData ? "on" : "off"
          ]
        }
      )
    ] })
  ] }) });
}
export {
  AppShell as A
};
