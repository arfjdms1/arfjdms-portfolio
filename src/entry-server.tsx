// Build-time renderer. `vite build --ssr` bundles this, and
// scripts/postbuild.mjs calls render() for each page so the HTML already holds
// the real content: crawlers, link previews and visitors without JavaScript see
// the page itself, not an empty shell. The browser then hydrates it.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "./App";

export { pageMeta } from "./data/meta";

export function render(url: string): string {
  const router = createMemoryRouter(routes, { initialEntries: [url] });
  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
