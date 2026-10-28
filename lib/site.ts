export const SITE = {
  name: "The Concours Garage",
  legalName: "The Concours Garage LLC",
  tagline: "A private home for exceptional automobiles",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://theconcoursgaragellc.com").replace(/\/$/, ""),
  phone: "+19546098662",
  phoneDisplay: "(954) 609-8662",
  email: "info@concoursgarage.com",
  address: {
    street: "2120 SE Ray's Way",
    city: "Stuart",
    region: "FL",
    postalCode: "34994",
    country: "US",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=2120+SE+Ray%27s+Way%2C+Stuart%2C+FL+34994",
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

/**
 * Cars & Coffee schedule. Held on the third `weekday` of every month.
 * TODO(owner): confirm the day (Saturday or Sunday) and the hours before launch.
 */
export const CARS_AND_COFFEE = {
  weekday: "Saturday" as "Saturday" | "Sunday",
  start: "08:00",
  end: "11:00",
  timeDisplay: "8:00 – 11:00 AM",
  charity: "Community Table",
};

/** Cars & Coffee gallery. Files live in public/images/cars-and-coffee/ (first six are shown). */
export const EVENT_PHOTOS: { src: string; alt: string }[] = [
  { src: "/images/cars-and-coffee/lineup.jpg", alt: "Exotic cars lined up along The Concours Garage building during Cars & Coffee" },
  { src: "/images/cars-and-coffee/porsche-row.jpg", alt: "A row of Porsche 911s and a Cayman GT4 at Cars & Coffee" },
  { src: "/images/cars-and-coffee/hoods-up.jpg", alt: "Guests looking over cars with their hoods open at Cars & Coffee" },
  { src: "/images/cars-and-coffee/morning-crowd.jpg", alt: "Guests mingling among supercars on a Cars & Coffee morning" },
  { src: "/images/cars-and-coffee/rolls-miura.jpg", alt: "Rolls-Royce Dawn and Lamborghini Miura outside The Concours Garage" },
  { src: "/images/lounge.jpg", alt: "The client lounge at The Concours Garage with a window into the garage" },
];

export const EVENT_HERO = {
  src: "/images/cars-and-coffee/arrivals.jpg",
  alt: "An Audi R8 arriving at Cars & Coffee as guests gather among rows of exotic cars",
};

export const NAV = [
  { href: "/#garage", label: "The Garage" },
  { href: "/#storage", label: "Storage" },
  { href: "/#detailing", label: "Detailing" },
  { href: "/#vehicle-care", label: "Vehicle Care" },
  { href: "/#collection", label: "Gallery" },
  { href: "/cars-and-coffee", label: "Cars & Coffee" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
