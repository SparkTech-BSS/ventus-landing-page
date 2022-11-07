import styles from "./styles.module.scss";

export function Banner() {
    return (
        <div className={`${styles["banner"]}`}>
            <h1 className={styles.heading}>Área do Suporte Ventus</h1>
        </div>
    )
}