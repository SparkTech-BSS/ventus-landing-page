import styles from "./styles.module.scss";

export function CreateEvent() {
  return (
    <section className={styles["create-event"]}>
      <div className={styles["create-event-header"]}>
        <div className={`container ${styles["create-event-header__wrapper"]}`}>
          <h1 className={styles["heading"]}>
            Criar{" "}
            <span className={styles["heading-bold"]}>Evento Presencial</span>
          </h1>

          <div className={styles["btn-group"]}>
            <a className={`${styles["btn"]} ${styles["btn-full"]}`}>PUBLICAR EVENTO</a>
            <a className={`${styles["btn"]} ${styles["btn-outline"]}`}>PRÉ-VISUALIZAR</a>
            <a className={`${styles["btn"]} ${styles["btn-outline"]}`}>SALVAR RASCUNHO</a>
          </div>
        </div>
      </div>

      <div className={styles["create-event-content"]}>
        
      </div>
    </section>
  );
}
