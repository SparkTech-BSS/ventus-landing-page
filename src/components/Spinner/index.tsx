import styles from "./styles.module.scss";

export function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className={styles["spinner-text"]}>Carregando...</span>
    </div>
  );
}
