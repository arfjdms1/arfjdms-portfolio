import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
// The engine's taste floor first, then this site's tokens and layout over it.
import "scroll-craft-kit/styles.css";
import "./styles/site.css";
import { routes } from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>
);

// Built pages arrive prerendered (scripts/postbuild.mjs), so hydrate them. The
// HTML says which page it was rendered for; if a host served it for a
// different URL (a server that answers unknown paths with the home page, say),
// or this is the dev server's empty shell, render from scratch instead.
const here = location.pathname.replace(/\/+$/, "") || "/";
const expected = ["/", "/projects", "/about"].includes(here) ? here : "/404";
if (container.hasChildNodes() && container.dataset.prerendered === expected) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
