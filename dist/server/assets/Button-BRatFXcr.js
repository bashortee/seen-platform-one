import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { c as cn } from "./Misc-CtC884cP.js";
const variants = {
  primary: "bg-signal text-signal-ink hover:bg-signal-strong active:translate-y-px",
  secondary: "border border-white/10 bg-ink-800 text-fg hover:border-white/20 hover:bg-ink-700 active:translate-y-px",
  ghost: "text-fg-2 hover:bg-white/5 hover:text-fg",
  danger: "border border-critical/30 bg-critical/10 text-critical hover:bg-critical/20"
};
const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-sm gap-2"
};
function buttonClass(variant = "primary", size = "md") {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size]
  );
}
const Button = forwardRef(
  ({ variant = "primary", size = "md", className, type, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: type ?? "button",
      className: cn(buttonClass(variant, size), className),
      ...props
    }
  )
);
Button.displayName = "Button";
export {
  Button as B,
  buttonClass as b
};
