import Image from "next/image";
import womanPNG from "../../assets/png/figure/woman.png";
import mobilePNG from "../../assets/png/figure/mobile.png";
import womanSVG from "../../assets/svg/woman.svg";
import styles from "./styles.module.scss";

export function CashBack() {
  return (
    <section className={`section ${styles["cash-back"]}`} aria-label="cashback">
      <div className={`container ${styles.container}`}>
        <h1 className={`section-heading ${styles["section-heading"]}`}>
          Aproveite o evento escolhido com os teus amigos.
        </h1>

        <div className={styles["row"]}>
          <div className={styles["row-col"]}>
            <div className={styles.list}>
              <div className={styles["list-item"]}>
                <h2 className={styles["list-item__title"]}>
                  Se divirta com o melhor que o mundo das festas tem a oferecer
                </h2>
                <p className={styles["list-item__text"]}>
                Comece <span>comprando</span> o ingresso do evento desejado.
                </p>
              </div>

              <div className={styles["list-item"]}>
                <h2 className={styles["list-item__title"]}>
                Adquira o seu ingresso no conforto da sua casa
                </h2>
                <p className={styles["list-item__text"]}>
                Termine a sua semana conectado com os melhores <span>eventos</span> da Banda.
                </p>
              </div>
            </div>
          </div>

          <div className={styles["row-col"]}>
            <div className={styles["img-box"]}>
              <Image
                src={womanPNG}
                className={`${styles["figure"]}`}
                objectFit="cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
