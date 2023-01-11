import { Button } from "../Button";
import styles from "./styles.module.scss";
import Image3 from "../../../../assets/png/highlighted/image-3.png";
import Image from "next/image";
import Vetor from "../../../../assets/svg/material-symbols_arrow-forward-ios-rounded.svg";

export function CardHome() {
  return (
    <div className={styles["card-container"]}>
      <section className={styles["card-home"]}>
        <div className={styles["card-home-image"]}>
          <Image src={Image3} alt="" />
        </div>

        <div className={styles["card-home-descrition"]}>
          <div className={styles["card-home-date"]}>
            <span className={styles["card-home-date-inicio"]}>22 DEZ</span>
            <span className={styles["card-home-icon"]}>
              {" "}
              <Image src={Vetor} />{" "}
            </span>
            <span className={styles["card-home-date-fim"]}> 01 JAN</span>
          </div>
          <h2 className={styles["card-home-title"]}>MERCADO DA COMIDA</h2>
          <p className={styles["card-home-subtitle"]}>
            Porto de Luanda - Angola
          </p>

          <div>
            <Button
              backgroundColors="btn-primary-bg"
              color="btn-color-primary"
              fontWeight="btn-fontWeight-700"
              fontSize="btn-size-16"
              textContent="COMPRAR INGRESSO"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
