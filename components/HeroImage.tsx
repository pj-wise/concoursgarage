import { getImageProps } from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Optional portrait crop served to phones held upright. */
  portraitSrc?: string;
  className?: string;
};

/** Full-bleed hero photo, art-directed so portrait phones get a vertical shot. */
export function HeroImage({ src, alt, portraitSrc, className }: Props) {
  const common = { alt, fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { props } = getImageProps({ ...common, src });

  if (!portraitSrc) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} className={className} />;
  }

  const {
    props: { srcSet: portrait },
  } = getImageProps({ ...common, src: portraitSrc });

  return (
    <picture>
      <source media="(orientation: portrait) and (max-width: 820px)" srcSet={portrait} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...props} className={className} />
    </picture>
  );
}
