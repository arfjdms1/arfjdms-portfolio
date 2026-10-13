import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";

const systems = [
  {
    name: "Illatio",
    slug: "illatio",
    label: "SELF-HOSTED INFERENCE",
    icon: "server" as const,
    stages: [
      {
        name: "Request",
        tool: "Inference input",
        detail:
          "An inference request enters the system. Illatio brings the request path and cluster operations into one platform.",
      },
      {
        name: "Manager",
        tool: "Go / scheduling",
        detail:
          "The Go manager routes the whole request to a compatible node. Scheduling and request accounting make those decisions visible.",
      },
      {
        name: "Model node",
        tool: "llama.cpp adapter",
        detail:
          "A compatible node handles model execution through a runtime adapter. The hardware becomes part of a shared inference system.",
      },
      {
        name: "Visibility",
        tool: "Next.js console",
        detail:
          "The operator console surfaces cluster health, scheduling, and request telemetry. The CLI provides another way to administer the system.",
      },
    ],
  },
  {
    name: "Image Viewer",
    slug: "image-viewer",
    label: "NATIVE IMAGE RENDERING",
    icon: "code" as const,
    stages: [
      {
        name: "Image",
        tool: "Image data",
        detail:
          "An image becomes a low-level rendering problem: how do its pixels reach the screen with a small dependency footprint?",
      },
      {
        name: "Pixels",
        tool: "Pixel buffers",
        detail:
          "The viewer works directly with pixel buffers, keeping the relationship between image data and output explicit.",
      },
      {
        name: "Channels",
        tool: "C++20 / byte shifts",
        detail:
          "C++20 byte-shift operations process image color channels. The work stays close to the data being rendered.",
      },
      {
        name: "Render",
        tool: "Native graphics",
        detail:
          "Native rendering displays the result. CMake handles the build, keeping the project small and focused.",
      },
    ],
  },
  {
    name: "Skin Bridge",
    slug: "eaglerx-skinbridge",
    label: "CONNECTING MINECRAFT CLIENTS",
    icon: "layers" as const,
    stages: [
      {
        name: "Skin data",
        tool: "EaglercraftX",
        detail:
          "A custom skin starts as raw data from EaglercraftX. The bridge connects that input with the Java Edition skin ecosystem.",
      },
      {
        name: "Convert",
        tool: "PNG reconstruction",
        detail:
          "Raw skin data is reconstructed as a PNG. Processing runs asynchronously to keep the main thread free.",
      },
      {
        name: "Sign",
        tool: "MineSkin / caching",
        detail:
          "MineSkin provides signed textures. In-memory caching and pre-signed presets keep the workflow focused without a database.",
      },
      {
        name: "Apply",
        tool: "SkinsRestorer",
        detail:
          "SkinsRestorer connects the signed texture back to players. One skin can move across two different Minecraft clients.",
      },
    ],
  },
];

export function BuildLab() {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const system = systems[selected];
  const currentStage = system.stages[stage];

  function select(index: number) {
    setSelected(index);
    setStage(0);
  }

  return (
    <section
      className="build-lab container section"
      aria-labelledby="lab-title"
    >
      <ScrollReveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / UNDER THE HOOD</span>
            <h2 id="lab-title">
              The interface is
              <br />
              <span>just the beginning.</span>
            </h2>
          </div>
          <p className="section-heading-aside">
            Explore how the pieces of my projects connect. Select a project,
            then a stage.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="lab-console">
          <div className="lab-topbar">
            <div
              className="lab-tabs"
              role="tablist"
              aria-label="Explore project architecture"
            >
              {systems.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-selected={index === selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={index === selected ? 0 : -1}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  onClick={() => select(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % systems.length;
                    else if (event.key === "ArrowLeft")
                      next = (index + systems.length - 1) % systems.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = systems.length - 1;
                    else return;
                    event.preventDefault();
                    select(next);
                    tabs.current[next]?.focus();
                  }}
                >
                  <Icon name={item.icon} /> {item.name}
                </button>
              ))}
            </div>
            <span className="lab-interactive">
              <span /> INTERACTIVE
            </span>
          </div>
          <div
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${selected}`}
          >
            <div className="lab-label">
              <span>{system.label}</span>
              <span>SELECT A STAGE ↓</span>
            </div>
            <div
              className="lab-stages"
              key={system.slug}
              role="group"
              aria-label={`${system.name} stages`}
            >
              {system.stages.map((item, index) => (
                <div className="lab-stage" key={item.name}>
                  <button
                    className={`lab-node ${stage === index ? "is-selected" : ""}`}
                    type="button"
                    aria-pressed={stage === index}
                    aria-controls={`${id}-detail`}
                    onClick={() => setStage(index)}
                  >
                    <span className="lab-node-index">0{index + 1}</span>
                    <strong>{item.name}</strong>
                    <span>{item.tool}</span>
                  </button>
                  {index < system.stages.length - 1 && (
                    <span className="flow-connection" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <div
              className="lab-details"
              id={`${id}-detail`}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="lab-detail-copy" key={`${system.slug}-${stage}`}>
                <span className="eyebrow">
                  {system.name} / 0{stage + 1}
                </span>
                <p>{currentStage.detail}</p>
              </div>
              <Link
                viewTransition
                className="text-link"
                to={`/projects#${system.slug}`}
              >
                Explore {system.name} <Icon name="external" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
