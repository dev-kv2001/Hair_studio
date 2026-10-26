import { GalleryWall } from "@/components/gallery/GalleryWall";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { galleryItems } from "@/data/gallery";

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="overflow-clip bg-blush py-24 lg:py-36">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-8">
            <h2 id="gallery-title" className="text-[clamp(2.75rem,1rem+6vw,7rem)] leading-[0.94] tracking-[-0.04em] text-ink font-medium">
              Cuts, colour and natural form
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-4 lg:self-end">
            <p className="max-w-[44ch] text-body text-ink-soft leading-relaxed">
              An unhurried visual archive of shapes, hand-blended tones, and organic textures. Select any record to inspect the technique and silhouette.
            </p>
            <SampleNote className="mt-3 max-w-[44ch] text-small">
              Real craft photography illustrating bespoke silhouettes and finishing textures.
            </SampleNote>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-16">
          <GalleryWall items={galleryItems} />
        </div>
      </div>
    </section>
  );
}
