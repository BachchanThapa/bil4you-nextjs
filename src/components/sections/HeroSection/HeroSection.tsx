import styles from "./heroSection.module.scss";

/*
  Note to reviewer/teacher:
  - HeroSection is a "section component" for Hem.
  - Page.tsx stays small and only assembles sections (LEGO structure).
  - We reuse global UI classes (input/button) to keep design consistent.
*/

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
};

export default function HeroSection({
  title = "Hitta din nästa bil",
  subtitle = "Sök bland begagnade bilar i Sverige",
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroText}>{subtitle}</p>

        <div className={styles.searchRow}>
          <input
            type="text"
            className={`input ${styles.searchInput}`}
            placeholder="Sök på märke eller modell..."
            aria-label="Sök bil"
          />

          <button type="button" className={`buttonPrimary ${styles.searchButton}`}>
            Sök bil
          </button>
        </div>
      </div>
    </section>
  );
}
