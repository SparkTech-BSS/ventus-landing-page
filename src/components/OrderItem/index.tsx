import Image from "next/future/image";
import { useEffect, useState, useMemo } from "react";
import { MdAccessTime } from "react-icons/md";
import { CopyIcon } from "../Icon";
import { accumulateTicketNumber } from "utils";
import MulticaixaReferencePNG from "../../assets/png/payment-method/multicaixa-reference.png";
import styles from "./styles.module.scss";

interface Props {
  data: any;
}

export function OrderItem({ data }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(data?.order?.referenceId)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const countDownDate = new Date(data?.order?.timeToPay).getTime();

  const isExpiredOrder = useMemo(() => {
        const distanceBetweenDate = countDownDate - new Date().getTime();
        return distanceBetweenDate <= 0 ? true : false;
  }, []);

  useEffect(() => {
    let x = setInterval(() => {
      let now = new Date().getTime();

      let distance = countDownDate - now;

      setMinute(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));

      setSecond(Math.floor((distance % (1000 * 60)) / 1000));

      if (distance < 0) {
        clearInterval(x);
        setMinute(0);

        setSecond(0);
      }
    }, 1000);
  }, [countDownDate, minute, second]);

  //${styles.expired}

  const minutes = String(minute).padStart(2, "0");
  const seconds = String(second).padStart(2, "0");

  return (
    <div className={`${styles["order-card"]} ${isExpiredOrder ? styles.expired : ''}`}>
      <span className={styles["order-title"]}>Pagamento Pendente</span>

      <div className={styles.row}>
        <div className={styles.col}>
          <span className={styles["copy-text"]}>
            Copie o código para pagar via Referencia em qualquer banco
            habilitado
          </span>
          <button
            className={styles["copy-clipboard"]}
            onClick={handleCopyClick}
          >
            {data?.order?.referenceId}
            <CopyIcon />
          </button>

          {isCopied && (
            <div className={styles["copied-text-wrapper"]}>
              <span className={styles["copied-text-wrapper"]}>
                Referência Copiado!
              </span>
            </div>
          )}

          <div className={styles["time-to-pay-wrapper"]}>
            <span className={styles["time-icon"]}>
              <MdAccessTime size={24} />
            </span>

            <span className={styles["time-to-pay"]}>
              {minutes[0]}
              {minutes[1]}:{seconds[0]}
              {seconds[1]}
            </span>

            <span className={styles["time-to-pay-text"]}>
              Após este tempo, os ingressos serão liberados para venda
              novamente.
            </span>
          </div>
        </div>

        <div className={`${styles["col-right"]}`}>
          <div className={styles.item}>
            <span className={styles["item-heading"]}>Entidade</span>
            <span className={styles["item-heading"]}>00750</span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-subheading"]}>Valor da reserva</span>
            <span className={styles["item-subheading"]}>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "AOA",
              }).format(data?.order?.total)}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-text"]}>Evento</span>
            <span className={styles["item-text"]}>
              {data?.event?.event?.name}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles["item-text"]}>Ingressos</span>
            <span className={styles["item-text"]}>
              {accumulateTicketNumber(data?.order)}
            </span>
          </div>

          <div className={styles["payment-method-wrapper"]}>
            <span className={styles["payment-method-text"]}>
              Aguardando pagamento
            </span>

            <Image
              src={MulticaixaReferencePNG}
              alt=""
              className={styles["payment-method-img"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
