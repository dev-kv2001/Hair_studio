"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { images } from "@/data/images";
import { stylists } from "@/data/people";
import { services } from "@/data/services";
import { openingHours, site } from "@/data/site";
import { formatPrice } from "@/lib/format";

/**
 * Professional hairstylist profiles featuring individual portraits,
 * specialization details, and behind-the-chair craft photography.
 */
const teamMembers = [
  {
    name: "Noa Hart",
    role: "Senior stylist & precision cutter",
    experience: "12 years craft",
    specialty: "Precision cuts, bespoke silhouettes, men's grooming",
    bio: "Focuses on clean growth lines and structure that continues to sit naturally thirty days after your appointment.",
    portrait: images.stylistNoaHart,
    workingShot: images.stylistPortraitCraft,
    focus: "50% 25%",
  },
  {
    name: "Imre Vale",
    role: "Colour specialist & balayage artist",
    experience: "9 years craft",
    specialty: "Soft balayage, low-contrast grey blending, restorative gloss",
    bio: "Formulates dimensional shades matched to skin undertones, routine demands, and realistic salon intervals.",
    portrait: images.stylistImreVale,
    workingShot: images.stylistConsultation,
    focus: "50% 20%",
  },
  {
    name: "Sasha Okoro",
    role: "Texture & occasion stylist",
    experience: "10 years craft",
    specialty: "Curls, organic wave sculpting, occasion sets, bridal styling",
    bio: "Works with natural wave and coil patterns, shaping volume without heat exhaustion or harsh tension.",
    portrait: images.stylistSashaOkoro,
    workingShot: images.stylistChairSerenity,
    focus: "50% 22%",
  },
];

const studioPrinciples = [
  {
    heading: "Pace over volume",
    text: "Only four client chairs in the studio. No double-booking and no overlapping appointments.",
  },
  {
    heading: "Work with natural texture",
    text: "We cut to follow the grain and natural fall of your hair rather than fighting against its movement.",
  },
  {
    heading: "Honest aftercare",
    text: "Transparent recommendations. We only suggest products and techniques you will actually use at home.",
  },
];

const numberWords = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const lowestPrice = Math.min(...services.map((service) => service.samplePrice));
const openRows = openingHours.filter((row) => row.hours !== "Closed");
const openDays = `${openRows[0]?.days.split(" ")[0]} to ${openRows.at(-1)?.days.split(" ").at(-1)}`;

const facts = [
  { label: "Based in", value: site.address.city },
  { label: "Open", value: openDays },
  { label: "Resident stylists", value: numberWords[stylists.length] ?? String(stylists.length) },
  { label: "Full services", value: `${numberWords[services.length] ?? services.length}, from ${formatPrice(lowestPrice)}` },
  { label: "Studio chairs", value: "Four dedicated" },
  { label: "Consultation", value: "Complimentary with every visit" },
];

export function About() {
  const [activeStylist, setActiveStylist] = useState(0);

  const currentStylist = teamMembers[activeStylist];

  return (
    <section id="about" aria-labelledby="about-title" className="bg-ivory py-24 lg:py-40">
      <div className="frame">
        {/* Editorial Masthead Header without eyebrow badge */}
        <header className="pb-12 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2
                  id="about-title"
                  className="text-[clamp(2.5rem,1.4rem+4vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.035em] text-ink"
                >
                  A quiet room for good hair
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Reveal delay={90}>
                <p className="text-small text-ink-soft">
                  Unrushed craft, personal consultation, and calm precision in every single appointment.
                </p>
                <SampleNote className="mt-2 text-small">Fictional studio story and professional visual placeholders.</SampleNote>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Brand Storytelling & Editorial Spread */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-12">
          {/* Left Column: Key Facts & Studio Commitments */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="bg-oat/50 p-6">
                <h3 className="text-body font-medium text-ink">
                  Studio Record
                </h3>
                <dl className="mt-6 flex flex-col gap-4 text-small">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-ink-soft">{fact.label}</dt>
                      <dd className="font-medium text-ink text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Principles Column */}
            <div className="mt-10 space-y-4">
              <Reveal delay={60}>
                <h3 className="text-body font-medium text-ink px-1">
                  Core Philosophy
                </h3>
              </Reveal>
              {studioPrinciples.map((principle, idx) => (
                <Reveal key={principle.heading} delay={100 + idx * 60}>
                  <div className="bg-blush/40 p-5 transition-colors duration-300 hover:bg-blush/70">
                    <p className="text-body font-medium text-ink">{principle.heading}</p>
                    <p className="mt-2 text-small leading-relaxed text-ink-soft">{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Lead & Main Editorial Visual */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <Reveal delay={90}>
                <p className="text-lead leading-[1.35] text-ink font-normal text-wrap:pretty">
                  {site.name} began as a deliberate reaction to the rushed salon assembly line. We built an intentional studio where nobody is hurried out of the chair, appointments never overlap, and every client receives ten uninterrupted minutes to speak about their hair before water touches the basin.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-8 grid gap-8 sm:grid-cols-2 text-body leading-relaxed text-ink-soft">
                  <p>
                    Our approach is grounded in working with the hair you naturally possess. We sculpt shapes and formulate color profiles designed to grow out gracefully over months, not just look presentable for tomorrow morning.
                  </p>
                  <p>
                    From specialized texture cutting to low-contrast grey blending, our resident stylists value quiet endurance over seasonal novelty. We tell you honestly what your routine requires, and recommend only what you will genuinely use.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Large Editorial Photograph with Scroll Parallax Drift */}
            <div className="mt-14">
              <Reveal as="figure" variant="shutter">
                <div className="relative aspect-[16/10] overflow-clip bg-blush">
                  <div className="scroll-drift absolute inset-0">
                    <Image
                      src={images.salonCandidFloor}
                      alt="Candid view of professional hairstylists at work on the salon floor"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 64rem) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out-quint hover:scale-[1.02]"
                      style={{ objectPosition: "50% 50%" }}
                    />
                  </div>
                </div>
                <figcaption className="mt-3.5 flex items-center justify-between text-small text-ink-soft">
                  <span>The studio floor: unhurried appointments and individualized attention per chair.</span>
                  <span className="text-small opacity-75">Studio snapshot</span>
                </figcaption>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Feature: The Resident Stylists Behind the Chair */}
        <div className="mt-28 lg:mt-36">
          <Reveal>
            <div className="max-w-[48ch]">
              <h3 className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.025em] text-ink">
                The stylists behind the chair
              </h3>
              <p className="mt-4 text-body text-ink-soft">
                Experienced practitioners dedicated to unhurried care. Each stylist brings specialized focus to cutting geometry, textural integrity, or dimensional colour.
              </p>
            </div>
          </Reveal>

          {/* Stylist Interactive Portrait & Craft Stage */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-12">
            {/* Left: Stylist Selector & Narrative Bio */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {teamMembers.map((member, idx) => {
                const isSelected = activeStylist === idx;
                return (
                  <Reveal key={member.name} delay={idx * 60}>
                    <button
                      type="button"
                      onClick={() => setActiveStylist(idx)}
                      className={`w-full text-left p-5 transition-[background-color,color,transform] duration-300 ease-out-quint cursor-pointer ${
                        isSelected
                          ? "bg-oat text-ink translate-x-1"
                          : "bg-oat/30 text-ink-soft hover:bg-oat/60 hover:text-ink"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-lead font-medium">{member.name}</span>
                        <span className="text-small text-ink-soft">{member.experience}</span>
                      </div>
                      <p className="mt-1 text-small font-medium text-rose-deep">{member.role}</p>
                      <p className="mt-3 text-small leading-relaxed text-ink-soft">
                        {member.bio}
                      </p>
                      <p className="mt-3 text-small text-ink font-medium">
                        Focus: {member.specialty}
                      </p>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Right: Dual Visual Focus (Portrait + Work Action) */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Portrait */}
                  <figure className="group flex flex-col">
                    <div className="relative aspect-[3/4] overflow-clip bg-blush">
                      <Image
                        key={`${currentStylist.name}-portrait`}
                        src={currentStylist.portrait}
                        alt={`Portrait of hairstylist ${currentStylist.name}`}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 64rem) 28vw, 85vw"
                        className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                        style={{ objectPosition: currentStylist.focus }}
                      />
                    </div>
                    <figcaption className="mt-3 text-small text-ink-soft">
                      <span className="font-medium text-ink">{currentStylist.name}</span> · {currentStylist.role}
                    </figcaption>
                  </figure>

                  {/* Behind-the-chair working shot */}
                  <figure className="group flex flex-col">
                    <div className="relative aspect-[3/4] overflow-clip bg-blush">
                      <Image
                        key={`${currentStylist.name}-craft`}
                        src={currentStylist.workingShot}
                        alt={`Stylist at work in the studio salon`}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 64rem) 28vw, 85vw"
                        className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                        style={{ objectPosition: "50% 35%" }}
                      />
                    </div>
                    <figcaption className="mt-3 text-small text-ink-soft">
                      In-studio technique and tailored styling
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
