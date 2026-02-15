import Link from "next/link";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Bil4You</div>

        <nav className={styles.nav}>
          <Link href="/">Hem</Link>
          <Link href="/kop-bilar">Köp bilar</Link>
          <Link href="/salj-bil">Sälj bil</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}
