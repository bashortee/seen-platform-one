import { jsx } from "react/jsx-runtime";
import { A as AppShell } from "./AppShell-DdxShIEx.js";
import { E as ErrorState } from "./States-BNdbGBv0.js";
import "react";
import "@tanstack/react-router";
import "lucide-react";
import "./Misc-CtC884cP.js";
import "./preferences-CDJjCwCs.js";
import "./demo-C1AcIFzz.js";
import "./Button-BRatFXcr.js";
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ErrorState, { title: "This page couldn't be displayed", description: error.message || "An unexpected error occurred in the interface.", onRetry: reset }) });
export {
  SplitErrorComponent as errorComponent
};
