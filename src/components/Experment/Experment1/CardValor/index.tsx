import styles from "./styles.module.scss";

interface CardValorProps {
  textContentTitle?: string;
  textContentSubtitle?: string;
  textValor?: string;
  color?: "card-color-primary" | "card-color-secondary" | "card-color-default";
  valorColor?: "valor-color-primary" | "valor-color-secondary";
  fontWeight?:
    | "card-fontWeight-800"
    | "card-fontWeight-700"
    | "card-fontWeight-600";
  fontSize?: "card-size-14" | "card-size-12";
}

export function CardValor({
  textContentTitle = "Aqui",
  textContentSubtitle = "Aqui",
  color = "card-color-primary",
  valorColor = "valor-color-primary",
  fontSize = "card-size-14",
  fontWeight = "card-fontWeight-800",
  textValor = "Kz 0.00",
}: CardValorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.cardHome}>
        <h2 className={ `${styles.cardTitle} ${styles[fontSize]} ${styles[fontWeight]} ${styles[color]}`}>{textContentTitle}</h2>
        <p className={`${styles.cardSubtitle} ${styles[fontSize]} ${styles[fontWeight]} ${styles[color]}`}>{textContentSubtitle}
        </p>
        <span className={`${styles.cardValor} ${styles[valorColor]} ${styles[fontSize]} ${styles[fontWeight]} `}>{textValor}</span>
      </div>
    </div>
  );
}
