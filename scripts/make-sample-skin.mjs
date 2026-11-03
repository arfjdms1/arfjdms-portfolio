// Draws the sample skin used by the home page and writes it two ways:
//
//   src/data/sampleSkin.ts   raw ABGR8 bytes, base64 encoded, the way an
//                            EaglercraftX client sends a skin. The
//                            "Underneath" chapter decodes these.
//   public/skin/sample.png   the same texture as an ordinary RGBA PNG, which
//                            the title page's 3D figure is textured with.
//
//   node scripts/make-sample-skin.mjs              write both
//   node scripts/make-sample-skin.mjs preview.png  also write an 8x preview
//
// The skin is original pixel art made for this site, not a Mojang default.
import { mkdirSync, writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { dirname, resolve } from "node:path";

const W = 64;
const H = 64;
const rgba = new Uint8ClampedArray(W * H * 4); // starts fully transparent

const hex = (value) => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];
function put(x, y, color) {
  const [r, g, b] = hex(color);
  const i = (y * W + x) * 4;
  rgba[i] = r;
  rgba[i + 1] = g;
  rgba[i + 2] = b;
  rgba[i + 3] = 255;
}
function fill(x, y, w, h, color) {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(x + i, y + j, color);
}

// Deterministic grain so flat fabric reads as fabric.
let seed = 0x5eed;
const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32);
function cloth(x, y, w, h, base, dark, light) {
  for (let j = 0; j < h; j++)
    for (let i = 0; i < w; i++) {
      const n = rand();
      put(x + i, y + j, n < 0.16 ? dark : n > 0.88 ? light : base);
    }
}

// Faces of a box in the standard skin UV layout.
function faces(u, v, w, h, d) {
  return {
    top: [u + d, v, w, d],
    bottom: [u + d + w, v, w, d],
    right: [u, v + d, d, h],
    front: [u + d, v + d, w, h],
    left: [u + d + w, v + d, d, h],
    back: [u + d + w + d, v + d, w, h],
  };
}

const C = {
  hood: "#4a3d36",
  hoodDark: "#3a2f29",
  hoodLight: "#5c4c43",
  rim: "#6e5b4f",
  shadow: "#120e0c",
  ember: "#ff6b35",
  emberHot: "#ffc29e",
  emberDim: "#8f3818",
  pants: "#3b5683",
  pantsDark: "#2f466c",
  pantsLight: "#4a679a",
  shoe: "#1c1614",
  sole: "#e4dacd",
  glove: "#2b231f",
};

// Head: a shadowed face with two ember eyes. The hood itself is the hat layer.
const head = faces(0, 0, 8, 8, 8);
for (const key of ["top", "right", "left", "back"]) {
  const [x, y, w, h] = head[key];
  cloth(x, y, w, h, C.hood, C.hoodDark, C.hoodLight);
}
{
  const [x, y] = head.bottom;
  fill(x, y, 8, 8, C.shadow);
}
{
  const [x, y] = head.front;
  cloth(x, y, 8, 8, C.hood, C.hoodDark, C.hoodLight);
  fill(x + 1, y + 1, 6, 7, C.shadow);
  fill(x + 1, y + 1, 6, 1, "#221a16"); // brim shade
  put(x + 2, y + 3, C.emberDim);
  put(x + 5, y + 3, C.emberDim);
  put(x + 2, y + 4, C.ember);
  put(x + 5, y + 4, C.ember);
  put(x + 1, y + 4, "#3a1a0d"); // the eyes light the shadow a little
  put(x + 6, y + 4, "#3a1a0d");
}

// Hat layer: the hood, a shell around the head with an ember lining at the rim.
const hat = faces(32, 0, 8, 8, 8);
for (const key of ["top", "right", "left", "back"]) {
  const [x, y, w, h] = hat[key];
  cloth(x, y, w, h, C.hood, C.hoodDark, C.hoodLight);
}
{
  const [x, y, w, h] = hat.back;
  for (let j = 0; j < h; j++) put(x + 3, y + j, C.hoodDark); // seam
  fill(x, y + 7, w, 1, C.hoodDark);
}
{
  const [x, y] = hat.front;
  fill(x, y, 8, 1, C.rim);
  for (let j = 1; j < 8; j++) {
    put(x, y + j, C.rim);
    put(x + 7, y + j, C.rim);
  }
  for (let i = 1; i < 7; i++) put(x + i, y + 1, C.emberDim); // lining
}

// Body: hoodie with ember drawstrings and a kangaroo pocket.
const body = faces(16, 16, 8, 12, 4);
for (const key of ["top", "right", "left", "back", "front"]) {
  const [x, y, w, h] = body[key];
  cloth(x, y, w, h, C.hood, C.hoodDark, C.hoodLight);
}
{
  const [x, y] = body.bottom;
  fill(x, y, 8, 4, C.hoodDark);
}
{
  const [x, y] = body.front;
  fill(x + 2, y, 4, 1, C.shadow); // collar opening
  for (let j = 0; j < 4; j++) {
    put(x + 2, y + j, C.ember);
    put(x + 5, y + j, C.ember);
  }
  put(x + 2, y + 4, C.emberHot);
  put(x + 5, y + 4, C.emberHot);
  fill(x + 1, y + 7, 6, 1, C.hoodDark);
  fill(x + 1, y + 8, 6, 2, "#43372f");
  put(x, y + 8, C.hoodDark);
  put(x + 7, y + 8, C.hoodDark);
  fill(x, y + 10, 8, 2, C.hoodDark); // ribbed hem
  for (let i = 0; i < 8; i += 2) put(x + i, y + 11, "#2f2621");
}
{
  const [x, y] = body.back;
  fill(x, y + 10, 8, 2, C.hoodDark);
  fill(x + 1, y, 6, 3, C.hoodLight); // the hood, hanging
  fill(x + 2, y + 3, 4, 1, C.hoodLight);
}

// Arms: sleeves with an ember band, ribbed cuffs, gloves.
function arm(u, v) {
  const a = faces(u, v, 4, 12, 4);
  for (const key of ["top", "right", "left", "back", "front"]) {
    const [x, y, w, h] = a[key];
    cloth(x, y, w, h, C.hood, C.hoodDark, C.hoodLight);
    if (key !== "top") {
      fill(x, y + 5, w, 1, C.ember);
      fill(x, y + 9, w, 1, C.hoodDark);
      fill(x, y + 10, w, 2, C.glove);
    }
  }
  const [bx, by] = a.bottom;
  fill(bx, by, 4, 4, C.glove);
}
arm(40, 16);
arm(32, 48);

// Legs: indigo trousers, dark shoes with bone soles and an ember lace.
function leg(u, v, lace) {
  const l = faces(u, v, 4, 12, 4);
  for (const key of ["top", "right", "left", "back", "front"]) {
    const [x, y, w, h] = l[key];
    cloth(x, y, w, h, C.pants, C.pantsDark, C.pantsLight);
    if (key !== "top") {
      fill(x, y + 9, w, 2, C.shoe);
      fill(x, y + 11, w, 1, C.sole);
    }
  }
  const [fx, fy] = l.front;
  put(fx + lace, fy + 9, C.ember);
  const [bx, by] = l.bottom;
  fill(bx, by, 4, 4, C.sole);
}
leg(0, 16, 1);
leg(16, 48, 2);

// ----------------------------------------------------------------- PNG --
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const sum = Buffer.alloc(4);
  sum.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, sum]);
}
// Scaled with nearest-neighbour; `matte` composites transparency onto a checker.
function png(scale, matte) {
  const pw = W * scale;
  const ph = H * scale;
  const raw = Buffer.alloc((pw * 4 + 1) * ph);
  for (let y = 0; y < ph; y++) {
    raw[y * (pw * 4 + 1)] = 0;
    for (let x = 0; x < pw; x++) {
      const s = (Math.floor(y / scale) * W + Math.floor(x / scale)) * 4;
      const d = y * (pw * 4 + 1) + 1 + x * 4;
      if (matte) {
        const checker = ((x >> 4) + (y >> 4)) % 2 ? 60 : 44;
        const a = rgba[s + 3] / 255;
        for (let c = 0; c < 3; c++) raw[d + c] = rgba[s + c] * a + checker * (1 - a);
        raw[d + 3] = 255;
      } else {
        for (let c = 0; c < 4; c++) raw[d + c] = rgba[s + c];
      }
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(pw, 0);
  ihdr.writeUInt32BE(ph, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
function write(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
  console.log(`wrote ${path}`);
}

// EaglercraftX sends skins as ABGR8: alpha, blue, green, red per pixel.
const abgr = new Uint8Array(W * H * 4);
for (let p = 0; p < W * H; p++) {
  abgr[p * 4] = rgba[p * 4 + 3];
  abgr[p * 4 + 1] = rgba[p * 4 + 2];
  abgr[p * 4 + 2] = rgba[p * 4 + 1];
  abgr[p * 4 + 3] = rgba[p * 4];
}

write(
  resolve("src/data/sampleSkin.ts"),
  `// Generated by scripts/make-sample-skin.mjs. Do not edit by hand.
// An original 64x64 skin drawn for this site, stored the way an EaglercraftX
// client sends one: raw ABGR8 bytes (${abgr.length.toLocaleString("en-US")} of them), base64 encoded.
export const SAMPLE_SKIN = {
  width: ${W},
  height: ${H},
  base64:
    "${Buffer.from(abgr).toString("base64")}",
} as const;
`,
);
write(resolve("public/skin/sample.png"), png(1, false));
if (process.argv[2]) write(process.argv[2], png(8, true));
