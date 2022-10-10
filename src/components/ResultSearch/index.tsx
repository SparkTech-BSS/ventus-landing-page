import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { EventCard } from "components/EventCard";
import styles from "./styles.module.scss";

export function ResultSearch() {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", `auto`);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <div className={styles["bread-crumb"]}>
            <a className={styles["bread-crumb-link"]}>Home</a>
            <IoIosArrowForward
              size={20}
              color="#939598"
              className={styles["bread-crumb-separator"]}
            />
            <a className={styles["bread-crumb-link"]}>Encontre Eventos</a>
          </div>
        </div>

        <div className="container">
          <div className={styles["header-row"]}>
            <h2 className={styles["page-heading"]}>Todos os eventos</h2>

            <div className={styles["filter-control"]}>
              <span className={styles["filter-control__text"]}>
                Filtrar por:
              </span>
              <select className={styles["filter-control__select"]}>
                <option>Categorias</option>
                <option>Música</option>
                <option>Business</option>
                <option>Comida {"&"} Bebida</option>
                <option>Arte</option>
                <option>Festa</option>
                <option>Teatro</option>
                <option>Palestra</option>
              </select>
              <select className={styles["filter-control__select"]}>
                <option>Categorias</option>
                <option>Música</option>
                <option>Business</option>
                <option>Comida {"&"} Bebida</option>
                <option>Arte</option>
                <option>Festa</option>
                <option>Teatro</option>
                <option>Palestra</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <section className={styles["result-search"]}>
        <div className="container">
          <div className={styles["result-search-row"]}>
            <h3 className={styles["result-search-heading"]}>
              7333 EVENTOS ENCONTRADOS
            </h3>

            <div className={styles["filter-control"]}>
              <span className={styles["filter-control__text"]}>
                Ordenar por:
              </span>
              <select className={styles["filter-control__select"]}>
                <option>Relevância</option>
                <option>Crescente</option>
                <option>Descrescente</option>
              </select>
            </div>
          </div>

          <div className={styles.content}>
            <EventCard width="full" multipleData/>
            <EventCard width="full"/>
            <EventCard width="full"/>
            <EventCard width="full" />
            <EventCard width="full" multipleData/>
            <EventCard width="full"/>
          </div>
        </div>
      </section>
    </>
  );
}
