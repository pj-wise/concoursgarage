import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "The Concours Garage | Private Car Storage & Concours Detailing in Stuart, FL",
    template: "%s | The Concours Garage",
  },
  description:
    "Discreet, climate-controlled collector car storage, concours detailing, maintenance and concierge care in Stuart, Florida. Serving collectors throughout South Florida. By appointment only.",
  keywords: [
    "collector car storage Stuart FL",
    "climate-controlled car storage",
    "exotic car storage South Florida",
    "concours detailing",
    "classic car storage Treasure Coast",
    "Cars and Coffee Stuart FL",
  ],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: "/",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Three classic and modern Ferraris inside The Concours Garage" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  description:
    "Private, climate-controlled storage, concours detailing, maintenance and concierge care for exceptional automobiles.",
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/images/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  areaServed: ["Stuart, FL", "Treasure Coast", "Palm Beach County", "South Florida"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "By appointment only, seven days a week",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  hasMap: SITE.mapsUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={businessJsonLd} />
      </body>
    </html>
  );
}
