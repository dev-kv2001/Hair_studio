"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/types/content";

const HOLD_MS = 6000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Slide = Photo & { caption: string };

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** The hero's signature move: one frame whose photograph slowly crossfades, with a pause control. */
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
  // The visitor's own choice wins; until they make one, reduced motion means "paused".
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? prefersReducedMotion;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % slides.length);
    }, HOLD_MS);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden bg-oat sm:aspect-[16/11] lg:aspect-auto lg:h-[calc(100svh-8rem)] lg:min-h-[30rem]">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.caption}
            src={slide.src}
            alt={slide.alt}
            fill
            preload={slideIndex === 0}
            placeholder="blur"
            sizes="(min-width: 64rem) 45vw, 100vw"
            aria-hidden={slideIndex !== index}
            className={`object-cover transition-opacity duration-[1600ms] ease-in-out ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            } ${slideIndex === 0 ? "slow-zoom" : ""}`}
            style={{ objectPosition: slide.focus }}
          />
        ))}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-small text-taupe lg:pr-[clamp(1rem,5vw,4.5rem)]">
        <span>{slides[index].caption}</span>
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          className="shrink-0 underline decoration-ash underline-offset-4 transition-colors hover:text-charcoal hover:decoration-charcoal"
        >
          {paused ? "Play slideshow" : "Pause slideshow"}
        </button>
      </figcaption>
    </figure>
  );
}
