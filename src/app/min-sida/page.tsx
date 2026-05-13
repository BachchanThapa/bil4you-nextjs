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

      if (user?.email) {
        setEmail(user.email);
      }

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
        <section className={styles.card}>
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
      <section className={styles.card}>
        <h1 className={styles.title}>Min sida</h1>

        <p className={styles.text}>Du är inloggad som:</p>
        <span className={styles.email}>{email}</span>

        <div className={styles.actions}>
          <Link className={styles.actionCard} href="/mina-annonser">
            Mina annonser
          </Link>

          <Link className={styles.actionCard} href="/salj-bil">
            Sälj bil
          </Link>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logga ut
        </button>
      </section>
    </main>
  );
}