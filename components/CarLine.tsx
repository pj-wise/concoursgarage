type Props = { className?: string; speedLines?: boolean; title?: string };

/** Line drawing of a classic long-hood GT, used as the brand mark and in "Private by design". */
export function CarLine({ className, speedLines = true, title }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {speedLines ? (
        <g className="car-line__speed">
          <path pathLength={1} d="M2 72 H26" />
          <path pathLength={1} d="M8 84 H24" />
        </g>
      ) : null}
      <path
        className="car-line__body"
        pathLength={1}
        d="M34 92 C26 90 24 82 28 74 C34 66 60 61 92 56 C112 38 138 28 168 28 C198 28 218 40 236 53 C286 56 334 60 362 68 C380 73 390 81 388 89 C387 92 382 94 372 94 H340 A30 30 0 0 0 280 94 H125 A30 30 0 0 0 65 94 Z"
      />
      <path className="car-line__glass" pathLength={1} d="M106 56 C122 42 142 35 166 35 C188 35 206 44 220 54 Z" />
      <path className="car-line__trim" pathLength={1} d="M132 80 H274" />
      <circle className="car-line__wheel" pathLength={1} cx="95" cy="94" r="21" />
      <circle className="car-line__wheel" pathLength={1} cx="310" cy="94" r="21" />
    </svg>
  );
}
