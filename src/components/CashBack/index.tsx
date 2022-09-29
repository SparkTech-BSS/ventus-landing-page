import Image from "next/image";

import womanSVG from "../../assets/svg/woman.svg";
import styles from "./styles.module.scss";

export function CashBack() {
  return (
    <section className={`section ${styles["cash-back"]}`} aria-label="cashback">
      <div className={`container ${styles.container}`}>
        <h1 className={`section-heading ${styles["section-heading"]}`}>
          Curta a festa escolhida com seus amigos
        </h1>

        <div className={styles["row"]}>
          <div className={styles["row-col"]}>
            <div className={styles.list}>
              <div className={styles["list-item"]}>
                <h2 className={styles["list-item__title"]}>
                  Se divirta com o melhor que o mundo das festas tem a oferecer
                </h2>
                <p className={styles["list-item__text"]}>
                  Comece <span>comprando o ingresso</span> da festa que você
                  está mais afim.
                </p>
              </div>

              <div className={styles["list-item"]}>
                <h2 className={styles["list-item__title"]}>
                  Seus dias de sexta nunca mais serão em casa
                </h2>
                <p className={styles["list-item__text"]}>
                  Termine sua sexta a noite dançando e se divertindo com quem
                  você merece nos <span>lugares que voce mais gosta</span>.
                </p>
              </div>
            </div>
          </div>

          <div className={styles["row-col"]}>
            <div className={styles["img-box"]}>
              <Image
                src={womanSVG}
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
