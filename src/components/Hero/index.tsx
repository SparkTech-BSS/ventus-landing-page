import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import {
  btnGroupHeroAnimation,
  textHeroAnimation,
  titleAnimation,
} from "utils";

export function Hero() {
  return (
    <section className={`section-hero ${styles.hero}`} aria-label="hero">
      <div className={`container ${styles.container}`}>
        <div className={styles["hero-content"]}>
          <motion.h1
            exit="exit"
            initial="hidden"
            animate="show"
            variants={titleAnimation}
            className={styles.heading}
          >
            Encontre <span className={styles["heading-colored"]}>Festas</span> e{" "}
            <span className={styles["heading-colored"]}>Eventos</span> em Angola
          </motion.h1>

          <motion.div
            className={`${styles["btn-group"]}`}
            variants={btnGroupHeroAnimation}
            exit="exit"
            initial="hidden"
            animate="show"
          >
            <button className={`${styles.btn} ${styles["btn-outline"]}`}>
              Publicar Evento
            </button>
            <button className={`${styles.btn} ${styles["btn-full"]}`}>
              Encontrar Festa
            </button>
          </motion.div>

          <motion.p
            className={styles.subheading}
            variants={textHeroAnimation}
            exit="exit"
            initial="hidden"
            animate="show"
          >
            A Ventus te mostra quais festas estão a bater na sua região com as
            melhores pessoas que estarão no evento e as melhores atrações e
            shows.
          </motion.p>

          <button className={`${styles["btn-go-down"]}`}>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
    </section>
  );
}
