import { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import Image from "next/future/image";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import EventService from "services/EventService";
import { Loading } from "components/Loading";
import MulticaixaReferencePNG from "../../../assets/png/payment-method/multicaixa-reference.png";
import { useCountdown } from "hooks/useCountdown";
import { CopyIcon } from "../../Icon";
import styles from "./styles.module.scss";

interface Props {
  item: any;
}

export function OrdersModalItem({ item }: Props) {
  const [loading, setLoading] = useState(false);
  const [minute, setMinute] = useState(0);
  const [error, setError] = useState(false);
  const [second, setSecond] = useState(0);
  const [countDownDate, setCountDownDate] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [dataEvent, setDataEvent] = useState<any>([]);
  const [value, copy] = useCopyToClipboard();

  function accumulateTicketNumber(object: any) {
    return object?.ticketsReservation?.reduce(
      (total: number, currentValue: any) =>
        total + currentValue?.totalTicketReserved,
      0
    );
  }

  function handleCopyClick() {
    setIsCopied(true);
    setTimeout(() => {
      copy(item?.referenceId);
      setIsCopied(false);
    }, 2000);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const eventData = await EventService.findById(item?.event);
        setDataEvent(eventData);
        setCountDownDate(new Date(item?.timeToPay).getTime());
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [item?.timeToPay, item?.event]);

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

  const isExpiredOrder = useMemo(() => {
    if (loading) return false;

    if (isNaN(countDownDate)) return true;

    const distanceBetweenDate = countDownDate - new Date().getTime();
    return distanceBetweenDate <= 0 ? true : false;
  }, [countDownDate, loading]);

  const minutes = String(minute).padStart(2, "0");
  const seconds = String(second).padStart(2, "0");

  return (
    <>
      {loading ? (
        <Loading />
      ) : isExpiredOrder ? (
        <div className={styles.empty}>
          <span>A referência expirou.</span>
        </div>
      ) : (
        <div className={styles["order-box"]} key={item?._id}>
          <Image
            src={MulticaixaReferencePNG}
            alt=""
            className={styles["payment-method-img"]}
          />
          <div className={styles["order-box__content"]}>
            <h1 className={styles["order-box__content--heading"]}>
              Pague com Referencia
            </h1>

            <span className={styles["order-box__content--text"]}>
              Copie o código abaixo para pagar via Referencia em qualquer banco
              habilitado
            </span>

            <button
              className={styles["copy-clipboard"]}
              onClick={handleCopyClick}
            >
              {item?.referenceId}
              <CopyIcon />
            </button>

            {isCopied && (
              <div className={styles["copied-text-wrapper"]}>
                <span className={styles["copied-text-wrapper"]}>
                  Referência Copiado!
                </span>
              </div>
            )}

            <div className={styles["time-left-container"]}>
              <span className={styles["time-left-container-text"]}>
                O tempo para voce pagar acaba em:
              </span>

              <span className={styles["timer-heading"]}>
                {minutes[0]}
                {minutes[1]}:{seconds[0]}
                {seconds[1]}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-heading"]}>Entidade</span>
              <span className={styles["item-heading"]}>01125(Gesprin)</span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-subheading"]}>
                Valor da reserva
              </span>
              <span className={styles["item-subheading"]}>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "AOA",
                }).format(item?.total)}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-text"]}>Evento</span>
              <span className={styles["item-text"]}>
                {dataEvent?.event?.name}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-text"]}>Ingressos</span>
              <span className={styles["item-text"]}>
                {accumulateTicketNumber(item)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
