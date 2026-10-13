import { useEffect } from "react";
import { profile } from "@/data/projects";

export function PageMeta({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}) {
  const url = `${profile.website}${path}/`;
  useEffect(() => {
    document.title = title;
    const metadata = [
      ["name", "description", description],
      ["name", "robots", noIndex ? "noindex, follow" : "index, follow"],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];
    // Update the build's existing head tags instead of creating duplicate
    // descriptions and canonical URLs during client-side navigation.
    for (const [attribute, name, content] of metadata) {
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${name}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.append(tag);
      }
      tag.content = content;
    }
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = url;
  }, [title, description, url, noIndex]);
  return null;
}
