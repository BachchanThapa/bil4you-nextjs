"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function ResetPasswordPage() {
  const router = useRouter();

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

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!isPasswordValid(password)) {
      setMessage(
        "Lösenordet måste vara minst 6 tecken och innehålla en stor bokstav, en liten bokstav och en siffra."
      );
      setMessageType("error");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage("Lösenordet kunde inte uppdateras. Försök igen.");
      setMessageType("error");
      return;
    }

    setMessage("Ditt lösenord är uppdaterat. Du skickas nu till inloggning.");
    setMessageType("success");

    setTimeout(() => {
      router.push("/login");
    }, 2500);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Nytt lösenord</h1>
        <p className={styles.text}>
          Skriv ett nytt lösenord för ditt Bil4You-konto.
        </p>

        {message && (
          <p
            className={
              messageType === "success" ? styles.successMessage : styles.errorMessage
            }
          >
            {message}
          </p>
        )}

        <form className={styles.form} onSubmit={handleUpdatePassword}>
          <label className={styles.label} htmlFor="password">
            Nytt lösenord
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
            Uppdatera lösenord
          </button>
        </form>
      </section>
    </main>
  );
}