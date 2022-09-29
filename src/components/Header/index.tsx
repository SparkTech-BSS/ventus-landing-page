import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import Image from "next/image";
import LogoSVG from "../../assets/svg/logo(full-size).svg";
import { ApplePlayICON, GooglePlayICON } from "../Icon";

import styles from "./styles.module.scss";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const nodeNavigation = useRef() as React.MutableRefObject<HTMLDivElement>;

  function handleToggleShoMenu() {
    setShowMenu(!showMenu);
  }

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const addEventOnElem = function (elem: any, type: any, callback: any) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  };

  const removeEventOnElem = function (elem: any, type: any, callback: any) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].removeEventListener(type, callback);
      }
    } else {
      elem.removeEventListener(type, callback);
    }
  };

  const activeElementOnScroll = function () {
    if (window.scrollY > 100) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  const handleCloseNavbar = () => {
    setShowMenu(false);
  };

  const setVh = useCallback(() => {}, []);

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useLayoutEffect(() => {
    handleSize();
  }, []);

  useEffect(() => {
    const navbarLinks = document.querySelectorAll("[data-nav-link]");

    addEventOnElem(navbarLinks, "click", handleCloseNavbar);

    addEventOnElem(window, "scroll", activeElementOnScroll);

    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();

    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
      removeEventOnElem(navbarLinks, "click", handleCloseNavbar);
      window.removeEventListener("scroll", logit);
    };
  }, []);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [scrollY, windowSize.height]);

  return (
    <header className={`${styles.header} ${activeHeader ? styles.active : ""}`}>
      <div className={`container ${styles.container}`}>
        <Link href="#">
          <a href="#" className={styles.logo}>
            <Image src={LogoSVG} width={90} height={42} alt="" />
          </a>
        </Link>

        <nav className={`${styles.navbar} ${showMenu ? styles.active : ""}`}>
          <ul className={`${styles["navbar-list"]}`}>
            <li className="navbar-item">
              <Link href="#about" scroll={false}>
                <a className={styles["navbar-link"]} data-nav-link>
                  Sobre
                </a>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="#">
                <a
                  href="#promoter"
                  className={styles["navbar-link"]}
                  data-nav-link
                >
                  Seja um promotor
                </a>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="#contact" scroll={false}>
                <a
                  href="#promoter"
                  className={styles["navbar-link"]}
                  data-nav-link
                >
                  Contato
                </a>
              </Link>
            </li>
          </ul>

          <div className="container">
            <button className={styles["navbar-btn"]}>Baixar Aplicativo</button>
          </div>

          <div className={`container ${styles["btn-group"]}`}>
            <button className={styles["btn-download-app"]}>
              <div className={styles["btn-icon"]}>
                <GooglePlayICON />
              </div>

              <span className={styles["btn-content"]}>
                <span className={styles["btn-content__title"]}>
                  Disponível no
                </span>
                <span className={styles["btn-content__text"]}>Google Play</span>
              </span>
            </button>

            <button className={styles["btn-download-app"]}>
              <div className={styles["btn-icon"]}>
                <ApplePlayICON />
              </div>

              <span className={styles["btn-content"]}>
                <span className={styles["btn-content__title"]}>Baixar na</span>
                <span className={styles["btn-content__text"]}>Apple Store</span>
              </span>
            </button>
          </div>
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
