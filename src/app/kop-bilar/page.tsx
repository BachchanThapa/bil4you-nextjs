"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import CarCard from "@/components/CarCard/CarCard";
import styles from "./page.module.scss";

type Fuel = "Bensin" | "Diesel" | "Hybrid" | "El";

type Car = {
  id: string;
  make: string; // Märke
  model: string;
  year: number; // Årsmodell
  fuel: Fuel; // Bränsle
  price: number; // Pris
  publishedAt: string; // YYYY-MM-DD
  image: string;
};

const cars: Car[] = [
  {
    id: "audi-a4-avant-b9",
    make: "Audi",
    model: "A4 Avant B9",
    year: 2019,
    fuel: "Diesel",
    price: 179000,
    publishedAt: "2026-01-02",
    image: "/images/cars/thumbs/audi-a4-avant-2019-thumb.jpg",
  },
  {
    id: "audi-quattro-2-0",
    make: "Audi",
    model: "2.0 quattro",
    year: 2020,
    fuel: "Bensin",
    price: 199000,
    publishedAt: "2026-01-04",
    image: "/images/cars/thumbs/audi-a4-avant-b9-thumb.jpg",
  },
  {
    id: "bmw-520d-2022",
    make: "BMW",
    model: "520d 2022",
    year: 2022,
    fuel: "Diesel",
    price: 219000,
    publishedAt: "2026-01-06",
    image: "/images/cars/thumbs/bmw-520d-2017-thumb.jpg",
  },
  {
    id: "bmw-520d-m-sport",
    make: "BMW",
    model: "520d M Sport",
    year: 2018,
    fuel: "Diesel",
    price: 209000,
    publishedAt: "2026-01-07",
    image: "/images/cars/thumbs/bmw-520d-2018-thumb.jpg",
  },
  {
    id: "volvo-v60-2019-polestar",
    make: "Volvo",
    model: "V60 2019 (Polestar)",
    year: 2019,
    fuel: "Bensin",
    price: 189000,
    publishedAt: "2026-01-08",
    image: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg",
  },
  {
    id: "volvo-v60-2019-cross-country",
    make: "Volvo",
    model: "V60 2019 (Cross Country)",
    year: 2019,
    fuel: "Diesel",
    price: 219000,
    publishedAt: "2026-01-09",
    image: "/images/cars/thumbs/volvo-v60-cross-country-thumb.jpg",
  },

  // CHEAP (< 100 000 kr)
  {
    id: "audi-budget-1",
    make: "Audi",
    model: "A4 (Budget)",
    year: 2012,
    fuel: "Diesel",
    price: 89000,
    publishedAt: "2026-01-10",
    image: "/images/cars/thumbs/audi-a4-avant-2019-thumb.jpg",
  },
  {
    id: "volvo-budget-2",
    make: "Volvo",
    model: "V60 (Budget)",
    year: 2011,
    fuel: "Bensin",
    price: 99000,
    publishedAt: "2026-01-11",
    image: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg",
  },

  // EXPENSIVE (350 000+ kr, year 2025)
  {
    id: "bmw-2025-premium",
    make: "BMW",
    model: "520d 2025 (Premium)",
    year: 2025,
    fuel: "Hybrid",
    price: 379000,
    publishedAt: "2026-01-12",
    image: "/images/cars/thumbs/bmw-520d-2018-thumb.jpg",
  },
  {
    id: "volvo-2025-electric",
    make: "Volvo",
    model: "V60 2025 (El)",
    year: 2025,
    fuel: "El",
    price: 429000,
    publishedAt: "2026-01-13",
    image: "/images/cars/thumbs/volvo-v60-cross-country-thumb.jpg",
  },

  // Extra cars (demo)
  {
    id: "audi-extra-1",
    make: "Audi",
    model: "A4 Avant (Extra)",
    year: 2021,
    fuel: "Hybrid",
    price: 249000,
    publishedAt: "2026-01-14",
    image: "/images/cars/thumbs/audi-a4-avant-b9-thumb.jpg",
  },
  {
    id: "bmw-extra-2",
    make: "BMW",
    model: "520d (Extra)",
    year: 2020,
    fuel: "Bensin",
    price: 159000,
    publishedAt: "2026-01-15",
    image: "/images/cars/thumbs/bmw-520d-2017-thumb.jpg",
  },
];

function formatPriceSEK(n: number) {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr`;
}

type SortValue = "newest" | "priceAsc" | "priceDesc";

export default function KopBilarPage() {
  const [make, setMake] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");

  const [sortBy, setSortBy] = useState<SortValue>("newest");

  const makes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make))).sort(),
    []
  );

  const years = useMemo(
    () => Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a),
    []
  );

  const filteredAndSorted = useMemo(() => {
    const max = maxPrice.trim() === "" ? null : Number(maxPrice);
    const min = minPrice.trim() === "" ? null : Number(minPrice);
    const yearNum = year.trim() === "" ? null : Number(year);

    let list = [...cars];

    if (make) list = list.filter((c) => c.make === make);
    if (yearNum !== null && Number.isFinite(yearNum))
      list = list.filter((c) => c.year === yearNum);
    if (fuel) list = list.filter((c) => c.fuel === fuel);

    if (max !== null && Number.isFinite(max))
      list = list.filter((c) => c.price <= max);
    if (min !== null && Number.isFinite(min))
      list = list.filter((c) => c.price >= min);

    if (sortBy === "newest") {
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    } else if (sortBy === "priceAsc") {
      list.sort((a, b) => a.price - b.price);
    } else {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [make, maxPrice, minPrice, year, fuel, sortBy]);

  const resultsCount = filteredAndSorted.length;

  const resetAll = () => {
    setMake("");
    setMaxPrice("");
    setMinPrice("");
    setYear("");
    setFuel("");
    setSortBy("newest");
  };

  const getCarHref = (carId: string) => {
    if (carId === "volvo-v60-2019-polestar") return "/car-detail";
    return "/page-under-develop";
  };

  return (
    <div className={styles.page} id="top">
      <Container>
        <h1 className={styles.pageTitle}>Köp bilar</h1>

        <section className={styles.panel}>
          <div className={styles.panelInner}>
            {/* LEFT: FILTER */}
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
                  <option value="Bensin">Bensin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="El">El</option>
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

            {/* RIGHT: RESULT */}
            <div className={styles.result}>
              <div className={styles.resultHeader}>
                <h2 className={styles.panelTitle}>RESULTAT</h2>

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

                  <p className={styles.countText}>Visar {resultsCount} bilar</p>
                </div>
              </div>

              {resultsCount === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyTitle}>Tyvärr!</p>
                  <p className={styles.emptyText}>
                    Just nu har vi inga bilar som matchar din sökning. Prova att
                    ändra filter eller välj ett annat märke.
                  </p>

                  <button
                    type="button"
                    className={styles.emptyButton}
                    onClick={resetAll}
                  >
                    Rensa filter
                  </button>
                </div>
              ) : (
                <>
                  {/* ✅ CHANGED: use resultsGrid so cards fill the whole result box */}
                  <div className={styles.resultsGrid}>
                    {filteredAndSorted.map((car) => (
                      <CarCard
                        key={car.id}
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
                      Visa fler bilar...
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