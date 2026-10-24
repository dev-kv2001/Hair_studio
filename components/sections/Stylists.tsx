import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { stylists } from "@/data/people";

// Staggered starts so the three profiles hang at different heights, like prints.
const offsets = ["", "lg:mt-32", "lg:mt-14"];
const phoneWidths = ["w-[78%]", "ml-auto w-[78%]", "w-[78%]"];

export function Stylists() {
  return (
    <section id="stylists" aria-labelledby="stylists-title" className="frame py-24 lg:py-40">
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-8">
        <h2 id="stylists-title" className="text-head md:col-span-6 lg:col-span-7">
          Meet the stylists
        </h2>
        <SampleNote className="max-w-[40ch] md:col-span-6 md:self-end lg:col-span-4 lg:col-start-9">
          Fictional profiles for this demo. Photos show the kind of work each specialises in, not the people
          themselves.
        </SampleNote>
      </div>

      <ul className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-x-8">
        {stylists.map((stylist, index) => (
          <Reveal as="li" key={stylist.name} delay={index * 90} className={`${offsets[index]} ${phoneWidths[index]} lg:ml-0 lg:w-auto`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-oat">
              <Image
                src={stylist.photo.src}
                alt={stylist.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 64rem) 30vw, 78vw"
                className="object-cover"
                style={{ objectPosition: stylist.photo.focus }}
              />
            </div>
            <h3 className="mt-6 text-lead">{stylist.name}</h3>
            <p className="mt-1 text-small text-taupe">{stylist.role} · fictional profile</p>
            <p className="mt-4 max-w-[38ch]">{stylist.bio}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-small" aria-label={`${stylist.name}’s specialties`}>
              {stylist.specialties.map((specialty) => (
                <li key={specialty}>{specialty}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
