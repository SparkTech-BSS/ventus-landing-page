import { useEffect } from "react";
import Image from "next/future/image";
import ImgDetailPNG from "../../assets/png/event-detail/img-1.png";
import { MAP_INFO } from "../../utils";
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
import styles from "./styles.module.scss";

export function EventDetail() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={styles["event-detail"]}>
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
            <Image src={ImgDetailPNG} alt="" className={styles["box-row-img__picture"]}/>
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
              <h1 className={styles["box-row-content__heading-group-heading"]}>
                Sabadou Race
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
            <button className={styles["btn-buy-ticket"]}>
              <ShoppingCartICON />
              Comprar Ingressos
            </button>
          </div>
        </div>

        <div className={styles["heading-row"]}>
          <h2 className={styles.heading}>Sabadou Race</h2>

          <span className={styles["rating-container"]}>
            <StarICON />
            4.9
          </span>
        </div>

        <div className={styles["event-wrapper"]}>
          <div className={styles["event-item"]}>
            <div className={styles["event-item-icon"]}>
              <LocationICON />
            </div>

            <span className={styles["event-item-text"]}>
              Martires de Kifangondo
            </span>
          </div>

          <div className={styles["event-item"]}>
            <div className={styles["event-item-icon"]}>
              <TimeICON />
            </div>

            <span className={styles["event-item-text"]}>18h às 20h</span>
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
          <p className={styles.text}>Fala tigradaaaa 🐯</p>
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
          </ul>
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
          <button className={styles["btn-buy-ticket"]}>
            <ShoppingCartICON />
            Comprar Ingressos
          </button>
        </div>
      </div>
    </section>
  );
}
