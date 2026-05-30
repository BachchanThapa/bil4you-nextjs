"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./minSida.module.scss";

export default function MinSidaPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteRequestLoading, setDeleteRequestLoading] = useState(false);
  const [deleteRequestMessage, setDeleteRequestMessage] = useState<string | null>(null);
  const [hasDeleteRequest, setHasDeleteRequest] = useState(false);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);
      if (user.email) setEmail(user.email);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role) setRole(profile.role);

      if (user.email) {
        const { data: existingRequests } = await supabase
          .from("account_delete_requests")
          .select("id")
          .eq("email", user.email)
          .eq("status", "pending")
          .limit(1);

        if (existingRequests && existingRequests.length > 0) {
          setHasDeleteRequest(true);
          setDeleteRequestMessage(
            "Du har redan en väntande begäran om kontoborttagning.",
          );
        }
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setEmail(null);
    setUserId(null);
    setRole(null);
  }

  async function handleDeleteRequest() {
    if (!userId || !email) {
      setDeleteRequestMessage("Kunde inte hitta användarens information.");
      return;
    }

    if (hasDeleteRequest) {
      setDeleteRequestMessage(
        "Du har redan en väntande begäran om kontoborttagning.",
      );
      return;
    }

    const confirmed = window.confirm(
      "Är du säker på att du vill begära borttagning av ditt konto?\n\n" +
        "Din begäran skickas till admin. Kontot tas inte bort direkt.\n\n" +
        "Admin kommer att granska begäran och hantera borttagningen manuellt.",
    );

    if (!confirmed) return;

    setDeleteRequestLoading(true);
    setDeleteRequestMessage(null);

    const { data: existingRequests } = await supabase
      .from("account_delete_requests")
      .select("id")
      .eq("email", email)
      .eq("status", "pending")
      .limit(1);

    if (existingRequests && existingRequests.length > 0) {
      setHasDeleteRequest(true);
      setDeleteRequestMessage(
        "Du har redan en väntande begäran om kontoborttagning.",
      );
      setDeleteRequestLoading(false);
      return;
    }

    const { error } = await supabase.from("account_delete_requests").insert({
      user_id: userId,
      email,
      message:
        "Användaren har begärt att få sitt konto borttaget. Kontot ska granskas och tas bort manuellt av admin.",
      status: "pending",
    });

    if (error) {
      console.error(error);
      setDeleteRequestMessage(
        "Något gick fel. Försök igen eller kontakta admin.",
      );
      setDeleteRequestLoading(false);
      return;
    }

    await supabase.from("messages").insert({
      name: "Kontoborttagning",
      phone: "",
      email,
      subject: "Kontoborttagning begärd",
      message: `En användare har begärt att få sitt konto borttaget.

E-post: ${email}
Användar-ID: ${userId}

Kontrollera account_delete_requests i Supabase och hantera borttagningen manuellt.`,
    });

    setHasDeleteRequest(true);
    setDeleteRequestMessage(
      "Din begäran har skickats. Admin kommer att granska den manuellt.",
    );
    setDeleteRequestLoading(false);
  }

  if (loading) return <main className={styles.page}>Laddar...</main>;

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
              Skapa en annons idag och gör din bil till någons nästa favorit. En
              bra affär kan ge dig en stor belöning!
            </p>
          </div>
          <span className={styles.successText}>Gå till Sälj bil 🎉</span>
        </Link>

        {role !== "admin" && (
          <div className={styles.deleteAccountBox}>
            <div>
              <h3>Vill du ta bort ditt konto?</h3>
              <p>
                Du kan skicka en begäran till admin. Kontot tas inte bort
                direkt. Admin granskar begäran och hanterar borttagningen
                manuellt.
              </p>

              {deleteRequestMessage && (
                <p className={styles.deleteRequestMessage}>
                  {deleteRequestMessage}
                </p>
              )}
            </div>

            <button
              className={styles.deleteRequestButton}
              onClick={handleDeleteRequest}
              disabled={deleteRequestLoading || hasDeleteRequest}
            >
              {hasDeleteRequest
                ? "Begäran är redan skickad"
                : deleteRequestLoading
                  ? "Skickar begäran..."
                  : "Begär borttagning av konto"}
            </button>
          </div>
        )}

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logga ut
        </button>
      </section>
    </main>
  );
}

/*
  MinSidaPage - short explanation

  - This page first checks if the visitor is logged in.
  - If no user is logged in, the visitor sees a login message.
  - If a user is logged in, the page shows the user's email and dashboard links.
  - The page also checks the user's role from the profiles table.
  - Admin users do not see the account deletion request button.
  - Normal users can send an account deletion request.
  - The page prevents duplicate pending deletion requests from the same email.
  - The button is disabled after a request has been sent.
  - The request is saved in the account_delete_requests table in Supabase.
  - Admin also gets a visible message in Adminpanel.
  - The account is not deleted directly from the browser.
  - Admin can later review the request and handle deletion manually.
*/