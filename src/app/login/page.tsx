"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

type LoginMode = "choice" | "user" | "admin";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<LoginMode>("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");

    // EMAIL CHECK: checks if this e-mail exists before trying to log in.
    const { data: emailExists, error: emailCheckError } = await supabase.rpc(
      "email_exists",
      {
        check_email: email,
      },
    );

    if (emailCheckError) {
      console.error(emailCheckError);
      setMessage("Kunde inte kontrollera e-posten. Försök igen.");
      return;
    }

    if (!emailExists) {
      setMessage("E-posten är inte registrerad ännu. Skapa konto först.");
      return;
    }

    // Supabase Auth checks if email and password are correct.
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !loginData.user) {
      setMessage("E-post eller lösenord stämmer inte. Försök igen.");
      return;
    }

    // After login, we check the profiles table to know if the user is admin or normal user.
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", loginData.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      setMessage("Kunde inte kontrollera användarrollen. Försök igen.");
      return;
    }

    // ADMIN CONTROL: only users with admin role can enter Adminpanel.
    if (mode === "admin") {
      if (profile.role !== "admin") {
        await supabase.auth.signOut();
        setMessage("Du har inte admin-behörighet.");
        return;
      }

      router.push("/admin");
      return;
    }

    // Normal users go to Min sida after login.
    router.push("/min-sida");
  }

  if (mode === "choice") {
    return (
      <main className={styles.page}>
        <section className={styles.choiceCard}>
          <Image
            src="/logo-car-right.svg"
            alt="Bil4You car logo"
            width={82}
            height={46}
            priority
            className={styles.logoIcon}
          />

          <h1 className={styles.choiceTitle}>Bil4You</h1>

          <p className={styles.choiceText}>
            Köp och sälj begagnade bilar enkelt
          </p>

          <h2 className={styles.choiceSubtitle}>Välj hur du vill logga in</h2>

          <button
            type="button"
            className={`${styles.choiceButton} ${styles.userChoice}`}
            onClick={() => {
              setMode("user");
              setMessage("");
              setEmail("");
              setPassword("");
            }}
          >
            <span className={styles.choiceCircle}>👤</span>

            <span>
              <strong>Logga in som användare</strong>
              <small>För att köpa eller sälja bilar</small>
            </span>
          </button>

          <button
            type="button"
            className={`${styles.choiceButton} ${styles.adminChoice}`}
            onClick={() => {
              setMode("admin");
              setMessage("");
              setEmail("");
              setPassword("");
            }}
          >
            <span className={styles.choiceCircle}>🛡️</span>

            <span>
              <strong>Logga in som admin</strong>
              <small>För att hantera systemet</small>
            </span>
          </button>

          <p className={styles.switchText}>
            Har du inget konto? <Link href="/register">Skapa konto</Link>
          </p>
        </section>
      </main>
    );
  }

  const isAdmin = mode === "admin";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={isAdmin ? styles.adminIcon : styles.userIcon}>
          {isAdmin ? "🛡️" : "👤"}
        </div>

        <h1 className={styles.title}>
          {isAdmin ? "Admin Login" : "Användare Login"}
        </h1>

        <p className={styles.text}>
          {isAdmin
            ? "Endast för administratörer"
            : "Logga in för att köpa, sälja och spara favoritbilar."}
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

          <button
            className={`${styles.button} ${
              isAdmin ? styles.adminButton : styles.userButton
            }`}
            type="submit"
          >
            {isAdmin ? "Logga in som admin" : "Logga in som användare"}
          </button>
        </form>

        <p className={styles.forgotText}>
          <Link href="/forgot-password">Glömt lösenord?</Link>
        </p>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => {
            setMode("choice");
            setMessage("");
            setEmail("");
            setPassword("");
          }}
        >
          ← Tillbaka till val
        </button>
      </section>
    </main>
  );
}

/*
========================================
LOGIN PAGE OVERVIEW
========================================

- Lets visitors choose between user login and admin login.
- EMAIL CHECK:
  Checks if the e-mail exists before trying to log in.
- Shows a friendly message if the e-mail is not registered yet.
- Supabase Auth checks the password for registered users.
- ADMIN CONTROL:
  Checks the user's role from the profiles table after login.
- Normal users are sent to Min sida.
- Admin users are sent to Adminpanel.
- Normal users cannot enter Adminpanel by clicking admin login.

*/