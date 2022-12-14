import {
  useEffect,
  useState,
  FormEvent,
  InvalidEvent,
  ChangeEvent,
} from "react";
import Link from "next/link";
import Modal from "react-modal";
import { Loading } from "components/Loading";
import { MdOutlineRestartAlt } from "react-icons/md";
import { api } from "services/api";
import { CgClose } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./styles.module.scss";
import { getDateFullFormat, getObjectDate } from "utils";
import { TicketListModal } from "../TicketListModal";

Modal.setAppElement("#__next");

export function CheckUserExistence() {
  const [loading, setLoading] = useState(false);
  const [checkingType, setCheckingType] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState<string | number>("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [openTicketListModal, setOpenTicketListModal] = useState(false);
  const [activeChecking, setActiveChecking] = useState(false);
  const [userResultData, setUserResultData] = useState<any>({});
  const [clientSelectedId, setClientSelectedId] = useState("");
  const [clientSelectedName, setClientSelectedName] = useState("");

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as typeof checkingType;
    setCheckingType(value);
    setPhone("");
    setEmail("");
  }

  function handleChangeNumber(event: ChangeEvent<HTMLInputElement>) {
    const result = event.target.value.replace(/\D/g, "");

    setPhone(result);
  }

  function handleOpenTicketListModal() {
    setOpenTicketListModal(true);
  }

  function handleCloseTicketListModal() {
    setOpenTicketListModal(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    let checking_type_url = "";

    if (checkingType === "phone") {
      checking_type_url = `users/findbyphone/${phone}`;
    } else {
      checking_type_url = `users/findbyemail/${email}`;
    }

    try {
      const { data } = await api.get(checking_type_url);

      console.log(data);

      setUserResultData(data);

      setActiveChecking(true);

      if (data?.error) {
        setIsChecked(false);
      } else {
        setIsChecked(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCheckingInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo ?? obrigat??rio");
  }

  function handleRestart() {
    setActiveChecking(false);
    setIsChecked(false);
    setPhone("");
    setEmail("");
    setCheckingType("phone");
    setUserResultData({});
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <>
      <section className={`${styles["check-user-existence"]}`}>
        <div className={`container ${styles.container}`}>
          <div className={styles["breadcrumbs"]}>
            <Link href="/support" passHref>
              <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
            </Link>

            <IoIosArrowForward size={16} color="#AAAAAA" />

            <Link href="/support/check-user-existence" passHref>
              <a
                className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
              >
                Verificar exist??ncia do usu??rio ou do ingresso
              </a>
            </Link>
          </div>

          <div className={`${styles.box}`}>
            {activeChecking && isChecked && (
              <>
                <div className={`${styles["info"]}`}>
                  <div className={`${styles["success-checkmark"]}`}>
                    <div className={`${styles["check-icon"]}`}>
                      <span
                        className={`${styles["icon-line"]} ${styles["line-tip"]}`}
                      ></span>
                      <span
                        className={`${styles["icon-line"]} ${styles["line-long"]}`}
                      ></span>
                      <div className={`${styles["icon-circle"]}`}></div>
                      <div className={`${styles["icon-fix"]}`}></div>
                    </div>
                  </div>

                  <div className={`${styles["user-data"]}`}>
                    <h2 className={styles["user-data-heading"]}>
                      Dados do Usu??rio
                    </h2>
                    <div className={`${styles["user-data-item"]}`}>
                      <span>
                        Nome: {userResultData?.firstName}{" "}
                        {userResultData?.lastName}
                      </span>
                      <span>Email: {userResultData?.email}</span>
                      <span>Telefone: {userResultData?.phone}</span>
                      <span>
                        Data de cria????o:{" "}
                        {getDateFullFormat(userResultData?.createdAt)}
                      </span>
                    </div>
                    <div className={styles["message-container"]}>
                      <span className={`${styles["text"]}`}>
                        O usu??rio foi verificado com sucesso.
                      </span>
                      <button
                        className={`${styles["btn-restart"]}`}
                        onClick={handleRestart}
                      >
                        Recome??ar
                      </button>
                      <button
                        className={`${styles["btn-outline"]}`}
                        title="GERENCIAR"
                        onClick={() => {
                          handleOpenTicketListModal();
                          setClientSelectedId(userResultData?._id);
                          setClientSelectedName(
                            `${userResultData?.firstName} ${userResultData?.lastName}`
                          );
                        }}
                      >
                        Verificar Ingresso
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeChecking && !isChecked && (
              <>
                <div className={`${styles["info"]}`}>
                  <div className={`${styles["unsuccess-mark"]}`}>
                    <CgClose size={70} color="#FF0000" />
                  </div>

                  <div className={styles["message-container"]}>
                    <span className={`${styles["text"]}`}>
                      Ups, parece que o usu??rio n??o existe, n??o foi poss??vel
                      verificar o usu??rio.
                    </span>
                    {/* <span className={`${styles["text"]}`}>sucesso.</span> */}
                    <button
                      className={`${styles["btn-restart"]}`}
                      onClick={handleRestart}
                    >
                      Recome??ar
                    </button>
                  </div>
                </div>
              </>
            )}

            {!activeChecking && (
              <>
                <h1 className={styles.heading}>
                  Selecione o m??todo de verifica????o e verifique o seu usu??rio
                </h1>

                <div className={`${styles["input-box"]}`}>
                  <label>M??todo de valida????o</label>
                  <select className={styles.select} onChange={handleSelect}>
                    <option value="phone">Telefone</option>
                    <option value="email">E-mail</option>
                  </select>
                </div>

                <form onSubmit={handleSubmit}>
                  {checkingType === "phone" && (
                    <>
                      <label>Digite o n??mero de telefone </label>
                      <input
                        placeholder="Exemplo 999555666"
                        name="phone"
                        className={styles.input}
                        // type="text"
                        value={phone}
                        onChange={handleChangeNumber}
                        onInvalid={handleCheckingInvalid}
                        onInput={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity("")
                        }
                        required
                      />
                    </>
                  )}

                  {checkingType === "email" && (
                    <>
                      <label>Digite o e-mail </label>
                      <input
                        placeholder="Exemplo exemplo@ventus.com"
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onInvalid={handleCheckingInvalid}
                        onInput={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity("")
                        }
                        required
                      />
                    </>
                  )}

                  <button
                    type="submit"
                    className={styles["btn-check"]}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className={styles["btn-loader"]} />
                    ) : (
                      "VERIFICAR"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <TicketListModal
        isOpen={openTicketListModal}
        onRequestClose={handleCloseTicketListModal}
        clientSelectedId={clientSelectedId}
        clientSelectedName={clientSelectedName}
      />
    </>
  );
}
