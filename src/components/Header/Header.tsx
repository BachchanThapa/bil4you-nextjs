import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";

export default function Header() {
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
          <Link href="/">Hem</Link>
          <Link href="/kop-bilar">Köp bilar</Link>
          <Link href="/salj-bil">Sälj bil</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}