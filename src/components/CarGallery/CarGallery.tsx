"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./carGallery.module.scss";

type GalleryItem = {
  hero: string;
  thumb: string;
  alt: string;
};

type Props = {
  images: GalleryItem[];
};

export default function CarGallery({ images }: Props) {
  const [selected, setSelected] = useState<GalleryItem>(images[0]);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryGrid}>
        {/* BIG left image (changes when you click thumbs) */}
        <div className={styles.galleryMain}>
          <Image
            src={selected.hero}
            alt={selected.alt}
            fill
            priority
            className={styles.imgCover}
          />
        </div>

        {/* Right side images (optional, keep as static “preview”) */}
        <div className={styles.gallerySide}>
          {images.slice(1, 4).map((img) => (
            <button
              key={img.hero}
              type="button"
              className={styles.sideBtn}
              onClick={() => setSelected(img)}
              aria-label={`Show image: ${img.alt}`}
            >
              <Image src={img.hero} alt="" fill className={styles.imgCover} />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnails row (clickable) */}
      <div className={styles.thumbsRow} aria-label="Thumbnails">
        {images.map((img) => (
          <button
            key={img.thumb}
            type="button"
            className={`${styles.thumbBtn} ${
              selected.thumb === img.thumb ? styles.active : ""
            }`}
            onClick={() => setSelected(img)}
            aria-label={`Show image: ${img.alt}`}
          >
            <Image
              src={img.thumb}
              alt=""
              width={120}
              height={80}
              className={styles.thumbImg}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
