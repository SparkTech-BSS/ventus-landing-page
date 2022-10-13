import styles from "./styles.module.scss";

export function Loading() {
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
    </div>
  );
}
