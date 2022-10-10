import { useEffect, useState } from "react";
import Image from "next/future/image";
import * as Progress from "@radix-ui/react-progress";
import MulticaixaReferencePNG from "../../assets/png/payment-method/multicaixa-reference.png";
import { CopyIcon } from "../Icon";
import styles from "./styles.module.scss";

export function Reference() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles["reference-page"]}>
      <div className={`${styles.container}`}>
        <Image
          src={MulticaixaReferencePNG}
          alt=""
          className={styles["payment-method-img"]}
        />

        <div className={styles.content}>
          <h1 className={styles.heading}>Pague com Referencia</h1>

          <span className={styles.text}>
            Copie o código abaixo para pagar via Referencia em qualquer banco
            habilitado
          </span>

          <button className={styles["copy-clipboard"]}>
            1241310231823089123381
            <CopyIcon />
          </button>

          <div className={styles["time-left-container"]}>
            <span className={styles["time-left-container-text"]}>
              O tempo para voce pagar acaba em:
            </span>

            <span className={styles["timer-heading"]}>09:55</span>

            <Progress.Root className={styles["progress-bar"]} value={66}>
              <Progress.Indicator
                className={styles["progress-bar-indicator"]}
                style={{ transform: `translateX(-${100 - progress}%)` }}
              />
            </Progress.Root>
          </div>

          <div className={styles.item}>
            <span className={styles["item-heading"]}>Entidade</span>
            <span className={styles["item-heading"]}>00750</span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-subheading"]}>Valor da reserva</span>
            <span className={styles["item-subheading"]}>kz30,000.00</span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-text"]}>Evento</span>
            <span className={styles["item-text"]}>Nocal Summer Land</span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-text"]}>Tickets</span>
            <span className={styles["item-text"]}>2</span>
          </div>

          <div className={styles["btn-group"]}>
            <button className={styles["btn-primary"]}>Voltar para Home</button>
            {/* <button className={styles["btn-secondary"]}>Compartilhar código</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
