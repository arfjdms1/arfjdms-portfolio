import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { ScrollStage } from "scroll-craft-kit/react";
import { Colophon } from "@/components/Colophon";
import { Folio } from "@/components/Folio";
import { Masthead } from "@/components/Masthead";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";
import { About } from "@/pages/About";
import { NotFound } from "@/pages/NotFound";

// A flow reveal waits until its block is well inside the viewport, but Tab
// scrolls a link only just into view, so focus could land on a link still at
// opacity 0. Reveal the focused element's own reveal blocks straight away.
function useRevealOnFocus() {
  useEffect(() => {
    const onFocus = (event: FocusEvent) => {
      let node = event.target instanceof Element ? event.target : null;
      while (node) {
        if (node.matches("[data-sc-in], [data-sc-stagger] > *")) node.classList.add("sc-in");
        node = node.parentElement;
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
}

function Root() {
  const { pathname } = useLocation();
  useRevealOnFocus();
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

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
