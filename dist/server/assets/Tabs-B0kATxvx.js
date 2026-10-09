import { jsx, jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { c as cn } from "./Misc-CtC884cP.js";
function Tabs({
  options,
  value,
  onChange,
  label,
  size = "md",
  className
}) {
  const refs = useRef([]);
  function onKeyDown(e, index) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % options.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + options.length) % options.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    else return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(options[next].value);
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tablist",
      "aria-label": label,
      className: cn(
        "inline-flex max-w-full overflow-x-auto rounded-full border border-white/[0.07] bg-ink-950/60 p-1",
        className
      ),
      children: options.map((opt, i) => {
        const selected = opt.value === value;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            ref: (el) => {
              refs.current[i] = el;
            },
            role: "tab",
            type: "button",
            "aria-selected": selected,
            tabIndex: selected ? 0 : -1,
            onClick: () => onChange(opt.value),
            onKeyDown: (e) => onKeyDown(e, i),
            className: cn(
              "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors",
              size === "sm" ? "h-7 px-3 text-xs" : "h-8 px-3.5 text-[13px]",
              selected ? "bg-ink-700 text-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" : "text-fg-3 hover:text-fg"
            ),
            children: [
              opt.label,
              opt.count !== void 0 && /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "tabular rounded-full px-1.5 text-[10px]",
                    selected ? "bg-white/10 text-fg-2" : "bg-white/5"
                  ),
                  children: opt.count
                }
              )
            ]
          },
          opt.value
        );
      })
    }
  );
}
export {
  Tabs as T
};
