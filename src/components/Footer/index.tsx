import Image from "next/image";

import LogoSVG from "../../assets/svg/logo(full-size).svg";

import { FiFacebook, FiInstagram } from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import { ApplePlayICON, GooglePlayICON } from "../Icon";

import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer
      className={`section ${styles.footer}`}
      aria-label="footer"
      id="contact"
    >
      <div className={`container ${styles.container}`}>
        <div className={styles["row-body"]}>
          <div className={styles["logo-container"]}>
            <a className={styles.logo}>
              <Image src={LogoSVG} width={90} height={42} alt="" />
            </a>
            <span className={styles.since}>Copyright © 2022</span>
          </div>

          <ul className={styles["footer-link-list"]}>
            <span className={styles["footer-link-list__title"]}>
              PARA COMPRAR
            </span>
            <li>
              <a className={styles["footer-link-list__link"]} href="#">
                Explorar eventos
              </a>
            </li>
            <li>
              <a href="#" className={styles["footer-link-list__link"]}>
                Ajuda
              </a>
            </li>
          </ul>

          <ul className={styles["footer-link-list"]}>
            <span className={styles["footer-link-list__title"]}>
              PARA PRODUTORES
            </span>
            <li>
              <a href="#" className={styles["footer-link-list__link"]}>
                Publicar evento
              </a>
            </li>
            <li>
              <a href="#" className={styles["footer-link-list__link"]}>
                Fale conosco
              </a>
            </li>
          </ul>

          <ul className={styles["footer-link-list"]}>
            <span className={styles["footer-link-list__title"]}>
              INFORMAÇÕES
            </span>
            <li>
              <a href="#" className={styles["footer-link-list__link"]}>
                Termos de uso
              </a>
            </li>
            <li>
              <a href="#" className={styles["footer-link-list__link"]}>
                Politicas de privacidade
              </a>
            </li>
          </ul>

          <ul className={styles["footer-link-list"]}>
            <span className={styles["footer-link-list__title"]}>SOCIAL</span>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100086965278894"
                target="_blank"
                rel="noreferrer"
                className={styles["footer-link-list__link"]}
              >
                <FiFacebook size={20} /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ventus_app/"
                target="_blank"
                rel="noreferrer"
                className={styles["footer-link-list__link"]}
              >
                <FiInstagram size={20} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/244923923758"
                target="_blank"
                rel="noreferrer"
                className={styles["footer-link-list__link"]}
              >
                <FaWhatsapp size={20} /> Whatsapp
              </a>
            </li>
          </ul>
        </div>
        <div className={styles["row-bottom"]}>
          <div className={styles["btn-group"]}>
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
                  Disponível no
                </span>
                <span className={styles["btn-content__text"]}>Google Play</span>
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
                <span className={styles["btn-content__title"]}>Baixar na</span>
                <span className={styles["btn-content__text"]}>Apple Store</span>
              </span>
            </a>
          </div>

          <div className={styles["footer-bottom-text-content"]}>
            <span className={styles["footer-bottom-text"]}>
              Desenvolvido pela{" "}
              <a
                className={styles.sparktech}
                href="https://www.sparktech.co.ao/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Sparktech
              </a>
            </span>
            <span className={styles["footer-bottom-text"]}>
              Todos os direitos reservados | Copyright © 2022 Ventus
            </span>
            <span className={styles["footer-bottom-text"]}>
              Urbanizacao Nova Vida Rua 181 Casa 6024 NA Luanda, Angola
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
