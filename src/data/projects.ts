export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  type: "business" | "open-source";
  url: string;
  github?: string;
  tech: string[];
  stats: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "open-ember",
    title: "Open Ember",
    tagline: "Premium Game Server Hosting",
    description:
      "Minecraft-first game hosting built on enterprise Intel Xeon Gold 6130 hardware with 400 GB RAM on-node and a custom panel, not generic Pterodactyl.",
    longDescription:
      "Open Ember is a premium game server hosting platform designed from the ground up for performance. Running on Intel Xeon Gold 6130 processors with NVMe storage and 400 GB of on-node memory, we deliver consistent 20 TPS even under heavy modded loads. Our custom panel replaces the generic Pterodactyl interface with a purpose-built experience featuring file management, automated backups, scheduling, subuser permissions, subdomain connections, and one-click modpack installs. With transparent RAM and CPU limits, per-node server caps to prevent overselling, and baseline DDoS protection on every plan, Open Ember sets a new standard.",
    type: "business",
    url: "https://openember.host",
    tech: ["Minecraft", "Infrastructure", "Panel", "DDoS Protection", "NVMe Storage", "Docker"],
    stats: [
      { label: "Starting at", value: "$4.99/mo" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "CPU", value: "Xeon Gold 6130" },
      { label: "RAM", value: "400 GB" },
    ],
  },
  {
    slug: "image-viewer",
    title: "Image Viewer",
    tagline: "Native C++20 Image Rendering",
    description:
      "A lightweight C++20 image viewer built with CMake, using modern byte-shift operations for fast, dependency-free native image rendering.",
    longDescription:
      "Image Viewer is a native C++20 application that renders images through direct pixel buffer manipulation. Built using modern CMake and leveraging C++20 byte-shift operations for efficient color channel processing, it provides a minimal, dependency-light approach to image viewing. The project demonstrates low-level graphics programming, memory-safe pixel buffer management, and cross-platform build system configuration.",
    type: "open-source",
    url: "https://github.com/arfjdms1/Image-Viewer",
    github: "https://github.com/arfjdms1/Image-Viewer",
    tech: ["C++20", "CMake", "Native Graphics", "Byte-Shift Ops", "Cross-Platform"],
    stats: [
      { label: "Language", value: "C++" },
      { label: "Standard", value: "C++20" },
      { label: "Build System", value: "CMake" },
      { label: "License", value: "MIT" },
    ],
  },
  {
    slug: "eaglerx-skinbridge",
    title: "EaglerXSkinBridge",
    tagline: "Eaglercraft ↔ Java Skin Sync",
    description:
      "A Velocity proxy plugin that bridges EaglercraftX custom skins to Java Edition via MineSkin API. First-of-its-kind, zero-database, async architecture.",
    longDescription:
      "EaglerXSkinBridge is the first-of-its-kind Velocity proxy plugin that seamlessly synchronizes EaglercraftX custom skins to Java Edition players. Using a direct-hook architecture, it intercepts EaglercraftRegisterSkinEvent, extracts raw ABGR8 pixel data, mathematically reconstructs valid PNGs, uploads them to MineSkin for official Mojang cryptographic signatures, and injects them into SkinsRestorer v15. Features include two-way sync, zero-main-thread async processing, in-memory caching, and full support for all 24 Eaglercraft preset skins with pre-signed payloads to bypass API rate limits.",
    type: "open-source",
    url: "https://github.com/arfjdms1/EaglerXSkinBridge",
    github: "https://github.com/arfjdms1/EaglerXSkinBridge",
    tech: ["Java/Kotlin", "Velocity API", "SkinsRestorer", "EaglercraftX", "MineSkin API", "Async IO"],
    stats: [
      { label: "Language", value: "Kotlin/Java" },
      { label: "Platform", value: "Velocity 3.3+" },
      { label: "License", value: "MIT" },
      { label: "Commits", value: "16" },
    ],
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Tailwind CSS",
  "C++",
  "Java",
  "Kotlin",
  "Python",
  "CMake",
  "Docker",
  "Linux",
  "Minecraft Dev",
  "Game Hosting",
  "Velocity API",
  "Node.js",
];
