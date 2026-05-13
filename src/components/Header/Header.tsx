"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./header.module.scss";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    }

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  }

  function getLinkClass(href: string) {
    if (href === "/kop-bilar" && pathname.startsWith("/kop-bilar")) {
      return styles.activeLink;
    }

    return pathname === href ? styles.activeLink : "";
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Bil4You home">
          <Image
            src="/logo-car-right.svg"
            alt="Bil4You car logo"
            width={70}
            height={40}
            priority
            className={styles.logoIcon}
          />
          <span className={styles.brandText}>Bil4You</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={getLinkClass("/")}>
            Hem
          </Link>

          <Link href="/kop-bilar" className={getLinkClass("/kop-bilar")}>
            Köp bilar
          </Link>

          <Link href="/salj-bil" className={getLinkClass("/salj-bil")}>
            Sälj bil
          </Link>

          <Link href="/kontakt" className={getLinkClass("/kontakt")}>
            Kontakt
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className={getLinkClass("/login")}>
                Logga in
              </Link>

              <Link href="/register" className={getLinkClass("/register")}>
                Registrera
              </Link>
            </>
          ) : (
            <>
              <Link href="/min-sida" className={getLinkClass("/min-sida")}>
                Min sida
              </Link>

              <button onClick={handleLogout} className={styles.logoutButton}>
                Logga ut
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}