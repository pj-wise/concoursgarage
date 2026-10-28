"use client";

import { useEffect, useState } from "react";
import { CARS_AND_COFFEE } from "@/lib/site";
import { nextEventDate } from "@/lib/schedule";

/** "Saturday, November 21" — computed in the browser so a static build never shows a stale date. */
export function NextEventDate({ prefix = "Next gathering: " }: { prefix?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const date = nextEventDate(new Date(), CARS_AND_COFFEE.weekday);
    setLabel(date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
  }, []);

  if (!label) return null;
  return (
    <span className="next-event">
      {prefix}
      <strong>{label}</strong>
    </span>
  );
}
