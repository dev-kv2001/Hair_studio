"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import type { GalleryItem } from "@/types/content";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const controlClass =
  "inline-flex size-12 items-center justify-center bg-ivory/10 text-ivory transition-colors hover:bg-ivory hover:text-charcoal";

/** A native modal <dialog>: focus is contained, Escape closes it and focus returns to the opener. */
export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  if (index === null || !item) {
    return <dialog ref={dialogRef} aria-label="Photo viewer" onClose={onClose} />;
  }

  const step = (delta: number) => onIndexChange((index + delta + items.length) % items.length);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Photo viewer: ${item.title}`}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-charcoal/95 p-0 text-ivory backdrop:bg-charcoal/80"
    >
      <div className="frame flex h-full flex-col gap-4 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-small tabular-nums text-ash" aria-live="polite">
            {index + 1} of {items.length}
          </p>
          <button type="button" autoFocus className={controlClass} onClick={() => dialogRef.current?.close()}>
            <Icon name="close" className="size-6" />
            <span className="sr-only">Close photo viewer</span>
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <Image
            key={item.id}
            src={item.photo.src}
            alt={item.photo.alt}
            fill
            placeholder="blur"
            sizes="90vw"
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button type="button" className={controlClass} onClick={() => step(-1)}>
            <Icon name="arrowLeft" className="size-6" />
            <span className="sr-only">Previous photo</span>
          </button>
          <p className="text-center">
            {item.title} <span className="text-ash">· {item.category}</span>
          </p>
          <button type="button" className={controlClass} onClick={() => step(1)}>
            <Icon name="arrowRight" className="size-6" />
            <span className="sr-only">Next photo</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
