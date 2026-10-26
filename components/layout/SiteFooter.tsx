"use client";

import { useSyncExternalStore } from "react";
import { imageCredits } from "@/data/credits";
import { navLinks, openingHours, site, socialLinks } from "@/data/site";

const footerLink =
  "underline decoration-paper/30 underline-offset-[0.3em] transition-colors duration-200 hover:text-paper hover:decoration-paper";

const subscribeNever = () => () => {};
const getYear = () => String(new Date().getFullYear());
const getYearServer = () => "2026";

/**
 * Single-file component for the dark ash/charcoal footer.
 * Features oversized display brand typography, architectural 4-column navigation,
 * clean credits disclosure, and client-side smooth back-to-top interaction.
 */
export function SiteFooter() {
  const currentYear = useSyncExternalStore(subscribeNever, getYear, getYearServer);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-clip bg-charcoal text-paper">
      {/* Subtle Ambient Decorative Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-ash/30 blur-3xl"
      />

      <div className="frame relative z-10 flex min-h-[90svh] flex-col justify-between pt-16 pb-[max(2rem,env(safe-area-inset-bottom))] lg:pt-24">
        {/* Top Section: Quick Summary & Back-to-Top Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-12">
          <div>
            <p className="text-lead font-medium text-paper tracking-tight">
              {site.name} <span className="text-paper-soft font-normal">· {site.descriptor}</span>
            </p>
            <p className="mt-1 text-small text-paper-soft max-w-[42ch]">
              A quiet studio for unhurried precision cutting, bespoke balayage, and natural textural care.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 bg-paper/10 px-5 py-3 text-small font-medium text-paper transition-[background-color,transform] duration-200 hover:bg-rose active:scale-95 cursor-pointer self-start sm:self-auto"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>

        {/* Middle Navigation & Directory Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-small sm:text-body lg:grid-cols-4 py-8">
          {/* Col 1: Studio Location */}
          <div className="space-y-2">
            <span className="block text-small uppercase tracking-wider text-paper/50">
              Studio
            </span>
            <p className="font-medium text-paper">{site.address.street}</p>
            <p className="text-paper-soft">
              {site.address.city}, {site.address.postcode}
            </p>
            <p className="pt-2">
              <a href={`mailto:${site.email}`} className={footerLink}>
                {site.email}
              </a>
            </p>
            <p className="text-small text-paper-soft pt-1">
              Call desk: {site.phone.display}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <nav aria-label="Footer Navigation">
            <span className="block text-small uppercase tracking-wider text-paper/50 mb-2">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Social Archives */}
          <div>
            <span className="block text-small uppercase tracking-wider text-paper/50 mb-2">
              Connect
            </span>
            <ul className="flex flex-col gap-2" aria-label="Social channels">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    <span>{social.label}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Schedule */}
          <div>
            <span className="block text-small uppercase tracking-wider text-paper/50 mb-2">
              Hours
            </span>
            <dl className="grid grid-cols-[auto_auto] justify-start gap-x-5 gap-y-1.5 text-small">
              {openingHours.map((row) => (
                <div key={row.days} className="contents">
                  <dt className="text-paper">{row.days}</dt>
                  <dd className="text-paper-soft text-right">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Giant Monolithic Masthead Typography */}
        <div className="pt-8">
          <p
            aria-hidden="true"
            translate="no"
            className="scroll-rise -ml-[0.04em] pb-[0.08em] text-[18.2vw] leading-[0.78] font-medium tracking-[-0.055em] text-paper/95 whitespace-nowrap select-none 2xl:text-[16.5rem]"
          >
            {site.name}
          </p>

          {/* Bottom Legal, Year & Photo Credits Drawer */}
          <div className="mt-8 flex flex-col gap-4 text-small text-paper-soft sm:flex-row sm:items-center sm:justify-between pt-6">
            <p>
              © {currentYear} {site.name} {site.descriptor}. Fictional studio craft demonstration.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
