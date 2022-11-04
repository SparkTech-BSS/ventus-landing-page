import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import { api } from "services/api";
import LogoVentusBlack from "../../assets/png/logo-ventus-black.png";
import { Loading } from "components/Loading";
import {
  MdOutlinePictureAsPdf,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import ReactToPrint from "react-to-print";
import LogoSVG from "../../assets/svg/logo(full-size).svg";
import { ServerError } from "components/ServerError";
import { AuthContext } from "contexts/AuthContext";
import { getCapitalizeFirstLetter, getTicketDetailDate } from "utils";
import styles from "./styles.module.scss";

export function TicketToPrint() {
  const [ticketData, setTicketData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get(`/tickets/findbyclientidticketid/${id}`);
        setTicketData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (error) {
    return <ServerError />;
  }

  return (
    <section className={`${styles["ticket-to-print"]}`}>
      <div className={`${styles.container}`}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link href="/tickets" passHref>
              <a className={styles["btn-back"]}>
                <MdOutlineKeyboardBackspace size={24} /> Voltar para Ingressos
              </a>
            </Link>

            <ReactToPrint
              trigger={() => (
                <button className={styles["btn-pdf"]}>
                  <MdOutlinePictureAsPdf size={20} /> Gerar PDF
                </button>
              )}
              content={() => ref.current}
              documentTitle={`Ingresso Código - ${ticketData?.ticket?.code}`}
            />

            <div className={`${styles["ticket"]} pagebreak`} ref={ref}>
                

              <h2 className={`${styles["ticket-title"]} ticket-to-print-title`}>
                {ticketData?.event?.event?.name}
              </h2>
              <span
                className={`${styles["ticket-owner"]} ticket-to-print-owner`}
              >
                Destinatário: {user?.name}
              </span>

              <h1 className={`${styles["ticket-background"]}`}>VENTUS</h1>

              <div className={`${styles.separator}`} />

              <div className={`${styles.content}`}>
                <div className={`${styles["ticket-item"]}`}>
                  <span className={`${styles["ticket-item-heading"]}`}>
                    Local
                  </span>
                  <span className={`${styles["ticket-item-subheading"]}`}>
                    {ticketData?.event?.event?.location}
                  </span>
                </div>

                <div className={`${styles["ticket-item"]}`}>
                  <span className={`${styles["ticket-item-heading"]}`}>
                    Data
                  </span>
                  <span className={`${styles["ticket-item-subheading"]}`}>
                    {getTicketDetailDate(ticketData?.ticket?.dateEvent)}
                  </span>
                </div>

                <div className={`${styles["ticket-item"]}`}>
                  <span className={`${styles["ticket-item-heading"]}`}>
                    Hora
                  </span>
                  <span className={`${styles["ticket-item-subheading"]}`}>
                    {ticketData?.event?.event?.startTime} -{" "}
                    {`${ticketData?.event?.event?.endTime}`}
                  </span>
                </div>

                <div className={`${styles["ticket-item"]}`}>
                  <span className={`${styles["ticket-item-heading"]}`}>
                    Tipo de ingresso
                  </span>
                  <span className={`${styles["ticket-item-subheading"]}`}>
                    {getCapitalizeFirstLetter(ticketData?.ticket?.type)}
                  </span>
                </div>
              </div>

              <div className={`${styles["qr-code-view"]}`}>
                <QRCodeSVG
                  size={150}
                  value={ticketData?.ticket?.code}
                  className={`${styles["qr-code-wrapper"]}`}
                />

                <span className={styles["ticket-code"]}>
                  {ticketData?.ticket?.code}
                </span>

                {/* <span className={`${styles["qr-code-message"]}`}>
                  Mostre este código para o porteiro do evento
                </span> */}

                <Image src={LogoVentusBlack} width={100} height={42} alt="" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
