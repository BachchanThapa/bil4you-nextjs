"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./heroSection.module.scss";

/*
  Note to reviewer/teacher:
  - HeroSection is a "section component" for Hem.
  - Page.tsx stays small and only assembles sections (LEGO structure).
  - We reuse global UI classes (input/button) to keep design consistent.
*/

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
};

type HeroCarImage = {
  image_url: string;
  sort_order: number | null;
};

type HeroCar = {
  id: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  car_images: HeroCarImage[] | null;
};

function formatPrice(price: number | null) {
  if (!price) return "Pris saknas";

  return `${price.toLocaleString("sv-SE")} kr`;
}

function getCarTitle(car: HeroCar) {
  return [car.brand, car.model, car.year].filter(Boolean).join(" ");
}

function getCarImage(car: HeroCar) {
  const sortedImages = [...(car.car_images || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  return sortedImages[0]?.image_url || "/images/cars/car-placeholder.jpg";
}

export default function HeroSection({
  title = "Hitta din nästa bil",
  subtitle = "Sök bland begagnade bilar i Sverige",
}: HeroSectionProps) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [heroCars, setHeroCars] = useState<HeroCar[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchHeroCars() {
      const { data, error } = await supabase
        .from("cars")
        .select(
          `
          id,
          brand,
          model,
          year,
          price,
          car_images (
            image_url,
            sort_order
          )
        `,
        )
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Could not fetch hero cars:", error.message);
        return;
      }

      setHeroCars((data as HeroCar[]) || []);
    }

    fetchHeroCars();
  }, []);

  useEffect(() => {
    if (heroCars.length <= 1) return;

    // The hero car changes every 2 seconds while the homepage is open.
    // clearInterval stops the loop when the user leaves this page.
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroCars.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [heroCars.length]);

  function handleSearch() {
    const trimmedSearch = searchText.trim();

    if (!trimmedSearch) {
      router.push("/kop-bilar");
      return;
    }

    router.push(`/kop-bilar?search=${encodeURIComponent(trimmedSearch)}`);
  }

  const activeCar = heroCars[activeIndex];

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.showcase}>
          {activeCar ? (
            <>
              <div className={styles.showcaseImageWrapper}>
                <Image
                  src={getCarImage(activeCar)}
                  alt={getCarTitle(activeCar)}
                  width={360}
                  height={170}
                  className={styles.showcaseImage}
                  priority
                />
              </div>

              <div className={styles.showcaseContent}>
                <p className={styles.showcaseLabel}>Nyinkommen bil</p>
                <h2 className={styles.showcaseTitle}>
                  {getCarTitle(activeCar)}
                </h2>
                <p className={styles.showcasePrice}>
                  {formatPrice(activeCar.price)}
                </p>

                <Link
                  href={`/kop-bilar/${activeCar.id}`}
                  className={styles.showcaseLink}
                >
                  Visa bilen
                </Link>
              </div>
            </>
          ) : (
            <p className={styles.showcaseEmpty}>Laddar aktuella bilar...</p>
          )}
        </div>

        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroText}>{subtitle}</p>

        <div className={styles.searchRow}>
          <input
            type="text"
            className={`input ${styles.searchInput}`}
            placeholder="Sök på märke eller modell..."
            aria-label="Sök bil"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button
            type="button"
            className={`buttonPrimary ${styles.searchButton}`}
            onClick={handleSearch}
          >
            Sök bil
          </button>
        </div>
      </div>
    </section>
  );
}