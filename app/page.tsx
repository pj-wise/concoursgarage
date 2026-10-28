import Image from "next/image";
import Link from "next/link";
import { CarLine } from "@/components/CarLine";
import { NextEventDate } from "@/components/NextEventDate";
import { Reveal } from "@/components/Reveal";
import { StickyCrossfade } from "@/components/StickyCrossfade";
import { CARS_AND_COFFEE, SITE } from "@/lib/site";

const SERVICES = [
  {
    id: "storage",
    title: "Private Storage",
    body: "Climate-controlled, secure storage for automobiles that deserve more than a parking space.",
  },
  {
    id: "detailing",
    title: "Concours Detailing",
    body: "Paint correction, ceramic protection and interior care, finished to a show-field standard.",
  },
  {
    id: "vehicle-care",
    title: "Maintenance & Vehicle Care",
    body: "Battery maintenance, scheduled exercising and service coordination, so every car is ready when you are.",
  },
  {
    id: "concierge",
    title: "Concierge Services",
    body: "Enclosed transport, appointments and logistics, arranged quietly on your behalf.",
  },
];

const FEATURES = [
  ["Climate-controlled environment", "Temperature and humidity held steady against the Florida coast."],
  ["Secure access", "Monitored building, limited keys, no walk-in traffic."],
  ["Private appointments", "Arrivals, visits and departures scheduled one client at a time."],
  ["Battery maintenance", "Every car on a tender. Every car starts."],
  ["Vehicle exercising", "Fluids circulated and tires rotated on a set cadence."],
  ["Detailing", "Concours-level paint, interior and wheel care in-house."],
  ["Maintenance coordination", "Service scheduled with specialists you already trust, or ours."],
  ["Transport coordination", "Enclosed transport to and from the facility, anywhere."],
];

const COLLECTION = [
  { src: "/images/collection-amg-trio.jpg", alt: "Mercedes-AMG GT Black Series, 300 SL Roadster and SLS AMG Black Series side by side" },
  { src: "/images/collection-black-series.jpg", alt: "Orange AMG GT Black Series facing a yellow SLS AMG Black Series beneath the lifts" },
  { src: "/images/collection-bentley-chrysler.jpg", alt: "Bentley Continental GTC, 1957 Chrysler 300C and Lotus Emira under the neon clock" },
  { src: "/images/collection-interior.jpg", alt: "Collector cars lined up inside the climate-controlled garage" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/hero-ferrari-trio.jpg"
          alt="Ferrari 275 GTB, F12berlinetta and 365 GTB/4 Daytona parked beneath the neon clock at The Concours Garage"
          fill
          priority
          sizes="100vw"
          className="hero__img"
        />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--gold hero__kicker">Stuart · Florida</p>
          <h1 id="hero-title" className="hero__title">
            The Concours Garage
          </h1>
          <p className="hero__sub">{SITE.tagline}</p>
          <div className="hero__actions">
            <Link href="/contact?topic=storage" className="btn">
              Request private storage
            </Link>
            <Link href="/contact?topic=tour" className="link-arrow">
              Schedule a private tour →
            </Link>
          </div>
        </div>
        <div className="hero__foot">
          <span>By appointment only</span>
          <a href="#garage">Scroll</a>
        </div>
      </section>

      {/* More than storage — text pinned while the photo fades in */}
      <StickyCrossfade id="garage">
        <div className="crossfade__photo">
          <Image src="/images/garage-shelby-row.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="crossfade__text">
          <p className="eyebrow eyebrow--gold">The Garage</p>
          <h2 className="display">More than storage.</h2>
          <span className="rule" />
          <p className="lede">
            The Concours Garage provides discreet, climate-controlled storage, detailing, maintenance and
            concierge care for some of the world&rsquo;s finest automobiles.
          </p>
        </div>
      </StickyCrossfade>

      {/* Services */}
      <section className="services" aria-labelledby="services-title">
        <Reveal as="p" className="eyebrow eyebrow--gold services__label">
          <span id="services-title">Services</span>
        </Reveal>
        <ol className="services__list">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.id} id={s.id} className="services__item">
              <span className="services__num">{pad(i + 1)}</span>
              <h3 className="services__title">{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Facility */}
      <section className="facility" aria-labelledby="facility-title">
        <div className="facility__banner">
          <Image
            src="/images/facility-wide.jpg"
            alt="Four-post stacker lifts holding Ferraris and Mustangs beside a row of vintage cars inside the facility"
            fill
            sizes="100vw"
          />
          <div className="facility__shade" />
          <Reveal className="facility__copy">
            <p className="eyebrow eyebrow--gold">The Facility</p>
            <h2 id="facility-title" className="display display--left">
              A private facility built around the automobile.
            </h2>
          </Reveal>
          <Reveal className="facility__aside" delay={150}>
            <p>
              Sealed floors, controlled air, four-post lifts and quiet. Nothing in the building exists for any
              reason other than the cars.
            </p>
          </Reveal>
        </div>
        <ol className="features">
          {FEATURES.map(([title, body], i) => (
            <Reveal as="li" key={title} className="features__item" delay={(i % 2) * 80}>
              <span className="features__num">{pad(i + 1)}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Testimonial */}
      <section className="quote" aria-label="Client testimonial">
        <Reveal as="figure">
          <blockquote>
            &ldquo;Jacob is a pleasure to deal with. Easy transaction, knowledge and experience. You can&rsquo;t
            go wrong.&rdquo;
          </blockquote>
        </Reveal>
      </section>

      {/* Collection */}
      <section id="collection" className="collection" aria-labelledby="collection-title">
        <div className="collection__head">
          <h2 id="collection-title" className="display display--left">
            The Collection
          </h2>
          <p className="eyebrow">Selected residents · Stuart</p>
        </div>
        <div className="collection__grid">
          {COLLECTION.map((img, i) => (
            <Reveal key={img.src} className="collection__tile" delay={i * 90}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Private by design */}
      <section id="about" className="private" aria-labelledby="private-title">
        <div className="private__left">
          <Reveal>
            <p className="eyebrow eyebrow--gold">Private Access</p>
            <h2 id="private-title" className="display display--left">
              Private by design.
            </h2>
          </Reveal>
          <Reveal className="private__car">
            <CarLine className="car-line" />
          </Reveal>
        </div>
        <Reveal className="private__right" delay={120}>
          <p>
            There is no showroom and no walk-in traffic. Visits, deliveries and services are arranged in advance and
            handled one client at a time. Who stores here, and what, stays here.
          </p>
          <ul className="dash-list">
            <li>Appointment-only access, seven days a week</li>
            <li>Monitored, limited-access building with no public signage on the cars</li>
            <li>Your collection is never photographed or published without permission</li>
          </ul>
        </Reveal>
      </section>

      {/* Cars & Coffee teaser */}
      <section className="cc-teaser" aria-labelledby="cc-teaser-title">
        <Reveal className="cc-teaser__inner">
          <p className="eyebrow eyebrow--gold">Monthly · Community</p>
          <h2 id="cc-teaser-title" className="display">
            Cars &amp; Coffee
          </h2>
          <p className="lede">
            The third {CARS_AND_COFFEE.weekday} of every month we open the doors for a morning of modern and exotic
            automobiles. Space is limited and every guest RSVPs. All proceeds benefit {CARS_AND_COFFEE.charity}.
          </p>
          <NextEventDate />
          <div className="cc-teaser__actions">
            <Link href="/cars-and-coffee#rsvp" className="btn">
              RSVP
            </Link>
            <Link href="/cars-and-coffee" className="link-arrow">
              Event details →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="contact-band" aria-labelledby="contact-title">
        <Reveal>
          <p className="eyebrow eyebrow--gold">Stuart, Florida</p>
          <h2 id="contact-title" className="display">
            Serving collectors throughout South Florida and beyond.
          </h2>
          <ul className="contact-band__row">
            <li>
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li className="is-muted">By appointment · Seven days</li>
          </ul>
          <Link href="/contact?topic=tour" className="btn btn--dark">
            Schedule a private tour
          </Link>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="closing" aria-labelledby="closing-title">
        <Reveal>
          <h2 id="closing-title" className="display display--lg">
            A private home for your collection.
          </h2>
          <p className="lede">Request availability or arrange a private tour of The Concours Garage.</p>
          <Link href="/contact?topic=tour" className="btn">
            Request a private tour
          </Link>
        </Reveal>
      </section>
    </>
  );
}
