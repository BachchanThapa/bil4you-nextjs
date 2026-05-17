"use client";

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function KontaktPage() {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const car = searchParams.get("car");
  const price = searchParams.get("price");

  const hasCarInterest = Boolean(carId && car);

  const prefilledMessage = hasCarInterest
    ? `Hej Bil4You,

    Jag är intresserad av ${car}.
    Pris: ${Number(price).toLocaleString("sv-SE")} kr
    Annons-ID: ${carId}

    Kontakta mig gärna.

    Vänliga hälsningar`
    : "";
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("namn") || "");
    const phone = String(formData.get("telefon") || "");
    const email = String(formData.get("epost") || "");
    const message = String(formData.get("meddelande") || "");

    const subject = hasCarInterest
      ? `Bilförfrågan: ${car}`
      : "Meddelande från kontaktsidan";

    const { error } = await supabase.from("messages").insert({
      name,
      phone,
      email,
      subject,
      message,
    });

    if (error) {
      alert("Något gick fel. Försök igen.");
      console.error(error);
      return;
    }

    alert("Meddelandet skickat!");
    e.currentTarget.reset();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Kontakt</h1>

        {/* Top info box: Map + Contact info */}
        <section className={styles.infoBox}>
          <div className={styles.infoColumns}>
            {/* Map */}
            <div className={styles.mapCol}>
              <h2 className={styles.sectionTitle}>KARTA</h2>

              <div
                className={styles.mapFrame}
                aria-label="Karta Karlstad, Sverige"
              >
                <iframe
                  title="Karta Karlstad, Sverige"
                  src="https://www.google.com/maps?q=Karlstad%2C%20Sweden&z=13&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className={styles.contactCol}>
              <h2 className={styles.sectionTitle}>KONTAKTUPPGIFTER</h2>

              <div className={styles.contactLines}>
                <p>
                  <span className={styles.bold}>Telefon:</span> 070-123 45 67
                </p>
                <p>
                  <span className={styles.bold}>E-post:</span> info@bil4you.se
                </p>
                <p>
                  <span className={styles.bold}>Adress:</span> Karlstad, Sverige
                </p>
                <p>
                  <span className={styles.bold}>Öppettider:</span> Mån–Fre 10–18
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Message form */}
        <section className={styles.messageSection}>
          <h2 className={styles.messageTitle}>SKICKA MEDDELANDE</h2>

          <form className={styles.form} onSubmit={onSubmit}>
            {hasCarInterest && (
              <div className={styles.carInterestBox}>
                <strong>Bilförfrågan</strong>
                <p>
                  Du skickar meddelande om: <span>{car}</span>
                </p>
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="namn">
                Namn
              </label>
              <input
                className={styles.input}
                id="namn"
                name="namn"
                type="text"
                placeholder="Ditt namn..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="telefon">
                Telefon
              </label>
              <input
                className={styles.input}
                id="telefon"
                name="telefon"
                type="tel"
                placeholder="070-123 45 67"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="epost">
                E-post
              </label>
              <input
                className={styles.input}
                id="epost"
                name="epost"
                type="email"
                placeholder="dinmail@exempel.se"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="meddelande">
                Meddelande
              </label>
              <textarea
                className={styles.textarea}
                id="meddelande"
                name="meddelande"
                placeholder="Skriv här..."
                defaultValue={prefilledMessage}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Skicka
            </button>

            <p className={styles.helperText}>
              Vi återkommer så snart som möjligt.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
