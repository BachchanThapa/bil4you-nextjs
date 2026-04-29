"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("E-post eller lösenord stämmer inte. Försök igen.");
      return;
    }

    router.push("/");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Logga in</h1>
        <p className={styles.text}>
          Logga in för att kunna sälja din bil och använda personliga funktioner.
        </p>

        {message && <p className={styles.errorMessage}>{message}</p>}

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label} htmlFor="email">
            E-post
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="dinmail@exempel.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label} htmlFor="password">
            Lösenord
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Ditt lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.button} type="submit">
            Logga in
          </button>
        </form>

        <p className={styles.forgotText}>
          <a href="/forgot-password">Glömt lösenord?</a>
        </p>

        <p className={styles.switchText}>
          Inget konto ännu? <a href="/register">Registrera dig här</a>
        </p>
      </section>
    </main>
  );
}