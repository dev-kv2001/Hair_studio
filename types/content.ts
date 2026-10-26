import type { StaticImageData } from "next/image";

export type NavLink = {
  label: string;
  href: `#${string}`;
};

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position that keeps the hair in frame when the photo is cropped. */
  focus?: string;
};

export type ServiceId =
  | "haircuts"
  | "coloring"
  | "treatments"
  | "bridal"
  | "hair-spa"
  | "blowouts";

export type Service = {
  id: ServiceId;
  name: string;
  description: string;
  /** Sample starting price in GBP, shown as an example only. */
  samplePrice: number;
  duration: string;
  photo: Photo;
};

export type GalleryCategory = "Cuts" | "Colour" | "Styling" | "Texture";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  photo: Photo;
  notes?: string;
  technique?: string;
  duration?: string;
};

export type Stylist = {
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  photo: Photo;
};

export type OpeningHours = {
  days: string;
  hours: string;
};

export type Credit = {
  file: string;
  title: string;
  creator: string;
  license: string;
  page: string;
};
