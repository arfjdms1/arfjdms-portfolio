import type { ReactNode } from "react";
import type { Chunk, Exhibit } from "@/data/exhibits";

// A figure in its own column with a caption under it. Media never sits under
// type in this site's grammar.

const hexOffset = (n: number) => `0x${n.toString(16).padStart(4, "0")}`;

// Image Viewer's file, drawn to scale: every chunk's share of the bytes.
function ChunkMap({ chunks, fileSize }: { chunks: Chunk[]; fileSize: number }) {
  return (
    <div className="chunks">
      <div className="chunks__bar" role="img" aria-label={`Byte map of a ${fileSize.toLocaleString("en-US")} byte PNG: two IDAT chunks fill almost all of it.`}>
        {chunks.map((chunk) => (
          <span
            key={chunk.offset}
            className={`chunks__seg chunks__seg--${chunk.type === "IDAT" ? "data" : "meta"}`}
            style={{ flexGrow: chunk.total }}
            title={`${chunk.type} at ${hexOffset(chunk.offset)}, ${chunk.total} bytes`}
          >
            {chunk.type === "IDAT" ? (
              <span className="chunks__inline">
                IDAT <b>{chunk.data.toLocaleString("en-US")}</b>
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <p className="chunks__axis">
        <span>{hexOffset(0)}</span>
        <span>
          signature, IHDR, sBIT, pHYs <b>{chunks.slice(0, 4).reduce((n, c) => n + c.total, 0)} B</b>
        </span>
        <span>
          IEND <b>{hexOffset(fileSize)}</b>
        </span>
      </p>
    </div>
  );
}

// Numbers and chunk names in program output get emphasis; the words stay quiet.
function markOutput(text: string): ReactNode[] {
  return text.split(/(\b(?:IHDR|IDAT|sBIT|pHYs|IEND)\b|\b\d+\b)/).map((part, i) =>
    i % 2 === 1 ? (
      /\d/.test(part) ? <b key={i}>{part}</b> : <em key={i}>{part}</em>
    ) : (
      part
    ),
  );
}

// A small Kotlin highlighter: enough for the lines quoted on this site.
const KOTLIN = /(\/\/.*$)|\b(val|var|fun|if|for|in|until)\b|\b(and|or|shl|shr|xor)\b|(\b0x[0-9A-Fa-f]+\b|\b\d+\b)|\b([A-Za-z_]\w*)(?=\()/g;
function markKotlin(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of line.matchAll(KOTLIN)) {
    const at = match.index ?? 0;
    if (at > last) out.push(line.slice(last, at));
    const [token, comment, keyword, infix, number] = match;
    const cls = comment ? "tk-c" : keyword ? "tk-k" : infix ? "tk-i" : number ? "tk-n" : "tk-f";
    out.push(
      <span key={at} className={cls}>
        {token}
      </span>,
    );
    last = at + token.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export function Plate({
  exhibit,
  figure,
  reveal,
  runsBelow = false,
}: {
  exhibit: Exhibit;
  figure: number;
  reveal?: "up" | "left";
  /** On the home page, point from the quoted code to the chapter that runs it. */
  runsBelow?: boolean;
}) {
  const revealProps = reveal
    ? { "data-sc-reveal": reveal, "data-sc-reveal-at": "0.06 0.38" }
    : {};
  return (
    <figure className={`plate plate--${exhibit.kind}`}>
      <div className="plate__frame" {...revealProps}>
        <div className="plate__head">
          <span className="plate__label">{exhibit.label}</span>
          <span className="plate__meta">{exhibit.meta}</span>
        </div>
        {exhibit.kind === "image" ? (
          <img
            src={exhibit.src}
            width={exhibit.width}
            height={exhibit.height}
            alt={exhibit.alt}
            loading="lazy"
            decoding="async"
          />
        ) : exhibit.kind === "output" ? (
          <div className="plate__body">
            <ChunkMap chunks={exhibit.chunks} fileSize={exhibit.fileSize} />
            <pre className="plate__text" tabIndex={0} aria-label="Program output">
              <code>{markOutput(exhibit.text)}</code>
            </pre>
          </div>
        ) : (
          <pre className="plate__text plate__code" tabIndex={0} aria-label="Kotlin source">
            <code>
              {exhibit.lines.map((line, index) => {
                const number = exhibit.firstLine + index;
                return (
                  <span
                    className={number === exhibit.focusLine ? "plate__line is-focus" : "plate__line"}
                    key={index}
                  >
                    <span className="plate__ln" aria-hidden="true">
                      {number}
                    </span>
                    {line ? markKotlin(line) : " "}
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </div>
      <figcaption>
        <span className="plate__fig">Fig. {figure}</span> {exhibit.caption}
        {exhibit.kind === "code" ? (
          <>
            {" "}
            <a href={exhibit.href} target="_blank" rel="noopener noreferrer">
              View on GitHub<span aria-hidden="true"> ↗</span>
            </a>
          </>
        ) : null}
        {runsBelow ? (
          <span className="plate__runs">
            The next chapter runs these lines on your screen.{" "}
            <a href="#underneath">
              Watch it run<span aria-hidden="true"> ↓</span>
            </a>
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
