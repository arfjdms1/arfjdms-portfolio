import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
// The engine's taste floor first, then this site's tokens and layout over it.
import "scroll-craft-kit/styles.css";
import "./styles/site.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
