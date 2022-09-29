import Image from "next/image";

import AvatarOne from "../../assets/png/avatar/avatar-1.png";
import AvatarTwo from "../../assets/png/avatar/avatar-2.png";
import AvatarThree from "../../assets/png/avatar/avatar-3.png";

import styles from "./styles.module.scss";

export function Avatar() {
  return (
    <div className={styles.avatars}>
      <div className={styles["avatar-image-box"]}>
        <Image
          src={AvatarOne}
          width={"100%"}
          height={"100%"}
          className={styles.avatar}
          objectFit="cover"
        />
      </div>
      <div className={styles["avatar-image-box"]}>
        <Image
          src={AvatarTwo}
          className={styles.avatar}
          objectFit="cover"
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={styles["avatar-image-box"]}>
        <Image
          src={AvatarThree}
          className={styles.avatar}
          objectFit="cover"
          width={"100%"}
          height={"100%"}
        />
        <div className={styles.more}><span>+250</span></div>
      </div>
    </div>
  );
}
