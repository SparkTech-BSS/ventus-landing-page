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
          <Link href="/support/check-user-existence" passHref>
            <a>Verificar existência de usuário</a>
          </Link>

          <Link href="/support/generate-reference" passHref>
            <a>Gerar Referência</a>
          </Link>

          <Link href="/support/check-existence-of-tickets" passHref>
            <a>Verificar existência de Ingressos</a>
          </Link>
        </div>

        <Image src={SupportAreaSVG} alt="" className={styles["illustration"]} />
      </div>
    </section>
  );
}
