import Image from "next/image";
import VentusLogo from "../../assets/png/logo(4x).png";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

export function ForgetPassword() {
  return (
    <section className={styles["forget-password"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <p className={styles.text}>
          Para iniciar o processo de criação de uma nova senha, preencha o campo
          abaixo com o e-mail associado à sua conta Ventus.
        </p>

        <form className={styles.form}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>E-mail</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>
          <button className={`${styles["btn"]} ${styles["btn-register"]}`}>
            ENTRAR
          </button>
          <a className={styles.link}>
            Voltar para o login
          </a>
        </form>
      </div>
    </section>
  );
}
