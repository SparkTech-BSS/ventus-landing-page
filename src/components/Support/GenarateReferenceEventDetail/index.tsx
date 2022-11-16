import { useEffect, useState } from "react";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { GoCalendar } from "react-icons/go";
import Image from "next/future/image";
import { ServerError } from "components/ServerError";
import EventService from "services/EventService";
import TicketService from "services/TicketService";
import {
  getHourFormatToAPI,
  getObjectDate,
  getStartDateAndEndDate,
  MAP_INFO,
} from "../../../utils";

import {
  ArrowEventICON,
  StarICON,
  LocationICON,
  PeopleICON,
  TimeICON,
  ShoppingCartICON,
  TicketIcon,
} from "../../../components/Icon";

import styles from "./styles.module.scss";

export function GenerateReferenceEventDetail() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [dataEvent, setDataEvent] = useState<any>([]);

  const [dataTicket, setDataTicket] = useState<any>([]);

  const [error, setError] = useState(false);

  const { id } = router.query;

  const [selectedDate, selectSelectedDate] = useState<any>("");

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
    async function fetchData() {
      try {
        const eventData = await EventService.findById(id);
        const ticketData = await TicketService.findByEventId(id);

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

  function getPrice(list: any) {
    if (!list) return [];
    return list?.map((item: any) => item.price);
  }

  function getFirstAndLastPrice() {
    const array = getPrice(dataTicket);

    const minValue = Math.min(...array);
    const maxValue = Math.max(...array);

    if (minValue === maxValue) {
      return `kz${maxValue},00`;
    } else if (maxValue > minValue) {
      return `kz${maxValue},00 até kz${minValue},00`;
    }
  }

  if (error) {
    return <ServerError />;
  }

  return (
    <section className={styles["event-detail"]}>
      <div className={`container`}>
        <div className={styles["breadcrumbs"]}>
          <Link href="/support" passHref>
            <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
          </Link>

          <IoIosArrowForward size={16} color="#f3f3f3" />

          <Link href="/support/generate-reference" passHref>
            <a
              className={`${styles["breadcrumbs-link"]}`}
            >
              Gerar Referência
            </a>
          </Link>

          <IoIosArrowForward size={16} color="#f3f3f3" />

          <Link href={`/support/generate-reference/event-detail/${id}`} passHref>
            <a
              className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
            >
              Detalhes do Evento
            </a>
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={`${styles["event-banner"]}`}>
            <Image
              src={dataEvent?.event?.images[0]}
              alt=""
              width={100}
              height={100}
              className={styles["banner-img"]}
            />

            {dataEvent?.event?.dates?.length > 1 ? (
              <div className={styles["date-multiple"]}>
                <div className={styles["date-multiple__col"]}>
                  <span className={styles["date-month"]}>
                    {
                      getStartDateAndEndDate(dataEvent?.event?.dates)
                        ?.startMonth
                    }
                  </span>
                  <span className={styles["date-day"]}>
                    {getStartDateAndEndDate(dataEvent?.event?.dates)?.startDay}
                  </span>
                </div>
                <ArrowEventICON />
                <div className={styles["date-multiple__col"]}>
                  <span className={styles["date-month"]}>
                    {getStartDateAndEndDate(dataEvent?.event?.dates)?.endMonth}
                  </span>
                  <span className={styles["date-day"]}>
                    {getStartDateAndEndDate(dataEvent?.event?.dates)?.endDay}
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.date}>
                <span className={styles["date-month"]}>
                  {getStartDateAndEndDate(dataEvent?.event?.dates)?.startMonth}
                </span>
                <span className={styles["date-day"]}>
                  {getStartDateAndEndDate(dataEvent?.event?.dates)?.startDay}
                </span>
              </div>
            )}
          </div>

          <div className={`container ${styles.container}`}>
            <div className={styles["box-row"]}>
              <div className={styles["box-row-img"]}>
                <Image
                  src={dataEvent?.event?.images[0]}
                  alt=""
                  width={100}
                  height={100}
                  className={styles["box-row-img__picture"]}
                />

                {dataEvent?.event?.dates?.length > 1 ? (
                  <div className={styles["date-multiple"]}>
                    <div className={styles["date-multiple__col"]}>
                      <span className={styles["date-month"]}>
                        {
                          getStartDateAndEndDate(dataEvent?.event?.dates)
                            ?.startMonth
                        }
                      </span>
                      <span className={styles["date-day"]}>
                        {
                          getStartDateAndEndDate(dataEvent?.event?.dates)
                            ?.startDay
                        }
                      </span>
                    </div>
                    <ArrowEventICON />
                    <div className={styles["date-multiple__col"]}>
                      <span className={styles["date-month"]}>
                        {
                          getStartDateAndEndDate(dataEvent?.event?.dates)
                            ?.endMonth
                        }
                      </span>
                      <span className={styles["date-day"]}>
                        {
                          getStartDateAndEndDate(dataEvent?.event?.dates)
                            ?.endDay
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.date}>
                    <span className={styles["date-month"]}>
                      {
                        getStartDateAndEndDate(dataEvent?.event?.dates)
                          ?.startMonth
                      }
                    </span>
                    <span className={styles["date-day"]}>
                      {
                        getStartDateAndEndDate(dataEvent?.event?.dates)
                          ?.startDay
                      }
                    </span>
                  </div>
                )}
              </div>

              <div className={styles["box-row-content"]}>
                <div className={styles["box-row-content__heading-group"]}>
                  <h1
                    className={styles["box-row-content__heading-group-heading"]}
                  >
                    {dataEvent?.event?.name}
                  </h1>
                  <span
                    className={
                      styles["box-row-content__heading-group-rating-container"]
                    }
                  >
                    <StarICON />
                    4.9
                  </span>
                </div>

                <div className={styles["tickets-content"]}>
                  <TicketIcon />

                  <div className={styles["tickets-group"]}>
                    <span className={styles["tickets-sub-heading"]}>
                      Ingressos entre
                    </span>
                    <h2 className={styles["tickets-heading"]}>
                      {getFirstAndLastPrice()}
                    </h2>
                  </div>
                </div>
                <Link href={`/support/generate-reference/select-ticket/${id}`}>
                  <button
                    className={styles["btn-buy-ticket"]}
                    disabled={!selectedDate}
                  >
                    <ShoppingCartICON />
                    Comprar Ingressos
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles["heading-row"]}>
              <h2 className={styles.heading}>{dataEvent?.event?.name}</h2>

              <span className={styles["rating-container"]}>
                <StarICON />
                4.9
              </span>
            </div>

            <div className={styles["select-date-box"]}>
              <div className={styles["select-date-box-heading__row"]}>
                <GoCalendar size={24} color="#FF5555" />

                <h2 className={styles["select-date-box-heading"]}>
                  Selecione a Data do evento
                </h2>
              </div>
              <div className={styles["select-date-button-group"]}>
                {dataEvent?.event?.dates?.map((item: any) => {
                  return (
                    <button
                      key={item}
                      className={`${styles["selected-button"]} ${
                        selectedDate === item ? styles["active"] : ""
                      }`}
                      onClick={() => {
                        selectSelectedDate(item);
                        localStorage.setItem(
                          "@ventus:eventDate",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      <span>{getObjectDate(item).week_day}</span>
                      <span>
                        {getObjectDate(item).day}/{getObjectDate(item).month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles["event-wrapper"]}>
              <div className={styles["event-item"]}>
                <div className={styles["event-item-icon"]}>
                  <LocationICON />
                </div>

                <span className={styles["event-item-text"]}>
                  {dataEvent?.event?.location}
                </span>
              </div>

              <div className={styles["event-item"]}>
                <div className={styles["event-item-icon"]}>
                  <TimeICON />
                </div>

                <span className={styles["event-item-text"]}>
                  {getHourFormatToAPI(dataEvent?.event?.startTime)}h às{" "}
                  {getHourFormatToAPI(dataEvent?.event?.endTime)}h
                </span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.content}>
              <p>{dataEvent?.event?.about}</p>
            </div>

            <div className={styles["location-wrapper"]}>
              <h2 className={styles["location-heading"]}>LOCALIZAÇÃO</h2>

              <div className={styles["location-map"]}>
                <iframe
                  src={MAP_INFO.url}
                  width={MAP_INFO.width}
                  height={MAP_INFO.height}
                  style={MAP_INFO.style}
                  referrerPolicy="no-referrer-when-downgrade"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className={styles["buy-ticket-wrapper"]}>
            <div className={`container`}>
              <div className={styles["tickets-content"]}>
                <TicketIcon />

                <div className={styles["tickets-group"]}>
                  <span className={styles["tickets-sub-heading"]}>
                    Ingressos entre
                  </span>
                  <h2 className={styles["tickets-heading"]}>
                    {getFirstAndLastPrice()}
                  </h2>
                </div>
              </div>
              <Link href={`/support/generate-reference/select-ticket/${id}`} prefetch={false}>
                <button
                  className={styles["btn-buy-ticket"]}
                  disabled={!selectedDate}
                >
                  <ShoppingCartICON />
                  Comprar Ingressos
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
