import { images } from "@/data/images";
import type { GalleryCategory, GalleryItem } from "@/types/content";

export const galleryCategories: GalleryCategory[] = ["Cuts", "Colour", "Styling", "Texture"];

export const galleryItems: GalleryItem[] = [
  {
    id: "cornrows",
    title: "Straight-back cornrows",
    category: "Texture",
    photo: { src: images.cornrowsPortrait, alt: "A man with neat straight-back cornrows, looking down", focus: "50% 20%" },
    technique: "Geometric scalp parting & natural tension feed-in",
    duration: "90 mins",
    notes: "Parted along cranial contours for balanced weight distribution and enduring scalp comfort without excess tension.",
  },
  {
    id: "balayage",
    title: "Honey balayage waves",
    category: "Colour",
    photo: { src: images.balayageWaves, alt: "Long wavy hair in honey and caramel balayage, seen from behind", focus: "50% 40%" },
    technique: "Freehand clay lightener & warm gloss saturation",
    duration: "150 mins",
    notes: "Diffused placement starting four inches off the root to ensure seamless grow-out over six to eight months.",
  },
  {
    id: "updo",
    title: "Textured wedding updo",
    category: "Styling",
    photo: { src: images.bridalUpdo, alt: "A loosely pinned, textured updo seen from behind", focus: "50% 35%" },
    technique: "Soft structural pin-curl foundation & matte mist",
    duration: "75 mins",
    notes: "Anchored internally with unseen grip pins while surface strands remain light, airy, and movement-responsive.",
  },
  {
    id: "clipper",
    title: "Comb-over taper",
    category: "Cuts",
    photo: { src: images.combAndClipper, alt: "Clippers and a comb shaping a short taper", focus: "50% 45%" },
    technique: "Scissor-over-comb gradient & natural nape neckline",
    duration: "45 mins",
    notes: "A graduated fade measured directly to head shape, blending seamlessly into textured top lengths.",
  },
  {
    id: "treatment-gloss",
    title: "Restorative gloss & treatment",
    category: "Colour",
    photo: { src: images.serviceTreatment, alt: "Gentle formulation of restorative botanical hair oil treatment", focus: "50% 35%" },
    technique: "Deep conditioning emulsion & cuticle sealing gloss",
    duration: "60 mins",
    notes: "Infused with lipid oils under gentle warmth to rebalance moisture levels and restore light-reflecting shine.",
  },
  {
    id: "blowout-volume",
    title: "Sculpted botanical blowout",
    category: "Styling",
    photo: { src: images.serviceBlowout, alt: "Stylist using round brush and blow dryer to sculpt luminous hair volume", focus: "50% 40%" },
    technique: "Boar-bristle round-brush tension & cool-shot setting",
    duration: "45 mins",
    notes: "Sections dried deliberately with tension to seal hair cuticles, resulting in silk volume that holds without stiff spray.",
  },
  {
    id: "precision-cut",
    title: "Bespoke perimeter bob",
    category: "Cuts",
    photo: { src: images.stylistPortraitCraft, alt: "Senior stylist holding precision shears with laser focus", focus: "50% 30%" },
    technique: "Clean zero-elevation perimeter & internal texturizing",
    duration: "60 mins",
    notes: "Measured while dry in natural head position, creating an unyielding perimeter line that maintains weight as it grows.",
  },
  {
    id: "curl-sculpting",
    title: "Hydrated curl definition",
    category: "Texture",
    photo: { src: images.stylistChairSerenity, alt: "Client in chair displaying soft, natural curl formation", focus: "50% 30%" },
    technique: "Individual curl grouping & diffuser air-drying",
    duration: "75 mins",
    notes: "Each wave grouping shaped wet with plant-based moisture balm to preserve spring and banish friction frizz.",
  },
];
