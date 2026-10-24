import Image from "next/image";
import { BookButton } from "@/components/booking/BookButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { services } from "@/data/services";
import { formatPrice } from "@/lib/format";

// Deliberately unequal photo frames, cycled down the list (phone widths, then tablet, then wide desktop).
const frames = [
  {
    box: "w-full aspect-[4/5] sm:w-[15rem] xl:w-[17rem]",
    sizes: "(min-width: 80rem) 272px, (min-width: 40rem) 240px, 100vw",
  },
  {
    box: "ml-auto w-[70%] aspect-[3/2] sm:ml-0 sm:w-[20rem] xl:w-[22rem]",
    sizes: "(min-width: 80rem) 352px, (min-width: 40rem) 320px, 70vw",
  },
  {
    box: "w-[55%] aspect-square sm:w-[11.5rem] xl:w-[13rem]",
    sizes: "(min-width: 80rem) 208px, (min-width: 40rem) 184px, 55vw",
  },
];

const rowId = (id: string) => `service-${id}`;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="frame py-24 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 id="services-title" className="text-head">
            Services &amp; prices
          </h2>
          <p className="mt-6 max-w-[34ch]">
            Every appointment starts with a short consultation, so the plan fits your hair before anything is cut or
            coloured.
          </p>

          {/* The price list stays pinned on desktop once the heading scrolls away, so the left column is never empty. */}
          <div className="lg:sticky lg:top-28">
            <nav aria-label="Service prices" className="mt-10 hidden max-w-[34ch] lg:block">
              <ul className="flex flex-col gap-1">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${rowId(service.id)}`}
                      className="group -mx-2 flex min-h-10 items-baseline justify-between gap-6 px-2 py-1.5 no-underline transition-colors hover:bg-cream"
                    >
                      <span className="underline decoration-transparent underline-offset-[0.3em] transition-colors group-hover:decoration-charcoal">
                        {service.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-taupe">from {formatPrice(service.samplePrice)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <SampleNote className="mt-8 max-w-[34ch]">
              Prices are sample figures for this demo. Final prices would depend on hair length and the consultation.
            </SampleNote>
          </div>
        </div>

        <ul className="flex flex-col gap-20 lg:col-span-8 lg:gap-28">
          {services.map((service, index) => {
            const frame = frames[index % frames.length];
            return (
              <Reveal as="li" key={service.id} className="grid gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
                <div id={rowId(service.id)} className="max-w-[36ch] scroll-mt-28">
                  <h3 className="text-lead leading-tight">{service.name}</h3>
                  <p className="mt-4">{service.description}</p>
                  <p className="mt-5 text-taupe">
                    <span className="font-medium text-charcoal tabular-nums">
                      Sample price from {formatPrice(service.samplePrice)}
                    </span>{" "}
                    · {service.duration}
                  </p>
                  <BookButton
                    serviceId={service.id}
                    className="group mt-6 inline-flex min-h-11 items-center gap-2 text-small font-medium underline decoration-ash underline-offset-[0.35em] transition-colors hover:decoration-charcoal"
                  >
                    Book {service.name.toLowerCase()}
                    <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </BookButton>
                </div>
                <Reveal delay={90} className={`relative overflow-hidden bg-oat ${frame.box}`}>
                  <Image
                    src={service.photo.src}
                    alt={service.photo.alt}
                    fill
                    placeholder="blur"
                    sizes={frame.sizes}
                    className="object-cover transition-transform duration-700 ease-out-quint hover:scale-[1.03]"
                    style={{ objectPosition: service.photo.focus }}
                  />
                </Reveal>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
