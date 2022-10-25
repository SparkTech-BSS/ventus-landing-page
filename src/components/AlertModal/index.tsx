import Modal from "react-modal";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { FiAlertCircle } from "react-icons/fi";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
  title: string;
  submessage: string;
}

export function AlertModal({
  isOpen,
  onRequestClose,
  message,
  title,
  submessage,
}: Props) {
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

        <h2 className={styles["heading"]}>{title}</h2>
        <p className={styles["text"]}>{message}</p>
        <p className={styles["text-bold"]}>{submessage}</p>
        <Link href="/">
          <button className={styles["buy-btn"]}>Voltar na home</button>
        </Link>
      </div>
    </Modal>
  );
}
