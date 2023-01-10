import { useState, useEffect } from "react";
import Modal from "react-modal";
import { api } from "services/api";
import { Loading } from "components/Loading";
import { CgClose } from "react-icons/cg";
import { CustomPagination } from "../../CustomPagination";
import { getCapitalizeFirstLetter, getTicketDetailDate } from "utils";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  clientSelectedId: string | any;
  clientSelectedName: string | any;
}

export function TicketListModal({
  isOpen,
  onRequestClose,
  clientSelectedId,
  clientSelectedName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any>([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);

  function onPageChange(page: number) {
    setCount(page);
  }

  useEffect(() => {
    async function fetchRegisters() {
      setLoading(true);
      if (!clientSelectedId) return;
      try {
        const { data } = await api.get(
          `tickets/findbybuyerid/${clientSelectedId}/${count}`
        );
        setTickets(data?.tickets);
        setLastPage(data?.lastPage);
        setTotalTicket(data?.total);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRegisters();
  }, [clientSelectedId, count, clientSelectedName]);

  useEffect(() => {
    isOpen &&
      document.documentElement.style.setProperty("--overflow", `hidden`);
    !isOpen && document.documentElement.style.setProperty("--overflow", `auto`);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <div className={styles["content"]}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <CgClose size={24} color="#1A2029" />
        </button>
        {loading ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <div className={styles.empty}>
                <span>Ups, parece que ocorreu um erro no servidor.</span>
              </div>
            ) : (
              <>
                {!tickets?.length ? (
                  <div className={styles.empty}>
                    <span>O cliente não possui ingressos activos.</span>
                  </div>
                ) : (
                  <>
                    <h2 className={styles.heading}>Ingressos</h2>
                    <span className={styles.subheading}>
                      Lista dos ingressos
                    </span>
                    <span className={styles.count}>
                      {totalTicket} Ingressos
                    </span>

                    <div className={styles["ticket-wrapper"]}>
                      {tickets?.map((item: any) => {
                        return (
                          <div
                            key={item?.ticket?._id}
                            className={styles["ticket-card"]}
                          >
                            <h1 className={styles["ticket-card__title"]}>
                              {item?.event?.event?.name}
                            </h1>

                            <span className={styles.owner}>
                              Destinátario: {clientSelectedName}
                            </span>

                            <div className={styles["ticket-card__item"]}>
                              <span
                                className={
                                  styles["ticket-card__item-subheading"]
                                }
                              >
                                Local
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {item?.event?.event?.location}
                              </span>
                            </div>

                            <div className={styles["ticket-card__item"]}>
                              <span
                                className={
                                  styles["ticket-card__item-subheading"]
                                }
                              >
                                Data
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {getTicketDetailDate(item?.ticket?.dateEvent)}
                              </span>
                            </div>

                            <div className={styles["ticket-card__item"]}>
                              <span
                                className={
                                  styles["ticket-card__item-subheading"]
                                }
                              >
                                Hora
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {item?.event?.event?.startTime} -{" "}
                                {`${item?.event?.event?.endTime}`}
                              </span>
                            </div>

                            <div className={styles["ticket-card__item"]}>
                              <span
                                className={
                                  styles["ticket-card__item-subheading"]
                                }
                              >
                                Tipo de Ingresso
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {getCapitalizeFirstLetter(item?.ticket?.type)}
                              </span>
                            </div>

                            <div className={`${styles["ticket-card-row"]}`}>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                Código
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {item?.ticket?.code}
                              </span>
                            </div>

                            <div className={styles["divider"]} />

                            <div className={`${styles["ticket-card-row"]}`}>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                Preço
                              </span>
                              <span
                                className={styles["ticket-card__item-heading"]}
                              >
                                {new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "AOA",
                                }).format(item?.ticket?.price)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className={styles.pagination}>
        <CustomPagination
          currentPage={count}
          totalCount={totalTicket}
          pageSize={10}
          onPageChange={onPageChange}
        />
      </div>
    </Modal>
  );
}
