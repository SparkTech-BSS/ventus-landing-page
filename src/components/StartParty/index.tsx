import Image from "next/image";
import mobilePNG from "../../assets/png/figure/mobile.png";
import MobileWEBP from "../../assets/png/figure/mobile.webp";
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
          Selecione o Evento
        </h1>

        <div className={styles["text-container"]}>
          <p className={styles.text}>
            Os <span>eventos</span> nunca foram tão fáceis de localizar. A nossa
            base de dados e parceiros ajudam-te a selecionar/ escolher os
            melhores <span>eventos</span>.
          </p>

          <p className={styles.text}>
            Prepara-te. Vem aí um evento que vai proporcionar-te um bom
            <span>networking</span>, aprendizado e muita diversão. Tudo isso
            encontras apenas na <span>ventus</span>.
          </p>
        </div>

        <div className={styles["row"]}>
          <div className={styles["row-col"]}>
            <Image
              src={MobileWEBP}
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
                    Facilidade na compra
                  </h3>
                  <p className={styles["list-item-content__text"]}>
                    Pague o seu ingresso por um aplicativo bancário a sua
                    escolha ou ATM próximo de ti.
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
                    Localize os eventos mais próximos de ti e dos teus amigos.
                  </p>
                </div>
              </div>

              <div className={styles["list-item"]}>
                <div className={styles["list-item-icon"]}>
                  <MusicICON />
                </div>

                <div className={styles["list-item-content"]}>
                  <h3 className={styles["list-item-content__title"]}>
                    Variedade
                  </h3>
                  <p className={styles["list-item-content__text"]}>
                    Na ventus, tu encontras a mais vasta gama de eventos, desde
                    festas, workshops, shows, artes e muito mais.
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
