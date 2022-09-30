import Image from "next/image";
import mobilePNG from "../../assets/png/figure/mobile.png";
import mobileAppSVG from "../../assets/svg/app-mobile-1.svg";

import {
  TicketICON,
  MusicICON,
  GeoLocalizationICON,
} from "../../components/Icon";

import styles from "./styles.module.scss";

export function StartParty() {
  return (
    <section
      id="about"
      className={`section ${styles["start-party"]}`}
      aria-label="start-party"
    >
      <div className={`container ${styles.container}`}>
        <h1 className={`section-heading ${styles["section-heading"]}`}>
          Comece escolhendo a festa
        </h1>

        <div className={styles["text-container"]}>
          <p className={styles.text}>
            Os eventos nunca foram tão faceis de <span>localizar</span>. Nossa
            base de dados e parceiros ajudam você a{" "}
            <span>encontrar a melhor diversão</span> para a sua noite. Comece
            escolhendo a sua cidade e veja os{" "}
            <span>eventos mais pertos de você.</span>
          </p>

          <p className={styles.text}>
            Preparem-se. Vem ai um show alucinante e que vai fazer você{" "}
            <span>pular de tanta energia</span>. Muita gente bonita e curtição.
            Tudo isso você encontra no aplicativo da <span>Ventus</span>.
          </p>
        </div>

        <div className={styles["row"]}>
          <div className={styles["row-col"]}>
            <Image
              src={mobilePNG}
              objectFit={"cover"}
              className={styles.figure}
              alt=""
            />
          </div>

          <div className={styles["row-col"]}>
            <div className={styles.list}>
              <div className={styles["list-item"]}>
                <div className={styles["list-item-icon"]}>
                  <TicketICON />
                </div>

                <div className={styles["list-item-content"]}>
                  <h3 className={styles["list-item-content__title"]}>
                    Compra rápida e fácil
                  </h3>
                  <p className={styles["list-item-content__text"]}>
                    Pague seu ingresso através do seu Multicaixa Reference ou
                    Cartão de Crédito.
                  </p>
                </div>
              </div>

              <div className={styles["list-item"]}>
                <div className={styles["list-item-icon"]}>
                  <GeoLocalizationICON />
                </div>

                <div className={styles["list-item-content"]}>
                  <h3 className={styles["list-item-content__title"]}>
                    Geolocalização
                  </h3>
                  <p className={styles["list-item-content__text"]}>
                    Veja quais festas e shows estão mais pertos de você e dos
                    seus amigos.
                  </p>
                </div>
              </div>

              <div className={styles["list-item"]}>
                <div className={styles["list-item-icon"]}>
                  <MusicICON />
                </div>

                <div className={styles["list-item-content"]}>
                  <h3 className={styles["list-item-content__title"]}>
                    Shows diversos
                  </h3>
                  <p className={styles["list-item-content__text"]}>
                    Aqui você encontra todo tipo de show e eventos, desde shows
                    e festas a noite até shows de comédia e muito mais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
