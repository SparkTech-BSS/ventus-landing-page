import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";
import { IoMdDownload } from "react-icons/io";
import { TiLocation } from "react-icons/ti";
import { FiShare2 } from "react-icons/fi";
import { MdInfo } from "react-icons/md";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TicketModal({ isOpen, onRequestClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40 ticket-modal`}
    >
      <div className={styles["content"]}>
        <h1 className={styles["ticket-background"]}>TICKET</h1>
        <button
          type="button"
          onClick={() => {
            onRequestClose();
          }}
          className="react-modal-close"
        >
          <IoClose size={24} color="#000000" />
        </button>
        <div className={styles["heading-box"]}>
          <span className={styles.year}>2022</span>
          <h1 className={styles["heading"]}>Mercado da comida</h1>
        </div>

        <div className={styles["content-info"]}>
          <div className={styles["item-block"]}>
            <span className={styles["item-heading"]}>Destinátario:</span>
            <span className={styles["item-subheading"]}>Fábio Baziota</span>
          </div>
          <div className={styles["item-block"]}>
            <span className={styles["item-heading"]}>Data:</span>
            <span className={styles["item-subheading"]}>Fev.06.2022</span>
          </div>
          <div className={styles["item-block"]}>
            <span className={styles["item-heading"]}>Hora:</span>
            <span className={styles["item-subheading"]}>18:00</span>
          </div>
          <div className={styles["item-block"]}>
            <span className={styles["item-heading"]}>Tipo de ingresso:</span>
            <span className={styles["item-subheading"]}>VIP</span>
          </div>
        </div>

        <div className={styles["footer"]}>
          <button className={styles["footer-btn"]}>
            <IoMdDownload color="#000" size={24} />
          </button>
          <button className={styles["footer-btn"]}>
            <FiShare2 color="#000" size={24} />
          </button>

          <span className={styles["location"]}>
            <TiLocation color="#000" size={24} />
            Ilha de Luanda
          </span>
        </div>

        {/* <div className={styles["dots"]}>
          {Array.from(Array(7).keys()).map((_, index) => (
            <div key={String(index)} className={styles["dot"]} />
          ))}
        </div> */}
      </div>
      <div className={styles["qr-code-view"]}>
        <QRCodeSVG
          size={200}
          value="https://reactjs.org/"
          className={styles["qr-code-wrapper"]}
        />
        <span className={styles["qr-code-message"]}>
          Mostre este código para o porteiro do evento
        </span>
      </div>
    </Modal>
  );
}
