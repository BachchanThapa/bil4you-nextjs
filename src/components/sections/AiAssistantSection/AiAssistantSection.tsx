import Link from "next/link";
import styles from "./aiAssistantSection.module.scss";

/*
  Note to reviewer/teacher:
  - This section makes the AI assistant visible from the homepage.
  - The full chat still lives on the separate /ai-assistent page.
  - This keeps the homepage clean while showing the new AI feature.
*/

export default function AiAssistantSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.label}>Bil4You AI</p>

        <h2 className={styles.title}>Behöver du hjälp att hitta rätt bil?</h2>

        <p className={styles.text}>
          Fråga vår AI-assistent om bilar, registrering, bilköp, försäljning
          eller kontaktinformation. Assistenten kan svara på svenska och
          engelska.
        </p>

        <Link href="/ai-assistent" className={styles.link}>
          Chatta med AI-assistenten
        </Link>
      </div>

      <div className={styles.previewBox}>
        <p className={styles.botMessage}>
          Hej! Jag kan hjälpa dig att hitta bilar och svara på frågor om
          Bil4You.
        </p>

        <p className={styles.userMessage}>Har ni Volvo-bilar?</p>

        <p className={styles.botMessage}>
          Ja, jag kan hjälpa dig att kontrollera tillgängliga bilar.
        </p>
      </div>
    </section>
  );
}

/*
  This file:
  1. Adds an AI assistant teaser section to the homepage.
  2. Links users to the full AI assistant page.
  3. Shows a small chat preview for visual understanding.
  4. Keeps the homepage clean and easy to understand.
*/