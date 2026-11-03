import { Fragment } from "react";

// Long CamelCase names ("EaglerXSkinBridge") are one word to the browser, so a
// display-size heading can only overflow its column. Offer a line break before
// each capital that starts a new lowercase run: EaglerX | Skin | Bridge.
export function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?<=[A-Za-z])(?=[A-Z][a-z])/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 ? <wbr /> : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}
