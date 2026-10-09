import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { A as AuthLayout, P as PreviewNotice, v as validateEmail } from "./validation-BT5IR1WF.js";
import { b as buttonClass, B as Button } from "./Button-BRatFXcr.js";
import { T as TextField } from "./Field-B-owlbUR.js";
import "./Misc-CtC884cP.js";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    const next = {
      email: validateEmail(email),
      password: password ? void 0 : "Enter your password."
    };
    setErrors(next);
    if (next.email || next.password) return;
    setSubmitted(true);
  }
  return /* @__PURE__ */ jsxs(AuthLayout, { aside: /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] tracking-[0.18em] text-signal-soft uppercase", children: "This week in the demo" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 font-display text-4xl leading-[1.1] tracking-tight", children: "Three new recommended actions are waiting for Halcyon Reed." }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-fg-3", children: "Fictional artist · sample data" })
  ] }), children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl tracking-tight", children: "Welcome back" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-fg-2", children: [
      "New to SEEN?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/sign-up", className: "text-fg underline decoration-white/20 underline-offset-4 hover:decoration-signal", children: "Create a workspace" })
    ] }),
    submitted ? /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(PreviewNotice, { title: "Sign-in isn't available yet", action: /* @__PURE__ */ jsxs(Link, { to: "/app", className: buttonClass("primary"), children: [
      "Open the demo workspace ",
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
    ] }), children: "Accounts arrive in a later release, so nothing was checked or sent. You can explore the full interface with demo data in the meantime." }) }) : /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsx(TextField, { label: "Email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), error: errors.email }),
      /* @__PURE__ */ jsx(TextField, { label: "Password", type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value), error: errors.password }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "w-full", children: "Sign in" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-fg-3", children: [
        "Or",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/app", className: "text-fg-2 underline underline-offset-4 hover:text-fg", children: "continue as a guest" }),
        " ",
        "to explore the demo."
      ] })
    ] })
  ] });
}
export {
  SignIn as component
};
