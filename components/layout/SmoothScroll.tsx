"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/*
 * Ease-out quart over one second, in place of Lenis's default lerp. Each wheel notch starts gently instead of
 * lurching, then glides to rest without the long sub-pixel crawl; scroll distance stays one-to-one.
 */
const WHEEL_EASE = { duration: 1, easing: (t: number) => 1 - (1 - t) ** 4 };

/**
 * Eases mouse-wheel and trackpad scrolling with Lenis. Touch keeps the native scroll, and nothing is
 * smoothed while the visitor prefers reduced motion. Anchor links, the booking jump and back-to-top keep
 * their native scrolling, even when started mid-glide; Lenis only follows them. While the menu or lightbox
 * locks the body, Lenis pauses.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    let lenis: Lenis | null = null;

    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis?.stop();
      else lenis?.start();
    };

    const sync = () => {
      if (query.matches) {
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, ...WHEEL_EASE });
        syncLock();
      }
    };

    /*
     * Mid-glide, Lenis rewrites the scroll position every frame, which cancels any scroll another input starts:
     * an anchor jump, the booking scroll, back-to-top, the keyboard or the scrollbar. Those inputs settle the
     * glide where it is first, so the native scroll they start runs to its end and Lenis just follows it.
     */
    const yieldToNative = () => {
      if (lenis?.isScrolling === "smooth") lenis.scrollTo(lenis.actualScroll, { immediate: true });
    };
    const handoffEvents = ["pointerdown", "keydown", "click"] as const;

    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    query.addEventListener("change", sync);
    handoffEvents.forEach((type) => window.addEventListener(type, yieldToNative, { capture: true, passive: true }));
    sync();

    return () => {
      lockObserver.disconnect();
      query.removeEventListener("change", sync);
      handoffEvents.forEach((type) => window.removeEventListener(type, yieldToNative, { capture: true }));
      lenis?.destroy();
    };
  }, []);

  return null;
}
