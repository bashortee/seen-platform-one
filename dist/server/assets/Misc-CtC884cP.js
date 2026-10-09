import { jsx, jsxs } from "react/jsx-runtime";
import { FlaskConical, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
function formatNumber(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e4) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString("en-GB");
}
function formatDelta(pct) {
  const sign = pct > 0 ? "+" : pct < 0 ? "−" : "";
  return `${sign}${Math.abs(pct).toFixed(1)}%`;
}
const tones = {
  neutral: "border-white/10 bg-white/[0.04] text-fg-2",
  signal: "border-signal/25 bg-signal/10 text-signal-soft",
  good: "border-good/30 bg-good/10 text-[#5fd35f]",
  warning: "border-warning/30 bg-warning/10 text-warning",
  serious: "border-serious/30 bg-serious/10 text-serious",
  critical: "border-critical/30 bg-critical/10 text-critical",
  info: "border-series-1/30 bg-series-1/10 text-[#7fb2f0]"
};
function Badge({
  tone = "neutral",
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        tones[tone],
        className
      ),
      children
    }
  );
}
function DemoBadge({ className }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      title: "Sample data for a fictional artist. Not real performance data.",
      className: cn(
        "inline-flex items-center gap-1 rounded-full border border-warning/25 bg-warning/[0.08] px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-warning uppercase",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(FlaskConical, { className: "h-3 w-3", "aria-hidden": true }),
        "Demo data"
      ]
    }
  );
}
function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  demo = true
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rise flex flex-col gap-5 pb-8 md:flex-row md:items-end md:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        eyebrow && /* @__PURE__ */ jsx("p", { className: "text-sm text-fg-3", children: eyebrow }),
        demo && /* @__PURE__ */ jsx(DemoBadge, {})
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-3xl leading-tight text-fg sm:text-4xl", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-fg-2", children: description })
    ] }),
    actions && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: actions })
  ] });
}
function Delta({ value, invert = false }) {
  const good = invert ? value < 0 : value > 0;
  const Icon = value > 0 ? ArrowUpRight : value < 0 ? ArrowDownRight : Minus;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "tabular inline-flex items-center gap-0.5 text-xs font-medium",
        value === 0 ? "text-fg-3" : good ? "text-[#5fd35f]" : "text-critical"
      ),
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5", "aria-hidden": true }),
        formatDelta(value),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: good ? "(improving)" : value === 0 ? "" : "(declining)" })
      ]
    }
  );
}
function StatTile({
  label,
  value,
  unit,
  delta,
  hint,
  invertDelta
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[13px] text-fg-3", children: label }),
    /* @__PURE__ */ jsxs("p", { className: "mt-3 font-display text-3xl leading-none text-fg", children: [
      unit ? value.toFixed(1) : formatNumber(value),
      unit && /* @__PURE__ */ jsx("span", { className: "ml-0.5 text-xl text-fg-2", children: unit })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
      delta !== void 0 && /* @__PURE__ */ jsx(Delta, { value: delta, invert: invertDelta }),
      hint && /* @__PURE__ */ jsx("span", { className: "text-xs text-fg-3", children: hint })
    ] })
  ] });
}
function ProgressBar({
  value,
  label,
  className
}) {
  const v = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Math.round(v),
      "aria-label": label,
      className: cn("h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]", className),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-full bg-signal transition-[width] duration-500",
          style: { width: `${v}%` }
        }
      )
    }
  );
}
function Logo({ className }) {
  return /* @__PURE__ */ jsxs("span", { className: cn("inline-flex items-center gap-2.5", className), children: [
    /* @__PURE__ */ jsxs("span", { "aria-hidden": true, className: "flex h-5 items-end gap-[3px]", children: [
      /* @__PURE__ */ jsx("span", { className: "h-2.5 w-[3px] rounded-full bg-signal" }),
      /* @__PURE__ */ jsx("span", { className: "h-5 w-[3px] rounded-full bg-signal" }),
      /* @__PURE__ */ jsx("span", { className: "h-3.5 w-[3px] rounded-full bg-signal" }),
      /* @__PURE__ */ jsx("span", { className: "h-1.5 w-[3px] rounded-full bg-signal/60" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-[17px] font-semibold tracking-[0.2em] text-fg", children: "SEEN" })
  ] });
}
export {
  Badge as B,
  DemoBadge as D,
  Logo as L,
  PageHeader as P,
  StatTile as S,
  ProgressBar as a,
  Delta as b,
  cn as c,
  formatNumber as f
};
