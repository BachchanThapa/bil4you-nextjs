import Container from "@/components/Container";
import CarCard from "@/components/CarCard/CarCard";
import styles from "./page.module.scss";

const popularCars = [
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
    id: "volvo-v60-white",
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

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>Hitta din nästa bil</h1>
            <p className={styles.heroText}>Sök bland begagnade bilar i Sverige</p>

            <div className={styles.searchRow}>
              <input
                type="text"
                className={`input ${styles.searchInput}`}
                placeholder="Sök på märke eller modell..."
                aria-label="Sök bil"
              />
              <button type="button" className={`buttonPrimary ${styles.searchButton}`}>
                Sök bil
              </button>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Populära bilar</h2>
          </div>

          <div className={styles.grid}>
            {popularCars.map((car) => (
              <CarCard
                key={car.id}
                title={car.model}
                price={car.price}
                image={car.img}
                href={`/kop-bilar#${car.id}`}
              />
            ))}
          </div>

          <div className={styles.moreRow}>
            <a href="/kop-bilar" className="linkPrimary">
              Visa fler bilar...
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
