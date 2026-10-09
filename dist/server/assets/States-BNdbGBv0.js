import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, PlugZap } from "lucide-react";
import { c as cn } from "./Misc-CtC884cP.js";
import { B as Button, b as buttonClass } from "./Button-BRatFXcr.js";
function Skeleton({ className }) {
  return /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: cn("skeleton rounded-lg", className) });
}
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-6 py-12 text-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-800 text-fg-2", children: icon ?? /* @__PURE__ */ jsx(PlugZap, { className: "h-5 w-5", "aria-hidden": true }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-fg", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "mt-1.5 max-w-sm text-sm text-fg-3", children: description }),
        action && /* @__PURE__ */ jsx("div", { className: "mt-5", children: action })
      ]
    }
  );
}
function NotConnectedState({ what }) {
  return /* @__PURE__ */ jsx(
    EmptyState,
    {
      title: `No ${what} yet`,
      description: "SEEN isn't connected to any music or social platform. Connections arrive in a later release — until then you can preview the interface with demo data.",
      action: /* @__PURE__ */ jsx(Link, { to: "/app/settings", search: { tab: "data" }, className: buttonClass("secondary", "sm"), children: "Open data settings" })
    }
  );
}
function ErrorState({
  title = "Something went wrong",
  description,
  onRetry
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "alert",
      className: "flex flex-col items-start gap-3 rounded-xl border border-critical/25 bg-critical/[0.06] p-5 sm:flex-row sm:items-center",
      children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 shrink-0 text-critical", "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-fg", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-fg-2", children: description })
        ] }),
        onRetry && /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", onClick: onRetry, children: "Try again" })
      ]
    }
  );
}
export {
  ErrorState as E,
  NotConnectedState as N,
  Skeleton as S,
  EmptyState as a
};
