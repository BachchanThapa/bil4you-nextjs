"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./carCard.module.scss";

type CarCardProps = {
  title: string;
  price: string;
  image: string;
  href: string;

  // Optional id used for favorite system
  carId?: string;

  // Optional extra info lines: year, fuel, published date, etc.
  metaLines?: string[];

  // Allows this card to stretch in result grids
  fluid?: boolean;
};

const FAVORITES_KEY = "bil4you-favorites";

function getStoredFavorites() {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(FAVORITES_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved) as string[];
  } catch {
    return [];
  }
}

/*
  Note to reviewer/teacher:
  - CarCard is a reusable UI component.
  - It can now also handle a simple favorite button.
  - Favorites are saved in localStorage for this first version.
*/
export default function CarCard({
  title,
  price,
  image,
  href,
  carId,
  metaLines,
  fluid = false,
}: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!carId) return;

    const favorites = getStoredFavorites();
    setIsFavorite(favorites.includes(carId));
  }, [carId]);

  function handleFavoriteClick() {
    if (!carId) return;

    const favorites = getStoredFavorites();

    let updatedFavorites: string[];

    if (favorites.includes(carId)) {
      updatedFavorites = favorites.filter((id) => id !== carId);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, carId];
      setIsFavorite(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  }

  return (
    <article className={`${styles.card} ${fluid ? styles.cardFluid : ""}`}>
      {carId ? (
        <button
          type="button"
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favoriteButtonActive : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"
          }
          title={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
        >
          ♥
        </button>
      ) : null}

      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>Pris: {price}</p>

        {metaLines?.length ? (
          <ul className={styles.metaList}>
            {metaLines.map((line) => (
              <li key={line} className={styles.metaItem}>
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        <Link href={href} className={styles.link}>
          Visa detaljer ...
        </Link>
      </div>
    </article>
  );
}