"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
        <Link href="/" className="site-header__brand" aria-label={`${SITE.name} — home`}>
          {SITE.name}
        </Link>
        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <nav id="site-menu" className={`menu${open ? " is-open" : ""}`} aria-label="Main" aria-hidden={!open}>
        <ul className="menu__list">
          {NAV.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}>
              <Link href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="menu__rule" />
        <Link href="/contact?topic=storage" className="menu__cta" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Request availability →
        </Link>
      </nav>
    </>
  );
}
