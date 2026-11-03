"use client";

// src/react.tsx
import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef
} from "react";
import { mount } from "./index.js";
function useScrollCraft(ref, options = {}) {
  const { enabled = true, lerp } = options;
  const onReady = useRef(options.onReady);
  useEffect(() => {
    onReady.current = options.onReady;
  });
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const handle = mount(el, lerp === void 0 ? {} : { lerp });
    let live = true;
    handle.ready.then(
      (instance) => {
        if (live && instance) onReady.current?.(instance);
      },
      () => {
      }
    );
    return () => {
      live = false;
      handle.destroy();
    };
  }, [ref, enabled, lerp]);
}
function assignRef(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}
var ScrollStage = forwardRef(function ScrollStage2({ as = "div", enabled, lerp, onReady, children, ...rest }, forwarded) {
  const node = useRef(null);
  const setNode = useCallback(
    (el) => {
      node.current = el;
      assignRef(forwarded, el);
    },
    [forwarded]
  );
  useScrollCraft(node, { enabled, lerp, onReady });
  return createElement(as, { ...rest, ref: setNode }, children);
});
export {
  ScrollStage,
  useScrollCraft
};
//# sourceMappingURL=react.js.map