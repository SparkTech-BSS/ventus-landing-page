import styles from "./styles.module.scss";

export function Artigos () {
    return (
        <section className={styles.container}>
            <h3 className={styles["artigos-title"]}>Artigos nesta seção</h3>
            <div className={styles["artigos-text-container"]}>
                <p className={styles["artigos-text"]}>
                    É possivel cancelar uma compra
                </p>
                <p className={styles["artigos-text"]}>
                    O que você precisa saber sobre as transferencias de ingressos?
                </p>
                <p className={styles["artigos-text"]}>
                    Não consigo localizar meu ingresso!
                </p>
                <p className={styles["artigos-text"]}>
                    Esqueci minha senha! E agora?
                </p>
                <p className={styles["artigos-text"]}>
                    Minha compra foi estornada. Como funciona esse procedimento?
                </p>
                
                
            </div>
        </section>
    );
}