import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve("dist");
const shell = await readFile(resolve(output, "index.html"), "utf8");
const routes = [
  {
    path: "projects",
    title: "Selected Work — arfjdms",
    description:
      "Explore Illatio, a self-hosted AI inference platform, Image Viewer in C++20, and EaglerXSkinBridge for Minecraft.",
  },
  {
    path: "about",
    title: "About Aarav Khemka — arfjdms",
    description:
      "Meet Aarav Khemka, the developer behind arfjdms. Building Illatio, native applications, and open-source Minecraft tools.",
  },
];

function escape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// GitHub Pages has no SPA rewrites. Emit real directories for every public route
// so bookmarks, refreshes, and project deep links receive HTTP 200 responses.
for (const route of routes) {
  const directory = resolve(output, route.path);
  const url = `https://arfjdms.me/${route.path}/`;
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(
      /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${escape(route.description)}$2`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/g,
      `$1${escape(route.title)}$2`,
    )
    .replace(/(href|content)="https:\/\/arfjdms\.me\/"/g, `$1="${url}"`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

// Unknown routes keep their URL and get the application's helpful 404 screen.
await writeFile(
  resolve(output, "404.html"),
  shell
    .replace(/<title>.*?<\/title>/, "<title>Page not found — arfjdms</title>")
    .replace(
      '<meta name="theme-color"',
      '<meta name="robots" content="noindex, follow" /><meta name="theme-color"',
    ),
);
await writeFile(resolve(output, ".nojekyll"), "");
console.log(
  "GitHub Pages route documents generated: /projects/, /about/, /404.html",
);
