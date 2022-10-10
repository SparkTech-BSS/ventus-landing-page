import Image from "next/image";
import VentusLogo from "../../assets/png/logo(4x).png";
import styles from "./styles.module.scss";

export function ConfirmEmail() {
  return (
    <section className={styles["confirm-email"]}>
      <div className={styles.container}>
        <Image
          src={VentusLogo}
          alt=""
          width={186}
          height={58}
          objectFit="cover"
        />
        <div className={styles.content}>
          <p className={styles.text}>Confira seu email.</p>
          <p className={styles.text}>
            Enviamos uma mensagem com um link para você criar uma nova senha.
          </p>

          <a className={styles.link}>Voltar para o login</a>
        </div>
      </div>
    </section>
  );
}
