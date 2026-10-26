import { images } from "@/data/images";
import type { Stylist } from "@/types/content";

// Fictional stylists. The photos show hair work, not the people described.
export const stylists: Stylist[] = [
  {
    name: "Noa Hart",
    role: "Senior stylist",
    specialties: ["Precision cuts", "Short hair", "Men's grooming"],
    bio: "Likes clean lines, honest advice about upkeep and cuts that still look right on day thirty.",
    photo: { src: images.combAndClipper, alt: "A stylist lifts hair with a comb and trims it with clippers", focus: "50% 45%" },
  },
  {
    name: "Imre Vale",
    role: "Colour specialist",
    specialties: ["Balayage", "Grey blending", "Colour correction"],
    bio: "Plans colour around your skin, your routine and how often you actually want to come back.",
    photo: { src: images.balayageWaves, alt: "Long wavy hair coloured in soft honey balayage", focus: "50% 55%" },
  },
  {
    name: "Sasha Okoro",
    role: "Texture & occasion stylist",
    specialties: ["Curls and coils", "Braids", "Bridal styling"],
    bio: "Works with natural texture rather than against it, from wash-and-go curls to wedding-day sets.",
    photo: { src: images.bridalUpdo, alt: "A loosely pinned, textured updo seen from behind", focus: "50% 30%" },
  },
];
