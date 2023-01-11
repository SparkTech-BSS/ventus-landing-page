import styles from "./styles.module.scss";
// Por default coloquei um espaçamento de 10rem, isso para que o button apareça.

interface ButtonProps {
  textContent?: string;
  backgroundColors?: "btn-primary-bg" | "btn-gradient-bg" | "btn-default-bg";
  fontSize?: "btn-size-16" | "btn-size-13" | "btn-size-12";
  borderRadius?:
    | "btn-primary-borderRadius"
    | "btn-secondary-borderRadius"
    | "btn-default-borderRadius";
  fontWeight?:
    | "btn-fontWeight-900"
    | "btn-fontWeight-700"
    | "btn-fontWeight-600";
  color?: "btn-color-primary" | "btn-color-secondary" | "btn-color-default";
  border?:
    | "btn-border-default"
    | "btn-border-solid-primary"
    | "btn-border-solid-secondary";
  onClick?: () => void;
}

export function Button({
  textContent = "Aqui",
  backgroundColors = "btn-default-bg",
  borderRadius = "btn-default-borderRadius",
  fontSize = "btn-size-16",
  fontWeight = "btn-fontWeight-900",
  onClick,
  color = "btn-color-primary",
  border = "btn-border-default",
}: ButtonProps) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles[backgroundColors]} ${styles[borderRadius]} ${styles[border]} `}
        onClick={onClick}
      >
        <a
          href={"/experment"}
          className={`${styles[fontSize]} ${styles[fontWeight]} ${styles[color]}`}
        >
          {textContent}
        </a>
      </button>
    </div>
  );
}
