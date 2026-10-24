import Image from "next/image";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { imageCredits } from "@/data/credits";
import { images } from "@/data/images";
import { navLinks, site, socialLinks } from "@/data/site";

const footerLink = "underline decoration-ivory/40 underline-offset-[0.3em] transition-colors hover:decoration-ivory";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-charcoal text-ivory">
      <Image
        src={images.balayageWaves}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover brightness-[0.36]"
        style={{ objectPosition: "50% 55%" }}
      />

      <div className="frame flex min-h-[88svh] flex-col justify-between gap-16 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-12">

        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p>
              {site.address.street}, {site.address.city}
            </p>
            <p>
              <a href={`mailto:${site.email}`} className={footerLink}>
                {site.email}
              </a>
            </p>
            <p className="mt-2 text-small text-ivory/80">Sample details for a fictional studio.</p>
          </div>
          <ul className="flex flex-col gap-1 sm:items-end" aria-label="Social links (placeholders)">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  {social.label}
                  <span className="sr-only"> (placeholder link, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            aria-hidden="true"
            translate="no"
            className="pb-[0.2em] font-display text-[clamp(3.5rem,15vw,15rem)] leading-[0.85] tracking-[-0.04em] whitespace-nowrap"
          >
            {site.name}
          </p>
          <div className="mt-6 flex flex-col gap-4 text-small text-ivory/80 sm:flex-row sm:items-start sm:justify-between">
            <p>
              © <CurrentYear /> {site.name} {site.descriptor}. A demo website with sample content.
            </p>
            <details className="sm:max-w-[60ch] sm:text-right">
              <summary className="cursor-pointer underline decoration-ivory/40 underline-offset-[0.3em]">
                Photo credits
              </summary>
              <ul className="mt-3 flex flex-col gap-1 text-left">
                {imageCredits.map((credit) => (
                  <li key={credit.file}>
                    <a href={credit.page} target="_blank" rel="noopener noreferrer" className={footerLink}>
                      “{credit.title}”
                    </a>{" "}
                    by {credit.creator}, {credit.license}, via Wikimedia Commons
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
}
