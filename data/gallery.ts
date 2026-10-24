import { images } from "@/data/images";
import type { GalleryCategory, GalleryItem } from "@/types/content";

export const galleryCategories: GalleryCategory[] = ["Cuts", "Colour", "Styling", "Texture"];

export const galleryItems: GalleryItem[] = [
  {
    id: "cornrows",
    title: "Straight-back cornrows",
    category: "Texture",
    photo: { src: images.cornrowsPortrait, alt: "A man with neat straight-back cornrows, looking down", focus: "50% 20%" },
  },
  {
    id: "balayage",
    title: "Honey balayage waves",
    category: "Colour",
    photo: { src: images.balayageWaves, alt: "Long wavy hair in honey and caramel balayage, seen from behind", focus: "50% 40%" },
  },
  {
    id: "updo",
    title: "Textured wedding updo",
    category: "Styling",
    photo: { src: images.bridalUpdo, alt: "A loosely pinned, textured updo seen from behind", focus: "50% 35%" },
  },
  {
    id: "clipper",
    title: "Comb-over taper",
    category: "Cuts",
    photo: { src: images.combAndClipper, alt: "Clippers and a comb shaping a short taper", focus: "50% 45%" },
  },
];
