"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./minSida.module.scss";

export default function MinSidaPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) setEmail(user.email);

      setLoading(false);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setEmail(null);
  }

  if (loading) {
    return <main className={styles.page}>Laddar...</main>;
  }

  if (!email) {
    return (
      <main className={styles.page}>
        <section className={styles.dashboard}>
          <h1 className={styles.title}>Min sida</h1>
          <p className={styles.text}>Du måste logga in för att se Min sida.</p>
          <Link className={styles.loginLink} href="/login">
            Logga in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.dashboard}>
        <div className={styles.hero}>
          <div className={styles.profileCircle}>
            <span>👤</span>
          </div>

          <div className={styles.welcomeText}>
            <h1>
              <span className={styles.miniCar}>🚗</span>
              Välkommen <br /> tillbaka!
            </h1>

            <p>Du är inloggad som:</p>
            <strong>{email}</strong>
          </div>

          <div className={styles.carScene}>
            <span className={styles.sun}></span>
            <span className={styles.cloudOne}></span>
            <span className={styles.cloudTwo}></span>
            <span className={styles.hill}></span>
            <span className={styles.flowers}>🌼🌼</span>
            <div className={styles.speedLines}></div>
            <div className={styles.bigCar}>🚗</div>
          </div>
        </div>

        <div className={styles.intro}>
          <h2>Din bilresa börjar här!</h2>
          <p>
            Hantera dina egna annonser, spara favoritbilar och fortsätt enkelt
            där du slutade.
          </p>
        </div>

        <div className={styles.actions}>
          <Link className={styles.actionCard} href="/mina-annonser">
            <span className={styles.iconBox}>🚙</span>
            <span>
              <strong>Mina annonser</strong>
              <small>Se och hantera dina bilannonser på ett enkelt sätt.</small>
            </span>
            <b>›</b>
          </Link>

          <Link className={styles.actionCard} href="/favoriter">
            <span className={styles.iconBoxHeart}>♥</span>
            <span>
              <strong>Mina favoriter</strong>
              <small>Se bilarna du har sparat och vill titta närmare på.</small>
            </span>
            <b>›</b>
          </Link>
        </div>

        <Link className={styles.sellBox} href="/salj-bil">
          <div className={styles.moneyIcon}>💸</div>

          <div>
            <h3>Redo att sälja din bil?</h3>
            <p>
              Skapa en annons idag och gör din bil till någons nästa favorit.
              En bra affär kan ge dig en stor belöning!
            </p>
          </div>

          <span className={styles.successText}>
            Gå till Sälj bil 🎉
          </span>
        </Link>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logga ut
        </button>
      </section>
    </main>
  );
}