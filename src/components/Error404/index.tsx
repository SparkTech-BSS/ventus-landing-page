import { WhatsappButton } from "components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import errorPNG from "../../assets/png/error.png";
import styles from "./styles.module.scss";

export function Error404() {
  return (
    <section className={`${styles["error-404"]}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles["heading"]}>
            Oops, não foi possível encontrar esta página...
          </h1>
          <p className={`${styles.text} ${styles["text-one"]}`}>
            Talvez você tenha clicado na pagina errada. Volte para a página
            principal.
          </p>

          <Link href="/">
            <button className={`${styles.btn} ${styles["btn-one"]}`}>
              Voltar para a home
            </button>
          </Link>
        </div>

        <div className={styles["img"]}>
          <Image src={errorPNG} alt="" objectFit="cover" />
        </div>

        <div className={styles["responsive-content"]}>
          <p className={`${styles.text} ${styles["text-two"]}`}>
            Talvez você tenha clicado na pagina errada. Volte para a página
            principal.
          </p>
          <Link href="/">
            <button className={`${styles.btn} ${styles["btn-two"]}`}>
              Voltar para a home
            </button>
          </Link>
        </div>
      </div>

      <WhatsappButton/>
    </section>
  );
}
