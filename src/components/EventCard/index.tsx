import Image from "next/image";

import { Avatar } from "../Avatar";

import {
  LocationICON,
  PeopleICON,
  TimeICON,
  StarICON,
  ArrowEventICON,
} from "../../components/Icon";

import EventImg from "../../assets/png/event/event-1.png";

import styles from "./styles.module.scss";

interface Props {
  width?: "full";
  multipleData?: boolean;
  data: any;
}

export function EventCard({ width, multipleData = true, data }: Props) {
  console.log(data)

  return (
    <a className={`${styles.card} ${width === "full" ? styles.full : ""}`}>
      <Image
        src={data?.images[0]}
        width={280}
        height={207}
        className={styles["card-img"]}
        objectFit="cover"
        alt=""
      />

      {multipleData ? (
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
      ) : (
        <div className={styles.date}>
          <span className={styles["date-month"]}>Out</span>
          <span className={styles["date-day"]}>20</span>
        </div>
      )}

      <div className={styles["card-content"]}>
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

          <span className={styles["card-item-text"]}>
            {data?.location}
          </span>
        </div>

        <div className={styles["card-item"]}>
          <div className={styles["card-item-icon"]}>
            <TimeICON />
          </div>

          <span className={styles["card-item-text"]}>18h às 20h</span>
        </div>

        <div className={styles["card-item"]}>
          <div className={styles["card-item-icon"]}>
            <PeopleICON />
          </div>

          <span className={styles["card-item-text"]}>Pessoas:</span>

          <Avatar />
        </div>
      </div>
    </a>
  );
}
