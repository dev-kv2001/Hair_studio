import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { images } from "@/data/images";
import { testimonials } from "@/data/people";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-cream py-24 lg:py-40">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <h2 id="reviews-title" className="text-head">
            Example client notes
          </h2>
          <SampleNote className="mt-4 max-w-[44ch]">
            Demo testimonials written for this sample site. They are not real reviews and no real clients are quoted.
          </SampleNote>

          <Reveal as="figure" className="mt-14">
            <blockquote className="max-w-[38ch] font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.25]">
              <p>{lead.quote}</p>
            </blockquote>
            <figcaption className="mt-6 text-small">
              {lead.author} <span className="text-taupe">· {lead.service} · demo text</span>
            </figcaption>
          </Reveal>
        </div>

        <Reveal
          as="figure"
          className="w-[72%] sm:w-1/2 lg:col-span-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-auto"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-oat">
            <Image
              src={images.bridalUpdo}
              alt="A loosely pinned, textured updo seen from behind"
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 30vw, 72vw"
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
          <figcaption className="mt-3 text-small text-taupe">A wedding updo, for illustration.</figcaption>
        </Reveal>

        <ul className="grid gap-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-x-8">
          {rest.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.author} delay={index * 90}>
              <figure>
                <blockquote className="max-w-[36ch]">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-4 text-small">
                  {testimonial.author} <span className="text-taupe">· {testimonial.service} · demo text</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
