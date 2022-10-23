import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/future/image";
import EventService from "services/EventService";
import { api } from "services/api";
import { useRouter } from "next/router";
import * as Progress from "@radix-ui/react-progress";
import { Spinner } from "components/Spinner";
import MulticaixaReferencePNG from "../../assets/png/payment-method/multicaixa-reference.png";
import { CopyIcon } from "../Icon";
import styles from "./styles.module.scss";

export function Reference() {
  const router = useRouter();
  const { id } = router.query;
  const [progress, setProgress] = useState(13);
  const [dataEvent, setDataEvent] = useState<any>();
  const [cart, setCart] = useState<any>();
  const [ticket, ticketData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [countDownDate, setCountDownDate] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("@ventus:cart") as any;

    if (storage) {
      const storageParsed = JSON.parse(storage) as any;

      setCart(storageParsed);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/orders/findbyiduserid/${id}`);
        const eventData = await EventService.findById(data?.event);
        setDataEvent(eventData);
        ticketData(data);
        setCountDownDate(new Date(data?.timeToPay).getTime());
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

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

  function accumulateTicketNumber(object: any) {
    return object?.ticketsReservation?.reduce(
      (total: number, currentValue: any) =>
        total + currentValue?.totalTicketReserved,
      0
    );
  }

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(ticket?.referenceId)
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

  const isExpiredOrder = useMemo(() => {
    const distanceBetweenDate = countDownDate - new Date().getTime();
    return distanceBetweenDate <= 0 ? true : false;
  }, []);

  const minutes = String(minute).padStart(2, "0");
  const seconds = String(second).padStart(2, "0");

  return (
    <section className={styles["reference-page"]}>
      {loading ? (
        <Spinner />
      ) : (
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

            <button
              className={styles["copy-clipboard"]}
              onClick={handleCopyClick}
            >
              {ticket?.referenceId}
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

              <Progress.Root className={styles["progress-bar"]} value={66}>
                <Progress.Indicator
                  className={styles["progress-bar-indicator"]}
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress.Root>
            </div>

            <div className={styles.item}>
              <span className={styles["item-heading"]}>Entidade</span>
              <span className={styles["item-heading"]}>01125</span>
            </div>

            <div className={styles.item}>
              <span className={styles["item-subheading"]}>
                Valor da reserva
              </span>
              <span className={styles["item-subheading"]}>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "AOA",
                }).format(ticket?.total)}
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
                {accumulateTicketNumber(ticket)}
              </span>
            </div>

            <div className={styles["btn-group"]}>
              <Link href="/">
                <button className={styles["btn-primary"]}>
                  Voltar para Home
                </button>
              </Link>
              {/* <button className={styles["btn-secondary"]}>Compartilhar código</button> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
