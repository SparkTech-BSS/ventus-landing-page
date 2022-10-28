import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";

import { MdOutlineArrowBackIos } from "react-icons/md";

import { AuthContext } from "contexts/AuthContext";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { Spinner } from "components/Spinner";

import EventService from "services/EventService";

import { api } from "services/api";

import { ServerError } from "components/ServerError";

import {
  MultiCaixaExpress26Icon,
  PaySmart26Icon,
  ShoppingCartICON,
} from "../../components/Icon";
import styles from "./styles.module.scss";
import Link from "next/link";

export function PaymentMethod() {
  const router = useRouter();
  const { isAuthenticated, setOpenLoginModal } = useContext(AuthContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [paymentMethodValue, setPaymentMethodValue] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataEvent, setDataEvent] = useState<any>([]);
  const [cart, setCart] = useState<any>();
  const { id } = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);

    const storage = localStorage.getItem("@ventus:cart") as any;

    const dateStorage = localStorage.getItem("@ventus:eventDate") as any;

    if (storage && dateStorage) {
      const storageParsed = JSON.parse(storage) as any;

      const dateStorageParsed = JSON.parse(dateStorage) as any;

      storageParsed.dateEvent = dateStorageParsed;

      setCart(storageParsed);
    }

    if (dateStorage) {
      const dateStorageParsed = JSON.parse(dateStorage) as any;
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);

    async function fetchData() {
      try {
        const eventData = await EventService.findById(id);
        setDataEvent(eventData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  async function handleSubmit() {
    if (!isAuthenticated) {
      setOpenLoginModal(true);
      return;
    }

    setLoadingSubmit(true);
    if (paymentMethodValue) {
      const newCart = cart;
      newCart.paymentMethod = paymentMethodValue;

      setCart({ ...cart, paymentMethod: paymentMethodValue });

      localStorage.setItem("@ventus:cart", JSON.stringify(newCart));

      try {
        const { data } = await api.post(
          `/orders/create/${dataEvent?.event?._id}`,
          newCart
        );
        localStorage.setItem("@ventus:current", JSON.stringify(data));
        router.push(`/payment-method/reference/${data?._id}`);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  function accumulateTicketNumber(object: any) {
    return object?.ticketsReservation?.reduce(
      (total: number, currentValue: any) =>
        total + currentValue?.totalTicketReserved,
      0
    );
  }

  function handleBack() {
    router.back();
  }

  if (error) {
    return <ServerError />;
  }

  return (
    <>
      <section className={styles["payment-method"]}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={`container ${styles.container}`}>
              {/* {!isAuthenticated && (
                <div className={`${styles["offline-message-wrapper"]}`}>
                  <span>
                    Por favor faça o login para poder efectuar a compra do
                    ingresso.
                  </span>
                </div>
              )} */}
              <h1 className={styles["event-name"]}>{dataEvent?.event?.name}</h1>
              <span className={styles["event-info"]}>
                Sex, Ago 12 · 21:00 Pm
              </span>
              <span className={styles["event-info"]}>
                Baía de Luanda, Luanda
              </span>

              <button className={styles["btn-back"]} onClick={handleBack}>
                <MdOutlineArrowBackIos size={20} /> Voltar
              </button>

              <h1 className={styles.heading}>Método de pagamento</h1>

              <span className={styles["select-payment-text"]}>
                Qual a forma de pagamento?
              </span>

              <RadioGroup.Root
                defaultValue="default"
                className={styles.content}
                onValueChange={(value) => setPaymentMethodValue(value)}
              >
                <RadioGroup.Item
                  value="reference"
                  className={styles["radio-button"]}
                  // disabled={true}
                >
                  <div className={styles["payment-icon"]}>
                    <MultiCaixaExpress26Icon />
                  </div>

                  <span className={styles["payment-title"]}>
                    Pagar com referência
                  </span>
                </RadioGroup.Item>

                <RadioGroup.Item
                  value="pay-smart"
                  className={styles["radio-button"]}
                  disabled={true}
                >
                  <div className={styles["payment-icon"]}>
                    <PaySmart26Icon />
                  </div>

                  <span className={styles["payment-title"]}>
                    Pagar com Paysmart
                  </span>
                </RadioGroup.Item>

                <p className={styles["note-text"]}>
                  O método de pagamento <span>&quot;Paysmart&quot;</span> ainda
                  não está disponível, brevemente estará disponível.
                </p>
              </RadioGroup.Root>

              <span className={styles.text}>Revise seu pedido</span>

              <div className={styles["review-order"]}>
                <div className={styles["review-order-item"]}>
                  <span className={styles["review-order-item-heading"]}>
                    Item
                  </span>
                  <span className={styles["review-order-item-heading"]}>
                    Valor
                  </span>
                </div>
                {cart?.ticketsReservation?.map((item: any) => {
                  return (
                    <div
                      className={styles["review-order-item"]}
                      key={item?.ticketLotId}
                    >
                      <span className={styles["review-order-item-subheading"]}>
                        {item?.type}
                      </span>
                      <span className={styles["review-order-item-subheading"]}>
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "AOA",
                        }).format(item?.price)}
                      </span>
                    </div>
                  );
                })}

                <div className={styles["review-order-item"]}>
                  <span className={styles["review-order-item-subheading"]}>
                    Taxa
                  </span>
                  <span className={styles["review-order-item-subheading"]}>
                    375,00 AOA
                  </span>
                </div>

                <div className={styles["review-order-item"]}>
                  <span className={styles["review-order-item-subheading"]}>
                    Ingressos
                  </span>
                  <span className={styles["review-order-item-subheading"]}>
                    {accumulateTicketNumber(cart)}
                  </span>
                </div>

                <div className={styles["review-order-item"]}>
                  <span className={styles["review-order-item-heading"]}>
                    Total
                  </span>
                  <span className={styles["review-order-item-heading"]}>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "AOA",
                    }).format(cart?.total)}
                  </span>
                </div>
              </div>

              <span className={styles["term-text"]}>
                Ao clicar no botão abaixo, você declara concordar com nossos{" "}
                <Link href="/terms-of-use" passHref >
                  <a className={styles["term-text-link"]} target="_blank" rel="noopener noreferrer">Termos de Serviço</a>
                </Link>
              </span>

              <button
                className={styles["btn-buy-ticket"]}
                disabled={
                  !paymentMethodValue ? !paymentMethodValue : loadingSubmit
                }
                onClick={handleSubmit}
              >
                {loadingSubmit ? (
                  <div className={styles["btn-loader"]} />
                ) : (
                  <>
                    <ShoppingCartICON />
                    Concluir compra
                  </>
                )}
              </button> 

              {/* <div className={styles["expiration-time"]}>
                <span className={styles["expiration-time-heading"]}>
                  Tempo de expiração do carrinho:
                </span>
                <span className={styles["expiration-time-heading"]}>10:00</span>
              </div> */}
            </div>
          </>
        )}
      </section>
    </>
  );
}
