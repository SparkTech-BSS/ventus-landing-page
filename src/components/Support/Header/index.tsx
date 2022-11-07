import { UserHeaderBox } from "components/UserHeaderBox";
import Image from "next/future/image";
import Link from "next/link";
import Logo from "../../../assets/svg/logo-white.svg";
import styles from "./styles.module.scss";

export function Header() {
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

        <UserHeaderBox color="white"/>
      </div>
    </header>
  );
}
