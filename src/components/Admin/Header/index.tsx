import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { BiPlus } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Context } from "../../../contexts/AppContext";
import LogoSVG from "../../../assets/svg/logo(full-size).svg";
import { UserHeaderBox } from "../UserHeaderBox";
import styles from "./styles.module.scss";

export function Header() {
  const router = useRouter();

  return (
    <header className={styles["header"]}>
      <div className={styles.container}>
        <Link href="/" passHref>
          <a className={styles.logo}>
            <Image src={LogoSVG} width={90} height={42} alt="" />
          </a>
        </Link>

        <div className={styles.divider} />

        <h2 className={styles.heading}>Area do Administrador</h2>

        <nav className={`${styles.navbar}`}>
          <ul className={`${styles["navbar-list"]}`}>
            <li className="navbar-item">
              <Link href="/organizer/create-event" passHref>
                <a
                  className={`${styles["navbar-link"]} ${
                    router?.pathname.includes("/organizer/create-event") &&
                    styles.active
                  }`}
                  data-nav-link
                >
                  <BiPlus size={24} />
                  Adicionar Organizador
                </a>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="/admin" passHref>
                <a
                  className={`${styles["navbar-link"]} ${
                    router?.pathname.includes("/admin") && styles.active
                  }`}
                  data-nav-link
                >
                  Organizadores
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <UserHeaderBox />
      </div>
    </header>
  );
}