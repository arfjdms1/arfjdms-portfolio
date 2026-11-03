// Runs after `vite build` (the site) and `vite build --ssr` (the renderer).
// Writes one fully rendered HTML file per page, with that page's title and
// descriptions, so every route works on GitHub Pages without rewrites and
// reads correctly without JavaScript.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const output = resolve("dist");
const shell = await readFile(resolve(output, "index.html"), "utf8");
const { render, pageMeta } = await import(
  pathToFileURL(resolve("dist-ssr/entry-server.js")).href
);

const pages = [
  { file: "index.html", url: "/", meta: pageMeta.home },
  { file: "projects/index.html", url: "/projects", meta: pageMeta.work },
  { file: "about/index.html", url: "/about", meta: pageMeta.about },
  // GitHub Pages serves this for unknown paths; the URL stays as typed.
  { file: "404.html", url: "/404", meta: pageMeta.notFound },
];

function escape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setMeta(html, attribute, name, content) {
  const tag = new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*("\\s*/?>)`);
  if (!tag.test(html)) throw new Error(`index.html has no <meta ${attribute}="${name}">`);
  return html.replace(tag, `$1${escape(content)}$2`);
}

for (const page of pages) {
  const { meta } = page;
  const summary = meta.summary ?? meta.description;
  const url = page.url === "/" || page.url === "/404" ? "https://arfjdms.me/" : `https://arfjdms.me${page.url}/`;
  // data-prerendered tells src/main.tsx which page this markup is, so it only
  // hydrates when the URL matches.
  let html = shell.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${page.url}">${render(page.url)}</div>`,
  );
  if (!html.includes(`data-prerendered="${page.url}"><`)) throw new Error(`prerender of ${page.url} came back empty`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", summary);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", summary);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  if (meta.noIndex) {
    html = html.replace('<meta name="theme-color"', '<meta name="robots" content="noindex, follow" /><meta name="theme-color"');
  }
  const target = resolve(output, page.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

await writeFile(resolve(output, ".nojekyll"), "");
console.log(`Prerendered ${pages.map((p) => p.file).join(", ")}`);
