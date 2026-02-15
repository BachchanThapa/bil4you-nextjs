import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        Kontakt | Adress | Öppettider
      </div>
    </footer>
  );
}
