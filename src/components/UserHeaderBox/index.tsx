import Link from "next/link";
import { useRef, useState, useCallback, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { useClickOutside } from "../../hooks/useClickOutside";
import { getFirstAndLastLetter, getFirstAndLastName } from "../../utils";
import styles from "./styles.module.scss";

export function UserHeaderBox() {
  const { user, logout } = useContext(AuthContext);
  const [openPopover, setOpenPopover] = useState(false);
  const clickRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useClickOutside(clickRef, handleClosePopover);

  const handleToggleOpenPopover = useCallback(() => {
    setOpenPopover(!openPopover);
  }, [openPopover]);

  function handleClosePopover() {
    setOpenPopover(false);
  }

  return (
    <div
      className={styles["container"]}
      ref={clickRef}
      onClick={handleToggleOpenPopover}
    >
      <div className={styles["user-avatar"]}>
        <span className={styles["user-avatar__heading"]}>
          {getFirstAndLastLetter(user?.name)}
        </span>
      </div>
      <span className={styles["user-name"]}>
        {getFirstAndLastName(user?.name)}
      </span>
      <button
        className={`${styles["btn-dropdown"]} ${
          openPopover ? styles.active : ""
        }`}
      >
        <IoIosArrowDown size={18} />
      </button>

      <div
        className={`${styles["menu"]} ${
          openPopover ? styles["fade-inDown"] : styles["fade-outDown"]
        }`}
      >
        <Link href="/tickets">
          <a className={styles["menu-item"]}>
            <span className={styles["menu-item-icon"]}>
              <HiOutlineTicket size={24} color="#ff5555" />
            </span>
            Ingressos
          </a>
        </Link>
        <a className={styles["menu-item"]}>
          <span className={styles["menu-item-icon"]}>
            <MdOutlineFavoriteBorder size={24} color="#ff5555" />
          </span>
          Favorito
        </a>
        <a className={styles["menu-item"]}>
          <span className={styles["menu-item-icon"]}>
            <BiUser size={24} color="#ff5555" />
          </span>
          Minha conta
        </a>
        <a className={styles["menu-item"]}>
          <span className={styles["menu-item-icon"]}>
            <FiHelpCircle size={24} color="#ff5555" />
          </span>
          Central de ajuda
        </a>
        <a className={styles["menu-item"]} onClick={logout}>
          <span className={styles["menu-item-icon"]}>
            <IoExitOutline size={24} color="#ff5555" />
          </span>
          Sair
        </a>
      </div>
    </div>
  );
}
