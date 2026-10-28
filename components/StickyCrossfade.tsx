"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins its content for one extra screen of scrolling and exposes the scroll
 * progress (0 → 1) as the CSS variable `--p`, which the stylesheet uses to
 * fade the photo in over the text.
 */
export function StickyCrossfade({ id, children }: { id?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} id={id} className="crossfade">
      <div className="crossfade__stage">{children}</div>
    </section>
  );
}
