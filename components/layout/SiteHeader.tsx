"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookButton } from "@/components/booking/BookButton";
import { buttonClass } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { navLinks, site } from "@/data/site";

const MENU_ID = "mobile-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(navLinks[0].href);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Marks the section crossing the upper third of the screen as the current place in the navigation.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", close);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-ivory">
      <div className="frame flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#home"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          {/* The compact lockup (164 x 32), shown at its native size; the link's name stays in text. */}
          <Image src="/images/copper-crown-logo-dark.svg" alt="" width={164} height={32} unoptimized preload className="block h-8 w-auto" />
          <span className="sr-only">
            {site.name} {site.descriptor}, home
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current === link.href ? "location" : undefined}
                  className="relative inline-flex min-h-11 items-center text-small after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out-quint hover:after:origin-left hover:after:scale-x-100 aria-[current=location]:text-rose-deep aria-[current=location]:after:origin-left aria-[current=location]:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <BookButton className={buttonClass("copper", "min-h-12")}>Book an appointment</BookButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id={MENU_ID}
        aria-label="Mobile"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto overscroll-contain bg-blush transition-opacity duration-300 ease-out-quint starting:opacity-0 lg:hidden"
      >
        <div className="frame flex min-h-full flex-col justify-between gap-12 pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className="transition-[opacity,translate] duration-500 ease-out-quint starting:translate-y-5 starting:opacity-0"
                style={{ transitionDelay: `${60 + index * 50}ms` }}
              >
                <a
                  href={link.href}
                  aria-current={current === link.href ? "location" : undefined}
                  className="flex items-baseline justify-between py-1.5 text-[2.75rem] leading-[1.05] font-medium tracking-[-0.03em] aria-[current=location]:text-rose-deep"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <Icon name="arrowRight" className="size-6 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
          <div className="transition-opacity delay-300 duration-500 starting:opacity-0">
            <BookButton className={buttonClass("copper", "w-full")} onNavigate={() => setOpen(false)}>
              Book an appointment
            </BookButton>
            <p className="mt-4 text-small text-ink-soft">
              {site.address.street}, {site.address.city} · sample address
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
