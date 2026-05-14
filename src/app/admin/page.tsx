"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

export default function AdminPage() {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAdminAccess() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (error || !profile || profile.role !== "admin") {
        router.push("/min-sida");
        return;
      }

      setIsChecking(false);
    }

    checkAdminAccess();
  }, [router]);

  if (isChecking) {
    return (
      <main className={styles.page}>
        <p>Kontrollerar admin-behörighet...</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.adminBrand}>
            <span className={styles.adminIcon}>🛡️</span>
            <span>Bil4You Admin</span>
          </div>

          <nav className={styles.sideNav}>
            <a className={styles.activeLink}>Översikt</a>
            <a>Bilar</a>
            <a>Användare</a>
            <a>Meddelanden</a>
            <a>Statistik</a>
          </nav>

          <Link href="/" className={styles.backLink}>
            Tillbaka till sidan
          </Link>
        </aside>

        <section className={styles.content}>
          <div className={styles.topBar}>
            <div>
              <p className={styles.kicker}>Adminpanel</p>
              <h1>Översikt</h1>
            </div>

            <div className={styles.adminUser}>
              <span className={styles.avatar}>👤</span>
              <div>
                <strong>Bachchan Thapa</strong>
                <small>Admin</small>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <article className={styles.statCardBlue}>
              <p>Totalt bilar</p>
              <strong>8</strong>
              <span>Aktiva annonser</span>
            </article>

            <article className={styles.statCardGreen}>
              <p>Användare</p>
              <strong>2</strong>
              <span>Registrerade konton</span>
            </article>

            <article className={styles.statCardYellow}>
              <p>Nya annonser</p>
              <strong>2</strong>
              <span>Från privata säljare</span>
            </article>

            <article className={styles.statCardPurple}>
              <p>Meddelanden</p>
              <strong>0</strong>
              <span>Kommande funktion</span>
            </article>
          </div>

          <div className={styles.dashboardGrid}>
            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2>Snabbåtgärder</h2>
              </div>

              <div className={styles.quickActions}>
                <Link href="/salj-bil">+ Lägg till bil</Link>
                <Link href="/kop-bilar">Se alla bilar</Link>
                <Link href="/mina-annonser">Hantera annonser</Link>
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2>Admin-rättigheter</h2>
              </div>

              <ul className={styles.infoList}>
                <li>Kan se adminpanelen.</li>
                <li>Kan hantera bilannonser.</li>
                <li>Kan få översikt över systemet.</li>
                <li>Vanliga användare skickas till Min sida.</li>
              </ul>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}