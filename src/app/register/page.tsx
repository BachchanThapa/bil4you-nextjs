"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  function isPasswordValid(password: string) {
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasMinLength && hasUppercase && hasLowercase && hasNumber;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!isPasswordValid(password)) {
      setMessage(
        "Lösenordet måste vara minst 6 tecken och innehålla en stor bokstav, en liten bokstav och en siffra.",
      );
      setMessageType("error");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      setMessage(
        "Kontot kunde inte skapas. E-posten kan redan vara registrerad.",
      );
      setMessageType("error");
      return;
    }

    /*
  The profiles row is created automatically by a Supabase database trigger.
  That keeps registration cleaner and makes every new user visible in admin stats.
*/

    setMessage("Kontot har skapats. Du kan nu logga in och använda Min sida.");
    setMessageType("success");

    setTimeout(() => {
      router.push("/login");
    }, 2500);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Registrera</h1>
        <p className={styles.text}>
          Skapa ett konto för att kunna sälja din bil och använda personliga
          funktioner.
        </p>

        {message && (
          <p
            className={
              messageType === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </p>
        )}

        <form className={styles.form} onSubmit={handleRegister}>
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
            placeholder="Minst 6 tecken"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className={styles.passwordHint}>
            Minst 6 tecken, en stor bokstav, en liten bokstav och en siffra.
          </p>

          <button className={styles.button} type="submit">
            Skapa konto
          </button>
        </form>

        <p className={styles.switchText}>
          Har du redan ett konto? <a href="/login">Logga in här</a>
        </p>
      </section>
    </main>
  );
}
