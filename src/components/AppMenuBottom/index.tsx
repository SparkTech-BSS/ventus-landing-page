import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiHome } from "react-icons/hi";

import { addEventOnElem, removeEventOnElem } from "../../utils";

import styles from "./styles.module.scss";

export function AppMenuBottom() {
  const [scrollY, setScrollY] = useState(0);
  const [activeElementOnScrollBar, setActiveElementOnScrollBar] =
    useState(false);

  const activeElementOnScroll = function () {
    if (window.scrollY >= 500) {
      setActiveElementOnScrollBar(true);
    } else {
      setActiveElementOnScrollBar(false);
    }
  };

  useEffect(() => {
    addEventOnElem(window, "scroll", activeElementOnScroll);

    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
    };
  }, []);

  return (
    <nav
      className={`${styles["app-menu-bottom"]} ${
        activeElementOnScrollBar ? styles["fade-inUp"] : styles["fade-outUp"]
      }`}
    >
      <ul>
        <li>
          <Link href="/" passHref>
            <a className={styles["app-menu-bottom-link"]}>
              <HiHome size={26} />
              Home
            </a>
          </Link>
        </li>
        <li>
          <a className={styles["app-menu-bottom-link"]}>
            <FiSearch size={26} />
            Pesquisar
          </a>
        </li>
        <li>
          <Link href="/tickets" passHref>
            <a className={styles["app-menu-bottom-link"]}>
              <HiOutlineTicket size={26} />
              Ingressos
            </a>
          </Link>
        </li>
        <li>
          <a className={styles["app-menu-bottom-link"]}>
            <MdOutlineFavoriteBorder size={26} />
            Favoritos
          </a>
        </li>
        <li>
          <a className={styles["app-menu-bottom-link"]}>
            <BiUser size={26} />
            Perfil
          </a>
        </li>
      </ul>
    </nav>
  );
}
