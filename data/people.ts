import { images } from "@/data/images";
import type { Stylist, Testimonial } from "@/types/content";

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

// Demo testimonials written for this sample site. They are not real reviews.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I came in with a photo and left with something better suited to my hair. The trial made the wedding morning calm.",
    author: "Demo client A",
    service: "Bridal & occasion styling",
  },
  {
    quote: "First colour appointment where someone asked how often I’d realistically come back. It grew out beautifully.",
    author: "Demo client B",
    service: "Hair colouring",
  },
  {
    quote: "Quick, careful and no hard sell on products. The cut still sits right weeks later.",
    author: "Demo client C",
    service: "Haircuts & styling",
  },
];
