import { BookButton } from "@/components/booking/BookButton";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { buttonClass } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import heroSalon1 from "@/public/images/hero-salon-1.jpg";
import heroSalon2 from "@/public/images/hero-salon-2.jpg";
import heroSalon3 from "@/public/images/hero-salon-3.jpg";

// Three salon interiors (Unsplash, stored locally in public/images), shown as a slow crossfading background.
const slides = [
  {
    src: heroSalon1,
    alt: "A long salon floor with round backlit mirrors, black styling chairs and a polished marble floor",
    focus: "50% 55%",
    caption: "Round mirrors and marble floors",
  },
  {
    src: heroSalon2,
    alt: "A black-and-white salon with styling chairs facing tall mirrors between large windows",
    focus: "55% 60%",
    caption: "Styling stations by the windows",
  },
  {
    src: heroSalon3,
    alt: "Wash basins and tufted leather chairs in front of a row of styling stations",
    focus: "50% 60%",
    caption: "Wash basins and styling chairs",
  },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * A full-screen hero: the work moves edge to edge behind the type, the headline and booking action sit
 * in the middle band, and the studio's name runs margin to margin along the bottom edge as the monument.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-clip bg-ash text-paper"
    >
      <HeroSlideshow slides={slides}>
        {/* The headline block centres in the space left above the monument; the top padding clears the slide controls. */}
        <div className="frame flex flex-1 flex-col justify-end pt-36 pb-[clamp(1.5rem,5svh,3.5rem)]">
          <div className="my-auto grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <h1 id="hero-title" className="text-[clamp(2.75rem,1.2rem+5.2vw,6.25rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-7">
              <span className="mask-line">
                <span className="load-line">Hair, cut to</span>
              </span>
              <span className="mask-line">
                <span className="load-line" style={line(1)}>
                  your character.
                </span>
              </span>
            </h1>

            <div className="lg:col-span-5 lg:col-start-8 lg:pb-3">
              <p className="load-rise max-w-[34ch] text-lead leading-[1.3]" style={delay(480)}>
                {site.name} is a hair studio for cuts, colour, treatments and occasion styling.
              </p>
              <div className="load-rise mt-7 flex flex-wrap gap-3" style={delay(580)}>
                <BookButton className={buttonClass("light")}>
                  Book an appointment
                  <Icon name="arrowRight" className="size-4 transition-transform duration-300 ease-out-quint group-hover/button:translate-x-1" />
                </BookButton>
                <a href="#services" className={buttonClass("ghost")}>
                  Explore services
                </a>
              </div>
              <p className="load-rise mt-6 max-w-[40ch] text-small text-paper-soft" style={delay(680)}>
                {site.name} is a fictional studio. Prices, people and contact details on this page are samples.
              </p>
            </div>
          </div>

          {/* The monument: the name, margin to margin, rising last. The bar and h1 already name the studio. */}
          <p
            aria-hidden="true"
            translate="no"
            className="mt-8 -ml-[0.045em] text-[min(14.7vw,24.1svh,13.2rem)] leading-[0.92] font-medium tracking-[-0.055em] whitespace-nowrap lg:mt-4 [@media(max-height:780px)]:text-[min(14.7vw,20.65svh,13.2rem)]"
          >
            <span className="mask-line pb-[0.24em]!">
              <span className="load-line" style={line(3)}>
                {site.name}
              </span>
            </span>
          </p>
        </div>
      </HeroSlideshow>
    </section>
  );
}
