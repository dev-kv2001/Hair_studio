"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/types/content";

const HOLD_MS = 7000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Slide = Photo & { caption: string };

// Each photograph drifts its own way, so consecutive slides never repeat the same move.
const drifts = [
  { from: "-2%, 1.5%", to: "2%, -2%" },
  { from: "2%, -1%", to: "-2%, 2%" },
  { from: "0%, 2%", to: "1%, -2.5%" },
];

const driftStyle = (i: number) => {
  const drift = drifts[i % drifts.length];
  return { "--from": drift.from, "--to": drift.to } as React.CSSProperties;
};

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The hero's living background: the photographs crossfade edge to edge, each on a slow zoom and drift,
 * under a warm ash wash. It stays paused under reduced motion; the progress lines jump straight to a slide. The hero's own content is passed in as children.
 */
export function HeroSlideshow({ slides, children }: { slides: Slide[]; children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  // Reduced motion means "paused".
  const paused = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  const single = slides.length < 2;

  // Restarts on every change of slide, so a slide chosen by hand gets its full hold time too.
  useEffect(() => {
    if (paused || single) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [paused, single, slides.length, index]);

  return (
    <>
      <div
        className={`absolute inset-0 -z-10 bg-ash ${paused ? "[&_.hero-drift]:[animation-play-state:paused]" : ""}`}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.caption}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="hero-drift absolute inset-0" style={driftStyle(slideIndex)}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                preload={slideIndex === 0}
                loading={slideIndex === 0 ? undefined : "eager"}
                placeholder="blur"
                sizes="100vw"
                aria-hidden={slideIndex !== index}
                className="object-cover"
                style={{ objectPosition: slide.focus }}
              />
            </div>
          </div>
        ))}
        {/* A warm ash wash ties the photographs to one palette; the scrims keep the type readable. */}
        <div aria-hidden="true" className="absolute inset-0 bg-ash/40 mix-blend-multiply" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_23_23/0.66)_0%,rgb(23_23_23/0.2)_32%,rgb(23_23_23/0.34)_56%,rgb(23_23_23/0.86)_100%)]" /* taste-skill-ignore: neutral scrim over a photograph */
        />
        {/* A second scrim from the right edge quiets the photograph behind the supporting text on wide screens. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(270deg,rgb(23_23_23/0.62)_0%,rgb(23_23_23/0.35)_30%,rgb(23_23_23/0)_55%)]" /* taste-skill-ignore: neutral scrim over a photograph */
        />
      </div>

      {children}

      <div className="hero-fade absolute top-6 right-[clamp(1rem,4vw,4rem)] z-10 flex w-[min(19rem,calc(100%-2rem))] flex-col gap-1 text-small text-paper sm:top-8">
        <div className="flex min-h-11 items-center justify-between gap-4">
          <span>
            <span className="sr-only">Showing: </span>
            <span key={slides[index].caption} className="photo-in inline-block">
              {slides[index].caption}
            </span>
          </span>
        </div>
        {/* One line per photograph: the current one fills over its hold time, and each jumps to its slide. */}
        <div className={`flex gap-1.5 ${single ? "hidden" : ""}`} role="group" aria-label="Choose a slide">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.caption}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-current={slideIndex === index ? "true" : undefined}
              className="group/dot flex min-h-11 flex-1 items-center"
            >
              <span className="sr-only">
                Show slide {slideIndex + 1}: {slide.caption}
              </span>
              <span className="relative block h-0.5 w-full overflow-clip bg-paper/30 transition-[height] duration-200 group-hover/dot:h-1 group-focus-visible/dot:h-1">
                <span
                  key={slideIndex === index ? `${slide.caption}-${index}` : slide.caption}
                  className={`absolute inset-0 origin-left bg-paper ${
                    slideIndex < index ? "scale-x-100" : slideIndex === index ? "hero-progress scale-x-100" : "scale-x-0"
                  } ${paused ? "[animation-play-state:paused]" : ""}`}
                  style={{ "--hold": `${HOLD_MS}ms` } as React.CSSProperties}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
