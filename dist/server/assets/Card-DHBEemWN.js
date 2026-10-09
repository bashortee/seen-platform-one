import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./Misc-CtC884cP.js";
function Card({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  as: Tag = "section"
}) {
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      className: cn(
        "relative rounded-2xl border border-white/[0.07] bg-ink-900/80",
        className
      ),
      children: [
        (title || actions) && /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            title && /* @__PURE__ */ jsx("h2", { className: "text-[15px] font-medium tracking-tight text-fg", children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-fg-3", children: description })
          ] }),
          actions && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: actions })
        ] }),
        /* @__PURE__ */ jsx("div", { className: cn("p-5 sm:p-6", bodyClassName), children })
      ]
    }
  );
}
export {
  Card as C
};
