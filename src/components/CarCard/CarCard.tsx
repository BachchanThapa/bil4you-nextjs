import Image from "next/image";
import styles from "./carCard.module.scss";

type CarCardProps = {
  title: string;
  price: string;
  image: string;
};

export default function CarCard({ title, price, image }: CarCardProps) {
  return (
    <div className={styles.card}>
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
        <p className={styles.price}>{price}</p>
        <a href="#" className={styles.link}>
          Visa detaljer...
        </a>
      </div>
    </div>
  );
}
