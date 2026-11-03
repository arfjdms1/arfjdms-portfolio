import { useEffect, useRef } from "react";
import { SAMPLE_SKIN } from "@/data/sampleSkin";

// Chapter II, the site's signature move. Scroll runs EaglerXSkinBridge's
// ABGR8 -> ARGB conversion loop over a sample skin, one pixel at a time, and
// the act's progress (--sc-p, published by scroll-craft) is the decode cursor.
// When the texture is complete, its front faces lift off and assemble into the
// figure they belong to.

const W = SAMPLE_SKIN.width;
const H = SAMPLE_SKIN.height;
const PIXELS = W * H;
const BYTES_PER_ROW = 8; // two pixels per hex row
const HEX_ROWS = 22;
const HEX_CURSOR_ROW = 9;
const DECODE_FROM = 0.08; // the wall holds still until here: authored silence
const DECODE_TO = 0.74;
const ASSEMBLE_FROM = 0.78;
const ASSEMBLE_TO = 0.95;

// Front faces in the classic 64x64 layout, and where each one stands in a
// 16x32 front view. [label, atlas x, atlas y, w, h, figure x, figure y]
const PARTS = [
  ["Right leg", 4, 20, 4, 12, 4, 20],
  ["Left leg", 20, 52, 4, 12, 8, 20],
  ["Right arm", 44, 20, 4, 12, 0, 8],
  ["Left arm", 36, 52, 4, 12, 12, 8],
  ["Body", 20, 20, 8, 12, 4, 8],
  ["Head", 8, 8, 8, 8, 4, 0],
  ["Hood", 40, 8, 8, 8, 4, 0],
] as const;
// The assembled figure, in atlas units, centred in the same 64x64 frame.
const FIGURE = { x: 18, y: 3.5, scale: 1.75 };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
const hex2 = (n: number) => n.toString(16).padStart(2, "0");

function fromBase64(data: string) {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
const BYTES = fromBase64(SAMPLE_SKIN.base64);

// SkinConversionAgent.generatePNGBytes, lines 344 to 363, in JavaScript.
// Kotlin's `and 0xFF` / `shl` / `or` become & / << / |, and >>> 0 keeps the
// packed value unsigned the way a Java int prints in hex. Runs over pixel
// indices [from, to) so scroll can advance it a little at a time.
function convertABGR8(
  decodedBytes: Uint8Array,
  from: number,
  to: number,
  setRGB: (x: number, y: number, argb: number) => void,
) {
  let byteIndex = from * 4;
  for (let y = Math.floor(from / W); y < H; y++) {
    for (let x = y === Math.floor(from / W) ? from % W : 0; x < W; x++) {
      if (y * W + x >= to) return;
      if (byteIndex + 3 < decodedBytes.length) {
        // ABGR8 format: Alpha, Blue, Green, Red (each 8 bits)
        const a = decodedBytes[byteIndex] & 0xff;
        const b = decodedBytes[byteIndex + 1] & 0xff;
        const g = decodedBytes[byteIndex + 2] & 0xff;
        const r = decodedBytes[byteIndex + 3] & 0xff;

        // Convert to ARGB format for BufferedImage
        const argb = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;

        setRGB(x, y, argb);
        byteIndex += 4;
      }
    }
  }
}

export function SkinDecode() {
  const actRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const act = actRef.current;
    if (!act) return;
    const q = <T extends Element>(selector: string) => act.querySelector<T>(selector)!;
    const stage = q<HTMLElement>(".decode");
    const canvas = q<HTMLCanvasElement>(".decode__atlas");
    const cursor = q<HTMLElement>(".decode__cursor");
    const frame = q<HTMLElement>(".decode__frame");
    const rows = [...act.querySelectorAll<HTMLElement>(".decode__hex li")];
    const parts = [...act.querySelectorAll<HTMLElement>(".decode__part")];
    const out = {
      xy: q<HTMLElement>("[data-out='xy']"),
      a: q<HTMLElement>("[data-out='a']"),
      b: q<HTMLElement>("[data-out='b']"),
      g: q<HTMLElement>("[data-out='g']"),
      r: q<HTMLElement>("[data-out='r']"),
      argb: q<HTMLElement>("[data-out='argb']"),
      swatch: q<HTMLElement>("[data-out='swatch']"),
      read: q<HTMLElement>("[data-out='read']"),
      png: q<HTMLElement>("[data-out='png']"),
      meter: q<HTMLElement>("[data-out='meter']"),
    };
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bytes = BYTES;
    const shown = ctx.createImageData(W, H);
    const write = (img: ImageData) => (x: number, y: number, argb: number) => {
      const i = (y * W + x) * 4;
      img.data[i] = (argb >>> 16) & 0xff;
      img.data[i + 1] = (argb >>> 8) & 0xff;
      img.data[i + 2] = argb & 0xff;
      img.data[i + 3] = (argb >>> 24) & 0xff;
    };
    const writeShown = write(shown);

    // The finished texture, decoded by the same loop, is what the parts carry.
    const whole = document.createElement("canvas");
    whole.width = W;
    whole.height = H;
    const wholeCtx = whole.getContext("2d");
    if (wholeCtx) {
      const img = wholeCtx.createImageData(W, H);
      convertABGR8(bytes, 0, PIXELS, write(img));
      wholeCtx.putImageData(img, 0, 0);
      const url = whole.toDataURL("image/png");
      for (const part of parts) part.style.backgroundImage = `url(${url})`;
      whole.toBlob((blob) => {
        if (blob) out.png.textContent = blob.size.toLocaleString("en-US");
      }, "image/png");
    }

    // Each part flies from its patch of the atlas to its place in the figure.
    parts.forEach((part, i) => {
      const [, ax, ay, w, h, fx, fy] = PARTS[i];
      part.style.left = `${(ax / W) * 100}%`;
      part.style.top = `${(ay / H) * 100}%`;
      part.style.width = `${(w / W) * 100}%`;
      part.style.height = `${(h / H) * 100}%`;
      part.style.setProperty("--ax", String(ax));
      part.style.setProperty("--ay", String(ay));
      part.style.setProperty("--dx", String(FIGURE.x + fx * FIGURE.scale - ax));
      part.style.setProperty("--dy", String(FIGURE.y + fy * FIGURE.scale - ay));
      part.style.setProperty("--s", String(FIGURE.scale));
    });
    const sizeUnit = () => frame.style.setProperty("--u", `${frame.clientWidth / W}px`);
    sizeUnit();
    const resize = new ResizeObserver(sizeUnit);
    resize.observe(frame);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let decoded = 0;
    let hexKey = "";

    function renderHex(cursorByte: number, active: boolean) {
      const totalRows = bytes.length / BYTES_PER_ROW;
      const row = Math.floor(cursorByte / BYTES_PER_ROW);
      const start = Math.min(Math.max(row - HEX_CURSOR_ROW, 0), totalRows - HEX_ROWS);
      const key = `${start}:${active ? cursorByte : -1}`;
      if (key === hexKey) return;
      hexKey = key;
      rows.forEach((li, k) => {
        const offset = (start + k) * BYTES_PER_ROW;
        let html = `<span class="hx-off">${offset.toString(16).padStart(4, "0")}</span>`;
        for (let j = 0; j < BYTES_PER_ROW; j++) {
          const at = offset + j;
          const lane = at - cursorByte;
          const cls = !active
            ? ""
            : lane >= 0 && lane < 4
              ? ` hx-cur hx-${"abgr"[lane]}`
              : at < cursorByte
                ? " hx-done"
                : "";
          html += `<span class="hx${cls}">${hex2(bytes[at])}</span>`;
        }
        li.innerHTML = html;
      });
    }

    function render(p: number) {
      const d = clamp01((p - DECODE_FROM) / (DECODE_TO - DECODE_FROM));
      const target = Math.round(d * PIXELS);
      if (target > decoded) {
        convertABGR8(bytes, decoded, target, writeShown);
      } else if (target < decoded) {
        shown.data.fill(0, target * 4, decoded * 4); // scrolling back un-decodes
      }
      decoded = target;
      ctx!.putImageData(shown, 0, 0);

      const active = d > 0 && d < 1;
      const pixel = Math.min(target, PIXELS - 1);
      const x = pixel % W;
      const y = Math.floor(pixel / W);
      const at = pixel * 4;
      cursor.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
      cursor.style.opacity = active ? "1" : "0";
      renderHex(at, active);

      const [a, b, g, r] = [bytes[at], bytes[at + 1], bytes[at + 2], bytes[at + 3]];
      out.xy.textContent = `x ${x}, y ${y}`;
      out.a.textContent = hex2(a);
      out.b.textContent = hex2(b);
      out.g.textContent = hex2(g);
      out.r.textContent = hex2(r);
      out.argb.textContent = `0x${(((a << 24) | (r << 16) | (g << 8) | b) >>> 0).toString(16).padStart(8, "0")}`;
      out.swatch.style.background = `rgb(${r} ${g} ${b} / ${(a / 255).toFixed(3)})`;
      out.read.textContent = (target * 4).toLocaleString("en-US");
      out.meter.style.transform = `scaleX(${d.toFixed(4)})`;

      const t = clamp01((p - ASSEMBLE_FROM) / (ASSEMBLE_TO - ASSEMBLE_FROM));
      canvas.style.opacity = (1 - 0.8 * smooth(t)).toFixed(3);
      stage.style.setProperty("--asm", smooth(t).toFixed(3));
      parts.forEach((part, i) => {
        const ti = smooth(clamp01((t - i * 0.08) / 0.52));
        if (reduce.matches) {
          // Fewer and gentler: no flight, the figure fades up in place.
          part.style.setProperty("--t", "1");
          part.style.opacity = ti.toFixed(3);
        } else {
          part.style.setProperty("--t", ti.toFixed(4));
          part.style.opacity = t > 0 ? "1" : "0";
        }
      });

      stage.dataset.phase = t >= 1 ? "figure" : d >= 1 ? "texture" : active ? "decoding" : "bytes";
      // Lets the verification harness see the bespoke stage's real state.
      stage.dataset.scVerifyState = `${target}:${Math.round(t * 24)}`;
    }

    let raf = 0;
    let visible = false;
    let lastP = -1;
    const tick = () => {
      raf = 0;
      const p = parseFloat(act.style.getPropertyValue("--sc-p")) || 0;
      if (p !== lastP) {
        lastP = p;
        render(p);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    render(0);
    // The canvas and readout take over from the prerendered still (see CSS).
    stage.dataset.live = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(act);
    const onMotion = () => {
      lastP = -1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    reduce.addEventListener("change", onMotion);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      resize.disconnect();
      reduce.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <section
      ref={actRef}
      className="ch ch--underneath"
      id="underneath"
      data-sc-act="pin"
      data-sc-span="2.1"
      data-folio="II  Underneath"
      aria-labelledby="underneath-title"
    >
      <div data-sc-stage className="decode" data-phase="bytes" data-sc-verify-state="0:0">
        <header className="decode__copy">
          <p className="ch__num" aria-hidden="true">
            II
          </p>
          <h2 id="underneath-title" className="decode__title">
            <span>16,384 bytes in.</span> <span>One skin out.</span>
          </h2>
          <p className="decode__lede">
            An EaglercraftX client sends a player’s skin as raw ABGR8 bytes. Java Edition
            only takes a PNG. EaglerXSkinBridge converts one into the other, and this is its
            loop, ported line for line, running on a sample skin.
          </p>
          <p className="visually-hidden">
            As the page scrolls, the bytes on the left are read four at a time, repacked
            from ABGR to ARGB, and painted into a 64 by 64 texture. The finished texture
            is a hooded figure with ember eyes and drawstrings, and its front faces then
            assemble into the standing figure.
          </p>
        </header>

        {/* Prerendered with the first rows of the real bytes; the script then
            scrolls this window along with the decode cursor. */}
        <ol className="decode__hex" aria-hidden="true">
          {Array.from({ length: HEX_ROWS }, (_, i) => (
            <li key={i}>
              <span className="hx-off">{(i * BYTES_PER_ROW).toString(16).padStart(4, "0")}</span>
              {Array.from(BYTES.subarray(i * BYTES_PER_ROW, (i + 1) * BYTES_PER_ROW), (b, j) => (
                <span className="hx" key={j}>
                  {hex2(b)}
                </span>
              ))}
            </li>
          ))}
        </ol>

        <figure className="decode__figure">
          <div className="decode__frame">
            {/* The finished texture, for readers without JavaScript. */}
            <img className="decode__still" src="/skin/sample.png" width={W} height={H} alt="" />
            <canvas
              className="decode__atlas"
              width={W}
              height={H}
              role="img"
              aria-label="A 64 by 64 Minecraft skin texture, decoded from the bytes beside it."
            />
            <span className="decode__cursor" aria-hidden="true" />
            <div className="decode__parts" aria-hidden="true">
              {PARTS.map(([label]) => (
                <span className="decode__part" key={label} />
              ))}
            </div>
          </div>
          <figcaption className="decode__caption">
            Sample skin, 64 × 64, drawn for this page. Not a Mojang default.
          </figcaption>
        </figure>

        <div className="decode__readout" aria-hidden="true">
          <p className="decode__pixel">
            <span data-out="xy">x 0, y 0</span>
            <span className="decode__lanes">
              <span className="lane lane--a">a <b data-out="a">00</b></span>
              <span className="lane lane--b">b <b data-out="b">00</b></span>
              <span className="lane lane--g">g <b data-out="g">00</b></span>
              <span className="lane lane--r">r <b data-out="r">00</b></span>
            </span>
          </p>
          <p className="decode__formula">
            <code>(a shl 24) or (r shl 16) or (g shl 8) or b</code>
            <span className="decode__result">
              = <b data-out="argb">0x00000000</b>
              <span className="decode__swatch" data-out="swatch" />
            </span>
          </p>
          <p className="decode__count">
            <span>
              <b data-out="read">0</b> of 16,384 bytes read
            </span>
            <span className="decode__meter">
              <span data-out="meter" />
            </span>
          </p>
          <p className="decode__png">
            Your browser just encoded it as a <b data-out="png">…</b> byte PNG. The plugin
            sends its own to MineSkin next, to be signed.
          </p>
        </div>
      </div>
    </section>
  );
}
