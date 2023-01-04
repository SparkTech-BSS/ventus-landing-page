import { useEffect } from "react";
import { Input } from "components/Input";
import styles from "./styles.module.scss";

export function ChangeEmail() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <section className={`${styles["container"]}`}>
      <form>
        <h1 className={`${styles["heading"]}`}>Alterar e-mail/senha</h1>

        <div className={styles.divider} />

        <div className={`${styles["input-controller-wrapper"]}`}>
          <div className={`${styles["input-group"]}`}>
            <Input label="E-mail" requiredSymbol />
          </div>

          <div className={`${styles["input-group"]}`}>
            <Input label="Senha" requiredSymbol />
          </div>
        </div>

        <div className={styles.divider} />

        <button className={`${styles["btn"]} ${styles["btn-submit"]}`}>
          SALVAR ALTERAÇÕES
        </button>
      </form>
    </section>
  );
}
