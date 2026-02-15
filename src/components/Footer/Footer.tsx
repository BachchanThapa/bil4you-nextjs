import Container from "@/components/Container";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.text}>Kontakt | Adress | Öppettider</p>
      </Container>
    </footer>
  );
}
