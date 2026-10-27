"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import type { GalleryItem } from "@/types/content";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const controlBtnClass =
  "inline-flex size-12 items-center justify-center bg-paper/10 text-paper transition-[background-color,transform] duration-200 hover:bg-rose active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper";

/**
 * Cinematic full-screen gallery lightbox.
 * Accessible native modal <dialog> with gesture swipe cues, zoom preview,
 * rich craft annotations, and smooth keyboard/arrow navigation.
 */
export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const item = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!item && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (index === null || !item) {
    return <dialog ref={dialogRef} aria-label="Photo viewer" onClose={onClose} />;
  }

  const step = (delta: number) => {
    onIndexChange((index + delta + items.length) % items.length);
  };

  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) step(1);
    if (isRightSwipe) step(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Photo viewer: ${item.title}`}
      onClose={onClose}
      data-lenis-prevent
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "Escape") dialogRef.current?.close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-charcoal/98 p-0 text-paper transition-opacity duration-300 ease-out-quint backdrop:bg-charcoal/90 starting:open:opacity-0"
    >
      <div className="frame flex h-full flex-col justify-between py-5 sm:py-7">
        {/* Top Control Bar with tone separation */}
        <div className="flex items-center justify-between gap-6 bg-paper/5 px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="text-small tracking-wider uppercase text-paper/60">
              {site.name} Archive
            </span>
            <span className="text-small text-paper/40">·</span>
            <p className="text-small font-medium text-paper" aria-live="polite">
              Photo {index + 1} of {items.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              autoFocus
              className={controlBtnClass}
              onClick={() => dialogRef.current?.close()}
              title="Close viewer (Esc)"
            >
              <Icon name="close" className="size-6" />
              <span className="sr-only">Close photo viewer</span>
            </button>
          </div>
        </div>

        {/* Center Stage: Cinematic Full Photo */}
        <div
          className="relative min-h-0 flex-1 my-4 sm:my-6 flex items-center justify-center touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-full w-full max-w-5xl">
            <Image
              key={item.id}
              src={item.photo.src}
              alt={item.photo.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 64rem) 85vw, 95vw"
              className="photo-in object-contain"
              style={{ objectPosition: item.photo.focus || "50% 50%" }}
            />
          </div>

          {/* Quick Floating Lateral Stepper Arrows */}
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 max-sm:hidden inline-flex size-14 items-center justify-center bg-paper/15 text-paper transition-[background-color,transform] hover:bg-rose active:scale-90"
            onClick={() => step(-1)}
            aria-label="Previous photo"
          >
            <Icon name="arrowLeft" className="size-6" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 max-sm:hidden inline-flex size-14 items-center justify-center bg-paper/15 text-paper transition-[background-color,transform] hover:bg-rose active:scale-90"
            onClick={() => step(1)}
            aria-label="Next photo"
          >
            <Icon name="arrowRight" className="size-6" />
          </button>
        </div>

        {/* Bottom Editorial Caption & Craft Metadata */}
        <div className="bg-paper/5 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-12 sm:items-baseline">
            <div className="sm:col-span-4">
              <h3 className="text-lead font-medium text-paper">{item.title}</h3>
              <p className="mt-1 text-small text-paper/70">
                Category: <span className="text-paper font-medium">{item.category}</span>
                {item.duration && (
                  <span className="text-paper/60"> · Approx {item.duration}</span>
                )}
              </p>
            </div>

            <div className="sm:col-span-5">
              {item.notes && (
                <p className="text-small leading-relaxed text-paper/80">
                  {item.notes}
                </p>
              )}
              {item.technique && (
                <p className="mt-1.5 text-small text-rose font-medium">
                  Craft: {item.technique}
                </p>
              )}
            </div>

            <div className="sm:col-span-3 sm:text-right flex items-center justify-between sm:justify-end gap-3">
              <button
                type="button"
                className={controlBtnClass}
                onClick={() => step(-1)}
                title="Previous photo (Left Arrow)"
              >
                <Icon name="arrowLeft" className="size-6" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button
                type="button"
                className={controlBtnClass}
                onClick={() => step(1)}
                title="Next photo (Right Arrow)"
              >
                <Icon name="arrowRight" className="size-6" />
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
