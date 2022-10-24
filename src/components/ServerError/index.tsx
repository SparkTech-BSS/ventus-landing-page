import InternalErrorImg from "../../assets/png/internal-error-505.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export function ServerError() {
  return (
    <section className={styles["wrapper"]}>
      <div className={`container ${styles["container"]}`}>
        <Image
          src={InternalErrorImg}
          alt=""
          width={256}
          height={225}
          objectFit="cover"
        />
        <h1>
          <span>500</span>
          Erro do Servidor Interno
        </h1>
        <p className={styles["info-text"]}>
          Ups, parece que teve um erro no servidor interno. 
          No momento, estamos tentando corrigir o problema. Caso o erro
          persisitir por favor actualize a página ou contacte o nosso apoio ao
          usuário no whatsApp.
        </p>
        <p className={styles["info"]}>
          Illustration taken from
          <Link href="/" passHref>
            <a>kapwing.com</a>
          </Link>
        </p>
      </div>
    </section>
  );
}
