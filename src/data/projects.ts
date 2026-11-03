export const profile = {
  name: "Aarav Khemka",
  handle: "arfjdms",
  email: "aaravkhemka9@gmail.com",
  github: "https://github.com/arfjdms1",
  website: "https://arfjdms.me",
};

export interface Project {
  /** Also the anchor on /projects. "illatio" is kept so old links still land. */
  slug: "illatio" | "image-viewer" | "eaglerx-skinbridge";
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: string;
  /** The first link is the primary one. */
  links: { label: string; href: string }[];
  linkNote?: string;
  tech: string[];
  highlights: { title: string; description: string }[];
}

// Facts and wording for The Guild Inference Project come from illatio.dev and
// guild.illatio.dev (read 2 November 2026). The stack is the primary language
// of each repository in github.com/guild-inference: Guild, guild-kernels-cpu
// and guild-runners-qwen are C++, guild-kernels-cuda is CUDA.
export const projects: Project[] = [
  {
    slug: "illatio",
    title: "The Guild Inference Project",
    category: "Inference systems & research",
    tagline: "Intelligence, within reach.",
    description:
      "Open inference systems and efficient-model research, built around the hardware people already own. Its engine, Guild, runs Mixture-of-Experts models across GPU memory, system RAM and CPU threads.",
    longDescription:
      "The Guild Inference Project is the umbrella for three parts. Guild Engine is an open-source native inference engine for Mixture-of-Experts models: it plans where every expert lives, across GPU memory, system RAM and mapped files, around the machine it finds. Guild Labs is research into efficient models. Guild Cloud is a planned hosted platform; nothing is hosted yet.",
    status: "Under development. Guild Engine is open source (MIT)",
    links: [
      { label: "illatio.dev", href: "https://illatio.dev" },
      { label: "GitHub", href: "https://github.com/guild-inference" },
    ],
    tech: ["C++", "CUDA"],
    highlights: [
      {
        title: "Guild Engine",
        description:
          "Open source under MIT and available today. A native engine that serves Mixture-of-Experts models through an OpenAI-compatible endpoint on your own machine.",
      },
      {
        title: "Guild Labs",
        description:
          "Research into efficient models: sparse architectures, ternary weights, and models designed for the machine that runs them.",
      },
      {
        title: "Guild Cloud",
        description:
          "A planned hosted platform with the same interface you can run at home. In development; nothing is hosted yet.",
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
    status: "Open source",
    links: [{ label: "GitHub", href: "https://github.com/arfjdms1/Image-Viewer" }],
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
    status: "Open source",
    links: [{ label: "GitHub", href: "https://github.com/arfjdms1/EaglerXSkinBridge" }],
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
