import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import {
  btnGroupHeroAnimation,
  textHeroAnimation,
  titleAnimation,
} from "utils";
import styles from "./styles.module.scss";

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
            Encontre <br />
            <span className={styles["heading-colored"]}>Eventos</span> em Angola
          </motion.h1>

          <motion.div
            className={`${styles["btn-group"]}`}
            variants={btnGroupHeroAnimation}
            exit="exit"
            initial="hidden"
            animate="show"
          >
            <Link href="#" passHref>
              <a className={`${styles.btn} ${styles["btn-outline"]}`}>
                Publicar Evento
              </a>
            </Link>
            
            <Link href="/events" passHref>
              <a className={`${styles.btn} ${styles["btn-full"]}`}>
                Encontrar Eventos
              </a>
            </Link>
          </motion.div>

          <motion.p
            className={styles.subheading}
            variants={textHeroAnimation}
            exit="exit"
            initial="hidden"
            animate="show"
          >
            A Ventus mostra-te os melhores eventos, atrações e shows mais
            próximos de ti.
          </motion.p>

          <Link href="/#event" scroll={false}>
            <button className={`${styles["btn-go-down"]}`}>
              <IoIosArrowDown />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
