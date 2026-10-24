import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { images } from "@/data/images";

const visit = [
  {
    title: "Talk first",
    text: "Ten minutes on your hair’s history, your routine and what you want to stop fighting.",
  },
  {
    title: "Wash and prepare",
    text: "A proper wash at a reclining basin, with treatment matched to what the consultation found.",
  },
  {
    title: "The work itself",
    text: "Cut, colour or styling done at an unhurried pace, with a check-in before anything permanent.",
  },
  {
    title: "Finish and aftercare",
    text: "We show you how to recreate it at home and tell you honestly when you’ll need us next.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-cream py-24 lg:py-40">
      <div className="frame grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <h2 id="about-title" className="text-head">
            A quiet room for good hair
          </h2>
          <div className="mt-8 flex max-w-[44ch] flex-col gap-5">
            <p>
              Ivory &amp; Ash began as an idea about pace: a studio where nobody is rushed out of the chair and every
              appointment leaves time to talk.
            </p>
            <p>
              The philosophy is simple. Work with the hair you have, choose shapes and colours that grow out
              gracefully, and only recommend what you will actually use.
            </p>
          </div>
          <SampleNote className="mt-6">A fictional studio story written for this demo.</SampleNote>
        </Reveal>

        <Reveal delay={90} as="figure" className="lg:col-span-6 lg:col-start-7 lg:mt-24">
          <div className="relative aspect-[16/10] overflow-hidden bg-oat">
            <Image
              src={images.combAndClipper}
              alt="A stylist lifts hair with a comb and trims it with clippers"
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>
          <figcaption className="mt-3 text-small text-taupe">A cut in progress, for illustration.</figcaption>
        </Reveal>

        <Reveal as="figure" className="w-[72%] sm:w-1/2 lg:col-span-3 lg:col-start-2 lg:w-auto">
          <div className="relative aspect-[4/5] overflow-hidden bg-oat">
            <Image
              src={images.cornrowsPortrait}
              alt="Neat straight-back cornrows on a seated man"
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 22vw, 72vw"
              className="object-cover"
              style={{ objectPosition: "50% 15%" }}
            />
          </div>
          <figcaption className="mt-3 text-small text-taupe">Straight-back cornrows.</figcaption>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-lead">How a visit unfolds</h3>
          <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {visit.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80}>
                <p className="font-medium">{step.title}</p>
                <p className="mt-2">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
