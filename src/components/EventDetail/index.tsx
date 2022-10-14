import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { GoCalendar } from "react-icons/go";
import Image from "next/future/image";
import ImgDetailPNG from "../../assets/png/event-detail/img-1.png";
import { getHourFormatToAPI, getObjectDate, MAP_INFO } from "../../utils";
import {
  ArrowEventICON,
  StarICON,
  LocationICON,
  PeopleICON,
  TimeICON,
  ShoppingCartICON,
  TicketIcon,
} from "../../components/Icon";
import { Avatar } from "../Avatar";
import EventService from "services/EventService";
import TicketService from "services/TicketService";
import styles from "./styles.module.scss";

export function EventDetail() {
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
  }, []);

  console.log(dataEvent);

  function getPrice(list: any) {
    if (!list) return [];
    return list?.map((item: any) => item.price);
  }

  return (
    <section className={styles["event-detail"]}>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <div className={`${styles["event-banner"]}`}>
            <Image src={ImgDetailPNG} alt="" className={styles["banner-img"]} />

            <div className={styles["date-multiple"]}>
              <div className={styles["date-multiple__col"]}>
                <span className={styles["date-month"]}>Out</span>
                <span className={styles["date-day"]}>20</span>
              </div>
              <ArrowEventICON />
              <div className={styles["date-multiple__col"]}>
                <span className={styles["date-month"]}>Nov</span>
                <span className={styles["date-day"]}>01</span>
              </div>
            </div>
          </div>

          <div className={`container ${styles.container}`}>
            <div className={styles["box-row"]}>
              <div className={styles["box-row-img"]}>
                <Image
                  src={ImgDetailPNG}
                  alt=""
                  className={styles["box-row-img__picture"]}
                />
                <div className={styles["date-multiple"]}>
                  <div className={styles["date-multiple__col"]}>
                    <span className={styles["date-month"]}>Out</span>
                    <span className={styles["date-day"]}>20</span>
                  </div>
                  <ArrowEventICON />
                  <div className={styles["date-multiple__col"]}>
                    <span className={styles["date-month"]}>Nov</span>
                    <span className={styles["date-day"]}>01</span>
                  </div>
                </div>
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
                      kz250.00 até kz20,000.00
                    </h2>
                  </div>
                </div>
                <Link href={`/select-ticket/${id}`}>
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
                  Selecione a Data
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

              <div className={styles["event-item"]}>
                <div className={styles["event-item-icon"]}>
                  <PeopleICON />
                </div>

                <span className={styles["event-item-text"]}>Pessoas:</span>

                <Avatar />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.content}>
              <p>{dataEvent?.event?.about}</p>
              {/* <p className={styles.text}>Fala tigradaaaa 🐯</p>
        <p className={styles.text}>
          Sabemos que todos estavam ansiosos com o fim das provas, então nada
          mais justo que comemorar com o tigrão!
        </p>
        <p className={styles.text}>
          Dia 6/10, quinta-feira, teremos a 1ª F.O.D.A do mês (festa oficial
          da atlética), com 6 HORAS DE OPEN BAR 🍻, e atrações como Kenan e
          Kel, Baile do Duzão e Dj Clip!
        </p>

        <ul className={styles["content-list"]}>
          <li>📆 06/10</li>
          <li>⏰ 21hrs-3:30hrs</li>
          <li>📍Campinas Hall</li>
          <li>🍻 Open: breja, vodka, gin, energético e água.</li>
        </ul> */}
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
                    kz250.00 até kz20,000.00
                  </h2>
                </div>
              </div>
              <Link href={`/select-ticket/${id}`} prefetch={false}>
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
