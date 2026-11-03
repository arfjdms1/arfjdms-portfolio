import * as react from 'react';
import { HTMLAttributes, JSX, ReactNode, RefObject } from 'react';

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

interface UseScrollCraftOptions extends MountOptions {
    /** Set false to keep the stage unmounted (e.g. until a clip is chosen). Default true. */
    enabled?: boolean;
    /** Called once per mount, after the engine has mounted on the stage. */
    onReady?: (instance: ScrollCraftInstance) => void;
}
/**
 * Mount the engine on `ref.current` after the component mounts, and destroy it
 * on unmount. StrictMode's mount, unmount, mount cycle is safe: a mount whose
 * engine is still loading is cancelled by the cleanup, so exactly one
 * instance survives. Changing `lerp` or `enabled` remounts.
 */
declare function useScrollCraft(ref: RefObject<Element | null>, options?: UseScrollCraftOptions): void;
type Tag = keyof JSX.IntrinsicElements;
interface ScrollStageProps extends HTMLAttributes<HTMLElement>, Pick<UseScrollCraftOptions, 'enabled' | 'lerp' | 'onReady'> {
    /** Element to render. Default 'div'. Changing it needs a new `key`. */
    as?: Tag;
    /** Static markup: acts and their data-sc-* attributes. See the module notes. */
    children?: ReactNode;
}
/**
 * A container that scrollcraft drives. Put acts (`data-sc-act` sections)
 * inside it; the stage element itself is the mount root, not an act.
 *
 * Keep its children static and re-key it to remount, e.g.
 * `<ScrollStage key={slug}>…</ScrollStage>`.
 */
declare const ScrollStage: react.ForwardRefExoticComponent<ScrollStageProps & react.RefAttributes<HTMLElement>>;

export { ScrollStage, useScrollCraft };
export type { MountOptions, ScrollCraftAct, ScrollCraftClip, ScrollCraftHandle, ScrollCraftInstance, ScrollStageProps, UseScrollCraftOptions };
