"use client";

import { useSyncExternalStore } from "react";
import { imageCredits } from "@/data/credits";
import { navLinks, openingHours, site, socialLinks } from "@/data/site";

const footerLink =
  "underline decoration-paper/30 underline-offset-[0.3em] transition-colors duration-200 hover:text-paper hover:decoration-paper";

const subscribeNever = () => () => {};
const getYear = () => String(new Date().getFullYear());
const getYearServer = () => "2026";

const footerLabel = "block text-small text-paper-soft";

/**
 * The obsidian close: the studio in a line with a way back up, a four-part directory (studio, pages,
 * social, hours), the name margin to margin, and the legal line. Labels are sentence case in muted taupe;
 * everything a visitor reads or clicks is set at body size in full ivory.
 */
export function SiteFooter() {
  const currentYear = useSyncExternalStore(subscribeNever, getYear, getYearServer);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="overflow-clip bg-charcoal text-paper">
      <div className="frame flex min-h-[90svh] flex-col justify-between gap-16 pt-20 pb-[max(2rem,env(safe-area-inset-bottom))] lg:gap-20 lg:pt-28">
        {/* The studio in one line, and the way back up. */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lead leading-[1.15] font-medium tracking-[-0.02em]">
              {site.name}
              {/* En spaces: Erode's middle dot sits tight against the following letter with a normal space. */}
              <span className="font-normal text-paper-soft">&ensp;·&ensp;{site.descriptor}</span>
            </p>
            <p className="mt-3 max-w-[42ch] text-paper-soft">
              A quiet studio for unhurried precision cutting, bespoke balayage, and natural textural care.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex min-h-13 shrink-0 cursor-pointer items-center gap-3 self-start bg-paper/10 px-6 text-small font-medium text-paper transition-[background-color,transform] duration-200 hover:bg-rose-deep active:scale-95 sm:self-auto"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>

        {/* The directory: studio and hours run full width on phones, with pages and social side by side between. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <span className={footerLabel}>Studio</span>
            <p className="mt-4">{site.address.street}</p>
            <p className="text-paper-soft">
              {site.address.city}, {site.address.postcode}
            </p>
            <p className="mt-4">
              <a href={`mailto:${site.email}`} className={footerLink}>
                {site.email}
              </a>
            </p>
            <p className="mt-1 text-paper-soft">Call desk: {site.phone.display}</p>
          </div>

          <nav aria-label="Footer Navigation" className="lg:col-span-2">
            <span className={footerLabel}>Navigation</span>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <span className={footerLabel}>Connect</span>
            <ul className="mt-4 flex flex-col gap-2" aria-label="Social channels">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className={footerLink}>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <span className={footerLabel}>Hours</span>
            <dl className="mt-4 grid max-w-[26rem] grid-cols-[1fr_auto] gap-x-6 gap-y-2">
              {openingHours.map((row) => (
                <div key={row.days} className="contents">
                  <dt>{row.days}</dt>
                  <dd className="text-right text-paper-soft tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* The name returns margin to margin (sized from its measured width, as in the hero), then the legal line. */}
        <div>
          <p
            aria-hidden="true"
            translate="no"
            className="scroll-rise -ml-[0.045em] pb-[0.08em] text-[min(14.7vw,13.2rem)] leading-[0.78] font-medium tracking-[-0.055em] whitespace-nowrap text-paper/95 select-none"
          >
            {site.name}
          </p>

          <p className="mt-10 text-small text-paper-soft">
            © {currentYear} {site.name} {site.descriptor}. Fictional studio craft demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
