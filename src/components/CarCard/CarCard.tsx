import Image from "next/image";
import Link from "next/link";
import styles from "./carCard.module.scss";

type CarCardProps = {
  title: string;
  price: string;
  image: string;
  href: string;

  // NEW: optional extra info lines (year, fuel, published date, etc.)
  metaLines?: string[];

  // ✅ NEW: allow this card to stretch (used on Köp bilar results)
  fluid?: boolean;
};

/*
  Note to reviewer/teacher:
  - CarCard is a reusable UI component (Hem + Köp bilar).
  - We keep layout here so pages only focus on structure/content.
*/
export default function CarCard({
  title,
  price,
  image,
  href,
  metaLines,
  fluid = false,
}: CarCardProps) {
  return (
    <article className={`${styles.card} ${fluid ? styles.cardFluid : ""}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>Pris: {price}</p>

        {/* NEW: extra metadata lines (optional) */}
        {metaLines?.length ? (
          <ul className={styles.metaList}>
            {metaLines.map((line) => (
              <li key={line} className={styles.metaItem}>
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        <Link href={href} className={styles.link}>
          Visa detaljer ...
        </Link>
      </div>
    </article>
  );
}