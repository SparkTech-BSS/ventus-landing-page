import Image from "next/future/image";
import { StaticImageData } from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Image1 from "../../../assets/png/highlighted/image-1.png";
import styles from "./styles.module.scss";

interface Props {
  image: string | StaticImageData;
  date: string;
  title: string;
  location: string;
}

export function HighlightedCardEvent({ image, date, title, location }: Props) {
  return (
    <div className={`${styles["highlighted-card-event"]}`}>
      <div className={`${styles["highlighted-card-event__image--wrapper"]}`}>
        <Image
          src={image}
          alt=""
          className={`${styles["highlighted-card-event__image--wrapper__image"]}`}
        />
      </div>
      <div className={`${styles["highlighted-card-event__content"]}`}>
        <div className={`${styles["date-box"]}`}>
          <span className={`${styles["date-box-text"]}`}>
            {date}
          </span>

          {/* <IoIosArrowForward color="#939598" size={18} /> */}
        </div>
        <h2 className={`${styles["heading"]}`}>
          {title}
        </h2>

        <span className={`${styles["location-heading"]}`}>
          {location}
        </span>

        <button className={`${styles["btn"]}`}>COMPRAR INGRESSO</button>
      </div>
    </div>
  );
}
