import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";
import CarGallery from "@/components/CarGallery/CarGallery";
import InterestButton from "@/components/InterestButton/InterestButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type CarImage = {
  image_url: string;
  sort_order: number;
};

type SimilarCar = {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  car_images: CarImage[];
};

function formatPriceSEK(price: number) {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr`;
}

export default async function CarDetailByIdPage({ params }: PageProps) {
  const { id } = await params;

  const { data: car, error } = await supabase
    .from("cars")
    .select(
      `
      *,
      car_images (
        image_url,
        sort_order
      )
    `,
    )
    .eq("id", id)
    .single();

  const { data: similarCars } = await supabase
    .from("cars")
    .select(
      `
      id,
      title,
      brand,
      model,
      price,
      car_images (
        image_url,
        sort_order
      )
    `,
    )
    .neq("id", id)
    .eq("is_sold", false)
    .limit(3);

  if (error || !car) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Car not found</h1>
          <p>No car found with ID: {id}</p>
          <Link href="/kop-bilar">Tillbaka till alla bilar</Link>
        </div>
      </main>
    );
  }

  const images = ((car.car_images || []) as CarImage[]).sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  // Supabase image URLs are used for both hero and thumb for now.
  const gallery = images.map((img, index) => ({
    hero: img.image_url,
    thumb: img.image_url,
    alt: `${car.title} bild ${index + 1}`,
  }));

  const chips = [
    car.fuel_type,
    car.transmission,
    `${car.mileage} mil`,
    String(car.year),
    car.body_type,
  ].filter(Boolean);

  const specs = [
    { label: "Tillverkare", value: car.brand },
    { label: "Modell", value: car.model },
    { label: "Version", value: car.version || "Ej angivet" },
    { label: "Modellår", value: car.year },
    { label: "Växellåda", value: car.transmission },
    { label: "Bränsle", value: car.fuel_type },
    { label: "Miltal", value: `${car.mileage} mil` },
    { label: "Färg", value: car.color || "Ej angivet" },
    { label: "Karosstyp", value: car.body_type || "Ej angivet" },
    {
      label: "Registreringsnummer",
      value: car.registration_number || "Ej angivet",
    },
    { label: "Plats", value: car.location || "Ej angivet" },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Bil4You</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/kop-bilar">{car.brand}</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{car.model}</li>
          </ol>
        </nav>

        {/* Gallery with real Supabase images */}
        {gallery.length > 0 && <CarGallery images={gallery} />}

        {/* Header area: title + price + chips */}
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{car.title}</h1>

            <ul className={styles.chips} aria-label="Key details">
              {chips.map((chip) => (
                <li key={chip} className={styles.chip}>
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.priceCard} aria-label="Price">
            <div className={styles.price}>{formatPriceSEK(car.price)}</div>
            <div className={styles.priceNote}>Pris inkl. moms</div>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <section className={styles.left}>
            <div className={styles.block}>
              <h2 className={styles.h2}>Beskrivning</h2>
              <p>{car.description}</p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Biluppgifter</h2>

              {/* Quick stat cards (like Wayke top row) */}
              <div className={styles.quickStats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {car.fuel_consumption || "Ej angivet"}
                  </div>
                  <div className={styles.statLabel}>Bränsleförbrukning</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {car.drivetrain || "Ej angivet"}
                  </div>
                  <div className={styles.statLabel}>Drivhjul</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {car.tax_yearly || "Ej angivet"}
                  </div>
                  <div className={styles.statLabel}>Skatt</div>
                </div>
              </div>

              {/* Specs table */}
              <dl className={styles.specs}>
                {specs.map((spec) => (
                  <div key={spec.label} className={styles.specRow}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Liknande bilar</h2>

              <div className={styles.similarGrid}>
                {((similarCars || []) as SimilarCar[]).map((similar) => {
                  const sortedSimilarImages = [
                    ...(similar.car_images || []),
                  ].sort((a, b) => a.sort_order - b.sort_order);

                  const similarImage =
                    sortedSimilarImages[0]?.image_url ||
                    "/images/cars/car-placeholder.jpg";

                  return (
                    <Link
                      key={similar.id}
                      href={`/kop-bilar/${similar.id}`}
                      className={styles.similarCard}
                    >
                      <div className={styles.similarImgWrap}>
                        <Image
                          src={similarImage}
                          alt={similar.title}
                          fill
                          className={styles.imgCover}
                          sizes="(max-width: 900px) 50vw, 20vw"
                        />
                      </div>

                      <div className={styles.similarText}>
                        <div className={styles.similarTitle}>
                          {similar.title}
                        </div>
                        <div className={styles.similarPrice}>
                          {formatPriceSEK(similar.price)}
                        </div>
                        <span className={styles.similarLink}>
                          Visa resultat →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right column - sticky seller card */}
          <aside className={styles.right} aria-label="Seller information">
            <div className={styles.stickyCard}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerLogo}>Bil4You</div>
                <div className={styles.sellerName}>
                  {car.seller_name || "Ej angivet"}
                </div>
              </div>

              <p className={styles.sellerDesc}>
                {car.seller_name === "Bil4You"
                  ? "Bil4You säljer kontrollerade begagnade bilar med tydlig information och personlig service."
                  : "Privat säljare via Bil4You. Kontakta säljaren för mer information om bilen."}
              </p>

              <div className={styles.contactBox}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Tel</span>
                  <span className={styles.contactValue}>
                    {car.seller_phone || "Ej angivet"}
                  </span>
                </div>

                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Adress</span>
                  <span className={styles.contactValue}>
                    {car.seller_address || car.location || "Ej angivet"}
                  </span>
                </div>
              </div>

              <InterestButton
                carId={car.id}
                carTitle={car.title}
                carPrice={car.price}
                sellerUserId={car.user_id}
                ctaClassName={styles.ctaBtn}
                ownCarClassName={styles.secondaryBtn}
              />

              <Link href="/kop-bilar" className={styles.secondaryBtn}>
                Tillbaka till alla bilar
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
