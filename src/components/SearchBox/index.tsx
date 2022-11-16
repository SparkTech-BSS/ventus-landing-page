import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { addEventOnElem, removeEventOnElem } from "utils";
import styles from "./styles.module.scss";

export function SearchBox() {
  const [active, searchSuggestionList] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { name } = router.query;

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

  function isNotEmpty(value: string) {
    return typeof value === "string" && value.trim().length !== 0;
  }

  useEffect(() => {
    if (!name === undefined) {
      setSearch(name!.toString().trim());
    }

    if (typeof name == "string") {
      setSearch(name?.toString().trim());
    }

    addEventOnElem(window, "scroll", activeElementOnScroll);
    return () => {
      removeEventOnElem(window, "scroll", activeElementOnScroll);
    };
  }, [name]);

  function handleSearch(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 13 || e.key === "Enter") {
      if (isNotEmpty(search?.trim())) {
        searchSuggestionList(false);
        router.push(`/result-search/${search?.toLowerCase().trim()}`);
      }
    }
  }

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
            placeholder="Buscar Evento..."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}
