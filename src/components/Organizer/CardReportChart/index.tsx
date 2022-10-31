import { HiOutlineUsers } from "react-icons/hi";
import { VerticalChart } from "../Chart/Vertical";
import styles from "./styles.module.scss";

export function CardReportChart() {
  return (
    <div className={styles["card-report-chart"]}>
      <h2 className={styles.heading}>INGRESSOS</h2>

      <div className={styles.row}>
        <div className={styles.block}>
          <label>Filtrar por canal de venda: </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles.block}>
          <label>Filtrar por valor do ingresso: </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>

        <div className={styles.block}>
          <label>Filtrar por tipo de ingresso: </label>
          <select className={styles["filter-control__select"]}>
            <option>Todos os eventos</option>
          </select>
        </div>
      </div>

      <div className={styles.wrapper}>
        <VerticalChart />
      </div>

      <div className={styles.footer}>
        <div className={styles["footer-item"]}>
          <div className={styles["footer-item-content"]}>
            <HiOutlineUsers size={24} color="#CCCCCC" />

            <span className={styles["footer-item-content-text"]}>
              Ingressos confirmados
            </span>
          </div>

          <span className={styles["footer-item-number-active"]}>1</span>
        </div>

        <div className={styles["footer-item"]}>
          <div className={styles["footer-item-content"]}>
            <HiOutlineUsers size={24} color="#CCCCCC" />

            <span className={styles["footer-item-content-text"]}>
              Ingressos pendentes
            </span>
          </div>

          <span className={styles["footer-item-number-pending"]}>1</span>
        </div>

        <div className={styles["footer-item"]}>
          <div className={styles["footer-item-content"]}>
            <HiOutlineUsers size={24} color="#CCCCCC" />

            <span className={styles["footer-item-content-text"]}>
              Ingressos cancelados
            </span>
          </div>

          <span className={styles["footer-item-number-inactive"]}>1</span>
        </div>
      </div>
    </div>
  );
}
