import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function InfoModal({ isOpen, onRequestClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40`}
    >
      <button
        type="button"
        onClick={() => {
          onRequestClose();
        }}
        className="react-modal-close"
      >
        <IoClose size={24} color="#9D9D99" />
      </button>
      <div className={styles["content"]}>
        <div className={styles["icon-wrapper"]}>
          <MdInfo color="#FF5555" /> <span>Info</span>
        </div>

        <p className={styles.message}>
          Por favor faça o login para poder efectuar a compra do ingresso.
        </p>
      </div>
    </Modal>
  );
}
