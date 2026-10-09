import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Disc3, Globe2, Compass } from "lucide-react";
import { L as Logo, D as DemoBadge } from "./Misc-CtC884cP.js";
import { b as buttonClass } from "./Button-BRatFXcr.js";
import "react";
function PublicHeader() {
  return /* @__PURE__ */ jsx("header", { className: "relative z-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "SEEN home", children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Site", className: "flex items-center gap-1 sm:gap-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/sign-in", className: buttonClass("ghost", "sm"), children: "Sign in" }),
      /* @__PURE__ */ jsx(Link, { to: "/sign-up", className: buttonClass("primary", "sm"), children: "Get started" })
    ] })
  ] }) });
}
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(PublicHeader, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Features, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-3xl px-5 pt-16 pb-20 text-center sm:px-8 lg:pt-28", children: [
    /* @__PURE__ */ jsx("p", { className: "rise text-sm font-medium text-signal-soft", children: "Smart Entertainment Evolution Engine" }),
    /* @__PURE__ */ jsxs("h1", { className: "rise mt-4 font-display text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.05]", style: {
      animationDelay: "80ms"
    }, children: [
      "Know what your music is ",
      /* @__PURE__ */ jsx("em", { children: "telling" }),
      " you."
    ] }),
    /* @__PURE__ */ jsx("p", { className: "rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-2", style: {
      animationDelay: "160ms"
    }, children: "SEEN brings your catalogue, streaming, audience and social signals into one place, then turns them into clear next steps — for artists, managers and labels." }),
    /* @__PURE__ */ jsxs("div", { className: "rise mt-9 flex flex-wrap items-center justify-center gap-3", style: {
      animationDelay: "240ms"
    }, children: [
      /* @__PURE__ */ jsxs(Link, { to: "/sign-up", className: buttonClass("primary", "lg"), children: [
        "Get started ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/app", className: buttonClass("secondary", "lg"), children: "View the demo" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "rise mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-fg-3", style: {
      animationDelay: "300ms"
    }, children: [
      "Early preview. No platforms are connected yet — the demo uses ",
      /* @__PURE__ */ jsx(DemoBadge, {}),
      " for a fictional artist."
    ] })
  ] });
}
const features = [{
  icon: Disc3,
  title: "Your catalogue in one place",
  body: "Releases, tracks and metadata health, checked as you go."
}, {
  icon: Globe2,
  title: "Signals, shown plainly",
  body: "Performance trends, breakout cities and social engagement."
}, {
  icon: Compass,
  title: "Clear next steps",
  body: "Gaps and opportunities turned into tasks you can track."
}];
function Features() {
  return /* @__PURE__ */ jsx("section", { "aria-label": "What SEEN does", className: "mx-auto max-w-5xl px-5 pb-24 sm:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3", children: features.map((f) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/[0.07] bg-ink-900 p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-signal/10", children: /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5 text-signal-soft", "aria-hidden": true }) }),
    /* @__PURE__ */ jsx("h2", { className: "mt-5 text-base font-semibold", children: f.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-fg-2", children: f.body })
  ] }, f.title)) }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-white/[0.06]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-8", children: [
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " SEEN. Early preview — demo data only."
    ] })
  ] }) });
}
export {
  Landing as component
};
