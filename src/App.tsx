import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, type RouteObject } from "react-router-dom";
import { ScrollStage } from "scroll-craft-kit/react";
import { Colophon } from "@/components/Colophon";
import { Folio } from "@/components/Folio";
import { Masthead } from "@/components/Masthead";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";
import { About } from "@/pages/About";
import { NotFound } from "@/pages/NotFound";
import { startReveals } from "@/reveal";

function Root() {
  const { pathname } = useLocation();
  // After each route renders: hide only what is still below the fold, and
  // reveal it as it approaches. See src/reveal.ts.
  useEffect(() => startReveals(document), [pathname]);
  return (
    <div className="site" id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="sc-grain" aria-hidden="true" />
      <Masthead />
      <Folio />
      {/* scroll-craft owns the DOM inside the stage, so each route gets a fresh
          mount: a new key destroys the old instance and mounts on the new page. */}
      <ScrollStage as="main" id="main" tabIndex={-1} key={pathname}>
        <Outlet />
      </ScrollStage>
      <Colophon />
      <ScrollRestoration />
    </div>
  );
}

// Shared by the browser router (src/main.tsx) and the build-time prerender
// (src/entry-server.tsx), so both render exactly the same tree.
export const routes: RouteObject[] = [
  {
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
