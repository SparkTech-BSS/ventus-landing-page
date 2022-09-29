import styles from "./styles.module.scss";
import { IoIosArrowDown } from "react-icons/io";


export function Hero() {
  return (
    <section className={`section-hero ${styles.hero}`} aria-label="hero">
      <div className={`container ${styles.container}`}>
        <div className={styles["hero-content"]}>
          <h1 className={styles.heading}>
            Encontre <span className={styles["heading-colored"]}>Festas</span> e{" "}
            <span className={styles["heading-colored"]}>Eventos</span> em Angola
          </h1>

          <div className={`${styles["btn-group"]}`}>
            <button className={`${styles.btn} ${styles["btn-outline"]}`}>Publicar Evento</button>
            <button className={`${styles.btn} ${styles["btn-full"]}`}>Encontrar Festa</button>
          </div>

          <p className={styles.subheading}>
            A Ventus te mostra quais festas estão a bater na sua região com as
            melhores pessoas que estarão no evento e as melhores atrações e
            shows.
          </p>

          <button className={`${styles["btn-go-down"]}`}>
            <IoIosArrowDown/>
          </button>
        </div>
      </div>
    </section>
  );
}
