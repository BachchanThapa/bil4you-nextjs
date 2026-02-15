import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

const popularCars = [
  {
    id: "bmw-520d-2017",
    model: "BMW 520d 2022",
    price: "219 000 kr",
    img: "/images/cars/thumbs/bmw-520d-2017-thumb.jpg.jpg",
    alt: "BMW 520d 2022",
  },
  {
    id: "volvo-v60-2019",
    model: "Volvo V60 2019",
    price: "189 000 kr",
    img: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg.jpg",
    alt: "Volvo V60 2019",
  },
  {
    id: "volvo-v60-white",
    model: "Volvo V60 2019",
    price: "219 000 kr",
    img: "/images/cars/thumbs/volvo-v60-polestar-thumb.jpg.jpg",
    alt: "Volvo V60 2019 (vit)",
  },
  {
    id: "audi-a4-quattro",
    model: "Audi 2.0 quattro",
    price: "199 000 kr",
    img: "/images/cars/thumbs/audi-a4-avant-b9-thumb.jpg.JPG",
    alt: "Audi 2.0 quattro",
  },
  {
    id: "audi-a4-avant-b9",
    model: "Audi A4 Avant B9",
    price: "179 000 kr",
    img: "/images/cars/thumbs/audi-a4-avant-2019-thumb.jpg.jpg",
    alt: "Audi A4 Avant B9",
  },
  {
    id: "bmw-520d-2018",
    model: "BMW 520d M Sport",
    price: "209 000 kr",
    img: "/images/cars/thumbs/bmw-520d-2018-thumb.jpg.jpg",
    alt: "BMW 520d M Sport",
  },
];

export default function HomePage() {
  return (
    <main>
      <Container>
        {/* HERO (Step A) */}
        <section
          style={{
            width: "100%",
            textAlign: "center",
            padding: "96px 0",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            Hitta din nästa bil
          </h1>

          <p
            style={{
              marginTop: "12px",
              marginBottom: 0,
              color: "var(--color-text-muted)",
            }}
          >
            Sök bland begagnade bilar i Sverige
          </p>

          <button
            type="button"
            style={{
              marginTop: "20px",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              height: "44px",
              padding: "0 28px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sök bil
          </button>

          {/* Search input box under the button */}
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder=""
              style={{
                width: "520px",
                maxWidth: "100%",
                height: "44px",
                borderRadius: "10px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                padding: "0 14px",
                outline: "none",
              }}
            />
          </div>
        </section>

        {/* POPULÄRA BILAR (Step A+) */}
        <section style={{ paddingBottom: "64px" }}>
          <h2
            style={{
              margin: 0,
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--color-text)",
            }}
          >
            Populära bilar
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "16px",
            }}
          >
            {popularCars.map((car) => (
              <article
                key={car.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "10px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--color-border)",
                  }}
                >
                  <Image
                    src={car.img}
                    alt={car.alt}
                    width={96}
                    height={96}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text)" }}>
                    <strong>Model:</strong> {car.model}
                  </p>

                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "14px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Pris: {car.price}
                  </p>

                  <Link
                    href={`/kop-bilar#${car.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "6px",
                      fontSize: "12px",
                      color: "var(--color-link, #146FE9)",
                      textDecoration: "underline",
                    }}
                  >
                    Visa detaljer ...
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "14px" }}>
            <Link
              href="/kop-bilar"
              style={{
                fontSize: "12px",
                color: "var(--color-link, #146FE9)",
                textDecoration: "underline",
              }}
            >
              Visa fler bilar...
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
