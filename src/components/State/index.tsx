
import styles from "./styles.module.scss";

interface Props {
    text: string;
    state: string;
    heading: string; 
}

export function State({ text, state, heading  }: Props) { 
    return (
        <div className={`container ${styles.state}`}>
            <p className={styles.text}>{text}</p>

            <div className={styles["state-wrapper"]}>
                <div className={styles["state-line"]}></div>
                <div className={styles["state-content"]}>
                    <span>{state}</span>
                </div>
            </div>

            <h2 className={styles.heading}>{heading}</h2>
        </div>
    );
}