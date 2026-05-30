"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function KontaktPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const car = searchParams.get("car");
  const price = searchParams.get("price");

  const hasCarInterest = Boolean(carId && car);

  const [messageSent, setMessageSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Checks login before allowing a user to send interest for a specific car.
  useEffect(() => {
    async function checkUserForCarInterest() {
      if (!hasCarInterest) return;

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      }
    }

    checkUserForCarInterest();
  }, [hasCarInterest, router]);

  const prefilledMessage = hasCarInterest
    ? `Hej Bil4You,

    Jag är intresserad av ${car}.
    Pris: ${Number(price).toLocaleString("sv-SE")} kr
    Annons-ID: ${carId}

    Kontakta mig gärna.

    Vänliga hälsningar`
    : "";

  // Sends contact messages and car interest messages to Supabase.
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageSent) {
      setStatusMessage("Meddelandet är redan skickat.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("namn") || "");
    const phone = String(formData.get("telefon") || "");
    const email = String(formData.get("epost") || "");
    const message = String(formData.get("meddelande") || "");

    const subject = hasCarInterest
      ? `Bilförfrågan: ${car}`
      : "Meddelande från kontaktsidan";

    if (hasCarInterest) {
      // DUPLICATE CONTROL: prevents the same email from sending interest for the same car twice.
      const { data: existingInterest, error: duplicateError } = await supabase
        .from("messages")
        .select("id")
        .eq("email", email)
        .eq("subject", subject)
        .ilike("message", `%Annons-ID: ${carId}%`)
        .limit(1);

      if (duplicateError) {
        console.error(duplicateError);
        setStatusMessage(
          "Kunde inte kontrollera tidigare intresseanmälan. Försök igen.",
        );
        return;
      }

      if (existingInterest && existingInterest.length > 0) {
        setMessageSent(true);
        setStatusMessage(
          "Du har redan skickat en intresseanmälan för denna bil.",
        );
        return;
      }
    }

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

    setMessageSent(true);
    setStatusMessage(
      hasCarInterest
        ? "Intresseanmälan skickad."
        : "Meddelandet skickat.",
    );

    alert("Meddelandet skickat!");
    form.reset();
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
                disabled={messageSent}
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
                disabled={messageSent}
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
                disabled={messageSent}
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
                disabled={messageSent}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={messageSent}
            >
              {messageSent
                ? hasCarInterest
                  ? "Intresseanmälan skickad"
                  : "Meddelande skickat"
                : "Skicka"}
            </button>

            {statusMessage && (
              <p className={styles.helperText}>{statusMessage}</p>
            )}

            {!statusMessage && (
              <p className={styles.helperText}>
                Vi återkommer så snart som möjligt.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

/*
========================================
CONTACT PAGE OVERVIEW
========================================

- Allows users to send general contact messages.
- Supports direct car interest messages from car detail pages.
- Redirects guests to login before sending car interest.
- Saves messages to Supabase messages table.
- DUPLICATE CONTROL prevents the same email from sending interest for the same car twice.
- Disables the contact form after a message has been sent.
- Prefills message text when arriving from a car ad.
- Uses responsive contact form and map section.

*/