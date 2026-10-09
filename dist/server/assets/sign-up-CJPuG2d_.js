import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { A as AuthLayout, P as PreviewNotice, a as validatePassword, v as validateEmail } from "./validation-BT5IR1WF.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { T as TextField } from "./Field-B-owlbUR.js";
import { s as setPreferences } from "./preferences-CDJjCwCs.js";
import "./Misc-CtC884cP.js";
import "./demo-C1AcIFzz.js";
function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    const next = {
      name: form.name.trim() ? void 0 : "Enter your name or artist name.",
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      terms: form.terms ? void 0 : "Please accept the preview terms to continue."
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setPreferences({
      displayName: form.name.trim()
    });
    setSubmitted(true);
  }
  return /* @__PURE__ */ jsxs(AuthLayout, { aside: /* @__PURE__ */ jsxs("blockquote", { className: "max-w-md", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-4xl leading-[1.1] tracking-tight", children: "“The point isn't more charts. It's knowing which three things to do this week.”" }),
    /* @__PURE__ */ jsx("footer", { className: "mt-6 text-sm text-fg-3", children: "The idea behind SEEN" })
  ] }), children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl tracking-tight", children: "Create your workspace" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-fg-2", children: [
      "Already have one?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/sign-in", className: "text-fg underline decoration-white/20 underline-offset-4 hover:decoration-signal", children: "Sign in" })
    ] }),
    submitted ? /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(PreviewNotice, { title: "Accounts aren't live yet", action: /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
      to: "/onboarding"
    }), children: [
      "Continue to onboarding ",
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
    ] }), children: "SEEN is in early preview, so no account was created and your email and password were not sent anywhere. Only your name is kept in this browser to personalise the demo." }) }) : /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsx(TextField, { label: "Name or artist name", autoComplete: "name", value: form.name, onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }), error: errors.name }),
      /* @__PURE__ */ jsx(TextField, { label: "Email", type: "email", autoComplete: "email", value: form.email, onChange: (e) => setForm({
        ...form,
        email: e.target.value
      }), error: errors.email }),
      /* @__PURE__ */ jsx(TextField, { label: "Password", type: "password", autoComplete: "new-password", value: form.password, onChange: (e) => setForm({
        ...form,
        password: e.target.value
      }), error: errors.password, hint: "At least 8 characters." }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 text-sm text-fg-2", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: form.terms, onChange: (e) => setForm({
            ...form,
            terms: e.target.checked
          }), "aria-invalid": errors.terms ? true : void 0, className: "mt-0.5 h-4 w-4 rounded accent-[#2f6fed]" }),
          "I understand SEEN is an early preview that uses demo data."
        ] }),
        errors.terms && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-critical", children: errors.terms })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "w-full", children: "Create workspace" })
    ] })
  ] });
}
export {
  SignUp as component
};
