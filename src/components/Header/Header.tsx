import Link from "next/link";
import Container from "@/components/Container";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            Bil4You
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/" className={styles.link}>Hem</Link>
            <Link href="/kop-bilar" className={styles.link}>Köp bilar</Link>
            <Link href="/salj-bil" className={styles.link}>Sälj bil</Link>
            <Link href="/kontakt" className={styles.link}>Kontakt</Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
