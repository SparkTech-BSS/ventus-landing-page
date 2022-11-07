import { useEffect } from "react";
import Link from "next/link";
import Image from "next/future/image";
import SupportAreaSVG from "../../../assets/svg/support-area.svg";
import styles from "./styles.module.scss";

export function SupportHome() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={styles["support-home"]}>
      <div className={`container ${styles.container}`}>
        <div className={styles["navigation-bar"]}>
          <Link href="" passHref>
            <a>Verificar existência de usuário</a>
          </Link>

          <Link href="" passHref>
            <a>Gerar Refência</a>
          </Link>

          <Link href="" passHref>
            <a>Verificar existência de tickets</a>
          </Link>
        </div>

        <Image src={SupportAreaSVG} alt="" className={styles["illustration"]} />
      </div>
    </section>
  );
}
