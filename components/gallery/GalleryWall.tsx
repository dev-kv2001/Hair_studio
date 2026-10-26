"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { galleryCategories } from "@/data/gallery";
import { site } from "@/data/site";
import type { GalleryCategory, GalleryItem } from "@/types/content";

type Filter = GalleryCategory | "All";

/**
 * Editorial perspective and aspect composition settings for the experimental gallery layout.
 * Creates an asymmetric rhythm where each image possesses its own distinct presence,
 * tilt, and cinematic proportion.
 */
const editorialLayout = [
  {
    colSpan: "lg:col-span-7",
    aspect: "aspect-[16/11]",
    tilt: "hover:rotate-0",
    captionSide: "bottom",
  },
  {
    colSpan: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    tilt: "hover:rotate-0",
    captionSide: "bottom",
  },
  {
    colSpan: "lg:col-span-4",
    aspect: "aspect-[3/4]",
    tilt: "hover:rotate-0",
    captionSide: "bottom",
  },
  {
    colSpan: "lg:col-span-8",
    aspect: "aspect-[16/10]",
    tilt: "hover:rotate-0",
    captionSide: "bottom",
  },
];

export function GalleryWall({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Category Filter Pills & Archive Counter */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter archive photos"
        >
          {(["All", ...galleryCategories] as Filter[]).map((option) => {
            const isSelected = filter === option;
            const count =
              option === "All"
                ? items.length
                : items.filter((item) => item.category === option).length;

            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setFilter(option);
                  setHasFiltered(true);
                }}
                className={`min-h-11 px-5 py-2.5 text-small font-medium transition-[background-color,color,transform] duration-200 ease-out-quint cursor-pointer active:scale-[0.97] ${
                  isSelected
                    ? "bg-ink text-paper"
                    : "bg-ivory/60 text-ink hover:bg-ivory"
                }`}
              >
                <span>{option}</span>
                <span
                  className={`ml-2 text-small ${
                    isSelected ? "text-paper/60" : "text-ink-soft"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-small text-ink-soft">
          <span className="inline-block size-2 rounded-full bg-rose" />
          <p aria-live="polite">
            Displaying <strong className="font-medium text-ink">{visible.length}</strong> craft records
          </p>
        </div>
      </div>

      {/* Asymmetric Cinematic Gallery Grid */}
      <ul
        key={filter}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10"
      >
        {visible.map((item, position) => {
          const layout = editorialLayout[position % editorialLayout.length];
          const isHovered = hoveredId === item.id;
          const openLightbox = (event: React.MouseEvent<HTMLButtonElement>) => {
            openerRef.current = event.currentTarget;
            setOpenIndex(position);
          };

          const card = (
            <figure
              className="group relative flex flex-col bg-ivory p-3.5 transition-[transform,background-color] duration-500 ease-out-quint hover:bg-ivory hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                type="button"
                className="relative block w-full overflow-clip bg-oat cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                onClick={openLightbox}
                aria-label={`Open detailed view for ${item.title}`}
              >
                <div className={`relative w-full ${layout.aspect} overflow-clip`}>
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 64rem) 50vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                    style={{ objectPosition: item.photo.focus || "50% 50%" }}
                  />

                  {/* Cinematic Hover Overlay with Technique Cue */}
                  <div className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                    {item.technique && (
                      <span className="bg-ivory/95 px-3 py-1.5 text-small font-medium text-ink tracking-tight">
                        {item.technique}
                      </span>
                    )}
                  </div>

                  {/* Expand Icon Badge */}
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 inline-flex size-11 items-center justify-center bg-ivory text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90"
                  >
                    <Icon name="expand" className="size-5" />
                  </span>
                </div>
              </button>

              {/* Editorial Caption Bar */}
              <figcaption className="mt-4 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-body font-medium text-ink tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-small font-medium text-rose-deep uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {item.notes && (
                  <p className="text-small text-ink-soft leading-relaxed line-clamp-2">
                    {item.notes}
                  </p>
                )}

                <div className="mt-1 flex items-center justify-between text-small text-ink-soft pt-2">
                  <span>{item.duration ? `Duration: ${item.duration}` : `${site.name} Craft`}</span>
                  <button
                    type="button"
                    onClick={openLightbox}
                    className="underline decoration-ink/20 underline-offset-4 group-hover:text-ink transition-colors"
                  >
                    Inspect photo →
                  </button>
                </div>
              </figcaption>
            </figure>
          );

          return hasFiltered ? (
            <li
              key={item.id}
              className={`item-in ${layout.colSpan}`}
              style={{ "--d": `${position * 60}ms` } as React.CSSProperties}
            >
              {card}
            </li>
          ) : (
            <Reveal
              key={item.id}
              as="li"
              delay={position * 80}
              className={layout.colSpan}
            >
              {card}
            </Reveal>
          );
        })}
      </ul>

      {/* Lightbox Dialog Container */}
      <Lightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => {
          setOpenIndex(null);
          openerRef.current?.focus();
        }}
      />
    </div>
  );
}
