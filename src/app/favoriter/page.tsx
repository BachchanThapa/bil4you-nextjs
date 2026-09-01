"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Container from "@/components/Container";
import CarCard from "@/components/CarCard/CarCard";
import styles from "./page.module.scss";

type Fuel = "Bensin" | "Diesel" | "Hybrid" | "El" | string;

type CarImage = {
  image_url: string;
  sort_order: number;
};

type SupabaseCar = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fuel_type: string;
  price: number;
  created_at: string;
  is_sold: boolean;
  car_images: CarImage[];
};

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  fuel: Fuel;
  price: number;
  publishedAt: string;
  image: string;
};

type SortValue = "newest" | "priceAsc" | "priceDesc";

const FAVORITES_KEY = "bil4you-favorites";
function getFavoritesKey(userId?: string) {
  return userId ? `${FAVORITES_KEY}-${userId}` : `${FAVORITES_KEY}-guest`;
}

function formatPriceSEK(n: number) {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr`;
}

function formatDate(dateString: string) {
  return dateString.split("T")[0];
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

export default function FavoriterPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [make, setMake] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortValue>("newest");

  useEffect(() => {
    async function fetchFavoriteCars() {
      setIsLoading(true);
      setErrorMessage("");

      const { data: userData } = await supabase.auth.getUser();
      const favoritesKey = getFavoritesKey(userData.user?.id);
      const favoriteIds = getStoredFavorites(favoritesKey);

      if (favoriteIds.length === 0) {
        setCars([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cars")
        .select(
          `
          id,
          title,
          brand,
          model,
          year,
          fuel_type,
          price,
          created_at,
          is_sold,
          car_images (
            image_url,
            sort_order
          )
        `,
        )
        .in("id", favoriteIds)
        .eq("is_sold", false)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setErrorMessage("Kunde inte hämta dina favoriter just nu.");
        setIsLoading(false);
        return;
      }

      const mappedCars: Car[] = ((data as SupabaseCar[]) || []).map((car) => {
        const sortedImages = [...(car.car_images || [])].sort(
          (a, b) => a.sort_order - b.sort_order,
        );

        return {
          id: car.id,
          make: car.brand,
          model: car.model,
          year: car.year,
          fuel: car.fuel_type,
          price: car.price,
          publishedAt: formatDate(car.created_at),
          image:
            sortedImages[0]?.image_url ||
            "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg",
        };
      });

      setCars(mappedCars);
      setIsLoading(false);
    }

    fetchFavoriteCars();

    function refreshFavorites() {
      fetchFavoriteCars();
    }

    window.addEventListener("focus", refreshFavorites);

    return () => {
      window.removeEventListener("focus", refreshFavorites);
    };
  }, []);

  const makes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make))).sort(),
    [cars],
  );

  const years = useMemo(
    () => Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a),
    [cars],
  );

  const filteredAndSorted = useMemo(() => {
    const max = maxPrice.trim() === "" ? null : Number(maxPrice);
    const min = minPrice.trim() === "" ? null : Number(minPrice);
    const yearNum = year.trim() === "" ? null : Number(year);

    let list = [...cars];

    if (make) list = list.filter((c) => c.make === make);

    if (yearNum !== null && Number.isFinite(yearNum)) {
      list = list.filter((c) => c.year === yearNum);
    }

    if (fuel) list = list.filter((c) => c.fuel === fuel);

    if (max !== null && Number.isFinite(max)) {
      list = list.filter((c) => c.price <= max);
    }

    if (min !== null && Number.isFinite(min)) {
      list = list.filter((c) => c.price >= min);
    }

    if (sortBy === "newest") {
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    } else if (sortBy === "priceAsc") {
      list.sort((a, b) => a.price - b.price);
    } else {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [cars, make, maxPrice, minPrice, year, fuel, sortBy]);

  const resultsCount = filteredAndSorted.length;

  const resetAll = () => {
    setMake("");
    setMaxPrice("");
    setMinPrice("");
    setYear("");
    setFuel("");
    setSortBy("newest");
  };

  const getCarHref = (id: string) => {
    return `/kop-bilar/${id}`;
  };

  return (
    <div className={styles.page} id="top">
      <Container>
        <h1 className={styles.pageTitle}>Mina favoriter</h1>

        <section className={styles.panel}>
          <div className={styles.panelInner}>
            <aside className={styles.filter}>
              <h2 className={styles.panelTitle}>FILTER</h2>

              <div className={styles.field}>
                <label className={styles.label}>Märke:</label>
                <select
                  className={styles.control}
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                >
                  <option value="">Välj märke...</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Pris Max (kr):</label>
                <input
                  className={styles.control}
                  type="number"
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="....."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Pris Min (kr):</label>
                <input
                  className={styles.control}
                  type="number"
                  inputMode="numeric"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="....."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Årsmodell:</label>
                <select
                  className={styles.control}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Alla</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Bränsle:</label>
                <select
                  className={styles.control}
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                >
                  <option value="">Alla</option>
                  <option value="bensin">Bensin</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="el">El</option>
                </select>
              </div>

              <button
                type="button"
                className={styles.linkButton}
                onClick={resetAll}
              >
                Visa resultat...
              </button>
            </aside>

            <div className={styles.result}>
              <div className={styles.resultHeader}>
                <h2 className={styles.panelTitle}>FAVORITER</h2>

                <div className={styles.resultRight}>
                  <div className={styles.sortRow}>
                    <span className={styles.sortLabel}>Sortering:</span>
                    <select
                      className={styles.sortSelect}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortValue)}
                    >
                      <option value="newest">Nyaste först</option>
                      <option value="priceAsc">Pris: lägst först</option>
                      <option value="priceDesc">Pris: högst först</option>
                    </select>
                  </div>

                  <p className={styles.countText}>
                    Visar {resultsCount} favoriter
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>Laddar...</p>
                  <p className={styles.emptyText}>
                    Hämtar dina sparade favoritbilar.
                  </p>
                </div>
              ) : errorMessage ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>Något gick fel</p>
                  <p className={styles.emptyText}>{errorMessage}</p>
                </div>
              ) : resultsCount === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>Inga favoriter ännu</p>
                  <p className={styles.emptyText}>
                    Klicka på hjärtat på en bil för att spara den här.
                  </p>

                  <Link className={styles.moreLink} href="/kop-bilar">
                    Gå till Köp bilar
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.resultsGrid}>
                    {filteredAndSorted.map((car) => (
                      <CarCard
                        key={car.id}
                        carId={car.id}
                        title={`Model: ${car.make} ${car.model}`}
                        price={formatPriceSEK(car.price)}
                        image={car.image}
                        href={getCarHref(car.id)}
                        metaLines={[
                          `Årsmodell: ${car.year}`,
                          `Bränsle: ${car.fuel}`,
                          `Publicerad: ${car.publishedAt}`,
                        ]}
                        fluid
                      />
                    ))}
                  </div>

                  <div className={styles.moreRow}>
                    <a className={styles.moreLink} href="#top">
                      Visa fler favoriter...
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
