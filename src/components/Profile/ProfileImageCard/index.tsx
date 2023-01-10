import { ProfileUserICON } from "../../Icon";
import styles from "./styles.module.scss";

export function ProfileImageCard() {
  return (
    <div className={`${styles["profile-image-card"]}`}>
      <ProfileUserICON />
      <span className={`${styles["heading"]}`}>ADICIONAR FOTO DE PERFIL</span>
      <span className={`${styles["subheading"]}`}>
        Arraste ou escolha um arquivo para upload
      </span>
    </div>
  );
}
