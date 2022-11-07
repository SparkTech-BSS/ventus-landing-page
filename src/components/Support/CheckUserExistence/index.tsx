import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "services/api";
import { CgClose } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { SuccessICON } from "../../Icon";
import styles from "./styles.module.scss";

export function CheckUserExistence() {
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [] = useState('');

  async function handleSubmit() {
    try {
      const response = api.get(`/users/findbyemail/{email}`);
    } catch (error) {}
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={`${styles["check-user-existence"]}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles["breadcrumbs"]}>
          <Link href="" passHref>
            <a className={`${styles["breadcrumbs-link"]}`}>Home</a>
          </Link>

          <IoIosArrowForward size={16} color="#AAAAAA" />

          <Link href="" passHref>
            <a
              className={`${styles["breadcrumbs-link"]} ${styles["breadcrumbs-active-link"]}`}
            >
              Verificar existência do usuário
            </a>
          </Link>
        </div>

        <div className={`${styles.box}`}>
          <div className={`${styles["unsuccess-mark"]}`}>
            <CgClose size={70} color="#FF0000" />
          </div>

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

          <div className={styles["message-container"]}>
            <span className={`${styles["text"]}`}>
              O usuário foi verificado com
            </span>
            <span className={`${styles["text"]}`}>sucesso.</span>
            <button className={`${styles["btn-restart"]}`}>Recomeçar</button>
          </div>

          <div className={`${styles["input-box"]}`}>
            <label>Método de validação</label>
            <select className={styles.select}>
              <option>Telefone</option>
              <option>E-mail</option>
            </select>
          </div>

          <label>Digite o email ou número de telefone </label>
          <input
            placeholder="Digte o e-mail example@ventus.com"
            className={styles.input}
          />
          <button className={styles["btn-check"]}>VERIFICAR</button>
        </div>
      </div>
    </section>
  );
}
