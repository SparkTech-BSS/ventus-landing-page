import Image from "next/image";
import VentusLogo from "../../assets/png/logo(4x).png";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Register() {
  return (
    <section className={styles["register"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />

        <button className={styles["social-btn"]}>
          <FaFacebookF size={24} />
          Cadastrar com o Facebook
        </button>

        <form className={styles.form}>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Nome Completo</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>E-mail</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Telefone</label>
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
          <div className={styles["input-group"]}>
            <div className={styles["label-row"]}>
              <label>Confirmar Senha</label>
              <span className={styles["label-required-symbol"]}>*</span>
            </div>
            <input type="text" className={styles.input} />
          </div>
          <p className={styles.text}>
            Ao clicar no botão abaixo, você declara concordar com nossos{" "}
            <a className={styles.link}>Termos de Serviço</a>
          </p>
          <button className={`${styles["btn"]} ${styles["btn-register"]}`}>
            CADASTRAR
          </button>
          <a className={styles["btn-link"]}>Já sou cadastrado</a>
        </form>
      </div>
    </section>
  );
}
