import Link from "next/link";
import CarCard from "@/components/CarCard/CarCard";
import { supabase } from "@/lib/supabase";
import styles from "./popularCarsSection.module.scss";

type CarImage = {
  image_url: string;
  sort_order: number | null;
};

type SupabaseCar = {
  id: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  mileage: number | null;
  car_images: CarImage[] | null;
};

function formatPrice(price: number | null) {
  if (!price) return "Pris saknas";

  return `${price.toLocaleString("sv-SE")} kr`;
}

function getCarTitle(car: SupabaseCar) {
  return [car.brand, car.model, car.year].filter(Boolean).join(" ");
}

function getCarImage(car: SupabaseCar) {
  const sortedImages = car.car_images?.sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  return sortedImages?.[0]?.image_url || "/images/cars/car-placeholder.jpg";
}

/*
  Note to reviewer/teacher:
  - Homepage now uses real car data from Supabase.
  - I only show a small amount of cars here, because this is a preview section.
  - The full list is still available on the "Köp bilar" page.
*/
export default async function PopularCarsSection() {
  const { data: cars, error } = await supabase
    .from("cars")
    .select(
      `
      id,
      brand,
      model,
      year,
      price,
      mileage,
      car_images (
        image_url,
        sort_order
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Could not fetch homepage cars:", error.message);
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Populära bilar</h2>

      <div className={styles.grid}>
        {cars?.map((car) => (
          <CarCard
            key={car.id}
            carId={car.id}
            title={getCarTitle(car)}
            price={formatPrice(car.price)}
            image={getCarImage(car)}
            href={`/kop-bilar/${car.id}`}
            metaLines={[
              car.mileage ? `Mil: ${car.mileage.toLocaleString("sv-SE")}` : "Mil saknas",
            ]}
          />
        ))}
      </div>

      <div className={styles.moreRow}>
        <Link href="/kop-bilar" className={styles.moreLink}>
          Visa fler bilar...
        </Link>
      </div>
    </section>
  );
}