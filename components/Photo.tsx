import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/images";
import styles from "./Photo.module.css";

type Props = {
  photo: PhotoData;
  sizes: string;
  className?: string;
  /** Proporción CSS, por ejemplo "4 / 5". */
  ratio?: string;
  reveal?: boolean;
  delay?: number;
};

export function photoTag(photo: PhotoData) {
  return photo.kind === "render" ? "Render de referencia" : "Fotografía ilustrativa";
}

export default function Photo({ photo, sizes, className = "", ratio = "3 / 2", reveal = true, delay = 0 }: Props) {
  return (
    <figure
      className={`${styles.figure} ${className}`}
      style={{ aspectRatio: ratio, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      data-reveal={reveal ? "image" : undefined}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} placeholder="blur" className={styles.img} />
      <figcaption className="image-tag">{photoTag(photo)}</figcaption>
    </figure>
  );
}
