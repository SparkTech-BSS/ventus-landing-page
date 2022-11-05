import { useState, useContext, useRef } from "react";
import Link from "next/link";
import Modal from "react-modal";
import ReactToPrint from "react-to-print";
import {
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import { IoClose } from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";
import { IoMdDownload } from "react-icons/io";
import { TiLocation } from "react-icons/ti";
import { FiShare2 } from "react-icons/fi";
import { AuthContext } from "contexts/AuthContext";

import styles from "./styles.module.scss";

import { getCapitalizeFirstLetter, getTicketDetailDate } from "utils";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  data: any;
}

export function TicketModal({ isOpen, onRequestClose, data }: Props) {
  const [openSocialShare, setOpenSocialShare] = useState(false);
  const { user } = useContext(AuthContext);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const URL_TO_SHARE = `https://www.ventusao.app/event-detail/${data?.event?.event?._id}`;

  function handleClickOpenSocialShare() {
    setOpenSocialShare(true);
  }

  function handleClickCloseSocialShare() {
    setOpenSocialShare(false);
  }

  function handleToggleSocialShare() {
    setOpenSocialShare(!openSocialShare);
  }

  console.log(data);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
        setOpenSocialShare(false);
      }}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content w-40 ticket-modal`}
    >
      <div className={`print ${styles.print}`} ref={ref}>
        <div className={styles["content"]}>
          <h1 className={styles["ticket-background"]}>VENTUS</h1>
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
            <h1 className={styles["heading"]}>{data?.event?.event?.name}</h1>
          </div>
          <div className={styles["content-info"]}>
            <div className={styles["item-block"]}>
              <span className={styles["item-heading"]}>Destinátario:</span>
              <span className={styles["item-subheading"]}>{user?.name}</span>
            </div>
            <div className={styles["item-block"]}>
              <span className={styles["item-heading"]}>Data:</span>
              <span className={styles["item-subheading"]}>
                {getTicketDetailDate(data?.ticket?.dateEvent)}
              </span>
              {/* <span className={styles["item-subheading"]}>Fev.06.2022</span> */}
            </div>
            <div className={styles["item-block"]}>
              <span className={styles["item-heading"]}>Hora:</span>
              <span className={styles["item-subheading"]}>
                {data?.event?.event?.startTime} -{" "}
                {`${data?.event?.event?.endTime}`}
              </span>
            </div>
            <div className={styles["item-block"]}>
              <span className={styles["item-heading"]}>Tipo de ingresso:</span>
              <span className={styles["item-subheading"]}>
                {getCapitalizeFirstLetter(data?.ticket?.type)}
              </span>
            </div>
          </div>
          <div className={styles["footer"]}>
            {/* <ReactToPrint
              trigger={() => (
                <button className={styles["footer-btn"]}>
                  <IoMdDownload color="#000" size={24} />
                </button>
              )}
              content={() => ref.current}
            /> */}

            <Link href={`/ticket-to-print/${data?.ticket?._id}`} passHref>
              <a className={styles["footer-btn"]} target="_blank" rel="noopener noreferrer">
                <IoMdDownload color="#000" size={24} />
              </a>
            </Link>

            <button
              className={`${styles["footer-btn"]} ${
                openSocialShare && styles.active
              }`}
              onClick={handleToggleSocialShare}
            >
              <FiShare2 color="#000" size={24} />
            </button>

            <span className={styles["location"]}>
              <TiLocation color="#000" size={24} />
              {data?.event?.event?.location}
            </span>
          </div>

          <div
            className={`${styles["social-wrapper"]} ${
              openSocialShare && styles.active
            }`}
          >
            <div className={styles["social-wrapper-content"]}>
              <FacebookShareButton
                url={URL_TO_SHARE}
                quote={`Venha participar no evento ${data?.event?.event?.name}`}
                hashtag={"#VENTUS #EVENTO"}
              >
                <span className={styles["btn-facebook"]}>
                  <FaFacebookF size={24} />
                </span>
              </FacebookShareButton>

              <WhatsappShareButton url={URL_TO_SHARE}>
                <span className={styles["btn-whatsapp"]}>
                  <FaWhatsapp size={24} />
                </span>
              </WhatsappShareButton>

              <TwitterShareButton url={URL_TO_SHARE}>
                <span className={styles["btn-twitter"]}>
                  <FaTwitter size={24} />
                </span>
              </TwitterShareButton>

              <LinkedinShareButton url={URL_TO_SHARE}>
                <span className={styles["btn-linkedin"]}>
                  <FaLinkedinIn size={24} />
                </span>
              </LinkedinShareButton>

              <TelegramShareButton url={URL_TO_SHARE}>
                <span className={styles["btn-telegram"]}>
                  <FaTelegramPlane size={24} />
                </span>
              </TelegramShareButton>
            </div>

            <span className={styles["text-share"]}>
              Partilhe para os seus amigos
            </span>
          </div>
        </div>
        <div className={styles["qr-code-view"]}>
          <QRCodeSVG
            size={200}
            value={data?.ticket?.code}
            className={styles["qr-code-wrapper"]}
          />
          <span className={styles["qr-code-message"]}>
            Mostre este código para o porteiro do evento
          </span>
        </div>
      </div>
    </Modal>
  );
}
