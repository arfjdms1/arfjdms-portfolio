import type { SVGProps } from "react";

type IconName =
  | "arrow"
  | "external"
  | "github"
  | "mail"
  | "copy"
  | "check"
  | "code"
  | "server"
  | "layers";

const paths: Record<Exclude<IconName, "github">, string> = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  external: "M6 18 18 6M6 6h12v12",
  mail: "M4 5h16v14H4zM4 6l8 7 8-7",
  copy: "M9 9h11v11H9zM15 9V4H4v11h5",
  check: "m5 12 4 4L19 6",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18",
  server: "M4 3h16v7H4zM4 14h16v7H4zM7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5",
  layers: "m12 3 10 5-10 5L2 8zm-10 10 10 5 10-5M2 18l10 5 10-5",
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {name === "github" ? (
        <path
          fill="currentColor"
          stroke="none"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 7c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.39.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.56c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      ) : (
        <path d={paths[name]} />
      )}
    </svg>
  );
}
