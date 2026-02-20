import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import CarGallery from "@/components/CarGallery/CarGallery";

// NOTE: This is a static "demo" detail page for now.
// Later we can make it dynamic with /cars/[slug] and real data.
export default function CarDetailPage() {
  // Images in /public are referenced by string paths (NOT import).
  const gallery = [
    {
      hero: "/images/cars/hero/volvo-v60-polestar-white.jpg",
      thumb: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg",
      alt: "Volvo V60 Polestar – main view",
    },
    {
      hero: "/images/cars/hero/volvo-v60-polestar-white-2.jpg",
      thumb: "/images/cars/thumbs/volvo-v60-polestar-thumb-2.jpg",
      alt: "Volvo V60 Polestar – rear view",
    },
    {
      hero: "/images/cars/hero/volvo-v60-polestar-white-3.jpg",
      thumb: "/images/cars/thumbs/volvo-v60-polestar-thumb-3.jpg",
      alt: "Volvo V60 Polestar – front view",
    },
    {
      hero: "/images/cars/hero/volvo-v60-polestar-white-4.jpg",
      thumb: "/images/cars/thumbs/volvo-v60-polestar-thumb-4.jpg",
      alt: "Volvo V60 Polestar – side view",
    },
  ];

  // Simple “fake data” just to make the page feel real
  const car = {
    brand: "Volvo",
    model: "V60 2019",
    title: "Volvo V60",
    subtitle:
      "D3 FWD R-Design, Teknikpaket PRO, Klimatpaket, Dragkrok, Navigation",
    price: "219 000 kr",
    chips: ["I lager", "Diesel", "Manuell", "7 733 mil", "2019"],
    equipmentGroups: [
      {
        heading: "Teknikpaket PRO innehåller",
        items: [
          "Induktiv laddning (smartphone)",
          "Intellisafe Surround (BLIS)",
          "Navigation",
          "Parkeringskamera bak",
          "Smartphone integration",
          "Strålkastare (Dynamisk LED)",
        ],
      },
      {
        heading: "Klimatpaket innehåller",
        items: [
          "Baksätesvärme",
          "Programmerbar bränslevärmare",
          "Rattvärme",
          "Spolmunstycke eluppvärmda",
        ],
      },
      {
        heading: "Lastpaket innehåller",
        items: [
          "Eluttag 12V i bagage",
          "Lastgolv fällbart",
          "Lasthållarkrok",
        ],
      },
    ],
    seller: {
      name: "Bil4You Karlstad",
      description:
        "Vi säljer både nya och begagnade bilar. Alla bilar är testade och varudeklarerade. Välkommen in till oss och hitta din drömbil!",
      phoneLabel: "070 123 45 67",
      address: "Hejdalsvägen 2, Karlstad",
      hours: [
        { day: "Måndag", time: "10:00 – 18:00" },
        { day: "Tisdag", time: "10:00 – 18:00" },
        { day: "Onsdag", time: "10:00 – 18:00" },
        { day: "Torsdag", time: "10:00 – 18:00" },
        { day: "Fredag", time: "10:00 – 18:00" },
        { day: "Lördag", time: "Stängt" },
        { day: "Söndag", time: "Stängt" },
      ],
    },
    specs: [
      { label: "Tillverkare", value: "Volvo" },
      { label: "Modell", value: "V60" },
      { label: "Version", value: "D3" },
      { label: "Modellår", value: "2019" },
      { label: "Växellåda", value: "Manuell" },
      { label: "Bränsle", value: "Diesel" },
      { label: "Miltal", value: "7 733 mil" },
      { label: "Färg", value: "Vit" },
      { label: "Registreringsnummer", value: "ABC123" },
    ],
  };

  // Optional: “Similar cars” (simple demo cards)
  const similarCars = [
    {
      title: "Volvo V60 Cross Country",
      price: "189 000 kr",
      img: "/images/cars/thumbs/volvo-v60-cross-country-thumb.jpg",
      href: "/kop-bilar",
    },
    {
      title: "BMW 520d 2018",
      price: "209 000 kr",
      img: "/images/cars/thumbs/bmw-520d-2018-thumb.jpg",
      href: "/kop-bilar",
    },
    {
      title: "Audi A4 Avant 2019",
      price: "179 000 kr",
      img: "/images/cars/thumbs/audi-a4-avant-2019-thumb.jpg",
      href: "/kop-bilar",
    },
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

        {/* Gallery (CLICKABLE NOW) */}
        <CarGallery images={gallery} />

        {/* Header area: title + price + chips */}
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{car.title}</h1>
            <p className={styles.subtitle}>{car.subtitle}</p>

            <ul className={styles.chips} aria-label="Key details">
              {car.chips.map((c) => (
                <li key={c} className={styles.chip}>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.priceCard} aria-label="Price">
            <div className={styles.price}>{car.price}</div>
            <div className={styles.priceNote}>Pris inkl. moms</div>
          </div>
        </header>

        {/* Main content grid */}
        <div className={styles.contentGrid}>
          {/* Left column */}
          <section className={styles.left}>
            <div className={styles.block}>
              <h2 className={styles.h2}>Utrustning</h2>
              {car.equipmentGroups.map((g) => (
                <div key={g.heading} className={styles.group}>
                  <h3 className={styles.h3}>{g.heading}</h3>
                  <ul className={styles.list}>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Biluppgifter</h2>

              {/* Quick stat cards (like Wayke top row) */}
              <div className={styles.quickStats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>4,8 l/100km</div>
                  <div className={styles.statLabel}>Bränsleförbrukning</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>Framhjulsdrift</div>
                  <div className={styles.statLabel}>Drivhjul</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>3 353 kr/år</div>
                  <div className={styles.statLabel}>Skatt</div>
                </div>
              </div>

              {/* Specs table */}
              <dl className={styles.specs}>
                {car.specs.map((s) => (
                  <div key={s.label} className={styles.specRow}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Liknande bilar</h2>
              <div className={styles.similarGrid}>
                {similarCars.map((sc) => (
                  <Link
                    key={sc.title}
                    href={sc.href}
                    className={styles.similarCard}
                  >
                    <div className={styles.similarImgWrap}>
                      <Image
                        src={sc.img}
                        alt={sc.title}
                        fill
                        className={styles.imgCover}
                        sizes="(max-width: 900px) 50vw, 20vw"
                      />
                    </div>
                    <div className={styles.similarText}>
                      <div className={styles.similarTitle}>{sc.title}</div>
                      <div className={styles.similarPrice}>{sc.price}</div>
                      <span className={styles.similarLink}>Visa resultat →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Right column - sticky seller card */}
          <aside className={styles.right} aria-label="Seller information">
            <div className={styles.stickyCard}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerLogo}>Bil4You</div>
                <div className={styles.sellerName}>{car.seller.name}</div>
              </div>

              <p className={styles.sellerDesc}>{car.seller.description}</p>

              <div className={styles.contactBox}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Tel</span>
                  <button type="button" className={styles.contactAction}>
                    {car.seller.phoneLabel}
                  </button>
                </div>

                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Adress</span>
                  <span className={styles.contactValue}>{car.seller.address}</span>
                </div>
              </div>

              <div className={styles.hours}>
                <div className={styles.hoursTitle}>Öppettider</div>
                <ul className={styles.hoursList}>
                  {car.seller.hours.map((h) => (
                    <li key={h.day} className={styles.hoursRow}>
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/kontakt" className={styles.ctaBtn}>
                Kontakta oss
              </Link>

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
