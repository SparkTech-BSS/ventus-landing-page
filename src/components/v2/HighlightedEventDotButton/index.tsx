import styles from "./styles.module.scss";

interface Props {
    selected: boolean;
    onClick: any;
}

export const HighlightedEventDotButton = ({ selected, onClick }: Props) => (
  <button
    className={`${styles["dot-button"]} ${selected && styles["dot-button-selected"]}`}
    onClick={onClick}
  />
);
