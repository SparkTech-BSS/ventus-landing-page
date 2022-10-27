import Modal from "react-modal";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { FiAlertCircle } from "react-icons/fi";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function RateModal({ isOpen, onRequestClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <div className={styles["content"]}>
        <button
          type="button"
          onClick={() => {
            onRequestClose();
          }}
          className="react-modal-close"
        >
          <CgClose size={24} color="#1A2029" />
        </button>

        <h2 className={styles["heading"]}>Taxa de pagamento</h2>
        <p className={styles["text"]}>
          O processamento de transações online pode ser complicado, as taxas de
          reserva são todos os custos que o aplicativo coleta para tornar
          possível essa transação online simples e segura. Estes incluem taxas
          bancárias, comissões e outros custos administrativos.
        </p>
        {/* <p className={styles["text-bold"]}>sfdfdsfsdfd</p> */}
        <button className={styles["buy-btn"]} onClick={onRequestClose}>OK</button>
      </div>
    </Modal>
  );
}
