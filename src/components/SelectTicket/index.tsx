import { useEffect, useState } from "react";
import Link from "next/link";
import produce from "immer";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import EventService from "services/EventService";
import TicketService from "services/TicketService";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { FiPlus, FiMinus } from "react-icons/fi";
import ImgDetailPNG from "../../assets/png/event-detail/img-1.png";
import Image from "next/future/image";
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
  dateEvent: '',
  paymentMethod: '',
  total: 0,
  ticketsReservation: [],
};

export function SelectTicket() {
  const router = useRouter();

  const [cart, setCart] = useState<any>(initialStateCart);

  const [ticketsReservation, setTicketsReservation] = useState([]);

  const [type, setType] = useState("pre-venda");

  const [loading, setLoading] = useState(true);

  const [dataEvent, setDataEvent] = useState<any>([]);

  const [dataTicket, setDataTicket] = useState<any>([]);

  const [error, setError] = useState(false);

  const { id } = router.query;

  function handleChangeType(value: string) {
    setType(value);
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
        total: ticket?.price,
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
          draft!.total = draft!.total + ticket?.price;
          draft?.ticketsReservation.push(ticketReservationObject);
        })
      );
    } else {
      setCart(
        produce((draft: any) => {
          const newTicketReservation = draft?.ticketsReservation?.find(
            (value: any) => value?.ticketLotId === ticket?._id
          );
          draft!.total = draft!.total + newTicketReservation.price;
          newTicketReservation.totalTicketReserved =
            newTicketReservation.totalTicketReserved + 1;
        })
      );
    }

    // localStorage.setItem("@ventus:cart", JSON.stringify(cart));
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

          draft!.total = draft!.total - newTicketReservation.price;

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
            draft!.total = draft!.total - newTicketReservation.price;
            newTicketReservation.totalTicketReserved =
              newTicketReservation?.totalTicketReserved - 1;
          }
        })
      );
    }

    // localStorage.setItem("@ventus:cart", JSON.stringify(cart));
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
    console.log(localStorage.getItem("eventDate"));
    async function fetchData() {
      try {
        const eventDateSelected = localStorage.getItem("eventDate") as string;
        const eventData = await EventService.findById(id);
        const ticketData = await TicketService.findByEventId(id);

        console.log(eventData);
        setDataTicket(ticketData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    localStorage.setItem("@ventus:cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);

  return (
    <section className={styles["select-ticket"]}>
      {loading ? (
        <Spinner/>
      ) : (
        <div className={`container ${styles.container}`}>
          <h1 className={styles["event-name"]}>Nocal Summer</h1>
          <span className={styles["event-info"]}>Sex, Ago 12 · 21:00 Pm</span>
          <span className={styles["event-info"]}>Baía de Luanda, Luanda</span>

          <span className={styles["select-payment-text"]}>
            Por favor,Selecione o tipo de ingresso que deseja comprar.
          </span>

          <RadioGroup.Root defaultValue="default">
            {dataTicket?.map((item: any) => {
              return (
                <div className={styles.box} key={item?._id}>
                  <div className={styles.content}>
                    <h2 className={styles.title}>{item?.type}</h2>
                    <div className={styles["box-item"]}>
                      <div className={styles["box-item-content"]}>
                        <div className={styles["price-row"]}>
                          <h2 className={styles.price}>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "AOA",
                            }).format(item?.price)}
                          </h2>
                          <span className={styles["subtitle"]}>
                            + AOA 10% Seguro
                          </span>
                        </div>
                        <span className={styles["subtitle"]}>
                          Valido até: Mai 30, 2022{" "}
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
            <Link href={`/payment-method/${id}`}>
              <button className={styles.btn}>Próximo Passo</button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
