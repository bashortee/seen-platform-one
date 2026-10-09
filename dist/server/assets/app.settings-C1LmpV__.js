import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Lock, Unplug } from "lucide-react";
import { C as Card } from "./Card-DHBEemWN.js";
import { P as PageHeader, c as cn, B as Badge } from "./Misc-CtC884cP.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { T as TextField, a as Switch } from "./Field-B-owlbUR.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { u as usePreferences, r as roleLabels, s as setPreferences, a as resetPreferences } from "./preferences-CDJjCwCs.js";
import { R as Route } from "./router-z7C8V8Oz.js";
import "./demo-C1AcIFzz.js";
const connections = [{
  group: "Streaming",
  items: ["Spotify for Artists", "Apple Music for Artists", "YouTube Music", "Amazon Music", "Deezer"]
}, {
  group: "Social",
  items: ["Instagram", "TikTok", "YouTube", "X"]
}, {
  group: "Distribution",
  items: ["Distributor (CSV import)", "Royalty statements"]
}];
function Settings() {
  const {
    tab = "profile"
  } = Route.useSearch();
  const navigate = useNavigate({
    from: Route.fullPath
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Workspace", title: "Settings", demo: false, description: "Manage your profile, data sources and preferences." }),
    /* @__PURE__ */ jsx(Tabs, { label: "Settings sections", value: tab, onChange: (t) => navigate({
      search: {
        tab: t
      },
      replace: true
    }), options: [{
      value: "profile",
      label: "Profile"
    }, {
      value: "data",
      label: "Data & connections"
    }, {
      value: "notifications",
      label: "Notifications"
    }], className: "mb-6" }),
    tab === "profile" && /* @__PURE__ */ jsx(ProfileTab, {}),
    tab === "data" && /* @__PURE__ */ jsx(DataTab, {}),
    tab === "notifications" && /* @__PURE__ */ jsx(NotificationsTab, {})
  ] });
}
function ProfileTab() {
  const prefs = usePreferences();
  const [name, setName] = useState(prefs.displayName);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState();
  function save(e) {
    e.preventDefault();
    if (name.length > 60) {
      setError("Keep your display name under 60 characters.");
      return;
    }
    setPreferences({
      displayName: name.trim()
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsx(Card, { title: "Profile", description: "Shown in your workspace. Stored in this browser only.", children: /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsx(TextField, { label: "Display name", value: name, onChange: (e) => {
        setName(e.target.value);
        setError(void 0);
      }, placeholder: "Your name or artist name", error }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", children: "Save changes" }),
        saved && /* @__PURE__ */ jsxs("span", { role: "status", className: "inline-flex items-center gap-1 text-sm text-signal-soft", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": true }),
          " Saved"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Role", description: "Changes how the workspace and roster switcher behave.", children: /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { className: "sr-only", children: "Role" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: Object.keys(roleLabels).map((r) => /* @__PURE__ */ jsxs("label", { className: cn("cursor-pointer rounded-xl border px-3 py-3 text-center text-sm transition-colors", prefs.role === r ? "border-signal/50 bg-signal/[0.06] text-fg" : "border-white/[0.08] text-fg-2 hover:border-white/20"), children: [
        /* @__PURE__ */ jsx("input", { type: "radio", name: "role", className: "sr-only", checked: prefs.role === r, onChange: () => setPreferences({
          role: r
        }) }),
        roleLabels[r]
      ] }, r)) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Account", description: "Sign-in and account security arrive in a later release.", className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm text-fg-2", children: [
        /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-fg-3", "aria-hidden": true }),
        " You're using SEEN as a guest preview. No account exists yet."
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "danger", size: "sm", onClick: () => {
        if (window.confirm("Reset all preview settings and tasks stored in this browser?")) resetPreferences();
      }, children: "Reset preview data" })
    ] }) })
  ] });
}
function DataTab() {
  const {
    showDemoData
  } = usePreferences();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Card, { title: "Demo data", children: /* @__PURE__ */ jsx(Switch, { checked: showDemoData, onChange: (v) => setPreferences({
      showDemoData: v
    }), label: "Show demo data", description: "Fills the interface with sample figures for a fictional artist. Turn it off to see how SEEN looks before any source is connected." }) }),
    /* @__PURE__ */ jsx(Card, { title: "Connections", description: "SEEN doesn't connect to any platform yet. These integrations are planned; credentials will be handled on the server, never in your browser.", children: /* @__PURE__ */ jsx("div", { className: "space-y-8", children: connections.map((g) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-mono text-[11px] tracking-[0.16em] text-fg-3 uppercase", children: g.group }),
      /* @__PURE__ */ jsx("ul", { className: "mt-3 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06]", children: g.items.map((name) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: name }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(Badge, { children: [
            /* @__PURE__ */ jsx(Unplug, { className: "h-3 w-3", "aria-hidden": true }),
            " Not connected"
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", disabled: true, title: "Coming in a later release", children: "Coming soon" })
        ] })
      ] }, name)) })
    ] }, g.group)) }) })
  ] });
}
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    weekly: true,
    breakout: true,
    tasks: false
  });
  return /* @__PURE__ */ jsx(Card, { title: "Notifications", description: "Choose what SEEN will tell you about once email delivery is available. Preferences are not saved yet.", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Switch, { checked: prefs.weekly, onChange: (v) => setPrefs({
      ...prefs,
      weekly: v
    }), label: "Weekly summary", description: "A Monday digest of changes and recommended actions." }),
    /* @__PURE__ */ jsx(Switch, { checked: prefs.breakout, onChange: (v) => setPrefs({
      ...prefs,
      breakout: v
    }), label: "Breakout alerts", description: "When a city or track grows unusually fast." }),
    /* @__PURE__ */ jsx(Switch, { checked: prefs.tasks, onChange: (v) => setPrefs({
      ...prefs,
      tasks: v
    }), label: "Task reminders", description: "A nudge the day before a task is due." })
  ] }) });
}
export {
  Settings as component
};
