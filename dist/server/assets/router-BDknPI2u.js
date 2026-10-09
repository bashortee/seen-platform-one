import { createRootRoute, Link, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const siteName = "SEEN — Smart Entertainment Evolution Engine";
const siteDescription = "SEEN turns music industry data into clear insights and next actions for independent artists, managers and labels.";
const Route$e = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteName },
      { name: "description", content: siteDescription },
      { name: "theme-color", content: "#0c0c0b" },
      { property: "og:title", content: siteName },
      { property: "og:description", content: siteDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsx("main", { className: "relative z-10 grid min-h-screen place-items-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-[0.2em] text-fg-3 uppercase", children: "Error 404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-5xl", children: "This page went unheard." }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-fg-2", children: "The address you followed doesn't exist in SEEN." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "mt-8 inline-flex rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-signal-ink",
        children: "Back to home"
      }
    )
  ] }) });
}
const $$splitComponentImporter$d = () => import("./index-D3DeVV6X.js");
const Route$d = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitErrorComponentImporter = () => import("./app-CvuAuiaH.js");
const $$splitComponentImporter$c = () => import("./app-DBUoIfgP.js");
const Route$c = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const $$splitComponentImporter$b = () => import("./onboarding-Q0AUumAb.js");
const Route$b = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{
      title: "Choose your role — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./sign-in-BRMhhm9q.js");
const Route$a = createFileRoute("/sign-in")({
  head: () => ({
    meta: [{
      title: "Sign in — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./sign-up-CJPuG2d_.js");
const Route$9 = createFileRoute("/sign-up")({
  head: () => ({
    meta: [{
      title: "Create your workspace — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app.index-CvcSx4Ah.js");
const Route$8 = createFileRoute("/app/")({
  head: () => ({
    meta: [{
      title: "Dashboard — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.actions-CIzG0Har.js");
const Route$7 = createFileRoute("/app/actions")({
  head: () => ({
    meta: [{
      title: "Action planner — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.assistant-DixLj_4w.js");
const Route$6 = createFileRoute("/app/assistant")({
  head: () => ({
    meta: [{
      title: "Ask SEEN — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.audience-Bqm0VrgJ.js");
const Route$5 = createFileRoute("/app/audience")({
  head: () => ({
    meta: [{
      title: "Audience & geography — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.catalogue-CMNgOL-z.js");
const Route$4 = createFileRoute("/app/catalogue")({
  head: () => ({
    meta: [{
      title: "Catalogue — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.opportunities-2rUxXqb-.js");
const Route$3 = createFileRoute("/app/opportunities")({
  head: () => ({
    meta: [{
      title: "Opportunities & gaps — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.performance-DcQdNpou.js");
const Route$2 = createFileRoute("/app/performance")({
  head: () => ({
    meta: [{
      title: "Performance — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.settings-CCR4jybp.js");
const tabs = ["profile", "data", "notifications"];
const Route$1 = createFileRoute("/app/settings")({
  head: () => ({
    meta: [{
      title: "Settings — SEEN"
    }]
  }),
  validateSearch: (search) => ({
    tab: tabs.includes(search.tab) ? search.tab : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.social-51fX7IfF.js");
const Route = createFileRoute("/app/social")({
  head: () => ({
    meta: [{
      title: "Social presence — SEEN"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const AppRoute = Route$c.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$e
});
const OnboardingRoute = Route$b.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$e
});
const SignInRoute = Route$a.update({
  id: "/sign-in",
  path: "/sign-in",
  getParentRoute: () => Route$e
});
const SignUpRoute = Route$9.update({
  id: "/sign-up",
  path: "/sign-up",
  getParentRoute: () => Route$e
});
const AppIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppActionsRoute = Route$7.update({
  id: "/actions",
  path: "/actions",
  getParentRoute: () => AppRoute
});
const AppAssistantRoute = Route$6.update({
  id: "/assistant",
  path: "/assistant",
  getParentRoute: () => AppRoute
});
const AppAudienceRoute = Route$5.update({
  id: "/audience",
  path: "/audience",
  getParentRoute: () => AppRoute
});
const AppCatalogueRoute = Route$4.update({
  id: "/catalogue",
  path: "/catalogue",
  getParentRoute: () => AppRoute
});
const AppOpportunitiesRoute = Route$3.update({
  id: "/opportunities",
  path: "/opportunities",
  getParentRoute: () => AppRoute
});
const AppPerformanceRoute = Route$2.update({
  id: "/performance",
  path: "/performance",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$1.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppSocialRoute = Route.update({
  id: "/social",
  path: "/social",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppActionsRoute,
  AppAssistantRoute,
  AppAudienceRoute,
  AppCatalogueRoute,
  AppOpportunitiesRoute,
  AppPerformanceRoute,
  AppSettingsRoute,
  AppSocialRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  OnboardingRoute,
  SignInRoute,
  SignUpRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  router as r
};
