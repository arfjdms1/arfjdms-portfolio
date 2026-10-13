import { useId } from "react";
import type { Project } from "@/data/projects";
import { RotatingSculpture } from "@/components/RotatingSculpture";

// Deterministic SVG geometry keeps the sculpture visible without a canvas renderer.
function torusPath(fixed: number, meridian: boolean) {
  return Array.from({ length: 65 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    const u = meridian ? fixed : angle;
    const v = meridian ? angle : fixed;
    const radius = 136 + 48 * Math.cos(v);
    const x = radius * Math.cos(u);
    const y = radius * Math.sin(u);
    const z = 48 * Math.sin(v);
    const rotatedY = y * 0.56 - z * 0.83;
    const rotatedZ = y * 0.83 + z * 0.56;
    const scale = 680 / (680 + rotatedZ);
    const px = (x * 0.91 - rotatedY * 0.41) * scale + 260;
    const py = (x * 0.41 + rotatedY * 0.91) * scale + 252;
    return `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ");
}

const latitudes = Array.from({ length: 22 }, (_, i) =>
  torusPath((i / 22) * Math.PI * 2, false),
);
const meridians = Array.from({ length: 40 }, (_, i) =>
  torusPath((i / 40) * Math.PI * 2, true),
);

export function OrbitalArtwork() {
  const id = useId();
  return (
    <div className="orbital-art" aria-hidden="true">
      <div className="scene-plane scene-plane-back" />
      <div className="scene-plane scene-plane-front">
        <div className="scene-toolbar">
          <span className="scene-window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>creative.engineering</span>
          <span>◈</span>
        </div>
        <div className="scene-reticle" />
        <div className="scene-scan" />
        <div className="scene-bottomline">
          <span>IDEA → INTERFACE → SYSTEM</span>
          <span>↗</span>
        </div>
      </div>
      <div className="orbital-glow" />
      <RotatingSculpture />
      <div className="orbit-track orbit-track-one">
        <span className="orbit-spark" />
      </div>
      <div className="orbit-track orbit-track-two">
        <span className="orbit-spark" />
      </div>
      <div className="orbit-track orbit-track-three">
        <span className="orbit-spark" />
      </div>
      <svg viewBox="0 0 520 520" className="orbital-svg" fill="none">
        <defs>
          <linearGradient
            id={id}
            x1="90"
            y1="100"
            x2="410"
            y2="420"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffca86" />
            <stop offset=".42" stopColor="#ff762e" />
            <stop offset="1" stopColor="#df3028" />
          </linearGradient>
        </defs>
        <circle
          cx="260"
          cy="260"
          r="228"
          stroke="#38332e"
          strokeWidth=".6"
          strokeDasharray="2 8"
        />
        <path d="M260 15v16m0 458v16M15 260h16m458 0h16" stroke="#6e5141" />
        <g stroke={`url(#${id})`} strokeWidth=".75" className="orbital-mesh">
          {latitudes.map((path, i) => (
            <path d={path} key={`l${i}`} opacity=".8" />
          ))}
          {meridians.map((path, i) => (
            <path d={path} key={`m${i}`} opacity=".58" />
          ))}
        </g>
        <circle cx="65" cy="151" r="4" fill="#ff824f" />
        <circle cx="448" cy="386" r="3" fill="#ffd4ae" />
      </svg>
      <span className="art-coordinate coordinate-top">DESIGNED TO MOVE.</span>
      <span className="art-coordinate coordinate-bottom">BUILT TO WORK.</span>
      <div className="scene-float scene-float-interface">
        <div className="scene-chip">
          <span className="scene-chip-icon">&lt;/&gt;</span>
          <div>
            <span>THE INTERFACE</span>
            <strong>Thoughtful by design.</strong>
            <small>React / TypeScript</small>
          </div>
        </div>
      </div>
      <div className="scene-float scene-float-system">
        <div className="scene-chip">
          <span className="scene-chip-icon scene-chip-nodes">
            <i />
            <i />
            <i />
          </span>
          <div>
            <span>THE SYSTEM</span>
            <strong>Engineered underneath.</strong>
            <small>Go / C++ / Linux</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectArtwork({ slug }: { slug: Project["slug"] }) {
  if (slug === "illatio") {
    return (
      <div className="project-art illatio-art" aria-hidden="true">
        <span className="art-overline">INTELLIGENCE, ORCHESTRATED.</span>
        <svg viewBox="0 0 400 250" className="illatio-tesseract" fill="none">
          <g stroke="currentColor" strokeWidth="1.2">
            <path
              pathLength="1"
              className="tesseract-line"
              d="m200 25 92 53v106l-92 53-92-53V78Zm0 0v106m92-53-92 53-92-53m92 53v106"
            />
            <path
              pathLength="1"
              className="tesseract-line tesseract-inner"
              d="m200 72 51 29v59l-51 29-51-29v-59Zm0 0v59m51-30-51 30-51-30m51 30v58M108 78l41 23m102 0 41-23M200 25v47m92 112-41-24M200 237v-48m-92-5 41-24"
            />
          </g>
          {[
            [200, 25],
            [292, 78],
            [292, 184],
            [200, 237],
            [108, 184],
            [108, 78],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              className="tesseract-node"
              cx={cx}
              cy={cy}
              r="3"
              fill="currentColor"
              stroke="none"
            />
          ))}
        </svg>
        <span className="illatio-wordmark">
          illatio<span>_</span>
        </span>
        <span className="art-footer">
          SELF-HOSTED INFERENCE <span>↗</span>
        </span>
      </div>
    );
  }
  if (slug === "image-viewer") {
    return (
      <div className="project-art image-art" aria-hidden="true">
        <div className="viewer-window">
          <div className="window-bar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>image-viewer.cpp</span>
            <span>◈</span>
          </div>
          <div className="pixel-landscape">
            <div className="pixel-sun" />
            <div className="pixel-mountain back" />
            <div className="pixel-mountain front" />
            <div className="pixel-grid" />
          </div>
          <div className="window-status">
            <span>RGB / NATIVE RENDERING</span>
            <span>C++20</span>
          </div>
        </div>
        <span className="art-footer">
          A LITTLE CLOSER TO THE PIXELS <span>↗</span>
        </span>
      </div>
    );
  }
  return (
    <div className="project-art bridge-art" aria-hidden="true">
      <span className="art-overline">CONNECTING TWO WORLDS</span>
      <div className="bridge-diagram">
        <div className="skin-avatar">
          <div className="pixel-face" />
          <span>EAGLERCRAFTX</span>
        </div>
        <div className="bridge-connection">
          <span />
          <div>↔</div>
          <span />
        </div>
        <div className="skin-avatar">
          <div className="pixel-face" />
          <span>JAVA EDITION</span>
        </div>
      </div>
      <span className="bridge-label">ONE SKIN. BOTH SIDES.</span>
      <span className="art-footer">
        EAGLERX SKIN BRIDGE <span>↗</span>
      </span>
    </div>
  );
}
