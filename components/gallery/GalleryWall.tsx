"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryCategories } from "@/data/gallery";
import type { GalleryCategory, GalleryItem } from "@/types/content";

type Filter = GalleryCategory | "All";

// Prints on a wall: each pair of photos takes one of four arrangements, so no two rows repeat.
// Desktop places them on a 12-column grid; phones alternate widths and sides.
// Ratios stay portrait or square because most of the photographs are portraits.
const placements = [
  { box: "lg:col-start-1 lg:col-span-4", ratio: "aspect-[3/4]", phone: "w-[70%]" },
  { box: "lg:col-start-7 lg:col-span-5 lg:mt-48", ratio: "aspect-square", phone: "ml-auto w-[84%]" },
  { box: "lg:col-start-6 lg:col-span-5", ratio: "aspect-[4/5]", phone: "w-[64%]" },
  { box: "lg:col-start-2 lg:col-span-3 lg:mt-32", ratio: "aspect-[3/4]", phone: "w-full" },
  { box: "lg:col-start-9 lg:col-span-4", ratio: "aspect-[3/4]", phone: "ml-auto w-[70%]" },
  { box: "lg:col-start-2 lg:col-span-5 lg:mt-48", ratio: "aspect-square", phone: "w-[84%]" },
  { box: "lg:col-start-2 lg:col-span-5", ratio: "aspect-[4/5]", phone: "ml-auto w-[64%]" },
  { box: "lg:col-start-9 lg:col-span-3 lg:mt-32", ratio: "aspect-[3/4]", phone: "w-full" },
];

function pairs<T>(list: T[]) {
  const rows: T[][] = [];
  for (let i = 0; i < list.length; i += 2) rows.push(list.slice(i, i + 2));
  return rows;
}

export function GalleryWall({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3" role="group" aria-label="Filter photos">
        {(["All", ...galleryCategories] as Filter[]).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className="min-h-11 px-4 text-small transition-colors hover:bg-oat aria-pressed:bg-charcoal aria-pressed:text-ivory"
          >
            {option}
          </button>
        ))}
        <p className="ml-2 text-small text-taupe" aria-live="polite">
          {visible.length} photos
        </p>
      </div>

      <ul className="mt-16 flex flex-col gap-16 lg:gap-24">
        {pairs(visible).map((row, rowIndex) => (
          <li key={row.map((item) => item.id).join("-")} className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
            {row.map((item, itemIndex) => {
              const position = rowIndex * 2 + itemIndex;
              const placement = placements[position % placements.length];
              return (
                <figure key={item.id} className={`${placement.phone} ${placement.box} lg:row-start-1 lg:mx-0 lg:w-auto`}>
                  <button
                    type="button"
                    className="group block w-full cursor-zoom-in"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setOpenIndex(position);
                    }}
                  >
                    <span className="sr-only">Open larger: </span>
                    <span className={`relative block overflow-hidden bg-oat ${placement.ratio}`}>
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 64rem) 45vw, 84vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        style={{ objectPosition: item.photo.focus }}
                      />
                    </span>
                  </button>
                  <figcaption className="mt-3 text-small">
                    {item.title} <span className="text-taupe">· {item.category}</span>
                  </figcaption>
                </figure>
              );
            })}
          </li>
        ))}
      </ul>

      <Lightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => {
          setOpenIndex(null);
          openerRef.current?.focus();
        }}
      />
    </>
  );
}
