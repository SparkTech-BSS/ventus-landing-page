import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./styles.module.scss";

export function GoUpButton() {
  const [activeScroll, setActiveScroll] = useState(false);

  function handleGoToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      setActiveScroll(true);
    } else {
      setActiveScroll(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <button
      className={`${styles.button} ${activeScroll ? styles.active : ""}`}
      onClick={handleGoToTop}
    >
      <IoIosArrowUp size={24} />
    </button>
  );
}
