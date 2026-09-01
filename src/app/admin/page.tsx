"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

const bil4YouUserId = "02027e99-0175-499c-8462-df1b2e815b3f";

type ProfileUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);
  const [activeView, setActiveView] = useState<"overview" | "users">(
    "overview",
  );

  const [totalCars, setTotalCars] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [privateSellerCars, setPrivateSellerCars] = useState(0);
  const [latestUserEmail, setLatestUserEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [latestPrivateCarDate, setLatestPrivateCarDate] = useState("");
  const [users, setUsers] = useState<ProfileUser[]>([]);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const adminUsers = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role !== "admin");

  useEffect(() => {
    async function checkAdminAccess() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      setAdminEmail(userData.user.email ?? "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (error || !profile || profile.role !== "admin") {
        router.push("/min-sida");
        return;
      }

      const { count: carsCount } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true });

      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: sellerCarsCount } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true })
        .neq("user_id", bil4YouUserId);

      const { data: latestPrivateCar } = await supabase
        .from("cars")
        .select("created_at")
        .neq("user_id", bil4YouUserId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const { data: latestUser } = await supabase
        .from("profiles")
        .select("email")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const { data: profileUsers } = await supabase
        .from("profiles")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: true });

      setTotalCars(carsCount ?? 0);
      setTotalUsers(usersCount ?? 0);
      setPrivateSellerCars(sellerCarsCount ?? 0);
      setLatestUserEmail(latestUser?.email ?? "");
      setUsers(profileUsers ?? []);

      if (latestPrivateCar?.created_at) {
        setLatestPrivateCarDate(formatDate(latestPrivateCar.created_at));
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
            <a
              className={activeView === "overview" ? styles.activeLink : ""}
              onClick={() => setActiveView("overview")}
            >
              Översikt
            </a>

            <Link href="/kop-bilar">Bilar</Link>

            <a
              className={activeView === "users" ? styles.activeLink : ""}
              onClick={() => setActiveView("users")}
            >
              Användare
            </a>

            <Link href="/admin/meddelanden">Meddelanden</Link>
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
              <h1>{activeView === "overview" ? "Översikt" : "Användare"}</h1>
            </div>

            <div className={styles.adminUser}>
              <span className={styles.avatar}>👤</span>
              <div>
                <strong>{adminEmail || "Admin"}</strong>
                <small>Admin</small>
              </div>
            </div>
          </div>

          {activeView === "overview" && (
            <>
              <div className={styles.statsGrid}>
                <Link href="/kop-bilar" className={styles.statCardBlue}>
                  <p>Totalt bilar</p>
                  <strong>{totalCars}</strong>
                  <span>Aktiva annonser</span>
                </Link>

                <article
                  className={styles.statCardGreen}
                  onClick={() => setActiveView("users")}
                >
                  <p>Användare</p>
                  <strong>{totalUsers}</strong>
                  <span>Registrerade konton</span>
                </article>

                <article className={styles.statCardYellow}>
                  <p>Privata annonser</p>
                  <strong>{privateSellerCars}</strong>
                  <span>
                    {latestPrivateCarDate
                      ? `Senaste: ${latestPrivateCarDate}`
                      : "Ingen privat annons"}
                  </span>
                </article>

                <article className={styles.statCardPurple}>
                  <p>Senaste användare</p>
                  <strong>👤</strong>
                  <span>{latestUserEmail || "Ingen användare hittad"}</span>
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
                    <Link href="/admin/meddelanden">Se meddelanden</Link>
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
            </>
          )}

          {activeView === "users" && (
            <div className={styles.dashboardGrid}>
              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Admin</h2>
                </div>

                <ul className={styles.infoList}>
                  {adminUsers.map((user, index) => (
                    <li key={user.id}>
                      {index + 1}. {user.email}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Registrerade användare</h2>
                </div>

                <ul className={styles.infoList}>
                  {normalUsers.map((user, index) => (
                    <li key={user.id}>
                      {index + 1}. {user.email}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

/*
  AdminPage - short explanation

  - This page first checks if the visitor is logged in.
  - Then it checks the user's role from the profiles table in Supabase.
  - Only users with role "admin" can stay on this page.
  - Normal users are redirected to /min-sida.
  - The dashboard numbers are dynamic and come from Supabase.
  - Total cars are counted from the cars table.
  - Total users are counted from the profiles table.
  - Private seller cars are counted by excluding the Bil4You company user id.
  - The latest private car date is shown in Swedish date format.
  - The latest registered user is shown from the newest profile.
  - The admin box shows the logged-in admin email dynamically.
  - The Användare view lists admins and normal registered users separately.
  - This makes the admin panel more useful without creating a new page.
*/
