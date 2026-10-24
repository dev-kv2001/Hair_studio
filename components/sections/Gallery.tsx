import { GalleryWall } from "@/components/gallery/GalleryWall";
import { SampleNote } from "@/components/ui/SampleNote";
import { galleryItems } from "@/data/gallery";

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="frame py-24 lg:py-40">
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-8">
        <h2 id="gallery-title" className="text-head md:col-span-6">
          Cuts, colour and texture
        </h2>
        <div className="md:col-span-6 md:self-end lg:col-span-5 lg:col-start-8">
          <p className="max-w-[40ch]">
            A wall of styles to bring to a consultation. Filter by the kind of work, then open any photo to see it
            larger.
          </p>
          <SampleNote className="mt-4 max-w-[40ch]">
            Example photographs from open collections, not work by this fictional studio.
          </SampleNote>
        </div>
      </div>
      <div className="mt-12">
        <GalleryWall items={galleryItems} />
      </div>
    </section>
  );
}
