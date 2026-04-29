"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage("Något gick fel. Kontrollera e-posten och försök igen.");
      setMessageType("error");
      return;
    }

    setMessage("Om e-posten finns registrerad skickas en återställningslänk.");
    setMessageType("success");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Återställ lösenord</h1>
        <p className={styles.text}>
          Skriv in din e-postadress så skickar vi en länk för att återställa ditt lösenord.
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

        <form className={styles.form} onSubmit={handleResetPassword}>
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

          <button className={styles.button} type="submit">
            Skicka återställningslänk
          </button>
        </form>

        <p className={styles.switchText}>
          Kommer du ihåg lösenordet? <a href="/login">Logga in här</a>
        </p>
      </section>
    </main>
  );
}