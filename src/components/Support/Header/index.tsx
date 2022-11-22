import { useEffect, useState } from "react";
import { UserHeaderBox } from "../UserHeaderBox";
import Image from "next/future/image";
import Link from "next/link";
import Logo from "../../../assets/svg/logo-white.svg";
import { addEventOnElem, removeEventOnElem } from "utils";
import styles from "./styles.module.scss";

export function Header() {
  const [activeHeader, setActiveHeader] = useState(false);

  const activeElementOnScroll = function () {
    if (window.scrollY > 100) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  useEffect(() => {
    addEventOnElem(window, "scroll", activeElementOnScroll);

    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
    };
  }, []);

  return (
    <header className={`${styles.header}`}>
      <div className={`container ${styles["container"]}`}>
        <Link href="/" passHref>
          <a className={styles["logo-link"]}>
            <Image src={Logo} alt="" className={styles.logo} />
          </a>
        </Link>
        <div className={styles.divider} />
        <h2 className={styles.heading}>Suporte Ventus</h2>

        <UserHeaderBox />
      </div>
    </header>
  );
}
