import { useEffect } from "react";
import Image from "next/future/image";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../assets/svg/logo-white.svg";
import styles from "./styles.module.scss";

export function BeOrganizer() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <>
      <section className={`${styles.hero}`}>
        <div className={`container ${styles["hero-top"]}`}>
          <Image src={Logo} alt="" className={styles.logo} />
          <div className={styles.divider} />
          <h2 className={styles.heading}>Para produtores</h2>
        </div>

        <div className={`container ${styles["hero-content"]}`}>
          <h1 className={styles["hero-content__heading"]}>
            Produza e crie eventos agora. APAREÇA PARA TODA ANGOLA
          </h1>

          <span className={styles["hero-content__text"]}>
            Junte-se à maior plataforma da Angola para criar eventos diferentes,
            com soluções completas para a publicação, gestão, venda e entrega
            das suas produções
          </span>

          <a className={styles["hero-content__btn"]}>criar evento agora</a>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles["card-content"]}`}>
          <button className={styles["btn-scroll"]}>
            <IoIosArrowDown size={24} />
          </button>

          <h2 className={styles["card-content-heading"]}>
            Comece a criar por aqui
          </h2>

          <span className={styles["card-content-subheading"]}>
            Confira nossas vantagens e crie seu evento de forma rapida e facil,
            tudo de graça.
          </span>

          <div className={styles.row}>
            <div className={styles.card}>
              <span className={styles["card-tag"]}>Criações gratuitas</span>
              <h3 className={styles["card-title"]}>Gratuito</h3>
              <span className={styles[""]}></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
