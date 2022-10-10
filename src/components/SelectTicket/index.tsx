import { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FiPlus, FiMinus } from "react-icons/fi";
import ImgDetailPNG from "../../assets/png/event-detail/img-1.png";
import Image from "next/future/image";
import styles from "./styles.module.scss";

export function SelectTicket() {
  const [type, setType] = useState("pre-venda");

  function handleChangeType(value: string) {
    setType(value);
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={styles["select-ticket"]}>
      <form className={`container ${styles.container}`}>
        <h1 className={styles["event-name"]}>Nocal Summer</h1>
        <span className={styles["event-info"]}>Sex, Ago 12 · 21:00 Pm</span>
        <span className={styles["event-info"]}>Baía de Luanda, Luanda</span>

        <span className={styles["select-payment-text"]}>
          Por favor,Selecione o tipo de ingresso que deseja comprar.
        </span>

        <RadioGroup.Root defaultValue="default">
          <div className={styles.box}>
            <div className={styles.content}>
              <h2 className={styles.title}>Pré Venda</h2>
              <div className={styles["box-item"]}>
                <div className={styles["box-item-content"]}>
                  <div className={styles["price-row"]}>
                    <h2 className={styles.price}>AOA 10.000</h2>
                    <span className={styles["subtitle"]}>+ AOA 10% Seguro</span>
                  </div>
                  <span className={styles["subtitle"]}>
                    Valido até: Mai 30, 2022{" "}
                  </span>
                </div>

                {/* <RadioGroup.Item
                  value="pre-vend"
                  className={styles["radio-button"]}
                >
                  <RadioGroup.Indicator
                    className={styles["radio-button-indicator"]}
                  />
                </RadioGroup.Item> */}

                {/* <div className={styles["input-amount"]}>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.increase}`}
                    type="button"
                  >
                    <FiMinus size={20} />
                  </button>
                  <span className={styles["input-amount-text"]}>0</span>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.decrease}`}
                    type="button"
                  >
                    <FiPlus size={20} />
                  </button>
                </div> */}

                <span className={styles["sold-off"]}>Esgotado!</span>
              </div>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.content}>
              <h2 className={styles.title}>Área Normal</h2>
              <div className={styles["box-item"]}>
                <div className={styles["box-item-content"]}>
                  <div className={styles["price-row"]}>
                    <h2 className={styles.price}>AOA 15.000</h2>
                    <span className={styles["subtitle"]}>+ AOA 10% Seguro</span>
                  </div>
                  <span className={styles["subtitle"]}>
                    Valido até: Mai 30, 2022{" "}
                  </span>
                </div>

                {/* <RadioGroup.Item
                  value="area-normal"
                  className={styles["radio-button"]}
                >
                  <RadioGroup.Indicator
                    className={styles["radio-button-indicator"]}
                  />
                </RadioGroup.Item> */}
                <div className={styles["input-amount"]}>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.increase}`}
                    type="button"
                  >
                    <FiMinus size={20} />
                  </button>
                  <span className={styles["input-amount-text"]}>0</span>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.decrease}`}
                    type="button"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.content}>
              <h2 className={styles.title}>Área VIP</h2>
              <div className={styles["box-item"]}>
                <div className={styles["box-item-content"]}>
                  <div className={styles["price-row"]}>
                    <h2 className={styles.price}>AOA 35.000</h2>
                    <span className={styles["subtitle"]}>+ AOA 10% Seguro</span>
                  </div>
                  <span className={styles["subtitle"]}>
                    Valido até: Mai 30, 2022{" "}
                  </span>
                </div>

                {/* <RadioGroup.Item
                  value="area-vip"
                  className={styles["radio-button"]}
                >
                  <RadioGroup.Indicator
                    className={styles["radio-button-indicator"]}
                  />
                </RadioGroup.Item> */}
                <div className={styles["input-amount"]}>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.increase}`}
                    type="button"
                  >
                    <FiMinus size={20} />
                  </button>
                  <span className={styles["input-amount-text"]}>0</span>
                  <button
                    className={`${styles["input-amount-button"]} ${styles.decrease}`}
                    type="button"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RadioGroup.Root>
        <div className={styles.footer}>
          <div className={styles["footer-content"]}>
            <span className={styles["footer-content-heading"]}>
              Ingressos:{" "}
              <span className={styles["footer-content-heading__bold"]}>0</span>
            </span>
            <span className={styles["footer-content-heading"]}>
              Total:{" "}
              <span className={styles["footer-content-heading__bold"]}>0</span>
            </span>
          </div>
          <button className={styles.btn}>Próximo Passo</button>
        </div>
      </form>
    </section>
  );
}
