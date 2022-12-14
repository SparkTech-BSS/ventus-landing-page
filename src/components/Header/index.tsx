import { useState, useEffect, useCallback, useContext } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { IoIosArrowForward } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineFavoriteBorder, MdOutlineEventNote } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import Image from "next/image";
import { FiHelpCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { UserICON } from "../../components/Icon";
import LogoSVG from "../../assets/svg/logo(full-size).svg";
import { ApplePlayICON, GooglePlayICON } from "../Icon";
import { addEventOnElem, removeEventOnElem } from "../../utils";
import { UserHeaderBox } from "../UserHeaderBox";
import { SearchBox } from "components/SearchBox";
import { LoginModal } from "../../components/LoginModal";
import { RegisterModal } from "../../components/RegisterModal";
import { UserHeaderMobileBox } from "components/UserHeaderMobileBox";
import styles from "./styles.module.scss";

Modal.setAppElement("#__next");

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const { user, isAuthenticated, logout } = useContext(AuthContext);

  function handleOpenLoginModal() {
    setOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setOpenLoginModal(false);
  }

  function handleOpenRegisterModal() {
    setOpenRegisterModal(true);
  }

  function handleCloseRegisterModal() {
    setOpenRegisterModal(false);
  }

  function handleToggleShoMenu() {
    setShowMenu(!showMenu);
  }

  function handleCloseMenu() {
    setShowMenu(false);
  }

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const activeElementOnScroll = function () {
    if (window.scrollY > 100) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  const handleCloseNavbar = () => {
    setShowMenu(false);
  };

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    handleSize();
  }, []);

  useEffect(() => {
    const navbarLinks = document.querySelectorAll("[data-nav-link]");

    addEventOnElem(navbarLinks, "click", handleCloseNavbar);

    addEventOnElem(window, "scroll", activeElementOnScroll);

    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();

    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);

      removeEventOnElem(navbarLinks, "click", handleCloseNavbar);

      window.removeEventListener("scroll", logit);
    };
  }, []);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [scrollY, windowSize.height]);


  return (
    <>
      <header
        className={`${styles.header} ${activeHeader ? styles.active : ""}`}
      >
        <div className={`container ${styles.container}`}>
          <Link href="/" passHref>
            <a className={styles.logo}>
              <Image src={LogoSVG} width={90} height={42} alt="" />
            </a>
          </Link>

          <SearchBox />

          <nav className={`${styles.navbar} ${showMenu ? styles.active : ""}`}>
            {/* <UserHeaderMobileBox handleCloseMenu={handleCloseMenu} /> */}

            <UserHeaderMobileBox handleCloseMenu={handleCloseMenu} />

            <ul className={`${styles["navbar-list"]}`}>
              <li className="navbar-item">
                <Link href="/#about" scroll={false}>
                  <a className={styles["navbar-link"]} data-nav-link>
                    <MdOutlineEventNote
                      size={18}
                      className={styles["navbar-link-icon-left"]}
                    />
                    Eventos
                    <IoIosArrowForward
                      size={22}
                      className={styles["navbar-link-icon"]}
                    />
                  </a>
                </Link>
              </li>

              {isAuthenticated && (
                <>
                  <li className={`${styles["nav-item-responsive"]}`}>
                    <Link href="/tickets" scroll={false}>
                      <a
                        // href="#promoter"
                        className={`${styles["navbar-link"]}`}
                        data-nav-link
                      >
                        <HiOutlineTicket
                          size={18}
                          className={styles["navbar-link-icon-left"]}
                        />
                        Ingressos
                        <IoIosArrowForward
                          size={22}
                          className={styles["navbar-link-icon"]}
                        />
                      </a>
                    </Link>
                  </li>

                  <li className={`${styles["nav-item-responsive"]}`}>
                    <Link href="/tickets" scroll={false}>
                      <a
                        // href="#promoter"
                        className={`${styles["navbar-link"]}`}
                        data-nav-link
                      >
                        <MdOutlineFavoriteBorder
                          size={18}
                          className={styles["navbar-link-icon-left"]}
                        />
                        Favoritos
                        <IoIosArrowForward
                          size={22}
                          className={styles["navbar-link-icon"]}
                        />
                      </a>
                    </Link>
                  </li>
                </>
              )}

              <li className="navbar-item">
                {user?.groups?.includes("manager") ? (
                  <Link href="/organizer/dashboard" scroll={false}>
                    <a
                      className={`${styles["navbar-link"]}`}
                      data-nav-link
                    >
                      <BiUser
                        size={18}
                        className={styles["navbar-link-icon-left"]}
                      />
                      ??rea do Organizador
                      <IoIosArrowForward
                        size={22}
                        className={styles["navbar-link-icon"]}
                      />
                    </a>
                  </Link>
                ) : user?.groups?.includes("support") ? (
                  <Link href="/support" scroll={false}>
                  <a
                    className={`${styles["navbar-link"]}`}
                    data-nav-link
                  >
                    <BiUser
                      size={18}
                      className={styles["navbar-link-icon-left"]}
                    />
                    ??rea do Suporte
                    <IoIosArrowForward
                      size={22}
                      className={styles["navbar-link-icon"]}
                    />
                  </a>
                </Link>
                ) : (
                  <Link href="" scroll={false}>
                    <a
                      className={`${styles["navbar-link"]} ${styles["disabled"]}`}
                      data-nav-link
                    >
                      <BiUser
                        size={18}
                        className={styles["navbar-link-icon-left"]}
                      />
                      Seja um promotor
                      <IoIosArrowForward
                        size={22}
                        className={styles["navbar-link-icon"]}
                      />
                    </a>
                  </Link>
                )}
              </li>

              <li className={styles["nav-item-desktop"]}>
                <Link href="/#contact" scroll={false}>
                  <a className={`${styles["navbar-link"]}`} data-nav-link>
                    Baixar
                    <IoIosArrowForward
                      size={22}
                      className={styles["navbar-link-icon"]}
                    />
                  </a>
                </Link>
              </li>

              <li className={`${styles["nav-item-responsive"]}`}>
                <Link href="/" scroll={false}>
                  <a className={`${styles["navbar-link"]}`} data-nav-link>
                    <FiHelpCircle
                      size={18}
                      className={styles["navbar-link-icon-left"]}
                    />
                    Central de ajuda
                    <IoIosArrowForward
                      size={22}
                      className={styles["navbar-link-icon"]}
                    />
                  </a>
                </Link>
              </li>

              {isAuthenticated && (
                <>
                  <li className={`${styles["nav-item-responsive"]}`}>
                    <a
                      className={`${styles["navbar-link"]}`}
                      data-nav-link
                      onClick={logout}
                    >
                      <FiLogOut
                        size={18}
                        className={styles["navbar-link-icon-left"]}
                      />
                      Sair
                      <IoIosArrowForward
                        size={22}
                        className={styles["navbar-link-icon"]}
                      />
                    </a>
                  </li>
                </>
              )}
            </ul>

            {isAuthenticated ? (
              <UserHeaderBox />
            ) : (
              <div className="container">
                <div className={styles["navbar-btn-group"]}>
                  <button
                    className={styles["navbar-btn-outline"]}
                    onClick={handleOpenLoginModal}
                  >
                    <UserICON /> Entrar
                  </button>
                  <button
                    className={styles["navbar-btn"]}
                    onClick={handleOpenRegisterModal}
                  >
                    CRIAR CONTA
                  </button>
                </div>
              </div>
            )}

            <div className={`container ${styles["btn-group"]}`}>
              <a
                className={styles["btn-download-app"]}
                href="https://play.google.com/store/apps/details?id=com.sparktech.ventus"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles["btn-icon"]}>
                  <GooglePlayICON />
                </div>

                <span className={styles["btn-content"]}>
                  <span className={styles["btn-content__title"]}>
                    Dispon??vel no
                  </span>
                  <span className={styles["btn-content__text"]}>
                    Google Play
                  </span>
                </span>
              </a>

              <a
                className={styles["btn-download-app"]}
                href="https://apps.apple.com/ao/app/ventus/id6443834977?platform=iphone"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles["btn-icon"]}>
                  <ApplePlayICON />
                </div>

                <span className={styles["btn-content"]}>
                  <span className={styles["btn-content__title"]}>
                    Baixar na
                  </span>
                  <span className={styles["btn-content__text"]}>
                    Apple Store
                  </span>
                </span>
              </a>
            </div>
          </nav>

          <button
            className={`${styles["menu-toggle"]} ${
              showMenu ? styles.active : ""
            }`}
            aria-label="open menu"
            data-nav-toggler
            onClick={handleToggleShoMenu}
            type="button"
          >
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
          </button>
        </div>
      </header>

      <LoginModal
        isOpen={openLoginModal}
        onRequestClose={handleCloseLoginModal}
      />
      <RegisterModal
        isOpen={openRegisterModal}
        onRequestClose={handleCloseRegisterModal}
      />
    </>
  );
}
