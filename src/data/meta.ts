// Titles and descriptions for every page, in one place. The pages set them at
// runtime through <PageMeta>, and scripts/postbuild.mjs writes the same values
// into each prerendered HTML file, so crawlers and link previews see them
// without running JavaScript.
export type Meta = {
  path: string;
  title: string;
  /** <meta name="description"> */
  description: string;
  /** og:description and twitter:description; defaults to `description`. */
  summary?: string;
  noIndex?: boolean;
};

export const pageMeta = {
  home: {
    path: "/",
    title: "Aarav Khemka (arfjdms), developer and builder",
    description:
      "Aarav Khemka builds software, inference infrastructure and open-source tools. Explore The Guild Inference Project, native C++ projects, and Minecraft tooling.",
    summary:
      "Software, inference infrastructure and open-source tools. Currently building The Guild Inference Project: open inference systems for the hardware people already own.",
  },
  work: {
    path: "/projects",
    title: "Work, by Aarav Khemka (arfjdms)",
    description:
      "The Guild Inference Project, open inference systems and efficient-model research; Image Viewer in C++20; and EaglerXSkinBridge for Minecraft.",
  },
  about: {
    path: "/about",
    title: "About Aarav Khemka (arfjdms)",
    description:
      "Meet Aarav Khemka, the developer behind arfjdms. Building The Guild Inference Project, native applications, and open-source Minecraft tools.",
  },
  notFound: {
    path: "/404",
    title: "Page not found, arfjdms",
    description: "This page could not be found. Explore Aarav Khemka’s portfolio and projects.",
    noIndex: true,
  },
} satisfies Record<string, Meta>;
