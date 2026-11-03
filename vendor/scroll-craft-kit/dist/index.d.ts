/**
 * Types for the vendored scrollcraft engine (src/engine/scrollcraft.js) and
 * for the kit's own wrapper. The engine is plain JS and is never edited, so
 * these describe what it actually exposes rather than what we wish it did.
 */
/** Options passed straight through to the engine's `mount()`. */
interface MountOptions {
    /**
     * Playhead smoothing per frame, clamped by the engine to 0.02..1. The engine
     * default is 0.18 (1.0 under reduced motion). A `data-sc-lerp` attribute on
     * the mount root, then on `<html>`, wins over this value.
     */
    lerp?: number;
}
/** One scrub clip's playhead record, as the engine keeps it. */
interface ScrollCraftClip {
    readonly el: HTMLVideoElement;
    readonly host: Element;
    /** True once the clip blob has loaded and its metadata is known. */
    ready: boolean;
    loading: boolean;
    painted: boolean;
    /** Smoothed playhead, 0..1 of the clip. */
    cur: number;
    /** Where scroll wants the playhead, 0..1 of the clip. */
    target: number;
    live: boolean;
    lerp: number;
    objectURL?: string | null;
}
/** One `[data-sc-act]` as the engine tracks it. */
interface ScrollCraftAct {
    readonly el: Element;
    readonly device: string;
    readonly pinned: boolean;
    /** Act progress, 0..1. */
    p: number;
    live: boolean;
    [key: string]: unknown;
}
/** What the engine's own `ScrollCraft.mount()` returns. */
interface ScrollCraftInstance {
    /** Idempotent. Removes listeners, stops both rAF loops, revokes clip blobs. */
    destroy(): void;
    /** Re-measure acts. Call after the page's layout changes under the engine. */
    layout(): void;
    /** Re-read scroll and repaint every act. */
    read(): void;
    readonly acts: ScrollCraftAct[];
    readonly worlds: unknown[];
    readonly clips: ScrollCraftClip[];
    readonly lerp: number;
}
/** The `window.ScrollCraft` global the engine installs. */
interface ScrollCraftEngine {
    mount(root: Element | Document | string, opts?: MountOptions): ScrollCraftInstance;
    /** `prefers-reduced-motion: reduce`, read once when the engine loaded. */
    readonly reduce: boolean;
    /** Live instances. The verification harness reads this; pages should not. */
    readonly instances: ScrollCraftInstance[];
}
/** What the kit's `mount()` returns. */
interface ScrollCraftHandle {
    /**
     * Tear the stage down. Idempotent, and safe to call before the engine has
     * finished loading: the pending mount is then cancelled instead of run.
     */
    destroy(): void;
    /**
     * Settles once the engine has mounted. Resolves to `null` if `destroy()` ran
     * first. Rejects if the engine failed to load (the error is also logged).
     */
    readonly ready: Promise<ScrollCraftInstance | null>;
    /** The engine instance, or `null` while loading and after `destroy()`. */
    readonly instance: ScrollCraftInstance | null;
    readonly destroyed: boolean;
}

/**
 * scroll-craft-kit: a thin, SSR-safe wrapper around the vendored scrollcraft
 * engine. The engine itself (src/engine/scrollcraft.js) is never edited.
 *
 * Importing this module touches no browser global. The engine reads
 * matchMedia and window at its own top level, so it is loaded lazily on the
 * first browser call to mount(), or reused if a <script> already installed
 * window.ScrollCraft.
 */

/** The upstream release and commit the vendored engine was copied from. */
declare const upstream: {
    readonly release: string;
    readonly commit: string;
};
/**
 * Load the engine without mounting anything, e.g. to warm it before a route
 * transition. Resolves to the `window.ScrollCraft` global. Rejects on the
 * server.
 */
declare function loadEngine(): Promise<ScrollCraftEngine>;
/**
 * Mount the engine on `root` (an element or a selector). Every
 * `[data-sc-*]` element inside it is driven by scroll until `destroy()`.
 *
 * Throws on the server. In the browser it returns at once: if the engine is
 * already loaded it mounts synchronously, otherwise it loads the engine first
 * and `destroy()` called in the meantime cancels the mount.
 *
 * The markup inside `root` must stay static while mounted. The engine grabs
 * its nodes at mount time, and `data-sc-kinetic` rewrites text into spans, so
 * to change the content, destroy and mount again.
 */
declare function mount(root: Element | string, options?: MountOptions): ScrollCraftHandle;

export { loadEngine, mount, upstream };
export type { MountOptions, ScrollCraftAct, ScrollCraftClip, ScrollCraftEngine, ScrollCraftHandle, ScrollCraftInstance };
