"use client";

import { useEffect, useRef, useState } from "react";
import { BookButton } from "@/components/booking/BookButton";
import { buttonClass } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { navLinks, site } from "@/data/site";

const MENU_ID = "mobile-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
        <a href="#home" className="font-display text-[1.5rem] leading-none tracking-[-0.02em] whitespace-nowrap" onClick={() => setOpen(false)}>
          <span translate="no">{site.name}</span>
          <span className="sr-only"> {site.descriptor}, home</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-small">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-[0.4em] decoration-transparent transition-colors hover:underline hover:decoration-charcoal">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <BookButton className={buttonClass("solid")}>Book an appointment</BookButton>
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
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto overscroll-contain bg-ivory lg:hidden"
      >
        <div className="frame flex min-h-full flex-col justify-between gap-12 pt-8 pb-10">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-2 font-display text-[2.5rem] leading-tight" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <BookButton className={buttonClass("solid", "w-full")} onNavigate={() => setOpen(false)}>
              Book an appointment
            </BookButton>
            <p className="mt-4 text-small text-taupe">
              {site.address.street}, {site.address.city} · sample address
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
