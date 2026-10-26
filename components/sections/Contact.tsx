"use client";

import Image from "next/image";
import { BookingForm } from "@/components/booking/BookingForm";
import { BOOKING_SECTION_ID } from "@/components/booking/constants";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { images } from "@/data/images";
import { directionsHref, openingHours, site, socialLinks } from "@/data/site";

/**
 * Editorial, spacious Contact & Appointment experience.
 * Incorporates an unhurried luxury salon atmosphere, integrated booking form,
 * interactive opening schedule, live directions, and rich craft details.
 */
export function Contact() {
  return (
    <section id={BOOKING_SECTION_ID} aria-labelledby="contact-title" className="relative overflow-clip bg-ivory py-24 lg:py-40">
      {/* Subtle Ambient Parallax Texture Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-blush/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-oat/50 blur-3xl"
      />

      <div className="frame relative z-10">
        {/* Editorial Masthead Header */}
        <header className="pb-16 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2
                  id="contact-title"
                  className="text-[clamp(2.75rem,1.2rem+4.5vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.035em] text-ink"
                >
                  Reserve a chair or say hello
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Reveal delay={80}>
                <p className="text-body text-ink-soft leading-relaxed">
                  Dedicated chairs, unrushed consultations, and tailored craft. Walk-ins are always welcomed whenever a chair is free.
                </p>
                <SampleNote className="mt-3 text-small">
                  Demo studio contact details &amp; interactive appointment form.
                </SampleNote>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Main Grid: Left Appointment Desk / Right Contact & Schedule */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-14">
          {/* Left Column: Direct Appointment Desk (BookingForm) */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="bg-oat/40 p-8 sm:p-12 transition-colors duration-500 hover:bg-oat/55">
                <div className="flex items-baseline justify-between gap-4 pb-6">
                  <div>
                    <h3 className="text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] leading-tight font-medium text-ink tracking-tight">
                      Request an appointment
                    </h3>
                    <p className="mt-2 text-small text-ink-soft">
                      Choose your service and preferred window. Our team coordinates timing directly with you.
                    </p>
                  </div>
                  <span className="hidden sm:inline-block text-small uppercase tracking-wider text-rose-deep font-medium">
                    Online Desk
                  </span>
                </div>

                <div className="mt-6">
                  <BookingForm variant="light" />
                </div>
              </div>
            </Reveal>

            {/* Quick Consultation Assurance */}
            <Reveal delay={120} className="mt-8">
              <div className="bg-blush/35 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-body font-medium text-ink">Prefer to speak directly?</h4>
                  <p className="mt-1 text-small text-ink-soft">
                    Call our desk during open hours at <strong className="text-ink font-medium">{site.phone.display}</strong>.
                  </p>
                </div>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center bg-ink px-6 py-2.5 text-small font-medium text-paper transition-transform duration-200 ease-out-quint hover:scale-[1.02] active:scale-95"
                >
                  Call the desk
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Studio Address, Schedule, Floor Photograph */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            {/* Studio Address Card */}
            <div className="space-y-6">
              <Reveal delay={60}>
                <h3 className="text-lead font-medium text-ink">Studio &amp; Location</h3>
                <address className="mt-4 not-italic space-y-4">
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-oat/45 p-6 transition-[background-color,transform] duration-300 hover:bg-oat/75 hover:translate-x-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lead font-medium text-ink">{site.address.street}</p>
                        <p className="text-small text-ink-soft mt-1">
                          {site.address.city}, {site.address.postcode}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-small font-medium text-rose-deep group-hover:underline underline-offset-4">
                        Directions
                        <Icon name="external" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={site.phone.href}
                      className="group bg-blush/30 p-5 transition-[background-color,transform] duration-300 hover:bg-blush/60 hover:translate-x-0.5"
                    >
                      <span className="text-small text-ink-soft">Telephone</span>
                      <p className="mt-1 text-body font-medium text-ink group-hover:text-rose-deep transition-colors">
                        {site.phone.display}
                      </p>
                    </a>

                    <a
                      href={`mailto:${site.email}`}
                      className="group bg-blush/30 p-5 transition-[background-color,transform] duration-300 hover:bg-blush/60 hover:translate-x-0.5"
                    >
                      <span className="text-small text-ink-soft">Direct email</span>
                      <p className="mt-1 text-body font-medium text-ink group-hover:text-rose-deep transition-colors break-all">
                        {site.email}
                      </p>
                    </a>
                  </div>
                </address>
              </Reveal>

              {/* Opening Hours Schedule */}
              <Reveal delay={100}>
                <div className="bg-oat/30 p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4 pb-4">
                    <h4 className="text-body font-medium text-ink">Opening hours</h4>
                    <span className="text-small text-ink-soft">Walk-ins welcomed</span>
                  </div>
                  <table className="w-full border-separate border-spacing-y-1.5 text-left text-small">
                    <caption className="sr-only">Studio opening schedule</caption>
                    <tbody>
                      {openingHours.map((row) => (
                        <tr key={row.days} className="group">
                          <th
                            scope="row"
                            className="bg-ivory/80 px-4 py-2.5 font-normal text-ink transition-colors group-hover:bg-ivory"
                          >
                            {row.days}
                          </th>
                          <td
                            className={`bg-ivory/80 px-4 py-2.5 text-right font-medium transition-colors group-hover:bg-ivory ${
                              row.hours === "Closed" ? "text-ink-soft/70" : "text-ink"
                            }`}
                          >
                            {row.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>

            {/* In-Studio Consultation Photograph */}
            <Reveal delay={140} as="figure" className="group relative overflow-clip bg-blush">
              <div className="relative aspect-[16/9] w-full overflow-clip">
                <Image
                  src={images.stylistConsultation}
                  alt="Stylist holding an unhurried, one-on-one hair consultation"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 64rem) 35vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
                  style={{ objectPosition: "50% 35%" }}
                />
              </div>
              <figcaption className="bg-oat/50 p-4 flex items-center justify-between text-small text-ink-soft">
                <span>One-on-one consultation before every appointment</span>
                <span className="text-rose-deep font-medium">Complimentary</span>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
