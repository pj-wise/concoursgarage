import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { NextEventDate } from "@/components/NextEventDate";
import { Reveal } from "@/components/Reveal";
import { ADDRESS_LINE, CARS_AND_COFFEE, EVENT_HERO, EVENT_PHOTOS, SITE } from "@/lib/site";

const { weekday, timeDisplay, charity } = CARS_AND_COFFEE;

export const metadata: Metadata = {
  title: "Cars & Coffee in Stuart, FL — Monthly at The Concours Garage",
  description: `Monthly Cars & Coffee at The Concours Garage in Stuart, Florida — the third ${weekday} of every month, ${timeDisplay}. Modern and exotic cars at a private venue. RSVP required; all proceeds benefit ${charity}.`,
  alternates: { canonical: "/cars-and-coffee" },
  openGraph: {
    title: "Cars & Coffee at The Concours Garage — Stuart, FL",
    description: `The third ${weekday} of every month. Limited space — RSVP to attend or submit your car to be featured. All proceeds benefit ${charity}.`,
    url: "/cars-and-coffee",
  },
};

const STEPS = [
  {
    title: "RSVP",
    body: "We keep the morning intimate. Reserve your spot ahead of time and we'll confirm with arrival details.",
  },
  {
    title: "Submit your car",
    body: "Want to show? Tell us about your car. Each month we select a small group of owners whose cars are featured inside.",
  },
  {
    title: "Give back",
    body: `Every dollar raised goes to ${charity}, a local Stuart charity. Good cars, good coffee, good cause.`,
  },
];

const FAQ = [
  {
    q: "When is Cars & Coffee?",
    a: `The third ${weekday} of every month, ${timeDisplay}, at The Concours Garage, ${ADDRESS_LINE}.`,
  },
  {
    q: "Do I need to RSVP?",
    a: "Yes. The Concours Garage is a private facility with limited space, so every guest is asked to RSVP in advance. Walk-ups may not be admitted once we reach capacity.",
  },
  {
    q: "Can I show my car?",
    a: "Absolutely — submit your car through the form on this page. We review every submission and select the cars featured each month. Guests who aren't featured are welcome to park in guest parking and enjoy the show.",
  },
  {
    q: "Where do the proceeds go?",
    a: `All proceeds go to ${charity}, a local charity right here in Stuart.`,
  },
];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Cars & Coffee at The Concours Garage",
  description: `A monthly morning of modern and exotic automobiles at a private venue in Stuart, Florida. RSVP required. All proceeds benefit ${charity}.`,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  image: [`${SITE.url}${EVENT_HERO.src}`, `${SITE.url}/images/og.jpg`],
  url: `${SITE.url}/cars-and-coffee`,
  eventSchedule: {
    "@type": "Schedule",
    repeatFrequency: "P1M",
    byDay: `https://schema.org/${weekday}`,
    byMonthWeek: 3,
    startTime: CARS_AND_COFFEE.start,
    endTime: CARS_AND_COFFEE.end,
    scheduleTimezone: "America/New_York",
  },
  location: {
    "@type": "Place",
    name: SITE.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  },
  organizer: { "@id": `${SITE.url}/#business`, "@type": "Organization", name: SITE.name, url: SITE.url },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function CarsAndCoffeePage() {
  return (
    <>
      <section className="hero hero--event" aria-labelledby="cc-title">
        <Image
          src={EVENT_HERO.src}
          alt={EVENT_HERO.alt}
          fill
          priority
          sizes="100vw"
          className="hero__img hero__img--event"
        />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--gold hero__kicker">Monthly · Stuart, Florida</p>
          <h1 id="cc-title" className="hero__title">
            Cars &amp; Coffee
          </h1>
          <p className="hero__sub hero__sub--wide">
            Come join us the third week of every month for Cars &amp; Coffee at The Concours Garage.
          </p>
          <NextEventDate />
          <div className="hero__actions">
            <a href="#rsvp" className="btn">
              RSVP
            </a>
            <a href="#submit" className="btn btn--ghost">
              Submit your car
            </a>
          </div>
        </div>
        <div className="hero__foot">
          <span>RSVP required · Limited space</span>
          <a href="#details">Scroll</a>
        </div>
      </section>

      <section id="details" className="details" aria-label="Event details">
        <dl className="details__grid">
          <Reveal className="details__item">
            <dt>When</dt>
            <dd>
              Third {weekday} of every month
              <br />
              {timeDisplay}
            </dd>
          </Reveal>
          <Reveal className="details__item" delay={80}>
            <dt>Where</dt>
            <dd>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </a>
            </dd>
          </Reveal>
          <Reveal className="details__item" delay={160}>
            <dt>Admission</dt>
            <dd>
              RSVP required
              <br />
              Limited space
            </dd>
          </Reveal>
          <Reveal className="details__item" delay={240}>
            <dt>Benefiting</dt>
            <dd>
              {charity}
              <br />
              100% of proceeds
            </dd>
          </Reveal>
        </dl>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <Reveal>
          <p className="eyebrow eyebrow--gold">The Morning</p>
          <h2 id="intro-title" className="display">
            A private garage. An open door, once a month.
          </h2>
          <span className="rule" />
          <p className="lede">
            Most days, The Concours Garage is closed to the public. On the third {weekday} of each month we open it
            up for a relaxed morning of coffee and conversation among modern supercars, exotics and collector
            classics — at one of the most exclusive settings on the Treasure Coast.
          </p>
          <p className="lede">
            Because it&rsquo;s a private facility, space is genuinely limited. RSVP to save your place, and if you have
            something special in the garage, submit it to be one of the featured cars.
          </p>
        </Reveal>
      </section>

      <section className="steps" aria-label="How it works">
        <ol className="steps__list">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} className="steps__item" delay={i * 100}>
              <span className="services__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="services__title">{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="quote quote--charity" aria-labelledby="charity-title">
        <Reveal>
          <p className="eyebrow eyebrow--gold">Giving Back</p>
          <h2 id="charity-title" className="display">
            All proceeds go to {charity}.
          </h2>
          <p className="quote__body">
            Cars &amp; Coffee is our way of saying thank you to Stuart. Every dollar raised during the morning goes
            directly to {charity}, a local charity serving our community.
          </p>
        </Reveal>
      </section>

      <section className="gallery" aria-labelledby="gallery-title">
        <div className="collection__head">
          <h2 id="gallery-title" className="display display--left">
            Mornings at the garage
          </h2>
          <p className="eyebrow">The Concours Garage · Stuart</p>
        </div>
        <div className="gallery__grid">
          {EVENT_PHOTOS.slice(0, 6).map((p, i) => (
            <Reveal key={p.src} className="gallery__tile" delay={(i % 3) * 90}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="forms" aria-label="RSVP and car submission">
        <div id="rsvp" className="forms__panel">
          <p className="eyebrow eyebrow--gold">Guests</p>
          <h2 className="display display--left display--sm">RSVP</h2>
          <p className="forms__intro">
            Reserve your place for the next Cars &amp; Coffee. We&rsquo;ll confirm by email with arrival and parking
            details.
          </p>
          <InquiryForm
            kind="rsvp"
            submitLabel="Reserve my spot"
            successMessage="Thank you — you're on the list. We'll confirm by email before the event."
          />
        </div>
        <div id="submit" className="forms__panel">
          <p className="eyebrow eyebrow--gold">Owners</p>
          <h2 className="display display--left display--sm">Submit your car</h2>
          <p className="forms__intro">
            Each month we feature a hand-picked selection of cars inside the garage. Tell us about yours — we review
            every submission and will reach out if it&rsquo;s selected.
          </p>
          <InquiryForm
            kind="car-submission"
            submitLabel="Submit my car"
            successMessage="Thank you — we've received your car. We'll be in touch if it's selected for an upcoming month."
          />
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="display">
          Good to know
        </h2>
        <div className="faq__list">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-band" aria-labelledby="cc-contact-title">
        <Reveal>
          <p className="eyebrow eyebrow--gold">Questions?</p>
          <h2 id="cc-contact-title" className="display">
            We&rsquo;d love to hear from you.
          </h2>
          <ul className="contact-band__row">
            <li>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                {ADDRESS_LINE}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
          <a href="#rsvp" className="btn btn--dark">
            RSVP for Cars &amp; Coffee
          </a>
        </Reveal>
      </section>

      <JsonLd data={eventJsonLd} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
