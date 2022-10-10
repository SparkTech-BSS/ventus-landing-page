import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { addEventOnElem, removeEventOnElem } from "utils";
import styles from "./styles.module.scss";

export function SearchBox() {
  const [active, searchSuggestionList] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  function handleInputFocus() {
    searchSuggestionList(true);
  }

  function handleInputBlur() {
    searchSuggestionList(false);
  }

  const activeElementOnScroll = function () {
    if (window.scrollY > 100) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  useEffect(() => {
    addEventOnElem(window, "scroll", activeElementOnScroll);
    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${styles["search-container"]} ${
        active ? styles["active"] : ""
      }`}
    >
      <div className={`container`}>
        <div className={`${styles["search-box"]}`}>
          <FiSearch color="#FF5555" size={24} className={styles.icon} />

          <input
            className={styles["input-text"]}
            placeholder="Buscar Evento, show, festa ou teatro"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />

          {active && (
            <button
              className={`${styles["btn-cancel"]} ${
                activeHeader && styles.hide
              }`}
              onClick={handleInputBlur}
            >
              Cancelar
            </button>
          )}
        </div>

        <div
          className={`${styles["suggestion-wrapper"]} ${
            active ? styles.active : ""
          }`}
        >
          <h2 className={styles["suggestion-list-title"]}>Sugestão</h2>

          <ul className={styles["suggestion-list"]}>
            <li>
              <a href="#">Eventos hoje</a>
            </li>
            <li>
              <a href="#">Eventos amanhã</a>
            </li>
            <li>
              <a href="#">Eventos nesta semana</a>
            </li>
            <li>
              <a href="#">Eventos neste fim de semana</a>
            </li>
            <li>
              <a href="#">Eventos na próxima semana</a>
            </li>
            <li>
              <a href="#">Eventos esse mês</a>
            </li>
          </ul>

          <a className={styles["se-more-link"]}>VER TODOS OS EVENTOS</a>
        </div>
      </div>
    </div>
  );
}
