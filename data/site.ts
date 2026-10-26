import type { NavLink, OpeningHours } from "@/types/content";

// Every business detail below is a placeholder for this demo site.
export const site = {
  name: "Copper & Crown",
  descriptor: "Hair Studio",
  address: {
    street: "12 Example Street",
    city: "Sample Town",
    postcode: "AB1 2CD",
  },
  // 020 7946 0xxx is an Ofcom range reserved for fictional use.
  phone: { display: "020 7946 0123", href: "tel:+442079460123" },
  email: "hello@example.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const openingHours: OpeningHours[] = [
  { days: "Monday", hours: "Closed" },
  { days: "Tuesday – Wednesday", hours: "9:30 – 18:00" },
  { days: "Thursday – Friday", hours: "9:30 – 20:00" },
  { days: "Saturday", hours: "9:00 – 17:00" },
  { days: "Sunday", hours: "10:00 – 16:00" },
];

export const socialLinks = [
  { label: "Instagram", href: "#home" },
  { label: "Pinterest", href: "#home" },
  { label: "TikTok", href: "#home" },
];

const fullAddress = `${site.address.street}, ${site.address.city} ${site.address.postcode}`;

export const directionsHref = `https://www.openstreetmap.org/search?query=${encodeURIComponent(fullAddress)}`;
