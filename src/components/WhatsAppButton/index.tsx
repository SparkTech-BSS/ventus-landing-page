import { useState, useRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoClose, IoSend } from "react-icons/io5";
import { ReadICON } from "../../components/Icon";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

import styles from "./styles.module.scss";

export function WhatsappButton() {
  const [value, setValue] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  function handleOpenChat() {
    setOpenChat(true);
  }

  function handleCloseChat() {
    setOpenChat(false);
  }

  function handleToggleOpenChat() {
    setOpenChat(!openChat);
  }

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.chat} ${openChat ? styles.active : ""}`}>
        <div className={styles["chat-header"]}>
          <span className={styles["chat-header__title"]}>
            <BsWhatsapp size={20} color="#FFF" />
            Whatsapp
          </span>

          <button className={styles["btn-close"]} onClick={handleCloseChat}>
            <IoClose size={24} />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles["chat-question"]}>
            <span className={styles["chat-question-text"]}>
              Olá, como podemos te ajudar?
            </span>

            <span className={styles.hour}>
              11:33
              <ReadICON />
            </span>
          </div>

          <div className={styles.answer}>
            <textarea
              className={styles["answer-input"]}
              placeholder="Digite aqui..."
              ref={textAreaRef}
              rows={1}
              value={value}
              onChange={handleChange}
              id="review-text"
            />

            <button className={styles["button-send"]}>
              {/* <SendICON /> */}
              <IoSend size={20} />
            </button>
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/244923923758"
        target="_blank"
        rel="noreferrer"
        className={styles.button}
      >
        {openChat ? (
          <IoClose size={30} color="#FFF" />
        ) : (
          <BsWhatsapp size={30} color="#FFF" />
        )}
      </a>
    </div>
  );
}
