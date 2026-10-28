import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { ADDRESS_LINE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Private Tours",
  description:
    "Request private car storage availability or schedule a private tour of The Concours Garage in Stuart, Florida. By appointment, seven days a week.",
  alternates: { canonical: "/contact" },
};

const TOPICS: Record<string, string> = {
  storage: "Private storage",
  tour: "A private tour",
  detailing: "Concours detailing",
  care: "Maintenance & vehicle care",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;

  return (
    <section className="contact-page" aria-labelledby="contact-page-title">
      <div className="contact-page__intro">
        <p className="eyebrow eyebrow--gold">By appointment only</p>
        <h1 id="contact-page-title" className="display display--left">
          Request availability.
        </h1>
        <p className="lede lede--left">
          Tell us a little about your collection and what you&rsquo;re looking for. We&rsquo;ll reply personally,
          usually within one business day.
        </p>
        <ul className="contact-page__list">
          <li>
            <span className="eyebrow">Phone</span>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          </li>
          <li>
            <span className="eyebrow">Email</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <span className="eyebrow">Visit</span>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              {ADDRESS_LINE}
            </a>
          </li>
          <li>
            <span className="eyebrow">Hours</span>
            <span>By appointment · Seven days</span>
          </li>
        </ul>
      </div>
      <div className="forms__panel">
        <InquiryForm
          kind="inquiry"
          submitLabel="Send request"
          successMessage="Thank you — we've received your request and will be in touch shortly."
          defaults={topic && TOPICS[topic] ? { topic: TOPICS[topic] } : undefined}
        />
      </div>
    </section>
  );
}
