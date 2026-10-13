export const profile = {
  name: "Aarav Khemka",
  handle: "arfjdms",
  email: "aaravkhemka9@gmail.com",
  github: "https://github.com/arfjdms1",
  website: "https://arfjdms.me",
};

export interface Project {
  slug: "illatio" | "image-viewer" | "eaglerx-skinbridge";
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  type: "in-development" | "open-source";
  url: string;
  linkNote?: string;
  tech: string[];
  highlights: { title: string; description: string }[];
}

export const projects: Project[] = [
  {
    slug: "illatio",
    title: "Illatio",
    category: "AI & infrastructure",
    tagline: "Your hardware. A shared inference platform.",
    description:
      "A self-hosted inference platform connecting heterogeneous hardware, model routing, and an operator console. Built to make the whole system understandable.",
    longDescription:
      "Illatio brings model serving and cluster operations together. A Go manager routes inference requests to compatible nodes, a CLI handles administration, and a Next.js console makes cluster health, scheduling, and request telemetry visible. Currently in development and release-candidate testing.",
    type: "in-development",
    url: "https://illatio.dev",
    linkNote: "illatio.dev may not be live yet.",
    tech: ["Go", "Next.js", "TypeScript", "llama.cpp", "SQLite"],
    highlights: [
      {
        title: "Heterogeneous inference",
        description:
          "Whole-request routing to compatible nodes, with a llama.cpp runtime adapter.",
      },
      {
        title: "Operator visibility",
        description:
          "Cluster health, request accounting, fair scheduling, and live operational events.",
      },
      {
        title: "A complete toolchain",
        description:
          "A Go manager and CLI alongside a Next.js console for inspection and diagnostics.",
      },
    ],
  },
  {
    slug: "image-viewer",
    title: "Image Viewer",
    category: "Native software",
    tagline: "Pixels. Performance. C++.",
    description:
      "A lightweight native image viewer exploring direct pixel rendering and modern C++20, with a minimal dependency footprint.",
    longDescription:
      "An exploration of what happens underneath an image viewer. Written in C++20 and built with CMake, this project works directly with pixel buffers and color channels instead of relying on a heavyweight graphics stack.",
    type: "open-source",
    url: "https://github.com/arfjdms1/Image-Viewer",
    tech: ["C++20", "CMake", "Native graphics"],
    highlights: [
      {
        title: "Direct pixel rendering",
        description:
          "Low-level image rendering through pixel buffer manipulation.",
      },
      {
        title: "Modern C++",
        description:
          "C++20 byte-shift operations for processing image color channels.",
      },
      {
        title: "Small by design",
        description:
          "A minimal approach to image viewing with a CMake-based build.",
      },
    ],
  },
  {
    slug: "eaglerx-skinbridge",
    title: "EaglerXSkinBridge",
    category: "Minecraft tooling",
    tagline: "Different clients. Same identity.",
    description:
      "A Velocity plugin connecting EaglercraftX custom skins with Java Edition. One bridge across two Minecraft ecosystems.",
    longDescription:
      "EaglerXSkinBridge connects the EaglercraftX and Java Edition skin systems. The plugin reconstructs PNGs from raw skin data, obtains signed textures through MineSkin, and integrates with SkinsRestorer using an asynchronous workflow.",
    type: "open-source",
    url: "https://github.com/arfjdms1/EaglerXSkinBridge",
    tech: ["Java / Kotlin", "Velocity", "MineSkin", "SkinsRestorer"],
    highlights: [
      {
        title: "Skin synchronization",
        description:
          "A bridge between EaglercraftX custom skins and Java Edition players.",
      },
      {
        title: "Asynchronous workflow",
        description:
          "Skin processing and API calls run away from the main thread.",
      },
      {
        title: "No database required",
        description:
          "In-memory caching and pre-signed preset skins keep the architecture focused.",
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Interfaces & web",
    icon: "code" as const,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Systems & infrastructure",
    icon: "server" as const,
    skills: ["Go", "C++", "CMake", "Python", "Linux", "Docker"],
  },
  {
    title: "Minecraft & tooling",
    icon: "layers" as const,
    skills: ["Java", "Kotlin", "Velocity API", "Minecraft Dev", "Game Hosting"],
  },
];
