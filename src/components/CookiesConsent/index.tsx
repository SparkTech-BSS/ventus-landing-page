import { useState, useEffect, MouseEvent } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { goUp } from "utils";
import {
  USER_CONSENT_COOKIE_EXPIRE_DATE,
  USER_CONSENT_COOKIE_KEY,
} from "config";

export function CookiesConsent() {
  const [active, setActive] = useState(true);
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  function handleClose() {
    setActive(false);
    document.documentElement.style.setProperty("--overflow", `auto`);
  }

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);

    if (consentIsTrue) {
      document.documentElement.style.setProperty("--overflow", `auto`);
    }
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--overflow", `auto`);
    }
    return null;
  }

  return (
    <>
      <div className={`${styles.shadow} ${active ? styles.active : ""}`}></div>

      <section className={`${styles.cookies} ${active ? styles.active : ""}`}>
        <p className={styles["cookies-text"]}>
          Para saber mais sobre os cookies olhe nossa{" "}
          <a className={styles["cookies-link"]} href="#">
            Política de privacidade
          </a>{" "}
          e{" "}
          <a className={styles["cookies-link"]} href="#">
            Termos de uso
          </a>
        </p>

        <div className={styles["btn-group"]}>
          <button className={styles["btn-primary"]} onClick={onClick}>
            Aceitar
          </button>
          <button className={styles["btn-secondary"]}>Mais Detalhes</button>
        </div>
      </section>
    </>
  );
}
