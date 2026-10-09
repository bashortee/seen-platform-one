import { jsxs, jsx } from "react/jsx-runtime";
import { useId } from "react";
import { c as cn } from "./Misc-CtC884cP.js";
const control = "w-full rounded-xl border bg-ink-950/70 px-3.5 text-sm text-fg placeholder:text-fg-3/70 transition-colors focus:outline-none focus:border-signal/60 focus:ring-2 focus:ring-signal/15";
function inputClass(invalid, size = "md") {
  return cn(control, size === "sm" ? "h-9" : "h-11", invalid ? "border-critical/60" : "border-white/10");
}
function TextField({
  label,
  error,
  hint,
  className,
  ...props
}) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : void 0;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: "mb-1.5 block text-[13px] font-medium text-fg-2", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        "aria-invalid": error ? true : void 0,
        "aria-describedby": describedBy,
        className: inputClass(!!error),
        ...props
      }
    ),
    error ? /* @__PURE__ */ jsx("p", { id: `${id}-error`, className: "mt-1.5 text-xs text-critical", children: error }) : hint ? /* @__PURE__ */ jsx("p", { id: `${id}-hint`, className: "mt-1.5 text-xs text-fg-3", children: hint }) : null
  ] });
}
function SelectField({
  label,
  children,
  className,
  ...props
}) {
  const id = useId();
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: "mb-1.5 block text-[13px] font-medium text-fg-2", children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        id,
        className: cn(inputClass(), "appearance-none bg-[length:12px] pr-9"),
        ...props,
        children
      }
    )
  ] });
}
function Switch({
  checked,
  onChange,
  label,
  description
}) {
  const id = useId();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: id, className: "text-sm font-medium text-fg", children: label }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-fg-3", children: description })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        id,
        role: "switch",
        type: "button",
        "aria-checked": checked,
        onClick: () => onChange(!checked),
        className: cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors",
          checked ? "border-signal/40 bg-signal" : "border-white/10 bg-ink-700"
        ),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full transition-transform",
              checked ? "translate-x-5 bg-signal-ink" : "bg-fg-3"
            )
          }
        )
      }
    )
  ] });
}
export {
  SelectField as S,
  TextField as T,
  Switch as a,
  inputClass as i
};
