import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import { useMediaQuery } from "usehooks-ts";
import { getFirstAndLastLetter, getFirstAndLastName } from "../../utils";
import LogoSVG from "../../assets/svg/logo(full-size).svg";
import styles from "./styles.module.scss";

interface Props {
  handleCloseMenu: () => void;
}

export function UserHeaderMobileBox({ handleCloseMenu }: Props) {
  const activeUserMenu = useMediaQuery("(max-width: 1200px");
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>
      {activeUserMenu && (
        <>
          <div
            className={`${styles["navbar-top"]} container`}
            suppressHydrationWarning={true}
          >
            <Link href="/" passHref>
              <a className={styles.logo}>
                <Image src={LogoSVG} width={90} height={42} alt="" />
              </a>
            </Link>

            <button
              className={styles["close-menu-button"]}
              onClick={handleCloseMenu}
            >
              <IoClose size={30} />
            </button>
          </div>

          {isAuthenticated && (
            <>
              <div
                className={`${styles["user-wrapper"]} container`}
                suppressHydrationWarning={true}
              >
                <div className={styles["user-wrapper-content"]}>
                  <Link href="/profile" passHref>
                    <a className={styles["user-box"]}>
                      <span className={styles["user-initials"]}>
                        {getFirstAndLastLetter(user?.name)}
                      </span>
                    </a>
                  </Link>

                  <h4 className={styles["user-name"]}>
                    {getFirstAndLastName(user?.name)}
                  </h4>
                </div>
                <div
                  className={`container ${styles["user-wrapper-divider"]}`}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
