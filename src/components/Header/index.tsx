import { useState } from "react";
import Image from "next/image";
import LogoSVG from "../../assets/svg/logo(full-size).svg";

import styles from "./styles.module.scss";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  function handleToggleShoMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header className={`${styles.header} ${styles.active}`}>
      <div className={`container ${styles.container}`}>
        <Image src={LogoSVG} width={90} height={42} alt="" />

        <nav className={`${styles.navbar} ${showMenu ? styles.active : ""}`}>
          <ul className={`${styles["navbar-list"]}`}>
            <li className="navbar-item">
              <a href="#event" className={styles["navbar-link"]} data-nav-link>
                Sobre
              </a>
            </li>

            <li className="navbar-item">
              <a
                href="#promoter"
                className={styles["navbar-link"]}
                data-nav-link
              >
                Seja um promotor
              </a>
            </li>

            <li className="navbar-item">
              <a
                href="#promoter"
                className={styles["navbar-link"]}
                data-nav-link
              >
                Contato
              </a>
            </li>
          </ul>

          <button className={styles["navbar-btn"]}>Baixar Aplicativo</button>
        </nav>

        <button
          className={`${styles["menu-toggle"]} ${
            showMenu ? styles.active : ""
          }`}
          aria-label="open menu"
          data-nav-toggler
          onClick={handleToggleShoMenu}
          type="button"
        >
          <div className={styles.one}></div>
          <div className={styles.two}></div>
          <div className={styles.three}></div>
        </button>
      </div>
    </header>
  );
}
