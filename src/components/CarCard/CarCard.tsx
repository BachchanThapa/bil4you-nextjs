"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
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

function getFavoritesKey(userId?: string) {
  // Each logged-in user gets a separate favorite list in localStorage.
  // This prevents two users on the same browser from sharing favorites.
  return userId ? `${FAVORITES_KEY}-${userId}` : `${FAVORITES_KEY}-guest`;
}

function getStoredFavorites(storageKey: string) {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(storageKey);

  if (!saved) return [];

  try {
    return JSON.parse(saved) as string[];
  } catch {
    return [];
  }
}

/*
  Note to reviewer/teacher:
  - CarCard is a reusable UI component for showing one car.
  - It also includes the favorite heart button.
  - Favorites are currently saved in localStorage as a simple first version.
  - Each logged-in user gets their own favorite list using their Supabase user id.
  - Visitors who are not logged in are redirected to the login page before saving favorites.
  - In a future improvement, favorites could be moved from localStorage to a Supabase table.
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
  const [favoritesKey, setFavoritesKey] = useState(getFavoritesKey());

  useEffect(() => {
    async function loadFavoritesForCurrentUser() {
      const { data } = await supabase.auth.getUser();

      // If no user is logged in, do not load guest favorites.
      if (!data.user) {
        setFavoritesKey(getFavoritesKey());
        setIsFavorite(false);
        return;
      }

      const userKey = getFavoritesKey(data.user.id);

      setFavoritesKey(userKey);

      if (!carId) return;

      const favorites = getStoredFavorites(userKey);
      setIsFavorite(favorites.includes(carId));
    }

    loadFavoritesForCurrentUser();
  }, [carId]);

  // Handles the favorite button click for this car card.
  async function handleFavoriteClick() {
    if (!carId) return;

    const { data } = await supabase.auth.getUser();

    // If the visitor is not logged in, send them to login first.
    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    const userKey = getFavoritesKey(data.user.id);
    const favorites = getStoredFavorites(userKey);

    let updatedFavorites: string[];

    if (favorites.includes(carId)) {
      updatedFavorites = favorites.filter((id) => id !== carId);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, carId];
      setIsFavorite(true);
    }

    localStorage.setItem(userKey, JSON.stringify(updatedFavorites));
    setFavoritesKey(userKey);
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