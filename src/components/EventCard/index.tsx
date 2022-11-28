import Image from "next/future/image";
import Link from "next/link";
import { Avatar } from "../Avatar";

import {
  LocationICON,
  PeopleICON,
  TimeICON,
  StarICON,
  ArrowEventICON,
} from "../../components/Icon";

import EventImg from "../../assets/png/event/event-1.png";

import { getStartDateAndEndDate } from "../../utils";

import styles from "./styles.module.scss";

interface Props {
  width?: "full";
  multipleData?: boolean;
  data: any;
  link?: string;
}

export function EventCard({ width, multipleData = true, data, link }: Props) {
  const dateObject = getStartDateAndEndDate(data?.dates);
  const linkToRedirect = link ? link : `/event-detail/${data?._id}`;

  return (
    <Link href={linkToRedirect} prefetch={false}>
      <a className={`${styles.card} ${width === "full" ? styles.full : ""}`}>
        <Image
          src={data?.images[0]}
          width={280}
          height={207}
          className={styles["card-img"]}
          alt=""
        />

        {data?.dates?.length > 1 ? (
          <div className={styles["date-multiple"]}>
            <div className={styles["date-multiple__col"]}>
              <span className={styles["date-month"]}>
                {dateObject?.startMonth}
              </span>
              <span className={styles["date-day"]}>{dateObject?.startDay}</span>
            </div>
            <ArrowEventICON />
            <div className={styles["date-multiple__col"]}>
              <span className={styles["date-month"]}>
                {dateObject?.endMonth}
              </span>
              <span className={styles["date-day"]}>{dateObject?.endDay}</span>
            </div>
          </div>
        ) : (
          <div className={styles.date}>
            <span className={styles["date-month"]}>
              {dateObject?.startMonth}
            </span>
            <span className={styles["date-day"]}>{dateObject?.startDay}</span>
          </div>
        )}

        <div className={styles["card-content"]}>
          <div>
            <div className={styles["card-title-row"]}>
              <h3 className={styles["card-title"]}>{data?.name}</h3>

              <span className={styles["rating-container"]}>
                <StarICON />
                4.9
              </span>
            </div>

            <div className={styles["card-item"]}>
              <div className={styles["card-item-icon"]}>
                <LocationICON />
              </div>

              <span className={styles["card-item-text"]}>{data?.location}</span>
            </div>

            <div className={styles["card-item"]}>
              <div className={styles["card-item-icon"]}>
                <TimeICON />
              </div>

              <span className={styles["card-item-text"]}>
                {data?.startTime} às {data?.endTime}
              </span>
            </div>
          </div>

          {/* <div className={styles["card-item"]}>
            <div className={styles["card-item-icon"]}>
              <PeopleICON />
            </div>

            <span className={styles["card-item-text"]}>Pessoas:</span>

            <Avatar />
          </div> */}

          <a className={`${styles["btn-buy-ticket"]}`}>Comprar ingresso</a>
        </div>
      </a>
    </Link>
  );
}
