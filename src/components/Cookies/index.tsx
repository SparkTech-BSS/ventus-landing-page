import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { goUp } from "utils";

export function Cookies() {
  const [active, setActive] = useState(true);

  function handleClose() {
    setActive(false);
    document.documentElement.style.setProperty("--overflow", `auto`);
  }

  return (
    <>
      <div className={`${styles.shadow} ${active ? styles.active : ""}`}></div>

      <section
        className={`${styles.cookies} ${active ? styles.active : ""}`}
      >
        <p className={styles["cookies-text"]}>
          Para saber mais sobre os cookies olhe nossa{" "}
          <a className={styles["cookies-link"]} href="#">
            Politica de privacidade
          </a>{" "}
          e{" "}
          <a className={styles["cookies-link"]} href="#">
            Termos de uso
          </a>
        </p>

        <div className={styles["btn-group"]}>
          <button className={styles["btn-primary"]} onClick={handleClose}>
            Aceitar
          </button>
          <button className={styles["btn-secondary"]}>Mais Detalhes</button>
        </div>
      </section>
    </>
  );
}
