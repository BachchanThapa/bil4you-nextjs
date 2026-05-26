import Link from "next/link";
import styles from "./floatingAiButton.module.scss";

// This floating button gives quick access to the AI assistant from any page.
export default function FloatingAiButton() {
  return (
    <Link href="/ai-assistent" className={styles.button}>
      <span className={styles.icon}>AI</span>
      <span className={styles.text}>Fråga AI</span>
    </Link>
  );
}

/*
  This file:
  1. Shows a fixed AI button in the bottom-right corner.
  2. Links directly to the full AI assistant page.
  3. Makes the AI feature easy to discover without scrolling.
*/