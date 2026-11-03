// upstream.json
var release = "0.3.1";
var commit = "75d81f74e83692add18cd7a8a8e078b8a887a579";

// src/index.ts
var upstream = {
  release,
  commit
};
var TAG = "[scroll-craft-kit]";
var loaded = null;
var loading = null;
function hasDom() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function serverError(fn) {
  return new Error(
    `${TAG} ${fn}() needs a browser, but there is no window here (server-side rendering or plain Node). Call it from client code: a useEffect, a 'use client' component such as <ScrollStage>, or a script in the page.`
  );
}
function globalEngine() {
  const g = window.ScrollCraft;
  return g && typeof g.mount === "function" ? g : null;
}
function loadEngine() {
  if (!hasDom()) return Promise.reject(serverError("loadEngine"));
  if (loaded) return Promise.resolve(loaded);
  const existing = globalEngine();
  if (existing) {
    loaded = existing;
    return Promise.resolve(existing);
  }
  if (!loading) {
    loading = import("./engine-install-PRV3QYI4.js").then(
      (m) => {
        const engine = m.install();
        loaded = engine;
        return engine;
      },
      (err) => {
        loading = null;
        throw err;
      }
    );
  }
  return loading;
}
function resolveRoot(root) {
  if (typeof root === "string") {
    const found = document.querySelector(root);
    if (!found) throw new Error(`${TAG} mount(): no element matches "${root}".`);
    return found;
  }
  if (!root || root.nodeType !== 1) {
    throw new TypeError(`${TAG} mount(): root must be an Element or a selector string.`);
  }
  return root;
}
function mount(root, options = {}) {
  if (!hasDom()) throw serverError("mount");
  const el = resolveRoot(root);
  let instance = null;
  let destroyed = false;
  const start = (engine2) => {
    if (destroyed) return null;
    instance = engine2.mount(el, options);
    return instance;
  };
  const engine = loaded || globalEngine();
  const ready = engine ? Promise.resolve(start(engine)) : loadEngine().then(start);
  ready.catch((err) => console.error(`${TAG} the engine failed to load.`, err));
  return {
    ready,
    get instance() {
      return instance;
    },
    get destroyed() {
      return destroyed;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      const live = instance;
      instance = null;
      if (live && typeof live.destroy === "function") live.destroy();
      else if (live) console.warn(`${TAG} this engine has no destroy() (older than 0.3.1); nothing was torn down.`);
    }
  };
}
export {
  loadEngine,
  mount,
  upstream
};
//# sourceMappingURL=index.js.map