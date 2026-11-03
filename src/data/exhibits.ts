import type { Project } from "@/data/projects";

// Real artifacts only. Each one says where it came from, and the page prints
// that as the figure caption. `label` and `meta` head the plate itself.
type Common = { label: string; meta: string; caption: string };

export type Chunk = { type: string; offset: number; data: number; total: number };

export type Exhibit = Common &
  (
    | {
        kind: "image";
        src: string;
        width: number;
        height: number;
        alt: string;
      }
    | {
        kind: "output";
        text: string;
        fileSize: number;
        chunks: Chunk[];
      }
    | {
        kind: "code";
        firstLine: number;
        lines: string[];
        focusLine: number;
        href: string;
      }
  );

// stdout of arfjdms1/Image-Viewer@2b2d021, source/main.cpp, built with
// `g++ -std=c++23 -static` and run on the repository's own image1.png. The only
// change was the hard-coded /home/ubuntu/... path, pointed at that file.
const imageViewerOutput = `Verifying Image: Image Verified
Length: 13
Chunk Type: IHDR
Width: 512
Height: 512

Metadata:
  - Found & Skipped Chunk: sBIT (4 bytes)
  - Found & Skipped Chunk: pHYs (9 bytes)
  - Gathering IDAT chunk (8192 bytes)
  - Gathering IDAT chunk (6813 bytes)

Got 15005 bytes of data.`;

// The same image1.png, read chunk by chunk (offset, data length, and length
// with its 12 bytes of length, type and CRC). The totals add up to the file.
const imageViewerChunks: Chunk[] = [
  { type: "signature", offset: 0, data: 8, total: 8 },
  { type: "IHDR", offset: 8, data: 13, total: 25 },
  { type: "sBIT", offset: 33, data: 4, total: 16 },
  { type: "pHYs", offset: 49, data: 9, total: 21 },
  { type: "IDAT", offset: 70, data: 8192, total: 8204 },
  { type: "IDAT", offset: 8274, data: 6813, total: 6825 },
  { type: "IEND", offset: 15099, data: 0, total: 12 },
];

// arfjdms1/EaglerXSkinBridge@a0de091,
// src/main/kotlin/mc/arch/skin/bridge/SkinConversionAgent.kt, lines 350 to 360:
// the body of generatePNGBytes's per-pixel loop.
const skinLoop = [
  "// ABGR8 format: Alpha, Blue, Green, Red (each 8 bits)",
  "val a = decodedBytes[byteIndex].toInt() and 0xFF",
  "val b = decodedBytes[byteIndex + 1].toInt() and 0xFF",
  "val g = decodedBytes[byteIndex + 2].toInt() and 0xFF",
  "val r = decodedBytes[byteIndex + 3].toInt() and 0xFF",
  "",
  "// Convert to ARGB format for BufferedImage",
  "val argb = (a shl 24) or (r shl 16) or (g shl 8) or b",
  "",
  "image.setRGB(x, y, argb)",
  "byteIndex += 4",
];

export const exhibits: Record<Project["slug"], Exhibit> = {
  illatio: {
    kind: "image",
    label: "illatio.dev",
    meta: "live site",
    src: "/shots/illatio-home.webp",
    width: 1440,
    height: 900,
    alt: "The illatio.dev home page. The headline reads “Intelligence, within reach.” beside a diagram linking Guild Core to Guild Engine, Guild Labs and Guild Cloud.",
    caption: "illatio.dev, captured on 2 November 2026.",
  },
  "image-viewer": {
    kind: "output",
    label: "image1.png",
    meta: "15,111 bytes",
    text: imageViewerOutput,
    fileSize: 15111,
    chunks: imageViewerChunks,
    caption:
      "The repository’s image1.png, chunk by chunk, and what main.cpp prints walking it. Real output, run on 2 November 2026.",
  },
  "eaglerx-skinbridge": {
    kind: "code",
    label: "SkinConversionAgent.kt",
    meta: "Kotlin",
    firstLine: 350,
    lines: skinLoop,
    focusLine: 357,
    caption: "Lines 350 to 360, inside its loop over every pixel.",
    href: "https://github.com/arfjdms1/EaglerXSkinBridge/blob/a0de09150aab28769344da236766d80e6a35e34c/src/main/kotlin/mc/arch/skin/bridge/SkinConversionAgent.kt#L350-L360",
  },
};
