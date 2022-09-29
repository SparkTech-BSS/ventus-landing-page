import Image from "next/image";

import { Avatar } from "../Avatar";

import {
  LocationICON,
  PeopleICON,
  TimeICON,
  StarICON,
} from "../../components/Icon";

import EventImg from "../../assets/png/event/event-1.png";

import styles from "./styles.module.scss";

export function EventCard() {
  return (
    <a className={styles.card}>
      <Image
        src={EventImg}
        width={280}
        height={207}
        className={styles["card-img"]}
        objectFit="cover"
        alt=""
      />

      <div className={styles.date}>
        <span className={styles["date-month"]}>Out</span>
        <span className={styles["date-day"]}>20</span>
      </div>

      <div className={styles["card-content"]}>
        <div className={styles["card-title-row"]}>
          <h3 className={styles["card-title"]}>Show de Heavy C </h3>

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
            Martires de Kifangondo
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
