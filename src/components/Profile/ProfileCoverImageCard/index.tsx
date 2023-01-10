import { GalleryImageICON } from "../../Icon";
import styles from "./styles.module.scss";

export function ProfileCoverImageCard() {
  return (
    <div className={`${styles["profile-cover-image-card"]}`}>
      <GalleryImageICON />
      <span className={`${styles["heading"]}`}>
        ADICIONAR FOTO DE CAPA DO PERFIL
      </span>
      <span className={`${styles["subheading"]}`}>
        Arraste ou escolha um arquivo para upload
      </span>
    </div>
  );
}
