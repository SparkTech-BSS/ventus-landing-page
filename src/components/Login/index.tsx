import Image from "next/image";
import VentusLogo from "../../assets/png/logo(4x).png";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Login() {
  return (
    <section className={styles["login"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <form className={styles.form}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>E-mail</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Senha</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>

          <button className={styles["social-btn"]}>
            <FaFacebookF size={24} />
            Cadastrar com o Facebook
          </button>
          <button className={`${styles["btn"]} ${styles["btn-register"]}`}>
            ENTRAR
          </button>
          <div className={styles["btn-group"]}>
            <a className={styles["link"]}>Não tenho conta</a>
            <a className={styles["link"]}>Esqueci minha senha</a>
          </div>
        </form>
      </div>
    </section>
  );
}
