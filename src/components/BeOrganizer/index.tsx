import { useEffect } from "react";
import Link from "next/link";
import Image from "next/future/image";
import LogoRed from "../../assets/svg/logo-red.svg";
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
          <Link href="/" passHref>
            <a className={styles["logo-link"]}>
              <Image src={Logo} alt="" className={styles.logo} />
            </a>
          </Link>
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
            <IoIosArrowDown size={34} color="#1F1F1F" />
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
              <span
                className={`${styles["card-tag"]} ${styles["card-tag-free"]}`}
              >
                Criações gratuitas
              </span>
              <h3 className={styles["card-title"]}>Gratuito</h3>
              <span className={styles["card-text"]}>
                Para produtores com eventos presenciais, tanto pagos quanto
                gratuitos
              </span>
              <button className={styles["btn-start"]}>COMECE AGORA</button>

              <div className={styles["card-divider"]} />

              <div className={styles["card-item"]}>
                <span className={styles["card-item-heading"]}>Sem taxa</span>
                <span className={styles["card-item-subheading"]}>
                  A unica taxa que fica para nós é a porcentagem da venda de
                  ingressos, fora isso, nenhuma divulgação terá custos.
                </span>
              </div>

              <div className={styles["card-item"]}>
                <span className={styles["card-item-heading"]}>
                  Atendimento grátis
                </span>
                <span className={styles["card-item-subheading"]}>
                  Atendimento online em todas as nossas redes sociais disponivel
                  a todo momento
                </span>
              </div>
            </div>

            <div className={styles.card}>
              <span
                className={`${styles["card-tag"]} ${styles["card-tag-payed"]}`}
              >
                Ganhos maiores
              </span>
              <h3 className={styles["card-title"]}>Ganhe online</h3>
              <span className={styles["card-text"]}>
                Publique seu evento e ganhe online com a Ventus, para
                distribuição e divulgação melhor dos seus eventos
              </span>
              <button className={styles["btn-start"]}>COMECE AGORA</button>

              <div className={styles["card-divider"]} />

              <div className={styles["card-item"]}>
                <span className={styles["card-item-heading"]}>Sem taxa</span>
                <span className={styles["card-item-subheading"]}>
                  A unica taxa que fica para nós é a porcentagem da venda de
                  ingressos, fora isso, nenhuma divulgação terá custos.
                </span>
              </div>

              <div className={styles["card-item"]}>
                <span className={styles["card-item-heading"]}>
                  Atendimento grátis
                </span>
                <span className={styles["card-item-subheading"]}>
                  Atendimento online em todas as nossas redes sociais disponivel
                  a todo momento
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles["footer-bottom"]}`}>
          <Link href="/" passHref>
            <a>
              <Image src={LogoRed} alt="" />
            </a>
          </Link>

          <p className={styles["footer-bottom__text"]}>
            Duvidas? Acesse nossa{" "}
            <Link href="" passHref>
              <a>Central de Ajuda</a>
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
