import styles from "./styles.module.scss";

interface Props {
  totalGain?: number;
  totalSold?: number;
}

export function CardFinanceDetail({ totalGain, totalSold }: Props) {
  return (
    <div className={styles["card-finance"]}>
      <h2 className={styles.heading}>FINANCEIRO</h2>

      <div className={styles["items"]}>
        <div className={styles.item}>
          <span className={styles["item-heading"]}>Vendas totais</span>
          <span className={`${styles["item-price"]} ${styles["total-sale"]}`}>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "AOA",
            }).format(totalGain ? totalGain : 0)}
          </span>
        </div>

        <div className={styles.item}>
          <span className={styles["item-heading"]}>
            Em processamento (pendentes)
          </span>
          <span
            className={`${styles["item-price"]} ${styles["total-pending"]}`}
          >
            kz 0.00
          </span>
        </div>
      </div>

      <div className={styles["items"]}>
        <div className={styles.item}>
          <span className={styles["item-heading"]}>Tickets Vendidos</span>
          <span className={`${styles["item-price"]}`}>{totalSold}</span>
        </div>

        <div className={styles.item}>
          <span className={styles["item-heading"]}>Total recebido</span>
          <span className={`${styles["item-price"]}`}>kz 0.00</span>
        </div>
      </div>
    </div>
  );
}
