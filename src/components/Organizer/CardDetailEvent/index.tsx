import { useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import { QRCodeSVG } from "qrcode.react";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import styles from "./styles.module.scss";

interface Props {
  data?: any;
}

export function CardDetailEvent({ data }: Props) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const URL_TO_SHARE = `https://www.ventusao.app/event-detail/${data?.event?._id}`;

  function handleCopied() {
    setCopied(true);
    copy(URL_TO_SHARE);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className={styles["card-event"]}>
      <div className={styles["card-event__left"]}>
        <h2 className={styles.heading}>DETALHES DO EVENTO</h2>

        <div className={styles["items"]}>
          <div className={styles.item}>
            <span className={styles["item-heading"]}>Status</span>
            <span className={styles["item-status"]}>Publicado</span>
          </div>
          <div className={styles.item}>
            <span className={styles["item-heading"]}>
              Visualizações da pagina de vendas
            </span>
            <span className={styles["item-text"]}>11</span>
          </div>
        </div>

        <div className={styles["items"]}>
          <div className={styles.item}>
            <span className={styles["item-heading"]}>Visibilidade</span>
            <span className={styles["item-text"]}>Público</span>
          </div>
          <div className={styles.item}>
            <span className={styles["item-heading-row"]}>
              <span className={styles["item-heading-row-heading"]}>
                Compartilhar via
              </span>
              <FacebookShareButton
                url={URL_TO_SHARE}
                hashtag={"#VENTUS#EVENTO"}
              >
                <span className={styles.btn}>
                  <FaFacebookSquare size={22} color="#4460A0" />
                </span>
              </FacebookShareButton>
              <button className={styles.btn}>
                <AiFillInstagram size={22} color="#FF2B2B" />
              </button>
              <WhatsappShareButton url={URL_TO_SHARE}>
                <span className={styles.btn}>
                  <IoLogoWhatsapp size={22} color="#60D669" />
                </span>
              </WhatsappShareButton>
              <span className={styles["copy-link"]} onClick={handleCopied}>
                COPIAR LINK
              </span>
              {copied && <span className={styles.copied}>Link Copiado</span>}
            </span>
            <span className={`${styles["item-site"]}`}>{URL_TO_SHARE}</span>
          </div>
        </div>
      </div>

      <div className={styles["card-event__right"]}>
        <h2 className={styles["qr-code-heading"]}>QR CODE</h2>
        <div className={styles["qr-code-view"]}>
          <QRCodeSVG
            size={130}
            value=""
            className={styles["qr-code-wrapper"]}
          />
        </div>
        <span className={styles["download-qr-code"]}>Baixar QR Code</span>
      </div>
    </div>
  );
}
