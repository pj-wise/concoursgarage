import Link from "next/link";
import { CarLine } from "./CarLine";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link href="/" className="footer-mark" aria-label={`${SITE.name} — home`}>
          <span>The</span>
          <span>Concours</span>
          <span>Garage</span>
          <CarLine className="footer-mark__car" speedLines={false} />
        </Link>
        <ul className="site-footer__links">
          <li>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <Link href="/cars-and-coffee">Cars &amp; Coffee</Link>
          </li>
          <li>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="is-muted">
              Stuart, Florida
            </a>
          </li>
        </ul>
      </div>
      <div className="site-footer__bottom">
        <span>By appointment only</span>
        <span>© {new Date().getFullYear()} {SITE.name}</span>
      </div>
    </footer>
  );
}
