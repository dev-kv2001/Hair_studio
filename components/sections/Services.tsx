"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookButton } from "@/components/booking/BookButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { services } from "@/data/services";
import { formatPrice } from "@/lib/format";

const rowId = (id: string) => `service-${id}`;

/**
 * Sticky photograph, active list. An ash field on the left holds one photograph that crossfades and settles
 * to the active service; the services run as rows on the right. A row becomes active when it is pointed at,
 * focused, or scrolled to the middle of the screen. On phones the photograph is a band pinned under the bar.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    let observer: IntersectionObserver | null = null;

    // The reading line: mid-screen on desktop, just under the pinned photograph band on phones.
    const watch = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        },
        { rootMargin: desktop.matches ? "-50% 0px -50% 0px" : "-62% 0px -37% 0px" },
      );
      list.querySelectorAll("[data-index]").forEach((row) => observer?.observe(row));
    };

    watch();
    desktop.addEventListener("change", watch);
    return () => {
      observer?.disconnect();
      desktop.removeEventListener("change", watch);
    };
  }, []);

  const current = services[active];

  return (
    <section id="services" aria-labelledby="services-title" className="bg-oat lg:py-0">
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* The ash field bleeds to the page's left edge and runs the full height of the section; past the frame's
            max width, its ::before carries the field on to the edge of the screen. */}
        <div className="sticky top-[4.5rem] z-10 -mx-[clamp(1rem,4vw,4rem)] bg-ash lg:relative lg:top-0 lg:col-span-5 lg:mx-0 lg:-ml-[clamp(1rem,4vw,4rem)] lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-[50vw] lg:before:bg-ash">
          <div className="lg:sticky lg:top-[calc(4.5rem+6vh)] lg:px-[clamp(1.25rem,3vw,3rem)] lg:py-[6vh]">
            {/* Capping the width, not the height, keeps the photograph at 4:5 on short screens. */}
            <figure className="lg:mx-auto lg:max-w-[calc(68svh*4/5)]">
              <div className="relative h-[38svh] overflow-clip bg-taupe lg:aspect-[4/5] lg:h-auto lg:w-full">
                {services.map((service, index) => {
                  const isActive = index === active;
                  return (
                    <Image
                      key={service.id}
                      src={service.photo.src}
                      alt={service.photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 90rem) 31rem, (min-width: 64rem) 35vw, 100vw"
                      aria-hidden={!isActive}
                      className={`object-cover transition-[opacity,scale] ease-out-quint ${
                        isActive ? "scale-100 opacity-100 duration-[1200ms]" : "scale-[1.08] opacity-0 duration-700"
                      }`}
                      style={{ objectPosition: service.photo.focus }}
                    />
                  );
                })}
              </div>
              {/* The active service, set large under the photograph: what it is and what it costs. */}
              <figcaption className="hidden items-end justify-between gap-6 pt-6 text-paper lg:flex">
                <span key={current.id} className="photo-in min-w-0">
                  <span className="block text-lead leading-[1.1] font-medium tracking-[-0.02em]">{current.name}</span>
                  <span className="mt-1 flex gap-2 text-small text-paper-soft">
                    <span>{current.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>sample price</span>
                  </span>
                </span>
                <span key={`${current.id}-price`} className="photo-in shrink-0 text-right">
                  <span className="mr-1.5 text-small text-paper-soft">from</span>
                  <span className="text-[clamp(2.25rem,1.4rem+1.6vw,3.25rem)] leading-none font-medium tracking-[-0.03em]">
                    {formatPrice(current.samplePrice)}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="pt-16 pb-24 lg:col-span-6 lg:col-start-7 lg:py-36">
          <Reveal>
            <h2 id="services-title" className="text-head">
              Services &amp; prices
            </h2>
            <p className="mt-6 max-w-[40ch]">
              Every appointment starts with a short consultation, so the plan fits your hair before anything is cut or
              coloured.
            </p>
            <SampleNote className="mt-4 max-w-[40ch]">
              Prices are sample figures for this demo. Final prices would depend on hair length and the consultation.
            </SampleNote>
          </Reveal>

          <ol ref={listRef} className="mt-12 flex flex-col gap-1.5 lg:mt-16">
            {services.map((service, index) => {
              const isActive = index === active;
              return (
                <Reveal as="li" key={service.id} delay={(index % 3) * 70}>
                  <div
                    id={rowId(service.id)}
                    data-index={index}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`relative scroll-mt-[calc(4.5rem+40svh)] px-5 py-6 transition-colors duration-500 ease-out-quint lg:scroll-mt-28 lg:px-7 lg:py-7 ${
                      isActive ? "bg-ivory" : "bg-oat"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="flex items-baseline gap-3 text-[1.25rem] leading-[1.15] font-medium tracking-[-0.015em] sm:text-lead">
                        <span
                          aria-hidden="true"
                          className={`size-2 shrink-0 translate-y-[-0.2em] bg-rose transition-[opacity,scale] duration-500 ease-out-quint ${
                            isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                          }`}
                        />
                        {service.name}
                      </h3>
                      <p className="shrink-0 text-right whitespace-nowrap">
                        <span className="mr-1.5 text-small text-ink-soft">from</span>
                        <span className="text-[1.25rem] font-medium sm:text-lead">{formatPrice(service.samplePrice)}</span>
                      </p>
                    </div>
                    <p className="mt-3 max-w-[46ch] pl-5 text-ink-soft">{service.description}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pl-5">
                      <p className="flex gap-2 text-small text-ink-soft">
                        <span>{service.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>sample price</span>
                      </p>
                      <BookButton
                        serviceId={service.id}
                        className="group/book ml-auto inline-flex min-h-11 items-center gap-2 text-small font-medium underline decoration-ink-soft/50 underline-offset-[0.35em] transition-colors hover:text-rose-deep hover:decoration-rose-deep"
                      >
                        Book {service.name.toLowerCase()}
                        <Icon name="arrowRight" className="size-4 transition-transform duration-300 ease-out-quint group-hover/book:translate-x-1" />
                      </BookButton>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
