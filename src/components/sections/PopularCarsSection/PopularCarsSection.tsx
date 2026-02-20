import Link from "next/link";
import CarCard from "@/components/CarCard/CarCard";
import styles from "./popularCarsSection.module.scss";

type PopularCar = {
  id: string;
  model: string;
  price: string;
  img: string;
};

const popularCars: PopularCar[] = [
  {
    id: "bmw-520d-2017",
    model: "BMW 520d 2022",
    price: "219 000 kr",
    img: "/images/cars/thumbs/bmw-520d-2017-thumb.jpg",
  },
  {
    id: "volvo-v60-2019",
    model: "Volvo V60 2019",
    price: "189 000 kr",
    img: "/images/cars/thumbs/volvo-v60-cross-country-thumb.jpg",
  },
  {
    id: "volvo-v60-white", // ✅ THIS ONE will open your detail page
    model: "Volvo V60 2019",
    price: "219 000 kr",
    img: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg",
  },
  {
    id: "audi-a4-quattro",
    model: "Audi 2.0 quattro",
    price: "199 000 kr",
    img: "/images/cars/thumbs/audi-a4-avant-b9-thumb.jpg",
  },
  {
    id: "audi-a4-avant-b9",
    model: "Audi A4 Avant B9",
    price: "179 000 kr",
    img: "/images/cars/thumbs/audi-a4-avant-2019-thumb.jpg",
  },
  {
    id: "bmw-520d-2018",
    model: "BMW 520d M Sport",
    price: "209 000 kr",
    img: "/images/cars/thumbs/bmw-520d-2018-thumb.jpg",
  },
];

export default function PopularCarsSection() {
  const getHref = (carId: string) => {
    // Only the white Volvo V60 card goes to the real detail page
    if (carId === "volvo-v60-white") return "/car-detail";
    // Everything else goes to "under development"
    return "/page-under-develop";
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Populära bilar</h2>

      <div className={styles.grid}>
        {popularCars.map((car) => (
          <CarCard
            key={car.id}
            title={car.model}
            price={car.price}
            image={car.img}
            href={getHref(car.id)}
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
