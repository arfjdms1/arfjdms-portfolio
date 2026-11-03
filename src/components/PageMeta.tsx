import { useEffect } from "react";
import type { Meta } from "@/data/meta";
import { profile } from "@/data/projects";

// Keeps the document head in step with client-side navigation. The same values
// are baked into each page's HTML at build time by scripts/postbuild.mjs.
export function PageMeta({ meta }: { meta: Meta }) {
  const { title, description, summary = description, noIndex = false } = meta;
  const url = meta.path === "/" || meta.path === "/404" ? `${profile.website}/` : `${profile.website}${meta.path}/`;
  useEffect(() => {
    document.title = title;
    const tags = [
      ["name", "description", description],
      ["name", "robots", noIndex ? "noindex, follow" : "index, follow"],
      ["property", "og:title", title],
      ["property", "og:description", summary],
      ["property", "og:url", url],
      ["name", "twitter:title", title],
      ["name", "twitter:description", summary],
    ];
    // Update the build's existing head tags instead of creating duplicate
    // descriptions and canonical URLs during client-side navigation.
    for (const [attribute, name, content] of tags) {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.append(tag);
      }
      tag.content = content;
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, summary, url, noIndex]);
  return null;
}
