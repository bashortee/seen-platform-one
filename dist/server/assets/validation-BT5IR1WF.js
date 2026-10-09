import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as Logo } from "./Misc-CtC884cP.js";
function AuthLayout({
  children,
  aside
}) {
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid min-h-screen lg:grid-cols-[1fr_1.1fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-5 py-8 sm:px-10", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "SEEN home", className: "self-start", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsx("main", { className: "flex flex-1 items-center py-12", children: /* @__PURE__ */ jsx("div", { className: "rise mx-auto w-full max-w-[400px]", children }) })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "relative hidden overflow-hidden border-l border-white/[0.06] bg-ink-900 lg:block", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.5]", "aria-hidden": true, children: /* @__PURE__ */ jsx("svg", { className: "h-full w-full", preserveAspectRatio: "none", viewBox: "0 0 600 800", children: Array.from({ length: 28 }).map((_, i) => /* @__PURE__ */ jsx(
        "path",
        {
          d: `M0 ${120 + i * 22} C 150 ${80 + i * 22 + Math.sin(i) * 40}, 380 ${180 + i * 20 - Math.cos(i) * 50}, 600 ${110 + i * 23}`,
          fill: "none",
          stroke: i === 14 ? "#2f6fed" : "rgba(255,255,255,0.06)",
          strokeWidth: i === 14 ? 1.5 : 1
        },
        i
      )) }) }),
      /* @__PURE__ */ jsx("div", { className: "relative flex h-full flex-col justify-end p-14", children: aside })
    ] })
  ] });
}
function PreviewNotice({
  title,
  children,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { role: "status", className: "rise rounded-2xl border border-warning/25 bg-warning/[0.06] p-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-fg", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-fg-2", children }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: action })
  ] });
}
function validateEmail(v) {
  if (!v.trim()) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Enter a valid email address, like name@example.com.";
  return void 0;
}
function validatePassword(v) {
  if (!v) return "Enter a password.";
  if (v.length < 8) return "Use at least 8 characters.";
  return void 0;
}
export {
  AuthLayout as A,
  PreviewNotice as P,
  validatePassword as a,
  validateEmail as v
};
