import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdHelpCircle } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import produce from "immer";
import { IoIosArrowForward } from "react-icons/io";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import EventService from "services/EventService";
import TicketService from "services/TicketService";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FiPlus, FiMinus } from "react-icons/fi";
import { getCapitalizeFirstLetter, getShortDateFormat } from "utils";
import { AlertModal } from "components/AlertModal";
import { RateModal } from "components/RateModal";
import styles from "./styles.module.scss";

interface TicketsReservation {
  ticketLotId: string;
  type: string;
  totalTicketReserved: number;
  price: number;
  _id: string;
}

interface TicketItem {
  dateEvent: string;
  total: number;
  paymentMethod: string;
  ticketsReservation: TicketsReservation[];
}

interface CartItem {
  _id?: any;
  total: number;
  paymentMethod: string;
  ticketsReservation: TicketsReservation[];
}

const initialStateCart = {
  dateEvent: "",
  paymentMethod: "",
  total: 0,
  ticketsReservation: [],
};

export function GenerateReferenceSelectTicket() {
  const router = useRouter();

  const [cart, setCart] = useState<any>(initialStateCart);

  const [unmounted, setUnmounted] = useState(false);

  const [ticketsReservation, setTicketsReservation] = useState([]);

  const [openRateModal, setOpenRateModal] = useState(false);

  const [type, setType] = useState("pre-venda");

  const [loading, setLoading] = useState(true);

  const [dataEvent, setDataEvent] = useState<any>([]);

  const [dataTicket, setDataTicket] = useState<any[]>([]);

  const [eventDate, setEventDate] = useState("");

  const [error, setError] = useState(false);

  const { id } = router.query;

  const RATE_PRICE = 375;

  function handleOpenRateModal() {
    setOpenRateModal(true);
  }

  function handleCloseRateModal() {
    setOpenRateModal(false);
  }

  function getItemQuantity(id: any) {
    return (
      cart?.ticketsReservation?.find((item: any) => item?.ticketLotId === id)
        ?.totalTicketReserved || 0
    );
  }

  function isNull(id: any) {
    return cart?.ticketsReservation?.find(
      (item: any) => item?.ticketLotId == id
    ) == null
      ? true
      : false;
  }

  function increaseTicketLot(ticket: any) {
    if (isNull(ticket?._id) && !cart?.ticketsReservation?.length) {
      const ticketReservationObject = {
        ticketLotId: ticket?._id,
        type: ticket?.type,
        totalTicketReserved: 1,
        price: ticket?.price,
      };

      setCart({
        ...cart,
        total: ticket?.price + RATE_PRICE,
        ticketsReservation: [ticketReservationObject],
      });
    } else if (isNull(ticket?._id) && cart?.ticketsReservation?.length) {
      const ticketReservationObject = {
        ticketLotId: ticket?._id,
        type: ticket?.type,
        totalTicketReserved: 1,
        price: ticket?.price,
      };

      setCart(
        produce((draft: any) => {
          draft!.total = draft!.total + ticket?.price + RATE_PRICE;
          draft?.ticketsReservation.push(ticketReservationObject);
        })
      );
    } else {
      setCart(
        produce((draft: any) => {
          const newTicketReservation = draft?.ticketsReservation?.find(
            (value: any) => value?.ticketLotId === ticket?._id
          );
          draft!.total = draft!.total + newTicketReservation.price + RATE_PRICE;
          newTicketReservation.totalTicketReserved =
            newTicketReservation.totalTicketReserved + 1;
        })
      );
    }
  }

  function accumulateTicketNumber(object: any) {
    return object?.ticketsReservation?.reduce(
      (total: number, currentValue: any) =>
        total + currentValue?.totalTicketReserved,
      0
    );
  }

  function decreaseTicketLot(ticket: any) {
    if (
      cart?.ticketsReservation?.find(
        (item: any) => item.ticketLotId === ticket?._id
      )?.totalTicketReserved === 1
    ) {
      setCart(
        produce((draft: any) => {
          const newTicketReservation = draft?.ticketsReservation?.find(
            (value: any) => value?.ticketLotId === ticket?._id
          );

          draft!.total = draft!.total - newTicketReservation.price - RATE_PRICE;

          draft!.ticketsReservation = draft?.ticketsReservation?.filter(
            (item: any) => item.ticketLotId !== ticket?._id
          );
        })
      );
    } else {
      setCart(
        produce((draft: any) => {
          const newTicketReservation = draft?.ticketsReservation?.find(
            (value: any) => value?.ticketLotId === ticket?._id
          );
          if (
            newTicketReservation != null ||
            newTicketReservation != "undefined"
          ) {
            draft!.total =
              draft!.total - newTicketReservation.price - RATE_PRICE;
            newTicketReservation.totalTicketReserved =
              newTicketReservation?.totalTicketReserved - 1;
          }
        })
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      setLoading(true);
      try {
        const eventDateSelected = localStorage.getItem(
          "@ventus:eventDate"
        ) as string;

        let eventDateSelectedFormatted = JSON.parse(eventDateSelected);

        setEventDate(eventDateSelectedFormatted);

        const eventData = await EventService.findById(id);

        const ticketData = await TicketService.findByEventIdAndByDate(
          id,
          eventDateSelectedFormatted
        );

        setDataEvent(eventData);

        setDataTicket(ticketData);
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
    localStorage.setItem("@ventus:cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setUnmounted(true);
  }, []);

  function handleBack() {
    router.back();
  }

  if (!unmounted) {
    return null;
  }

  return (
    <>
      <section className={styles["select-ticket"]}>
        <div className={`container ${styles["breadcrumb-wrapper"]}`}>
          <div className={styles["breadcrumbs"]}>
            <Link href="/support" passHref>
              <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
            </Link>

            <IoIosArrowForward size={16} color="#bbbbbb" />

            <Link href="/support/generate-reference" passHref>
              <a className={`${styles["breadcrumbs-link"]}`}>
                Gerar Referência
              </a>
            </Link>

            <IoIosArrowForward size={16} color="#bbbbbb" />

            <Link
              href={`/support/generate-reference/event-detail/${id}`}
              passHref
            >
              <a className={`${styles["breadcrumbs-link"]}`}>
                Detalhes do Evento
              </a>
            </Link>

            <IoIosArrowForward size={16} color="#bbbbbb" />

            <Link
              href={`/support/generate-reference/select-ticket/${id}`}
              passHref
            >
              <a
                className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
              >
                Selecionar Ingresso
              </a>
            </Link>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={`container ${styles.container}`}>
            <h1 className={styles["event-name"]}>{dataEvent?.event?.name}</h1>
            <span className={styles["event-info"]}>
              {getShortDateFormat(eventDate)} · {dataEvent?.event?.startTime} -{" "}
              {dataEvent?.event?.endTime}
            </span>
            <span className={styles["event-info"]}>
              {dataEvent?.event?.location}
            </span>

            <span className={styles["select-payment-text"]}>
              {dataTicket?.length > 1
                ? "Por favor, Selecione o tipo de ingresso e adicione a quantidade de ingresso que deseja comprar"
                : "Por favor adicione a quantidade de ingresso que deseja comprar"}
            </span>

            <button className={styles["btn-back"]} onClick={handleBack}>
              <MdOutlineArrowBackIos size={20} /> Voltar
            </button>

            <RadioGroup.Root defaultValue="default">
              {dataTicket?.map((item: any) => {
                return (
                  <div className={styles.box} key={item?._id}>
                    <div className={styles.content}>
                      <h2 className={styles.title}>
                        {getCapitalizeFirstLetter(item?.type)}
                      </h2>
                      <div className={styles["box-item"]}>
                        <div className={styles["box-item-content"]}>
                          <div className={styles["price-row"]}>
                            <h2 className={styles.price}>
                              {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "AOA",
                              }).format(item?.price)}
                            </h2>
                            {/* <span className={styles["subtitle"]}>
                            + Taxa de 375,00 AOA
                          </span> */}
                          </div>
                          <span className={styles["subtitle"]}>
                            + Taxa de 375,00 AOA{" "}
                            <button
                              className={styles["btn-help"]}
                              onClick={handleOpenRateModal}
                            >
                              <IoMdHelpCircle size={20} />
                            </button>
                          </span>
                          <span className={styles["subtitle"]}>
                            Disponível até: {getShortDateFormat(eventDate)} ·{" "}
                            {dataEvent?.event?.startTime}
                          </span>
                        </div>

                        {item?.qtdAvailable < 1 && (
                          <span className={styles["sold-off"]}>Esgotado!</span>
                        )}

                        {item?.qtdAvailable > 0 && (
                          <>
                            {getItemQuantity(item?._id) < 1 ? (
                              <button
                                className={styles["btn-add"]}
                                onClick={() => {
                                  increaseTicketLot(item);
                                }}
                              >
                                Adicionar
                              </button>
                            ) : (
                              <div className={styles["input-amount"]}>
                                <button
                                  className={`${styles["input-amount-button"]} ${styles.decrease}`}
                                  onClick={() => {
                                    decreaseTicketLot(item);
                                  }}
                                  type="button"
                                >
                                  <FiMinus size={20} />
                                </button>
                                <span className={styles["input-amount-text"]}>
                                  {getItemQuantity(item?._id)}
                                </span>
                                <button
                                  onClick={() => {
                                    increaseTicketLot(item);
                                  }}
                                  className={`${styles["input-amount-button"]} ${styles.increase}`}
                                  type="button"
                                >
                                  <FiPlus size={20} />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup.Root>
            <div className={styles.footer}>
              <div className={styles["footer-content"]}>
                <span className={styles["footer-content-heading"]}>
                  Ingressos:{" "}
                  <span className={styles["footer-content-heading__bold"]}>
                    {accumulateTicketNumber(cart)}
                  </span>
                </span>
                <span className={styles["footer-content-heading"]}>
                  Total:{" "}
                  <span className={styles["footer-content-heading__bold"]}>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "AOA",
                    }).format(cart?.total)}
                  </span>
                </span>
              </div>
              <Link href={`/support/generate-reference/payment-method/${id}`}>
                <button className={styles.btn} disabled={cart?.total == 0}>
                  Próximo Passo
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>

      <RateModal isOpen={openRateModal} onRequestClose={handleCloseRateModal} />
    </>
  );
}
