import { images } from "@/data/images";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "haircuts",
    name: "Haircuts & styling",
    description:
      "A consultation, a cut shaped to how your hair grows and falls, and a finish you can repeat at home.",
    samplePrice: 48,
    duration: "45–60 min",
    photo: {
      src: images.combAndClipper,
      alt: "A stylist lifts hair with a comb and trims it with clippers",
      focus: "50% 45%",
    },
  },
  {
    id: "coloring",
    name: "Hair colouring",
    description:
      "Gloss, highlights, balayage or a full change, mixed for your skin tone and planned around upkeep.",
    samplePrice: 85,
    duration: "2–3 hrs",
    photo: {
      src: images.balayageWaves,
      alt: "Long wavy hair in honey and caramel balayage, seen from behind",
      focus: "50% 35%",
    },
  },
  {
    id: "treatments",
    name: "Hair treatments",
    description:
      "Bond repair, hydration and scalp care for hair that feels dry, coloured, heat-tired or fragile.",
    samplePrice: 40,
    duration: "30–45 min",
    photo: {
      src: images.cornrowsPortrait,
      alt: "Neat straight-back cornrows on a seated man",
      focus: "50% 12%",
    },
  },
  {
    id: "bridal",
    name: "Bridal & occasion styling",
    description:
      "Updos, soft waves and polished sets, with a trial beforehand so the day itself feels calm.",
    samplePrice: 120,
    duration: "90 min + trial",
    photo: {
      src: images.bridalUpdo,
      alt: "A textured, pinned wedding updo seen from behind",
      focus: "50% 30%",
    },
  },
  {
    id: "hair-spa",
    name: "Hair spa",
    description:
      "A slow wash, scalp massage and steam-assisted mask: an hour to sit back while your hair recovers.",
    samplePrice: 55,
    duration: "60 min",
    photo: {
      src: images.balayageWaves,
      alt: "The soft, wavy lengths of long honey balayage hair",
      focus: "50% 75%",
    },
  },
  {
    id: "blowouts",
    name: "Blowouts",
    description:
      "Smooth, bouncy or sleek, a professional blow-dry that lasts, before an evening out or a long week.",
    samplePrice: 35,
    duration: "30–45 min",
    photo: {
      src: images.balayageWaves,
      alt: "Long wavy hair in honey and caramel balayage, seen from behind",
      focus: "50% 40%",
    },
  },
];
