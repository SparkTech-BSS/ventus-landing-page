import { useEffect } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { FiAlertCircle } from "react-icons/fi";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

export function AlertNoSelectedDateEventModal({
  isOpen,
  onRequestClose,
  message
}: Props) {

  useEffect(() => {
    isOpen && document.documentElement.style.setProperty("--overflow", `hidden`);
    !isOpen && document.documentElement.style.setProperty("--overflow", `auto`);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={`react-modal-overlay ${styles["modal-view"]}`}
      className={`react-modal-content w-40`}
    >
      <div className={styles["content"]}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <CgClose size={24} color="#1A2029" />
        </button>

        <div className={`${styles["alert-box"]}`}>
            <FiAlertCircle size={24}/>
            Alerta
        </div>

        <h1 className={`${styles["heading"]}`}>
          {message}
        </h1>
      </div>
    </Modal>
  );
}


//A data de início, de termino e a hora de ínicio e termino do evento não foram selecionados, para criar
//um ingresso deve primeio adicionar a data de íncio, termino e a hora de ínicio e termino do evento.