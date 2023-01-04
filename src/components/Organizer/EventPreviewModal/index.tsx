import { useEffect } from "react";
import Modal from "react-modal";
import Image from "next/future/image";
import { CgClose } from "react-icons/cg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LocationICON, TimeICON, StarICON } from "../../Icon";
import { MAP_INFO } from "utils";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  data: any;
}

const URL_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80";

function getBackgroundCoverImageStyles(imageURL: string) {
  return `linear-gradient(180deg, rgba(255, 220, 220, 0.52) 0%, rgba(255, 0, 0, 0.4264) 100%),
      url(${imageURL})`;
}

export function EventPreviewModal({ isOpen, onRequestClose, data }: Props) {
  const {
    about,
    acceptResponsibility,
    category,
    endDate,
    endTime,
    location,
    name,
    organizerName,
    province,
    startDate,
    startTime,
  } = data;

  console.log(data);

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
      className={`react-modal-content w-80`}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <CgClose size={26} color="#FFF" />
      </button>

      <div className={styles["content"]}>
        <div className={`${styles["image-cover"]}`} />
        <Image
          src={URL_EVENT_IMAGE}
          alt=""
          width={100}
          height={100}
          className={styles["event-image"]}
        />

        <div className={styles["heading-row"]}>
          {name ? (
            <>
              {" "}
              <h2 className={`${styles["heading"]}`}>{name}</h2>
              <span className={`${styles["heading-ranting"]}`}>
                <StarICON />
                4.9
              </span>{" "}
            </>
          ) : (
            <Skeleton
              count={1}
              // height="1rem"
              className={`${styles["avatar-skeleton-event-name"]}`}
            />
          )}
        </div>

        <div className={`${styles["event-content"]}`}>
          <div className={`${styles["divider"]}`} />

          <div className={styles["event-wrapper"]}>
            <div className={styles["event-item"]}>
              <div className={styles["event-item-icon"]}>
                <LocationICON />
              </div>

              <span className={styles["event-item-text"]}>
                Rua Aspicuelta 684 - Vila Madalena - São Paulo/SP
              </span>
            </div>

            <div className={styles["event-item"]}>
              <div className={styles["event-item-icon"]}>
                <TimeICON />
              </div>

              <span className={styles["event-item-text"]}>18h às 20h</span>
            </div>

            <div className={styles["event-item"]}>
              <span className={styles["event-item-text"]}>Por</span>
              <span className={styles["event-item-heading"]}>
                LS Republicano
              </span>
            </div>
          </div>

          <h2 className={`${styles["subheading"]}`}>Sobre o evento</h2>

          <div className={`${styles["about-event"]}`}>
            <p>
              Fala tigradaaaa 🐯 Sabemos que todos estavam ansiosos com o fim
              das provas, então nada mais justo que comemorar com o tigrão! Dia
              6/10, quinta-feira, teremos a 1ª F.O.D.A do mês (festa oficial da
              atlética), com 6 HORAS DE OPEN BAR 🍻, e atrações como Kenan e
              Kel, Baile do Duzão e Dj Clip! 📆 06/10 ⏰ 21hrs-3:30hrs
              📍Campinas Hall 🍻 Open: breja, vodka, gin, energético e água.
            </p>
          </div>

          <h2 className={`${styles["subheading"]}`}>LOCALIZAÇÃO </h2>

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
    </Modal>
  );
}
