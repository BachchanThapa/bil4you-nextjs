import Image from "next/image";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.followText}>You can follow us</p>

          <div className={styles.socials}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src="/facebook.svg" alt="Facebook" width={70} height={40} />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/instagram.svg" alt="Instagram" width={70} height={40} />
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image src="/youtube.svg" alt="YouTube" width={70} height={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}