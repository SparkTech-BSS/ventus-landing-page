import { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  MultiCaixaExpress26Icon,
  PaySmart26Icon,
  ShoppingCartICON,
} from "../../components/Icon";
import styles from "./styles.module.scss";

export function PaymentMethod() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={styles["payment-method"]}>
      <form className={`container ${styles.container}`}>
        <h1 className={styles["event-name"]}>Nocal Summer</h1>
        <span className={styles["event-info"]}>Sex, Ago 12 · 21:00 Pm</span>
        <span className={styles["event-info"]}>Baía de Luanda, Luanda</span>

        <h1 className={styles.heading}>Método de pagamento</h1>

        <span className={styles["select-payment-text"]}>Qual a forma de pagamento?</span>

        <RadioGroup.Root defaultValue="default" className={styles.content}>
          <RadioGroup.Item
            value="multicaixa-reference"
            className={styles["radio-button"]}
          >
            {/* <RadioGroup.Indicator
              className={styles["radio-button-indicator"]}
            /> */}

            <div className={styles["payment-icon"]}>
              <MultiCaixaExpress26Icon />
            </div>

            <span className={styles["payment-title"]}>
              Pagar com referência
            </span>
          </RadioGroup.Item>

          <RadioGroup.Item value="pay-smart" className={styles["radio-button"]}>
            {/* <RadioGroup.Indicator
              className={styles["radio-button-indicator"]}
            /> */}

            <div className={styles["payment-icon"]}>
              <PaySmart26Icon />
            </div>

            <span className={styles["payment-title"]}>Pagar com Paysmart</span>
          </RadioGroup.Item>
        </RadioGroup.Root>

        <span className={styles.text}>Revise seu pedido</span>

        <div className={styles["review-order"]}>
          <div className={styles["review-order-item"]}>
            <span className={styles["review-order-item-heading"]}>Item</span>
            <span className={styles["review-order-item-heading"]}>Valor</span>
          </div>
          <div className={styles["review-order-item"]}>
            <span className={styles["review-order-item-subheading"]}>
              1x FÊMININO 2º LOTE
            </span>
            <span className={styles["review-order-item-subheading"]}>
              AOA 10.000
            </span>
          </div>
          <div className={styles["review-order-item"]}>
            <span className={styles["review-order-item-heading"]}>Taxas</span>
            <span className={styles["review-order-item-heading"]}>AOA 250</span>
          </div>
          <div className={styles["review-order-item"]}>
            <span className={styles["review-order-item-heading"]}>Total</span>
            <span className={styles["review-order-item-heading"]}>
              AOA 2050
            </span>
          </div>
        </div>

        <span className={styles["term-text"]}>
          Ao clicar no botão abaixo, você declara concordar com nossos{" "}
          <a href="#" className={styles["term-text-link"]}>
            Termos de Serviço
          </a>
        </span>

        <button className={styles["btn-buy-ticket"]}>
          <ShoppingCartICON />
          Concluir compra
        </button>

        <div className={styles["expiration-time"]}>
          <span className={styles["expiration-time-heading"]}>
            Tempo de expiração do carrinho:
          </span>
          <span className={styles["expiration-time-heading"]}>10:00</span>
        </div>
      </form>
    </section>
  );
}
