import Image from "next/future/image";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Loading } from "components/Loading";
import * as Tabs from "@radix-ui/react-tabs";
import { QRCodeSVG } from "qrcode.react";
import styles from "./styles.module.scss";
import { TicketLinearGradient } from "config";
import { OrderList } from "components/OrderList";

export function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      //tickets/findbyclientid
      try {
        const { data } = await api.get(`tickets/findbyclientid`);
        setTickets(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.ticket}>
      <div className={styles["header"]}>
        <div className={`${styles["header-content"]}`}>
          <div className="container">
            <h1 className={styles.heading}>Ingressos</h1>
          </div>
          <Tabs.Root
            className={styles["tabs"]}
            defaultValue="actives"
            orientation="horizontal"
          >
            <Tabs.List
              aria-label="Courses Editor"
              className={`container ${styles["tabs-list"]}`}
            >
              <Tabs.Trigger value="actives" className={styles["tabs-trigger"]}>
                Ativos
              </Tabs.Trigger>
              <Tabs.Trigger value="closed" className={styles["tabs-trigger"]}>
                Encerrados
              </Tabs.Trigger>
              <Tabs.Trigger
                value="in-progress"
                className={styles["tabs-trigger"]}
              >
                Pedidos
              </Tabs.Trigger>
            </Tabs.List>

            {/* //Aprovado, cancelados, pendendete */}

            <Tabs.Content
              value="actives"
              className={`${styles["tab-content"]}`}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  <div className={`container`}>
                    {tickets?.length ? (
                      <span className={styles["list-date"]}>2022</span>
                    ) : (
                      ""
                    )}

                    {!tickets?.length ? (
                      <div className={styles["empty-box"]}>
                        <span className={styles.text}>
                          Não há ingressos para próximos eventos
                        </span>
                        <button>Encontrar Eventos</button>
                      </div>
                    ) : (
                      <>
                        {tickets?.map((item: any) => {
                          return (
                            <a
                              className={styles["event-item"]}
                              key={item?.ticket?._id}
                              style={{
                                backgroundImage: `${TicketLinearGradient}, url(${item?.event?.event?.images})`,
                              }}
                            >
                              <h1 className={styles["ticket-brand"]}>TICKET</h1>
                              <div className={styles["col-left"]}>
                                <div className={styles["col-left-1"]}>
                                  <div className={styles["date-box"]}>
                                    <span
                                      className={styles["date-box-heading"]}
                                    >
                                      31
                                    </span>
                                    <div
                                      className={
                                        styles["date-box-extra-detail"]
                                      }
                                    >
                                      <span>OCT</span>
                                      <span>8PM</span>
                                    </div>
                                  </div>

                                  <QRCodeSVG
                                    size={120}
                                    value="https://reactjs.org/"
                                    className={styles["qr-code-wrapper"]}
                                  />
                                </div>
                                <div className={styles["col-left-2"]}>
                                  <div className={styles["heading-wrapper"]}>
                                    <h2 className={styles["event-heading"]}>
                                      {item?.event?.event?.name}
                                    </h2>
                                    <h2 className={styles["event-subheading"]}>
                                      {item?.event?.event?.startTime} -{" "}
                                      {item?.event?.event?.endTime}
                                    </h2>
                                  </div>

                                  <div className={styles["location-wrapper"]}>
                                    <h2 className={styles["location-heading"]}>
                                      {item?.event?.event?.location}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className={styles["col-right"]}>
                                <span className={styles["ticket-number"]}>
                                  {(item?.ticket?.type).toUpperCase()}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              )}
            </Tabs.Content>

            <Tabs.Content value="closed" className={styles["tab-content"]}>
              <div className={styles["empty-box"]}>
                <span className={styles.text}>
                  Não há ingressos para próximos eventos
                </span>
                <button>Encontrar Eventos</button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="in-progress" className={styles["tab-content"]}>
              <div className={`container`}>
                  <span className={styles["list-date"]}>2022</span>
                  <OrderList/>
              </div>
              {/* <span className={styles["list-date"]}>2022</span>
              <div className={`container`}>
              </div> */}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
