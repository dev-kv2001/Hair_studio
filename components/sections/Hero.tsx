import { BookButton } from "@/components/booking/BookButton";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { buttonClass } from "@/components/ui/button";
import { SampleNote } from "@/components/ui/SampleNote";
import { images } from "@/data/images";
import { site } from "@/data/site";

const slides = [
  { src: images.balayageWaves, alt: "Long wavy hair in honey and caramel balayage, seen from behind", focus: "50% 40%", caption: "Honey balayage waves" },
  { src: images.bridalUpdo, alt: "A loosely pinned, textured updo seen from behind", focus: "50% 35%", caption: "Textured wedding updo" },
  { src: images.cornrowsPortrait, alt: "Neat straight-back cornrows on a seated man", focus: "50% 12%", caption: "Straight-back cornrows" },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="frame pt-8 pb-24 lg:pb-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col gap-10 lg:col-span-7 lg:min-h-[calc(100svh-6.5rem)] lg:justify-between lg:pt-8">
          <h1 id="hero-title" className="text-display">
            Hair, cut to your character.
          </h1>
          <div>
            <p className="max-w-[30ch] text-lead">
              {site.name} is a hair studio for cuts, colour, treatments and occasion styling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className={buttonClass("solid")}>Book an appointment</BookButton>
              <a href="#services" className={buttonClass("outline")}>
                Explore services
              </a>
            </div>
            <SampleNote className="mt-10 max-w-[40ch]">
              {site.name} is a fictional studio. Prices, people and contact details on this page are samples.
            </SampleNote>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:-mr-[clamp(1rem,5vw,4.5rem)]">
          <HeroSlideshow slides={slides} />
        </div>
      </div>
    </section>
  );
}
