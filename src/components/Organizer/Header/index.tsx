import { useContext } from "react";
import Image from "next/future/image";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Context } from "../../../contexts/AppContext";
import LogoSVG from "../../../assets/svg/logo(full-size).svg";
import { UserHeaderBox } from "../UserHeaderBox";
import styles from "./styles.module.scss";

export function Header() {
  const { handleToggleSidebar } = useContext(Context);

  return (
    <header className={styles["header"]}>
      <div className={styles.container}>
        <button className={styles["toggle-menu-btn"]} onClick={handleToggleSidebar}>
          <FiMenu size={26}/>
        </button>

        <Link href="/" passHref>
          <a className={styles.logo} >
            <Image src={LogoSVG} width={90} height={42} alt="" />
          </a>
        </Link>

        <div className={styles.divider} />

        <h2 className={styles.heading}>Area do Organizador</h2>

        <nav className={`${styles.navbar}`}>
          <ul className={`${styles["navbar-list"]}`}>
            <li className="navbar-item">
              <a className={styles["navbar-link"]} data-nav-link>
                <BiPlus size={24} />
                Criar Evento
              </a>
            </li>

            <li className="navbar-item">
              <Link href="/organizer/dashboard" passHref>
                <a className={styles["navbar-link"]} data-nav-link>
                  Meus Eventos
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
