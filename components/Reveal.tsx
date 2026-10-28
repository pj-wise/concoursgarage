"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
  id?: string;
};

/** Fades/raises its children in the first time they scroll into view. */
export function Reveal({ as: Tag = "div", className, delay = 0, children, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
